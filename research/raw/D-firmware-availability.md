# Theme D — Firmware packages: what exists, per region, and where to obtain it today

Research agent D. Date: 2026-08-23. All claims cite sources in §1. `⚠️ unverified` /
`❓ contradictory` markers used per repo convention. Filenames, sizes and dates that come
from a live HTTP HEAD/GET against Mazda's own server are marked **[verified live]**.

> **HEADLINE FINDING (highest value):** Mazda's official dealer firmware CDN is **still
> live and world-readable for the North American (NA) region** at
> `https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<filename>`. Direct object GETs
> succeed (HTTP 200); only bucket *listing* is denied. EU/ADR objects on the same bucket
> return HTTP 403 (region path differs or is locked). I downloaded five NA files from it and
> the 74.00.324A NA MD5 matches the community-reported hash **exactly** (see §1 S-01, §2).
> This is the single most reliable, free, first-party source found.

---

## 1. Sources list

Format: [S-id] URL — type — dates — link status — trust — summary.
Local archives saved under `research/archive/` (filename in brackets).

**Primary / first-party**

- **[S-01] `https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/`** — Mazda USA Technical
  Service Download CDN (AWS S3) — checked **2026-08-23** — **ALIVE for NA objects (HTTP 200);
  bucket-listing denied; EU/ADR objects 403** — trust: **HIGHEST (first-party, hash-verified)**.
  Direct object URLs work, e.g.
  `.../MAZDA_CONNECT/cmu150_NA_74.00.324A_update.up`. Confirmed by community as "the exact
  files your Mazda dealer uses" and cited in-thread (S-05, S-11). Files downloaded locally
  (`downloads/firmware/NA/`), see §2 for sizes+hashes.
- **[S-02] Mazda dealer TSB/Service-Alert PDFs on NHTSA** (`static.nhtsa.gov/odi/tsbs/…`) —
  official Mazda North American Operations bulletins, public — ALIVE — trust HIGHEST.
  Key ones saved locally:
  - `MC-10186917-9999.pdf` = Service Alert 001324, "MAZDA CONNECT SOFTWARE VERSION 59.00.441
    AVAILABLE" (2016). [nhtsa-MC-10186917-9999.pdf; decoded copy .decoded.txt]
  - `MC-10162014-0001.pdf` = **TSB 09-022/19** (issued 06/06/2019), update target
    **70.00.335C or later**; full per-version changelog 59.00.441→70.00.335. [saved]
  - `MC-10169542-0001.pdf` = **TSB 09-022/19** (re-issued 12/19/2019), target **70.00.352 or
    later**. [saved]
  - `MC-10213201-0001.pdf` = **TSB 09-021/21** (06/03/2022), target **74.00.311 or later** —
    contains the fullest changelog incl. explicit "cannot be rolled back" / "unauthorized
    customization will be erased" language. [saved]
  - `MC-10226834-0001.pdf` = **TSB 09-018/22** (05/25/2022), target **74.00.324 or later**. [saved]
  - `MC-10201864-0001.pdf` / `MC-10210842-0001.pdf` = Service Alerts SA-019/21, SA-001/22
    (MAZDA CONNECT troubleshooting; reference Navi SD VIN-lock, CarPlay/AA FAQ SA-070/20,
    software-fix-list TSB 16-001/20). [saved]
  - `MC-10144323-9999.pdf` = dealer memo "CarPlay/Android Auto Retrofit Kit Distribution …
    2018 Mazda6" + **CSP02** customer-satisfaction program; names kit p/n **0000-8F-Z34**,
    install instructions via MXConnect Accessory eCatalog, and a public eCatalog PDF link
    (see §4). [saved]
  - `MC-10134920-9999.pdf` = SA-008/18 center-display spider-cracking (context). [saved]
  - `MC-10129565-9999.pdf` = **TSB 09-001/18** navigation-SD-card cold-repro defect; lists
    SD-card kit p/n **0000-8F-Z09E** (16 GB). [saved]
- **[S-03] Mazda EU dealer portal** `portal.mazdaeur.com` / `mazdashare.com/mtds` — official
  EU "Mazda Technical Download Server" — **ALIVE but PAID/registration-gated** (register as
  "Independent Operator", pay time-based access) — trust HIGHEST but limited. Per S-13 a
  user who paid found **only** `cmu150_EU_70.00.100A_failsafe.up`,
  `cmu150_EU_70.00.100A_reinstall.up`, `cmu150_EU_74.00.311A_update` for Mazda 3 — i.e. NOT a
  full back-catalogue. [wb-m3r-official-fw-download-eu-245120.html]
- **[S-04] Ameridan's `2018_Connect_CMU_Software_Update_Procedure` / "FIRMWARE CMU UPDATE
  PROCEDURE-WORLDWIDE" PDF** (MME/E004/17, dated JUNE 2018) — the actual dealer update
  procedure, distributed with the files — ALIVE (wordpress + mirrors) — trust HIGH.
  [ameridan-firmware-cmu-update-procedure-worldwide-2018.pdf, already in downloads/ameridan/]

**Community knowledge bases (high trust for facts, secondary for files)**

- **[S-05] mazda3revolution.com "MZD I connect firmware info/hints"** (thread 236211, by
  Tristan-cx5, first posted 2019-08, maintained) — the single best plain-English explainer
  of region codes, suffix letters, update rules. ALIVE. [wb-m3r-…-236211.html]
- **[S-06] mazda3revolution.com "Mazda-MZD Connect FIRMWARE Downloads-UPDATED"** (thread
  180578, by ASH8) — original file index; download links long since stripped by Mazda DMCA;
  page-1 reference text intact. ALIVE. [wb-m3r-firmware-downloads-updated-180578.html]
