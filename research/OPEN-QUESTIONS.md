# OPEN QUESTIONS

What is still unknown, contradictory, or lost after the 2026-08-23 research sweep — and what has to be
tested on the car. Ordered by how much they block the project. Source ids → `SOURCES.md`.

---

## A. Blocking — must be resolved before this documentation can tell anyone to proceed

1. ~~**EU firmware: no verified source.**~~ → **RESOLVED 2026-08-23.** The 124spider.org Google-Drive
   zips were downloaded and unpacked. We now hold `cmu150_EU_70.00.100A_failsafe.up` (7,078,085 B) and
   `_reinstall.up` (2,355,206,863 B), plus the full ADR pair. Both zips passed `unzip -t`. [A-12]

2. ~~**The two contradictory EU 70.00.100A reinstall MD5s.**~~ → **RESOLVED 2026-08-23.** The file we
   obtained hashes to **`d5c042588b5de7f0d72e02b03ec78590`**, matching the value reported by the
   2024-04-22 Google-Drive uploader; the EU failsafe matches its community MD5
   `cc485f4f16541cd803f615df42dc3512` exactly. The competing `279f1b81e1fa43b1b43ea1af38aab834` is
   jayrock's 2020 copy — the one that threw "Invalid packet certificate" on his fourth car. Working
   conclusion: `d5c0…` is the good file, `279f…` was a bad/older copy.
   ⚠️ **Caveat:** the two sources agreeing on `d5c0…` are both Google Drive re-hosts and may share an
   upstream, so this is corroboration, not true independence. The **ADR** pair is stronger: both halves
   match community MD5s (`46d7a81a…`, `afb5cf9a…`) from a different source lineage.

3. **Every route must be documented to the same standard.** The guide cannot lean on whichever path the
   maintainer's own car happens to need. Each of the four starting points in PROCEDURE-DRAFT §0 has to be
   written out fully, for every market, including the ones we are least able to test. Where a route rests
   on thinner evidence than another, say so on the page rather than quietly preferring the well-trodden
   one.

4. **Can you flash 70.00.100 over Fiat 59.00.562/563 at all?**
   Everyone assumes yes, but **no explicit first-hand success report was found** in anything we captured.
   Bob T's replacement CMU on 59.00.563 was described as "not upgradable, as I understand it"; the 68wooley
   guide only warns that the newer Fiat firmware "breaks CarPlay/AA compatibility" without saying whether
   it blocks the flash or just the tweaks. Needs a confirmed report before the guide promises it.

