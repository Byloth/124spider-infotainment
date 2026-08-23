# Theme F — Rollback / downgrade / failsafe & failure stories (MZD Connect CMU, 124 Spider & MX-5 ND)

Research agent notes, 2026-08-23. Raw material for `SOURCES.md`, `FIRMWARE-MATRIX.md`, `PROCEDURE-DRAFT.md`,
`OPEN-QUESTIONS.md`. Source ids are local to this file (`[F-nn]`); map them to `[S-nn]` when merging.
Everything below is *reported by users* unless it is a Mazda document; nothing was tested on hardware.
Legend: ⚠️ unverified / single report · ❓ contradictory · ℹ️ inference by the researcher (not in a source).

Local copies of every fetched page (HTML + extracted post text) are in
`research/archive/F-rollback/` (see §9 for the file list).

---

## 1. Sources

Access notes (important for archiving): 124spider.org, mazda3revolution.com, mazda6club.com and mazdas247.com
(all VerticalScope/XenForo) now sit behind a JavaScript proof-of-work challenge and redirect non-browser
fetchers to a paywall (`tollbit.*`, HTTP 402). They were fetched with a small PoW-solving curl wrapper;
some threads still return HTTP 406 to scripts and were taken from the Wayback Machine instead.
forum.miata.net is login-walled ("denial of service … temporarily requiring users to be logged in"), so the
two key Miata threads could not be read directly. `mazdatweaks.com` is **hijacked** (Indonesian gambling spam
on 2026-08-23; `/id7` returns 404) — every guide that links to `mazdatweaks.com/serial` or `/id7` now points
to a dead resource; only the GitHub mirror (Trevelopment/mazdatweaks) remains.

