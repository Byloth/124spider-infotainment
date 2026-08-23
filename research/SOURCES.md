# SOURCES

Master source list for the 124 Spider infotainment upgrade knowledge base. Consolidated
2026-08-23 from the seven raw research files in `research/raw/`. Each source has a stable id
`[S-nn]`; the research docs cite these ids. Link status is as checked on **2026-08-23**.

**Access note that shapes everything below:** the three pillar forums are now hard to read with
automation. `124spider.org`, `mazda3revolution.com`, `mazdas247.com`, `mazda6club.com` (all
VerticalScope/XenForo) answer a JavaScript proof-of-work challenge and redirect scripted fetchers
to a Tollbit paywall (HTTP 402/406). `forum.miata.net` is login-walled (403). So most forum pages
were read from **Wayback Machine** captures or a PoW-solving fetch helper, and several threads
survive only as search snippets. Every important page was archived locally under `research/archive/`.
**`mazdatweaks.com` is dead/hijacked** (gambling spam; `/id7` 404, `/serial` was 200 at some checks) —
treat every link to it as broken and use the GitHub mirror `Trevelopment/mazdatweaks` instead.

Trust legend: **A** = official/primary (Mazda doc, first-party CDN, hash-verified) · **B** =
experienced community author corroborated by others · **C** = single community report / shop claim ·
**D** = marketing copy.

---

## 1. Primary / first-party (Mazda, official)

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-01 | **Mazda USA dealer firmware CDN (AWS S3)** | `https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<file>` | **ALIVE for NA objects (HTTP 200); bucket listing denied; EU/ADR objects 403** | **A** | The single most valuable find. Direct object GETs of NA `.up` files succeed; the four NA files whose community MD5 exists **matched exactly** → serves genuine, unmodified Mazda files, free. See INVENTORY §firmware. |
| S-02 | Mazda NA dealer TSBs / Service Alerts on NHTSA | `https://static.nhtsa.gov/odi/tsbs/...` | ALIVE | A | The closest thing to an official changelog. TSB 09-022/19 (→70.00.335C, re-issue →70.00.352), 09-021/21 (→74.00.311), 09-018/22 (→74.00.324); SA-001324 (59.00.441); CarPlay retrofit dealer memo **MC-10144323** (kit `0000-8F-Z34`, program CSP02). PDFs saved in `research/archive/` + `research/archive/hardware/`. |
| S-03 | Mazda EU technical download portal | `portal.mazdaeur.com` / `mazdashare.com/mtds` | ALIVE, **paid/registration-gated** | A | "Mazda Technical Download Server"; a paying user found only EU 70.00.100A failsafe+reinstall and 74.00.311A — not a full back-catalogue. |
| S-04 | Mazda "CMU Firmware Update Procedure — WORLDWIDE" PDF | ref **MME/E004/17**, June 2018 | ALIVE (wordpress + mirrors) | A | The actual 30-step dealer procedure bundled with the files. In `downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf` + `research/archive/`. |
| S-04b | Mazda "WORLDWIDE FIRMWARE UPDATE PROCEDURE" (9pp, rev. with 70.00.335 notes) | `billswebspace.com/MAZDA%20FIRMWARE%20UPDATE%20PROCEDURE%20WORLDWIDE.pdf` | ALIVE | A | 25-min ACC timer, ROOM-fuse recovery, "DO NOT turn IG OFF". Local copy saved. |
| S-05 | Mazda NA TSB **09-024/16** (2016-07-05) | `static.nhtsa.gov/odi/tsbs/2016/SB-10085418-6903.pdf` | ALIVE | A | Battery-charger (~7 A) requirement; all personal settings/pairings lost on update. |
| S-06 | Official Mazda **USB cable set install instructions** (MX-5, part C922 V6 605, doc C92X_V6_605_01_00) | `billswebspace.com/mx5z34.pdf` | ALIVE | A | 10 pp, 2018-09-24. "Firmware MUST be updated FIRST … v70.00.21+ … once the CMU is attached to the new hub the software cannot be updated." SHA256 `1cfcc50e…`. |
| S-07 | Mazda Australia CarPlay/AA owner page | `mazda.com.au/owners/help-and-support/apple-carplay-and-android-auto/` | ALIVE | A | Retrofit via dealer, "several hours", price on request. |

