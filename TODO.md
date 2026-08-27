# TODO — a security-first successor to ID7 for locked CMU firmware (74.x)

**Status: design document. No code exists yet.** Written 2026-08-25, from the repository's own research
and a line-by-line read of the two held payloads (`downloads/tweaks/ID7_Recovery_XX.zip`,
`downloads/tweaks/mzd-connect-1-root-main.zip`).

> ⚠️ **Scope guard.** This file is a *plan*, not guidance to act on a car. Per `CLAUDE.md`, nothing in
> this project can be verified on hardware by Claude, and work on the maintainer's own car is a separate,
> deferred task. Every hardware-touching step below is gated accordingly (Phase 7). Until then this tool
> is unverified by definition — the same discipline the site applies to every page.

Checkbox convention as in `TODOs/README.md`: `- [ ]` not started · `- [X]` done · `- [~]` children
partially done. The tool is referred to as **"the tool"** throughout; choosing the name is task 0.1
("ID7" is taken, and reusing it would inherit both the brand and the threat model we are replacing).

---

## 1. What this document is

The implementation plan for a successor to the ID7 autorun/serial-backdoor package, with two hard
requirements from the maintainer:

1. **It must work on firmware ≥ 74.x** — the line where ID7, its v2 variant and the serial console are
   all dead (see §2.2). Primary target: the whole 74 line (74.00.230 → 74.00.331), with **74.00.324A**
   as the reference build (the final MZD-Connect-1 firmware, 2022-11, and the one with confirmed 124
   reports). The same design also serves 70.00.100A — the project's recommended target firmware — at no
   extra cost, because the entry vector is identical (§2.3).
2. **It must carry all the security hallmarks** ("tutti i crismi") that ID7 lacks — the measurable list
   is §5, derived from the documented sins of ID7 found in this repo's own script review
   (`research/PROCEDURE-DRAFT.md` §4b).

**What the tool is:** a USB-stick-delivered system that (A) bootstraps persistent, policy-gated script
execution on a locked CMU, and (B) gives the owner — and only the owner — a convenient, auditable,
reversible way to run tweak payloads (MazdaToFiatV70AIO, MZD-AIO `run.sh`, owner scripts) without a
keyboard, a serial adapter, or a permanent network backdoor.

**What it is not:** a repack of any tweak payload (it *carries* them, it does not contain them), a
firmware, an exploit of Mazda/JCI code, or anything that redistributes proprietary material (§2.1,
first row of §5).

---

## 2. Ground truth (from the research — read this before touching any task)

### 2.1 What ID7 actually is — three separable mechanisms

Read in full in `research/PROCEDURE-DRAFT.md` §4b and `research/raw/C2-firmware-tweak-compatibility.md`
§2.3–2.4; both held zips were read line by line for this document.

1. **Entry vector.** `cmu_dataretrieval.up` — a *genuine, JCI-signed* diagnostic package (2014,
   `publisher_cert.pem` + `jci_subord_cert.pem`) — plus a `dataRetrieval_config.txt` whose
   `CMD_LINE=sh /mnt/sd*/tweaks.sh` line makes the CMU run an arbitrary script as root. It is **command
   injection into Mazda's own signed tool**, accepted *because* the signature is valid. This is why it
   worked after plain USB autorun died, and why it is legally fragile to redistribute.