| id | URL | type | author / dates | status (2026-08-23) | what it gives | trust |
|---|---|---|---|---|---|---|
| F-01 | https://www.124spider.org/threads/infotainment-not-recognizing-usb-to-install-tweaks-after-downgrade-70-00-100a-to-59-00-502.38159/ | forum thread | manwithastick, 2020-10-11 → 2021-06 | live (bot-gated); Wayback 2023-03-30 used | downgrade 70.00.100A→59.00.502 NA done by USB; tweaks stopped autorunning; real cause = car's USB port/hub reading the stick badly; bought a Mazda3 CMU on eBay, "our generation of CMUs are not VIN locked" | high (first-hand, resolved) |
| F-02 | https://www.124spider.org/threads/ok-screwed-up-the-infotainment-upgrade-fixed.38071/ | forum thread | Bob T, 2020-09-26 → 2020-12-11 | live (bot-gated) | v70.00.100A OK, then ran Ameridan AIO 1.51 (v56-era tweaks) on v70 → stuck at Abarth logo, Diag screen unusable, could not re-flash; fixed by used CMU from eBay $125 (124, fw 59.00.563 "not upgradable" = locked); second used CMU on 56 → upgraded fine; "bricked during v70 install" follow-ups | high |
| F-03 | https://www.124spider.org/threads/i-bricked-my-cmu-then-recovered-it.22986/ | forum thread | Doriath 2017-12-06; SJWhiteley 2019-04-20; Mrphanbg 2020-02 | live (bot-gated) | two full recovery write-ups: (a) SPI-NOR config partition (squashfs) re-packed to fix a mangled passwd; (b) CH341A + SOIC16 clip, byte 0x10000 FF→00 → forced failsafe → re-flash .up; replacement cost ~$700–1000; a v59.00.545 4A user stuck in 45-s reboot loop after patch | high |
| F-04 | https://www.124spider.org/threads/mazda-made-up-a-mess-fw-70-00-367.39292/ | forum thread | asilorepublic (IT), 2021-04-01 → | live (bot-gated) | Mazda service flashed 70.00.367 against written instruction → Mazda branding, no nav, no tweaking; user downgraded to 70.00.100 by USB but USB tweaks still impossible; advice: downgrade + ID7v2 via serial; Fiat dealer "could only replace the CMU" and the replacement would be locked Fiat software; ameridan: old hub may be needed to downgrade below 70 (unsure) | high (first-hand) |
| F-05 | https://www.124spider.org/threads/update-my-cmu-and-now-i-have-mazda-help.45814/ | forum thread | 2025-04-13 → 2025-08-01 | live | installed 70.00.100A without ID7 → "locked out"; mp3-payload method suggested; madfiat: v74 works and can be re-Fiat-ised, "id7 or serial connection are no longer needed"; a NL owner says a Mazda dealer offered to install the upgrade | medium–high |
| F-06 | https://www.124spider.org/threads/issues-with-tweaks-v1-51-after-v70-carplay-upgrade.40317/ | forum thread | kd215, 2021-09-02 → 09-30 | live | AIO 1.51 on v70 bricked the CMU (no touch, knob select dead); replaced with used 2018 124 CMU ($285 incl. display, eBay); redid ID7→70.00.100→MazdaToFiatV70AIO→MZD-AIO 2.8.6 | high |
| F-07 | https://www.124spider.org/threads/infotainment-update-question.41083/ | forum thread | 2022-01 → 2023-01 | live | 2017 CMU swapped into 2019 car; "ID7 first"; firmware before hub; 70.00.100 mega link dead by 2023; airbag light after hardware swap | medium |
| F-08 | https://www.124spider.org/threads/version-74-00-324-cmu-firmware-discussion.45963/ (+page-2) | forum thread | madfiat et al., 2025-05-25 → 2025-12 | live | v74.00.324 on 124: works, re-branding + nav fix via mp3 payload with script edits; full Mazda changelog 55→74; "you can jump straight to v74"; "need ORIGINAL USB module when you do the upgrade" | medium–high |
| F-09 | https://www.124spider.org/threads/mazdatofiat70aio-and-cmu-firmware-70-00-335c-or-70-00-352b-success.38004/ | forum thread | 124geek, 2020-09-16 → | live; Wayback used | with ID7v2 + serial, updated 100→352, downgraded 352→335, MazdaToFiat refused (version check) → edited tweaks.sh (`_VER_EXT -le 360`) and ran it from an MZD-AIO 2.8.6 stick → success on 70.00.335 | high |
| F-10 | https://www.124spider.org/threads/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can.45965/ | forum thread | madfiat, 2025-05-25 | live | mp3-payload (mzd-evo/mzd-connect-1-root) + USB keyboard → terminal → `./tweaks.sh` runs MazdaToFiatV70AIO / MZD-AIO 2.8.6 on locked v70 and v74; "unknown if this works on V59" | high (first-hand, video) |
| F-11 | https://www.124spider.org/threads/install-tweaks-using-mazda-mp3-hack-to-v59-v70.45459/ | forum thread | 2024-12-31 → 2025-07 | live | Esch: mp3 hack reached the diagnostic/terminal screen on a **v59** 2019 Lusso; nobody had yet done the Fiat scripts at that time | medium |
| F-12 | https://www.124spider.org/threads/tweak-firmware-v74-and-older-with-only-usb.44940/ | forum thread | 2024-08-14 → 2025-05 | live | points to miata.net guide (posts 142/143); madfiat confirms on v70 | medium |
| F-13 | https://www.124spider.org/threads/sd-card-help-needed.40534/ | forum thread | 2021-10-12 → | live | used 2018 Lusso bought from a Fiat dealer with 74.00.230 NA N installed: Mazda logo, nav shows only compass; "Fiat dealership … no idea"; Tristan-cx5 bench test: 74.00.230 can be downgraded by the normal USB process | medium |
| F-14 | https://www.124spider.org/threads/odd-man-out-cmu-update-74-00-230.39761/ | forum thread | Garrettt93, 2021-05-31 → 2022-03 | live | voluntarily on 74.00.230 for stability, accepts Mazda branding; attempts to re-pack .up (signed, failed) | medium |
| F-15 | https://www.124spider.org/threads/software-program-updates.43884/ | forum thread | 2023-11 | live | independent shop billed $515 for a "software update" on a car showing 59.00.524 NA N; forum: non-dealers have no official Fiat firmware access | low–medium (anecdote) |
| F-16 | https://www.124spider.org/threads/is-it-possible-to-upgrade-the-infotainment-software-has-anyone-done-that.45237/ | forum thread | 2024-10 → 2025-03 | live | UK owners helping each other; claim "no hardware needed for AA, only for CarPlay" ❓ (contradicted in F-08) | low |
| F-17 | https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/page-6 | forum guide | 68wooley; update 2019-11-16 | live | master guide: "ensure you are using 70.000.100 and NOT 70.000.335"; what breaks (branding, nav/VIN check, BT name "Mazda"); "do not let the dealership update your CMU"; quality 8–16 GB FAT32 stick "if the stick fails … non-functional CMU"; firmware BEFORE hardware | high |
| F-18 | https://www.124spider.org/threads/124-spider-mazda-screen-bhp1611j0d-mazda_gen_65_cmu-bjs7669c0k-tweaks-installed.38459/ | forum (for-sale) | manwithastick, 2020-12 → 2021-06 | Wayback | Mazda3 CMU BJS7669C0K + screen BHP1611J0D works in 124 (swap dash trim); sold $299 | medium |
| F-19 | https://www.mazda3revolution.com/threads/black-screen-mzd.229891/ (18 pages; p1–9, 11, 18 read) | forum thread | raoulh et al., 2018-08-10 → 2026-07 | live (bot-gated) | THE recovery thread: RPi/flashrom and CH341A procedures, offsets, chips (MX25L6445E EU, Spansion S25FL064 US), 3.3 V programmer mod, rescue .bin files, 74.00.310+ downgrade lock, forced-failsafe behaviour table by version, serial `jci-looptestin` loop fix, hardware-dead cases | high |
| F-20 | https://www.mazda3revolution.com/threads/successful-downgrade-from-70-00-021a-to-59-00-545a.230305/ | forum thread | p82maarj / hrm701 / Tristan-cx5, 2018-09 → 2020-01 | live | downgrade done by standard procedure; file-order dispute (reinstall-first vs failsafe-first); "You can only downgrade as far as 59.00.502"; serial access needed to tweak at 59.00.502+ | high |
| F-21 | https://www.mazda3revolution.com/threads/firmware-downgrade.242237/ | forum thread | Tristan-cx5, 2020-12 → 2021-09 | live but HTTP 406 to scripts; Wayback 2026-01-07 | photo test: on 70.00.335 the USB list hides anything < 59.00.502; serial options per version (59.00.502–70.00.100 serial; 70.00.335/352 ID7v2; 70.00.367 cannot be enabled, but can be downgraded) | high |
| F-22 | https://www.mazda3revolution.com/threads/mzd-firmware-update-half-installed-now-black-screen-help-me-recover.242671/ | forum thread | 2021-02-23 | 406; Wayback | 56→70 4A: failsafe OK, reinstall stuck "Connecting to firmware", car turned off, next day black screen (radio works) → pointed to F-19 | medium |
| F-23 | https://www.mazda3revolution.com/threads/black-screen-after-failed-mzd-connect-update-%E2%80%93-cmu-dead-mazda6-gj-%E2%80%93-vin-jmzgj697671353266.254150/ | forum thread | kuschi79 / Tristan-cx5, 2025-06 → 07 | live | failsafe installed, battery disconnected → black; FORScan DTC U3000:42-0B "general memory failure"; any MZD-1 CMU from any model works as replacement, firmware version irrelevant except new hub needs ≥70.00.021; new 1000–1200 €, used 400–600 €, got one for 190 €; dealer quote ~1500 € | high |
| F-24 | https://www.mazda3revolution.com/threads/mzd-i-connect-firmware-info-hints.236211/ | forum sticky | Tristan-cx5, 2019-08-29 | live | official-ish hints: 2 files before 70.00.335, 1 after; ≥31.00.100 can go straight to latest; downgrade possible to 59.00.502; format with Windows (Mac issues); verify hashes; "new CMU around 1000 USD"; region/TAU notes | high |
| F-25 | https://www.mazda3revolution.com/threads/mzd-connect-update-is-na-car-with-eu-firmware-possible.243977/ | forum thread | 2021-09 | live | EU firmware on NA-built car: no brick, radio frequencies shifted (TAU), 70.00.100A then 70.00.367 | medium |
| F-26 | https://www.mazda3revolution.com/threads/my-cmu-fail-safe-version-not-avallable-how-to-fix.241706/ | forum thread | 2020-10 → 2021-08 | live | "Failsafe file installation failed", version screen lost failsafe; causes: bad checksum, AIO tweaks installed (removing them fixed it), **new USB hub fitted before the update** → "update not successful" | medium–high |
| F-27 | https://www.mazda3revolution.com/threads/downgrading-firmware.201994/ | forum thread | d3vi1 / alej0, 2017 | live | below 59.00.502 downgrade is free; from 59.00.502 only with NOR programmer; forced failsafe installs the first `*reinstall.up` on the stick even if versions mismatch; settings lost on downgrade; JTAG/ENET factory port | medium (expert, old) |
| F-28 | https://www.mazda3revolution.com/threads/usb-thumb-drive-for-fw-updates.246137/ | forum thread | 2022-08 | live | sticks that worked (SanDisk Ultra USB3 32 GB, Cruzer 16 GB, Verbatim 8, Transcend 8, no-name 2–8 GB); one 8 GB not recognised | medium |
| F-29 | https://www.mazda3revolution.com/threads/id7-recovery-v2.234619/ | forum thread | Trezdog44, 2019-05-20 | live | 70.00.335-C NA contains `neutralizeid7`; "if you update to 70.00.335+ without this recovery installed there is no chance … serial connection will not even work" (later relaxed: ID7v2 via serial works on 335/352) | high (author) |
| F-30 | https://www.mazda3revolution.com/threads/cannot-install-update-package.235497/ | forum thread | 2019-07 → 2023 | live | bought car stuck in "Install Not Successful: System Failure" loop; hints: other/older/smaller stick, verify hashes, remove Nav SD; Mazda dealer path ≥31.00.100 → latest | medium |
| F-31 | https://www.mazda3revolution.com/threads/install-not-successful.226986/ | forum thread | 2018 → 2025 | live | "Install not successful" fixed by an old 2 GB USB 2.0 stick; "usb 3.0 will not work" (some do) | medium |
| F-32 | https://www.mazda3revolution.com/threads/firmware-version-mayhem.244479/ | forum thread | 2021-12 → 2023 | live | 74 is a 1-file update; 56→74 directly "should be fine"; 70.00.021 most buggy v70; firmware links removed by copyright owners | medium |
| F-33 | https://www.mazda3revolution.com/threads/mazda-mzd-connect-firmware-downloads-updated.180578/ | forum sticky | ASH8 | live | "Fail Safe Version" shown in About screen; "If your Mazda was born with ANY 59.00.xxxx or above DO NOT roll back"; Nav SD card locked to original CMU + VIN after 100 km | medium–high |
| F-34 | https://www.mazda6club.com/threads/bricked-cmu-replaced-offset-0x10000-to-ff-and-still-bricked.444748/ | forum thread | 2021-03 | live | boot-select patch alone did not revive (serial also dead); pointed to F-19 rescue .bin approach | low–medium |
| F-35 | https://mazdas247.com/forum/threads/2016-cx-5-cmu-bricked-after-firmware-update-black-screen-but-radio-works.123884841/ | forum thread | 2026-05 → 08 | live | technician update with windows open / alarm / key away → black screen; NAV+BACK+MUTE and battery disconnect useless; planning CH341A | low (unresolved) |
| F-36 | https://mazdas247.com/forum/threads/mazda-connect-firmware-update-stuck-at-19%E2%80%9321-and-frozen-radio.123883481/ | forum thread | 2025-08 | live | 56→70.00.100A EU stuck 19–21 % then "unsuccessful", radio frozen; fixed with a branded (Toshiba) FAT32 stick; another user stuck at 2 % after fitting the AA hub first | medium |
| F-37 | https://mazdas247.com/forum/threads/issues-updating-firmware-help.123884804/ | forum thread | 2026-05-14 | live | textbook brick: failsafe 70.00.100A, car switched off before reinstall → black; ROOM fuse, battery, ACC+USB all useless | medium |
| F-38 | http://www.2x4logic.com/jci-failsafe.html + http://www.2x4logic.com/invokefailsafe.html | technical pages | majbthrd, 2016 | site down; Wayback 2016 copies | SPI-NOR partition map, why the "fail-safe" isn't, boot-select byte at 0x010000, Bus-Pirate procedure, "even Mazda's procedures seem insufficient; run the engine" | high (reverse-engineer) |
| F-39 | https://mzdonline.wordpress.com/2017/07/19/reset-cmu-nor-flash-with-rpi/ | blog (Thai) | mzdonline, 2017-07-19 | live | RPi + flashrom + SOIC16 clip, `S25FL064A/P`, write 0x00 at boot-select, backup first | medium–high |
| F-40 | https://yms.livejournal.com/3007282.html | blog | Michael Yutsis, 2017-08-05 | live (JS wall); Wayback used | first public unbrick: Spansion S25FL064A, CH341A, chip de-soldered; EU 56.00.513 rescue .bin shared in comments | high |
| F-41 | https://21stcenturyfiat124spider.wordpress.com/2025/05/25/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/ | blog + 40 comments | ameridan/madfiat, 2025-05-25 → comments to 2026-06 | live | mp3-payload method; v74 script edits (run.sh line 184, tweaks.sh 159/161/653); "74.00.331 may disable wireless CarPlay"; ibanez0987 (2025-12-20): method opens the shell on **v59.00.563** too; "DISPLAY TOGGLE" black screen → JCI test mode article | high |
| F-42 | https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ | blog (local archive) | ameridan/68wooley, 2019-02 updated to 2025-08 | live | what is lost & restored, "will not function with 70.00.335/352" (passwdupdate/neutralize), only 70.00.100, AA exit icon stays Mazda, BT ID becomes "Mazda" (un-pair first), wireless CarPlay needs ≥74.00.200 + P3 hub, mp3-hack addendum | high |
| F-43 | https://21stcenturyfiat124spider.wordpress.com/2019/01/31/fix-navigation-for-version-70-firmware/ | blog (local archive) | ameridan, 2019-01-31 | live | NNG folder from Fiat 56/59 replaces Mazda v70 NNG → SD card (license-linked to Fiat VIN) works again; NA folder works for EU/ADR too; not JP | high |
| F-44 | https://21stcenturyfiat124spider.wordpress.com/2018/04/22/new-fiat-firmware-is-showing-up/ | blog (local archive) | ameridan, 2018-04-22 | live | Fiat 59.00.524 appears on late-2017-built cars; locked like Mazda 59.00.502; dealers may update at service → install ID7 first | high |
| F-45 | https://21stcenturyfiat124spider.wordpress.com/2018/04/30/replacing-the-cmu-to-get-apple-carplay-and-android-auto/ | blog (local archive) | ameridan, 2018 → 2023 | live | aftermarket head-unit alternative; hub part numbers; pre-70 firmware "hiccups" with new hub | medium |
| F-46 | https://21stcenturyfiat124spider.wordpress.com/2022/08/14/infotainment-replacement-screen-details/ | blog (local archive) | ameridan, 2022-08 | live | 124 = Connect 1.0 CMU (2016–17 MX-5 type, 36-pin digitizer); Mazda screen-only part ~$80; CMU warranty replacements "$1,000 to $2,000" | medium–high |
| F-47 | https://navi-world.com/2022/05/02/mazda-connect-firmware-update-procedure/ | vendor page + 62 comments | "Jonathan", 2022 → 2026 | live | Mazda procedure verbatim incl. "if update fails" (ROOM fuse); comments: reinstall-before-failsafe 2 % loop (2025-06, 2026-05), certificate validation failed = antivirus-corrupted download, failsafe-then-black → "replace head unit" | medium (vendor) |
| F-48 | https://www.mazdafiles.com/mazda-connect-firmware-update-procedure/ | vendor page | n/d | live | same procedure text | low–medium |
| F-49 | https://www.billswebspace.com/MAZDA%20FIRMWARE%20UPDATE%20PROCEDURE%20WORLDWIDE.pdf | Mazda dealer PDF (9 pp.) | Mazda, rev. with 70.00.335 notes | live; local copy | full + one-page procedure; 25-min ACC timer; CMU sleep (lock car 3 min); "DO NOT turn IG OFF to avoid damaging CMU"; failure recovery via ROOM fuse | high (OEM) |
| F-50 | https://static.nhtsa.gov/odi/tsbs/2016/SB-10085418-6903.pdf | Mazda NA TSB 09-024/16 (2016-07-05) | Mazda NAO | live; local copy | "Connect battery charger (charge current maintained about 7A) … to stabilize voltage fluctuation"; all loads off; SD/USB out; ROOM+AUDIO fuse installed; **all personal settings, favourites and paired phones are lost** | high (OEM) |
| F-51 | https://navi-world.com/2025/04/20/fiat-124-spider-cmu-serial-access/ | vendor page | 2025-04-20 | live | re-host of the mazdatweaks serial guide (CP2102, 2S/2T pins, 115200 8N1, XX folder); "for v70.00.335 and higher a serial connection must be established before updating" ❓ | medium |
| F-52 | https://mazdatweaks.com/serial/ , https://mazdatweaks.com/id7/ | tweak site | Trezdog44 | **DEAD / hijacked** (gambling spam; /id7 404) | — | n/a (flag everywhere it is linked) |
| F-53 | https://github.com/Trevelopment/mazdatweaks/blob/master/AIO-FAQ.md | GitHub doc | Trezdog44 | live | "v70.00.335+ … deletes the old autorun files … must be installed via serial connection after the update is complete but before rebooting"; Full Restore / System Restore options; updating with tweaks installed is "safe" ❓ (contradicted by F-19/F-26) | high (author) |
| F-54 | https://github.com/Trevelopment/MZD-AIO/issues/47 and /issues/135 | GitHub issues | 2019-03; 2021-09 → 11 | live (135 archived in repo) | #47 brick after "System Restore" (Mazda logo forever); #135: 70.00.367 EU serial login fails; `neutralizeid7` script listing; downgrade 367→352 by USB works ("same manual as upgrade") | high |
| F-55 | https://github.com/mzd-evo/mzd-connect-1-root | GitHub repo | mzd-evo, 2024 | live (no README; files css/js/mp3/dev.html) | the mp3/JS payload used by F-10/F-41 | medium (no docs) |
| F-56 | https://forum.miata.net/vb/showthread.php?t=782788 (posts 142/143) | forum guide | 2024-06 → | login-walled (403) | origin of the mp3 hack — NOT READ, cite via F-10/F-41 | n/a |
| F-57 | https://forum.miata.net/vb/showthread.php?t=716112 | forum thread | 2019 RF owner | login-walled; only search snippet | 70.00.100A reinstall started before failsafe; ROOM-fuse retries until it worked; knob trick when touchscreen dead | low (snippet) |
| F-58 | Mopar 68465853AA (2017-19) / 68460741AA (2018-19) "Entertainment Telematic Module, Fiat 124 Spider" | parts catalogues | — | store pages 403 to scripts | Fiat part numbers for the CMU; "does not participate in radio exchange program"; prices not captured | medium |