## 2. Community knowledge bases (high trust for facts)

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-10 | **Ameridan's blog "21st Century Fiat / Abarth 124 Spider"** | `21stcenturyfiat124spider.wordpress.com` | ALIVE (every page HTTP 200) | B | THE Fiat-specific bible. 29 relevant posts catalogued in `raw/B-ameridan-blog.md` (B-01…B-29). Author Dan is on 56.00.521 NA, never upgraded to v70, **no longer owns the car** (no further dev). Key posts: Universal V70 Fiat AIO Tweak (2019-02-18), Fix Navigation for v70 (2019-01-31), Common tweaks 7.0, Preserve ability to tweak v1 (2017-08-29) & v2 (2019-05-20), V70/V74 tweaks without ID7 (2025-05-25), Replacing the CMU / retrofit kit (2018-04-30). |
| S-11 | **124spider.org "CarPlay / Android Auto Upgrade HowTo"** (thread 32286) | `124spider.org/threads/carplay-android-auto-upgrade-howto.32286/` | ALIVE, bot-blocked; Wayback p1,2,8–14,16–20 | B | The canonical 124 guide by **68wooley**: Part 1 firmware, Part 2 hardware. OP text is outdated (redirects to the PDF v3.0 / Ameridan's blog). 403 replies over 5 years. |
| S-12 | 68wooley PDF guide `124Spider_CP_AA_Upgrade_Guide.zip` (Part 1 v3.0 2019-05-17, Part 2 2019-02-06) | MediaFire `201759io15ariii` | ALIVE, downloaded | B | The procedure 68wooley says to follow. In `downloads/guides/`. |
| S-13 | mazda3revolution "MZD I connect firmware info/hints" (thread 236211, Tristan-cx5) | `mazda3revolution.com/threads/...236211/` | ALIVE, bot-blocked; Wayback | B | Best plain-English explainer of region codes, suffix letters, update/downgrade rules. |
| S-14 | mazda3revolution "AIO Tweaks and Firmware Ver .502 — READ THIS" (thread 200450) | `.../aio-tweaks-and-firmware-ver-502-read-this.200450/` | ALIVE, bot-blocked; Wayback p1,19,66,75,77,80 | B | Origin of ID7; id7's analysis of the 59.00.502 lock; Tristan-cx5 "what works on which FW" summaries. |
| S-15 | mazda3revolution "ID7 Recovery v2" (thread 234619, Trezdog44) | `.../id7-recovery-v2.234619/` | ALIVE, bot-blocked; Wayback p1–4,11,17,20 | B | `neutralizeid7` in 70.00.335-C; pre-installed v2 **failed**; shipped method = serial during the flash + XX pack, redone after every flash. |
| S-16 | mazda3revolution "Black Screen MZD" (thread 229891, 18 pp) | `.../black-screen-mzd.229891/` | ALIVE, bot-blocked; p1–9,11,18 read | B | THE brick-recovery thread: CH341A / RPi+flashrom procedures, NOR offsets, chips, rescue .bin files, downgrade-wall table. |
| S-17 | mazda3revolution "MZD-AIO tweak on FW 74+" (thread 252435) | `.../mzd-aio-tweak-on-fw-74.252435/` | ALIVE, bot-blocked; Wayback | B | mp3-hack on 74.00.324A; `run.sh`/`tweaks.sh` line edits; 74.00.311/.310 downgrade floor. |
| S-18 | forum.miata.net "GENUINE MAZDA CarPlay+Android Auto Install Instructions UPDATED" (t=679114, ASH8) | `forum.miata.net/vb/showthread.php?t=679114` | ALIVE, login-walled; Wayback p1 | B | Canonical ND retrofit post: per-region 70.00.021 filenames, cable/hub part numbers, EU release facts, install order. |
| S-19 | forum.miata.net mp3-hack origin thread (posts 142/143) | `forum.miata.net/vb/showthread.php?t=782788` (also cited as t=716112/782788) | login-walled (403) — **NOT read** | — | Origin of the "mp3 hack"; cite via S-10/S-11/S-25 only. **A human with a login should archive it.** |
| S-20 | 124spider.org "Firmware Files Download Locations" (thread 45543, AegirTheLucky, 2025-01-28) | `.../firmware-files-download-locations.45543/` | ALIVE | B/C | Current live re-host: Google-Drive zips NA/EU/ADR (935 MB / 2.2 GB / 1.8 GB) + a v74 NA folder. ⚠️ AegirTheLucky says the zips are "tweaked/optimised for Fiat" — verify `.up` hashes independently. |
| S-21 | 124spider.org "File for 70.00.100 firmware?" (thread 44172, 2024–25, 121 replies) | `.../file-for-70-00-100-firmware.44172/` | ALIVE | B | Files shared by PM (james.today NA, AegirTheLucky NA+EU, Lawrence all regions, RJJ ADR). |
| S-22 | 124spider.org "V70 Tweaks without ID7 — YES YOU CAN!" (thread 45965, madfiat, 2025-05) | `.../v70-tweaks-without-id7-....45965/` | ALIVE; Wayback p1 | B | Original 124-side mp3-hack write-up (video). firstshadow "v59→v70 then mp3 works"; Nonno failed on 70.00.335. |
| S-23 | 124spider.org "MazdaToFiat70AIO … 70.00.335C or 70.00.352B Success!" (thread 38004, 124geek, 2020-09) | `.../...success.38004/` | ALIVE; local archive | B | How to run MazdaToFiatV70AIO on 335/352: edit `tweaks.sh` version check `_VER_EXT -le 360` on an MZD-AIO 2.8.6 stick. |
| S-24 | mazdas247 "DIY Firmware Update Information" / "70.00.367 EU N or 74.00.324A EU N download link" | `mazdas247.com/forum/threads/123881478`, `123883736` | ALIVE, bot-blocked | B/C | Files via PM to @Candurin; public links dead. |

## 3. Tooling repos (GitHub, live)

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-30 | **Trevelopment/MZD-AIO** (app) | `github.com/Trevelopment/MZD-AIO` | ALIVE (684★, GPLv3) | B | The AIO installer GUI. **14 releases; latest v2.8.6 2020-04-08; nothing since** (no build for 70.00.335+/74.x). Wiki empty. README is Mazda-only: **no Fiat logo / no nav-restore / no ID7 option**. |
| S-31 | Trevelopment/MZD-AIO-TI (original repo) | `github.com/Trevelopment/MZD-AIO-TI` | **HTTP 451 DMCA-blocked** since 2017-03-06 (NNG) | — | Why the app repo was renamed MZD-AIO. (No `MZD-AIO-UI` exists — 404.) |
| S-32 | Trevelopment/cmu-autorun (recovery SD scripts) + release "1" | `github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip` | ALIVE (200) | B | Hosts the **ID7 Recovery XX (v2)** pack. Downloaded → `downloads/tweaks/ID7_Recovery_XX.zip`. |
| S-33 | Trevelopment/mazdatweaks (website source) | `github.com/Trevelopment/mazdatweaks` | ALIVE | B | The only surviving copy of the dead `mazdatweaks.com` id7/serial/FAQ pages (`AIO-FAQ.md`, `id7.md`). |
| S-34 | **mzd-evo/mzd-connect-1-root** (mp3-hack payload) | `github.com/mzd-evo/mzd-connect-1-root` | ALIVE (no README) | B | The 2024 USB-only root method: `mp3/a–d.mp3` + `js/run.js` + `dev.html`. Downloaded → `downloads/tweaks/mzd-connect-1-root-main.zip`. |
| S-35 | shunceyb/mzd74-tweaks-no-touch | `github.com/shunceyb/mzd74-tweaks-no-touch` | ALIVE | C | Variant of the mp3 hack auto-launching diag for broken touchscreens (v74). |
| S-36 | Trevelopment/MZD-AIO **issue #135** "Serial solution doesn't work for 70.00.367 EU" | `github.com/Trevelopment/MZD-AIO/issues/135` | ALIVE | B | Key thread: `neutralizeid7` script text; 367 = no serial login; updates **signed** (can't repack); only escape = downgrade to 352. Local copy `research/archive/mzd-aio-issue-135-comments.md`. |
| S-37 | Trevelopment/MZD-AIO issue #47 | `github.com/Trevelopment/MZD-AIO/issues/47` | ALIVE | B | Brick after AIO "System Restore" (Mazda logo forever). |

## 4. Firmware distribution (resellers & mirrors)

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-40 | navi-world.com | `navi-world.com` | ALIVE | C (commercial; files genuine Mazda) | Per-region firmware **€29–39**, emailed <24 h; also Fiat nav maps and a **Fiat-124 CMU serial-access service** (`/2025/04/20/fiat-124-spider-cmu-serial-access/`) and the Mazda procedure text with 62 comments of real failure reports. |
| S-41 | mazdafiles.com (Gumroad "nathanair") | `mazdafiles.com` | ALIVE | C | **$10–15** single `.up`. EU 74.00.324A page claims direct-from-59.x (❓ contradicts dealer two-file rule). |
| S-42 | UK resellers: satnavishop.co.uk, latestsatnav.co.uk, eBay, 124spider.uk | — | ALIVE | C | Some list Fiat/Abarth-124-branded 70.00.100 / 74.00.324 "+ Support" (repackaged Mazda files). |
| S-43 | mikele85.ru / drive2.ru (Russian) | — | ALIVE | C | EU firmware span cmu140_EU_30.00.100A … cmu150_EU_74.00.324A; documents a direct JP 59.00.332 → EU 74.00.324 flash to add Russian. |
| S-44 | AliExpress (kits ship with a firmware link/USB) | — | ALIVE | **D/low** | Often wrong-region or incomplete; ASH8 & others warn against them for firmware. |
| S-45 | gpytmfg.com blog "Genuine Mazda AA and CarPlay install" | `gpytmfg.com/blogs/news/...` | ALIVE (not read) | C | "56 to 70 update went just fine." |

## 5. Firmware distribution — dead / neutralised

| id | Source | Status | Notes |
|---|---|---|---|
| S-50 | **`my.hidrive.com/share/hsodpqja`** (Modfreakz) — was THE canonical free index | DEAD since ~2021–22 | Region folders `NA N`/`EU N`/`4A N` + a `y Checksum` folder; naming preserved in S-18 and the Shopify PDF. If a Wayback/other mirror of this tree exists it recovers every EU/ADR hash at once — **not located**. |
| S-51 | MEGA folders (ASH8 2018; Ameridan 2021 `YWx3lCIT`), odysee (DanB/BookAutowerks), 1fichier, OneDrive/bit.ly, we.tl | mostly dead / "empty" / 403 | Historic 70.00.100 mirrors; see `raw/B` §3.10 for the full decay list. |
| S-52 | Scribd "EU N CMU HASH Value" (doc 838112560) | login-gated | Likely holds the missing EU hashes. |
| S-53 | GitHub drone540/mazda-firmware-changelogs | ALIVE | Changelog text only (55.x/59.x/70.00.021/000), no binaries. |

## 6. Hardware (retrofit kit) sources

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-60 | Ameridan "Replacing the CMU … CarPlay retrofit kit" (B-09) | `21stcenturyfiat124spider.wordpress.com/2018/04/30/...` | ALIVE | B | 124 reference on the kit: hub label lore, per-region cables, AT shift-knob warning, hub photo. |
| S-61 | ASH8 compiled install PDF (Shopify-hosted) | `cdn.shopify.com/.../CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf` | ALIVE | B | 70.00.335C-era per-region part numbers; "must be the 'C' hub"; FAQ (no AA-only, old hub discarded). SHA256 `45b6bb40…`. |
| S-62 | 124spider.uk shop | `124spider.uk/shop/android-auto-carplay-kit` | ALIVE | C (shop) | UK 124 kit £150 self-fit / +£140 fit; customer says hub looks non-OEM but works. |
| S-63 | mazda3revolution "Nav does not work after installing AA/CarPlay hub" (thread 244127) | `.../244127/` | ALIVE, bot-blocked; Wayback | B/C | **Clone hubs → SD-nav/GPS fails**; genuine TK78-66-9U0D fixed it; clone-cable defects. |
| S-64 | mazda3revolution "retrofit kits & firmware" (thread 248785) | `.../248785/` | ALIVE, bot-blocked; Wayback | C | "Market flooded with clones"; genuine on dealer eBay accounts. |
| S-65 | Install videos | YouTube `Qcyan28QXs4` (124, 2018), `XpPYKikqIDc` (ND), `ZZgcWq3ZA38` (Abarth RHD), `ZQTeJukUFII` (ND RHD 2025) | ALIVE | B/C | 124-specific + ND how-tos. |
| S-66 | Dealer/parts price references | parts.mazdausa.com, mazdaparts.org, SG Petch, Arnold Clark, online-teile.com, mx5mania, JP dealer blogs | ALIVE (some bot-blocked) | C | Per-market prices/part numbers; see INVENTORY §hardware. |
| S-67 | `my.hidrive.com/share/hsodpqja.l#$/…-CarPlay-AndroidAuto INSTALL` | file share | not fetched (JS app) | B | Canonical location of Mazda's own trim-removal PDFs + full-install mp4s — **to mirror before it disappears.** |

## 7. Brick-recovery / reverse-engineering references

| id | Source | URL | Status | Trust | Notes |
|---|---|---|---|---|---|
| S-70 | 2x4logic.com "jci-failsafe" / "invokefailsafe" (majbthrd, 2016) | `2x4logic.com/jci-failsafe.html` | site down; Wayback 2016 | A (reverse-engineer) | SPI-NOR partition map, boot-select byte at 0x010000, why the "fail-safe" isn't. |
| S-71 | 124spider.org "I bricked my CMU then recovered it" (thread 22986) | `.../i-bricked-my-cmu-then-recovered-it.22986/` | ALIVE, bot-blocked; Wayback | B | Two full recovery write-ups (config-partition squashfs; CH341A boot-select 0x10000 FF→00). |
| S-72 | mzdonline.wordpress.com (RPi NOR reset) / yms.livejournal.com (first public unbrick) | — | ALIVE | B | RPi+flashrom, chip S25FL064A, rescue .bin in comments. |
| S-73 | mazda6club "bricked CMU … 0x10000 to FF and still bricked" (thread 444748) | `.../444748/` | ALIVE | C | Boot-select patch alone insufficient when serial also dead. |

---

**Full per-theme source detail** (with exact post ids, dates and page-by-page notes) lives in the
seven `research/raw/*.md` files; this file is the deduplicated index those raw files feed.