5. ~~**Integrity check**~~ → **DONE 2026-08-24.**
   - ✅ **Tweak scripts read by hand** — findings in PROCEDURE-DRAFT §4b and items 10b/10c. For
     shell-script payloads this is the control that actually matters.
   - ✅ **VirusTotal hash lookup on all 28 files** (`research/VT-RESULTS-hashes.tsv`) and **upload +
     full analysis of the 13 that VT had never seen and that fit its size limits**
     (`research/VT-RESULTS-uploads.tsv`). Combined result: **20 files scanned clean** across 57–68
     engines — every tweak package, the ID7 packages, the mp3 payload, and every failsafe image.
   - ⚠️ **One detection, investigated and dismissed:** `124Spider_CP_AA_Upgrade_Guide.zip` →
     ESET-NOD32 alone (1 of 65) reports `PDF/Phishing.A.Gen` on **Part 1** of the guide. Isolated to that
     PDF (Part 2 is clean) and the file was examined directly: **zero active content** — no
     `/JavaScript`, `/OpenAction`, `/Launch`, `/EmbeddedFile`, `/SubmitForm` or `/XFA`, only 9 plain
     hyperlinks. A generic heuristic firing on a document whose whole purpose is to point at download
     links. **False positive** — but see 5b, because it is pointing at something real.
   - ❌ **7 files can never be scanned** (883 MB–2.3 GB, over VirusTotal's ~650 MB analysis cap) by
     hash, upload or URL. For those, matching community MD5s is the only evidence — and all four with a
     published MD5 matched.

5b. **🔴 The canonical guide sends readers to a domain that is now attacker-controlled.**
   68wooley's Part 1 — still the reference guide, still bundled in every firmware package circulating
   today — instructs owners on firmware 59 to follow `https://mazdatweaks.com/serial/`. Checked
   2026-08-24: **that page now serves an Indonesian lottery/gambling site** ("Kpktoto — Agen Nomor Lotre
   Togel"), while `mazdatweaks.com/` still renders a legitimate-looking "Mazda AIO Tweaks" homepage. The
   plausible front page makes it *more* deceptive, not less. `/id7/` is 404.
   **Consequence for this project:** wherever we reproduce or link the historic guides, every
   `mazdatweaks.com` reference must carry a warning, and the surviving content should be cited from the
   GitHub mirror `Trevelopment/mazdatweaks` instead. This is a live hazard for anyone following the
   community guides today — arguably the most immediately useful thing this project can publish.

## B. High value — would materially change the guide

6. **How far does the mp3 method really reach?**
   Confirmed on 70.00.100 and 74.00.324/311. ⚠️ Single reports on 59.00.563 and 70.00.367. ⚠️ One 124 owner
   **failed on 70.00.335** (unclear whether the payload didn't launch or the `tweaks.sh` version gate
   stopped it). This determines whether the "point of no return" disclaimer stays absolute or becomes
   conditional. The 59.x case is the one most needing a first-hand report.

7. **Does the mp3 method need the new hub for the USB keyboard?**
   madfiat used the new hub; whether the old hub's ports enumerate a keyboard is unknown; one owner with
   the *new* hub had USB1/USB2 greyed out. Affects step ordering (you may have to fit the hub before you
   can restore branding).

8. **Downgrade file order** (failsafe-first vs reinstall-first) is contradictory across sources, and one
   owner ended with a mismatched OS/failsafe pair. Needs a definitive answer before publishing a rollback
   procedure.

9. ~~**Are the 124spider.org Google-Drive zips unmodified Mazda files?**~~ → **RESOLVED 2026-08-23.**
   The uploader's "tweaked … optimized for Fiat" wording refers to the *bundled extras*, not the
   firmware. Verified: the `.up` files match community MD5s, and every bundled tweak file
   (`autorun_copy_to_usb/tweaks.sh`, `autorun`, `cmu_dataretrieval.up`, `dataRetrieval_config.txt`,
   `passwd`, and `MazdaToFiatV70AIO/tweaks.sh`) is **byte-identical** to Ameridan's MediaFire originals,
   as is the 68wooley guide PDF (SHA256 `56a1ee28…`). The zips are a convenience bundle, unmodified.

10. **Can a Fiat 59.00.5xx package be re-installed over Mazda 70.x** (return to stock)? No report exists,
    and Fiat packages do not circulate at all. Probably "no" — worth stating definitively.

## B-bis. Findings from the 2026-08-23 script review (new)

10b. **The unidentified `adb` binary in ID7 v2.** A 220 KB stripped ARM ELF shipped in
    `44-recovery-recovery/` and installed persistently on the CMU. Undocumented in every source we have.
    Should be disassembled, or at minimum hash-checked against a known Android `adb` build, before the
    guide recommends ID7 v2.
10c. **ID7's SSH exposure is undocumented everywhere.** See PROCEDURE-DRAFT §4b. Root accounts with
    published hashes + sshd with `PermitEmptyPasswords yes` on all interfaces, and the CMU WiFi is
    **enabled on EU cars**. No community guide mentions this. Decide how prominently the site warns about
    it — and whether to recommend the mp3 route by default on EU cars for this reason.

## C. Documentation gaps to close by more research

10d. ~~**Lost: Ameridan's "TESTING BEFORE YOU DOWNLOAD" MD5 PDF**~~ → **RECOVERED 2026-08-23**, found
    inside the EU/ADR zips; archived at `research/archive/recovered/`. It is ASH8's 5-page guide to
    verifying `.up` files and **testing the USB stick with H2testw before flashing** — directly relevant
    to the #1 brick cause. It yields two ADR 70.00.021A SHA-1s and documents the ROOM-fuse rescue
    sequence. ⚠️ The per-region hash tables it points to still live only in the dead HiDrive `yChecksum`
    folder.
10e. **HiDrive is definitively gone**, not merely rearranged: the share API returns
    `{"msg":"Not Found: share"}`. The 200 on the share root is only the JavaScript shell. Mazda's own
    trim PDFs and install videos are lost from that source. **Partial replacement found and mirrored:**
    the ND workshop manual at `hexorcism.com/16ND/` is alive; 13 relevant trim-removal sections are now
    in `research/archive/workshop-manual/`.

11. **Sources we could not read** (need a human with a browser/login):
    - `forum.miata.net` t=782788 posts 142/143 — **the origin of the mp3 method** (login-walled)
    - 124spider.org HowTo thread 32286 pages **3–7, 15, 21** (no Wayback capture)
    - 124spider.org threads 39292 ("Mazda made up a mess, FW 70.00.367"), 42352, 41206, and the 2022–2025
      hardware threads (43650 USB-C hub, 43766 wireless, 42115, 43933, 43852) — no captures
    - Scribd "EU N CMU HASH Value" doc 838112560 — likely holds the missing EU hashes
12. **Mirror before it disappears:** the HiDrive `-CarPlay-AndroidAuto INSTALL` folder [E-42] holds Mazda's
    own trim-removal PDFs and full-install videos — the only copy known.
13. **70.00.130 / 70.00.137 / 70.00.150** — no source we read says anything about their tweak status.
14. **74.00.331** — barely documented; reportedly breaks wireless CarPlay if tweaked. Public release or
    dealer-only?
15. **Hub revisions:** does the current genuine `TK78-66-9U0E` work with 70.00.100 on a 124? Catalogues say
    it supersedes 9U0C, but no 124 report exists.
16. **Torque values** for the CMU and trim bolts — not in Mazda's cable sheet; would be in the ND workshop
    manual (mirror located, not fetched).
17. **Dealer tooling:** does FCA wiTECH contain any 124 CMU flash? Can a Mazda dealer flash against a Fiat
    VIN? (One Fiat dealership demonstrably flashed *Mazda* firmware onto a 124.) Unknown.
18. **Nav SD after a CMU swap:** the Fiat card is VIN-locked after ~100 km; whether it survives a different
    CMU is not reported for the 124.

## D. Known contradictions to flag in the published guide

| # | Contradiction | Handling |
|---|---|---|
| 19 | "70.00.335+ is never tweakable again" (all pre-2025 guides, incl. Ameridan and 68wooley) vs. the 2025 mp3 method | Present the classic rule as the safe assumption, the mp3 method as a documented-but-thin escape, with per-version confidence |
| 20 | "ID7 v2 protects you if pre-installed" (Ameridan's 2019 article) vs. its author's own failed test two days later — the working v2 is a *serial-during-flash procedure* | Say plainly: pre-installing anything does **not** survive 70.00.335 |
| 21 | AIO FAQ "updating with tweaks installed is safe" vs. two bricks attributed to leftover tweaks | Recommend removing tweaks before flashing |
| 22 | Mazda "ACC only, never run the engine" vs. 2x4logic "run the engine so the CMU never loses power" | Follow Mazda; use a battery charger and the pedal timer |
| 23 | Reseller claim "update direct from 59.x to 74.00.324" vs. the dealer two-file rule via 70.00.100 | Follow the dealer rule until a first-hand report says otherwise |
| 24 | Wrong-region firmware = "brick risk" (universal advice) vs. one ADR car happily running NA firmware | Keep the warning; record the anecdote |
| 25 | Bluetooth name fixed to "124 Spider" vs. reports that a "Mazda" pairing entry survives | Note as cosmetic residue |

## E. What only the car can answer

- Actual current firmware version and region string (A3)
- Whether the mp3 method opens the terminal on an EU Fiat 59.x (B6)
- Whether a USB keyboard enumerates on the **old** hub (B7)
- Whether the EU 70.00.100A files obtained (from wherever) flash cleanly (A1/A2)
- Whether `MazdaToFiatV70AIO` restores nav on an **EU** car using the NA NNG folder (reported to work for
  EU and ADR, but by a handful of people)
