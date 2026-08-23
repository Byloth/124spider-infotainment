# C1 — MZD-AIO open-source project inventory

Research theme C1: the MZD-AIO ("All-In-One Tweaks") customisation tool itself — repos, releases,
tweak options, issues, and the Fiat-specific derivative tools — as relevant to a Fiat/Abarth 124
Spider owner restoring the Fiat boot logo and factory navigation after a Mazda v70 firmware upgrade.

Data gathered 2026-08-23 via `gh api` (GitHub REST, authenticated) and `curl`. Local archives were
already present in `research/archive/`.

> **Bottom line up front:** The upstream MZD-AIO app is a **Mazda** tweak installer. It contains **no
> Fiat logo, no factory-navigation-restore, and no 124-specific option**, and it has had **no release
> since v2.8.6 (2020-04-08)** — nothing for firmware 70.x/74.x. The Fiat boot-logo + navigation fix
> for v70 comes from **Ameridan's derivative repackage `MazdaToFiatV70AIO.zip`** (hosted on MediaFire,
> not GitHub), which wraps an older AIO build together with Fiat/Abarth assets and an NNG-navigation
> fix. See §6.

---

## 1. Sources (URLs, dates, link status)

All checked 2026-08-23; HTTP status from `curl -L`.

| Source | URL | Status | Notes |
|---|---|---|---|
| MZD-AIO repo (main app) | https://github.com/Trevelopment/MZD-AIO | 200 | Active repo page |
| MZD-AIO-TI repo (original) | https://github.com/Trevelopment/MZD-AIO-TI | **451 DMCA-blocked** | Access blocked since 2017-03-06 (NNG takedown) — see §2 |
| MZD-AIO-UI | https://github.com/Trevelopment/MZD-AIO-UI | **404** | Does not exist |
| GitHub REST API | https://api.github.com/repos/Trevelopment/... | 200 | Authenticated (`gh`) |
| Releases API dump | (saved) `research/archive/mzd-aio-releases.json` | — | 14 releases, full JSON |
| Releases text summary | (saved) `research/archive/mzd-aio-releases.txt` | — | tag/date/asset/size/URL |
| README (archived copy) | `research/archive/mzd-aio-readme.md` | — | README of v2.8.x |
| Issue #135 comments (archived) | `research/archive/mzd-aio-issue-135-comments.md` | — | serial/367 thread |
| Latest release asset (spot-check) | .../releases/download/v2.8.6/MZD-AIO-TI_Setup_2.8.6.exe | 200 | live |
| Wiki | https://github.com/Trevelopment/MZD-AIO/wiki | 200 (empty) | "Welcome to the MZD-AIO wiki / Create the first page" — **no pages** |
| mazdatweaks.com (homepage/homepage of author) | https://mazdatweaks.com | 200 | project homepage |
| AIO download mirror | http://dl.mazdatweaks.win | 200 | redirect shown in README badge |
| Ameridan derivative `MazdaToFiatV70AIO.zip` | http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file | 200 | live (§6) |
| Ameridan "Universal V70 Fiat AIO Tweak" article | https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ | 200 | 2019-02-18 (blog content covered by another agent) |
| Ameridan "Fix Navigation for v70" article | https://21stcenturyfiat124spider.wordpress.com/2019/01/31/fix-navigation-for-version-70-firmware/ | 200 | 2019-01-31 |

---

## 2. Repo table