- **[S-07] mazda3revolution.com "NEW 74 Mazda CONNECT MZD Firmware, CP/AA, WCP, Help"**
  (thread 236775, by ASH8) — current distribution hub: files now only via **private message
  to @ASH8** (he sends a MEGA link + instructions), never posted publicly. ALIVE.
  [wb-m3r-new-74-firmware-236775.html]
- **[S-08] mazdas247.com "DIY - Mazda Firmware Update Information"** (thread 123881478) +
  "70.00.367 EU N or 74.00.324A EU N download link" (123883736, closed with no links) +
  "Mazda Connect Firmware 74.00.230A (now .324A)" (123875753) — files via PM to @Candurin;
  public links dead. ALIVE. [WebFetch summaries]
- **[S-09] forum.miata.net "GENUINE MAZDA Car Play+Android Auto Install Instructions
    UPDATED"** (t=679114, by ASH8, "Updated October 2, 2018") — the canonical ND MX-5 retrofit
    post: per-region 70.00.021 filenames + cable/hub part numbers + MME release facts.
    ALIVE (Wayback 2025-02-07 captured). [wb-miatanet-679114-showthread.txt]
- **[S-10] 21stcenturyfiat124spider.wordpress.com (Ameridan)** — the Fiat-specific bible;
  many posts archived under `research/archive/ameridan/`. Key ones: "Replacing the CMU…"
  (2018-04-30), "New Fiat firmware is showing up" (2018-04-22), "Universal Version 70 Fiat
  AIO Tweak" (2019-02-18), "PRESERVE YOUR ABILITY TO TWEAK … v2.0" (2019-05-20), "V70 & V74
  Tweaks without ID7 … YES YOU CAN" (2025-05-25), "firmware versions" chart page. ALIVE.
- **[S-11] 124spider.org "Firmware Files Download Locations"** (thread 45543, by
  AegirTheLucky, first posted 2025-01-28) — a live community re-host: a **Google Drive
  folder** `drive.google.com/drive/folders/1FSOxXVccKppRURPqZVayfulACGOQW-3Q` that currently
  contains `cmu150_NA_74.00.324A_update.up`, the worldwide procedure PDF, and a "README
  FIRST" PDF; plus per-region NA/EU/ADR links in the first post (rendered as text links, not
  raw URLs in the archive). ALIVE 2026. [wb-124spider-firmware-files-download-locations-45543.html]
- **[S-12] 124spider.org** other threads: "file-for-70.00.100" (44172), "cmu-firmware-
  v70.00.100-eu" (42393), "MazdaToFiat70AIO … 70.00.335C or 70.00.352B Success" (38004),
  "carplay-update" (45057, HTTP 410 gone), "Version 74.00.324 CMU Firmware Discussion"
  (45963), "Update my CMU and now i have Mazda (HELP)" (45814). Files always change hands by
  PM ("Sent!"), never public links. Mixed archive success.
- **[S-13] 124spider.uk (Stuart Clark)** — UK vendor + free knowledge: `/blog/124-spider-cmu-
  firmware-updates` (2020-03-05, recommends **70.00.100 and NOTHING NEWER**) and `/support/
  firmware-updates` (full serial-connection ID7 walk-through). Also sells a kit (see §5,§7).
- **[S-14] mikele85.ru + drive2.ru (Russian)** — list EU firmware span
  `cmu140_EU_30.00.100A … cmu150_EU_74.00.324A`; a drive2 build-log documents installing
  `cmu150_EU_74.00.324A_update.up` (archive `74.00.324A EU N.zip`, hash file
  `HASH Value 150_EU_74.00.324A`, MD5+SHA utility bundled) direct **JP 59.00.332 → EU
  74.00.324** to add Russian. Files via digsft.store (paid) / Telegram / Yandex Disk.
- **[S-15] mx5oc.co.uk (UK MX-5 club), mx5life.com, cx3forum(s), mazda6club.com** — regional
  mirrors of the same ASH8 material; files by PM. mx5blog.co.uk documents a real
  **70.00.367 EU N → 74.00.324 EU N** single-file upgrade (2023-07-16). ALIVE.

**Paid resellers (files are Mazda's; sellers charge for delivery+support)**

- **[S-16] navi-world.com** — per-region product pages, **€29–39** each, emailed within 24 h,
  ~2.2 GB EU file + PDF. Sells 70.00.100 EU (€29.99), 70.00.335 NA/ADR (€31), 70.00.367 EU
  (€31, 32 reviews), 74.00.324 EU/NA/ADR (€39). Also Fiat-specific nav + an ID7_Recovery
  serial service (§6). Trust: commercial, mostly-positive reviews; files are genuine Mazda.
- **[S-17] mazdafiles.com** (Gumroad, "nathanair") — **$10–15** each, single `.up`, Gumroad
  checkout. 70.00.367 ADR, 74.00.324 NA/EU/ADR, 70.00.100 EU listed. EU 74.00.324A page
  states direct-update-from list (see §3). Trust: commercial reseller of Mazda files.
- **[S-18] satnavishop.co.uk (£34.99–39.99), latestsatnav.co.uk (£34.99), eBay
  (357238093435 etc.), gumtree** — UK resellers; some list Fiat/Abarth 124-branded
  70.00.100 / 74.00.324 "+ Support". eBay "FIAT & ABARTH 124 Spider Firmware Update
  74.00.324 EU N + Support" is live. Trust: commercial; buyer-beware, files are Mazda's.
- **[S-19] AliExpress** — kits ship with a firmware link/USB; one MX-5 owner (S-15) used "a
  working link from AliExpress" to get 70.00.110→70.00.367A. Trust LOW (region/complete-set
  risk; ASH8 & others warn AliExpress/YouTube files are often wrong-region or incomplete).

**Dead / neutralised**

