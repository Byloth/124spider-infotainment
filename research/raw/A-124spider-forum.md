# Theme A — 124spider.org forum research (raw notes)

Research agent notes, 2026-08-23. Everything below comes from 124spider.org threads (read via Wayback
Machine captures, because the live site now blocks non-browser access — see "Access notes"), plus the
files linked from those threads that were still downloadable. Post references are given as
`#N` (post number in thread) and/or `post-ID` (XenForo post id, usable as
`https://www.124spider.org/posts/<ID>/`). Anything inferred rather than read is marked **(inferred)**.

## 0. Access notes (important for archiving)

- **Live site is blocked for automation** (2026-08-23): `https://www.124spider.org/...` answers a
  JavaScript proof-of-work challenge (HTTP 202, `POW_CHALLENGE_DATA`) to `curl`, and a
  `307 → https://tollbit.124spider.org/...` → `402 Payment Required` (Tollbit paywall) to WebFetch.
  Solving the PoW was not attempted (the sandbox policy denied it). So: **no live page could be
  read**; all reading was done from `web.archive.org` captures, downloaded with
  `https://web.archive.org/web/<timestamp>id_/<url>`.
- Local copies saved in `research/archive/` (raw HTML, some were gzip-encoded and were inflated):
  - HowTo thread 32286: `124spider-howto-32286-p1.html` (capture 2025-11-07), `-p2` (2025-11-07),
    `-p8` (2021-06-25), `-p9` (2021-08-03), `-p10` (2021-08-03), `-p11` (2020-10-26),
    `-p12` (2021-04-18), `-p13` (2021-04-18), `-p14` (2025-11-07), `-p16` (2022-01-25),
    `-p17` (2024-12-29), `-p18` (2022-10-06), `-p19` (2022-09-25), `-p20` (2025-11-07).
    **Pages 3–7, 15 and 21 have no Wayback capture** (p3–p7 ≈ posts 41–140, Apr 2019 → May 2020;
    p21 = posts 401–404+, 2024). Posts 1–40 fully read; p8 onward fully read.
  - Other threads: `124spider-screwedup-38071-p1/p2.html`, `124spider-usb-not-recognized-38159-p1.html`,
    `124spider-android-auto-upgrade-38677-p1.html`, `124spider-aio-335c-352b-success-38004.html`,
    `124spider-mazda-crackdown-40247-p1/p2.html`, `124spider-cmu-fw-70-00-100-eu-42393.html`,
    `124spider-file-for-70-00-100-44172.html`, `124spider-firmware-download-locations-45543.html`,
    `124spider-v70-tweaks-without-id7-45965.html`, `124spider-upgrading-native-aa-45021-p2.html`,
    `124spider-settings-not-displaying-42919.html`, `124spider-rebranding-not-happen-41032.html`,
    `124spider-cmu-74-00-230-39761.html`, `124spider-retrofit-kit-38673.html`,
    `124spider-aio-151-aa-42151-p1/p2.html`, `124spider-aa-via-aio-v56-40537.html`,
    `124spider-official-fiat-cmu-sw-38211.html`, `124spider-infotainment-update-39797.html`,
    `124spider-carplay-up-and-running-30666-p1/p25/p29.html`, `124spider-mazda-screen-tweaks-38459.html`,
    `124spider-no-sound-carplay-41439.html`, `124spider-carplay-diy-or-replace-39874.html`,
    `124spider-aa-without-hw-33670.html`, `124spider-tweaks-for-dummies-37676.html`,
    `124spider-feb2021-nav-update-38950.html`.
  - Files downloaded from the MediaFire links given in the HowTo (all still alive 2026-08-23), in
    `research/archive/mediafire/` — see §3 for hashes.
- Note: in the older-template captures the `<time>` element captured by my parser is the member's
  *join date*, not the post date; post dates for those pages are therefore given approximately (from
  context / capture date) — post IDs are exact.

---

## 1. Sources list

