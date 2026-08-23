# C2 — Firmware version × USB tweak installer (MZD-AIO / ID7) compatibility matrix

Research theme C2: for a Fiat/Abarth 124 Spider owner upgrading the CMU to Mazda 70.x (CarPlay/AA),
which firmware versions still let the open-source **MZD-AIO** USB tweak installer run (needed afterwards
for `MazdaToFiatV70AIO` = Fiat/Abarth boot logo + factory navigation restore), and **what must be
prepared before upgrading**.

Compiled 2026-08-23 from local archives (`research/archive/`), Wayback Machine copies fetched today
(curl, saved as `research/archive/wb-*.html`), GitHub API/raw and 5 web searches. Source ids below are
local to this file (`[C2-nn]`); map them to `SOURCES.md` ids when merging.
Live `mazda3revolution.com` and `124spider.org` are now behind a Tollbit paywall (HTTP 307 →
`tollbit.*` → 402) for automated fetchers; every forum page cited was read from a local archive or a
Wayback capture (timestamp given).

> **Bottom line up front (2026-08-23):**
> 1. USB autorun of tweaks was removed by Mazda in **59.00.502** (June 2017). Fiat's own 59.00.5xx builds
>    (524/562/563…) inherit this: **no Fiat 59.x can run the USB installer out of the box** [C2-05][C2-07].
> 2. **ID7 ("autorun") v1** is a tiny recovery package installed *while still on 56.x* via the normal USB
>    method; it survives updates and keeps USB tweak installs working on 59.00.502 … **70.00.100** [C2-01][C2-13].
> 3. **70.00.335 / 70.00.352** contain `neutralizeid7` (+ forced `passwdupdate`): they wipe ID7 (v1 *and*
>    the pre-installed "v2") and the old serial credentials. The only ID7 path on 335/352 is **"ID7 Recovery
>    v2" = serial console connected *during* the firmware install + XX folder, commands pasted before the
>    first reboot** (and again after *every* later update/downgrade) [C2-14][C2-16][C2-20].
> 4. **70.00.367** cannot be serial-enabled at all; documented escape = downgrade to 352 (or 335) with the
>    ID7v2-during-install procedure [C2-18][C2-21][C2-22]. Downgrade floor for 70.x is **59.00.502**; for
>    74.x it is **74.00.311/.310** [C2-24].
> 5. Since late 2024 the **"mp3 hack"** (`mzd-evo/mzd-connect-1-root`: fake MP3 files open the JCI diag
>    screen → on-screen terminal + USB keyboard) runs `tweaks.sh`/`run.sh` on "locked" firmware **without
>    ID7 and without serial**. Confirmed by 124 owners on 70.00.100 and 74.00.324; single reports on
>    59.00.563 and 70.00.367 (⚠️ thin evidence) [C2-27][C2-28][C2-29].
> 6. Community-recommended target for a 124 Spider remains **70.00.100** (region-matched) — the last v70
>    build where ID7 v1 still works and where `MazdaToFiatV70AIO` installs unmodified [C2-12][C2-30].

---

## 1. Sources