- **[S-20] `my.hidrive.com/share/hsodpqja`** (Modfreakz server) — was THE canonical free
  index (folders per region: `Mazda_Firmware/NA N`, `EU N`, `4A N (ADR)`, plus per-version
  subfolders and a `y Checksum` folder). **DEAD since ~2021-2022** (403 / drive deleted) per
  many posts. Its folder/file naming is preserved verbatim in S-09 and the Shopify PDS PDF.
- **[S-21] odysee.com** copy "FIAT 124 CarPlay Android Auto FILES" (DanB, 2017) and various
  MEGA links — mostly dead/relocated.
- **[S-22] `s3.amazonaws.com/tsd.mazdausa.com/…/cmu150_NA_74.00.230A_update.up`** was posted
  openly on mazdas247 (Bingoy, 2021); still resolves — same live NA CDN as S-01.
- **[S-23] Scribd "EU N CMU HASH Value"** (doc 838112560) — exists but body not extractable
  without login; would hold EU hashes.
- **[S-24] GitHub `drone540/mazda-firmware-changelogs`** — changelog text only (no binaries),
  covers 55.x/59.x/70.00.021/70.00.000; missing 70.00.1xx+. **[S-25] GitHub `mzd-evo/
  mzd-connect-1-root`** — the 2025 USB-only root method (used by "V70/V74 tweaks without
  ID7"); not firmware itself.

---

## 2. Version table

Region codes (S-05, S-06): **NA** = North America (USA/Canada/Mexico/Puerto Rico); **EU** =
Europe/UK/Russia/Israel/Turkey; **ADR** = "4A N" on screen = Australia/NZ/Middle East/
Asia-Pacific/South Africa/South America/Oceania; **JP** = Japan only. The trailing **"N"** in
"NA N / EU N / 4A N" = the **NNG** SatNav protocol; **"M"** (e.g. "JP M") = the *Matsukone*
(Zenrin) SatNav protocol used only in Japan. Earlier/generic units may show **"MAZ"** (no
region) or no letters. Suffix letters **A/B/C** = sequential minor revisions of the same
version number (later letter = newer; e.g. 70.00.335C newer than 70.00.335). "N"/"M" are NOT
the same kind of letter as A/B/C — one is nav-protocol, the other is revision. (S-05, S-06)

File-type meaning: **`_failsafe.up`** = small recovery/bootstrap package (~7 MB), installed
FIRST; **`_reinstall.up`** = the large main OS payload (~0.9–2.3 GB), installed SECOND;
**`_update.up`** = the single-file replacement used from 70.00.335 onward (failsafe folded
in). (S-04, S-05, Shopify PDF S-09)

Filename pattern: `cmu150_<REGION>_<VERSION><letter>_<type>.up` where cmu150 = the head-unit
hardware family (cmu140 exists for older Mazda3). (S-05, S-06)

Sizes/dates marked **[live]** are from S-01 HTTP HEAD on 2026-08-23 (NA objects). Sizes
marked (comm) are community-reported. Hashes: **[dl]** = computed by me on the file I
downloaded from S-01; **(comm)** = community-reported.

| Version | Region(s) | Date (source) | Filename(s) | Size | Hash | What it adds/changes | Tweak/serial status | Availability |
|---|---|---|---|---|---|---|---|---|
| 55.00.753A / 55.00.760A | all | ~2016 (S-24) | cmu150_<R>_55.00.760A_failsafe/reinstall.up | reinstall ~0.9 GB | — | nav-freeze, Pandora, USB/BT playback fixes | tweakable via USB (pre-59.00.502 era) | NA on S-01 (some 403); by PM |
| 56.00.5xx (513/521/530) | NA/EU/ADR/JP | factory 2016–17 (S-05,S-10) | cmu150_<R>_56.00.5xx_… | reinstall ~0.9 GB | — | **factory firmware of 2017 & early-2018 Fiat 124** | **USB tweaks WORK** (pre-lock) | mostly by PM; hard to find |
| 59.00.441A | all | 2016 (S-02 SA-001324) | cmu150_NA_59.00.441A_failsafe/reinstall.up | failsafe 7.05 MB; reinstall ~903 MB **[live]** | — | false SCBS/LDWS warning fix; base for CarPlay-era | last widely-tweakable-via-USB rung; **best sub-59.00.502 target** (S-06) | **S-01 NA [live]** |
| 59.00.502A | NA/EU/ADR/JP | 2017 (S-02, S-10) | cmu150_NA_59.00.502A_failsafe.up + reinstall | failsafe **7,045,747 B [dl]**; reinstall ~906 MB **[live]** | failsafe SHA256 `cfe846acb68af8673f9985370ac1eaa6c58082acba77580668ce67e7619a5f79`; MD5 `46006213b4a7d527036f764403738f6f` **[dl]** | **THE watershed:** patches the Forbes USB-autorun vulnerability → **disables USB tweak side-loading**; stability/BT/USB/iPhone fixes | **★ From 59.00.502 up, USB tweaking is blocked** — need ID7-installed-beforehand or serial. Downgrade floor = 59.00.502. (S-05,S-13) | **S-01 NA [live]**; by PM |
| 59.00.540/544/545A/546A | NA/EU/ADR | 2017–18 (S-02,S-24) | cmu150_<R>_59.00.545A_failsafe/reinstall.up | failsafe **7,061,576 B [dl]**; reinstall ~894 MB **[live]** | 545A failsafe SHA256 `79168c8c2359495d5ecb9927b5dddc80062b7f52020b3e8a63656501b7f2e427`; MD5 `bbdc6c1048b7cd8320098b2afa8cf12b` **[dl]** | Pandora, i-ELOOP, album-art, speed-limit, TSR, memory-seat, rear-cam brightness (compliance) | post-.502 → tweaks need ID7/serial; **545 is the recommended target if you WANT the AIO Android-Auto tweak** (S under old-v56 thread) | **S-01 NA [live]** |
| 59.00.524 | EU/NA/ADR (**124-only** per S-10 chart) | late-2018 (S-10) | cmu150_<R>_59.00.524_… | ~0.9 GB | — | **Fiat/Abarth-specific build** shipped on later-2018 124s | post-.502 lock; no CarPlay | by PM only |
| 59.00.562 / 59.00.563 | EU/NA/ADR (**124-only** per S-10 chart) | 2019 (S-10, S-12) | cmu150_<R>_59.00.56x_… | ~0.9 GB | — | **factory firmware of 2019 Fiat/Abarth 124** (`562`/`563`) | post-.502 lock; **⚠️ "latest Fiat firmware" trap** — no native CarPlay, tweak-locked | factory-installed; not a download target |
| 70.00.000A (beta) | EU (beta) | 2018 (S-10, S-24) | — | — | — | **first build with CarPlay/Android Auto code** (EU beta, written for the retrofit hub) | — | not distributed; superseded |
| **70.00.021A/B** | NA=**B**, EU/ADR=**A** | 2018 (S-09) | cmu150_NA_70.00.021B_failsafe.up + reinstall; cmu150_EU_70.00.021A_…; cmu150_ADR_70.00.021A_… | NA failsafe **7,089,899 B [dl]** (reinstall ~925 MB **[live]**) | 021B failsafe SHA256 `8835f4444cb0d05d2ad6c973e95fdf62ec1be28946a5f32121ac19b9ff830ee1`; MD5 `d342b61016901cec7e7a61d71d53c53b` **[dl]** | **first PUBLIC CarPlay/AA firmware**; "the one you actually want is 70.00.021A or higher" (S-10). Retrofit hub is recognised from here up. | tweakable if ID7 present; failsafe+reinstall two-file | **S-01 NA [live]**; miata.net canonical (S-09) |
| **70.00.100A** | NA/EU/ADR | 2018-09 (S-01 [live] Last-Modified 2018-09-28) | cmu150_NA_70.00.100A_failsafe.up + reinstall.up (+ EU/ADR variants) | NA failsafe **7,088,769 B [dl]**; NA reinstall **925,592,239 B (~925 MB) [live]**; EU reinstall ~2.3 GB; ADR ~1.8 GB (comm) | **NA failsafe** SHA256 `ef9964509d81d47c1fcae35748096fe7021a9ea15b670acf5675a48679ddbccf`, MD5 `9324d1907c2c722738b0a389de73e91d` **[dl] — matches community MD5 (S, black-screen thread)**. NA reinstall MD5 `DA7667967E62E324C4EF457DE4A262BF` / SHA1 `8C0C6608B229A1079D8F467816687B900D996EA7` (comm). EU failsafe MD5 `cc485f4f16541cd803f615df42dc3512`, EU reinstall MD5 `d5c042588b5de7f0d72e02b03ec78590` / (also seen `279f1b81e1fa43b1b43ea1af38aab834`) (comm ❓ two EU reinstall MD5s reported — verify). ADR failsafe MD5 `46D7A81AF84845EEA30557146221F303`/SHA1 `0FD9A6F9708264AAC5AB734E5BA01F7245C01B08`; ADR reinstall MD5 `AFB5CF9AC044459C2A494C6B1EB46DD9`/SHA1 `3AE99E08B99101F4090214541AEF366CED5FCB1A` (comm) | **certified CarPlay/AA target; the version the whole Fiat 124 community standardised on.** Adds AA(non-AIO), CarPlay; last "failsafe+reinstall" two-file build. | **★ HIGHEST version that still lets you side-load the Fiat logo + nav fix (MazdaToFiatV70AIO) afterwards** if ID7 present. Ameridan/124spider.uk: "use 70.00.100 and NOTHING NEWER". | **S-01 NA [live]**; S-11 GDrive; by PM; resellers |
| 70.00.110 | NA/EU/ADR | 2018–19 (S-02 TSB, S-17) | cmu150_<R>_70.00.110_update.up | ~0.9–2.3 GB | — | USB-audio device support (SONY NW-A45/A35); some 2018 CX-3 needed **70.00.137** for AA | still two-file-era-ish/one-file transitional | resellers/PM |
| 70.00.130 / 70.00.137 / 70.00.150A | NA/EU/ADR | 2019 (S-17, S-12 cx3) | cmu150_<R>_70.00.150A_update.up | — | — | interim bug-fix builds; 70.00.137 cited for CX-3 AA | can update directly to 74.00.324A (S-17) | resellers/PM |
| **70.00.335C** | NA/EU/ADR | **2019-05-01** (S-01 [live] Last-Modified 2019-04-30; TSB 09-022/19 06/06/19) | cmu150_NA_70.00.335C_update.up; EU/ADR variants | NA **964,830,856 B (~920 MB) [live]**; EU 2.3 GB; ADR 1.8 GB (comm, Shopify PDF S-09) | EU 335C update MD5 `4980D1E107A37209F4D7FE42803EFB3E` / SHA1 `03E4C336385501FEBC09AE4E81C3538423B60EFB` (comm) | **First SINGLE-file `update.up`** (Fail-Safe package removed; menu says "Update package"); Gracenote, CarPlay brand-icon, BT echo fix, Android-Pie compat | **★★ Introduces the `neutralizeid7` script — permanently removes ID7 backdoor AND kills serial access unless ID7v2 installed BEFOREHAND.** Universal-V70-Fiat-tweak will NOT run on 335/352. (S-10 "Preserve v2.0", S-05) | **S-01 NA [live]**; navi-world €31; PM |
| **70.00.352B** | NA/EU/ADR | **2019-12-19** (S-01 [live]; TSB re-issue 12/19/19; NA "~2020-01-05") | cmu150_NA_70.00.352B_update.up; EU/ADR | NA **964,837,250 B [live]** | — (comm hashes exist) | SiriusXM dropout fix, Mazda6 black-screen (further), BT echo. "zero changelog" per some | same neutralizeid7 as 335; **AIO tweaks OK up to 352 if using AIO 2.8.6 + ID7v2**; NOT 367 (S-12 #38004) | **S-01 NA [live]**; navi-world; PM |
| **70.00.367A** | NA first (2020-06), EU N ~2020-09, ADR (4A N) later | NA 2020-06 (S-01 [live] Last-Modified 2020-06-10); EU N Sep 2020 (S) | cmu150_NA_70.00.367A_update.up; cmu150_EU_70.00.367A_update.up; cmu150_ADR_70.00.367A_update.up | NA **967,219,802 B (~967 MB) [live]**; EU ~2.3 GB | **NA 367A** MD5 `648dc7443ba99af8abd483f20673c295` / SHA1 `19398226a7cdad3a632a78fb183b7420482d0b90` (comm, widely confirmed). EU 367A hashes: NOT found (see Scribd S-23). | back-camera translation, maintenance-counter, speed-limit (needs map 18Q4+), phone-number-with-pause, Gracenote | **★★★ Last v70; reportedly CANNOT be serial-enabled at all — no ID7/tweaks possible; Fiat/Abarth rebrand impossible.** Same `neutralize_ID7.sh` as 335C. Downgrade to 352/335 needed to tweak. (S, thread 240820; S-10) | **S-01 NA [live]**; navi-world €31 EU; mazdafiles $15 ADR; ships with some AliExpress kits |
| **74.00.230A** | NA/EU/ADR | 2021-03 (S-01 [live] Last-Modified 2021-03-05) | cmu150_NA_74.00.230A_update.up; EU/ADR | NA **968,212,898 B [live]** | NA MD5 `29151b83ba3f77b898a5c94e05cc69cd` / SHA1 `91bbc5af672f2ccdbee95375077b40c56742e2b8` (comm) | first v74; SiriusXM(US 2019-21) fixes; "Wireless CarPlay included in all 74.xx **but needs a 2021 wireless-capable CMU (~$999)**, not enabled by firmware alone" (S-10) | tweak-locked like 367; v74 later cracked by mp3/XSS method (2025) | **S-01 NA [live]**; PM |
| 74.00.311A | NA/EU/ADR | 2022-05 (S-01 [live] Last-Modified 2022-05-19; TSB 09-021/21) | cmu150_NA_74.00.311A_update.up; EU 74.00.311A_update | NA **968,191,040 B [live]**; EU ~0.9–2.3 GB | — | CarPlay driver-side-speaker fix, temp-warning, time-accuracy | **downgrade floor rises: from ≥74.00.310 you can only go back to 74.00.310, not below** (S, black-screen thread) | **S-01 NA [live]**; EU on portal S-03; PM |
| **74.00.324A** | NA/EU/ADR (**final**) | **2022-11-16** (S-01 [live] Last-Modified); ADR added 2023-03 (S-08) | cmu150_NA_74.00.324A_update.up; cmu150_EU_74.00.324A_update.up; cmu150_ADR_74.00.324A_update.up | **NA 1,003,179,676 B (~1.00 GB) [live+dl]**; EU **~2.3 GB** (comm); ADR ~1.8 GB | **NA** MD5 `49c7c7a834ca40cbbbb68f29ee696475` **[dl] — EXACT match to community MD5 `49C7C7A834CA40CBBBB68F29EE696475` (S-08)**; SHA1 `975935BD09E9EA90CFEC22AE87D66B310A2242E3` (comm). **EU** MD5 `9B841BC807A5010A8652BB3B9E894F91` / SHA1 `3aa55dadc8d59fadb0c69af17444447b097baf18` (comm S). | **the last-ever MZD-Connect-1 firmware** (production ended 2024). ~50 fixes over v70. Full CarPlay+AA (wired). | tweak-locked from factory; **mp3/XSS root method (2025, mzd-evo) restores tweaks without ID7/serial** (S-10 2025 post, S §252435). AIO OK on 324 but **NOT on 74.00.331** (breaks wireless CarPlay). | **S-01 NA [live+downloaded]**; S-11 GDrive (NA); navi-world €39; mazdafiles $10–15; PM |
| 74.00.331 | NA/EU/ADR | ~2024-2025 (S) | cmu150_<R>_74.00.331A_update.up | — | — | newer than 324; discovered via Reddit; minimal info | **⚠️ installing AIO tweaks on 74.00.331 may disable wireless CarPlay** (S-10, S §252435) | rare; PM |

Note: NA objects for **70.00.021A** (the *A* letter), **70.00.110/130/150**, **74.00.200/331**,
**55.00.760**, **56.00.513** returned **403** on S-01 (either the NA build carries a different
letter — NA used 021**B** not 021A, per S-09 — or those specific objects aren't in the open
path). All confirmed-present NA objects are listed with **[live]** sizes above.

---

## 3. Upgrade-path rules (by starting version & region)

Consolidated from S-04 (dealer PDF), S-05, S-07, S-16/S-17 product pages, S-08. Always use
**your own region's** files — wrong region ⇒ brick risk (S-05, S-06). Remove the nav SD card
before updating; do not switch ignition off mid-update (S-04).

1. **< 31.00.100** (very old Mazda3 only): install **31.00.100A** (failsafe+reinstall) first,
   then proceed. (S-05, motrade PDF)
2. **31.00.100 … 59.00.560A (incl. 55.x, 56.x, 59.x, and all Fiat 124 factory builds)**:
   you MUST pass through **70.00.100A** as a two-file step — install
   `…70.00.100A_failsafe.up` FIRST, then `…70.00.100A_reinstall.up` SECOND — before any
   70.00.3xx/74.xx. (S-04, S-05, S-16 70.00.100 page, motrade PDF). Direct single-file jumps
   from ≤59.x to 74.00.324 are **not** supported for the two-file era. ❓ One reseller
   (mazdafiles EU 74.00.324A page, S-17) claims "direct from any 59.00.xxx or 56.00.100A+"
   — contradicts the dealer rule; treat as reseller optimism, verify. (mainstream community
   rule = go via 70.00.100 first.)
3. **≥ 70.00.021A (any 70.00.021/100/110/130/150/335/352/367 or any 74.xx)**: you can update
   **directly, single file**, to the latest **74.00.324A** for your region. (S-05, S-07,
   S-17, S §mzd-i-connect: "if below 70.00.021A → two-step; else direct"). Example from real
   MX-5: 70.00.367 EU N → 74.00.324 EU N, one file (S-15 mx5blog).
4. **From 70.00.021A up you can also go directly to 70.00.367A with the single
   `_update.up`** (no failsafe needed) — confirmed (S thread 240820: "70.00.100A 2 files, then
   70.00.367A 1 file").
5. **Failsafe requirement:** needed only for **≤ 70.00.110**; from **70.00.335** onward the
   Fail-Safe package was removed and every build is a single `update.up`. (S-02 TSB, S-05,
   navi-world procedure page).
6. **Downgrade floors (critical):** you can downgrade via the normal update flow only down to
   **59.00.502** (from any 70.x). From **74.00.310+ you can only go back to 74.00.310**, not
   into v70 — unless you use the SPI-flash `.bin`/rescue method. (S, black-screen thread
   #229891; S §252435). Below 59.00.502 downgrade is possible but pointless (and re-locks
   tweaks anyway).
7. **Cross-region / imported cars:** you *can* flash another region's CMU firmware (e.g. JP→EU
   for language) but the **TAU tuner module** keeps the original region's radio frequencies
   (AM/FM/DAB) — no firmware fixes that; needs a TAU swap. (S-05). Ameridan: choosing the
   correct-region 70.00.100 reprograms FM/DAB/HD tuning appropriately for the CMU side (S-10).
8. **Tweak/serial gates along the path (the "point of no return"):**
   - < 59.00.502 → tweaks install straight from USB (just ID7/Autorun).
   - 59.00.502 … 70.00.100 → USB tweaks blocked; need **ID7 via serial** beforehand; ID7
     survives updates up to & incl. 70.00.100.
   - 70.00.335 / 70.00.352 → carry `neutralizeid7`; need **ID7v2** (serial) installed
     *before* the update or you lose all tweak/serial ability.
   - **70.00.367 / all 74.xx → serial reportedly dead; no ID7 possible.** Only escape (2025):
     the **mp3/XSS USB root method** (mzd-evo) which works on v70 and v74 with a connected
     TAU — no serial, no ID7. (S-10 2025, S §252435).

---

## 4. Official / dealer material found

- **Dealer update procedure:** "MZD-MAZDA Connect CMU Firmware Update Procedure", ref
  **MME/E004/17**, dated **JUNE 2018**, "All Models with MZD Mazda Connect, WORLDWIDE"; two
  variants (full 9-page + one-page). This is the exact PDF bundled with the files; 30 steps;
  brake/clutch every 25 min. [S-04; saved as
  ameridan-firmware-cmu-update-procedure-worldwide-2018.pdf; also downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf]
- **CarPlay/AA retrofit — official channel & TSBs:**
  - **TSB 09-024/16** and **SA 001324 (2016)** — 59.00.441 rollout (S-02).
  - **TSB 09-022/19** ("AUDIO, NAVIGATION AND PHONE CONCERNS WITH MAZDA CONNECT") — the master
    changelog TSB; update targets stepped 70.00.335C (06/2019) → 70.00.352 (12/2019). Later
    revisions: **09-030/20** (74.00.230), **09-021/21** (74.00.311), **09-018/22**
    (74.00.324). All on NHTSA (S-02). These are the closest thing to an official changelog.
  - **CarPlay/AA retrofit dealer memo (MC-10144323-9999):** kit **p/n 0000-8F-Z34**,
    Customer Satisfaction Program **CSP02** (free on 2018 Mazda6 Touring+; $199 MSRP on
    Sport). Install instructions: **MXConnect → Accessories → Accessory eCatalog → p/n
    0000-8F-Z34**, and a public eCatalog PDF is even linked:
    `https://ecatalog.trademotion.com/content/itemDocuments/1014/MAZDA6%20SCREEN%20MIRROR%20C922%20V6%20605.pdf`
    (dealer screen-mirror/cable install sheet). (S-02)
  - Miata.net (S-09): **Mazda Motors Europe released CP/AA from 2018-08-06**, **€220 parts /
    €360 parts+fit** at EU dealers; **MNAO** released it via the 2018-Mazda6 program.
    Firmware prerequisite everywhere: **v70.00.021 or later**, installed FIRST; hub cannot be
    updated after fitting.
- **Retrofit hardware part numbers (for cross-reference; hardware is Theme's neighbour):**
  AUX hub **TK78-66-9U0C** (same worldwide; must be the "C", orange label, made in Japan —
  not KD5J green = China-only, not A/B). USB cable sets are region-specific: **C922-V6-605(A)**
  = NA, **C830-V6-60Z** = EU, **C924-V6-605** = ADR (interchangeable in practice, per S-09).
  NA all-in kit p/n **0000-8F-Z34**. Nav-SD-card defect kit **0000-8F-Z09E** (16 GB). (S-02, S-09)
- **Official downloads:** NA dealer CDN (S-01) is public-per-object; EU is the paid
  `mazdashare.com/mtds` portal (S-03); Mazda intends updates to be dealer-only ("should not be
  performed by do-it-yourselfers", every TSB).

---

## 5. Fiat-specific firmware facts

- **FCA/Fiat never released a v70+ firmware, and no CarPlay/AA firmware, for the 124 Spider.**
  Ameridan (S-10) and 124spider.uk (S-13): "Fiat hasn't made ANY firmware updates available
  for the 124 in Europe"; the ONLY Fiat move was a **North-American 59.00.5xx** update.
  Owners therefore use **Mazda** firmware + the `MazdaToFiatV70AIO` re-brand tweak.
- **Fiat 124 factory firmware by build:** 2017 & early-2018 cars = **v56 (56.00.521 /
  56.00.530)**; later-2018 = **59.00.524**; **2019 (& 2020) = 59.00.562 / 59.00.563**
  (NA/EU/ADR variants). Ameridan's chart (image, saved
  `ameridan-firmware-versions-contd4.png`) explicitly marks **59.00.524 and 59.00.562 as
  "124spider only"** builds (EU*/NA*/ADR*). (S-10)
- **The "latest Fiat firmware" trap (confirms CLAUDE.md):** 59.00.502 and everything above it
  (524, 562, 563) **blocks USB tweak side-loading** (Forbes USB-autorun patch) and offers **no
  native CarPlay/AA**. A 2019 Abarth on 59.00.562/563 must do the **serial ID7 hack** (dash
  out) OR the 2025 mp3 method before it can be tweaked, then still needs the Mazda v70/v74
  firmware + hub for CarPlay. So "update to newest Fiat firmware" is a dead end. (S-10, S-12,
  S §255-era posts)
- **No Fiat-branded `.up` firmware file exists to download.** What the community distributes
  is **Mazda** `.up` files + Ameridan's `MazdaToFiatV70AIO.zip` (re-brand/logo/nav script) —
  already in `downloads/ameridan/`. There is NO way to "downgrade to Fiat firmware" because
  none past v59 was ever made (Ameridan, S-10 "Preserve v2.0").
- **After flashing Mazda firmware you lose:** Fiat/Abarth boot animation, the "Sent from my
  Mazda…" reply signature customisation, and **factory navigation stops working** — the
  Bluetooth device name also changes to "Mazda" (re-pair phones). All restorable only via
  MazdaToFiatV70AIO **and only if tweaking is still possible** (i.e. you stayed ≤70.00.100 or
  installed ID7 first). (S-10, S-12 "rebranding does not happen" thread — the #1 support
  failure is skipping the ID7 step, which then requires the serial hack to fix.)
- **Fiat resellers:** navi-world sells Fiat-124-branded firmware/nav; 124spider.uk (£150 kit,
  £140 fit) bundles firmware + hub + ID7 + rebrand with "exclusive instructions"; eBay/gumtree
  UK sellers list "FIAT & ABARTH 124 Spider Firmware 70.00.100 / 74.00.324 + Support". These
  repackage Mazda files for Fiat owners. (S-16, S-13, S-18)

---

## 6. Navigation SD-card facts

- **Fiat vs Mazda SD are different part numbers and are NOT freely interchangeable.**
  - Fiat 124 NA card: **DD1B-66-EZ1** = MOPAR **68366118AA** / **6833417AA** / Toyota-Scion
    **PTMZD-1M160** (shared platform). Fiat EU card: **NA4N66EZ1A**. (S-16 navi-world, S-12
    threads 40741/40774)
  - Mazda MX-5 cards: **BHP1-66-EZ1x** (…EZ1N/…EZ1J/…EZ1U by year, USA), **TD2K66EZ1**
    (clone-sold). (parts.mazdausa.com; S-12)
  - Real-world: a 124 owner tried a **Mazda MX-5 BHP1-66 card and it did NOT work** in the
    Fiat; had to buy the Fiat DD1B-66-EZ1 from a Fiat dealer. So despite the shared hardware,
    **card ≠ swappable Fiat↔Mazda** in practice. (S-12 thread 40774)
- **VIN lock:** a nav card locks to the car's VIN after ~100 km of driving with it inserted;
  cannot then be moved to another car. Cheap eBay/Amazon clones are frequently flagged
  **"counterfeit / Invalid SD Card"** by NaviExtras/Mazda Toolbox and refused updates.
  (S-12 40741; S-02 SA references MT-001/18 + VIN-lock check).
- **Compatibility with v70 Mazda firmware:** installing Mazda v70 firmware **breaks factory
  navigation** because it swaps the NNG nav component. Ameridan's fix ("Fix Navigation for
  Version 70 firmware", 2019-01-31) = **replace the Mazda v70 `NNG` folder with the v56/59
  Fiat `NNG` folder** so the Fiat card works again (`Fix_ver70_NNG.zip`, already in
  downloads/ameridan/). A working card's `license` folder holds `device.nng` +
  `visteon_mazda…`. (S-10, S §nav-fix; S-12).
- **Map updates today:** **Fiat Toolbox was discontinued 2024-03-01** — no more official Fiat
  map updates, and Fiat cancelled all online-services subscriptions (traffic). navi-world
  (S-16) now sells 2024/2025 map data for the 124: if firmware < 59.00.502 they can do it
  directly; if ≥ 59.00.502 (or on Mazda v70) they require **CMU Serial Access** or an
  ID7-patched car, and supply a small "nav substitution" USB tweak so the CMU accepts the new
  card. Several 124 owners confirm 2024/2025 maps now working via navi-world. (S-16, S-12
  thread 45713). Mazda side still updates via **Mazda Toolbox** (mazdausa.com Owners portal).

---

## 7. Open questions / lost or uncertain material

- **EU & ADR object paths on the Mazda CDN (S-01):** NA objects are open; EU/ADR return 403.
  Are EU/ADR files under a different S3 key prefix, or genuinely locked? Worth probing more
  key patterns (e.g. region-folder variants) — EU/ADR owners currently must use S-03 (paid),
  resellers, or PM. **The maintainer's car is EU** → this is the key gap for this project.
- **EU/ADR hashes are thin.** Confirmed community hashes: EU 70.00.100A (two MD5s reported ❓),
  EU 70.00.335C update, EU 74.00.324A (MD5+SHA1), ADR 70.00.100A. **Missing:** EU/ADR
  70.00.021, EU/ADR 70.00.367A, ADR 74.00.324A, all EU/ADR 74.00.230/311. The Scribd "EU N
  CMU HASH Value" doc (S-23) likely has them but is login-gated — retrieve it.
- **❓ Two different MD5s reported for `cmu150_EU_70.00.100A_reinstall.up`**
  (`d5c042588b5de7f0d72e02b03ec78590` vs `279f1b81e1fa43b1b43ea1af38aab834`). One is likely a
  different revision or a corrupted/tweaked copy — must reconcile before calling either
  "verified". A German installer even hit "Invalid packet certificate" on an EU 70.00.100A
  reinstall from 56.00.521 (S §howto) — possibly a partial/patched file.
- **70.00.367 serial-lock certainty:** widely stated that 367/74.x cannot be serial-enabled
  at all, but the 2025 **mp3/XSS root method** (mzd-evo) reportedly restores tweaking on v70
  *and* v74 without serial. Need to confirm whether that also lets a 124 owner who is *already
  stuck on 367/74* install the Fiat rebrand + nav fix retroactively (it appears yes, via a
  connected TAU) — this would rewrite CLAUDE.md's "point of no return" disclaimer. HIGH VALUE
  to verify on hardware.
- **JP firmware:** essentially unobtainable publicly ("JP = no firmware available", S-05); JP
  cars use SatNav protocol **M**. JP owners are told to flash NA/EU/ADR instead (accepting TAU
  frequency mismatch). Not relevant to the 124 (never sold in JP) but explains the "M vs N"
  letter.
- **Dead first-party index:** the Modfreakz **HiDrive** server (S-20) that once held the full
  regional back-catalogue + a `y Checksum` folder is gone; its exact folder tree survives only
  inside S-09 / the Shopify PDF. If a Wayback/other mirror of that HiDrive tree exists it would
  recover every EU/ADR hash at once — not yet located.
- **Exact EU/ADR file sizes:** only NA sizes are HEAD-verified [live]. EU reinstall commonly
  cited ~2.3 GB, ADR ~1.8 GB, but per-version EU/ADR byte counts are unconfirmed.
- **74.00.331 status:** newer than 324 but almost undocumented; breaks AIO/wireless CarPlay.
  Is it a real public release or dealer-only? Unclear.
- **Reseller update-path claim** (mazdafiles EU 74.00.324A "direct from 59.x/56.x", S-17)
  contradicts the dealer two-file rule — do not adopt without a first-hand success report.

---

## Files collected locally this session

Downloaded from S-01 (Mazda USA CDN) into `downloads/firmware/NA/` (git-ignored). SHA256 to be
appended to `downloads/CHECKSUMS.sha256` and recorded in `INVENTORY.md`:

| file | bytes | SHA256 | MD5 | note |
|---|---|---|---|---|
| cmu150_NA_59.00.502A_failsafe.up | 7,045,747 | cfe846acb68af8673f9985370ac1eaa6c58082acba77580668ce67e7619a5f79 | 46006213b4a7d527036f764403738f6f | pre-CarPlay; watershed lock version |
| cmu150_NA_59.00.545A_failsafe.up | 7,061,576 | 79168c8c2359495d5ecb9927b5dddc80062b7f52020b3e8a63656501b7f2e427 | bbdc6c1048b7cd8320098b2afa8cf12b | AIO-AA-tweak target |
| cmu150_NA_70.00.021B_failsafe.up | 7,089,899 | 8835f4444cb0d05d2ad6c973e95fdf62ec1be28946a5f32121ac19b9ff830ee1 | d342b61016901cec7e7a61d71d53c53b | first public CarPlay fw |
| cmu150_NA_70.00.100A_failsafe.up | 7,088,769 | ef9964509d81d47c1fcae35748096fe7021a9ea15b670acf5675a48679ddbccf | 9324d1907c2c722738b0a389de73e91d ✓ matches community | the 124 standard target (failsafe half) |
| cmu150_NA_70.00.100A_reinstall.up | 925,592,239 | (see CHECKSUMS.sha256) | da7667967e62e324c4ef457de4a262bf ✓ matches community | the 124 standard target (main half) — **full pair now local** |
| cmu150_NA_70.00.367A_update.up | 967,219,802 | 2c46f3f08ac9f93f72a6e15878eb3230c6a3a6f48ce0e4e1034508170cc8ded4 | 648dc7443ba99af8abd483f20673c295 ✓ matches community | last v70 |
| cmu150_NA_74.00.324A_update.up | 1,003,179,676 | ffd04e2c8cfaf77388aacde0f9c1cddc17cb6b7f02d7caa2fe6ad39c0f40e787 | 49c7c7a834ca40cbbbb68f29ee696475 ✓ matches community | final firmware, single file |

All six SHA256 appended to `downloads/CHECKSUMS.sha256` (still need `INVENTORY.md` entries).
**Every one of the four large NA images whose MD5 the community published matched exactly**
(70.00.100A failsafe+reinstall, 70.00.367A, 74.00.324A) — strong proof S-01 serves clean,
genuine, unmodified Mazda files. **Only NA files** were pulled (maintainer is EU, but NA is
what the CDN serves openly; kept as verified reference specimens). EU/ADR still need a source
(see §7). Total ~2.8 GB.