| id | Thread / page | URL | OP author | Dates | Pages | Link status | Summary | Reliability |
|---|---|---|---|---|---|---|---|---|
| A-01 | **CarPlay / Android Auto Upgrade HowTo** | https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/ (old URL cited elsewhere: `/forum/26-electronics-audio-lighting/32286-...`) | **68wooley** (2017 Abarth 6MT, NA, v56 car; Scottish, lives in US) | OP 2019-02-06/07 (edited 2019-11-16); last post Cliffjumper 2024-06-11 (per Dec-2024 capture: 403 replies, 102 participants, 21 pages) | 21 | alive but bot-blocked; Wayback has p1,2,8–14,16–20 | The canonical 124-specific guide: Part 1 firmware (posts #1–#6), Part 2 hardware (posts #7–#14), then 5 years of Q&A | Primary source. OP is the author of the procedure and of the `MazdaToFiatV70AIO` package (with Ameridan). Very reliable; OP text itself is *outdated* (it was written for 3 separate tweak zips; Nov-2019 note redirects to PDF v3.0 / Ameridan's blog) |
| A-02 | 68wooley PDF guide zip `124Spider_CP_AA_Upgrade_Guide.zip` | http://www.mediafire.com/file/201759io15ariii/124Spider_CP_AA_Upgrade_Guide.zip/file | 68wooley | Part 1 v3.0 dated 2019-05-17, Part 2 2019-02-06 | — | **alive** (downloaded, 7.8 MB) | Updated procedure (uses `MazdaToFiatV70AIO`, warns against 70.00.335) | Primary; the version 68wooley says to follow |
| A-03 | Mazda made up a mess!!! FW 70.00.367 | https://www.124spider.org/threads/mazda-made-up-a-mess-fw-70-00-367.39292/ (+ `/page-2`) | unknown (EU user, per snippet) | 2021 (est.) | 2 | alive, bot-blocked; **no Wayback capture**; only search-engine snippets read | Dealer flashed 70.00.367 against owner's instructions → Mazda branding, no tweaking; after downgrading to 70.00.100 USB tweaks still impossible; answers: no simple downgrade path from .367, others did it via serial on the CMU rear port | Medium (snippets only) |
| A-04 | OK...Screwed up the Infotainment Upgrade - Fixed!! | https://www.124spider.org/threads/ok-screwed-up-the-infotainment-upgrade-fixed.38071/ | Bob T (2017 Abarth, NA) | Oct 2020 | 2 (archived both) | archived | Used old DOS AIO 1.5 tweaks on v70 → boot loop; later Speedometer tweak → bricked (no diag menu); fixed by buying used CMU ($125, came with 59.00.563) | High (first-hand) |
| A-05 | Infotainment not recognizing usb to install tweaks after downgrade 70.00.100A to 59.00.502 | https://www.124spider.org/threads/infotainment-not-recognizing-usb-to-install-tweaks-after-downgrade-70-00-100a-to-59-00-502.38159/ | manwithastick (2017, NA) | Oct–Dec 2020 | 1 | archived | Downgraded 70.00.100A → 59.00.502 to run AA Tru_Go 1.14b (touchscreen); USB stopped autorunning; root cause a failing USB stick; bought Mazda3 CMU from eBay | High |
| A-06 | Android Auto Upgrade | https://www.124spider.org/threads/android-auto-upgrade.38677/ | Griswold381 | Jan–Mar 2021 | 1 | archived | Asks for install service; replies: AliExpress genuine kit ~$105, serial hack needed on v59 | Medium |
| A-07 | Car play easy update. | https://www.124spider.org/threads/car-play-easy-update.41206/ | unknown | Feb 2022 | ? | alive, bot-blocked; no Wayback; snippet only | Non-OEM hub+cable kit (Amazon) discussion; "update software first, then install hub; some knockoff hubs may not work" | Low (snippet) |
| A-08 | MazdaToFiat70AIO and CMU firmware 70.00.335C or 70.00.352B Success! | https://www.124spider.org/threads/mazdatofiat70aio-and-cmu-firmware-70-00-335c-or-70-00-352b-success.38004/ | 124geek (2020 Abarth) | Sep 2020 | 2 (p1 archived) | archived | How to run MazdaToFiatV70AIO on 70.00.335/.352 (edit `tweaks.sh` version check); attached Mazda changelog PDF | High (first-hand), niche |
| A-09 | Mazda Cracked Down/Removed Firmware Downloads | https://www.124spider.org/threads/mazda-cracked-down-removed-firmware-downloads-impacts-all-new-potential-aa-carplay-upgraders.40247/ | AnClar | Aug–Dec 2021 | 2 (both archived) | archived | Nov 2021: all firmware hosts taken down (HiDrive, mazda3revolution links by ASH8); people share by PM | High |
| A-10 | CMU Firmware V70.00.100 (EU) | https://www.124spider.org/threads/cmu-firmware-v70-00-100-eu.42393/ | Neighbour (UK, v56) | Oct 2022 | 1 | archived | UK owner looking for EU 70.00.100 files; littletone101 has them; note about heyisthatyourcar's EU files | Medium |
| A-11 | File for 70.00.100 firmware? | https://www.124spider.org/threads/file-for-70-00-100-firmware.44172/ | bstem (Australia) | 2024-02-13 → 2025-07-20 (121 replies, 54 participants, last gibbspw61) | ≥3 (only p1 archived) | archived p1 | Files shared by PM (james.today NA, AegirTheLucky NA+EU, Lawrence all regions, RJJ ADR we.tl); Google-Drive link posted then removed | High |
| A-12 | Firmware Files Download Locations | https://www.124spider.org/threads/firmware-files-download-locations.45543/ | AegirTheLucky | 2025-01-28 → Aug 2025 (21 replies) | 2 (p1 archived) | archived p1 | **Public Google Drive zips NA / EU / ADR** (+ instructions + MZD-AIO); v74 NA link; one EU brick report | High |
| A-13 | V70 Tweaks without ID7 - No Serial Connection Needed? YES YOU CAN! | https://www.124spider.org/threads/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can.45965/ | madfiat (2017 Classica, NA) | 2025-05-25 → Jul 2025 | 2 (p1 archived) | archived p1 | **MP3-payload root method** (mzd-evo `mzd-connect-1-root`) to run MazdaToFiatV70AIO / MZD-AIO on v70 (and v74) without ID7/serial | High (first-hand, confirmed by others) |
| A-14 | Upgrading to Native AA version from V56 tweaks AA | https://www.124spider.org/threads/upgrading-to-native-aa-version-from-v56-tweaks-aa.45021/ | Scorpius | 2024 | 2 (p2 archived, 1 post) | archived p2 | Has AA-tweak on v56, wants native v70 — asks whether tweaks need undoing | Low (little content captured) |
| A-15 | Some settings not displaying after firmware update 70.00.100NA A | https://www.124spider.org/threads/some-settings-not-displaying-after-firmware-update-70-00-100na-a.42919/ | Liz787 | Jan 2023 | 1 | archived | Non-issue: some settings only show in ACC/ON | Low |
| A-16 | Apple CarPlay installed, rebranding from Mazda to Fiat does not happen | https://www.124spider.org/threads/apple-carplay-installed-rebranding-from-mazda-to-fiat-does-not-happen.41032/ | Ausboy (Australia, 2017 Abarth) | Dec 2021–Jan 2022 | 1 | archived | Auto-electrician flashed **70.00.100A-NA on an Australian car**; rebranding won't run; 124spider.uk says ID7 step was skipped → serial needed; auto-lock setting missing | High |
| A-17 | Odd man out - CMU update 74.00.230 | https://www.124spider.org/threads/odd-man-out-cmu-update-74-00-230.39761/ | Garrettt93 | Jun 2021 | 1 | archived | Installed Mazda 74.00.230 NA: smoother; no way to rebrand (no ID7); asks about repacking .up | Medium |
| A-18 | Mazda Apple CarPlay and Android Auto USB Retrofit Kit | https://www.124spider.org/threads/mazda-apple-carplay-and-android-auto-usb-retrofit-kit.38673/ | frankmar | Jan 2021 | 1 | archived | AliExpress genuine kit item 1005001447410048, ~US$106 | Medium |
| A-19 | All In One Tweaks V1.51 and Android Auto | https://www.124spider.org/threads/all-in-one-tweaks-v1-51-and-android-auto.42151/ | derekperry37 (UK, 56.00.530 EU N) | Oct 2022–Jan 2023 | 2 (archived) | archived | AA-tweak versions: 1.13 in AIO 1.51 (buggy), AA Tru_Go 1.14b (v56), 1.15 (v59+), 1.15b (v70+); ameridan: don't mix tweak-AA with official AA | Medium |
| A-20 | Installing Android Auto using the MZD-AIO installer on to version 56 | https://www.124spider.org/threads/installing-android-auto-using-the-mzd-aio-all-in-one-tweaks-installer-on-to-version-56.40537/ | LondonAbarth124 | Oct 2021 | 1 | archived | Hub only needed for power/CarPlay; MZD-AIO says compatible with v56 | Low/Medium |
| A-21 | Is the official Abarth/Fiat CMU SW available for download? | https://www.124spider.org/threads/is-the-official-abarth-fiat-cmu-sw-available-for-download.38211/ | jayrock (DE) | Oct 2020 | 1 | archived | Asks for genuine Fiat **59.00.561 EU N** failsafe+reinstall — no one has it | Medium |
| A-22 | Infotainment update (freeze) | https://www.124spider.org/threads/infotainment-update.39797/ | DAC17 | Jun 2021 | 1 | archived | Random lock-ups; reboot = hold Mute+Nav 10 s; Speedometer tweak blamed | Low |
| A-23 | Carplay Up and Running (pioneer thread) | https://www.124spider.org/threads/carplay-up-and-running.30666/ (old: `/forum/26-electronics-audio-lighting/30666-carplay-up-running.html`) | rsmagee (UK Lusso) | 2018-08-30 → 2023 (29+ pages) | 29+ (p1, p25, p29 archived) | archived partial | First UK install Aug 2018 (EU Mazda fw, dealer parts £196); 2019: 70.00.100 files moved to HiDrive "Outdated Firmware"; 335C lockout & ID7 v2 news; Sammy124 install pics; TheSalamander | High for history |
| A-24 | 124 Spider Mazda screen BHP1611J0D + CMU BJS7669C0K (for sale) | https://www.124spider.org/threads/124-spider-mazda-screen-bhp1611j0d-mazda_gen_65_cmu-bjs7669c0k-tweaks-installed.38459/ | manwithastick | Dec 2020 | 1 | archived | Mazda3 2014-16 CMU part BJS7669C0K fits Spider; not VIN-locked; 59.00.502 NA N + ID7 + AA Tru_Go 1.14b | Medium |
| A-25 | No sound with CarPlay | https://www.124spider.org/threads/no-sound-with-carplay.41439/ | Natnat | Apr 2022 | 1 | archived | No sound at all after install → a speaker connector not fully seated | Low |
| A-26 | Apple Carplay DIY or replace… | https://www.124spider.org/threads/apple-carplay-diy-or-replace-with-a-different-infotainment.39874/ | cje11 | Jun 2021 | 1 | archived | ~4 h total, $150 hub + $100 wireless dongle; no DIN aftermarket option for 7" cars | Low |
| A-27 | Android Auto without hardware change | https://www.124spider.org/threads/android-auto-without-hardware-change.33670/ | iassaei (56.00.521 EU N) | Jul 2019 | 1 | archived | AA head-unit tweak (mazdatweaks.com/androidauto) runs on v56 without hub; ameridan: install ID7 anyway "in case the dealer upgrades" | Medium |
| A-28 | Tweaks and Mods for dummies | https://www.124spider.org/threads/tweaks-and-mods-for-dummies.37676/ | Spider Fan Buffalo | Jun 2020 | 1 | archived | General encouragement; little technical content | Low |
| A-29 | February 2021 North America Nav update available | https://www.124spider.org/threads/february-2021-north-america-nav-update-available.38950/ | — | Feb 2021 | 1 | archived | Map update (not firmware) — not read in detail | Low |
| A-30 | V59.00.524 to Car Play / Android Auto | https://www.124spider.org/threads/v59-00-524-to-car-play-android-auto.42352/ | unknown (2018, NA) | Sep–Oct 2022 | ? | alive, bot-blocked; no Wayback; snippet only | Serial-method upgrade from 59.00.524, "no major issues"; only remaining Mazda icon is the AA exit icon; factory nav retained | Medium (snippet) |
| A-31 | CarPlay installation question | https://www.124spider.org/threads/carplay-installation-question.42640/ | — | ~2023 | ? | no Wayback, not read | — | — |
| A-32 | Ameridan blog posts referenced by the forum (Theme B covers them) | https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ ; https://21stcenturyfiat124spider.wordpress.com/2025/05/25/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/ | ameridan | 2019 / 2025 | — | both alive (HTTP 200, 2026-08-23) | The forum repeatedly says "follow the blog / the PDFs, not the OP" | Primary (external) |

Other 124spider.org threads seen in Wayback's index but not read (possibly useful later):
`apple-carplay-mass-request.34584`, `android-auto-issues.33278`, `android-auto-questions-help.34437`,
`carplay-android-auto-—-switching-between-them.37716`, `woohoo-android-auto-is-working.37750`,
`arthurs-sat-nav-and-infotainment-tips.37937`, `fiat-infotainment-tweaks.3345` (old v56 tweak thread, 19+ pages),
`how-to-install-android-auto-in-your-fiat-124-2017.16754`, `infotainment-tweaks-install-video.17553`,
`installing-an-android-head-unit.42803`, `offer-top-dollar-for-installation-of-apple-car-play...41958`,
`infotainment-change-to-car-play-san-francisco-bay-area.40877`, `navigation-sd-card.40774`,
`where-to-find-aftermarket-navigation-card.40741`, `how-to-clone-your-fiat-spiders-navigation-sd-card...39039`.

---

## 2. Procedure as described in the HowTo (A-01) and its PDF v3.0 (A-02)

### 2.1 Prerequisites / caveats (OP #1, post-475950; PDF Part 1 p.1)
- Only for cars with the **7" display**; "the 3" displays in some Classicas are not compatible".
- No Fiat/Abarth firmware with CP/AA exists → must use **Mazda v70 firmware**. Consequences:
  (a) Mazda splash/boot screens and branding (fixable with Ameridan's tweaks);
  (b) **Bluetooth ID becomes "Mazda"** → re-pair phone (later fixed by MazdaToFiatV70AIO → "124 Spider");
  (c) **built-in navigation stops working** (Mazda firmware checks for a Mazda VIN) → fixable with the NNG fix tweak.
- "If you are taking your car in for service, **do not let the dealership update your CMU firmware**… There is a FIAT specific firmware version that is newer than the one the 2017 and early 2018 cars came with … that will break your CarPlay / Android Auto compatibility."
- Fiats shipped with Fiat-branded **v56** (2017 / early 2018) or **v59** (later 2018, 2019). From v59 Mazda blocked USB tweaks; the **ID7 patch** must be installed *before* upgrading to ≥59 (or v70) to keep tweak ability and to be able to restore nav/branding. v56 cars install ID7 via USB; v59 cars need the serial method (https://mazdatweaks.com/serial/).
- Check version: HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION.
- Firmware "V70.00.21 or later" in the OP; **PDF v3.0 and the 2019-11-16 OP note: use exactly 70.00.100 ("V70.00.100a"), NOT 70.00.335** ("This latest version includes updates designed to prevent the installation of third party tweaks").
- Firmware update can be done weeks before the hardware; **hardware must not be installed before the firmware** ("The hardware will NOT work unless the software has been installed first" — ameridan #39, post-488842; AnClar #38). Running v70 without the hub works normally, just no CP/AA (#29 post-487376).
- USB stick: blank, **FAT32**, 8–16 GB, quality brand; format on **Windows** (several reports that Mac-formatted sticks are not recognised: Popski p8 post-521231, 68wooley post-534081, kapotka #332). Sticks >32 GB default to exFAT/NTFS on Windows → not recognised (madfiat 45965 #47). Use the **upper USB port** (Bob T post-534064; lynk26 post-525074).

### 2.2 Files (OP step 1, post-475960; PDF v3.0 step 1)
- Firmware from HiDrive share `https://my.hidrive.com/share/hsodpqja.l#$/Mazda_Firmware` (OP) — later moved to `…#$/Mazda_Firmware/z%20Develop%20Firmware/Outdated%20Firmware` (PDF v3.0; 68wooley post-491968 in A-23, May 2019). Region folders: **`NA N`** (North America), **`EU N`** (Europe), **`4A N`** (Oceania/ADR). Files (NA example):
  - `cmu150_NA_70.00.100A_failsafe.up`
  - `cmu150_NA_70.00.100A_reinstall.up`
  - `2018 FIRMWARE CMU UPDATE PROCEDURE-WORLDWIDE.pdf` (Mazda's 30-step instructions; in folder `Mazda_Firmware/-CarPlay-AndroidAuto INSTALL`, together with shop-manual trim-removal pages, Mazda cable installation instructions and install videos).
  - "Download the files one at a time rather than use the 'download all files' option as the folder method compresses everything into a zip file which can corrupt the update (.up) files."
- Tweak packages — OP (Feb 2019) version, three separate zips by Ameridan:
  - ID7: `http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip`
  - Boot animations: `http://www.mediafire.com/file/6al6as23hxqusm1/Version+70+Fiat+Boot.zip` or `http://www.mediafire.com/file/bqhsl025ql05h74/Version+70+Abarth+Boot.zip`
  - Nav fix: `http://www.mediafire.com/file/ffjgv4cx7lv0b6f/Fix+ver70+NNG.zip`
- PDF v3.0 (May 2019) version, two zips:
  - ID7: same `autorun_copy_to_usb.zip`
  - **`MazdaToFiatV70AIO.zip`**: `http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file` (all-in-one: branding + boot animations + CarPlay icon + NNG nav fix + Bluetooth name + optional full backup). #25 post-479150 (2019-02-22): "we've updated and simplified the process … Updated guides are available for download".

### 2.3 USB prep (OP step 2, post-475964)
Windows Explorer → Format → FAT32, volume label e.g. "FIAT".

### 2.4 ID7 install (OP step 3, post-475966; v56 cars only)
1. Copy contents of unzipped `autorun_copy_to_usb_id7` to USB root. 2. Eject. 3. **Turn off Bluetooth on paired phones.** 4. In car: unplug USB cables, **remove nav SD card**. 5. Plug stick. 6. Without touching pedals, press START once (ACC). 7. Audio source → **FM**. 8. After a few minutes a dialog "select an installation method" → **Install**. 9. Confirm → **Update**. 10. After 1–2 min "update complete, reboot?" → Reboot; when screen goes blank remove stick.
- Mike34 #24 (post-476054): forgot to disable BT → CMU kept looking for phone; it timed out after 3–4 extra minutes and the install went on. Install is very fast; no visible confirmation that ID7 is installed.
- Dave123 (post-533892): after the serial hack the USB tweaks wouldn't autorun until he did the "full Mazda shutdown" (turn off, close doors, lock, walk away, come back).
- Walshy6677 (#277/#320, post-554943/556133): ID7 "went in OK (I think)" but a component was missing on the stick → after v70 the branding tweak never popped up and nav was lost → had to do the serial hack. **Check the copied files.**
- ID7 package content (inspected, `autorun_copy_to_usb.zip`, dated 2018-11-29): `autorun` (+`autorun.temp`), `cmu_dataretrieval.up`, dirs `00-run-tweaks-from-usb/` (udev rule `99-run-tweaks.rules`, `run-tweak-from-usb.sh`), `00-update-etc-passwd-if-needed/`, `00-update-sshd-config-if-needed/`, `01-start-sshd-and-open-firewall/` (sshd on port 24000). `autorun` lives in `/tmp/mnt/data_persist/dev/bin/`, runs `*.autorun`, disables watchdog, then runs `run.sh` from `/mnt/sd_nav/` or `/tmp/mnt/sd[a-e]1/`.

### 2.5 Firmware install (OP step 4, post-475968; PDF step 4)
- Copy only the two `.up` files to the emptied stick; print the Mazda PDF (30 steps); install **failsafe first, then reinstall**. "About an hour"; **press brake/clutch every 20 minutes** (Mazda note) so the CMU doesn't sleep.
- Mazda procedure details as reported by users: diagnostic menu reached via button combo (Music + Mute + Favorites → "Diagnostic Test" screen → keypad), then "Software Update"… frankmar post-534874: step 10's image never appeared but the USB was recognised in the top port; **failsafe took ~8 min, reinstall ~27 min** (<40 min total); afterwards version showed **70.00.100 NA N**, Music DB 00.08.000; Mazda boot logo; a "HD Traffic" item appeared. frankmar post-534690 asked what the "ROOM fuse" in Mazda step is on a 124 (no answer captured).
- jayrock (post-532339, Feb 2020, Germany, EU car from 56.00.521 with tweaks incl. speedcam patch): failsafe OK, then reinstall failed with **"Validation failure / Invalid packet certificate"** (German UI); MD5 of his `cmu150_EU_70.00.100A_reinstall.up` = `279f1b81e1fa43b1b43ea1af38aab834` (same file he'd used successfully on 3 other cars). No resolution captured (p9 only).
- slr1966 (post-539195): "Use a high grade USB stick with fast transfer times. Cuts the process time in half"; bring a laptop to the car.

### 2.6 Branding / nav restore
- OP (Feb 2019) steps 5–6 (post-475970): run `Version 70 Fiat/Abarth Boot` zip then `Fix ver70 NNG` zip, each like the ID7 install (BT off, USB out, SD out, ACC, FM, wait, confirm, reboot). Nav fix "replaces certain files that shipped with Mazda v70 with equivalents from Fiat v56"; after reboot put the nav SD back — maps instead of the compass screen.
- PDF v3.0 step 5 with **MazdaToFiatV70AIO** (recommended; "the tweaks installer is safe to run as often as you like"): uninstall Speedometer/AIO tweaks first; copy zip contents to stick; **unpair the phone on the phone AND in the CMU Bluetooth settings before running**; USB out, SD out, ACC, FM; dialogs: (1) **FIAT or ABARTH** branding; (2) replace boot/shutdown animations (yes/no; "you may still see a Mazda screen briefly … particularly after a hard reboot"); (3) replace Mazda text/resource files — works for en_UK/en_AU/en_US, it, de, fr (incl. fr_CN), es, nl; (4) replace Mazda icon in CarPlay with Scorpion/Fiat; (5) **restore OEM navigation** (several minutes, press clutch/brake during it); (6) change **Bluetooth name** (→ "124 Spider", file `config/resourcefiles/bds/bt_name.dat`); (7) optional full CMU backup to USB (`config/full-backup`, up to 30 min, press pedal every 10 min). Then reboot, remove stick, re-pair phone. Further tweaks: use MZD-AIO from mazdatweaks.com ("check the … option in the Install Options tab" — text lost in extraction; **(inferred)** from other posts: "Build run.sh" / "apps to resources").
- `MazdaToFiatV70AIO.zip` content (inspected): `tweaks.sh` (MZD-AIO-TI 2.8.3 base, "Mazda / Abarth Updates By 68Wooley and Ameridan"), `config/bootanimation/jci/resources/{LoopLogo,TranLogo,TranLogoEnd}{Fiat,Abarth}.ivf`, `config/carplay/{Fiat,Abarth}/carplay_mazda_icon*.png`, `config/carplay/carplay_config_create.xml`, `config/nng/` (data.zip, `jci-linux_imx6_volans-release`, ux/*.zip, sys.txt, NNG_debugging_*.ini), `config/resourcefiles/gui/...` (schedmaint / warnguide / emnavi dictionaries per language, plain and `_Abarth`), `config/resourcefiles/bds/bt_name.dat` = `124 Spider`. **Version gate in `tweaks.sh`: v70 with `_VER_EXT <= 100` → compat group 6; higher → 7 "unknown and cannot be trusted"** (warning dialog; see A-08 for editing it).

### 2.7 Hardware install (OP Part 2, posts #7–#14, post-475972…475990; PDF Part 2)
- Parts: **USB cables Mazda `C922-V6-605A`** (two cables: grey/blue→brown plug, grey/green→black plug), **USB hub `TK78-66-9U0C`**; kit part number **`0000-8F-Z34`** (CustomDeluxe post-523126; Amazon listing "00008FZ34"). Amazon B07KRPSRKH ($163 in Feb 2019), eBay ~$148, AliExpress item `1005001447410048` (~US$103–130, "genuine", foam tape and cable ties included; several successful reports: frankmar, Zorbec21 €87, Walshy6677 $103, navman911 CA$99). UK vendor **124spider.uk** sells a kit with instructions (Ausboy, JohnG123). AnClar #38: check the part numbers on hub AND cable kit (pic attached `mazda-upgrade-hub-and-cables-jpg.69518`).
- Earlier (2018, rsmagee A-23 p1): `TK78-66-9U0C` hub, "USB wires: **C830-V6-60Z**", "user manual 4100-77-300ES", £196 from Mazda Wolverhampton. TheSalamander (A-23): beware of early/China-specific hubs that don't work on non-China cars. ASH8's original NA list (quoted in A-23): 70.00.021A failsafe → reinstall → `C922-V6-605` cables → `TK78-66-9U0C` hub.
- Tools: 10 mm socket + 200 mm extension, ~10 cable ties, scissors, flat & Phillips screwdrivers, foam tape (anti-rattle, kit usually includes it), trim tools.
- Order of trim removal (10 mm battery negative first): passenger scuff plate → passenger front side trim (pop clip + seaming strip) → shift knob (MT unscrews; AT: see Ameridan's post https://21stcenturyfiat124spider.wordpress.com/2017/03/05/removing-the-shift-knob/ — several AT owners didn't remove it and rotated the boot/trim instead: DallasJim #274, JohnG123 #322) → shift panel + console panel + upper panel (one piece; 2 connectors under the commander) → parking brake boot (2 clips) → passenger A-pillar trim (tweeter, lay on dash) → passenger lower trim (1× 10 mm bolt) → rear console (cupholders out, 2 Phillips screws) → front console + front console panel (USB hub, airbag/seatbelt lights, seat-heater buttons; 3 connectors — the foam-wrapped small black plug is the old USB cable to be replaced) → Center Panel No. 2 (hazard switch, 1 connector) → meter hood (pop out, move aside) → CMU/display (1× 10 mm bolt; 5 connectors, the black+green plug is replaced). ~2.5 h (68wooley) to 5–6 h (frankmar, JJKeeley).
- Hub swap: push the **4 retaining tabs and push the hub forward/out** (not backwards) — DennyA #40, JJKeeley #339. Not necessary to separate the bezel, but easier.
- Cable prep per the Mazda diagram (measurements "bang on"), foam-wrap excess, route from top of dash down, tie to harness, tuck excess under the upper dash member; "pass the harness under the metal (CMU) otherwise you'll have a hard time fitting the CMU back" (frankmar). Reconnect per diagram; reconnect battery; ACC; plug phone into the **top port with the phone icon** → CarPlay/AA should start (iOS 12+); then switch off and reassemble.
- RHD (UK) identical procedure (bradley, Walshy6677); the lower trim photo differs (fuse-box door).
- Post-install oddities: USB1/USB2 may need 15–30 min / a full shutdown to be recognised (frankmar post-535698); CarPlay greyed out "no device recognized" fixed by locking car & walking away (JJKeeley #340); flaky AA/CP = try another cable (Texas124 post-546874); CarPlay dropping when knee pushes the tunnel (mykytapuz). Old hub can be refitted later — everything works, just no CP/AA (james.today post-525646).

### 2.8 Verification
- SETTINGS → SYSTEM → ABOUT → VERSION: `70.00.100 NA N` (or `EU N` / `4A N`). Boot animation Fiat/Abarth; nav shows maps (not compass) with SD card; CarPlay icon; BT name "124 Spider"; after hub: CP/AA launches from top port. The MazdaToFiatV70AIO log in `/tmp/mnt/sd*/` … (Bob T posted `rootfs 90% used` etc. — storage, not RAM; normal per 68wooley).

### 2.9 Tweaks after v70 (repeated advice)
- **Only use MZD-AIO (mazdatweaks.com, v2.8.x) for further tweaks on v70** — not Ameridan's v56 "AIO 1.51Fiat"/DOS tweaks (except background/boot images) because v70 moved the tweak folder (AA/CarPlay fill it) — ameridan post-533975/535069, bradley post-535058. Doing otherwise caused boot loops (Bob T A-04, Texas124 post-544318, frankmar post-535054). Pause-on-Mute is not v70 compatible (maschinenbau post-544332). Speedometer app is the #1 freeze/brick cause on v70 (ameridan post-534635; Bob T). **Touchscreen-while-moving tweak → AA has no sound** (Blacksapphirez post-573622). AA has no touchscreen by design on v70 (many posts); the Mazda icon on the AA exit screen cannot be replaced (ameridan post-552470).

---

## 3. Files / artifacts mentioned

| Artifact | Version / region | Where | Status 2026-08-23 | Hash / notes |
|---|---|---|---|---|
| `cmu150_NA_70.00.100A_failsafe.up`, `cmu150_NA_70.00.100A_reinstall.up` | 70.00.100A, NA N | HiDrive share (hsodpqja.l, folder `NA N`, later `z Develop Firmware/Outdated Firmware`) | HiDrive share page loads (JS app) but files removed Jul–Nov 2021 (posts #336–#337, A-09) | reinstall ≈ 903,899 KB (frankmar post-534532); "883 MB" (Sammy124 #36). Sammy124 #30: "TESTING THE .up Files" PDF gave hashes only for `*_021A_` files, not 100A. viperspeed99 (2022) asked for hashes — none posted. |
| same, EU | 70.00.100A EU N | HiDrive `EU N` | removed | MD5 reinstall `279f1b81e1fa43b1b43ea1af38aab834` (jayrock post-532339, single report) |
| same, ADR/Oceania | 70.00.100 4A N | HiDrive `4A N` | removed | — |
| **`FIAT 124 CarPlay files NA.zip`** (935 MB) | 70.00.100 NA + instructions + MZD-AIO (per OP) | Google Drive file id `1f8B3X-xJ3n30QRS_vciNwOn-eAP6Tber` (A-12 OP, AegirTheLucky, 2025-01-28) | **alive** (virus-scan-warning page) | not downloaded/hashed by me |
| **`FIAT 124 CarPlay files EU.zip`** (2.2 GB) | 70.00.100 EU | Google Drive `1kFk-EA6ZufPQjSimC9XalbcSUOoBctpC` | **alive** | one brick report with the EU file (brh, A-12 #10 — see §5) |
| **`FIAT 124 CarPlay files ADR.zip`** (1.8 GB) | 70.00.100 ADR/4A | Google Drive `1Pe24NuIzGeeO-Kt09o6i-dSHTa_UkM9t` | **alive** | — |
| v74 NA folder "NEW NORTH AMERICA ONLY Mazda Firmware NA_74.00.324A (as of April 2023)" | `cmu150_NA_74.00.324A_update.up` + `2018 FIRMWARE CMU UPDATE PROCEDURE-WORLDWIDE.pdf` + `Checksum_Utility.exe` + `README FIRST!!!.pdf` | Google Drive folder `1FSOxXVccKppRURPqZVayfulACGOQW-3Q` (madfiat, A-12 #9) | **alive** | v74 cannot be downgraded & had no tweaks until the MP3 method (A-13) |
| EU 70.00.100 (Lennie1979) | EU | Google Drive `1pTodcgciSVlBMGxIzWZQSCXSF5_UNNHo` (A-11 #50, link later removed) | **dead (404)** | — |
| "Oceana version with all Ameridan Tweaks" | ADR | `we.tl/t-3lHq77LTMj` (RJJ, A-11 #6) | WeTransfer links expire — **assume dead** (not checked) | — |
| Odysee "FIAT 124 CarPlay Android Auto FILES" (DanB, post-582450, Jan 2022) | `124SpiderCPAAUpgradeGuide.zip`, `firmware-cmu-update-procedure-worldwide-2018.pdf`, `cmu150NA70.00.100A_reinstall.up`, `cmu150NA70.00.100A_failsafe.up`, `MazdaToFiatV70AIO.zip`, `autoruncopyto_usb.zip`, "TEST…" | https://odysee.com/@DanB:7/FIAT-124-CarPlay-Android-Auto-FILES (**inferred** URL from title) | page returns 200 but content is JS-rendered; unverified | — |
| mazda3revolution "Mazda CONNECT MZD Firmware, CP/AA, WCP, links, Help" thread p12 post-2520624 | NA 70.00.100A | https://www.mazda3revolution.com/threads/mazda-connect-mzd-firmware-cp-aa-wcp-links-help.236775/page-12#post-2520624 (AnClar A-09 #28, "can't vouch") | site answers 202 PoW to curl | Theme for other agent |
| gpytmfg blog "Genuine Mazda Android Auto and CarPlay install" | ? | https://www.gpytmfg.com/blogs/news/genuine-mazda-android-auto-and-carplay-install (A-09 #30, "56 to 70 update went just fine") | **alive** (200) | not read |
| Mazda mega.nz folder (ASH8, 2018) | manuals + firmware instructions | `https://mega.nz/#F!3A0DkA4R!pREP1DJkn0HBqVUolHUbXA` | page 200 (folder content unknown; "the Mega link is dead" — srt4evah post-576566, 2021) | — |
| `autorun_copy_to_usb.zip` (Ameridan ID7 package) | ID7 (v1, 2018-11-29 files) | http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip | **alive, downloaded** → `research/archive/mediafire/autorun_copy_to_usb.zip` | SHA256 `c8bef694b1dcae78881ad57b9df8fdba09f073ee93d3ca89c9382c7315572726` (46,659 B) |
| `Version 70 Fiat Boot.zip` | Feb 2019 | http://www.mediafire.com/file/6al6as23hxqusm1/Version+70+Fiat+Boot.zip | alive, downloaded | SHA256 `d73bd3518ac775393db66ed1f2564f7b56f9abce2d0c638973427bb2361f48cb` (1,485,535 B) |
| `Version 70 Abarth Boot.zip` | Feb 2019 | http://www.mediafire.com/file/bqhsl025ql05h74/Version+70+Abarth+Boot.zip | alive, downloaded | SHA256 `6d1e2e74484a6f53e3fbf641f4cac2681963846952272595701b994e6fb4b420` (1,479,637 B) |
| `Fix ver70 NNG.zip` | Feb 2019 | http://www.mediafire.com/file/ffjgv4cx7lv0b6f/Fix+ver70+NNG.zip | alive, downloaded | SHA256 `f3e3f7289a12a1e5d97e47f5a62d7232ba7959948f57521f7c93a0eede7b3f17` (33,811,815 B; 33,020 KB matches frankmar post-534532) |
| **`MazdaToFiatV70AIO.zip`** | tweaks.sh header AIO 2.8.3; files Feb 2019 | http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file (PDF v3.0) | **alive, downloaded** | SHA256 `9d8fe6d8107ee038295e19a3a7c578f34530adbbdcd3321a26d4f3c8d7c58b20` (37,724,156 B). ⚠️ This is the MediaFire copy linked by 68wooley's PDF; Ameridan's blog may host a newer revision (Theme B to compare). |
| **`124Spider_CP_AA_Upgrade_Guide.zip`** (68wooley PDFs) | Part 1 v3.0 (2019-05-17), Part 2 (2019-02-06) | http://www.mediafire.com/file/201759io15ariii/124Spider_CP_AA_Upgrade_Guide.zip/file (also Wayback 2023-08-09) | **alive, downloaded** | zip SHA256 `59725fe002d9f05fb4e168dd4a64e71220b01c9f172cf7674d7e0f47171743b0`; Part 1 PDF `56a1ee28d3b10a155456f28cdcf0fea5a9ddfcd8ea3dfabe777f610062bb4102`; Part 2 PDF `7c09c88a93ddb25e453991ffca9b572c1b536525b43da00a43eef8b229c7f166` |
| `2018 FIRMWARE CMU UPDATE PROCEDURE-WORLDWIDE.pdf` (Mazda) | 2018 | HiDrive (gone); inside the Google-Drive zips / v74 folder above | available via A-12 | — |
| "z CHANGELOGs for 6th Generation CONNECT.pdf" (Mazda changelog incl. 70.00.335C/.352B) | — | 124spider attachment `/attachments/z-changelogs-for-6th-generation-connect-pdf.79217/` (124geek A-08 #5) | behind bot-block; no Wayback | — |
| HowTo photo attachments | — | `/attachments/photo1-png.67476/` … `photo48-png.67604/` (OP posts) | bot-blocked (some may be in Wayback via page captures) | — |
| MZD-AIO-TI installer | 2.8.3 / 2.8.5 / 2.8.6 (`MZD-AIO-TI_Setup_2.8.6.exe`) | mazdatweaks.com | alive (200) | compatible up to 70.00.352 per 124geek; "Build run.sh" needed for the MP3 method |
| ID7 Recovery v2 ("XX package") | Trezdog44, 2019 | mazda3revolution thread 234619 | — | fixes the 70.00.335C lockout if installed before/with it (AnClar post-493362; 124geek A-08) |
| `mzd-connect-1-root` (MP3 payload root) | GitHub mzd-evo | https://github.com/mzd-evo/mzd-connect-1-root | **alive** | used by A-13; origin: miata.net post 142 of "[Guide] ND1/ND2 - Touchscreen in motion on latest FW, No hardware required" (`forum.miata.net/vb/showpost.php?p=11011594&postcount=142`, 403 to curl; post 148 `p=11012202` for v74 `run.sh` edit) |
| AA Tru_Go (Radarwild) | 1.14b (v56), 1.15 (v59+), 1.15b (v70+); AIO 1.51 ships AA 1.13 | distribution only via author/PM (A-19) | — | not needed for the official v70 route; don't mix with official AA |
| AAWireless dongle (gen 1) | — | Indiegogo (italianboy #328) | — | gives wireless AA on v70 (gen-1 also touchscreen per madfiat) |
| Serial adapter | USB-TTL CP2102 (eBay, Walshy6677 A-16) | — | — | for mazdatweaks.com/serial |
| Replacement CMU | Mazda3 2014-16 CMU `BJS7669C0K` / screen `BHP1611J0D`; Fiat CMU from eBay ($125) | eBay | — | not VIN-locked; plug & play (manwithastick A-24; Bob T A-04) |

---

## 4. Per-market notes

- **NA (US/Canada)**: the bulk of the thread. Files `cmu150_NA_70.00.100A_*` "NA N". 2017/early-2018 = v56 (56.00.521, 56.00.530 reported) → USB ID7; 2018.5–2020 = v59 (59.00.424?, **59.00.524**, **59.00.5662 (sic, Hogrider92)**, **59.00.563** on a 2019 CMU and a 2020 car) → serial. Canadians bought the AliExpress kit (customs tip). DennyA, Bob T, Texas124, maschinenbau, DallasJim, csierra09, JJKeeley, CustomDeluxe (59.00.524 via serial, 2020), KingArthur (2019 v59, 2022) all succeeded.
- **EU (continental)**: jayrock (DE) did 4 installs from 56.00.521 with `cmu150_EU_70.00.100A_*`; one "Invalid packet certificate" failure (§5). Zorbec21 (FR, 2017 Abarth) OK with AliExpress hub. FanClub124Spider (IT, 2023) skipped ID7 → lost logo + nav after hub install. brh (2025) bricked with the EU Google-Drive file (§5). EU files were the hardest to find 2021–2024 (threads A-10, A-11); now in A-12.
- **UK**: same EU firmware ("EU N"); bradley installed 4+ cars as a service (2019–2020) and helped Walshy6677 (serial rescue); 124spider.uk sells kits; RHD procedure identical. littletone101 / 12S4vage_ shared EU files privately (2022). ChaoticMike (2019 Lusso Plus **still on v56** in 2021).
- **ADR / Australia**: files "4A N" (AnClar A-11 #2: "Oceania files… v70.00.100 4A N. Do not use NA N / EU N / JP"). bstem (2024) got them; Lawrence "only tried the Australian version". **Ausboy's 2017 Abarth was flashed with 70.00.100A-NA by an auto electrician** (A-16) — it works for CarPlay but is the wrong region (auto-lock setting missing; branding could not be fixed because ID7 was skipped). ⚠️ A data point that NA firmware *boots* on an ADR car, but not a recommendation.
- **JP**: only mentioned as a region folder ("NA N, EU, JP, etc." AnClar A-09 #5); no 124 JP report.
- **Language support of MazdaToFiatV70AIO** resource replacement: en_US/en_UK/en_AU, it, de, fr/fr_CN, es, nl.

---

## 5. Failures / gotchas / warnings (with fixes)

1. **70.00.335C+ lockout** (A-23 p25, May 2019; OP note Nov 2019): 335C deletes/neutralises the ID7 `autorun` ("The key is the 'autorun' file … if it gets deleted, games over" — 68wooley post-492186). Fix at the time: stay on 70.00.100; later **ID7 Recovery v2** (Trezdog44) protects through 335/352 if present beforehand. 124geek (A-08, Sep 2020) ran MazdaToFiatV70AIO on **70.00.335C/352B** by: using an MZD-AIO 2.8.6 USB stick, replacing its `config/` and `tweaks.sh` with the MazdaToFiatV70AIO ones, editing `tweaks.sh` (`AIO_VER=2.8.6`, `AIO_DATE=2020.04.04`, `AA_VER=1.13`, `SPD_VER=6.1`, `AIO_TWKS_VER=1.0`; in `compatibility_check()` line ~161 `if [ $_VER_EXT -le 100 ]` → `-le 360`). 68wooley saw no benefit in 335/352 (only BT echo fix, Mazda-specific). **70.00.367 cannot be tweaked** (124geek; A-03). A user on **70.00.335 without ID7** could not run the MP3 method either (Nonno, A-13 #32–#34: "script has a check that stops at version 100").
2. **Fiat 59.00.56x trap**: Bob T's replacement CMU (2019, **59.00.563**) "not upgradable, as I understand it"; Hogrider92's 2019 on "59.00.5662" told serial is required (wrh3). Ryan86's 2020 car has 59.00.563 and was asking for 70.00.100 NA (Nov 2024, outcome unknown). ⚠️ Nobody in these captures actually reports flashing 70.00.100 over 59.00.563 — **contradiction/open** (OP says the newer Fiat firmware "will break your CarPlay/AA compatibility"; madfiat A-13 #21 "can you upgrade from v59 to v70 without id7? … I THINK upgrading isn't an issue"; firstshadow A-13 #5 "v59 to v70 and then tweaks via USB mp3 bypass works").
3. **Skipping/failing ID7 before v70** (Walshy6677, Ausboy, FanClub124Spider, A-03 OP): result = Mazda branding + dead nav + USB tweaks impossible. Fixes: serial hack (mazdatweaks.com/serial, user/jci prompt — beta_one couldn't log in because of console spam, asked how others did; Dave123/CustomDeluxe succeeded with PuTTY) — or, since May 2025, the **MP3-payload method** (A-13). ameridan to FanClub124Spider: ID7 "is the most important step"; frankmar's suggestion to refit old hub and redo is wrong (hub is irrelevant) **(inferred)**.
4. **Wrong tweak generation on v70** (old Ameridan AIO 1.5/1.51 "DOS" tweaks, remove-disclaimer, Speedometer): boot hang at Abarth logo, frozen UI, no diagnostic keypad → Bob T ended up buying a CMU. Recovery tips: Nav+Mute 10 s reboot; Nav+Mute+Back 10 s hard reset; Settings → Restore factory; remove tweaks one by one; re-run MazdaToFiatV70AIO; SJWhiteley: "as long as any install was not fatally interrupted you can recover by removing tweaks; if a firmware install is interrupted the only solution is flashing the EPROM".
5. **Brick during firmware flash** — brh (A-12 #10, Jun 2025, UK Abarth, EU file from Google Drive): "Failed to validate package certificate", retry → "requested update package is missing", then CMU never booted. Advice: bad USB stick / browser decompression; hash-check files. jayrock's "Invalid packet certificate" (EU, 2020) similar — **open question**: is it the stick, the file, or the source firmware/tweaks (speedcam patch)? SVTour (A-23 p25, 2019, NA): screen black after the update, FM static, no USB reaction; outcome unknown ("take it to the dealer and plead ignorance"; AnClar: refit the old hub first, and a warranty CMU will come back with v59 → serial needed).
6. **USB not recognised** (manwithastick A-05): after a downgrade the stick stopped autorunning — the stick itself had died; also the new hub shows no "USB connected" text at the top but still works for updates. "Full shutdown, lock, walk away" often needed before the CMU picks up a stick (Dave123, JJKeeley, frankmar).
7. **Mac-formatted USB** not recognised — format on Windows (multiple).
8. **Auto-locking option missing** after the upgrade (Ausboy ADR-with-NA-fw, Walshy6677 UK) vs. "no problems" (AnClar NA). ⚠️ possibly region-related (**inferred**).
9. **AA no touchscreen** on v70 (by design); **AA no sound** if touchscreen-while-moving tweak is installed (Blacksapphirez); Mazda icon on AA exit screen not fixable (hide via phone launcher settings — A-30 snippet).
10. **Speedometer app / many contacts** → memory pressure, freezes (ameridan); Pause-on-Mute incompatible.
11. **Dealer flashes**: 70.00.367 flashed by a Mazda dealer despite instructions (A-03); Fiat dealers may flash the newer Fiat 59 (OP). Tell them not to touch the CMU (124Scottish Abarth).
12. **Firmware availability**: all public hosts removed Jul–Nov 2021 (A-09: ASH8 forced to remove links, HiDrive gone, Mega dead); 2022–2024 sharing only by PM; Jan 2025 AegirTheLucky re-published (A-12). Forum warns about legal exposure of posting files on the forum itself.
13. **Files "tweaked" rumour**: AegirTheLucky (A-12 #5) says the NA/EU/ADR zips "are from Mazda … but have been tweaked by people to be optimized for Fiat" — ⚠️ unclear what that means (probably the bundled MazdaToFiat files, **inferred**); the `.up` files themselves should be verified against independent hashes.
14. Hardware: USB hub clips (push forward), ribbon/speaker connector not seated → no sound (A-25), cable flakiness; AliExpress "genuine" kits OK for several users but one poster distrusts them; manual AT shift knob.
15. 68wooley's warning about "download all files" zip from HiDrive corrupting `.up` files.

---

## 6. Downgrade / rollback info

- ameridan (post-532373/532902, 2020) first suggested "downgrade to Mazda 59.00.502 then install ID7 via USB" for v59 cars, then corrected himself quoting Tristan-cx5: **"You can only downgrade as far as 59.00.502 and from that version onwards you have to do the serial access to install AIO tweaks via USB"** (so the downgrade does not unlock USB tweaks by itself; Hogrider92 gave up).
- manwithastick (A-05): downgraded **70.00.100A → 59.00.502-NA** (to run AA Tru_Go 1.14b with touchscreen); conflicting advice on order (reinstall first then failsafe vs. Mazda's failsafe-first); he ended up with "59.00.502 with a failsafe of 70.00.100A" and later went back up to 70.00.100A with the original hub refitted, then down again successfully; sold a spare CMU "ID7 on firmware 59.00.502-NA N".
- A-03 (snippet): after a dealer's 70.00.367, downgrading to 70.00.100 did **not** restore USB tweaks; "no simple way to downgrade .367 to a tweak-compatible version; some did it via serial on the CMU rear port".
- 124geek (A-08) downgraded 352 → 335 without issue (but MazdaToFiat still wouldn't start until the script trick).
- v74: "if you had upgraded to that and found you couldn't downgrade" → MP3 method gives tweaks anyway (madfiat A-13 OP, B).
- Going back to Fiat firmware: cota123 asked (post-583127) — no answer except "why would you want to?"; jayrock (A-21) asked for genuine **59.00.561 EU N** failsafe+reinstall — nobody had it. Old hub can be refitted (works without CP/AA).
- madfiat (A-13 #19): the MP3/terminal method "in theory would let you downgrade the firmware" (diagnostic menu reachable from the payload).

---

## 7. Open questions / contradictions

1. **Upgrading from Fiat 59.00.56x (e.g. 59.00.563) to 70.00.100**: no explicit success report found in the captured pages; OP only says the newer Fiat firmware "will break compatibility" (meaning with the guide/tweaks? or the flash itself?). Needs pages 3–7, 15, 21 of A-01 and threads A-03/A-30 (not archived).
2. **Exact cause of "Invalid/Failed to validate package certificate"** (jayrock 2020 EU from 56.00.521 with speedcam patch; brh 2025 EU from unknown) — bad stick, corrupted download, or a genuine firmware-signature issue? brh's brick shows the EU Google-Drive zip must be hashed and ideally compared to jayrock's MD5 `279f1b81e1fa43b1b43ea1af38aab834`.
3. **Is ID7 needed at all any more?** Since May 2025 the MP3 payload (mzd-evo) runs scripts on 70.00.100 and 74 without ID7 (A-13), but **not** on 70.00.335 (script version check; unknown whether the payload itself works there). The project's "70.00.335+ = no tweaks" disclaimer should be nuanced: ".100 and v74 recoverable via MP3 method; .335/.352/.367 unclear".
4. **MazdaToFiatV70AIO revisions**: MediaFire copy (tweaks.sh AIO 2.8.3 base, files Feb 2019) vs whatever Ameridan's blog links now; 68wooley said (A-08 #6) he might "update the instructions to use ID7 V2". Check Theme B.
5. **Region mismatch tolerance**: NA firmware on an ADR car booted and runs CarPlay (A-16) — contradicts "wrong region = brick"; but auto-lock missing. Treat as anecdote.
6. **Serial login**: beta_one couldn't log in (`user`/`jci` rejected, console spam) on a 2019 — unresolved in captures.
7. **"Room fuse"** step of the Mazda PDF on a 124 — unanswered (frankmar).
8. The 2019 "V70.00.21" vs "70.00.021A" naming (OP) vs "70.00.100A": 021A was the first NA release (Sept 2018); 100A superseded it by Feb 2019; checksum PDF only covered 021A.
9. Thread pages not captured: A-01 p3–7 (Apr 2019–May 2020, incl. the 2019-11 note period and early reports with 335), p15 (Apr–May 2021), p21 (2024); A-03, A-07, A-30, A-31 entirely; A-11 p2–3; A-13 p2. Could be recovered by a human with a browser (or by asking the owner to save the pages).
10. Whether AegirTheLucky's zips contain the original, unmodified `.up` files (see §5 item 13).
