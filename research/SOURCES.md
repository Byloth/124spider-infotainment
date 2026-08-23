# SOURCES.md — master source registry

**Purpose.** Every source cited anywhere in the phase-1 raw research notes (`research/raw/A…F`),
consolidated into one registry: URL, type, author, dates, link status (as of the research sweep),
local archive path(s), a trust grade, a one-line summary, and cross-references where the same page
appears under several ids. This is the lookup table the other research docs (`INVENTORY.md`,
`FIRMWARE-MATRIX.md`, `PROCEDURE-DRAFT.md`, `OPEN-QUESTIONS.md`) cite with `[id]`.

**Date of registry:** 2026-08-23 (all link-status checks were done on that date).

**Total sources registered:** 231 — A-01…A-32 (32), B-01…B-29 (29), C1-01…C1-15 (15),
C2-01…C2-26 (26), D-01…D-25 (25), E-01…E-43 (43), F-01…F-61 (61).

## ID convention

The canonical id is the **raw-file-local id**, kept stable so the five sibling docs (written in
parallel) all resolve:

- `A-01…A-32` — from `raw/A-124spider-forum.md` (124spider.org forum sweep).
- `B-01…B-29` — from `raw/B-ameridan-blog.md` (Ameridan's WordPress blog).
- `C1-01…C1-15` — from `raw/C1-mzd-aio-project.md`. C1's §1 source table had **no ids**;
  they are assigned here `C1-01, C1-02, …` in that table's row order.
- `C2-01…C2-26` — from `raw/C2-firmware-tweak-compatibility.md`.
- `D-01…D-25` — from `raw/D-firmware-availability.md`. File D used `S-01…S-25`; **renamed
  `S-nn → D-nn`** (S-01→D-01, … S-25→D-25) so the `S-` prefix is free for the merged-doc scheme.
- `E-01…E-43` — from `raw/E-hardware-retrofit-kit.md`.
- `F-01…F-61` — from `raw/F-rollback-failures.md`.

Every id is kept even when the same URL recurs under several ids. The **"Alias / see also"** column
points each duplicate to its canonical (first/primary) occurrence — e.g. the "Universal Version 70
Fiat AIO Tweak" blog post is canonical **B-01** and is also **A-32, C1-14, C2-06, E-02, F-42**.

## Legend

**Link status (2026-08-23):**
- `live` — reachable by ordinary fetch (HTTP 200).
- `bot-blocked` — page exists for a browser but a JavaScript proof-of-work / Tollbit 402 paywall
  (VerticalScope/XenForo forums) or Cloudflare challenge blocks scripted fetch; read via Wayback.
- `login-walled` — needs an account (forum.miata.net).
- `paywalled/paid` — commercial or registration-gated (Mazda EU portal, resellers).
- `Wayback` — read only through a `web.archive.org` capture (no live read possible).
- `dead` — 403/404/410/DNS-fail/host gone; nothing served.
- `hijacked` — domain taken over by unrelated (spam) content.

**Trust scale (A–D, unified across all themes):**
- **A** — official Mazda / OEM / FCA-Fiat document (TSB, dealer bulletin, official install sheet,
  first-party CDN object, hash-verified firmware).
- **B** — experienced community author, corroborated by others (ASH8, 68wooley, Ameridan,
  Trezdog44, Tristan-cx5, madfiat…); or a reverse-engineer's technical write-up.
- **C** — single report / one shop listing / a search snippet / an unverified anecdote.
- **D** — marketing / vendor sales copy.

---

## 1. Access notes — how these sources can be reached today (2026-08-23)

Pulled from the "access notes" sections of the raw files. This is what a future archiver/maintainer
needs to know before trying to re-fetch anything.

- **VerticalScope / XenForo forums are bot-blocked.** `124spider.org`, `mazda3revolution.com`,
  `mazda6club.com`, `mazdas247.com` answer a **JavaScript proof-of-work challenge** (HTTP 202,
  `POW_CHALLENGE_DATA`) to `curl` and redirect scripted fetchers `307 → tollbit.<site> → 402
  Payment Required` (Tollbit paywall). Some pages also return HTTP **406** to scripts. Work-arounds
  used: a small PoW-solving curl wrapper (`research/archive/F-rollback/_vsfetch.py`) and, where that
  failed, **Wayback Machine captures** (`https://web.archive.org/web/<ts>id_/<url>`). Live pages
  themselves could not be read for theme A at all.
- **124spider.org** Wayback coverage is partial: the HowTo thread 32286 has captures of p1–2, 8–14,
  16–20 but **no capture of p3–7, p15, p21**; several threads (A-03, A-07, A-30, A-31) have **no
  Wayback capture** and were reachable only as search-engine snippets.
- **forum.miata.net is login-walled** ("temporarily requiring users to be logged in"). The two key
  Miata threads (the retrofit guide t=679114 and the mp3-hack origin post 142) could not be read
  directly; t=679114 has a partial Wayback capture, the mp3-hack thread does not.
- **mazdatweaks.com is hijacked** (Indonesian gambling spam on 2026-08-23). `/id7` returns **404**
  (dead since ~2025-08); `/serial/` still returns 200 in some checks but the site is compromised —
  treat every `mazdatweaks.com/serial` or `/id7` link in any guide as **dead**. The surviving copy
  of that material is the GitHub mirror **`Trevelopment/mazdatweaks`** (AIO-FAQ.md, id7.md).
- **`trevelopment.win/xx` is dead** (DNS fails); `dl.mazdatweaks.win` still 200. The ID7-Recovery-XX
  pack survives on GitHub (`Trevelopment/cmu-autorun` release "1").
- **MediaFire links are alive.** All of Ameridan's tweak zips and 68wooley's guide zip downloaded
  successfully on 2026-08-23 (hashes in `downloads/CHECKSUMS.sha256`).
- **Mazda USA firmware CDN (AWS S3) is open for NA objects.** `https://s3.amazonaws.com/
  tsd.mazdausa.com/MAZDA_CONNECT/<file>` serves **NA `.up` objects world-readable (HTTP 200)**;
  **bucket-listing is denied**, and **EU/ADR objects return 403**. Four NA images' MD5s matched
  community hashes exactly — first-party, clean, free. EU/ADR owners have no equivalent open source.
- **Mazda EU firmware** is the paid, registration-gated portal `portal.mazdaeur.com` /
  `mazdashare.com/mtds` (register as "Independent Operator", pay for time-based access) and holds
  only a thin current back-catalogue.
- **NHTSA** (`static.nhtsa.gov/odi/tsbs/…`) serves Mazda's dealer TSBs/Service-Alerts publicly —
  the closest thing to an official changelog.
- **Free community firmware mirrors are decaying:** the canonical Modfreakz **HiDrive** index is
  dead; **MEGA** folders load but are reported empty; **1fichier / bit.ly-OneDrive / odysee** links
  are mostly dead. The live free re-host in 2025–26 is the 124spider.org **Google-Drive** set
  (A-12 / D-11). Files otherwise change hands **by private message** ("Sent!").
- **WordPress blog (Ameridan) is fully alive** — every page returns 200; key posts have Wayback
  snapshots; author no longer owns a 124 (no further development), last comment 2026-08.
- Note on forum post dates: in some old-template Wayback captures the parsed `<time>` is the
  member's *join date*, not the post date — those post dates are approximate; post IDs are exact.

---

## 2. Master source table (grouped by category)

Columns: **id | title / what | URL | type | author | date range | link status (2026-08-23) |
local archive path(s) | trust | one-line summary | alias / see also**.
Archive paths are relative to `research/archive/`.

### 2.1 Official Mazda / FCA-Fiat / OEM documents

| id | title / what | URL | type | author | date range | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|---|---|
| D-01 | Mazda USA Technical-Service-Download firmware CDN (AWS S3) | https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/ | OEM CDN | Mazda USA | checked 2026-08-23 | live (NA objects 200; listing denied; EU/ADR 403) | `downloads/firmware/NA/` (5 files) | A | First-party dealer firmware; NA `.up` objects world-readable & hash-verified; the single most reliable free source | — |
| D-02 | Mazda dealer TSB / Service-Alert PDFs on NHTSA | https://static.nhtsa.gov/odi/tsbs/… | OEM TSB | Mazda NA Operations | 2016–2022 | live | `nhtsa-MC-*.pdf` (10 PDFs) | A | Official bulletins incl. TSB 09-022/19 changelog, 09-021/21, 09-018/22, retrofit memo MC-10144323, nav-SD & screen-crack SAs | see D-50/E-09 (MC-10144323) |
| D-03 | Mazda EU dealer portal ("Mazda Technical Download Server") | https://portal.mazdaeur.com / https://mazdashare.com/mtds | OEM portal | Mazda Europe | 2026 | paid/registration-gated | `wb-m3r-official-fw-download-eu-245120.html` | A | Official EU firmware but pay-per-time; only a thin current set (70.00.100A, 74.00.311A) found by a paying user | — |
| D-04 | "2018 FIRMWARE CMU UPDATE PROCEDURE-WORLDWIDE" dealer PDF (ref MME/E004/17, Jun 2018) | (WordPress + MediaFire mirrors) | OEM procedure | Mazda | Jun 2018 | live | `ameridan-firmware-cmu-update-procedure-worldwide-2018.pdf`; `downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf` | A | The actual 30-step dealer update procedure bundled with the files; brake/clutch every 20–25 min | alias B-§3.10 PDF; F-49; A-§2.5 |
| F-49 | Mazda firmware-update procedure WORLDWIDE PDF (9 pp, rev. w/ 70.00.335 notes) | https://www.billswebspace.com/MAZDA%20FIRMWARE%20UPDATE%20PROCEDURE%20WORLDWIDE.pdf | OEM procedure | Mazda | rev. ≥2019 | live | `F-rollback/mazda-cmu-software-update-procedure-worldwide.pdf/.txt` | A | Full + one-page procedure; 25-min ACC timer; CMU-sleep; "DO NOT turn IG OFF"; ROOM-fuse recovery | see D-04 |
| F-50 | Mazda NA TSB 09-024/16 (2016-07-05) | https://static.nhtsa.gov/odi/tsbs/2016/SB-10085418-6903.pdf | OEM TSB | Mazda NAO | 2016-07-05 | live | `F-rollback/mazda-na-tsb-09-024-16.pdf/.txt` | A | Battery-charger ~7 A during update; all loads off; SD/USB out; **all settings/pairings lost** | see D-02 |
| E-08 | Mazda "GENUINE USB Cable set INSTALLATION INSTRUCTIONS", p/n C922 V6 605, MX-5 (doc C92X_V6_605_01_00, 10 pp) | https://www.billswebspace.com/mx5z34.pdf | OEM install sheet | Mazda (PDF 2018-09-24) | 2018 | live | `hardware/mazda-usb-cable-set-install-instructions-mx5z34.pdf` (SHA256 1cfcc50e…) | A | The official cable/hub install sheet; parts, tools, wiring diagram, MX-5 trim list; "firmware FIRST … cannot update after hub fitted" | applies to 124 unchanged |
| E-09 | MNAO CarPlay/AA retrofit dealer bulletin + CSP02 (20 pp) | https://static.nhtsa.gov/odi/tsbs/2018/MC-10144323-9999.pdf | OEM bulletin | Mazda NA Operations | 2018-08-19 | live | `hardware/nhtsa-MC-10144323-9999-mazda-carplay-retrofit-bulletin.pdf` (SHA256 0e8d0222…) | A | Kit 0000-8F-Z34 = 1× TK78669U0C + 1× C922V6605; MSRP $199+labor; CSP02 free on 2018 Mazda6 Touring+; labor op YY800XRX 1.5 h | = D-02 (MC-10144323); alias E-50 |
| F-38 | 2x4logic JCI fail-safe reverse-engineering pages | http://www.2x4logic.com/jci-failsafe.html + /invokefailsafe.html | technical | majbthrd | 2016 | dead (site down); Wayback 2016 | `F-rollback/2x4logic-jci-failsafe.wayback2016.html`, `2x4logic-invokefailsafe.wayback20160605.html` | B | SPI-NOR partition map, why "fail-safe" isn't, boot-select byte @0x010000, Bus-Pirate procedure | — |
| F-58 | Mopar CMU part numbers for the 124 Spider | Mopar catalogues (68465853AA, 68460741AA) | parts catalogue | Mopar/FCA | — | store pages 403 to scripts | — | C | Fiat "Entertainment Telematic Module" p/ns 68465853AA (2017-19) / 68460741AA (2018-19); "does not participate in radio exchange" | see F-§7 |
| E-28 | Mazda Australia CarPlay/AA help page | https://www.mazda.com.au/owners/help-and-support/apple-carplay-and-android-auto/ | OEM | Mazda Australia | 2026 | live | `hardware/mazda-com-au-carplay.html` | A | Official AU: retrofit via dealer, "several hours", price on request (no numbers) | — |
| E-38 | Mazda Europe CP/AA + retrofit press announcement (via SPGlobal) | https://autotechinsight.spglobal.com/news/5245987/… | news / OEM PR | Mazda Europe (2018-07-12) | 2018-07-16 | live | `hardware/autotechinsight-mazda-carplay-2018.html` | A/B | Mazda EU announcement of CP/AA for all MZD Connect cars + retrofit; full text quoted in E-01 (eu.mazda-press.com now login-only) | — |

### 2.2 124spider.org forum threads

All bot-blocked live (POW/Tollbit 402); read via Wayback or PoW wrapper. Canonical id = the theme-A
id where the thread appears there; threads only surfaced by themes E/F keep their own id.

| id | thread | URL (124spider.org/threads/…) | OP / author | date range | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|---|
| A-01 | CarPlay / Android Auto Upgrade HowTo (32286) | …carplay-android-auto-upgrade-howto.32286/ | 68wooley | OP 2019-02; to 2024-06 (21 pp) | bot-blocked; Wayback p1-2,8-14,16-20 | `124spider-howto-32286-p*.html` | B | THE canonical 124 guide (firmware Part 1 + hardware Part 2); OP text outdated → follow PDF v3.0 / blog | E-04, F-17 (page-6) |
| A-02 | 68wooley PDF guide zip `124Spider_CP_AA_Upgrade_Guide.zip` | mediafire.com/file/201759io15ariii/… | 68wooley | Part1 v3.0 2019-05-17 | live (downloaded 7.8 MB) | `mediafire/124Spider_CP_AA_Upgrade_Guide/` | B | Updated procedure PDF (uses MazdaToFiatV70AIO; warns off 70.00.335); zip SHA256 5972…743b0 | C2-13 (Part-1 PDF); E-04 |
| A-03 | Mazda made up a mess!!! FW 70.00.367 (39292) | …mazda-made-up-a-mess-fw-70-00-367.39292/ | EU user | 2021 | bot-blocked; **no Wayback** (snippets) | `124spider-mazda-mess-70.00.367-39292.html` (F copy) | C | Dealer flashed 70.00.367 vs instructions; downgrade to .100 didn't restore tweaks; serial only | F-04 |
| A-04 | OK…Screwed up the Infotainment Upgrade – Fixed!! (38071) | …ok-screwed-up-the-infotainment-upgrade-fixed.38071/ | Bob T | Oct 2020 | bot-blocked; archived | `124spider-screwedup-38071-p1/p2.html` | B | Old DOS AIO 1.5 on v70 → boot loop; Speedometer tweak → brick; fixed w/ used CMU ($125, 59.00.563) | F-02 |
| A-05 | USB not recognized after downgrade 70.00.100A→59.00.502 (38159) | …infotainment-not-recognizing-usb…38159/ | manwithastick | Oct–Dec 2020 | bot-blocked; archived | `124spider-usb-not-recognized-38159-p1.html` | B | Downgraded to run AA Tru_Go 1.14b; USB stopped autorunning (dying stick); bought Mazda3 CMU | C2-21, F-01 |
| A-06 | Android Auto Upgrade (38677) | …android-auto-upgrade.38677/ | Griswold381 | Jan–Mar 2021 | bot-blocked; archived | `124spider-android-auto-upgrade-38677-p1.html` | C | Asks for install service; replies: AliExpress genuine kit ~$105, serial hack on v59 | — |
| A-07 | Car play easy update (41206) | …car-play-easy-update.41206/ | unknown | Feb 2022 | bot-blocked; no Wayback (snippet) | — | C | Non-OEM hub+cable (Amazon); "update software first, then hub; some knockoffs may not work" | E-41 (partial) |
| A-08 | MazdaToFiat70AIO on 70.00.335C / 70.00.352B — SUCCESS (38004) | …mazdatofiat70aio-and-cmu-firmware-70-00-335c-or-70-00-352b-success.38004/ | 124geek | Sep 2020 | bot-blocked; archived | `124spider-aio-335c-352b-success-38004.html`; `wb-124s-38004.*` | B | Run MazdaToFiatV70AIO on 335/352 by editing tweaks.sh (`_VER_EXT -le 360`) from AIO 2.8.6 stick | C2-12, F-09 |
| A-09 | Mazda Cracked Down / Removed Firmware Downloads (40247) | …mazda-cracked-down-removed-firmware-downloads…40247/ | AnClar | Aug–Dec 2021 | bot-blocked; archived | `124spider-mazda-crackdown-40247-p1/p2.html` | B | Nov 2021: all firmware hosts (HiDrive, ASH8's links) taken down; sharing by PM after | C2-15 |
| A-10 | CMU Firmware V70.00.100 (EU) (42393) | …cmu-firmware-v70-00-100-eu.42393/ | Neighbour (UK) | Oct 2022 | bot-blocked; archived | `124spider-cmu-fw-70-00-100-eu-42393.html`; `wb-124spider-cmu-firmware-70.00.100-eu-42393.html` | C | UK owner hunting EU 70.00.100 files; littletone101 has them | D-12 |
| A-11 | File for 70.00.100 firmware? (44172) | …file-for-70-00-100-firmware.44172/ | bstem (AU) | 2024-02 → 2025-07 | bot-blocked; p1 archived | `124spider-file-for-70-00-100-44172.html`; `wb-124spider-file-for-70.00.100-44172.html` | B | Files shared by PM (NA/EU/ADR); a Google-Drive link posted then removed | D-12 |
| A-12 | Firmware Files Download Locations (45543) | …firmware-files-download-locations.45543/ | AegirTheLucky | 2025-01-28 → Aug 2025 | bot-blocked; p1 archived | `124spider-firmware-download-locations-45543.html`; `wb-124spider-firmware-files-download-locations-45543.html` | B | Public Google-Drive zips NA/EU/ADR + v74 NA + MZD-AIO; one EU brick report | **D-11** |
| A-13 | V70 Tweaks without ID7 — YES YOU CAN! (45965) | …v70-tweaks-without-id7…45965/ | madfiat | 2025-05 → Jul 2025 | bot-blocked; p1 archived | `124spider-v70-tweaks-without-id7-45965.html` | B | MP3-payload root method to run MazdaToFiatV70AIO/MZD-AIO on v70 & v74 without ID7/serial | C2-19, F-10 |
| A-14 | Upgrading to Native AA from V56 tweaks AA (45021) | …upgrading-to-native-aa-version-from-v56-tweaks-aa.45021/ | Scorpius | 2024 | bot-blocked; p2 archived | `124spider-upgrading-native-aa-45021-p2.html` | C | Has AA-tweak on v56, wants native v70; little content | — |
| A-15 | Some settings not displaying after 70.00.100NA A (42919) | …some-settings-not-displaying…42919/ | Liz787 | Jan 2023 | bot-blocked; archived | `124spider-settings-not-displaying-42919.html` | C | Non-issue: some settings show only in ACC/ON | — |
| A-16 | CarPlay installed, rebranding Mazda→Fiat doesn't happen (41032) | …apple-carplay-installed-rebranding…41032/ | Ausboy (AU) | Dec 2021–Jan 2022 | bot-blocked; archived | `124spider-rebranding-not-happen-41032.html`; `wb-124spider-rebranding-not-happen-41032.html` | B | 70.00.100A-NA flashed on an AU car; ID7 step skipped → serial needed; auto-lock missing | E-40, D-12 (partial) |
| A-17 | Odd man out — CMU update 74.00.230 (39761) | …odd-man-out-cmu-update-74-00-230.39761/ | Garrettt93 | Jun 2021 | bot-blocked; archived | `124spider-cmu-74-00-230-39761.html` | C | Installed 74.00.230 NA: smoother; no rebrand (no ID7); asks about repacking .up | F-14 |
| A-18 | Mazda CarPlay/AA USB Retrofit Kit (38673) | …mazda-apple-carplay-and-android-auto-usb-retrofit-kit.38673/ | frankmar | Jan 2021 | bot-blocked; archived | `124spider-retrofit-kit-38673.html`; `wb-124spider-38673.html` | C | AliExpress genuine kit item 1005001447410048, ~US$106 | E-40 |
| A-19 | All In One Tweaks V1.51 and Android Auto (42151) | …all-in-one-tweaks-v1-51-and-android-auto.42151/ | derekperry37 (UK) | Oct 2022–Jan 2023 | bot-blocked; archived | `124spider-aio-151-aa-42151-p1/p2.html` | C | AA-tweak versions (1.13/1.14b/1.15/1.15b); don't mix tweak-AA with official AA | — |
| A-20 | Installing AA via MZD-AIO on v56 (40537) | …installing-android-auto-using-the-mzd-aio…on-to-version-56.40537/ | LondonAbarth124 | Oct 2021 | bot-blocked; archived | `124spider-aa-via-aio-v56-40537.html` | C | Hub only needed for power/CarPlay; MZD-AIO AA "compatible with v56" | — |
| A-21 | Is the official Abarth/Fiat CMU SW downloadable? (38211) | …is-the-official-abarth-fiat-cmu-sw-available-for-download.38211/ | jayrock (DE) | Oct 2020 | bot-blocked; archived | `124spider-official-fiat-cmu-sw-38211.html` | C | Asks for genuine Fiat 59.00.561 EU N failsafe+reinstall — no one has it | — |
| A-22 | Infotainment update (freeze) (39797) | …infotainment-update.39797/ | DAC17 | Jun 2021 | bot-blocked; archived | `124spider-infotainment-update-39797.html` | C | Random lock-ups; reboot = hold Mute+Nav 10 s; Speedometer tweak blamed | — |
| A-23 | Carplay Up and Running (30666) | …carplay-up-and-running.30666/ | rsmagee (UK) | 2018-08 → 2023 (29+ pp) | bot-blocked; p1/p25/p29 archived | `124spider-carplay-up-and-running-30666-p1/p25/p29.html` | B | First UK install (EU fw, £196); history of HiDrive moves, 335C lockout, ID7 v2 news | E-05 |
| A-24 | Mazda screen BHP1611J0D + CMU BJS7669C0K for sale (38459) | …124-spider-mazda-screen…tweaks-installed.38459/ | manwithastick | Dec 2020 | bot-blocked; archived | `124spider-mazda-screen-tweaks-38459.html`; `wb-124s-38459.*` | C | Mazda3 CMU BJS7669C0K fits Spider; not VIN-locked; 59.00.502 NA N + ID7 + AA Tru_Go | F-18 |
| A-25 | No sound with CarPlay (41439) | …no-sound-with-carplay.41439/ | Natnat | Apr 2022 | bot-blocked; archived | `124spider-no-sound-carplay-41439.html` | C | No sound after install → a speaker connector not fully seated | — |
| A-26 | Apple Carplay DIY or replace… (39874) | …apple-carplay-diy-or-replace-with-a-different-infotainment.39874/ | cje11 | Jun 2021 | bot-blocked; archived | `124spider-carplay-diy-or-replace-39874.html` | C | ~4 h; $150 hub + $100 wireless dongle; no DIN option for 7" cars | — |
| A-27 | Android Auto without hardware change (33670) | …android-auto-without-hardware-change.33670/ | iassaei (EU) | Jul 2019 | bot-blocked; archived | `124spider-aa-without-hw-33670.html` | C | AA head-unit tweak runs on v56 without hub; ameridan: install ID7 anyway | — |
| A-28 | Tweaks and Mods for dummies (37676) | …tweaks-and-mods-for-dummies.37676/ | Spider Fan Buffalo | Jun 2020 | bot-blocked; archived | `124spider-tweaks-for-dummies-37676.html` | C | General encouragement; little technical content | — |
| A-29 | February 2021 North America Nav update available (38950) | …february-2021-north-america-nav-update-available.38950/ | — | Feb 2021 | bot-blocked; archived | `124spider-feb2021-nav-update-38950.html` | C | Map update (not firmware); not read in detail | — |
| A-30 | V59.00.524 to Car Play / Android Auto (42352) | …v59-00-524-to-car-play-android-auto.42352/ | 2018 NA user | Sep–Oct 2022 | bot-blocked; no Wayback (snippet) | `wb-124spider-59.00.524-to-carplay-42352.html` | C | Serial-method upgrade from 59.00.524, "no major issues"; factory nav retained | E-41 (partial) |
| A-31 | CarPlay installation question (42640) | …carplay-installation-question.42640/ | — | ~2023 | no Wayback; not read | — | — | (not read) | — |
| A-32 | Ameridan blog posts referenced by the forum | 21stcenturyfiat124spider.wordpress.com/2019/02/18/… ; …/2025/05/25/… | ameridan | 2019 / 2025 | live | (see B) | B | Forum repeatedly says "follow the blog / PDFs, not the OP" | **B-01, B-04** |
| F-03 | I bricked my CMU then recovered it (22986) | …i-bricked-my-cmu-then-recovered-it.22986/ | Doriath; SJWhiteley; Mrphanbg | 2017-12 → 2020-02 | bot-blocked | `F-rollback/124s-22986-p1.*` | B | Two full recovery write-ups (SPI-NOR squashfs passwd; CH341A boot-select FF→00) | — |
| F-05 | Update my CMU and now I have Mazda (HELP) (45814) | …update-my-cmu-and-now-i-have-mazda-help.45814/ | (owner) | 2025-04 → 08 | live | `F-rollback/124s-45814-p1.*`; `wb-124spider-update-cmu-now-mazda-45814.html` | B | Flashed 70.00.100A without ID7 → locked out; mp3 method; "id7/serial no longer needed" | D-12 (partial) |
| F-06 | Issues with tweaks v1.51 after v70 CarPlay upgrade (40317) | …issues-with-tweaks-v1-51-after-v70-carplay-upgrade.40317/ | kd215 | 2021-09 | live | `F-rollback/124s-40317-p1.*` | B | AIO 1.51 on v70 bricked CMU; used 2018 124 CMU $285; redid ID7→100→MazdaToFiat→AIO 2.8.6 | — |
| F-07 | Infotainment update question (41083) | …infotainment-update-question.41083/ | (owner) | 2022-01 → 2023-01 | live | `F-rollback/124s-41083-p1.*` | C | 2017 CMU into 2019 car; ID7 first; firmware before hub; mega link dead by 2023 | — |
| F-08 | Version 74.00.324 CMU Firmware Discussion (45963) | …version-74-00-324-cmu-firmware-discussion.45963/ | madfiat et al. | 2025-05 → 12 | live | `F-rollback/124s-45963-p1/p2.*`; `wb-124spider-v74-discussion-45963-p1/p2.html` | B | v74.00.324 on 124 works; rebrand+nav via mp3 w/ script edits; "need ORIGINAL USB module for upgrade" | D-12 (partial) |
| F-11 | Install tweaks using Mazda mp3 hack to v59/v70 (45459) | …install-tweaks-using-mazda-mp3-hack-to-v59-v70.45459/ | Esch | 2024-12 → 2025-07 | live | `F-rollback/124s-45459-p1.*` | C | mp3 hack reached diag/terminal on a v59 2019 Lusso; Fiat scripts not yet done then | — |
| F-12 | Tweak firmware v74 and older with only USB (44940) | …tweak-firmware-v74-and-older-with-only-usb.44940/ | (owner) | 2024-08 → 2025-05 | live | `F-rollback/124s-44940-p1.*`; `wb-124spider-tweak-v74-usb-only-44940.html` | C | Points to miata.net guide (posts 142/143); madfiat confirms on v70 | — |
| F-13 | SD card help needed (40534) | …sd-card-help-needed.40534/ | (owner) | 2021-10 | live | `F-rollback/124s-40534-p1.*` | C | Used 2018 Lusso from Fiat dealer with 74.00.230 NA N: Mazda logo, compass-only nav; 74.00.230 downgradable | — |
| F-15 | Software program updates (43884) | …software-program-updates.43884/ | (owner) | 2023-11 | live | `F-rollback/124s-43884-p1.*`; `wb-124spider-software-program-updates-43884.html` | C | Indie shop billed $515 for a "software update" on a 59.00.524 NA N car; no official Fiat access | — |
| F-16 | Is it possible to upgrade the infotainment software (45237) | …is-it-possible-to-upgrade…45237/ | UK owners | 2024-10 → 2025-03 | live | `F-rollback/124s-45237-p1.*` | C | "no hardware needed for AA, only CarPlay" ❓ (contradicted by F-08) | — |
| F-59 | Software debacle, part II (40588) | …software-debacle-part-ii.40588/ | (owner) | 2021-10 | 406; no Wayback (snippet) | — | C | A Fiat dealership flashed Mazda 74.x onto a 59.00.562 NA N car by mistake | — |
| F-60 | CMU serial port blown out (43811) | …cmu-serial-port-blown-out.43811/ | (owner) | 2023 | 406; snippet only | — | C | Bare TX wire touched CMU case → USB-TTL burned; serial no longer connectable (2019, 59.00.562) | — |
| F-61 | Confirmed CarPlay through replacement CMU (42231) | …confirmed-carplay-through-replacement-cmu.42231/ | (owner) | 2022 | 406; snippet only | — | C | Confirmed path for locked 2018.5+ cars: fit used v56 CMU → ID7 → v70 → hub → tweaks | — |
| E-39 | Updated CarPlay hardware / wireless / adapter-hub threads (43650, 43766, 42115, 43933, 43852) | …/updated-carplay-hardware-w-usb-c-and-fast-charging.43650/ (+4) | (owners) | 2022–2025 | bot-blocked, **no Wayback** (snippets) | — | C | USB-C (27 W PD) & wireless clone hubs; hub-only swap ≈10 min; wireless needs 74.00.200+ | — |

### 2.3 Ameridan blog posts (21stcenturyfiat124spider.wordpress.com)

Blog by "ameridan" (Dan Adkins, USA; 2017 Fiat 124 Classica on 56.00.521 NA N; never went to v70;
no longer owns the car). Every page returns 200; all archived locally under `ameridan/`. URLs below
omit the `https://21stcenturyfiat124spider.wordpress.com` prefix. Trust B throughout (experienced,
corroborated author). Canonical id = B-nn; aliases from other themes noted.

| id | title | URL path | date range | archive | summary | alias / see also |
|---|---|---|---|---|---|---|
| B-01 | Universal Version 70 Fiat AIO Tweak | /2019/02/18/universal-version-70-fiat-tweak/ | 2019-02-18, edits to 2025-08; 194 comments | `ameridan/universal-version-70-fiat-tweak.*`, `ameridan-universal-v70-fiat-aio.html`, `…-comments-p1.html` | THE master guide: MazdaToFiatV70AIO + 68wooley Part 1/2; 335/352 neutralizeid7 warning; serial pins; mp3-hack addendum | **A-32, C1-14, C2-06, E-02, F-42** |
| B-02 | Fixing factory Navigation for Version 70 firmware | /2019/01/31/fix-navigation-for-version-70-firmware/ | 2019-01-31, edits to 02-16; 34 comments | `ameridan/fix-navigation-for-version-70-firmware.*`, `ameridan-fix-navigation-v70.html` | Replace Mazda v70 `/jci/nng` with NA Fiat NNG folder → Fiat SD nav works; NA folder works NA/EU/ADR, not JP | **C1-15, C2-(nav), F-43** |
| B-03 | Common tweaks that work in the Fiat 124 Infotainment 7.0 | /ameridans-radio-silencer/common-tweaks-that-work-…-7-0/ | 2016-08 → 2025; 383 comments | `ameridan/common-tweaks-that-work-…`, `common-tweaks-cp{1,2,3}.*`, `ameridan-common-tweaks.html` | v56 tweaking; region/suffix legend; Fiat version list; ID7 "#backdoor" section; SPI-flash brick fix | **C2-02** |
| B-04 | V70 & V74 Tweaks without ID7 — YES YOU CAN! (mp3 hack) | /2025/05/25/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/ | 2025-05-25; 40 comments to 2026-06 | `ameridan/v70-tweaks-without-id7-…`, `ameridan-v70-tweaks-without-id7-mp3-hack.html` | madfiat's mp3-hack (mzd-connect-1-root + USB keyboard → terminal → tweaks.sh) on locked v70/v74; v74 line edits | **A-32, C2-05, F-41** |
| B-05 | Preserve your ability to Tweak in future firmware versions (ID7 v1) | /2017/08/29/preserve-your-ability-to-tweak-in-future-firmware-versions/ | 2017-08-29 | `ameridan/preserve-your-ability-…`, `ameridan-preserve-tweak-id7.html` | ID7 autorun v1 (`autorun_copy_to_usb.zip`); why 59.00.502 locked USB; install on 56.x | **C2-01** |
| B-06 | Preserve … VERSION 2.0 (ID7 v2) | /2019/05/20/preserve-your-ability-to-tweak-in-future-firmware-versions-version-2-0/ | 2019-05-20; 8 comments | `ameridan/preserve-…-version-2-0.*`, `ameridan-preserve-tweak-v2-id7v2.html` | trezdog44's ID7 Recovery v2 vs 70.00.335-C neutralizeid7; "no v2 before .335 = never tweak again" | **C2-04** |
| B-07 | Replacing Mazda bootup/shutdown animations | /2018/11/04/replacing-mazda-bootup-shutdown-for-those-installing-carplay-hub/ | 2018-11-04, upd. 2019-01-31; 10 comments | `ameridan/replacing-mazda-bootup-shutdown-…`, `ameridan-v70-boot-animations.html` | Version_70_{Fiat,Abarth}_Boot.zip / Uninstall_Animations; serial wiring; order id7→v70→hub | — |
| B-08 | Freeing up memory in Version 70 firmware | /2018/11/11/freeing-up-memory-in-version-70-firmware/ | 2018-11-11, upd. to 2025-03; 17 comments | `ameridan/freeing-up-memory-…`, `ameridan-freeing-memory-v70-jci-test-mode.html` | RemoveNNG.zip, JCI_Test_Mode_Control.zip (T/M button → USB DRIVER/TERMINAL = basis of mp3 hack) | — |
| B-09 | Replacing the CMU to get CarPlay/AA (+ retrofit kit) | /2018/04/30/replacing-the-cmu-to-get-apple-carplay-and-android-auto/ | 2018-04-30, upd. to 2023-02; 15 comments | `ameridan/replacing-the-cmu-to-get-…`, `ameridan-carplay-retrofit-kit.html` | Retrofit kit details: hub TK78-66-9U0C (orange/Japan vs green KD5J China), cable sets, ASH8 order rules | **E-01, F-45** |
| B-10 | New Fiat firmware is showing up (59.00.524) | /2018/04/22/new-fiat-firmware-is-showing-up/ | 2018-04-22; 10 comments | `ameridan/new-fiat-firmware-is-showing-up.*`, `ameridan-new-fiat-firmware-59.html` | 2018 NA Abarth ships 59.00.524 (≈Mazda 59.00.502) → USB tweaks impossible; install id7 before dealer visit | **C2-03, F-44** |
| B-11 | Exclusive Tweak ~ An Abarth Shutdown Animation | /2018/10/03/exclusive-tweak-an-abarth-shutdown-animation/ | 2018-10-03 | `ameridan/exclusive-tweak-an-abarth-shutdown-animation.*` | ExitLogo.ivf (754 KB) by Stef for AIO 1.51Fiat_d; memory warning for v70 | — |
| B-12 | Abarth 124 startup screens / unique parts | /2017/03/11/abarth-124-startup-screens/ | 2017-03-11, upd. to 2022-11; 30 comments | `ameridan/abarth-124-startup-screens.*` | Option [X] Abarth boot animation (EU fw files); ffmpeg `.ivf` (VP8) build commands | — |
| B-13 | New USB Audio Tweak | /2018/10/19/new-usb-audio-patch-tweak/ | 2018-10-19; 7 comments | `ameridan/new-usb-audio-patch-tweak.*` | `USB_Tweak.zip` (Enlsen's USB Audio Mod, AIO 2.8.0) — v55–59.00.449 only, NOT v70 | — |
| B-14 | Update for Date-to-Statusbar Tweak | /2018/11/03/update-for-date-to-statusbar-tweak/ | 2018-11-03, upd. 11-11; 8 comments | `ameridan/update-for-date-to-statusbar-tweak.*` | `StatusBar_Tweak.zip` (AIO 2.8.2; works v56/59/70 with id7); downgrade below 59.00.502 impossible | — |
| B-15 | Resolving Touchscreen Issues | /2018/02/03/tweak-to-disable-touchscreen-input/ | 2018-02-03, upd. to 2025-07; 8 comments | `ameridan/tweak-to-disable-touchscreen-input.*` | trezdog44's Fully-Disable-Touchscreen.zip; screen part #s; ash8's blind factory-reset for black screens | — |
| B-16 | Adding Wireless CarPlay | /2021/01/04/adding-wireless-carplay/ | 2021-01-04, upd. to 05-31; 22 comments | `ameridan/adding-wireless-carplay.*` | Wireless CP needs 74.00.200+ AND new CMU hardware → not for our CMU; dongle reports | **E-03** |
| B-17 | Infotainment Replacement Touch-Screen Details | /2022/08/14/infotainment-replacement-screen-details/ | 2022-08-14, upd. to 2023-04; 14 comments | `ameridan/infotainment-replacement-screen-details.*` | Delamination fix: digitizer TM070RDZ38; Mazda screen assy D0YP-61-1JZ (all 124 years); TSB pdf | **F-46** |
| B-18 | Encouraging news re CarPlay and Android Auto | /2017/03/15/encouraging-news-regarding-apple-carplay-and-android-auto/ | 2017-03-15; 10 comments | `ameridan/encouraging-news-…*` | Mazda's 2017 CP/AA announcement; JCI/Visteon Linux CMU background | — |
| B-19 | M.Y. 2019 Fiat Connect? | /2017/09/25/my-2019-fiat-connect/ | 2017-09-25; 7 comments | `ameridan/my-2019-fiat-connect.*` | CMU supplier speculation; 70.00.00 beta screenshots; expectation Fiat would release v70 (never did) | — |
| B-20 | Navigation | /2016/10/30/navigation/ | 2016-10-30, upd. to 2021-02; 176 comments | `ameridan/navigation.*`, `navigation-cp1.*` | Mopar card 68366118AA, suffix legend, VIN-lock (62 mi), Toolbox, XCOPY cloning, NA map saga | — |
| B-21 | New map updates (December 2018) | /2018/12/10/new-map-updates-dated-december-2018-are-available/ | 2018-12-10; 7 comments | `ameridan/new-map-updates-dated-december-2018-…*` | Dec-2018 NA / Feb-2019 EU maps; manual-copy theory (keep `license`) | — |
| B-22 | New map updates (August 2022, was June 2019) | /2019/06/07/new-map-updates-dated-june-2019-are-available/ | 2019-06-07, upd. to 2023-12; 46 comments | `ameridan/new-map-updates-dated-june-2019-…*` | Last maps ever = Aug 2022; Toolbox EOL Dec 2023; 16 GB card imaging | — |
| B-23 | Welcome / Radio Silencer (home) | /ameridans-radio-silencer/ | 2016→; 62 comments | `ameridan/ameridans-radio-silencer.html` | Home; comments = 70.00.100 source hunting, 59.00.562 "not tweakable", serial pointer | — |
| B-24 | Blog articles (index) | /blog/ | index | `ameridan/blog.html` | Post index (titles/dates) | — |
| B-25 | Complete Specifications | /specs/ | living; 243 comments | `ameridan/specs.html` | CMU apps list, TSB table (screen TSB 09-036 ❓ vs 09-136/22), Mazda Connect FAQ PDF | — |
| B-26 | The Infotainment Control Buttons | /2016/11/16/the-infotainment-control-buttons/ | 2016-11-16 | `ameridan/the-infotainment-control-buttons.html` | Diagnostics key combos (Music+Favorites+Mute), test options 11–19, "DISPLAY TOGGLE = black screen" | — |
| B-27 | TAU exchange hookup (EU⇔NA tuner) | /2021/06/11/european-⇔-north-american-tuner-module-tau-exchange-hookup/ | 2021-06-11 | `ameridan/european-___-north-american-tuner-module-tau-exchange-hookup.html` | Market switch: firmware region flash reprograms tuner; TAU part readout (Test 85) | — |
| B-28 | Gracenote database updates (v8/9/12) | /2022/12/05/…, /2018/10/16/…, /2017/12/22/…, /2016/09/29/… | 2016–2022 | `ameridan/gracenote-*.html` | v70 upgrade resets Gracenote to v8; Gracenote_xx_January2022.up on s3.amazonaws.com/visteon | — |
| B-29 | Supporting/context posts (fuel-economy, screenshots, BT, camera, canbus, waypoints, emblem, about, favorites…) | (14 URL paths, see raw B §1.3) | various | `ameridan/*.html` | Archived for completeness; no firmware/upgrade facts beyond the above | — |

### 2.4 mazda3revolution.com threads

All VerticalScope/XenForo → live but bot-blocked (Tollbit 402 / HTTP 406); read via Wayback or PoW
wrapper. URLs abbreviated to `m3r.com/threads/…<id>`.

| id | thread (id) | author / dates | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|
| C2-10 | AIO Tweaks and Firmware Ver .502 – READ THIS (200450) | arathol 2017-06; Trezdog44/id7 posts | bot-blocked; Wayback p1/19/66/75/77/80 | `wb-m3r-aio-tweaks-fw-502-200450-p*.html` | B | Origin of ID7: id7's analysis of the .502 lockdown; autorun.v2/v3 zips; Tristan-cx5 "what works where" | — |
| C2-11 | ID7 Recovery v2 (234619) | Trezdog44 2019-05-20 → | bot-blocked; Wayback p1-4,11,17,20 | `wb-m3r-id7-recovery-v2-234619-p*.html` | B | Pre-installed v2 FAILED on 335; working method = serial during update; redo after every flash; 367 no | **F-29**; see B-06 |
| C2-16 | MZD I connect firmware info/hints (236211) | Tristan-cx5 2019-08-29 → | bot-blocked; local Wayback | `wb-m3r-mzd-i-connect-firmware-info-hints-236211.html`; `F-rollback/m3r-236211-p1.*` | B | Best plain-English explainer: region codes, suffixes, update/downgrade rules (floor 59.00.502) | **D-05, F-24** |
| D-06 | Mazda-MZD Connect FIRMWARE Downloads-UPDATED (180578) | ASH8 | bot-blocked; Wayback | `wb-m3r-firmware-downloads-updated-180578.html`; `F-rollback/m3r-180578-p1.*` | B | Original file index (links DMCA-stripped); "born on ≥59.00.xxxx DO NOT roll back"; nav-SD VIN lock | **F-33** |
| D-07 | NEW 74 Mazda CONNECT MZD Firmware, CP/AA, WCP, Help (236775) | ASH8 | bot-blocked; Wayback | `wb-m3r-new-74-firmware-236775.html`, `wb-m3r-236775-p13.html` | B | Current distribution hub; files only by PM to @ASH8 (MEGA link) | see A-§3 (post-2520624) |
| C2-17 | MZD-AIO tweak on FW 74+ (252435) | aeromiata 2024-11 → 2025-03 | bot-blocked; local Wayback | `wb-m3r-aio-tweak-on-fw74-252435.html` | B | mp3-hack on 74.00.324A EU; run.sh `-eq 70`→`-eq 74`; 74.00.331 wireless-CP warning; downgrade floors | — |
| C2-18 | AIO tweaks in 59 and 70 version (240484) | 2020-04 → 08 | Wayback | `wb-m3r-aio-tweaks-in-59-and-70-240484.html` | B | Tristan-cx5: serial for 59.00.504/70.00.100; ID7v2 for .335/.352; "do not update to .367 NA" | — |
| C2-20 | old 70.00.367A (240820) / update 367 to last (246357) | Albuyeh 2020-06 → | local Wayback | `wb-m3r-old-70.00.367A-240820.html`, `wb-m3r-old-367A-p2.html`, `wb-m3r-update-367-to-last-246357.html` | B | 367 has same neutralize_ID7.sh as 335C; "367 WILL BREAK YOUR SERIAL"; 74.00.324A released | — |
| E-07 | GENUINE CarPlay + Android Auto ALL HERE NOW (230249) | ASH8 et al., 2018–2020, 183+ pp | bot-blocked; Wayback last page | `hardware/wb-m3r-230249-p183-2018.html` | B | Same retrofit material as E-06 at scale; "0000-8F-Z34 on eBay for some time (US)" | see D-09/E-06 |
| E-17 | Mazda nav does not work after installing AA/CarPlay hub (244127) | 2021-10 → 2022-11 | bot-blocked; Wayback | `hardware/wb-m3r-244127-p1/p2.html` | B/C | Clone hubs → SD nav not read / no GPS; genuine TK78-66-9U0D fixed it; clone-cable defects | — |
| E-18 | Retrofit kits / firmware (248785) | 2023-08 → 09 | bot-blocked; Wayback | `hardware/wb-m3r-248785-p1/p2.html` | C | "Market flooded with clones"; HMYC ~£80; genuine TK78-66-9U0E ~$200; dealer eBay seller | — |
| E-37 | CarPlay diagram installation (228689) | 2017–2018 | bot-blocked (snippet) | — | C | Pre-release hub experiments: K1414 9U0A / KD5J-66-9U0 (green, China) under-powered | — |
| F-19 | black-screen-mzd (229891, 18 pp) | raoulh et al., 2018-08 → 2026-07 | bot-blocked | `F-rollback/m3r-229891-p1..9,11,18.*`; `wb-m3r-black-screen-p11/p13.html` | B | THE recovery thread: CH341A/RPi flashrom, offsets, chips, rescue .bin, downgrade locks, forced failsafe | — |
| F-20 | Successful downgrade 70.00.021A → 59.00.545A (230305) | p82maarj/hrm701/Tristan-cx5 2018-09 → 2020-01 | live/bot-gated | `F-rollback/m3r-230305-p1.*` | B | Downgrade by standard procedure; file-order dispute; "only as far as 59.00.502"; serial to tweak | — |
| F-21 | Firmware downgrade (242237) | Tristan-cx5 2020-12 → 2021-09 | 406; Wayback 2026-01-07 | `F-rollback/wb-m3r-242237.*` | B | Photo test: on 70.00.335 the USB list hides <59.00.502; serial options per version; 367 can't be enabled | — |
| F-22 | Update half-installed, now black screen (242671) | 2021-02-23 | 406; Wayback | `F-rollback/wb-m3r-242671.*` | C | 56→70 4A: failsafe OK, reinstall stuck "Connecting to firmware", turned off → black | — |
| F-23 | Black screen after failed update — CMU dead, Mazda6 GJ (254150) | kuschi79/Tristan-cx5 2025-06 → 07 | live | `F-rollback/m3r-254150-p1.*` | B | Failsafe then battery disconnect → black; DTC U3000:42; any MZD-1 CMU works as replacement | — |
| F-24 | MZD i-connect firmware info/hints (236211, sticky) | Tristan-cx5 2019-08-29 | live | `F-rollback/m3r-236211-p1.*` | B | 2-file before .335 / 1 after; ≥31.00.100 → latest; downgrade to 59.00.502; format on Windows | **= C2-16 / D-05** |
| F-25 | Is NA car with EU firmware possible (243977) | 2021-09 | live | `F-rollback/m3r-243977-p1.*` | C | EU firmware on NA car: no brick, radio freqs shift (TAU); 70.00.100A then 70.00.367 | — |
| F-26 | My CMU fail-safe version not available, how to fix (241706) | 2020-10 → 2021-08 | live | `F-rollback/m3r-241706-p1.*` | B/C | "Failsafe file installation failed"; causes: bad checksum, AIO tweaks present, new hub fitted first | — |
| F-27 | Downgrading firmware (201994) | d3vi1/alej0, 2017 | live | `F-rollback/m3r-201994-p1.*` | B | <59.00.502 downgrade free; ≥.502 only via NOR programmer; forced failsafe installs first reinstall.up | — |
| F-28 | USB thumb drive for FW updates (246137) | 2022-08 | live | `F-rollback/m3r-246137-p1.*` | C | Sticks that worked/failed (SanDisk Ultra 32, Cruzer 16, Verbatim 8, Transcend 8; one 8 GB failed) | — |
| F-30 | Cannot install update package (235497) | 2019-07 → 2023 | live | `F-rollback/m3r-235497-p1.*` | C | "Install Not Successful: System Failure" loop; other/older/smaller stick, verify hashes, remove Nav SD | — |
| F-31 | Install not successful (226986) | 2018 → 2025 | live | `F-rollback/m3r-226986-p1.*` | C | Fixed by an old 2 GB USB 2.0 stick; "usb 3.0 will not work" (some do) | — |
| F-32 | Firmware version mayhem (244479) | 2021-12 → 2023 | live | `F-rollback/m3r-244479-p1.*` | C | 74 is 1-file; 56→74 directly "should be fine"; 70.00.021 buggiest v70; links removed by copyright owners | — |
| F-29 | ID7 Recovery v2 (234619) | Trezdog44 2019-05-20 | live | `F-rollback/m3r-234619-p1.*` | B | 70.00.335-C neutralizeid7; "no recovery installed = no tweak, serial won't even work" (later relaxed) | **= C2-11** |
| F-33 | Mazda MZD Connect firmware downloads-updated (180578, sticky) | ASH8 | live | `F-rollback/m3r-180578-p1.*` | B | "Fail Safe Version" in About; "born ≥59.00.xxxx DO NOT roll back"; nav SD locked to CMU+VIN after 100 km | **= D-06** |

### 2.5 Other Mazda / MX-5 forums (miata.net, mazdas247, mazda6club, mx5 clubs, cx3, pistonheads)

| id | thread | URL | author / dates | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|
| D-09 | GENUINE MAZDA CarPlay+AA Install Instructions UPDATED (miata.net t=679114) | https://forum.miata.net/vb/showthread.php?t=679114 | ASH8, upd. 2018-10-02 | login-walled; Wayback 2025-02-07 | `wb-miatanet-679114-showthread-20250207.html`; `hardware/wb-miatanet-679114-*` | B | Canonical ND retrofit post: per-region 70.00.021 filenames + cable/hub part numbers + MME facts | **E-06** |
| F-56 | mp3-hack origin thread (miata.net t=782788, posts 142/143) | https://forum.miata.net/vb/showthread.php?t=782788 | 2024-06 → | login-walled (403); NOT read | `F-rollback/miata-net-post142.loginwall.txt` | — | Origin of the mp3 hack; cited via A-13/B-04/F-10/F-41 | see C2-26 |
| F-57 | Install Not Successful (miata.net t=716112) | https://forum.miata.net/vb/showthread.php?t=716112 | 2019 RF owner | login-walled; snippet | `wb-miatanet-716112.html`, `wb-miatanet-t716112-install-not-successful.html` | C | 70.00.100A reinstall started before failsafe; ROOM-fuse retries until it worked; knob trick | — |
| D-08 | mazdas247 "DIY Firmware Update Information" + 74.00.324A / 70.00.367 threads (123881478, 123883736, 123875753) | https://mazdas247.com/forum/threads/… | — | live | (WebFetch summaries); `wb-mazdas247-*.html` | B/C | Files via PM to @Candurin; public links dead | — |
| F-35 | 2016 CX-5 CMU bricked after firmware update (mazdas247 123884841) | https://mazdas247.com/forum/threads/…123884841/ | 2026-05 → 08 | live | `F-rollback/m247-123884841-p1.*` | C | Technician update w/ windows open/alarm/key away → black; NAV+BACK+MUTE + battery useless; CH341A planned | — |
| F-36 | Firmware update stuck at 19–21% and frozen radio (mazdas247 123883481) | https://mazdas247.com/forum/threads/…123883481/ | 2025-08 | live | `F-rollback/m247-123883481-p1.*` | C | 56→70.00.100A EU stuck then "unsuccessful"; fixed with a branded (Toshiba) FAT32 stick | — |
| F-37 | Issues updating firmware, help (mazdas247 123884804) | https://mazdas247.com/forum/threads/…123884804/ | 2026-05-14 | live | `F-rollback/m247-123884804-p1.*` | C | Textbook brick: failsafe done, car switched off before reinstall → black; ROOM fuse/battery/ACC useless | — |
| F-34 | Bricked CMU, offset 0x10000 to FF and still bricked (mazda6club 444748) | https://www.mazda6club.com/threads/…444748/ | 2021-03 | live | `F-rollback/m6c-444748-p1.*`; `mazda6club-440990-p1.html`, `wb-mazda6club-440990*.html` | C | Boot-select patch alone did not revive (serial also dead) → F-19 rescue .bin | — |
| E-06 | GENUINE Mazda CarPlay+AA Install Instructions (miata.net t=679114) | https://forum.miata.net/vb/showthread.php?t=679114 (archive/index) | ASH8, 2018-08-08 upd. 2018-10-02 | bot-blocked (Cloudflare); Wayback p1 only | `hardware/wb-miatanet-679114-showthread-20201112.html` | B | Per-region firmware + cable + hub p/ns; A/B hubs don't work with 70.00.021x; EU €220/€360 | **= D-09** |
| E-19 | ND DIY Apple CarPlay or Android Auto (mx5oc.co.uk t/121452) | https://forum.mx5oc.co.uk/t/nd-diy-apple-carplay-or-android-auto/121452 | SkeppColls et al., 2021-05 → 2025-01 | WebFetch 403; Discourse JSON OK | `hardware/mx5oc-121452.json`, `-p2.json` | B/C | UK RHD DIY: eBay US dealer $148; AliExpress £90 "genuine article"; second-hand K1414 hub | — |
| E-20 | UK ND RHD CarPlay retrofit (pistonheads t=2024557) | https://www.pistonheads.com/gassing/topic.asp?h=0&f=185&t=2024557 | UK, 2021–2022 | live | `hardware/pistonheads-2024557.html` | C | Amazon kit £120, 2 h, GPS cable left unplugged; dealer quotes £350/£467 | — |
| E-27 | UK CX-3 kit part list (cx3forums.co.uk t=1427) | https://www.cx3forums.co.uk/viewtopic.php?t=1427 | UK CX-3 owners, 2018 | bot-blocked (snippet) | `cx3forumsuk-t2170/t2276/t2507.html`, `wb-cx3forum-11610-*.html` | C | UK dealer kit £174.37 = C830-V6-60Z + C830-V6-693 tape + TK78-66-9U0C + manual 4100-77-300EN | — |
| D-14 | mikele85.ru + drive2.ru (Russian EU firmware lists / build-log) | mikele85.ru; drive2.ru | 2020s | live | — | C | Lists EU span cmu140_EU_30.00.100A … cmu150_EU_74.00.324A; direct JP 59.00.332 → EU 74.00.324; files paid/Telegram/Yandex | — |
| D-15 | Regional ASH8-material mirrors (mx5oc.co.uk, mx5life.com, cx3forums, mazda6club.com; mx5blog.co.uk) | (various) | — | live | `mx5life-51411-p1.html`, `wb-mx5life-51411.html` | B/C | Same ASH8 files by PM; mx5blog documents a real 70.00.367 EU N → 74.00.324 EU N single-file upgrade | — |

### 2.6 GitHub projects & tweak sites

| id | project / page | URL | type | author | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|---|
| C1-01 | Trevelopment/MZD-AIO (main app) | https://github.com/Trevelopment/MZD-AIO | GitHub repo | Trevelopment (Trevor G. Martin) | live (200) | `mzd-aio-readme.md` | B | THE AIO installer GUI; Electron+AngularJS; GPL v3; 684★; last release v2.8.6 (2020-04-08) | — |
| C1-02 | Trevelopment/MZD-AIO-TI (original repo) | https://github.com/Trevelopment/MZD-AIO-TI | GitHub repo | Trevelopment | dead (451 DMCA) | — | B | Original name; DMCA-blocked since 2017-03-06 (NNG takedown) → app renamed to MZD-AIO | — |
| C1-03 | Trevelopment/MZD-AIO-UI | https://github.com/Trevelopment/MZD-AIO-UI | GitHub repo | — | dead (404) | — | C | Does not exist | — |
| C1-04 | GitHub REST API (Trevelopment repos) | https://api.github.com/repos/Trevelopment/... | API | GitHub | live (200, authed) | — | A | Source of repo/release metadata | — |
| C1-05 | MZD-AIO releases API dump | (saved) | JSON dump | — | — | `mzd-aio-releases.json` | A | 14 releases, full JSON (tags/dates/assets/sizes/URLs) | — |
| C1-06 | MZD-AIO releases text summary | (saved) | text | — | — | `mzd-aio-releases.txt` | A | tag/date/asset/size/URL summary | — |
| C1-07 | MZD-AIO README (archived) | (saved) | README | — | — | `mzd-aio-readme.md` | B | README of v2.8.x; no Fiat/124/ID7/nav-restore options; supported-car list | — |
| C1-08 | MZD-AIO issue #135 comments (archived) | github.com/Trevelopment/MZD-AIO/issues/135 | issue thread | community | live | `mzd-aio-issue-135-comments.md` | B | Serial doesn't work for 70.00.367 EU; signed updates; only path = downgrade to 352 | **C2-14, F-54** |
| C1-09 | MZD-AIO latest release asset (spot-check) | …/releases/download/v2.8.6/MZD-AIO-TI_Setup_2.8.6.exe | binary | Trevelopment | live (200) | — | A | v2.8.6 installer, 191,084,384 B; spot-checked present | — |
| C1-10 | MZD-AIO wiki | https://github.com/Trevelopment/MZD-AIO/wiki | wiki | — | live (200, empty) | — | C | "Create the first page" — no pages; docs live on mazdatweaks.com / Ameridan's blog | — |
| C1-11 | mazdatweaks.com (project homepage) | https://mazdatweaks.com | website | Trevelopment | live 200 (but hijacked, see F-52) | `mazdatweaks-home.html` | B | Project homepage; "FW V55–V70 supported; .502+ serial; .335+ id7"; ID7_Recovery Pack changelog | **C2-07** |
| C1-12 | AIO download mirror | http://dl.mazdatweaks.win | mirror | Trevelopment | live (200) | — | C | Redirect shown in README badge; patched Speedometer for AIO 2.8.4 | — |
| C1-13 | Ameridan derivative `MazdaToFiatV70AIO.zip` | http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file | tweak zip | ameridan/68wooley | live (200) | `downloads/ameridan/MazdaToFiatV70AIO.zip` (SHA256 9d8fe6d8…, 37,724,156 B) | B | Master repackage: Mazda→Fiat/Abarth branding + boot logos + NNG nav for v70; AIO 2.8.3 base | see B-01/§3.3, C2-06 |
| C1-14 | Ameridan "Universal V70 Fiat AIO Tweak" article | …/2019/02/18/universal-version-70-fiat-tweak/ | blog | ameridan | live | (see B) | B | (blog content covered by theme B) | **= B-01** |
| C1-15 | Ameridan "Fix Navigation for v70" article | …/2019/01/31/fix-navigation-for-version-70-firmware/ | blog | ameridan | live | (see B) | B | (blog content covered by theme B) | **= B-02** |
| C2-07 | mazdatweaks.com home | https://mazdatweaks.com/ | website | Trevelopment | live (hijacked) | `mazdatweaks-home.html` | B | Supported FW statement; serial/id7 approach notes | **= C1-11** |
| C2-08 | mazdatweaks.com/serial (Albuyeh serial instructions) | https://mazdatweaks.com/serial/ | guide | Albuyeh | live 200 but hijacked; 2018 copy local | `mazdatweaks-serial-wayback.html`; `F-rollback/mazdatweaks-serial.HIJACKED-2026-08-23.html` | B | Serial (CP2102, TX/RX/GND, 115200) for 59.00.502+ up to 70.00.100; login user/jci; copy XX | see F-52 |
| C2-09 | mazdatweaks.com/id7 "ID7 Recovery v2" | https://mazdatweaks.com/id7/ | guide | Trezdog44 | **dead (404 since 2025-08)**; GitHub source 200 | `wb-mazdatweaks-id7-20190717.html`, `mazdatweaks-id7-wayback.html`, `github-mazdatweaks-id7.md` | B | "UPDATING TO 70.00.335+ REQUIRES SERIAL DURING UPDATE"; paste cp/chmod XX before reboot | see F-52 |
| C2-13 | 68wooley CarPlay How-To Part 1 v3.0 (PDF, in Ameridan's MediaFire) | (mediafire `124Spider_CP_AA_Upgrade_Guide.zip`) | PDF guide | 68wooley | live (MediaFire 200) | `mediafire/124Spider_CP_AA_Upgrade_Guide/…Part 1…v3.0.pdf` | B | Official 124 sequence: FW+ID7+MazdaToFiat; ID7 on 56 via USB, on 59 → mazdatweaks.com/serial | **= A-02** |
| C2-14 | MZD-AIO issue #135 "Serial doesn't work for 70.00.367 EU" | https://github.com/Trevelopment/MZD-AIO/issues/135 | issue | community | live (200) | `mzd-aio-issue-135-comments.md` | B | neutralizeid7 text; 70.x passwdupdate always; 367 no login; updates signed; 367→352+XX works | **= C1-08; F-54** |
| C2-22 | Trevelopment/cmu-autorun release "1" (`XX.zip` = ID7_Recovery_XX) | https://github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip | binary | Trevelopment | live (200) | `downloads/tweaks/ID7_Recovery_XX.zip` (SHA256 e6b77807…) | B | ID7 v2 pack (44-recovery-recovery/anti-neutralizeid7); replaces dead `trevelopment.win/xx` | see C2-09 |
| C2-23 | mzd-evo/mzd-connect-1-root (mp3-hack payload) | https://github.com/mzd-evo/mzd-connect-1-root | GitHub repo | mzd-evo | live (200, no README) | `github-mzd-connect-1-root-README.md` | B | mp3-hack payload: `mp3/a-d.mp3`, `js/run.js`, `dev.html`; created 2024-03-25 | **D-25, F-55** |
| C2-24 | shunceyb/mzd74-tweaks-no-touch | https://github.com/shunceyb/mzd74-tweaks-no-touch | GitHub repo | shunceyb | live (200) | `github-shunceyb-mzd74-tweaks-no-touch-README.md` | C | mp3-hack variant auto-launching diag for broken touchscreens (v74) | — |
| C2-25 | Ameridan ID7 v1 package `autorun_copy_to_usb.zip` | http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip | tweak zip | ameridan | live (200) | `mediafire/autorun_copy_to_usb.zip` = `downloads/ameridan/autorun_copy_to_usb.zip` (SHA256 c8bef694…) | B | ID7 v1 autorun+recovery pack; install on 56.x before flashing | see B-05 |
| C1-04b/C2-26 | Web searches (2026-08-23) | — | search | — | — | — | — | Surfaced C2-09/14/17/24, miata.net t-666336 & 679114 post 142, mazdas247 "v74 Infotainment Tweaks" (not read) | (C2-26) |
| D-24 | GitHub drone540/mazda-firmware-changelogs | https://github.com/drone540/mazda-firmware-changelogs | GitHub repo | drone540 | live | — | B | Changelog text only (no binaries); 55.x/59.x/70.00.021/70.00.000; missing 70.00.1xx+ | — |
| D-25 | GitHub mzd-evo/mzd-connect-1-root | https://github.com/mzd-evo/mzd-connect-1-root | GitHub repo | mzd-evo | live | — | B | The 2025 USB-only root method (mp3/XSS); not firmware itself | **= C2-23 / F-55** |
| F-52 | mazdatweaks.com/serial + /id7 (hijacked) | https://mazdatweaks.com/serial/ , /id7/ | tweak site | Trezdog44 | **dead / hijacked** (gambling spam; /id7 404) | `F-rollback/mazdatweaks-serial.HIJACKED-2026-08-23.html` | — | Flag everywhere it is linked; GitHub mirror is the surviving copy | **= C2-08 / C2-09** |
| F-53 | Trevelopment/mazdatweaks AIO-FAQ.md (GitHub) | https://github.com/Trevelopment/mazdatweaks/blob/master/AIO-FAQ.md | GitHub doc | Trezdog44 | live | `github-mazdatweaks-id7.md` | B | "70.00.335+ deletes autorun … install via serial after update before reboot"; updating w/ tweaks "safe" ❓ | — |
| F-54 | MZD-AIO issues #47 and #135 (GitHub) | https://github.com/Trevelopment/MZD-AIO/issues/47 and /135 | issues | community | live | `mzd-aio-issue-135-comments.md` | B | #47 brick after "System Restore"; #135 367 EU serial fails, neutralizeid7 listing, 367→352 works | **= C1-08 / C2-14** |
| F-55 | mzd-evo/mzd-connect-1-root (GitHub) | https://github.com/mzd-evo/mzd-connect-1-root | GitHub repo | mzd-evo | live (no README) | `github-mzd-connect-1-root-README.md` | B | The mp3/JS payload used by F-10/F-41 | **= C2-23 / D-25** |

### 2.7 Firmware distribution points (free mirrors, resellers, dead hosts)

| id | source | URL | type | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|
| D-11 | 124spider.org "Firmware Files Download Locations" (Google Drive re-host) | 124spider.org/threads/…45543/ ; drive.google.com/drive/folders/1FSOxXVccKppRURPqZVayfulACGOQW-3Q | free re-host | live 2026 | `wb-124spider-firmware-files-download-locations-45543.html` | B | Live community GDrive: NA/EU/ADR zips + v74 NA + procedure PDF + README | **= A-12** |
| D-12 | 124spider.org other firmware threads (44172, 42393, 38004, 45057→410, 45963, 45814) | 124spider.org/threads/… | free (PM) | mixed; 45057 = 410 gone | (see A / F archives) | C | Files change hands by PM ("Sent!"), rarely public links | see A-08/10/11, F-05/08 |
| D-16 | navi-world.com (reseller) | https://navi-world.com | reseller | live | `F-rollback/navi-world-*.{html,txt}` | D/C | Per-region firmware €29–39, emailed in 24 h; Fiat nav + ID7_Recovery serial service; genuine Mazda files | see F-47, F-51 |
| D-17 | mazdafiles.com (Gumroad "nathanair") | https://www.mazdafiles.com | reseller | live | `F-rollback/mazdafiles-update-procedure.txt` | D/C | $10–15 per single `.up` via Gumroad; 70.00.367 ADR, 74.00.324 NA/EU/ADR, 70.00.100 EU | see F-48 |
| D-18 | UK resellers (satnavishop.co.uk, latestsatnav.co.uk, eBay, gumtree) | (various) | reseller | live | — | D/C | £34.99–39.99; some list Fiat/Abarth 124-branded 70.00.100 / 74.00.324 "+ Support"; files are Mazda's | see D-13/E-11 |
| D-19 | AliExpress (kits ship firmware link/USB) | https://www.aliexpress.com | reseller | live | — | C | One MX-5 owner used an AliExpress link for 70.00.110→70.00.367A; often wrong-region/incomplete | see E-35 |
| D-20 | HiDrive share (Modfreakz) — was THE free index | https://my.hidrive.com/share/hsodpqja | free index | **dead** (~2021–22) | — | B (historic) | Folders per region (`NA N`, `EU N`, `4A N`) + `y Checksum`; naming preserved in D-09 / Shopify PDF | see E-42 |
| D-21 | odysee.com "FIAT 124 CarPlay Android Auto FILES" (DanB) + MEGA links | odysee.com/@DanB:7/… ; mega.nz/… | free mirror | mostly dead/relocated | — | C | 2017 copies; MEGA folders load but reported empty | see B-§3.10 |
| D-22 | mazdas247-posted NA CDN object (Bingoy 2021) | s3.amazonaws.com/tsd.mazdausa.com/…/cmu150_NA_74.00.230A_update.up | CDN object | live (same as D-01) | — | A | 74.00.230A NA posted openly; resolves on the live NA CDN | **= D-01** |
| D-23 | Scribd "EU N CMU HASH Value" (doc 838112560) | scribd.com/document/838112560 | hash doc | live but login-gated | — | C | Would hold EU firmware hashes; body not extractable without login | — |
| E-42 | HiDrive `-CarPlay-AndroidAuto INSTALL` folder (official PDFs/videos) | https://my.hidrive.com/share/hsodpqja.l#$/Mazda_Firmware/-CarPlay-AndroidAuto%20INSTALL | file share | not fetched (JS app); host decaying | — | B | Mazda trim-removal PDFs, cable-install PDFs, full-install mp4s, update-procedure PDF — canonical official-PDF location | see D-20 |

### 2.8 Hardware vendors & listings (retrofit hub / cables)

| id | vendor / listing | URL | type | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|
| E-01 | Ameridan "Replacing the CMU… / retrofit kit" | 21stcenturyfiat…/2018/04/30/replacing-the-cmu-… | blog | live (curl OK; WebFetch 403) | `ameridan-replacing-the-cmu-…html`; `hardware/ameridan-replacing-the-cmu-…html` | B | The 124 reference article on the retrofit kit (history, part list, hub photos, AT knob warning) | **= B-09**; F-45 |
| E-10 | ASH8 install instructions compiled as PDF (Shopify-hosted) | https://cdn.shopify.com/s/files/1/2367/6353/files/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf | compiled PDF | live | `shopify-CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf`; `hardware/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf` (SHA256 45b6bb40…) | B | 70.00.335C-era ASH8 instructions; per-region part numbers, "must be the 'C' hub", FAQ, labor times | — |
| E-11 | 124 Spider UK — Android Auto/CarPlay kit | https://124spider.uk/shop/android-auto-carplay-kit | shop | live | `hardware/124spider-uk-shop-aa-carplay-kit.html` | C | UK 124 kit £150 self-fit / +£140 fit; hub+cables+firmware+own instructions; hub possibly non-OEM | **D-13** |
| D-13 | 124spider.uk (Stuart Clark) — vendor + free knowledge | https://124spider.uk/blog/124-spider-cmu-firmware-updates ; /support/firmware-updates | shop + guide | live | `wb-124spideruk-cmu-firmware-updates.html`, `wb-124spideruk-support-firmware-updates.html` | C | "Use 70.00.100 and NOTHING NEWER"; serial-connection ID7 walk-through; sells kit | **= E-11** |
| E-21 | mazdaparts.org (US dealer parts) | https://mazdaparts.org/mazda-3-smartphone-mirroring-kit.html | shop | live | `hardware/mazdaparts-org-00008FZ34.html` | C | Kit 0000-8F-Z34 MSRP $250.90 / sale $213.27; fitment incl. MX-5 2016-2020 | — |
| E-22 | parts.mazdausa.com (Mazda USA parts portal) | https://parts.mazdausa.com/p/…/00008FZ34.html | shop | bot-blocked (snippet) | — | C | 00008FZ34 "Smartphone Screen Mirroring Kit" $250.95 | — |
| E-23 | Galpin Mazda retrofit (CA dealer) | https://www.galpinmazda.com/retrofit/ | dealer | live | `hardware/galpinmazda-retrofit.html` | C | Dealer retrofit $499.99 + tax, ~2 h, 2014+ Mazda Connect cars | — |
| E-24 | SG Petch (UK dealer) | https://www.sgpetchaccessories.co.uk/product/genuine-mazda-apple-carplay-android-auto-unit/ | dealer | live | `hardware/sgpetch-genuine-mazda-carplay-unit.html` | C | UK genuine kit £232.37 = TK78-66-9U0C + C830-V6-60Z + tape C830-V6-693 | — |
| E-25 | Arnold Clark / Sandicliffe (UK dealers) | arnoldclarkautoparts.com/…C830V660Z ; sandicliffeshop.co.uk/…C830V660Z | dealer | live | `hardware/arnoldclark-C830V660Z.html`, `sandicliffe-C830V660Z.html` | C | C830V660Z cable set alone £100–101.48 | — |
| E-26 | online-teile.com (DE OEM parts) | https://www.online-teile.com/…/C830V660Z_Cord-Short.html | shop | live | `hardware/online-teile-C830V660Z.html`, `online-teile-TK78669U0C.html`, `online-teile-TK78669U0_.html` | C | C830-V6-60Z "Cord Short" €126; TK78669U0C superseded → order TK78669U0_ | — |
| E-29 | mx5mania.com.au (AU) | https://mx5mania.com.au/products/mazda-apple-carplay-nd-2015-2019 | shop | live | `hardware/mx5mania-carplay-nd.html` | C | Genuine kit ND 2015-2019 (RHD) A$355; 2–3 h; ~50 min firmware | — |
| E-30 | getcartech.com (AU aftermarket) | https://getcartech.com/products/mazda-connect-carplay-upgrade-kit | shop | live | `hardware/getcartech-mazda-kit.html` | D | Wired/wireless kits A$199; software USB per region (74.00.324A); "AA via rotary dial only" | — |
| E-31 | infotainment.com (US aftermarket) | https://infotainment.com/shop/…/m-kit30/ | shop | live | `hardware/infotainment-com-m-kit30.html` | D | $299.95 kit explicitly listing FIAT 124 Spider 2017-2021; NA only; M-HUB + 2 cables + software USB | — |
| E-32 | visioncoding.us (UK/EU aftermarket) | https://www.visioncoding.us/products/mazda-tk78-66-9u0c | shop | live | `hardware/visioncoding-tk78.html` | D | €110 kit lists Fiat 124 (2017-2021); out of stock; "firmware below v70.00.21 must update — included" | — |
| E-33 | germanaudiotech.com (US) | https://www.germanaudiotech.com/products/usb-hub-aux-console-carplay-android-for-mazda-…-tk78-66-9u0c | shop | live | — | C | Hub alone "Genuine Mazda" $149.95; cable kit C922-V6-605A sold separately | — |
| E-34 | Amazon listings (B07KRPSRKH etc.) | amazon.com (7 ASINs) | marketplace | live | `hardware/amazon-m-*.html` | C/D | B07KRPSRKH = genuine 0000-8F-Z34 (4.8★/631, $163 in 2019); rest are clones ($51–111) incl. wireless-only | — |
| E-35 | AliExpress 1005001447410048 | https://www.aliexpress.com/item/1005001447410048.html | marketplace | live | `hardware/aliexpress-1005001447410048.html` | C | The listing most 124 members used 2020–21 (~$80–103), claimed "genuine" by buyers | see E-40 |
| E-43 | mazdaman workshop-manual mirror (trim removal) | http://mazdaman.x10host.com/SM356305/ | manual mirror | not fetched (404 per B; alt hexorcism.com) | — | B | ND workshop-manual section used for trim removal (linked by E-01/E-12) | — |

### 2.9 Videos

| id | title | URL | author / date | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|
| E-12 | Abarth 124 Spider – Apple CarPlay Install Guide | https://www.youtube.com/watch?v=Qcyan28QXs4 | Pistons & Petrol (Eddie Clark), 2018-12-14 | live | `hardware/yt-Qcyan28QXs4.html` | B | First 124-specific install video; NA/EU/Oceania part numbers; links hidrive + mazdaman guide | — |
| E-13 | Mazda MX-5 ND/ND2 ACP/AA USB Cable & Hub Install | https://www.youtube.com/watch?v=XpPYKikqIDc | Greg's DIY Garage (kill-o-byte), 2018-10-27 | live | `hardware/yt-XpPYKikqIDc.html` | B | LHD ND hub/cable install (applies to 124); firmware video linked youtu.be/jYfH-ikZoUM | — |
| E-14 | Installing Apple CarPlay To My Abarth 124 Spider! | https://www.youtube.com/watch?v=ZZgcWq3ZA38 | Stef ABtv, 2020-10-10 | live | `hardware/yt-ZZgcWq3ZA38.html` | C | UK RHD vlog (fitted by "Bradley"); not a how-to | — |
| E-15 | Part 2: Hardware Installation — CarPlay/AA in MX-5 ND (UK) | https://www.youtube.com/watch?v=ZQTeJukUFII | KunziDoesStuff, 2025-04-25 | live | `hardware/yt-ZQTeJukUFII.html` | C | RHD ND RF with AliExpress kit; parts 1 & 3 = firmware | — |
| E-16 | (disambiguation) aftermarket LVDS interface box CPA-MAZ-MZD | https://www.youtube.com/watch?v=XdmV-muo188 | NavInc (NL), 2019-07-21 | live | `hardware/yt-XdmV-muo188.html` | D | NOT the Mazda hub — listed only to disambiguate the aftermarket interface | — |

### 2.10 Blogs / other (technical write-ups, vendor procedure pages, JP blogs)

| id | source | URL | author / date | link status | archive | trust | summary | alias / see also |
|---|---|---|---|---|---|---|---|---|
| D-10 | Ameridan blog (Fiat-specific bible) | https://21stcenturyfiat124spider.wordpress.com | ameridan | live | `ameridan/*` | B | (full content = theme B) | **= B-01…B-29** |
| D-04b/E-36 | JP dealer-parts blogs (CX-8 CarPlay retrofit) | sunnyday-lifelog…/cx-8-carplay/ ; hitoiki.xyz/…/mazda_carplay_androidauto_retrofitkit/ | 2019-08 / 2022-09 | live | `hardware/jp-sunnyday-cx8-carplay.html`, `jp-hitoiki-cx8-retrofit.html` | C | JP dealer prices: hub TK78-66-9U0C ¥12,960; cable set C921-V6-605 ¥2,592; 2022 hub -9U0E | (E-36) |
| F-39 | Reset CMU NOR flash with RPi (Thai blog) | https://mzdonline.wordpress.com/2017/07/19/reset-cmu-nor-flash-with-rpi/ | mzdonline, 2017-07-19 | live | `F-rollback/mzdonline-reset-cmu-nor-flash-rpi.html/.txt` | B | RPi + flashrom + SOIC16 clip, S25FL064A/P, write 0x00 at boot-select, backup first | — |
| F-40 | First public CMU unbrick | https://yms.livejournal.com/3007282.html | Michael Yutsis, 2017-08-05 | live (JS wall); Wayback | `F-rollback/yms-livejournal-unbricked-cmu.*` | B | Spansion S25FL064A, CH341A, chip de-soldered; EU 56.00.513 rescue .bin in comments | — |
| F-47 | navi-world Mazda Connect firmware update procedure | https://navi-world.com/2022/05/02/mazda-connect-firmware-update-procedure/ | "Jonathan", 2022 → 2026 | live | `F-rollback/navi-world-mazda-connect-update-procedure.*` | C | Mazda procedure verbatim + "if update fails" (ROOM fuse); useful failure-mode comments | see D-16 |
| F-48 | mazdafiles firmware update procedure | https://www.mazdafiles.com/mazda-connect-firmware-update-procedure/ | n/d | live | `F-rollback/mazdafiles-update-procedure.txt` | C | Same procedure text | see D-17 |
| F-51 | navi-world Fiat 124 Spider CMU serial access | https://navi-world.com/2025/04/20/fiat-124-spider-cmu-serial-access/ | 2025-04-20 | live | `F-rollback/navi-world-124-spider-cmu-serial-access.*` | C | Re-host of the mazdatweaks serial guide (CP2102, 2S/2T pins, 115200); ".335+ = serial before updating" ❓ | see C2-08 |
| E-05b/D-24b | (see individual rows above; no additional blogs) | — | — | — | — | — | — | — |
| — | gpytmfg blog "Genuine Mazda AA and CarPlay install" | https://www.gpytmfg.com/blogs/news/genuine-mazda-android-auto-and-carplay-install | (via A-09 #30) | live (200) | — | C | "56 to 70 update went just fine"; not read in detail (cited in theme A only) | see A-09 |

---

## 3. Dead or lost sources

Pages/hosts that are gone, hijacked, or that once held material now lost. "Surviving copy" names the
best remaining route.

| what was there | id(s) | URL | status 2026-08-23 | surviving copy / note |
|---|---|---|---|---|
| Modfreakz **HiDrive** firmware index (the canonical free per-region back-catalogue + `y Checksum` folder) | D-20, E-42, A-§3, B-§3.10 | my.hidrive.com/share/hsodpqja | dead / removed ~2021–22 (share root may 200 but empty) | folder/file naming preserved verbatim in D-09 and the Shopify PDF (E-10); official PDFs not re-mirrored |
| **MEGA** firmware folders (ASH8 2018; 70.00.100 NA) | A-§3, B-§3.10 | mega.nz/#F!3A0DkA4R!… ; mega.nz/folder/YWx3lCIT#… | page 200 but reported **empty** (2021-11, 2023-06) | none — files gone |
| **mazdatweaks.com /id7** (ID7-on-335 serial procedure) | C2-09, F-52 | https://mazdatweaks.com/id7/ | **404 since ~2025-08**; whole site hijacked (spam) | GitHub `Trevelopment/mazdatweaks` id7.md (F-53); Wayback 2019-07-17 & 2025-01-18 |
| **mazdatweaks.com /serial**, /faq | C2-08, F-52, B-§7 | https://mazdatweaks.com/serial/ , /faq/ | site hijacked; /faq 404 | Wayback 2018-04-14 copy; navi-world re-host (F-51); GitHub mirror |
| **1fichier** EU 70.00.100 files ("Mike", NL) | B-§3.10 | 1fichier.com/?sxgyrgc3raoibzjri70q ; …/?o0dis7l25b9w5hk9usg7 | dead (no response) | none |
| **bit.ly / OneDrive** EU N 70.00.100A ("Mike", NL) | B-§3.10 | https://bit.ly/3qMnOKP | **403** | none |
| **124spiderinfotainment.com** (EU nav Toolbox portal for all regions) | B-§5 | 124spiderinfotainment.com/navigation-updatemymaps | host no longer answers (curl 000) | naviextras.com portal still 200 (different tool) |
| **2x4logic.com** (JCI fail-safe reverse-engineering) | F-38 | 2x4logic.com/jci-failsafe.html , /invokefailsafe.html | site down | Wayback 2016 copies (archived locally) |
| **trevelopment.win/xx** (ID7 Recovery XX pack) | C2-22 (note) | http://trevelopment.win/xx | dead (DNS fails) | GitHub `Trevelopment/cmu-autorun` release "1" → `XX.zip` (collected + hashed) |
| **odysee** "FIAT 124 CarPlay Android Auto FILES" (DanB) | D-21, A-§3 | odysee.com/@DanB:7/… ; @BookAutowerks:0/… | 200 but JS-rendered / content unverified | not verified; likely stale |
| Google-Drive EU 70.00.100 (Lennie1979) | A-§3 (44172 #50) | drive.google.com/…/1pTodcgciSVlBMGxIzWZQSCXSF5_UNNHo | **dead (404)** — link removed | none |
| WeTransfer "Oceana + Ameridan tweaks" (RJJ) | A-§3 (44172 #6) | we.tl/t-3lHq77LTMj | WeTransfer links expire → assume dead | none |
| MD5 "TESTING BEFORE YOU DOWNLOAD…" PDF (Ameridan) | B-§3.10 | (local-path link `/Users/Dan/Downloads/…`) | broken link — never a real URL | lost; hashes never published by Ameridan |
| **124spider.uk** kit page + `/blog/*` | B-§4, F-§misc | 124spider.uk/… (old kit URL) | kit page **404**; some blog pages 404 | current shop page E-11 / D-13 (Wayback of blog) |
| **mazdaman.x10host.com** hub instructions | E-43, B-§4 | mazdaman.x10host.com/SM356305/ | **404** | alt mirror hexorcism.com/16ND/sm356184/ (200) |
| `dl.mazdatweaks.win` patched Speedometer for AIO 2.8.4 | C1-12, B-§7 | http://dl.mazdatweaks.win | 200 but content reported dead/stale | none confirmed |
| id7's original `autorun.v2.zip` / `autorun-v3.zip` attachments | C2-§4 | m3r thread 200450 posts #2081162/#2085714/#2085898 | attachments not captured by Wayback | likely lost (historical only) |
| **eu.mazda-press.com** (Mazda EU 2018 press release) | E-38 | eu.mazda-press.com | now login-only | full text quoted inside E-01; SPGlobal news copy (E-38) |
| AIO **1.51Fiat_c** zip (donation-gated) | B-§3.9 | (emailed link) | not public | `_d` update folder public on MediaFire (folder nmariu5t0fb4c) |
| "dryrun" ID7 verification script (Ameridan mentions, can't locate) | B-§3.1 | — | never located | lost |
| Mazda **mega.nz** manuals folder (ASH8 2018) | A-§3 | mega.nz/#F!3A0DkA4R!… | folder 200; reported dead 2021 | none |

## 4. Sources to archive by a human with a browser

These are known-relevant but could not be captured by scripted fetch (bot-blocked without a Wayback
copy, or login-walled). A human with a browser (or the car owner saving the page) should archive them.

**Bot-blocked 124spider.org threads/pages with NO Wayback capture (snippets only):**
- HowTo thread **32286 pages 3–7, 15, 21** (A-01) — p3–7 ≈ posts 41–140 (Apr 2019→May 2020, the 335
  lockout period), p15 (Apr–May 2021), p21 (2024).
- **A-03** "Mazda made up a mess FW 70.00.367" (39292 / F-04) — the .367 dealer-flash downgrade story.
- **A-07** "Car play easy update" (41206 / E-41).
- **A-30** "V59.00.524 to Car Play / Android Auto" (42352 / E-41) — a possible 59→70 success path.
- **A-31** "CarPlay installation question" (42640) — not read at all.
- **A-11** pages 2–3 (44172); **A-13** page 2 (45965).
- **E-39** newer hardware threads (43650 USB-C hub, 43766 wireless, 42115, 43933, 43852, 45401) — no
  Wayback copies.
- **F-59** "Software debacle, part II" (40588); **F-60** "CMU serial port blown out" (43811);
  **F-61** "Confirmed CarPlay through replacement CMU" (42231) — 406 to scripts, snippet only.

**Login-walled forum.miata.net posts (need an account):**
- **F-56 / C2-26** thread t=782788 (also cited as t-679114 in one note) **posts 142 & 143** — the
  ORIGIN of the mp3 hack + the v74 `run.sh` edit (post 148 `p=11012202`). Not read anywhere.
- **F-57** thread t=716112 — the ND "Install Not Successful" reinstall-before-failsafe recovery story.
- **D-09 / E-06** thread t=679114 (ASH8 retrofit guide) — only page 1 is in Wayback; the archive/index
  pages (incl. p-8) were never captured.

**Other bot-blocked pages worth a manual capture:**
- **D-23** Scribd "EU N CMU HASH Value" doc 838112560 — login-gated; would recover EU firmware hashes.
- **E-22** parts.mazdausa.com 00008FZ34; **E-37** m3r 228689 (hub experiments) — snippet only.
- **E-42** the HiDrive `-CarPlay-AndroidAuto INSTALL` folder — the only place with Mazda's full MX-5
  trim-removal PDFs and full-install mp4s; mirror before it disappears.
- **A-§3** 124spider attachment `z-changelogs-for-6th-generation-connect-pdf.79217` (Mazda changelog
  incl. 70.00.335C/.352B) — behind the bot-block, no Wayback.

---

*End of registry. 231 sources. Written 2026-08-23 from `research/raw/{A,B,C1,C2,D,E,F}`.*