| id | Source (author, date) | Location | Link status (2026-08-23) | What it gives |
|---|---|---|---|---|
| C2-01 | Ameridan, *Preserve your ability to Tweak in future firmware versions* (2017-08-29) | https://21stcenturyfiat124spider.wordpress.com/2017/08/29/preserve-your-ability-to-tweak-in-future-firmware-versions/ — local `archive/ameridan-preserve-tweak-id7.html` | 200 | Why 59.00.502 locked USB; ID7 v1 = "autorun + recovery scripts", install on 56.00.521/530; step-by-step; download link |
| C2-02 | Ameridan, *Common tweaks… 7.0* page, section "Preserve your ability to Tweak" (#backdoor, added 2017-08-29, updated to 2021) | https://21stcenturyfiat124spider.wordpress.com/ameridans-radio-silencer/common-tweaks-that-work-in-the-fiat-124-spider-infotainment-center-7-0/#backdoor — local `archive/ameridan/common-tweaks-that-work-…7-0.html` | 200 | Same + "59.00.524 also prevents tweaks" (2018-04-22), "Sept-2018 feedback: with ID7 tweaks install via normal USB method", "59.00.524 and 59.00.562/563 … unless ID7 already installed, no USB tweaks" |
| C2-03 | Ameridan, *New Fiat firmware is showing up* (2018-04-22) | https://21stcenturyfiat124spider.wordpress.com/2018/04/22/new-fiat-firmware-is-showing-up/ — local `archive/ameridan-new-fiat-firmware-59.html`; chart `archive/ameridan-firmware-versions-contd4.png`; TSB excerpt `archive/ameridan-tsb-na-59.00.502.png` | 200 | 2018 Abarth (US, built Nov-2017) delivered with **59.00.524** ≙ Mazda 59.00.502 lock-down; chart of locked versions (59.00.502…70.00.110), 124-only builds 59.00.524 and 59.00.562 (EU/NA/ADR) |
| C2-04 | Ameridan, *Preserve … Version 2.0* (2019-05-20, +comments to 2022) | https://21stcenturyfiat124spider.wordpress.com/2019/05/20/preserve-your-ability-to-tweak-in-future-firmware-versions-version-2-0/ — local `archive/ameridan-preserve-tweak-v2-id7v2.html` | 200 | Trezdog44's announcement of `neutralizeid7` in 70.00.335-C NA and the "ID7 v2" idea; "stay away from .335"; comments: .345(sic)/.335 installed before tweaks → stuck with Mazda splash |
| C2-05 | Ameridan (compiling madfiat), *V70 & V74 Tweaks without ID7 – No Serial Connection Needed? YES YOU CAN!* (2025-05-25, comments to 2026-06) | https://21stcenturyfiat124spider.wordpress.com/2025/05/25/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/ — local `archive/ameridan-v70-tweaks-without-id7-mp3-hack.html` | 200 | mp3-hack procedure; v74 script edits; 74.00.331 warning; comments: 59.00.563 + mp3 works (ibanez0987 2025-12-20); "all my posts saying newer FW not tweakable pre-date the mp3 hack" (Ameridan 2025-08-03) |
| C2-06 | Ameridan, *Universal Version 70 Fiat AIO Tweak* (2019-02-18, updated to 2025-08, comments to 2026-04) | https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ — local `archive/ameridan-universal-v70-fiat-aio.html` (+ `-comments-p1.html`) | 200 | "will not function with 70.00.335/352 (neutralizeid7, passwdupdate…)"; "only use 70.00.100"; embedded 68wooley guide (ID7 before v70; on 59 → serial); comment 2026-04-12: 70.00.367 + tweaks via .mp3 |
| C2-07 | mazdatweaks.com home (Trevelopment) | https://mazdatweaks.com/ — local `archive/mazdatweaks-home.html` | 200 | "ALL FW V55, V56, V58, V59 & V70 ARE SUPPORTED — v59.00.502+ requires serial connection — v70.00.335+ requires a slightly different approach (id7)"; changelog v2.6.x "Autorun scripts… ID7_Recovery Pack" |
| C2-08 | mazdatweaks.com/serial (Albuyeh's serial instructions) | https://mazdatweaks.com/serial/ — Wayback 2018-04-14 local `archive/mazdatweaks-serial-wayback.html` | 200 live; 2018 copy local | Serial (CP2102, TX/RX/GND, 115200) procedure for **59.00.502+ up to 70.00.100**: login user/jci, copy XX to `/mnt/data_persist/dev/bin`, chmod autorun. Only noted here, not detailed |
| C2-09 | mazdatweaks.com/id7 "ID7 Recovery v2" | Wayback 2019-07-17 `archive/wb-mazdatweaks-id7-20190717.html`; Wayback 2025-01-18 `archive/mazdatweaks-id7-wayback.html`; source `archive/github-mazdatweaks-id7.md` (raw from github.com/Trevelopment/mazdatweaks, commits 2019-05-22/05-28/06-10, 2024-01-05) | **live 404 since 2025-08** (CDX: 200 2019-07-17 … 2025-01-18; 404 from 2025-08-15); GitHub source 200 | "UPDATING TO V70.00.335+ REQUIRES A SERIAL CONNECTION DURING THE UPDATE"; needs update.up + ID7_Recovery_XX; paste `cp -r /mnt/sd*/XX/* /mnt/data_persist/dev/bin/; chmod +x …/autorun; …/autorun` after update before reboot |
| C2-10 | mazda3revolution "AIO Tweaks and Firmware Ver .502 – READ THIS" (arathol 2017-06-05; Trezdog44/id7 posts 2017-06-29…07-05) | https://www.mazda3revolution.com/threads/aio-tweaks-and-firmware-ver-502-read-this.200450/ — Wayback 2019-12-16 p1 `archive/wb-m3r-aio-tweaks-fw-502-200450-p1.html`; p19 (2018 posts, Wayback 2022-06-30); p66 (2020-06, Wayback 2026-01-23); p75 (2021-05, Wayback 2021-05-15); p77 (2021-05/06, Wayback 2026-01-13); p80 (2021-11…2022-02, Wayback 2026-01-19) | live paywalled; Wayback OK | Origin of ID7: id7's analysis ("*.up no longer execute external files… SO usb storage now not have autorun"), autorun.v2/v3 zips, serial recovery; later: Tristan-cx5 summaries of what works on which FW |
| C2-11 | mazda3revolution "ID7 Recovery v2" (Trezdog44 2019-05-20) | https://www.mazda3revolution.com/threads/id7-recovery-v2.234619/ — Wayback p1 (2019-12-07), p2–p4 (2020), p11 (2026-01-07), p17 (2021-05-14), p20 (2026-01-10) → `archive/wb-m3r-id7-recovery-v2-234619-p*.html` | live paywalled; Wayback OK | Pre-installed v2 **failed** on 335 (anderml1955 2019-05-22); final method 2019-06-10 = serial during update; ID7v2 must be redone after every update; 352 works; 367 does not; XX link dead by 2021 |
| C2-12 | 124spider.org "MazdaToFiat70AIO and CMU firmware 70.00.335C or 70.00.352B – SUCCESS" (124geek 2020-09-16) | https://www.124spider.org/threads/…-success.38004/ — local `archive/124spider-aio-335c-352b-success-38004.html` | local | 124 owner on 335/352 with ID7v2 (XX, serial): MazdaToFiatV70AIO refuses (version check) → workaround (AIO 2.8.6 USB + MazdaToFiat config/tweaks.sh, `_VER_EXT -le 360`); 68wooley: 367 unusable, will add ID7 V2 to guide |
| C2-13 | 68wooley, *CarPlay How To – Part 1 – Firmware Update v3.0* (PDF in Ameridan's MediaFire) | local `archive/mediafire/124Spider_CP_AA_Upgrade_Guide/CarPlay How To - Part 1 - Firmware Update v3.0.pdf` | local (MediaFire 200) | Official 124 community sequence: download FW + ID7 (`autorun_copy_to_usb.zip`) + MazdaToFiatV70AIO → install ID7 on 56 via USB ("if on 59 follow mazdatweaks.com/serial") → install 70.00.100 → MazdaToFiat |
| C2-14 | Trevelopment/MZD-AIO issue #135 "Serial solution doesn't work for 70.00.367 EU" (2021-09 → 2024-07) | https://github.com/Trevelopment/MZD-AIO/issues/135 — local `archive/mzd-aio-issue-135-comments.md` | 200 | `neutralizeid7` script text; 70.x `passwdupdate` always; 367 = no login; updates signed; downgrade 367→352 + XX via serial works (Nav1gatore 2021-12) |
| C2-15 | 124spider.org "Mazda Cracked Down/Removed Firmware Downloads" (AnClar, 2021) p1–p2 | local `archive/124spider-mazda-crackdown-40247-p1/p2.html` | local | Files removed 2021; "70.00.100 in your region" recommended; AnClar on 70.00.100A NA 3 years trouble-free; Fiat will never release AA FW |
| C2-16 | mazda3revolution "MZD I connect firmware info/hints" (Tristan-cx5 2019-08-29 → 2025) | https://www.mazda3revolution.com/threads/mzd-i-connect-firmware-info-hints.236211/ — local `archive/wb-m3r-mzd-i-connect-firmware-info-hints-236211.html` | live paywalled; local Wayback | "downgrade possible from 70 down to 59.00.502; from 59.00.502 USB tweaks not possible (workarounds)"; 335+ single update file; 2-step update via 70.00.100 if <56.00.100 |
| C2-17 | mazda3revolution "MZD-AIO tweak on FW 74+" (aeromiata 2024-11-14 → 2025-03) | https://www.mazda3revolution.com/threads/mzd-aio-tweak-on-fw-74.252435/ — local `archive/wb-m3r-aio-tweak-on-fw74-252435.html` | live paywalled; local Wayback | mp3-hack on 74.00.324A EU; `run.sh` "-eq 70"→"-eq 74"; 74.00.331 wireless-CarPlay warning; Tristan-cx5: downgrade stops 59.00.502 / 74.00.311(.310); "ID7, ID7v2 or mp3 method" |
| C2-18 | mazda3revolution "AIO tweaks in 59 and 70 version" (2020-04 → 2020-08) | Wayback 2020-08-06 `archive/wb-m3r-aio-tweaks-in-59-and-70-240484.html` | Wayback OK | Tristan-cx5: serial for 59.00.504/70.00.100; ID7v2 for .335/.352; "do not update to .367 NA, ID7v2 does not work" |
| C2-19 | 124spider.org "V70 Tweaks without ID7 – No Serial Connection Needed? YES YOU CAN!" (madfiat 2025-05-25) | local `archive/124spider-v70-tweaks-without-id7-45965.html` | local | Original mp3-hack write-up; order of operations; firstshadow: "v59 → v70 then mp3 bypass works"; Nonno on 70.00.335 could not get scripts to run (version check) |
| C2-20 | mazda3revolution "old 70.00.367A" / "update 367 to last" threads | local `archive/wb-m3r-old-70.00.367A-240820.html`, `archive/wb-m3r-update-367-to-last-246357.html` | local Wayback | Albuyeh 2020-06-14: 367 contains same neutralize_ID7.sh as 335C; "CAUTION .367 WILL BREAK YOUR SERIAL CONNECTION"; 74.00.324A released for NA/EU/ADR (ASH8) |
| C2-21 | 124spider.org "Infotainment not recognizing usb … after downgrade 70.00.100A to 59.00.502" (manwithastick 2020-10) | local `archive/124spider-usb-not-recognized-38159-p1.html` | local | ID7 v1 re-installed on 56 → 70.00.100 → MazdaToFiat OK; downgrade to 59.00.502 kept ID7 working (after a bad-USB-stick detour) |
| C2-22 | Trevelopment/cmu-autorun GitHub release "1" (published 2021-05-09) | https://github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip | 200 | **ID7_Recovery_XX** (v2 pack) — downloaded & hashed, see §4 |
| C2-23 | mzd-evo/mzd-connect-1-root (GitHub, created 2024-03-25) | https://github.com/mzd-evo/mzd-connect-1-root | 200 (no README) | mp3-hack payload: `mp3/a-d.mp3` (41239 B each), `js/run.js`, `dev.html`, `mp3title.txt`, `css/` |
| C2-24 | shunceyb/mzd74-tweaks-no-touch (GitHub) | https://github.com/shunceyb/mzd74-tweaks-no-touch — local `archive/github-shunceyb-mzd74-tweaks-no-touch-README.md` | 200 | Variant of mp3 hack auto-launching diag for broken touchscreens (v74) |
| C2-25 | Ameridan ID7 v1 package | http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip — local `archive/mediafire/autorun_copy_to_usb.zip`, `downloads/ameridan/autorun_copy_to_usb.zip` | 200 | see §4 |
| C2-26 | Web searches (2026-08-23): `"ID7" mazda tweaks 70.00.335`, `"70.00.367" tweaks`, `"74.00.324" AIO`, `"59.00.502" autorun tweaks`, `mazdatweaks.com id7 v2` | — | — | Surfaced C2-09 source on GitHub, C2-14, C2-17, C2-24, forum.miata.net t-666336 & 679114 post 142 (miata.net returns 403 to fetchers; not read), mazdas247 "Mazda v74 Infotainment Tweaks and Terminal" (not read) |

---

## 2. Plain-language background

### 2.1 How the MZD-AIO USB installer normally works (v55–59.00.500)
MZD-AIO (desktop app, last release 2.8.6, 2020-04-08) compiles the chosen tweaks into a folder
(`_copy_content_to_root_of_fat32_usb_stick`: `tweaks.sh`, `config/`, etc.) that you copy to a FAT32 USB
stick. On firmware ≤ 59.00.500 the CMU, at boot/USB insertion, runs the script from the stick and shows
the on-screen install dialog — no PC connection needed [C2-07][C2-02]. Ameridan's `MazdaToFiatV70AIO.zip`
and ID7 zip use the same mechanism (`tweaks.sh` on the stick root) [C2-01][C2-06].

### 2.2 What 59.00.502 (June 2017) changed
id7 (mazda3revolution, 2017-06-29): "The new version of 59.502 firmware was secured … the `*.up` files run
BUT not execute external files that we use to run scripts from usb — SO usb storage now not have 'autorun'
option; we can't create `*.up` files because we don't have the private keys of signer certificate … SSHd was
secured (root password change, password auth disabled)" [C2-10]. Ameridan: Mazda did it because of bricked
CMUs, safety accusations and the NNG map-piracy tools once bundled in AIO; 2018+ cars ship with 59.00.502 or
higher and dealers upgrade older cars [C2-01]. Mazda's TSB for 59.00.502 lists only stability/BT/USB/iPhone
improvements [C2-03 png]. **Fiat's 59.00.524 (found on a Nov-2017-built 2018 Abarth) is "the equivalent of
Mazda 59.00.502"** and likewise blocks USB tweaks [C2-03]. Downgrading below 59.00.502 is not possible by
the normal update method [C2-16][C2-17].

### 2.3 What "ID7" is (v1)
Named after forum user **id7**, who wrote the scripts; packaged by Trezdog44 into AIO ≥ 2.6.6 ("Autorun →
id7_recovery") and by Ameridan as `autorun_copy_to_usb.zip` [C2-10][C2-01]. It drops an `autorun` script and
`00-*/01-*` folders into the persistent partition `/mnt/data_persist/dev/bin/` (survives firmware updates
because that partition is not reformatted — until 70.00.335). At every boot the CMU executes `autorun`,
which (a) re-adds known passwords (`user/jci`, `jci/jci` with root), (b) re-enables password SSH, (c)
re-installs a udev handler that runs `tweaks.sh`/`run.sh` from an inserted USB stick or the nav SD card
— i.e. it re-creates the autorun behaviour Mazda removed [C2-10; verified in the zip, §4]. **It must be
installed while the CMU still accepts USB scripts (56.x)** — on 59.00.502+ the only way in is the serial
console (`user`/`jci`, limited user, copy XX + chmod) [C2-08][C2-10]. Ameridan (2018-09): with ID7 in
place, tweaks install "via the normal USB drive method, without renaming tweaks.sh to run.sh" [C2-02].
On 70.00.100 ID7 v1 keeps working [C2-13][C2-21].

### 2.4 What 70.00.335 (NA, May 2019), 70.00.352 and 70.00.367 changed
The update package runs `neutralizeid7` (deletes `00-*`, `01-*`, `adb`, `99-*.autorun`, `autorun` from
`/mnt/data_persist/dev/bin`), a forced `passwdupdate` (removes the `user` account / known passwords) and the
new `start_normal_mode.sh` no longer calls `autorun` at all [C2-14][C2-11 p2][C2-06]. Trezdog44's first
"ID7 v2" (a pre-installed self-healing recovery, 2019-05-20) **did not survive the test** (anderml1955,
2019-05-22: tweaks not run, serial logins dead) [C2-11 p1]. The working "ID7 Recovery v2" (2019-06-10) is
therefore a *procedure*: keep a serial console attached while the 335/352 update runs, and when it stops,
**before rebooting**, paste
`cp -r /mnt/sd*/XX/* /mnt/data_persist/dev/bin/; chmod +x /mnt/data_persist/dev/bin/autorun; /mnt/data_persist/dev/bin/autorun`
(XX = the v2 pack incl. `44-recovery-recovery/anti-neutralizeid7.autorun`) [C2-09][C2-11 p2]. "From
70.00.335 onwards (also .352, .367) all tweaks incl. Autorun/ID7 get deleted at every update/downgrade"
→ ID7v2 must be repeated after every flash [C2-11 p11/p17]. Tristan-cx5 confirmed it on 70.00.352B EU
(2020-02-21) [C2-11 p11]. **70.00.367** (2020-06) has the same neutralize script *and* no working serial
login (`cmu`/`user` + `jci` rejected); "can not be enabled to install tweaks"; documented escape =
downgrade to 352 or 335 and do ID7v2 at the end of that install [C2-14][C2-18][C2-11 p17][C2-20].
AIO's own `tweaks.sh` also refuses v70 > .100 unless the `_VER_EXT -le 100` check is edited
(124geek used 360) [C2-12][C2-11 p11].

### 2.5 The no-ID7 / no-serial methods for v70 and v74 ("mp3 hack", 2024–25)
Payload from `mzd-evo/mzd-connect-1-root` (four identical 41 kB "mp3" files + `js/run.js` + `dev.html`)
copied to the USB root; selecting USB audio "plays" them, which opens the JCI diagnostic screen →
"Terminal" → with a USB keyboard: `cd /mnt` → `cd sdb1` (use `ls`) → `./tweaks.sh` (MazdaToFiatV70AIO)
or `./run.sh` (AIO 2.8.6 built with *Install Options → Build run.sh*). For **v74** edit `run.sh` line 184
and `tweaks.sh` lines 159/161/653 (`-eq 70`→`-eq 74`, `-le 100`→`-le 324`) [C2-05][C2-17][C2-19].
Prerequisites: FAT32 stick ≤ 32 GB, nav SD removed, a keyboard; madfiat used the **new** CarPlay hub,
unknown whether the old hub's ports accept a keyboard [C2-19] (one 74.00.324 owner reports USB1/2 greyed
out with the new hub — unresolved [C2-05 comment 2025-11-13]). Does *not* add touch in AA, does not enable
AIO-AA on v70 [C2-17][C2-19]. Ameridan's earlier "JCI Test Mode Easter-egg" idea (2019-05-29) is the same
concept [C2-11 p2].

---

## 3. THE MATRIX

Legend — **USB OOTB** = MZD-AIO / MazdaToFiat stick runs with no preparation; **ID7 v1 pre-installed** =
installed on 56.x before flashing; **ID7v2-at-install** = serial console during the flash + XX (must be
redone after every flash); **Serial (post-hoc)** = mazdatweaks.com/serial on an already-flashed unit;
**mp3** = mzd-connect-1-root terminal method. Region suffix (NA/EU/ADR/JP) is orthogonal to all of this.

| Firmware | USB OOTB | ID7 v1 pre-installed survives | Other known method | Notes / refs |
|---|---|---|---|---|
| 55.x (Mazda) | **yes** | n/a (install ID7 here) | — | AIO supports v55 [C2-07]; 124 Spider never shipped 55 |
| 56.00.521 / 56.00.530 (Fiat/Abarth factory 2017) | **yes** | n/a — **this is where you install ID7 v1** | — | Ameridan's tweaks & ID7 instructions target exactly these [C2-01][C2-02] |
| 56.x other (Mazda 56.00.511/513…) | yes | n/a | — | [C2-07][C2-10] |
| 59.00.4xx (Mazda 59.00.441/443/449; ≤ 59.00.500) | **yes** (AIO "up to v59.00.500") | n/a | — | [C2-07][C2-10 p19] |
| **59.00.502** (Mazda, Jun-2017) — **POINT OF NO RETURN #1** | **no** (USB autorun removed) | **yes** | Serial post-hoc (user/jci) ✔ [C2-08][C2-10]; mp3 ⚠️ no direct report | Cannot downgrade below this version [C2-16][C2-17]. Recommended by Tristan if you want AIO-AA 1.13 [C2-10 p80] |
| 59.00.504 / 540 / 545 / 546 (Mazda 59.00.5xx) | no | yes | Serial post-hoc ✔ (59.00.545: foltambo 2022) [C2-10 p80]; anderml1955 regained serial+USB on 59.00.546/502 with ID7 [C2-11 p1] | same family as .502 |
| **59.00.524** (Fiat 124 only, EU/NA/ADR, from ~Nov-2017 build) | **no** [C2-03][C2-02] | yes (if car ever was on 56 with ID7) | Serial post-hoc ✔ ("serial access without id7 still possible in FCA 59.00.xx" AnClar [C2-11 p1]; 68wooley guide sends 59 owners to mazdatweaks.com/serial [C2-13]); mp3 ⚠️ unverified on .524 | ID7 v1 USB install **fails** on 59 ("tried to install ID7 before upgrading to 70, failed — already on 59" [C2-06 comment]) |
| **59.00.562 / 59.00.563** (Fiat 124 only, 2019–2020 cars, NA/EU/ADR) | **no** [C2-02] | yes (rare) | Serial post-hoc ✔ (assumed identical to 5xx; no explicit report found); **mp3 ✔ 1 report**: 59.00.563 NA factory + AIO 2.8.6 via mp3 (ibanez0987 2025-12-20) [C2-05]; firstshadow "v59 → v70 then mp3" ✔ [C2-19] | Ameridan 2025-06: "not clear, I believe you first need to upgrade to 70" [C2-05]; CLAUDE.md flags these builds as CarPlay-breaking — separate question (not in these sources) |
| 70.00.021 (Mazda, early v70) | no | yes (presumed, < .335) | Serial post-hoc ✔ (maxx88 downgraded to 70.00.021 to retry serial; his failure was wiring) [C2-10 p66] | exists; no 124 reports |
| **70.00.100** (A; NA/EU/ADR) — **community target** | no | **yes** — ID7 v1 keeps USB installs working [C2-13][C2-21][C2-11 p1] | Serial post-hoc ✔ ("ID7/Serial Access works for 59.00.502–70.00.100") [C2-10 p80]; **mp3 ✔** (madfiat, BRG1534, Nonno's issue was .335) [C2-19] | `MazdaToFiatV70AIO` installs unmodified only here (`_VER_EXT -le 100`) [C2-06][C2-12]; 3-year trouble-free reports [C2-15] |
| 70.00.110 (JP only, Ameridan chart) [C2-03] | no | yes (presumed) | Serial (presumed) | no reports; JP = Matsukone nav, irrelevant for 124 |
| 70.00.130 / 70.00.150 | — | — | — | **no data in any source read** (❓ existence/region unknown) |
| **70.00.335 (C)** — **POINT OF NO RETURN #2 for ID7 v1** | no | **NO** — `neutralizeid7` + `passwdupdate` wipe ID7 v1 and pre-installed v2 [C2-11 p1][C2-14] | **ID7v2-at-install ✔** (serial during (re)install of .335, paste before reboot; redo after every flash) [C2-09][C2-11]; can re-install .335 over .335 [C2-16][C2-11 p11]; mp3 ⚠️ expected to work ("ID7, ID7v2 or mp3 method" [C2-17]) but 124 owner Nonno failed on .335 — script version check suspected, unresolved [C2-19] | MazdaToFiat needs 124geek's edits [C2-12]; Ameridan: "stay away from .335" [C2-04]; downgrade to ≥ 59.00.502 possible but ID7 must be re-done via serial [C2-11 p17] |
| 70.00.352 (B) | no | NO | **ID7v2-at-install ✔** (Tristan-cx5 EU, 124geek NA with MazdaToFiat edits) [C2-11 p11][C2-12]; mp3 ⚠️ (as above) | "Recommended if you want to do ID7v2" [C2-10 p80]; last serial-enablable v70 |
| **70.00.367 (A)** — **POINT OF NO RETURN #3 (serial)** | no | NO | **ID7v2 ✗, serial login ✗** [C2-14][C2-18][C2-11 p17]; escape = downgrade to .352/.335 + ID7v2-at-install ✔ [C2-14][C2-10 p66]; **mp3 ⚠️ 1 report** ("v70.00.367 with Android tweaks via .mp3", 2026-04-12 [C2-06 comment]) | Downgrade floor 59.00.502 [C2-17]; 124 owner whose dealer flashed .367: Mazda-branded, no nav, "huge damage" [C2-11 p17] |
| 74.00.230 / 74.00.311 / 74.00.310 | no | NO | ID7v2 ✗ (".230 can not be enabled… only .335/.352" [C2-10 p77]); mp3 ✔ (wt.tm.78 on 74.00.311 [C2-17]) | **74.00.311/.310 = downgrade floor for 74.x** [C2-17] |
| **74.00.324 (A)** | no | NO | **mp3 ✔** (aeromiata EU, nirurin ND, madfiat/Ameridan for 124 incl. MazdaToFiat with line edits) [C2-17][C2-05] | Can only be downgraded to 74.00.311/.310 [C2-17]; "AIO tweaks only recommended for 74.00.324 and lower" [C2-17] |
| 74.00.331 | no | NO | mp3 ✔ but **may disable wireless CarPlay** [C2-17][C2-05] | — |

**Points of no return, explicitly:**
1. **59.00.502 (and every Fiat 59.00.5xx)**: USB autorun gone, no downgrade below; without ID7 v1 you need
   serial (or, since 2025, the mp3 hack) to ever run a tweak stick again [C2-10][C2-16].
2. **70.00.335**: erases ID7 v1; from here tweaks need ID7v2-at-install (serial) after *every* flash, or the
   mp3 hack [C2-11][C2-14].
3. **70.00.367**: serial console credentials gone → ID7/ID7v2 impossible; downgrade to 352 + serial, or
   mp3 hack (thinly evidenced) [C2-14][C2-18][C2-06].
4. **74.00.311+**: cannot go back below 74.00.311/.310 [C2-17]; tweaks only via mp3 hack with script edits.

---

## 4. ID7 artifacts

| Artifact | Version / content | Original URL | Wayback / mirrors | Status 2026-08-23 | SHA256 / notes |
|---|---|---|---|---|---|
| **`autorun_copy_to_usb.zip`** (Ameridan, "ID7 autorun + Recovery scripts") | **ID7 v1** pack compiled with **MZD-AIO-TI 2.6.8 on 2017-08-27** (`MZD_LOG.md` inside); contents: `autorun`, `autorun.temp`, `tweaks.sh` (installer dialog Install/Uninstall/Skip), `utils.sh`, `cmu_dataretrieval.up`, `dataRetrieval_config.txt`, `jci-autoupdate`, folders `00-run-tweaks-from-usb/`, `00-update-etc-passwd-if-needed/`, `00-update-sshd-config-if-needed/`, `01-start-sshd-and-open-firewall/` (27 files, 59 952 B unpacked; file dates 2018-11-29 = re-zip date) | http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip [C2-01][C2-03][C2-13] | not on Wayback (MediaFire); local `research/archive/mediafire/autorun_copy_to_usb.zip` = `downloads/ameridan/autorun_copy_to_usb.zip` | **200 live** | `c8bef694b1dcae78881ad57b9df8fdba09f073ee93d3ca89c9382c7315572726` (already in `downloads/CHECKSUMS.sha256`). Single-source → "collected", not "verified" |
| AIO-generated "XX"/id7_recovery pack | ID7 v1 (same scripts) generated by MZD-AIO 2.6.6–2.8.6 → "Autorun" (top-right) / "Autorun & Recovery – Install ID_7 Recovery Scripts Pack" | https://github.com/Trevelopment/MZD-AIO/releases (app) | — | 200 | Equivalent to the above for 59.00.502–70.00.100 serial use; **must not be mixed with the v2 XX** [C2-10 p77] |
| **`XX.zip` = ID7_Recovery_XX (ID7 v2 pack)** | folder `XX/` with `autorun` (929 B), `02-run-tweaks-from-usb/`, `02-start-sshd-and-open-firewall/`, `02-update-etc-passwd-if-needed/`, `02-update-sshd-config-if-needed/`, **`44-recovery-recovery/`** (`adb` 220 516 B, `anti-neutralizeid7.autorun`, `autorun`, `recover-autorun.sh`, `watch-for-missing-recovery.sh`); 26 files, 243 234 B unpacked, internal dates 2021-06-06 | https://github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip (GitHub release "1 – MZD-AIO Additional Resources", published 2021-05-09; 117 907 B, 12 247 downloads) [C2-09][C2-22] — earlier link **http://trevelopment.win/xx** (dead, DNS fails) | Wayback has `github.com/Trevelopment/cmu-autorun` (2018-06-13 …) and tag archives; forum copy attached as `xx.zip.pdf` in ID7 Recovery v2 thread p20 (#388, 2021) [C2-11 p20] | **200 live** (downloaded to `downloads/tweaks/ID7_Recovery_XX.zip`, hash appended to `downloads/CHECKSUMS.sha256`) | `e6b778079bd61212ae49b88cf1c846b40c0dcb5f59252c0b2396f5f8aa867daa` — single source (author's GitHub) → "collected"; no community hash found |
| id7's original `autorun.v2.zip` / `autorun-v3.zip` (2017-06/07) | first ID7 v1 scripts, attachments in m3r thread | m3r thread 200450 posts #2081162/#2085714/#2085898 [C2-10] | Wayback p1 2019-12-16 (attachments not captured) | attachments not retrievable | historical only |
| mazdatweaks.com/id7 page | instructions only (no binary) | https://mazdatweaks.com/id7/ | Wayback 2019-07-17 … 2025-01-18 (saved locally); source `Trevelopment/mazdatweaks/id7.md` (200) | **404** | [C2-09] |
| "update.up" referenced by id7 page | = the firmware file itself (e.g. `cmu150_NA_70.00.335C_update.up`, `cmu150_EU_70.00.352B_update.up`), placed at the stick root **next to** `XX/` | firmware download locations (separate theme) | — | — | Clarifies C1 open question #3: it is not a separate artifact [C2-10 p66/p77] |
| `mzd-connect-1-root` (mp3 hack) | `mp3/a.mp3…d.mp3` (41 239 B each), `js/run.js` (4 998 B), `dev.html`, `mp3title.txt`, `css/` | https://github.com/mzd-evo/mzd-connect-1-root (created 2024-03-25, pushed 2024-03-26) | — | **200** (not yet downloaded/hashed — to do) | [C2-23]; also `shunceyb/mzd74-tweaks-no-touch` variant [C2-24] |

---

## 5. Recommended sequence for a 124 owner on Fiat 59.00.5xx (what the sources say)

Context: a car on 59.00.524/562/563 **cannot install ID7 v1 from USB** (the USB autorun is already gone)
[C2-03][C2-06 comment]. The classic 124 guide (68wooley v3.0, embedded in Ameridan's Universal V70 page)
assumes 56.x and says: *"If your car is currently on a version 59 firmware, you will need to follow the
process described at https://mazdatweaks.com/serial/"* [C2-13][C2-06]. Since 2025 the community answer
is the mp3 hack [C2-05][C2-19]. Sequence as the sources recommend:

1. **Verify** version (Settings → System → About → Version Information) and region suffix; keep the
   region [C2-16]. Do **not** take the car to a dealer who may flash 70.00.367/74.x first [C2-11 p17].
2. **Obtain** region-matched **70.00.100** (failsafe + reinstall `.up`) — *not* 335/352/367/74.x
   [C2-06][C2-15] — plus `MazdaToFiatV70AIO.zip` [C2-06], MZD-AIO 2.8.6 [C2-07], `mzd-connect-1-root`
   [C2-23] and the 2018 worldwide CMU update PDF [C2-06]. Check hashes.
3. **Flash 70.00.100** with the normal Mazda USB procedure (no hack needed for the flash itself) [C2-19
   madfiat post 647069]; reboot. Optionally install the CarPlay hub now (madfiat: "swap hardware once you
   have v70, before running any tweaks"; Tristan: ID7v2 works fine with the new hub installed) [C2-19][C2-11 p11].
4. **Restore Fiat logo + nav**: USB stick = `mzd-connect-1-root` files **+** contents of
   `MazdaToFiatV70AIO.zip` at the root; nav SD out; audio source USB1 → diag popup → Terminal → keyboard:
   `cd /mnt`, `cd sdb1` (check with `ls`), `./tweaks.sh` → answer the MazdaToFiat prompts → reboot [C2-05][C2-19].
5. **Other tweaks** (e.g. touchscreen-while-moving, no disclaimer): MZD-AIO 2.8.6 with *Install Options →
   Build run.sh*, overlay on a stick that also holds the mp3 payload, run `./run.sh` the same way [C2-05].
   Avoid "Pause on mute" and the AIO Android-Auto tweak (not v70-compatible) [C2-19][C2-17].
6. Alternative for those who *prefer* ID7: the old path (serial console, `user`/`jci`, copy the **v1** XX)
   on the 59.00.5xx unit first, then flash 70.00.100 — ID7 v1 survives that flash [C2-08][C2-13][C2-21].
   "The id7 method is slightly easier (no keyboard) but only if you have the lower firmware" [C2-19][C2-06].
7. Owners still on **56.00.521/530**: install ID7 v1 from USB **before anything else** (Ameridan/68wooley
   steps: FAT32 stick, unzip, ACC, wait 5–10 min, Install → Reboot now), then flash 70.00.100 and run
   `MazdaToFiatV70AIO` from USB directly [C2-01][C2-13].

**Warning for owners already on 70.00.335+ without ID7 (must be stated everywhere):**
- On **70.00.335/352** the old ID7 and the known serial passwords are gone; the *only* ID7 route is to
  re-flash the same (or lower ≥ 59.00.502) firmware with a serial console attached and paste the ID7v2
  command before the first reboot, then edit `MazdaToFiatV70AIO/tweaks.sh` (`_VER_EXT -le 360`) [C2-09]
  [C2-11 p11][C2-12]; and again after every future flash [C2-11 p11]. The mp3 hack is the no-serial
  alternative but on .335 one 124 owner could not get the scripts to run (⚠️) [C2-19].
- On **70.00.367** neither ID7v2 nor serial login works ("no chance of ever tweaking… serial will not even
  work" [C2-04][C2-14]); documented escape = downgrade to 70.00.352 with ID7v2-at-install (needs the
  CMU out of the dash + CP2102) [C2-14][C2-18]; the mp3 hack on .367 has exactly one positive report
  (2026-04) [C2-06] ⚠️ unverified.
- On **74.00.3xx** you cannot go back below 74.00.311; only the mp3 hack with script edits [C2-17][C2-05].
- Consequence for a 124: Mazda boot logo and **no factory navigation** until one of the above is done
  [C2-11 p17][C2-04 comment 2022-11-02].

---

## 6. Open questions / contradictions

1. ❓ **"ID7 v2 pre-install protects you" vs. "ID7v2 = serial during install".** Ameridan's v2 article
   (2019-05-20) still describes v2 as something installed *before* updating [C2-04]; Trezdog44's own test
   failed two days later and the shipped method requires serial at install time [C2-11 p1/p2][C2-09].
   68wooley's "I may update the instructions to use ID7 V2 to protect people" [C2-12] must be read in that
   light. Our docs should say: pre-installing anything does **not** survive 335+.
2. ❓ **Does the XX v2 pack on GitHub (2021) equal the 2019 `trevelopment.win/xx` file?** The release is
   dated 2021-05-09 but the zip's internal timestamps are 2021-06-06; forum p20 (2021) says the site link was
   broken and re-posted the file. Only the author's copy exists; no independent hash. (`downloads/tweaks/ID7_Recovery_XX.zip` collected, unverified.)
3. ⚠️ **mp3 hack on 59.00.5xx Fiat builds**: madfiat "unknown", Ameridan "I believe you first need v70",
   one positive report on 59.00.563 (2025-12-20) and firstshadow "v59→v70 then mp3" [C2-05][C2-19]. Needs a
   test (the maintainer's car is the bench).
4. ⚠️ **mp3 hack on 70.00.335/352/367**: Tristan-cx5 lists it generically; Nonno failed on .335 (cause not
   isolated: version check in `tweaks.sh` vs. hack not launching); one report of success on .367. Unverified.
5. ❓ **Keyboard on the old (non-CarPlay) hub**: madfiat unsure; one 74.00.324 owner with the *new* hub
   reports USB1/2 greyed out [C2-05]. Unknown whether the mp3 hack needs the new hub.
6. ❓ **70.00.130 / 70.00.150**: no source read mentions them; 70.00.110 is JP-only per Ameridan's chart.
7. ❓ **Fiat 59.00.562/563 vs CarPlay**: none of these sources discuss CarPlay compatibility of the Fiat
   59.00.5xx builds (CLAUDE.md claim) — needs its own theme.
8. ❓ Exact behaviour when ID7 v1 is present and the unit is *downgraded* from 70.00.100 to 59.00.502:
   one 124 owner kept ID7 working [C2-21]; Tristan says downgrades below .335 keep autorun [C2-11 p17].
   Consistent, but single reports.
9. Link rot: `mazdatweaks.com/id7` (404 since 2025-08), `trevelopment.win/xx` (dead), `dl.mazdatweaks.win`
   still 200; forum.miata.net blocks fetchers (post 142 of t-679114 — the original mp3-hack guide — not
   archived here; to do via browser/Wayback).
10. Not yet collected/hashed: `mzd-connect-1-root` payload; the 124geek-modified MazdaToFiat `tweaks.sh`
    for 335/352; id7's original `autorun.v2/v3.zip` attachments (likely lost).

Files added today to `research/archive/`: `wb-m3r-aio-tweaks-fw-502-200450-p{1,19-2022,66,75,77,80}.html`,
`wb-m3r-id7-recovery-v2-234619-p{1,2,3,4,11,17,20}.html`, `wb-m3r-aio-tweaks-in-59-and-70-240484.html`,
`wb-mazdatweaks-id7-20190717.html`, `github-mazdatweaks-id7.md`, `github-shunceyb-mzd74-tweaks-no-touch-README.md`.
Binary added: `downloads/tweaks/ID7_Recovery_XX.zip` (+ line in `downloads/CHECKSUMS.sha256`; add to `INVENTORY.md`).
