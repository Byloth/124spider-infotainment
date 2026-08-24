# 05 · Pages — Security

**Written first, deliberately.** This section is the only part of the site that exists nowhere else: it
comes from reading the tweak packages line by line on 2026-08-23, and it includes a hazard that is live
right now for anyone following the community guides.

Backing: `research/PROCEDURE-DRAFT.md` §4b · `research/OPEN-QUESTIONS.md` items 5, 5b, 10b, 10c.

---

## `/security/index.md` — What the tweaks leave on your car

- [ ] **Framing paragraph.** Nothing here says the tools are malicious. They do exactly what they claim,
      they are the work of people who solved a real problem, and the whole community depends on them. This
      is about what they *leave behind* — which no published guide documents.

- [ ] **How tweak installation actually works.**
  - [ ] `59.00.502` removed the USB autorun path. Everything since is about getting back in.
  - [ ] **ID7 is not an exploit against the firmware.** The package ships `cmu_dataretrieval.up`, a
        genuine Johnson Controls diagnostic package dated 2014-11-20 carrying JCI's own
        `publisher_cert.pem` and `jci_subord_cert.pem` (2013). Beside it, `dataRetrieval_config.txt` has
        every real diagnostic option set to `no` and one line doing the work:
        `CMD_LINE=sh /mnt/sd*/tweaks.sh`.
  - [ ] So it is **command injection into Mazda's own signed diagnostic tool**, accepted by the CMU
        *because* the signature is valid. State why that matters: it explains why it kept working after
        the autorun path was closed, and why Mazda needed three firmware releases (`neutralizeid7`,
        `passwdupdate`) to shut it down instead of revoking a key.
  - [ ] Note the identical `cmu_dataretrieval.up` ships inside `MazdaToFiatV70AIO.zip` too — verified
        byte-identical.
  - [ ] Diagram: **ID7 mechanism** (`04-diagrams.md`).

- [ ] **What ID7 installs, stated plainly.**
  - [ ] v1 and v2 install a **byte-identical `/etc/passwd`** with three UID-0 accounts (`cmu`, `jci`,
        `user`) whose password hashes ship in every copy of the package — the `jci` one is a DES hash.
  - [ ] A second sshd with `PermitRootLogin yes`, `PasswordAuthentication yes`,
        **`PermitEmptyPasswords yes`**, `ListenAddress 0.0.0.0`, `StrictModes no`,
        `UsePrivilegeSeparation no`.
  - [ ] A firewall script opening the ports on **every interface including `wlan0`** — the rule that would
        have blocked SSH over WiFi is present but commented out. It deliberately re-opens 90 seconds later
        because the CMU's own firewall closes them at boot.
  - [ ] **v2 is broader than v1**: ports 22, 24000 *and* 36000 (v1 used only 24000).
  - [ ] It lives in `data_persist` and survives firmware updates by design. That is the point of the tool.
  - [ ] **Why this matters more on an EU car:** the CMU's WiFi is disabled on NA units but **enabled on
        EU/JP** ones.

- [ ] **What the mp3 method installs: nothing.** Four fake MP3 files, one HTML page, one CSS file, ~5 KB
      of JavaScript. No `/etc/passwd`, no sshd, no iptables, no persistence. It opens a terminal for one
      session and leaves nothing.

- [ ] **The route comparison table** + diagram. Conclusion to state explicitly: where both work, **mp3 is
      the less invasive option, not merely the more convenient one** — which inverts how every existing
      guide frames it ("ID7 is the easy way, mp3 is the fallback").

- [ ] **The unexplained artifact.** ID7 v2 ships a 220 KB stripped ARM ELF named `adb` in
      `44-recovery-recovery/`, installed persistently, undocumented in every source we found. Say that it
      has not been analysed. Do not speculate beyond the name.

- [ ] **Antivirus results**, honestly framed: 20 files scanned clean across 57–68 engines; 7 firmware
      images are over VirusTotal's ~650 MB analysis cap and **cannot be scanned by any method**, so for
      those the matching community MD5s are the only evidence. Link `/firmware/obtaining`.

- [ ] Cross-links: `/procedure/rebrand` (the routes in practice), `/firmware/points-of-no-return`,
      `/security/link-safety`, `/reference/open-questions`.

## `/security/link-safety.md` — Old guides, dead links, one hijacked domain

- [ ] **The headline, up top, unmissable.** 68wooley's Part 1 — still the reference guide, still bundled
      inside every firmware package circulating today — tells firmware-59 owners to follow
      `https://mazdatweaks.com/serial/`. As checked on 2026-08-24 that page serves an Indonesian
      lottery/gambling site ("Kpktoto"), while `mazdatweaks.com/` still renders a plausible
      "Mazda AIO Tweaks" homepage. `/id7/` returns 404.
  - [ ] Make the point that the working front page makes it **more** deceptive, not less: a reader
        arriving from the guide's link has no cue that anything is wrong.
  - [ ] The surviving copy of that material is the GitHub mirror `Trevelopment/mazdatweaks`.

- [ ] **How this surfaced**, briefly — it is a good illustration of why the project exists. An antivirus
      pass flagged the guide PDF (ESET alone, 1 of 65, `PDF/Phishing.A.Gen`). Examining the file showed
      **no active content at all** — no JavaScript, OpenAction, Launch, EmbeddedFile, SubmitForm or XFA,
      just 9 hyperlinks — so the detection is a false positive on the *file*. But checking those 9 links
      is what found the real problem.

- [ ] **The link table**, rendered with `LinkStatus` from `links.data.ts`: every historic host with its
      current state — HiDrive (share API returns `Not Found: share`), MEGA folders, 1fichier,
      OneDrive/bit.ly, `mazdatweaks.com` (hijacked), `mazdaman.x10host.com` (404) — and what replaced it
      where anything did.

- [ ] **What a reader should do**: how to tell whether a guide they found elsewhere is pre-2025, and which
      links in it to distrust.

- [ ] Cross-links: `/firmware/obtaining`, `/reference/sources`.

## Done when

- [ ] Both pages read as finished prose, not as extracted notes.
- [ ] Every claim carries its source id.
- [ ] The hijack warning is visible without scrolling on `/security/link-safety`.
- [ ] A reader with JS off sees the full link table.