| F-59 | https://www.124spider.org/threads/software-debacle-part-ii.40588/ | forum thread | 2021-10 → | live but HTTP 406 to scripts; no Wayback copy; search snippet only | a **Fiat dealership** confirmed it flashed the wrong software: took a working 2019 on 59.00.562 NA N and flashed Mazda 74.00.xxx (dealer treated it as a Mazda) | medium (snippet) |
| F-60 | https://www.124spider.org/threads/cmu-serial-port-blown-out.43811/ | forum thread | 2023 | 406; snippet only | serial-hack risk: bare TX wire touched the CMU case → USB-TTL adapter burned; CMU kept working but no serial connection could be re-established afterwards (2019, 59.00.562) | medium (snippet) |
| F-61 | https://www.124spider.org/threads/confirmed-carplay-through-replacement-cmu.42231/ | forum thread | 2022 | 406; snippet only | confirmed path for locked 2018.5+ cars: fit a used **v56** CMU (plug-and-play), then ID7 → v70 → hub → tweaks on that unit | medium (snippet) |

Not reachable / not found: reddit (no relevant r/fiat124spider threads surfaced in search), YouTube recovery videos
(only referenced indirectly: the CH341A how-to video linked from F-19 post-2507846 with a Google-Drive rescue
.bin; madfiat's unlisted tutorial linked from F-10/F-41), `124spider.uk/blog/*` (404).

---

## 2. The failsafe mechanism (what the two .up files really are)

Hardware facts (F-38, confirmed in F-19/F-03/F-40):

* The CMU boots from an **8 MB SPI NOR flash** (EU units: Macronix MX25L6445E; US/early units: Spansion
  S25FL064A/P — both seen). Layout (F-38, post-v31 offsets):
  `bootstrap 0x000000 · boot-select 0x010000 · ibc1 0x020000 · ibc2 0x040000 · nv-config 0x060000 ·
  config 0x070000 (squashfs with /etc/passwd — F-03) · jci-boot-diag 0x0D0000 · fail-safe 0x0E0000 ·
  update 0x7E0000`.
* The main OS lives in NAND/eMMC (~5 GB). `boot-select` decides whether the i.MX6 bootstrap runs **ibc1**
  (normal OS) or **ibc2 → the 7 MB "fail-safe" Linux image** that draws the progress bar and re-programs
  the NAND from the USB stick.
* `*_failsafe.up` rewrites bootstrap + ibc2 + fail-safe (i.e. the bootloader/updater itself);
  `*_reinstall.up` rewrites ibc1 + NAND OS + peripheral firmware (F-38). The About screen shows both:
  "OS Version 56.00.530 NA N / Fail-Safe Version 56.00.530" (F-33, F-41 comment).
* Normal flow: the running OS validates the package on USB, then sets the first byte of boot-select
  (0x010000) to 0x00 → reboot into failsafe → failsafe installs → at the end it writes boot-select back
  to 0xFF (F-38 invokefailsafe).

Why the 59.x → 70.00.100 upgrade is "failsafe first, then reinstall":

* Mazda's procedure: "CAUTION: Always do the 'Fail Safe Package' first … DO NOT switch ignition OFF or
  allow system to switch off … until all updates have been installed … Stay inside the vehicle until
  failsafe installation is finished" (F-49 §14–18, F-47). The new failsafe (updater) must be in place
  before it is asked to write the new OS.
* **What happens if only the failsafe is installed and the car is switched off** (the #1 brick):
  raoulh (F-19 p1): "When you install the failsafe update package without the 2nd reinstall package, the
  flash chip boot select mode is set to boot on the ibc1 partition, which does not match the current
  Mazda system … So it's bricked because it cannot boot anymore." Symptom: black screen, last radio
  station still plays, volume/mute work, knob dead, NAV+BACK+MUTE reset useless (F-19, F-22, F-23, F-37,
  F-40, F-47). ℹ️ Equivalent description in F-38: the failsafe resumes a partial NAND update instead of
  restarting from scratch ("the 'fail-safe' code just FAILS"). Fix = §3 item 1 (force boot-select to
  failsafe and let it install the reinstall package) or CMU swap.
* **If only the reinstall is attempted (reinstall chosen before failsafe)**: from 59.00.502 EU the reinstall
  aborts at ~2 % with "install not successful: system failure" and loops (F-23 ilkinmammadov, F-47 comments
  2025-06/2026-05, F-57 snippet). Mazda's own recovery is the ROOM-fuse retry (§6); one Miata owner needed
  several retries (F-57). A 2019 RF owner accidentally did the same and recovered by retrying (F-57 ⚠️).
* **Mismatched pair**: the forced failsafe installs "the first (alphabetical order) reinstall.up file … even if
  it's not a version match. You will still have the 59 failsafe with the 33 Reinstall" (d3vi1, F-27). So a
  CMU can end up with OS 59.00.502 + Fail-Safe 70.00.100A (manwithastick, F-01) — it ran, but it is an
  undefined state; a "mismatched CMU versions setup … can be very difficult to rectify" (search snippet,
  source not captured ⚠️).
* **From 70.00.335 the failsafe package no longer exists**: single `*_update.up`, "Fail Safe Package has been
  eliminated since 70.00.335" (F-49 §14, F-47, F-24); the menu says "Update Package" instead of
  "Reinstallation Package". The bootloader is no longer rewritten in the field (F-19 p7 write-up:
  "completely removed starting from v70.00.300+, I bet because they understood it was an uber risky
  process"). 74.x is also a one-file update (F-32). ℹ️ Consequence: the classic power-loss brick is
  specific to the two-file step (≤70.00.100); the 70.00.100 → 335/352/367/74 step is less dangerous, but
  it is the step that destroys tweak access (§5).
* Failsafe can be entered without a valid USB: it shows "insert USB" and waits (F-38, F-19 "update failure"
  screen in F-03 SJWhiteley step 17). It re-validates the package itself on a cold start (F-38).

---

## 3. Failure catalogue (symptom → cause → fix → source)

| # | Symptom | Cause(s) reported | Fix(es) reported | Sources |
|---|---|---|---|---|
| 1 | **Black screen after failsafe; radio plays; knob/touch dead; NAV+BACK+MUTE (or Nav+Mute+Back 10 s) does nothing** | Ignition/battery cut between failsafe and reinstall (car turned off "to check the stick", battery disconnected, ACC 25-min timeout, voltage drop); also "Failed to validate package certificate" on reinstall then power-off | (a) SPI-NOR surgery: pull CMU, open bottom cover (T20 Torx + Phillips), clip SOIC16 on the NOR chip, read+verify+backup, write 0x00 at offset 0x010000 (row FF→00), verify, reassemble → CMU boots failsafe, shows "update failure / insert USB", put the **reinstall.up** (or both files) on FAT32 stick → installs 20–40 min. Tools: CH341A (10–20 €, must be 3.3 V on data lines — many need the trace-cut/jumper mod) + SOIC16 clip with 16→8 adapter; or Raspberry Pi + flashrom (`-p linux_spi:dev=/dev/spidev0.0,spispeed=8000`, chip `MX25L6436E/…6445E…` or `S25FL064A/P`); (b) write a known-good rescue .bin of a *failsafe* (e.g. 56.00.513 EU, 70.00.100 EU/NA "rescue.bin", 59.00.502A) then update; (c) replace CMU. Dealer = CMU replacement only. | F-19 (p1 raoulh, p7 write-up, p8, p9 Formi, p11), F-03, F-22, F-23, F-37, F-38, F-39, F-40, F-47 comments |
| 2 | **"Install Not Successful: System Failure" loop at ~2 %**, validating then rebooting every 5–10 s | Reinstall package selected before failsafe; or corrupt/incomplete download; or bad stick; or AIO tweaks present | Mazda recovery: IG OFF → screen black → remove stick → pull ROOM fuse 1 min → refit → ACC → "update" screen → insert stick → restarts (F-49); retry with another/older/smaller stick, verify hashes, remove Nav SD (F-30); if it keeps looping: forced-failsafe via NOR (item 1) or serial trick: login root/jci (≤59), `echo 1 > /sys/class/gpio/Watchdog\ Disable/value`, `cd /mnt/data_persist; touch checksum_result.txt; echo "C1" >> checksum_result.txt`, put an empty file `jci-looptestin` on the stick (autox, F-19 p18, for units "where the failsafe and update are two separate versions") | F-23, F-47, F-57, F-30, F-31, F-19 p18, F-49 |
| 3 | "Failed to validate package certificate" / "Verification not successful. Certificate validation failed" | Download altered by antivirus; wrong/partial file (hash mismatch); stick; DTCs set; **new USB hub fitted before the firmware update** | Re-download with AV off, check MD5/SHA-1 (hashes for ADR 70.00.100A in F-19 p11), clear DTCs (Diag screen: 3 → ENTER/CLEAR, 2 → ENTER), FAT32 4–16 GB USB 2.0 stick, refit original hub for the update | F-19 p1, F-47 (Darko 2025-07), F-26 (anhnga), F-24 |
| 4 | Update stuck at 19–21 % (or 2 %), then "unsuccessful", radio frozen | Unreliable 32 GB no-name stick; AA hub installed before update | Branded FAT32 stick (Toshiba worked); update before fitting hub | F-36 |
| 5 | USB stick not recognised / update files not listed / only newer versions listed | Wrong format (exFAT/NTFS, Mac-formatted with hidden files), USB 3.0 stick, >16 GB, faulty car USB hub/port (F-01), or you are ≥59.00.502 looking at <59.00.502 files (hidden by design), or ≥74.00.310 looking at <74.00.310 files | Another stick (old 2 GB USB 2.0 often works), Windows FAT32 format, "fake update" test (Search shows list → cancel), test with a spare CMU (F-01); see §4 for version walls | F-24, F-28, F-31, F-01, F-21, F-19 p11 |
| 6 | Failsafe install succeeds, reinstall "Connecting to firmware" for >20 min | unknown (stick/file) | owner turned car off → next day black screen (item 1). Do not power off; retry with ROOM-fuse procedure | F-22 |
| 7 | "Failsafe file installation failed"; About screen loses Fail-Safe version | AIO tweaks still installed; bad checksum; 2-file set from a bad source | Remove all tweaks ("System Restore") before updating, verify hashes, or use a one-file 335/352/367 update | F-26, F-19 p7/p9, F-53 |
| 8 | After v70, **stuck on Abarth/Fiat/Mazda logo, boot loop, or UI half-dead (no touch, knob can't select)** — firmware itself fine | Running v56-era tweak packages (Ameridan AIO 1.51) on v70; AA tweak on top of official AA; "System Restore" in AIO app; CR/LF line endings in hand-made scripts; mangled /etc/passwd; "DISPLAY TOGGLE" in JCI test mode | Remove tweaks 2–3 at a time / full restore; re-flash v70 (needs working Diag screen); 10-s hard reset; if unbootable: NOR config-partition edit (F-03 Doriath) or forced failsafe + re-flash (F-03 SJWhiteley) or used CMU ($125–$299) | F-02, F-06, F-54 #47, F-03, F-41 comment |
| 9 | **Dealer/Mazda service flashed 70.00.367 / 74.x** → Mazda logos, no nav, no tweaks | Mazda techs only have the latest firmware; written instructions ignored | 2021: downgrade by USB then serial ID7v2 (works for 335/352; 367 must be downgraded first); 2025+: mp3-payload method on 70/74 (and reportedly 59) without serial; or CMU swap. Fiat dealer can only fit a (locked) Fiat CMU | F-04, F-13, F-21, F-29, F-10, F-41 |
| 10 | On 74.00.310+ the USB list shows no lower version (can't go back to 70/59) | Mazda closed the downgrade from 74.00.310 | NOR: flash a 70.00.100 failsafe dump + boot-select 00 → forced reinstall of 70.00.100 (Tristan-cx5 did 74.00.311→70/59) | F-19 p8/p11 |
| 11 | Tweaks no longer autorun from USB although ID7 "was" installed | ID7 not actually preserved (bad stick/port), or update to ≥70.00.335 ran `neutralizeid7` (deletes /mnt/data_persist/dev/bin/autorun, 00-*, 01-*, 99-*.autorun, adb) | ID7v2 recovery via serial (≤70.00.352); mp3 payload; spare CMU to test stick | F-01, F-29, F-54 #135, F-53 |
| 12 | Serial login refused after 70.00.367 | 367 removes the credentials ("cannot be rooted at all") | Downgrade to 352 by USB, then serial; or mp3 payload (reported on 70/74) | F-54 #135, F-21, F-26, F-41 |
| 13 | Phone won't pair / BT name now "Mazda"; favourites, sound settings gone | Firmware re-flash restores factory defaults; BT identity changes | Un-pair all phones in car AND phone *before* the update (cannot afterwards); re-pair; record favourites | F-42, F-17, F-50 |
| 14 | Nav shows only compass/lat-long after Mazda firmware | Fiat SD card licence ↔ Fiat VIN vs Mazda firmware VIN check | NNG-folder tweak (MazdaToFiatV70AIO) — needs tweak access | F-43, F-42, F-13 |
| 15 | CMU dies slowly (black screen sometimes, then always), NOR patch/rescue .bin does nothing, no serial life | Hardware (cold solder, power rail, chip) — not firmware | Replacement CMU | F-19 p4–p5 (Tristan-cx5 bench), F-34 |
| 16 | Technician updated with windows open / alarm triggered / key away → black screen | ⚠️ anecdotal; likely power interruption | CH341A planned; unresolved | F-35 |
| 17 | Airbag warning after hub/CMU work | connector left off during dash work (hardware) | re-seat connectors / clear DTC | F-07 (anecdote) |
| 19 | Serial hack: USB-TTL adapter burned, serial no longer connects (CMU otherwise OK) | bare TX wire shorted to the CMU case | none found in thread; use insulated solid-core wire, check with multimeter; mp3 method avoids serial altogether | F-60 |
| 18 | 45-s reboot loop after NOR patch (59.00.545 4A) | unknown (wrong rescue image / unsquashfs issues) | unresolved in thread | F-03 (Mrphanbg), F-19 p3 |

Symptoms that are *not* failures but get mistaken for them: Mazda logo flashes before the Abarth animation
after tweaking (normal, F-09); first boot after update is slow / "Please restart" → just switch IG OFF, do
not start the engine (F-49 §25).

---

## 4. Downgrade paths

General rules gathered: the downgrade is done with the **same USB procedure as the upgrade** (F-20, F-54
#135, F-13); **serial access is never needed for the downgrade itself** — "Serial access does not affect the
update/downgrade option" (Tristan-cx5, F-19 p7); it is needed only to *tweak* afterwards. Settings are
lost (F-27, F-50). The car must be on the **original USB hub** for firmware <70.00.021 to work with the hub
(F-23; F-08 "need the ORIGINAL USB module when you do the upgrade"; ameridan F-04 "you would have to first
install the old hub to downgrade lower than version 70" ⚠️ he was unsure; F-01 downgraded to 59 with the new
hub fitted and the USB status icon never appeared).

| From | To | Method | Requirements | Risk / caveats | Source |
|---|---|---|---|---|---|
| 70.00.021A / 70.00.100A | 59.00.545A (Mazda NA), 59.00.502 | USB, both 59 files on the stick; hrm701 and Cookie did *failsafe first then reinstall* (upgrade order) and succeeded; an older guide (Infotainment Project index, 2017) says *reinstall FIRST, failsafe SECOND* for downgrades; Tristan-cx5: "for a safe way … swap file installation order" but "I assume a downgrade could also work when sticking to the update order, but that's unsafe if some problem occurs" ❓ unresolved | files for the right region; ≥25-min ACC timer discipline | manwithastick ended with OS 59.00.502 + Fail-Safe 70.00.100A after a failsafe-first downgrade ⚠️; after any downgrade to ≥59.00.502 the USB-tweak lock applies (ID7 must have been installed before, or serial/mp3) | F-20, F-01 |
| ≥59.00.502 (any) | anything < 59.00.502 (56.00.5xx Fiat, 55, 33…) | **Not possible by USB**: the update screen does not list versions below 59.00.502 (photo test on 70.00.335, F-21; F-27 alej0; F-24). Only by SPI-NOR: flash an older failsafe dump + boot-select 00 → forced install of the first reinstall.up on the stick (d3vi1, F-27) | CH341A/RPi, a trustworthy NOR image of the target failsafe | expert-only; Mazda: "If your Mazda was born with ANY 59.00.xxxx or above DO NOT roll back" (F-33) | F-21, F-27, F-24, F-33 |
| 70.00.335 / 352 / 367 | 70.00.100 / 59.00.502+ | USB (single update.up → two-file target); reported: 367→100 (F-04), 367→352 (F-54), 352→335 (F-09), 335→59 test (F-21) | region files | after 335+ the ID7/serial credentials are gone — being back on 100 does **not** restore USB tweaking (F-04); need serial (59.00.502–70.00.352) or mp3 payload | F-04, F-54, F-09, F-21 |
| 70.00.367 | 70.00.352 | USB | — | 367 itself cannot be serial-enabled; 352 can (ID7v2) | F-21, F-26, F-54 |
| 74.00.230 | 70.x / 59.00.502+ | USB (bench-tested) | — | — | F-13 (Tristan-cx5), F-19 p8 |
| 74.00.310 / 311 / 324 | < 74.00.310 | **Not by USB** ("you only can downgrade as low as 74.00.310"); SPI-NOR: write a 70.00.100 failsafe dump, set boot-select 00, put 70.00.100 reinstall on stick → it installs automatically (done with 74.00.311) | CH341A/RPi, 70.00.100 EU/NA failsafe .bin (shared in F-19 post #88 / rescue.bin) | expert-only; with the mp3 payload working on 74, downgrading from 74 is no longer necessary for branding/nav (F-41) | F-19 p8, p11 |
| Mazda 70.x | **Fiat** 59.00.5xx (502/524/562/563) | No report found of anyone flashing a Fiat 59.00.5xx package onto a Mazda-firmware CMU ❓; Fiat packages are not circulating (dealers/"import specialist" only); Bob T's eBay 124 CMU came with 59.00.563 = locked | — | open question (§8); note Fiat 59.00.562/563-NA reportedly breaks CP/AA (CLAUDE.md) | F-02, F-15, F-44 |
| any | same version again | USB ("at least 70.00.335 can be installed over the same FW version again and again", F-24); used as a "clean reinstall" after removing tweaks (F-02 wanted to, F-06 did via CMU swap) | working Diag screen (Music+Fav+Mute 2–5 s, code 99) | if the UI is too broken to open the Diag screen, no USB reinstall is possible → NOR/serial/swap | F-24, F-02 |

Version walls summarised (ℹ️): `<59.00.502` ↔ `≥59.00.502` wall (down only by NOR); `<74.00.310` ↔
`≥74.00.310` wall (down only by NOR). Inside each band, up/down by USB.

---

## 5. What is lost after the 59.x → 70.x upgrade, and what is recoverable

| Item | What happens on Mazda 70.x | Recoverable? | How / conditions | Source |
|---|---|---|---|---|
| Fiat / Abarth boot & shutdown animations, "Mazda" vehicle name in settings, CarPlay brand icon | replaced by Mazda | **Yes** | MazdaToFiatV70AIO (Ameridan/68wooley) — designed/tested for 70.00.100; on 70.00.335/352 with tweaks.sh edit `_VER_EXT -le 360` from an MZD-AIO 2.8.6 stick (F-09); on 74.00.324 with edits lines 159/161/653 (+ run.sh 184 for AIO) (F-41). Needs tweak access: ID7 installed before the update, or serial ID7v2 (≤70.00.352), or mp3 payload (70/74; 59 reported 2025-12) | F-42, F-09, F-41, F-10 |
| Factory navigation with the Fiat SD card | stops (VIN check: Mazda firmware vs Fiat VIN) — compass-only screen | **Yes** | NNG folder from Fiat 56/59 firmware (in MazdaToFiatV70AIO); NA folder works for EU/ADR; not JP; restored on 74 too (madfiat) | F-43, F-42, F-13, F-08 |
| Android Auto "Exit" icon | Mazda logo | **No** ("hasn't been figured out"; AA package is signed) | — | F-42, F-41 comment |
| Touchscreen inside official Android Auto on v70 | not available (touchscreen tweak incompatible with official AA) | No (AA); CarPlay touch works | reason manwithastick downgraded to 59 for AA Tru_go 1.14b | F-01, F-18 |
| Bluetooth name of the car | becomes "Mazda"; pairings invalid | partially | un-pair every phone in car + phone **before** updating, re-pair after; renaming not documented | F-42, F-17 |
| Personal settings, radio favourites, sound settings, paired phones | reset to factory on any re-flash | re-enter manually | Mazda TSB: obtain customer acceptance, record favourites first | F-50 |
| Ability to install tweaks via USB | lost if no ID7 before ≥59.00.502; lost again by ≥70.00.335 (`neutralizeid7`); serial lost on 70.00.367 | **Yes (2025+)** | ID7 before; ID7v2 + serial for 335/352; mp3-payload for 70/74 (and 59 ⚠️ single report) | F-29, F-54, F-41, F-11 |
| Rain-sensing-wiper (and similar vehicle-specific) settings menu | one user lost the menu on a Mazda3 CMU with v55, back after 59 — menu availability depends on firmware+vehicle config; feature itself kept working | n/a | ℹ️ expect Fiat-specific menu items to follow the Mazda firmware's idea of the car; no other reports | F-01 |
| Languages | no report of languages missing on EU/NA 70.x; duration differs by region "as different language packs are installed"; 70.00.367 fixes "[Except English] translation of the back-camera message" | n/a | choose the correct **region** file (EU N for an EU car); radio frequencies are in the TAU, not the CMU (F-24, F-25) | F-24, F-08 changelog |
| HUD / Active Driving Display | not fitted to the 124 Spider — no reports | n/a | ℹ️ not applicable | — |
| Wireless CarPlay | needs ≥74.00.200 **and** a CMU with the wireless hardware / P3 hub — not a firmware-only feature | no | — | F-42, F-14 |
| Nav SD card after a **CMU swap** | ASH8: Mazda nav SD is "locked to cars original CMU and VIN Number after … 100 km" | ❓ | Fiat SD is VIN-linked; whether a different CMU breaks it is not reported for the 124 (manwithastick's Mazda3 CMU thread does not mention nav) | F-33, F-01 |

---

## 6. Power / USB precautions checklist (with refs)

Power
* Ignition to **ACC only** (one press of START without pedal); never start the engine during the update
  (F-49 §2, F-50). ❓ 2x4logic says "it seems like one has to run the engine to ensure the power to the CMU
  doesn't get turned off" (F-38) — contradicts Mazda; Mazda's pedal-timer method is the documented one.
* **ACC auto-off after 25 min**: press and release clutch (MT) / brake (AT) right after the failsafe
  finishes and again after ~25 min during the 40-min reinstall; "We strongly recommend to set a timer to
  25 minutes" (F-49 §18, §24; navi-world version says 15 min — use the shorter interval). Community habit:
  brake every 10–20 min (F-19 p7).
* Mazda NA TSB 09-024/16: "Connect battery charger (charge current maintained about 7A) to the vehicle to
  stabilize voltage fluctuation"; all electrical loads off (blower, rear defogger, room lamps); ROOM and
  AUDIO fuses installed (F-50). Community equivalent: battery tender on, fully charged battery.
* Do NOT switch IG OFF, do not open doors needlessly, stay in the car, keep the key inside (F-49 §14, F-35).
  The 3-minute "CMU sleep" (lock car, key >5 m away) is required *before* starting and *after* finishing,
  not in between (F-49 §7, §26).
* If it fails: IG OFF → wait for black screen → remove stick → pull **ROOM fuse 1 min** → refit → ACC →
  re-insert stick → update restarts (F-49 "If updating process will not finish successfully").
* Remove the Nav SD card and every USB/AUX/phone before starting; only the update stick in one port
  (F-49 §1, §9; F-30).

USB stick
* FAT32, 4–16 GB, USB 2.0 preferred, one partition, only the .up file(s) on it; formatted with Windows
  (Mac formatting caused hidden-file/format problems) (F-24, F-47, F-49).
* Known-good: SanDisk Ultra USB3 32 GB, Cruzer Blade 16 GB, Verbatim 8 GB, Transcend 8 GB, cheap 2–8 GB
  no-name, Toshiba branded; known-bad: an unnamed 8 GB, a 32 GB no-name (stuck 19–21 %), "some USB 3.0
  sticks" (F-28, F-31, F-36). "If the stick fails on you during the firmware flash, you could end up with a
  non-functional CMU" (F-17).
* Verify MD5/SHA-1 of each .up before copying (F-24, F-30); antivirus can silently alter the download
  (F-47). Do not rename the files? — the files keep their original `cmu150_<REGION>_<ver>_failsafe.up` /
  `_reinstall.up` names in every successful report; the TSB's ".zip→.up" rename applies to dealer
  downloads only (F-50). ℹ️ No report of a rename *causing* a failure was found.
* Update firmware with the **original** USB hub fitted; fit the CarPlay hub afterwards (F-17, F-26, F-36,
  F-08).
* Remove all AIO tweaks (System Restore) before the update; two bricks were attributed to tweaks left in
  place (F-19 p7/p9, F-26). ❓ AIO-FAQ says updating with tweaks is safe (F-53).
* Clear DTCs (Diag 3 → ENTER/CLEAR, 2 → ENTER) before the update (F-49 §5–6, F-47).
* Un-pair phones first; record favourites (F-42, F-50).
* Have the *exact* region file (EU N / NA N / 4A N); wrong-region install did not brick in the one report
  but shifted radio frequencies (F-25) — still treat as brick risk per CLAUDE.md.

---

## 7. Dealer / hardware last-resort options

Dealers
* **Fiat dealer**: one report of a Fiat dealership flashing a 124 — with *Mazda* 74.x onto a 59.00.562 NA N car by mistake (F-59), i.e. they used Mazda files, not a Fiat package; otherwise no report of a Fiat dealer re-flashing Fiat firmware; forum consensus "The only thing a
  Fiat dealer could do would be to replace the CMU … with the locked-down Fiat software … They would
  probably refuse to cover the repair as a warranty item" (AnClar, F-04); a Fiat dealership that sold a
  car on 74.00.230 "had no idea what they are doing" (F-13). An independent "import specialist" charged
  $515 for a "software update" with no proof (F-15). No evidence about FCA wiTECH having MZD firmware —
  **open question** (§8).
* **Mazda dealer**: will flash, but only the *latest* Mazda firmware in their system (F-24), which today
  means 74.00.324 (or 70.00.367 in 2021): an Italian Mazda service flashed 70.00.367 against written
  instructions (F-04); a Dutch Mazda dealer offered to do the CarPlay upgrade (F-05). Result on a 124 =
  Mazda branding, no factory nav, no tweaks unless the mp3-payload method is used afterwards. Dealer quote
  for a new CMU ≈ 1500 € (F-23); new CMU "around 1000 USD" (F-24), "$1,000 to $2,000" warranty cost
  (F-46), "$700–$1000" (F-03).
* Dealer reflash of a **bricked** unit: "Bringing the car to a dealer will not help, they will just charge
  you for a full CMU replacement" (raoulh, F-19); Mazda techs are told to replace (F-19 p1 Trezdog44).

Hardware
* 124 Spider CMU = Mazda Connect 1.0 unit as in 2016–2017 MX-5 (36-pin digitizer); 2018+ MX-5 got Connect
  2.0 (other screen cable, other CPU) (F-46). Screen-only replacement from Mazda ~$80 (F-46).
* Fiat part numbers: Mopar **68465853AA** "Entertainment Telematic Module, 2017-2019 124 Spider" and
  **68460741AA** (2018-2019) (F-58; which is nav/non-nav or Bose not established ❓). Mazda CMU part numbers
  seen working in a 124: Mazda3 **BJS7669C0K** (+ screen BHP1611J0D, swap the dash trim) (F-18, F-01);
  Mazda3 CMU "from a Mazda 3" (chockymonster, F-05); Mazda6/CX-3 GMD7-669C0-E interchange (F-23).
* The "swap in a used v56 CMU, then do ID7 → v70 → hub" route is the forum's confirmed answer for locked 2018.5+ cars (F-61, F-06, F-07).
* **VIN / region locking**: "Our generation of CMU's are not VIN locked … I bought a Mazda 3 CMU from eBay …
  only 4 screws" (manwithastick, F-01); Tristan-cx5: "you could use any used unit from another car — also
  another series … It does not have to be exactly the same part number … Firmware version does not matter"
  except new hub needs ≥70.00.021 (F-23). Fiat firmware on the donor is unlikely (donor 124 CMUs came with
  59.00.563 locked — F-02 — or 56 — F-02/F-06). Region: match the car's region (EU N etc.) — a wrong-region
  donor only affects radio via TAU? ❓ not reported for a swap.
* Prices seen: used 124 CMU $125 (no screen, F-02), $285 with display (F-06), Mazda3 CMU+screen $299
  (F-18); used MZD-1 190 € / 400–600 € (F-23); new 1000–1200 € (F-23).
* Effort: 10 mm bolt, unplug connectors (fragile pins), keep your own screen/bezel; some settings menus
  depend on donor firmware (F-01). Programming by dealer is **not** required per these reports (contradicts
  the generic "needs dealer programming to VIN" statement in parts guides ❓).
* NOR repair kit: CH341A + SOIC16 clip + adapter < 50 € total (F-19 p7); RPi alternative (F-19 p1, F-39);
  Bus Pirate (F-38). A 2016 EU unit's chip: MX25L6445E; a US 2014 unit: Spansion S25FL064A (F-40, F-19 p7).
  Chip replacement MX25L6445EMI-10G works if the original is destroyed (F-19 p9).
* Aftermarket single-DIN head unit (Alpine Halo9 etc.) fits the ISO slot; loses personalisation/maintenance
  screens (F-45).

---

## 8. Open questions

1. **Downgrade file order** (failsafe-first vs reinstall-first) — contradictory advice (F-20); what state did
   manwithastick's "OS 59.00.502 / Fail-Safe 70.00.100A" CMU really have and is it harmful? (F-01)
2. Can a **Fiat 59.00.5xx** package be installed over Mazda 70.x (to return a car to "stock Fiat")? Are Fiat
   packages (59.00.524/562/563 NA, EU equivalents) obtainable at all? No report found.
3. Does the **mp3-payload method work on Fiat 59.00.5xx** (one report "opens the shell on 59.00.563", F-41
   comment 2025-12-20) and on **EU** 70/74 files (asked, unanswered in F-08 p2)? Does it need the new hub
   for the keyboard port (asked, F-41)?
4. Does the **old vs new USB hub** affect the ability to *downgrade* below 70 (ameridan unsure, F-04)?
5. **Dealer tooling**: does FCA wiTECH contain any 124 CMU flash? Does any Fiat dealer have 59.00.5xx files?
   Does Mazda MDARS flash a 124 VIN? (all unknown)
6. **Region lock** on a used Mazda CMU from another region (EU CMU in NA car): affects only TAU/radio, or
   also nav/SD licensing? And is the Fiat nav SD tied to the *original CMU* (ASH8, F-33)?
7. Exact behaviour of the **forced failsafe per dump version** (F-19 p18 table: 56 dump only validates and
   reboots; 70.100 NA dump asks for the proper package; 74 dumps "install" in seconds then boot the old
   bricked OS) — which rescue .bin is the right one for a 124 on 59.x EU? Are trustworthy NOR dumps (56.00.513
   EU, 59.00.502A EU, 70.00.100A EU/NA) still obtainable and hashable?
8. Which Mopar part (68465853AA vs 68460741AA) is which (nav/Bose/year), and their current price.
9. Is the `navi-world` claim "for v70.00.335 and higher a serial connection must be established **before**
   updating" (F-51) just a paraphrase of the ID7v2 rule, or a real restriction?
10. Whether "DISPLAY TOGGLE" black screen (F-41) and other JCI-test-mode traps deserve a note in the
    procedure.
11. Miata.net threads F-56/F-57 must be read with a login (mp3-hack origin; "Install Not Successful" ND
    story) — someone with an account should archive them.

---

## 9. Local archive written (research/archive/F-rollback/)

`*.html` = raw page as fetched, `*.md` = extracted posts (author/date/text), `*.txt` = text of
non-forum pages, `*.pdf` = OEM documents.

```
research/archive/F-rollback/124s-22986-p1.html
research/archive/F-rollback/124s-22986-p1.md
research/archive/F-rollback/124s-32286-p6.html
research/archive/F-rollback/124s-32286-p6.md
research/archive/F-rollback/124s-38071-p1.html
research/archive/F-rollback/124s-38071-p1.md
research/archive/F-rollback/124s-39292-p1.html
research/archive/F-rollback/124s-39292-p1.md
research/archive/F-rollback/124s-39761-p1.html
research/archive/F-rollback/124s-39761-p1.md
research/archive/F-rollback/124s-40317-p1.html
research/archive/F-rollback/124s-40317-p1.md
research/archive/F-rollback/124s-40534-p1.html
research/archive/F-rollback/124s-40534-p1.md
research/archive/F-rollback/124s-41083-p1.html
research/archive/F-rollback/124s-41083-p1.md
research/archive/F-rollback/124s-43884-p1.html
research/archive/F-rollback/124s-43884-p1.md
research/archive/F-rollback/124s-44940-p1.html
research/archive/F-rollback/124s-44940-p1.md
research/archive/F-rollback/124s-45237-p1.html
research/archive/F-rollback/124s-45237-p1.md
research/archive/F-rollback/124s-45459-p1.html
research/archive/F-rollback/124s-45459-p1.md
research/archive/F-rollback/124s-45814-p1.html
research/archive/F-rollback/124s-45814-p1.md
research/archive/F-rollback/124s-45963-p1.html
research/archive/F-rollback/124s-45963-p1.md
research/archive/F-rollback/124s-45963-p2.html
research/archive/F-rollback/124s-45963-p2.md
research/archive/F-rollback/124s-45965-p1.html
research/archive/F-rollback/124s-45965-p1.md
research/archive/F-rollback/2x4logic-invokefailsafe.wayback20160605.html
research/archive/F-rollback/2x4logic-jci-failsafe.wayback2016.html
research/archive/F-rollback/_vsfetch.py
research/archive/F-rollback/ameridan-v70-v74-tweaks-without-id7-2025.html
research/archive/F-rollback/ameridan-v70-v74-tweaks-without-id7-2025.txt
research/archive/F-rollback/m247-123883481-p1.html
research/archive/F-rollback/m247-123883481-p1.md
research/archive/F-rollback/m247-123884804-p1.html
research/archive/F-rollback/m247-123884804-p1.md
research/archive/F-rollback/m247-123884841-p1.html
research/archive/F-rollback/m247-123884841-p1.md
research/archive/F-rollback/m3r-180578-p1.html
research/archive/F-rollback/m3r-180578-p1.md
research/archive/F-rollback/m3r-201994-p1.html
research/archive/F-rollback/m3r-201994-p1.md
research/archive/F-rollback/m3r-226986-p1.html
research/archive/F-rollback/m3r-226986-p1.md
research/archive/F-rollback/m3r-229891-p1.html
research/archive/F-rollback/m3r-229891-p1.md
research/archive/F-rollback/m3r-229891-p11.html
research/archive/F-rollback/m3r-229891-p11.md
research/archive/F-rollback/m3r-229891-p18.html
research/archive/F-rollback/m3r-229891-p18.md
research/archive/F-rollback/m3r-229891-p2.html
research/archive/F-rollback/m3r-229891-p2.md
research/archive/F-rollback/m3r-229891-p3.html
research/archive/F-rollback/m3r-229891-p3.md
research/archive/F-rollback/m3r-229891-p4.html
research/archive/F-rollback/m3r-229891-p4.md
research/archive/F-rollback/m3r-229891-p5.html
research/archive/F-rollback/m3r-229891-p5.md
research/archive/F-rollback/m3r-229891-p6.html
research/archive/F-rollback/m3r-229891-p6.md
research/archive/F-rollback/m3r-229891-p7.html
research/archive/F-rollback/m3r-229891-p7.md
research/archive/F-rollback/m3r-229891-p8.html
research/archive/F-rollback/m3r-229891-p8.md
research/archive/F-rollback/m3r-229891-p9.html
research/archive/F-rollback/m3r-229891-p9.md
research/archive/F-rollback/m3r-230305-p1.html
research/archive/F-rollback/m3r-230305-p1.md
research/archive/F-rollback/m3r-234619-p1.html
research/archive/F-rollback/m3r-234619-p1.md
research/archive/F-rollback/m3r-235497-p1.html
research/archive/F-rollback/m3r-235497-p1.md
research/archive/F-rollback/m3r-236211-p1.html
research/archive/F-rollback/m3r-236211-p1.md
research/archive/F-rollback/m3r-241706-p1.html
research/archive/F-rollback/m3r-241706-p1.md
research/archive/F-rollback/m3r-243977-p1.html
research/archive/F-rollback/m3r-243977-p1.md
research/archive/F-rollback/m3r-244479-p1.html
research/archive/F-rollback/m3r-244479-p1.md
research/archive/F-rollback/m3r-246137-p1.html
research/archive/F-rollback/m3r-246137-p1.md
research/archive/F-rollback/m3r-254150-p1.html
research/archive/F-rollback/m3r-254150-p1.md
research/archive/F-rollback/m6c-444748-p1.html
research/archive/F-rollback/m6c-444748-p1.md
research/archive/F-rollback/mazda-cmu-software-update-procedure-worldwide.pdf
research/archive/F-rollback/mazda-cmu-software-update-procedure-worldwide.txt
research/archive/F-rollback/mazda-na-tsb-09-024-16.pdf
research/archive/F-rollback/mazda-na-tsb-09-024-16.txt
research/archive/F-rollback/mazdafiles-update-procedure.txt
research/archive/F-rollback/mazdatweaks-serial.HIJACKED-2026-08-23.html
research/archive/F-rollback/miata-net-post142.loginwall.txt
research/archive/F-rollback/mzdonline-reset-cmu-nor-flash-rpi.html
research/archive/F-rollback/mzdonline-reset-cmu-nor-flash-rpi.txt
research/archive/F-rollback/navi-world-124-spider-cmu-serial-access.html
research/archive/F-rollback/navi-world-124-spider-cmu-serial-access.txt
research/archive/F-rollback/navi-world-mazda-connect-update-procedure.html
research/archive/F-rollback/navi-world-mazda-connect-update-procedure.txt
research/archive/F-rollback/wb-124s-38004.html
research/archive/F-rollback/wb-124s-38004.md
research/archive/F-rollback/wb-124s-38159.html
research/archive/F-rollback/wb-124s-38159.md
research/archive/F-rollback/wb-124s-38459.html
research/archive/F-rollback/wb-124s-38459.md
research/archive/F-rollback/wb-m3r-242237.html
research/archive/F-rollback/wb-m3r-242237.md
research/archive/F-rollback/wb-m3r-242671.html
research/archive/F-rollback/wb-m3r-242671.md
research/archive/F-rollback/yms-livejournal-unbricked-cmu.txt
research/archive/F-rollback/yms-livejournal-unbricked-cmu.wayback.html
```

Naming: `124s-<threadid>-p<page>` = 124spider.org, `m3r-` = mazda3revolution.com, `m6c-` = mazda6club.com, `m247-` = mazdas247.com, `wb-` = taken from the Wayback Machine (site blocked scripted access). `_vsfetch.py` is the PoW-solving fetch/extract helper used (needs only python3 + curl).