Author account: **Trevelopment** (Trevor G. Martin), https://github.com/Trevelopment.
`ameridan` (https://github.com/ameridan) exists but has **0 public repositories** — his Fiat tools are
NOT on GitHub (see §6).

| Repo | Description | Stars | Forks | Last push | Archived | License | Relevance |
|---|---|---|---|---|---|---|---|
| **Trevelopment/MZD-AIO** | "Desktop app for AIO" (the installer GUI, the tool this whole KB is about) | 684 | 110 | 2024-06-13 | no | **GPL v3** (LICENSE says "MZD-AIO-TI … Copyright (C) 2017 Trevelopment"; GitHub API reports `NOASSERTION`/"Other") | **Primary.** Electron+AngularJS app; homepage mazdatweaks.com; wiki enabled but **empty**; 102 open issues; created 2016-09-06 |
| Trevelopment/MZD-AIO-TI | "Mazda All In One Tweak Installer" (the ORIGINAL repo name) | 24 (cached) | — | 2017-03-04 | — | GPL v3 | **DMCA-blocked (HTTP 451)** since **2017-03-06**, reason `dmca`, ref github/dmca 2017-03-06-NNG. This is why the live app repo was renamed to **MZD-AIO**. Not a fork (`fork=false`) |
| Trevelopment/cmu-autorun | "MAZDA CMU SDCard apps for recovery" | 10 | 1 | 2021-05-09 | no | none | Recovery/autorun SD-card scripts (ID7-adjacent tooling) |
| Trevelopment/mazdatweaks | "Mazdatweaks.com" (project website source) | 30 | — | 2024-11-27 | no | none | Website / download portal source |
| Trevelopment/headunit | "Headunit for Android Auto" (fork of gartnera/headunit) | 23 | — | 2021-07-28 | no | (fork) | Source of the bundled community **Android Auto** headunit app |
| Trevelopment/Mazda-Videoplayer | Videoplayer app for Mazda Connect v55+ (fork) | 17 | — | 2018-11-04 | no | (fork) | Bundled tweak, not Fiat-relevant |
| Trevelopment/MZD_Speedometer | Speedometer app for MZD | 18 | — | 2019-03-04 | no | — | Bundled tweak, not Fiat-relevant |
| trevormartinj7/MZD-AIO | "Desktop app for AIO" (same author's other account, apparent mirror) | 0 | — | — | no | — | Duplicate/mirror; no extra content |

Notes:
- **No repository named `MZD-AIO-UI` exists** (404).
- **No public fork/repo named `MZD-AIO-TI`** is findable via GitHub search (name is NNG/DMCA-sensitive);
  the only `MZD-AIO-TI` is the blocked original above.
- Other `MZD-AIO*` repos found: `CxOrg/MZD-AIO-Theme` (0★, themes), `adtoth/MZD-AIO-RACEBOX`
  (0★, Racebox integration) — neither Fiat-relevant.

---

## 3. Releases table

All from `Trevelopment/MZD-AIO`. **14 releases total; latest = v2.8.6 (2020-04-08). No release since.**
Every asset lives under `https://github.com/Trevelopment/MZD-AIO/releases/download/<tag>/<file>`.
Sizes in bytes (MB rounded). Assets verified present in the API dump; latest `.exe` spot-checked HTTP 200.

| Tag | Published | Assets (size) |
|---|---|---|
| **v2.8.6** *(latest)* | 2020-04-08 | `MZD-AIO-TI_Setup_2.8.6.exe` 191,084,384 (182 MB); `..._Win32.exe` 189,101,720 (180 MB); `...-mac_2.8.6.dmg` 217,128,280 (207 MB); `...-linux_2.8.6.deb` 160,111,756 (153 MB) |
| v2.8.5 | 2020-02-21 | `...Setup_2.8.5.exe` 194,580,965 (186 MB); `..._Win32.exe` 192,690,282 (184 MB); `...-linux_2.8.5.deb` 160,132,770 (153 MB) *(no mac asset)* |
| v2.8.4 | 2019-02-25 | Win 186,968,312 (178 MB); Win32 185,468,112 (177 MB); mac.dmg 204,312,456 (195 MB); linux.deb 157,905,512 (151 MB) |
| **v2.8.3** | 2018-11-19 | Win 186,410,568 (178 MB); Win32 180,400,752 (172 MB); mac.dmg 206,966,950 (197 MB); linux.deb 149,875,942 (143 MB) |
| v2.8.1 | 2018-09-30 | Win 183,096,296; Win32 177,189,480; mac 203,630,893; linux 147,307,294 |
| v2.8.0 | 2018-07-29 | Win 183,608,200; Win32 177,717,824; mac 204,430,970; linux 147,126,766 |
| v2.7.9 | 2018-04-11 | Win 183,235,576; Win32 176,569,760; mac 201,570,468; linux 148,369,170 |
| v2.7.8 | 2018-03-03 | Win 181,699,968; Win32 175,089,960; mac 199,652,969; linux 147,950,328 |
| v2.7.6 | 2018-01-16 | Win 144,561,872; Win32 139,031,528; mac 186,705,620; linux 142,455,744 |
| vv2.7.4 | 2017-12-26 | `...Setup_2.7.4.exe` 136,411,312; `..._2.7.4_win32.exe` 130,466,360; mac 157,007,668; linux 113,296,432 |
| v2.7.2 | 2017-11-26 | Win 110,962,920; Win32 105,418,904; mac 156,925,495; linux 112,856,028 |
| v2.7.0 | 2017-09-21 | `...Setup_2.7.0.exe` 110,553,864; `..._2.7.0_Win32.exe` 105,009,688; mac 150,468,284; linux 112,412,326 |
| v2.6.8 | 2017-07-29 | `MZD-AIO-TI_Setup.exe` 110,482,832; mac 159,329,785; linux 120,453,462 *(no separate Win32)* |
| colors | 2017-07-27 | `color-schemes.zip` 107,864,518 (103 MB) — downloadable extra colour-scheme pack, not the app |

Full URLs and byte sizes: `research/archive/mzd-aio-releases.txt` / `.json`.

**Versions cited for firmware 70.x work:** The upstream app is version-agnostic in its README
("These tweaks will only install on compatible firmware versions"), and community v70 work references
**v2.8.3+** through the final **v2.8.6**. Ameridan's Fiat derivative (§6) is built on an AIO build and,
per his own note, was **"just not updated with the newest MZD-AIO 2.8.6 package"** — i.e. the Fiat
repackage lags the upstream 2.8.6. There is **no upstream release targeting 70.00.335+/367 or 74.xx.**

---

## 4. Relevant tweak options for a Fiat 124 owner doing the v70 upgrade (with README's own compatibility text)

Read directly from `research/archive/mzd-aio-readme.md` (README of MZD-AIO-TI 2.8).

**Critical gap — what the upstream README does NOT contain:**
- **No "Fiat logo" / "124" / "Abarth" option** — zero occurrences. It is a Mazda-branded tool.
- **No factory-navigation restore option.** The only "navigation" reference is cosmetic:
  "Set Navigation Notifications Color" (statusbar tweak). Nothing restores Fiat/NNG maps.
- **No "ID7" mention** in the README at all. (ID7/serial backdoor is documented on mazdatweaks.com and
  Ameridan's blog, not in AIO's README.)
- **No Fiat/124-Spider instructions.** Supported cars are listed as: "Mazda 2 (DJ), Mazda 3 (BM),
  Mazda 6 (GJ), Mazda CX-3 (DK), Mazda CX-5 (KE), Mazda MX-5 Roadster (ND) and Mazda CX-9 (TC)."
  The 124 Spider shares the ND MX-5 CMU, so the tool physically works, but it is not addressed.

**Boot logo / boot animation** (closest upstream option to "Fiat logo"):
- "**Boot Animation** — Customize the boot animation."
- "**Disable/Enable the boot animation** to red button menu by Siutsch."
- These customise the *animation*; the Fiat/Abarth static boot logo restore is done by Ameridan's
  separate `Version_70_Fiat_Boot.zip` / `Version_70_Abarth_Boot.zip` and MazdaToFiatV70AIO (§6).

**Backup / restore:**
- Changelog 2.2.x: "**Backup Options**".
- Changelog 2.0: "More information and **backups are collected during tweak installation** (For planned
  'Save Backups to PC' and 'System Analysis' tweaks)." — i.e. backup capture exists; a full one-click
  *restore* tweak is described as *planned*, not shipped. No explicit "restore factory" option.

**Android Auto tweak (community app — reportedly does NOT work on 70.x):**
- README ships "**Android Auto Headunit App**" (bundled, "Android Auto v1.02" per 2.3.x changelog;
  underlying app "V0.93A (2016-07-29) by spadival / agartner"). Install via Applications menu after
  pairing over USB+Bluetooth.
- README compatibility disclaimer for the AIO Tweaks App generally: *"Every function in this app is not
  guaranteed to work."*
- README carries **no statement** that AA works on FW70; community reports (issue #36; issue #135
  comments) confirm the AA headunit app **does not start / is unstable on 70.00.x** ("The AndroidAuto
  (AA) is possible to install but it doesn't start after the connection of mobile. It's probably closed
  or well-secured for FW 70.00.XXX" — Nav1gatore, issue #135). Treat this AA tweak as non-functional
  on 70.x.

**README compatibility statements — quoted verbatim:**
- Global: *"**Only use with Firmaware >= v55.  DO NOT USE with V30/31/33 OR THE SYSTEM TO STAY AT MAZDA
  BOOT LOGO!!!!!**"*
- USB Audio Mod: *"## **NOT Compatible with FW v59.00.502+**"* (relevant: newer Fiat 59.00.5xx firmware
  is a compatibility trap — see CLAUDE.md).
- Install-time gating: *"These tweaks will only install on compatible firmware vesions."* The tweaks
  auto-checked for compatibility are listed as: *"track-order/FLAC support, no_more_disclaimer,
  list_loop, order_of_audio_source_list."*
- Track-order/FLAC support struck through as limited to specific 55/56/58 builds (ADR/EU/NA).

Other bundled tweaks (not Fiat-critical, listed for completeness): Touchscreen-while-driving, No More
Disclaimer, Reverse Camera Safety Warning removal, Semi-transparent parking sensors, Main Menu Loop,
Improved List Loop, No More Beeps, Audio source list order, Pause on Mute, 1-Sec Diag Menu, Date in
Status Bar, USB Audio Mod, Bigger Album Art, Speedometer, Castscreen receiver, Swapfile, Fuel
Consumption, Video Player, Background Rotator, Color Schemes, Speedcam patch.

---

## 5. Relevant issues table

From `Trevelopment/MZD-AIO` (searched terms: 124, Fiat, 70.00, 74.00, 367).

| # | State | Opened | Comments | Title | One-line conclusion |
|---|---|---|---|---|---|
| #36 | open | 2018-12-10 | 27 | Android Auto with FW 70 not working properly | Long thread confirming the bundled **AA headunit app is unstable / black-screens on FW70**; no clean fix; hardware USB-hub retrofit discussed as alternative. |
| #135 | open | 2021-09-18 | 34 | Serial solution doesn't work for 70.00.367 EU | **Key thread.** 70.00.367 neutralises ID7/serial (user/cmu/root+jci no longer log in); updates are **signed** so repacking is infeasible; **only path is downgrade to 70.00.352**; AA still won't launch on 352/367. (Full copy: `archive/mzd-aio-issue-135-comments.md`.) |
| #181 | open | 2023-07-02 | 1 | FW 70.00.367 to FW 70.00.335 | User stuck: mazdatweaks.com/id7 instructions reference an `update.up` file with no download link; unresolved. |
| #197 | closed | 2024-01-28 | 0 | Missing "update.up" file | Same missing-`update.up` problem for 70.00.367; closed with no answer. |
| #202 | open | 2024-02-26 | 1 | Do you have plans to update tweaks for 74.00.xx support? | **No maintainer commitment**; other users echo the request ("i too would like that", 2025-10-16). Confirms tool is unmaintained for 74.xx. |
| #95 | closed | 2020-08-14 | 11 | Serial connection with USB to TTL login issue | Serial login troubleshooting; ends with note that firmware/downgrade files are "hard to find," user wants to downgrade to use AA. |
| #124 | closed | 2021-06-27 | — | Reverse camera (request) | Matched only on the number "124"; **not** Fiat-124-Spider related. |
| #31 | closed | 2018-11-03 | — | Audio/performance issues with Pixel 3 | AA audio issue; tangential. |

(No issue explicitly titled for "Fiat" or "124 Spider"; the search-term "Fiat" matched only #36.)

---

## 6. Fiat-specific derivative tools located

Author: **Ameridan** (blog "21st Century Fiat/Abarth 124 Spider",
`21stcenturyfiat124spider.wordpress.com`). **Not on GitHub** — hosted as ZIPs on MediaFire. This
section only records URLs/filenames/versions/status; blog *content* is covered by a separate agent.

| Tool / file | Purpose | Download URL | Status | Version notes |
|---|---|---|---|---|
| **`MazdaToFiatV70AIO.zip`** | Master repackage: converts Mazda→Fiat/Abarth branding, fixes Fiat/Abarth **boot logos** and **NNG navigation** for FW v70; run as an AIO tweak set | http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file | **200 live** | "the recommended version to use for the conversion"; author notes it was **not rebuilt onto MZD-AIO 2.8.6** (lags upstream). Article: **Universal Version 70 Fiat AIO Tweak**, https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ (2019-02-18) |
| `Version_70_Fiat_Boot.zip` | Fiat static **boot logo** for v70 | http://www.mediafire.com/file/6al6as23hxqusm1/Version_70_Fiat_Boot.zip/file | 200 (listed) | standalone boot-logo installer |
| `Version_70_Abarth_Boot.zip` | Abarth **boot logo** for v70 | http://www.mediafire.com/file/bqhsl025ql05h74/Version_70_Abarth_Boot.zip/file | 200 (listed) | standalone boot-logo installer |
| `Fix_ver70_NNG.zip` | **Navigation** (NNG) fix for v70 | http://www.mediafire.com/file/ffjgv4cx7lv0b6f/Fix_ver70_NNG.zip/file | 200 (listed) | Article: **Fix Navigation for Version 70 Firmware**, https://21stcenturyfiat124spider.wordpress.com/2019/01/31/fix-navigation-for-version-70-firmware/ (2019-01-31) |
| `RemoveNNG.zip` | Remove NNG nav component | http://www.mediafire.com/file/2m9tt3hsbgb7gam/RemoveNNG.zip/file | 200 (listed) | related helper |
| `autorun_copy_to_usb.zip` | ID7/autorun recovery scripts to USB | http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip | 200 (listed) | ID7-adjacent |
| `All-in-one_tweaksV1.51Fiat_d` (folder) | Older AIO **v1.51 Fiat** variant | https://www.mediafire.com/folder/nmariu5t0fb4c/All-in-one_tweaksV1.51Fiat_d | 200 (folder) | predates v70 AIO |

Naming variants seen in text: `MazdaToFiat`, `MazdaToFiat70AIO`, `MazdaToFiatV70`, `MazdaToFiatV70AIO`
— all refer to the same `MazdaToFiatV70AIO.zip`. The MediaFire "…/file" landing URLs were confirmed
HTTP 200; the individual size/hash of each ZIP was not fetched here (binaries to be collected/hashed
per the `downloads/` workflow).

---

## 7. Open questions

1. **Exact AIO version inside `MazdaToFiatV70AIO.zip`.** Author says it was not rebuilt on 2.8.6 — which
   base build (2.8.3? 2.8.4?) does it wrap? Needs unzip + inspection when the binary is collected.
2. **Hashes/sizes of the MediaFire ZIPs** (MazdaToFiatV70AIO, Fiat/Abarth boot, Fix_ver70_NNG) — not
   captured; required before any can be marked "verified" per repo policy. MediaFire links live now but
   are decay-prone (single-host, no mirror).
3. **`update.up` file** referenced by mazdatweaks.com/id7 downgrade instructions has **no working
   download link** (issues #181, #197 unresolved). Where is it? Needed for 70.00.367→352/335 downgrade.
4. **Upstream is effectively abandoned for 70.x/74.x**: last release v2.8.6 = 2020-04-08; #202 shows no
   maintainer plan for 74.xx. Confirm no newer app exists on mazdatweaks.com beyond the GitHub 2.8.6.
5. **Point-of-no-return confirmation:** issue #135 corroborates CLAUDE.md's claim that 70.00.335+/367
   neutralise ID7/serial and that 70.00.352 is the last serial-enablable EU build — cross-check against
   the firmware-matrix agent's findings.
6. **Android Auto tweak status on 70.x**: README makes no claim; issues #36/#135 say it fails. Confirm
   whether AA on 70.x is only achievable via the hardware USB-hub retrofit (out of AIO scope).
7. **License nuance:** LICENSE file is GPL v3, but GitHub reports `NOASSERTION`/"Other" (header text
   differs from canonical). Note when discussing redistribution of AIO/derivatives.
8. **Wiki is empty** — no documentation there; all real docs live on mazdatweaks.com and Ameridan's blog.