2. **Persistence.** Lives in `/mnt/data_persist/dev/bin/` (a partition updates do not reformat) and is
   invoked at boot by lines appended to `/jci/scripts/start_normal_mode.sh` (and siblings). Adds a udev
   rule (`99-run-tweaks.rules`) that re-runs `CMD_LINE` from any inserted stick, plus a self-healing
   watchdog (`44-recovery-recovery/`) that reinstalls everything if deleted — and ships an undocumented
   220 KB stripped ARM binary named `adb` (`research/OPEN-QUESTIONS.md` #10b).
3. **Remote access.** Rewrites `/config-mfg/etc/passwd` (a SquashFS on raw MTD, erased and rewritten
   in place) with three UID-0 accounts whose password hashes are published in the package; starts sshd
   on ports 22/24000/36000 with `PermitRootLogin yes`, `PasswordAuthentication yes`,
   `PermitEmptyPasswords yes`, `ListenAddress 0.0.0.0`; opens iptables on **every interface** — the
   wlan0-blocking rule is present but commented out — and re-opens them 90 s later because the CMU's
   own firewall closes them at boot. On EU/JP units the CMU WiFi is enabled, so this is a permanent,
   remotely reachable root shell with publicly known credentials.

### 2.2 Why it dies

| Firmware | What happens | Source |
| --- | --- | --- |
| 59.00.502+ | USB autorun removed; stock sshd hardened (root password changed, password auth disabled) | [C2-10] |
| 70.00.335 / 352 | Update runs `neutralizeid7` (deletes the whole `data_persist/dev/bin` tree), forced `passwdupdate`, and the new `start_normal_mode.sh` **no longer calls `autorun` at all** | [C2-14, C2-11] |
| 70.00.367 | Serial credentials gone entirely; updates are **signed** → repacking infeasible; ID7v2 impossible | [C2-14] |
| 74.x | Everything above, from the factory. Nothing of ID7 applies | FIRMWARE-MATRIX §1 |

The "ID7 Recovery v2" that *did* work on 335/352 was never a package but a **procedure**: serial console
attached during the flash, commands pasted before the first reboot — proof that on those builds a root
shell can durably plant files in `data_persist` and re-arm a boot hook. Dead from 367 onward.

### 2.3 The vector that survives: mp3 XSS → JCI terminal

Verified by reading the held payload (`mzd-connect-1-root-main.zip`, SHA256 `95690ef1…`,
`research/INVENTORY.md` §3.2):

- The four `mp3/*.mp3` files (41,239 B each) carry an **ID3 title tag containing HTML**:
  `</span><iframe onload="utility.loadScript('../../../mnt/sda1/js/run.js')"></iframe><span>`
  (verbatim in `mp3title.txt`). The media UI renders track titles as markup → **XSS in the privileged
  MMUI JavaScript context** (`window.framework`, `utility.*`).
- `js/run.js` then drives the UI's own framework events: `syssettings/SelectDiagnostics` →
  `diag/ActivateJCITest` → `diag/ReadDTC {testId: 11}` — which opens the **JCI Test Mode terminal**.
  A USB keyboard types `cd /mnt/sdb1 && ./tweaks.sh`. Root shell, nothing installed, nothing left
  behind (PROCEDURE-DRAFT §4b: "no `/etc/passwd`, no sshd, no iptables, no persistence at all").
- The four near-identical mp3s (`a`–`d`) are presumed per-mount-point variants (`sda1`…`sdd1`) so the
  iframe resolves whichever letter the stick received — **to be confirmed by diffing the tags**
  (task 2.2).

Evidence status (FIRMWARE-MATRIX §4 nuance — keep the confidence markers intact):

- **70.00.100** ✅ confirmed by several 124 owners · **74.00.324 / 311 / 230** ✅ confirmed (124s included)
- **59.00.563** ⚠️ one report · **70.00.367** ⚠️ one report (2026-04) · **70.00.335** ⚠️ one failure
- **74.00.331** ⚠️ mp3 works but tweaking may break wireless CarPlay; AIO recommended only ≤ 74.00.324

### 2.4 The honest security floor of the platform

On 74.x, **anyone** with physical access, a USB keyboard and the public payload gets a root shell. That
is a pre-existing property of the platform, not something this tool adds — and 74.00.324A is the final
firmware, so no Mazda patch is coming. Consequences that shape the whole design:

- The tool **must not lower the floor**. ID7 lowered it to network distance (EU wlan0) and to
  "any stick, no keyboard". The tool's persistence must require more than physical stick insertion alone
  (§5: provisioning + confirmation), while admitting it cannot raise the ceiling above the platform's
  own floor.
- "Surviving ≥ 74" does **not** mean surviving future Mazda updates — there are none. It means working
  on the 74 line at all, and surviving *re-flashes within the band* the way ID7 survived updates:
  `data_persist` is not reformatted by updates (until Mazda explicitly ran `neutralizeid7`; no such
  script exists in the final builds — Phase 1 verifies).

---

## 3. Feasibility assessment

### 3.1 What is confirmed

| Capability needed | Status | Basis |
| --- | --- | --- |
| Code execution as root on 74.x | ✅ confirmed | mp3 vector, multiple 124 reports (74.00.324) |
| Entry vector contains only our own files | ✅ confirmed | the payload is 4 mp3s + JS + HTML + CSS; no proprietary package needed, unlike ID7 |
| Durable writes to `data_persist` with root | ✅ proven pattern | ID7v2-at-install on 335/352; `data_persist` survives flashes |
| No future Mazda countermeasure | ✅ (as final as it gets) | 74.00.324A = last MZD-1 firmware; 74.00.331 the last blip |
| Firmware images for static analysis | ✅ held locally | NA 74.00.324A (1,003,179,676 B, MD5-matched), NA 70.00.367A, EU/ADR 70.00.100A pair — all in `downloads/`, hashed |

### 3.2 The one gating unknown

**Does a boot-time hook from `data_persist` still execute on 74.x?** Pre-335 builds called
`data_persist/dev/bin/autorun` from `start_normal_mode.sh`; 335 removed the call *and* deleted the
directory. Whether on 74.x the boot scripts (a) exist in the same form, (b) can be re-pointed at
`data_persist` (rootfs still `rw,remount`-able?), and (c) nothing else validates them at boot — is
**unverified**. It is answerable **without a car**, by extracting the held NA 74.00.324A `.up`
(Phase 1). Fallback if the answer is no: the tool degrades to "one mp3 session per boot" — still
secure, still keyboard-gated, merely less convenient. The project is viable in both branches; Phase 1
decides which product we are shipping.

### 3.3 Verdict

**Feasible.** Entry and root are confirmed on the target line; persistence is the only open technical
question and is decidable from artifacts already in the repo; the security layer needs no new platform
capability at all — it is engineering discipline (§5). The un-negotiable constraint is validation:
nothing is "done" until Phase 7 runs on hardware, and that is gated on the maintainer lifting the
deferred-car rule or acquiring a bench CMU (task 7.2).

---

## 4. Threat model

**Assets.** CMU integrity (a bricked CMU is €1,000–1,500); the owner's paired phones, contacts and
accounts reachable through the CMU; the driver's attention (UI-level payloads); the car's resale value
and warranty position.

**Attackers.**

- **A — network attacker** within range of the car (EU/JP: wlan0 is up). ID7 made this a root shell
  with published credentials. The tool's default posture: **no network attack surface whatsoever**.
- **B — physical non-owner** (valet, thief, mechanic, parking attendee) with a USB stick but no
  keyboard and no knowledge of the provisioning. Must get **nothing** from the tool's persistence.
  (With a keyboard they already own the platform — §2.4 — but the tool must not make it *easier*:
  unattended auto-execution from an arbitrary stick is exactly the shortcut to deny.)
- **C — supply-chain attacker**: poisoned download of the tool itself, or of the payloads it runs.
  Answered by signed releases, published hashes, and manifest verification on the CMU side.
- **D — the owner's own mistakes**: power loss mid-write, wrong firmware, half-finished uninstall.
  Answered by pre-flight gates, verify-after-write, backups, and a byte-exact uninstaller.

**Explicitly out of scope:** an attacker with sustained physical access *and* a keyboard (platform
floor, §2.4); CAN-bus-level attacks (the CMU's vehicle-bus exposure is unchanged by this tool);
Mazda/FCA legal action (mitigated by design — nothing proprietary is redistributed — not eliminated).

---

## 5. Security requirements ("i crismi")

Each row is a documented ID7 property (§2) and the requirement that answers it. These are **hard
requirements** — a phase is not complete unless every applicable row holds.

| # | ID7 did | The tool MUST |
| --- | --- | --- |
| S1 | Ship a genuine JCI-signed proprietary package | Redistribute **only original files** — no Mazda/JCI binaries, certificates or packages |
| S2 | Rewrite `/config-mfg/etc/passwd` (SquashFS on raw MTD) with 3 UID-0 accounts, published hashes | **Never touch accounts, passwords, MTD or SquashFS.** Write only to `data_persist` and ordinary filesystem paths |
| S3 | sshd on 22/24000/36000, `PermitRootLogin yes`, `PermitEmptyPasswords yes`, `0.0.0.0`, wlan0 rule commented out | **No network listener by default.** Optional module (Part C): key-only auth, one port, explicit wlan0 DROP, time-boxed, fail-closed |
| S4 | Auto-execute `CMD_LINE` from *any* inserted stick | **Provisioning gate**: owner-allow-listed stick serials + per-manifest SHA256 verification + **on-screen confirmation** before anything runs |
| S5 | Ship an undocumented 220 KB ARM binary (`adb`) | **No opaque binaries.** Pure auditable POSIX sh; any unavoidable binary is reproducibly built with published toolchain and hashes |
| S6 | Self-resurrecting watchdog reinstalls itself when deleted | **Consent over tenacity**: no self-resurrection; the uninstaller is final and restores byte-identical originals |
| S7 | Log nothing | **Append-only, hash-chained audit log** in `data_persist` (each line carries the SHA256 of the previous one), mirrored to the stick on demand |
| S8 | Fail silently (owners discovered ID7 hadn't taken only after flashing) | **Verify-after-write everywhere**, a `--dry-run` mode, and a printed/on-screen receipt after every state change |
| S9 | Poke the watchdog GPIO ad hoc | A single vetted `with_watchdog` wrapper used by every long-running operation |
| S10 | Run on anything | A **supported-version gate**: refuse unknown firmware with a clear message (fail-closed), never "try anyway" |
| S11 | No supply-chain story | Signed git tags, `SHA256SUMS` in every release, VirusTotal scan of the release zip, hashes published on the site (its whole model is verification-first) |

---

## 6. Architecture

Three parts. **Part C is optional and separately installable** — the tool must be useful and complete
without it.

### 6.1 Part A — bootstrap stick (entry, used once per install)

- `mp3/` — the XSS entry, **re-implemented from scratch** (the technique is documented in §2.3; the
  mzd-evo repo carries no license, so no code is copied — task 0.4). Per-mount variants so the iframe
  resolves whichever `sd[a-d]1` the stick gets.
- `js/loader.js` — minimal: open the JCI terminal (the framework-event sequence of §2.3) and render an
  on-screen instruction panel. No menu, no extra features — the less JS, the less to audit.
- `bootstrap.sh` — what the owner runs from the terminal. Pre-flight (S10 version gate; read-only
  region/version report; ACC/battery reminder) → **backup** of every file it will touch, timestamped,
  to the stick → install Part B into `data_persist` → verify (S8) → write receipt + first log entry.
  `--dry-run` prints the plan and changes nothing.
- `provisioning.txt` — owner-generated on their PC (task 0.5): allow-listed stick `ID_SERIAL`s,
  approved payload hashes, optional owner public key for Part C. Imported by `bootstrap.sh` into the
  agent's policy directory, permissions `0600`.
- `uninstall.sh` — the byte-exact reversal (task 3.5).

### 6.2 Part B — resident agent (persistence)

- A **boot hook**: the minimal marked block (`# BEGIN/END <tool>`) appended to the boot script Phase 1
  identifies, idempotent, execs the agent only if present *and* intact; absent → no-op, boot unaffected.
- `agent.sh` — on boot: nothing network, ever (S3). Arms the USB-insert pipeline and exits.
- **USB-insert pipeline** (udev, the same mechanism ID7 used — credited — hardened):
  identify stick (`ID_SERIAL`) → policy check (S4) → read `manifest.txt` (payload path + expected
  SHA256) → verify hash → **on-screen confirmation dialog** (`/jci/tools/jci-dialog`, which ID7 already
  proved exists) → execute under `with_watchdog` (S9) → append to the hash-chained log (S7) → `sync`.
  Any check failure → "not provisioned" dialog, log the attempt, execute nothing.
- **No self-healing, no resurrection** (S6). If the owner deletes it, it stays deleted.
- **Re-arm after re-flash**: `data_persist` survives, the rootfs hook does not — one mp3 session with
  `bootstrap.sh --rearm` restores the hook. Documented as the expected post-flash step.

### 6.3 Part C — hardened remote access (optional module)

- **Default: not installed.** If installed: **disabled** until the owner enables it per-session
  (auto-off at boot + 30 min) or explicitly provisions "persistent".
- Key-only: owner pubkey from provisioning; `PasswordAuthentication no`, `PermitEmptyPasswords no`,
  single port, explicit wlan0 DROP in iptables (the rule ID7 left commented out, done right).
- **No account/system-file changes** (S2): if the stock sshd cannot be configured within that rule
  (59.00.502+ hardened it — [C2-10]), ship a reproducibly built **dropbear** with its own host key and
  config under `data_persist`, never touching the system sshd. Fail-closed: any config error = no
  service.

### 6.4 Layouts

```
Stick (FAT32)                          CMU
├── mp3/{a..d}.mp3                     data_persist/<tool>/
├── js/loader.js                       ├── agent.sh, with_watchdog.sh
├── bootstrap.sh  uninstall.sh         ├── policy/            (0600: sticks, hashes, pubkey)
├── provisioning.txt                   ├── log/audit.log      (hash-chained)
└── payloads/…   (owner's tweaks       ├── part-c/            (only if installed)
     + manifest.txt, NOT shipped)      └── backups/           (mirror of stick backups)
```

### 6.5 Lifecycle

`ABSENT → INSTALLED-UNPROVISIONED` (bootstrap done; denies everything, says how to provision)
`→ PROVISIONED` (policy imported; runs allow-listed, hash-verified, confirmed payloads)
`→ RE-ARMED` (after any re-flash) `→ ABSENT` (uninstaller: hook out, files out, originals restored
byte-identically, log moved to the stick). Part C orthogonal: `DISABLED / TIMED / PERSISTENT`.

---

## 7. Implementation plan

Phases are dependency-ordered. **Gate: nothing ships until Phase 5 passes; nothing is "verified" until
Phase 7 passes on hardware.**

### Phase 0 — Decisions (before any code)

- [ ] 0.1 **Choose the name.** Not "ID7"/"ID8" (brand + threat-model confusion); check GitHub/forum
      collisions; the name ships in paths, dialogs and the log format.
- [ ] 0.2 **Decide where the code lives.** Options: `tool/` in this repo (one review surface, the site
      can document it directly) vs. a separate repo (cleaner releases/signing, keeps this repo
      documentation-pure). Record the decision here.
- [ ] 0.3 **License.** The tool is original shell; note the mp3-entry re-implementation must be
      clean-room (0.4). Pick an OSI license compatible with that.
- [ ] 0.4 **Clean-room rule for the XSS entry.** `mzd-evo/mzd-connect-1-root` has **no license file**
      (verified in the held zip: no LICENSE, no README). Re-implement from the *behavioral description*
      in §2.3 (ID3-title HTML injection + the three framework events), credit the technique, copy zero
      lines. Optionally try to contact mzd-evo for explicit permission — record the outcome.
- [ ] 0.5 **Confirm scope.** Primary: 74.00.230 → 74.00.331 (reference: 74.00.324A). Secondary:
      70.00.100A (same vector; the site's recommended target). Explicitly not: serial-only territory
      (59.x, 335/352) — the tool does not replace the serial route where the mp3 vector is unproven.
- [ ] 0.6 **Design the provisioning UX.** The PC-side story: documented commands (or a tiny script) to
      read a stick's `ID_SERIAL`, hash a payload, and emit `provisioning.txt` + `manifest.txt`. Must be
      doable from Linux, macOS and Windows (WSL/ PowerShell notes).

### Phase 1 — Platform reconnaissance (no hardware — from held artifacts)

- [ ] 1.1 Extract `cmu150_NA_74.00.324A_update.up` (held, MD5-matched) **read-only**. If the container
      resists, try the community unpack tooling (Trevelopment et al.); if it is encrypted rather than
      merely signed, record that and fall back to community sources for 1.2–1.5.
- [ ] 1.2 **The gating question (§3.2).** In the extracted rootfs: does `/jci/scripts/start_normal_mode.sh`
      (or `emmc_mount_data_persist.sh`, `/jci/bin/start_normal_mode.sh`) exist, run at boot, and tolerate
      an appended `data_persist` call? Is the rootfs still `rw,remount`-able on this line? Any boot-time
      integrity check (dm-verity, signed boot — expected absent on kernel 3.0.35, verify)?
- [ ] 1.3 Confirm `data_persist` on 74.x: mount point(s) (`/mnt/data_persist` vs `/tmp/mnt/data_persist`
      — ID7 used both), filesystem, size, and that the 74.x update path does not reformat it
      (no `neutralizeid7`-like script in the 74.x package).
- [ ] 1.4 Inventory the 74.x userland: busybox applet list, `sha256sum`, `openssl`/`gpg` (decides
      manifest *signatures* vs. plain hash allow-list — S4 fallback), udev, `iptables`,
      `/jci/tools/jci-dialog`, the terminal app behind `ReadDTC testId 11`.
- [ ] 1.5 Confirm the watchdog GPIO path (`/sys/class/gpio/Watchdog Disable/value`) still exists on 74.x.
- [ ] 1.6 Repeat 1.2–1.5 on the held EU 70.00.100A pair (secondary target).
- [ ] 1.7 Write findings as `research/PLATFORM-74.md` (repo-standard citations), including the Phase-1
      verdict: **persistence possible / degraded mode** (§3.2). Update §3.2 of this file.

### Phase 2 — Part A: bootstrap stick

- [ ] 2.1 Re-implement the XSS entry clean-room (0.4): ID3-title injection + `js/loader.js` performing
      the diagnostic-terminal sequence with visible on-screen feedback at each step (the failure mode
      to kill is "white screen, no idea what happened").
- [ ] 2.2 **Diff the four held mp3s** to confirm the per-mount-variant hypothesis (§2.3), then build a
      deterministic generator: silent WAV → mp3 → ID3v2 tag with the per-mount iframe line. Output is
      byte-reproducible (documented tool versions), so releases are hashable (S11).
- [ ] 2.3 `bootstrap.sh`: pre-flight (S10 version table from Phase 1; refuse unknown), timestamped
      backup of every touched file to the stick, Part-B install, verify-after-write (S8), receipt +
      first log entry. `--dry-run` and `--rearm` modes.
- [ ] 2.4 Provisioning importer (validates `provisioning.txt` syntax strictly, installs `0600`, rejects
      partial/corrupt policy fail-closed).
- [ ] 2.5 Owner-side provisioning helper (0.6) with copy-pasteable output.

### Phase 3 — Part B: resident agent

- [ ] 3.1 Boot hook: marked, idempotent block in the Phase-1-identified script; absent-agent = no-op;
      corrupt-agent = no-op + log.
- [ ] 3.2 `agent.sh` + udev rule: the pipeline of §6.2 (identify → policy → manifest → hash →
      **confirm dialog** → execute under `with_watchdog` → log → `sync`). Deny path shows
      "stick not provisioned" and logs the attempt (S4).
- [ ] 3.3 `with_watchdog.sh`: single wrapper owning the watchdog GPIO dance (S9); every long operation
      goes through it; restores state on exit, including on error.
- [ ] 3.4 Audit log (S7): append-only, hash-chained; `logctl` to dump/verify the chain and mirror to
      the stick.
- [ ] 3.5 `uninstall.sh`: remove hook, remove agent, restore every backup, **verify byte-identity
      against the backups**, move the log to the stick, report. No resurrection of any kind (S6).
- [ ] 3.6 `--rearm` path (post-flash one-session restore) — exercised in the failure drills (5.5).

### Phase 4 — Part C: hardened remote access (optional)

- [ ] 4.1 Only if Phase 1 found a usable daemon path; else reproducible dropbear build for armv7
      (published toolchain + hashes, S5).
- [ ] 4.2 Key-only config per §6.3; no account/system-file changes (S2); single port; explicit wlan0
      DROP; fail-closed.
- [ ] 4.3 DISABLED/TIMED/PERSISTENT states per §6.5; TIMED auto-off; state shown on screen.
- [ ] 4.4 Threat-model appendix update: exactly what enabling Part C changes (§4, attacker A).

### Phase 5 — Hardening & review (ship gate)

- [ ] 5.1 `shellcheck` clean; `set -eu`; no `eval`; everything quoted; POSIX sh only (busybox ash).
- [ ] 5.2 Line-by-line security read-through at the standard of PROCEDURE-DRAFT §4b — ideally by a
      second pair of eyes; record the review in the release notes.
- [ ] 5.3 Audit S1–S11 row by row against the built artifacts; each row gets a ✅/proof line.
- [ ] 5.4 Reproducible build check: the mp3 generator and any Part-C binary rebuild to identical hashes.
- [ ] 5.5 Failure-mode drills on paper first: stick pulled mid-run, ACC power loss mid-write, corrupt
      manifest, full `data_persist`, read-only mount, interrupted uninstall. Each has a defined,
      documented outcome (no undefined states — the repo's failure catalogue shows what those cost).

### Phase 6 — Documentation & release

- [ ] 6.1 Owner guide: install → provision → run → re-arm → uninstall, with the same confidence-marker
      discipline as the site (⚠️ where evidence is thin).
- [ ] 6.2 `SECURITY.md`: §4 verbatim-derived threat model, the §2.4 honesty note, responsible-use
      statement (your own vehicle, physical access, local law).
- [ ] 6.3 Decide the site's coverage: a `/security/` page comparing ID7 with the successor (the sins
      table §5 is already half the page) — only once the tool is real, never vaporware.
- [ ] 6.4 Release process: signed tag, `SHA256SUMS`, VirusTotal scan of the zip, hashes on the site.

### Phase 7 — Validation (hardware-gated)

- [ ] 7.1 Static-only checks maximised first (5.1–5.5; note plainly that x86 `dash` cannot emulate the
      CMU — it catches syntax, not semantics).
- [ ] 7.2 **The gate.** Either the maintainer lifts the deferred-car rule (`TODOs/99-deferred.md`), or a
      used MZD-1 CMU is acquired for bench work (the community bench-tests these units — [F-19]).
      Until one of those happens, Phases 2–4 deliver *reviewed, unverified* code and this file says so.
- [ ] 7.3 Hardware matrix to fill: entry on 74.00.324 (and 70.00.100A on the maintainer's car, which the
      site's procedure targets); keyboard enumeration on the **old** hub (answers OPEN-QUESTIONS #7);
      hook execution at boot; persistence across a re-flash within the band; `--rearm`; uninstall
      byte-identity; deny-path behaviour with a stranger's stick.
- [ ] 7.4 Feed every result back into `research/OPEN-QUESTIONS.md` (#6, #7) and the site.

---

## 8. Risks register

| # | Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| R1 | No viable boot hook on 74.x (§3.2) | low–mid | high (no persistence) | Phase 1 decides; degraded mode documented as the fallback product |
| R2 | mp3 vector misbehaves on 74.00.331 (thin evidence; wireless-CP report) | mid | low | Scope the guarantee to ≤ 74.00.324; state the ⚠️ |
| R3 | USB keyboard does not enumerate on the old hub (OPEN-QUESTIONS #7) | unknown | mid | Bootstrap may require the new hub first; document ordering |
| R4 | No `openssl`/`gpg` on the CMU | mid | low | S4 falls back to hash allow-list (decided at 1.4) |
| R5 | Clean-room entry still drifts close to mzd-evo's code | low | low | Behavioral spec + independent implementation; credit; contact attempt logged (0.4) |
| R6 | Takedown/legal sensitivity | low | mid | S1: nothing proprietary redistributed — the structural difference from ID7 |
| R7 | Brick via boot-hook edit | low | high | Only `data_persist` + one marked block; backups + verify + uninstaller; failure drills (5.5); never MTD/SquashFS (S2) |

## 9. Non-goals

- A tweak payload itself — MazdaToFiatV70AIO / MZD-AIO remain the payloads; the tool *carries* them.
- Raising the platform's security floor (e.g. patching the ID3 XSS or disabling the JCI terminal).
  A possible later extension, explicitly not v1 — it means modifying shipped UI code, update-fragile
  and deep.
- Serial-console territory (59.x, 335/352) — different entry, already documented in PROCEDURE-DRAFT.
- Wireless CarPlay, AA-exit-icon rebranding, or anything requiring different hardware.
- Mazda owners as an audience for support — generic by design (platform is shared), but this project
  documents for 124 Spider owners.

## 10. Relationship to this repository

- This file is a **plan**, parallel to `TODOs/` (the site backlog). It does not interrupt the site's
  phase order; the next site task remains the firmware pages (`TODOs/06-pages-firmware.md`).
- Research produced by Phase 1 lands in `research/` and follows repo conventions (citations, hashing,
  inventory entries for any new artifact).
- Hardware validation (Phase 7) joins the deferred maintainer-car task unless that rule is lifted;
  `CLAUDE.md` and `TODOs/99-deferred.md` govern.
- If the tool becomes real, `CLAUDE.md`'s layout section and the site's security section are updated in
  the same commit that ships it — not before.
