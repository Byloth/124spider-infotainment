# INVENTORY — every file, artifact and part

Master inventory for the Fiat / Abarth 124 Spider (2016–2019) infotainment (CMU / "MZD Connect")
CarPlay + Android Auto upgrade project. One row per FILE / ARTIFACT / PART mentioned anywhere in the
raw research notes (`research/raw/A…F`), the local downloads, or the archived pages.

**Compiled:** 2026-08-23. **Nothing here has been tested on a car.** Firmware is proprietary Mazda IP
(takedown / legal risk); this file records *what exists and where*, not a hosting decision.

## Source-id convention

**Two id spaces exist in this repo — both are valid, they point at different files:**

- `[S-nn]` — the deduplicated master index in `SOURCES.md`. Used by `FIRMWARE-MATRIX.md`,
  `PROCEDURE-DRAFT.md` and `OPEN-QUESTIONS.md`.
- `[A-nn]`, `[B-nn]`, `[C2-nn]`, `[D-nn]`, `[E-nn]`, `[F-nn]`, `[C1]` — **this file's** citations, which
  point into the per-theme reports in `research/raw/` (A = 124spider.org forum, B = Ameridan blog,
  C1 = MZD-AIO project (its sources are unnumbered), C2 = firmware×tweak matrix, D = firmware
  availability, E = hardware, F = rollback/failures). They resolve to the "Sources" table at the top of
  the matching `research/raw/<X>-*.md`, which carries the per-post/per-page detail `SOURCES.md` drops.

When you touch a citation here, keep the raw-file id — do not silently renumber to `[S-nn]`.

## Status legend (from CLAUDE.md)

| status | meaning |
|---|---|
| `verified` | SHA256 matches ≥2 independent community hashes **or** obtained from the original author, **AND** VirusTotal-clean. **NOTHING qualifies yet — no VirusTotal lookup has been run.** |
| `verified-pending-AV` | best candidates: hash matches community-reported hash(es); only the VirusTotal step is missing. Used for the NA CDN firmware whose MD5 matches community MD5s. |
| `collected` | downloaded locally, hashed, single source |
| `known-hash` | not collected, but a community hash exists |
| `known-to-exist` | referenced, no hash, not collected |
| `paywalled` | behind a paid/registration wall |
| `lost` | referenced but no live source or copy found |

Other markers: ⚠️ unverified / single report · ❓ contradictory.

## How to add a file

1. Put the binary under `downloads/` (git-ignored).
2. `sha256sum <path> >> downloads/CHECKSUMS.sha256` (path relative to `downloads/`).
3. Add a row to the relevant table below **and** to §8 "Local collection status".
4. When a VirusTotal hash lookup is run and is clean, and a 2nd independent hash matches, promote the
   status to `verified`.

---

## 1. Firmware packages

Filename pattern: `cmu150_<REGION>_<VERSION><letter>_<type>.up`. `cmu150` = CMU hardware family (the
124/MX-5 ND "Connect 1.0" unit; `cmu140` = older Mazda3). Region on screen: **NA N** (North America),
**EU N** (Europe/UK/Russia/Israel/Turkey), **4A N** = **ADR** (Australia/NZ/Middle-East/Asia-Pac/
S-Africa/S-America/Oceania), **JP M** (Japan only). Trailing **N** = NNG/iGO nav protocol; **M** =
Matsukone (JP). Suffix **A/B/C** = sequential revision (later = newer). `_failsafe.up` (~7 MB, install
FIRST) + `_reinstall.up` (main OS, ~0.9–2.3 GB, SECOND) up to 70.00.110; from **70.00.335 a single
`_update.up`** replaces both (failsafe folded in). [D-05][D-04][F "failsafe mechanism"]

**Where-obtainable key:** *Mazda-USA-CDN* = `https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<filename>`
(first-party AWS S3, **NA objects world-readable HTTP 200**, bucket-listing denied, EU/ADR objects 403)
[D-01]; *GDrive* = 124spider.org thread 45543 folders [A-12][D-11]; *PM* = shared by private message on
the forums; *reseller* = navi-world / mazdafiles / eBay etc. [D-16..D-19].

Hashes: **SHA256 [dl]** = computed locally on the collected file (in `downloads/CHECKSUMS.sha256`);
**MD5/SHA1 (comm)** = community-reported. "✓ matches community" = the [dl] MD5 equals the community MD5.

### 1.1 Pre-CarPlay firmware (context; not upgrade targets for CarPlay)

| Version | Region | Filename(s) | Type | Size | Hash | Obtainable today | Status | Notes | Sources |
|---|---|---|---|---|---|---|---|---|---|
| 31.00.100A | all (old Mazda3) | cmu140/150_…_31.00.100A_failsafe/reinstall | failsafe+reinstall | — | — | reseller/PM | known-to-exist | mandatory two-file stepping-stone for units <31.00.100 | [D-05] |
| 55.00.753A / 55.00.760A | all | cmu150_<R>_55.00.760A_failsafe/reinstall.up | failsafe+reinstall | reinstall ~0.9 GB | — | Mazda-USA-CDN (some 403) / PM | known-to-exist | last widely USB-tweakable era; 124 never shipped 55 | [D-24][D-02] |
| 56.00.511 / 56.00.513 | NA/EU/ADR/JP | cmu150_<R>_56.00.5xx_… | failsafe+reinstall | ~0.9 GB | — | PM (hard to find) | known-to-exist | Mazda base of Fiat 56.00.521; 56.00.513 EU rescue .bin exists [F-40] | [B-2.3][D-05] |
| **56.00.521** | NA/EU/4A (JP*) | cmu150_<R>_56.00.521_… | failsafe+reinstall | ~0.9 GB | — | PM | known-to-exist | **factory FW of MY2017 & early-2018 Fiat 124** (Classica/Lusso; NA Abarth). USB-tweakable → install ID7 here | [A-2.1][B-2.2][D-05] |
| **56.00.530** (iter. D) | EU/4A/JP-M (Abarth); NA (2018 Fiat) | cmu150_<R>_56.00.530_… | failsafe+reinstall | ~0.9 GB | — | PM | known-to-exist | Abarth-branded boot; other factory 124 build; USB-tweakable | [B-2.2][A §4] |
| 59.00.441A | all | cmu150_NA_59.00.441A_failsafe/reinstall.up | failsafe+reinstall | failsafe 7.05 MB; reinstall ~903 MB [live] | — | Mazda-USA-CDN (NA) | known-to-exist | Service Alert 001324 (NHTSA MC-10186917); best sub-.502 target | [D-02][D-06] |
| 59.00.443 – 59.00.449 | all (Mazda) | cmu150_<R>_59.00.44x_… | failsafe+reinstall | ~0.9 GB | — | PM | known-to-exist | **last USB-tweakable Mazda builds** (autorun removed at .502) | [B-2.3][C2-mtx] |

### 1.2 The 59.00.502+ lock wall (point-of-no-return #1) and Fiat 59.00.5xx

| Version | Region | Filename(s) | Type | Size | SHA256 [dl] | MD5/SHA1 (comm) | Obtainable today | Status | Notes | Sources |
|---|---|---|---|---|---|---|---|---|---|---|
| **59.00.502A** | NA/EU/ADR/JP | cmu150_NA_59.00.502A_failsafe.up (+reinstall) | failsafe+reinstall | failsafe **7,045,747 B [dl]**; reinstall ~906 MB [live] | failsafe `cfe846acb68af8673f9985370ac1eaa6c58082acba77580668ce67e7619a5f79` | failsafe MD5 `46006213b4a7d527036f764403738f6f` [dl] | Mazda-USA-CDN (NA); PM | **collected** (NA failsafe only) | **THE watershed: disables USB tweak side-loading; downgrade floor.** From here up, need ID7-first or serial | [D-02][D-05][F-20] |
| 59.00.540/544/545A/546A | NA/EU/ADR | cmu150_NA_59.00.545A_failsafe.up (+reinstall) | failsafe+reinstall | failsafe **7,061,576 B [dl]**; reinstall ~894 MB [live] | failsafe `79168c8c2359495d5ecb9927b5dddc80062b7f52020b3e8a63656501b7f2e427` | failsafe MD5 `bbdc6c1048b7cd8320098b2afa8cf12b` [dl] | Mazda-USA-CDN (NA) | **collected** (NA failsafe only) | recommended target if you want the AIO Android-Auto tweak (545) | [D-02][B-2.3] |
| **59.00.524** | EU/NA/ADR (**124-only**) | cmu150_<R>_59.00.524_… | failsafe+reinstall | ~0.9 GB | — | — | factory / PM | known-to-exist | **factory FW of later-2018 Fiat 124** (≈ Mazda 59.00.502). Locked; no CarPlay | [B-2.2][D-05][A §4] |
| **59.00.561** | EU N | cmu150_EU_59.00.561_failsafe/reinstall.up | failsafe+reinstall | — | — | — | **nobody has it** | lost | jayrock asked for genuine Fiat EU failsafe+reinstall; none found | [A-21] |
| **59.00.562 / 59.00.563** | EU/NA/ADR (**124-only**) | cmu150_<R>_59.00.56x_… | failsafe+reinstall | ~0.9 GB | — | — | factory-installed | known-to-exist | **factory FW of 2019/2020 Fiat 124.** ⚠️ "latest Fiat firmware" trap — no CarPlay, tweak-locked; reportedly breaks CP/AA. Bob T's used CMU came on 59.00.563 "not upgradable" | [B-2.2][D-05][A §5][F-02] |

### 1.3 Version-70 (CarPlay/AA) firmware

| Version | Region | Filename(s) | Type | Size | SHA256 [dl] | MD5/SHA1 (comm) | Obtainable today | Status | Notes | Sources |
|---|---|---|---|---|---|---|---|---|---|---|
| 70.00.000A | EU (beta) | — | — | — | — | — | not distributed | lost | first build with CarPlay/AA code; superseded | [D-05][B-2.3] |
| **70.00.021A** | EU, ADR | cmu150_EU_70.00.021A_failsafe/reinstall.up; cmu150_ADR_70.00.021A_… | failsafe+reinstall | reinstall ~925 MB | — | — | Mazda-USA-CDN (EU/ADR 403); PM | known-to-exist | first **public** CarPlay/AA FW (ASH8, Sept 2018); EU/ADR carry letter **A** | [D-09][B-2.3] |
| **70.00.021B** | NA | cmu150_NA_70.00.021B_failsafe.up (+reinstall) | failsafe+reinstall | failsafe **7,089,899 B [dl]**; reinstall ~925 MB [live] | failsafe `8835f4444cb0d05d2ad6c973e95fdf62ec1be28946a5f32121ac19b9ff830ee1` | failsafe MD5 `d342b61016901cec7e7a61d71d53c53b` [dl] | Mazda-USA-CDN (NA) | **collected** (NA failsafe only) | NA used **021B**, not 021A. ASH8's original NA install-order file | [D-02][B-2.3][A §2.7] |
| **70.00.100A** | **NA** | cmu150_NA_70.00.100A_failsafe.up; cmu150_NA_70.00.100A_reinstall.up | failsafe+reinstall | failsafe **7,088,769 B [dl]**; reinstall **925,592,239 B [dl/live]** | failsafe `ef9964509d81d47c1fcae35748096fe7021a9ea15b670acf5675a48679ddbccf`; reinstall `5938019df7e333447c7bf60aa8f6a7e7f9cd50d6eeb7b6e33605800b85bd4ad0` | failsafe MD5 `9324d1907c2c722738b0a389de73e91d` ✓; reinstall MD5 `da7667967e62e324c4ef457de4a262bf` ✓; SHA1 `8C0C6608B229A1079D8F467816687B900D996EA7` | Mazda-USA-CDN (NA); GDrive; PM; reseller | **verified-pending-AV** (both MD5s match community; VirusTotal TODO) | ★ **the 124 community standard target — HIGHEST version that still lets you side-load the Fiat logo+nav fix afterwards** (if ID7). **Full NA pair collected locally** | [D-02][A-3][B-2.3][C2-mtx] |
| **70.00.100A** | EU | cmu150_EU_70.00.100A_failsafe.up; ..._reinstall.up | failsafe+reinstall | reinstall ~2.3 GB (comm) | — | failsafe MD5 `cc485f4f16541cd803f615df42dc3512`; **reinstall MD5 ❓ TWO reported: `d5c042588b5de7f0d72e02b03ec78590` (B-2.3 GDrive uploader) vs `279f1b81e1fa43b1b43ea1af38aab834` (jayrock, [A-3])** | Mazda-USA-CDN (403); GDrive `FIAT 124 CarPlay files EU.zip`; navi-world €29.99; PM | known-hash ❓ | **EU reinstall MD5 contradiction — must reconcile before trusting either.** jayrock hit "Invalid packet certificate" on reinstall; brh bricked with the EU GDrive file. **Key gap: maintainer's car is EU** | [A-3][B-2.3][D-02][D-07] |
| **70.00.100A / .100** | ADR (4A N) | cmu150_ADR_70.00.100A_failsafe/reinstall.up | failsafe+reinstall | reinstall ~1.8 GB (comm) | — | failsafe MD5 `46D7A81AF84845EEA30557146221F303`/SHA1 `0FD9A6F9708264AAC5AB734E5BA01F7245C01B08`; reinstall MD5 `AFB5CF9AC044459C2A494C6B1EB46DD9`/SHA1 `3AE99E08B99101F4090214541AEF366CED5FCB1A` | GDrive `FIAT 124 CarPlay files ADR.zip`; PM (RJJ we.tl expired) | known-hash | ADR hashes also in F-19 p11 | [A-3][D-02][A-4] |
| 70.00.110 | NA/EU/ADR (JP-only per K-hon ❓) | cmu150_<R>_70.00.110_update.up | update (transitional) | ~0.9–2.3 GB | — | — | reseller/PM | known-to-exist | USB-audio device support; K-hon chart lists 70.00.110 as JP | [D-02][B-2.3] |
| 70.00.120 | NA | cmu150_NA_70.00.120_… | update | — | — | — | never generally released | lost | echo-cancellation fix, via Mazda repair contractor only | [B-2.3] |
| 70.00.130 / 70.00.137 / 70.00.150A | NA/EU/ADR | cmu150_<R>_70.00.150A_update.up etc. | update | — | — | — | reseller/PM | known-to-exist | interim bug-fix; 70.00.137 cited for CX-3 AA. ❓ 130/150 region/existence thin | [D-02][C2-mtx] |
| **70.00.335C** | NA/EU/ADR | cmu150_NA_70.00.335C_update.up (+ EU/ADR) | **single update** | NA **964,830,856 B [live]**; EU ~2.3 GB; ADR ~1.8 GB | — | EU 335C MD5 `4980D1E107A37209F4D7FE42803EFB3E`/SHA1 `03E4C336385501FEBC09AE4E81C3538423B60EFB` | Mazda-USA-CDN (NA); navi-world €31; PM | known-hash (EU) | ★★ **first single-file build; introduces `neutralizeid7` — POINT OF NO RETURN #2.** MazdaToFiatV70AIO won't run without 124geek's edits. BT echo fix | [D-02][B-2.3][C2-mtx][F-29] |
| **70.00.352B** | NA/EU/ADR | cmu150_NA_70.00.352B_update.up (+ EU/ADR) | single update | NA **964,837,250 B [live]** | — | comm hashes exist (not captured) | Mazda-USA-CDN (NA); navi-world; PM | known-to-exist | last serial-enablable v70 (ID7v2). AIO OK up to 352 with AIO 2.8.6 + ID7v2 | [D-02][C2-mtx][A-8] |
| **70.00.367A** | NA (2020-06), EU N (~2020-09), ADR later | cmu150_NA_70.00.367A_update.up; cmu150_EU_70.00.367A_…; cmu150_ADR_… | single update | NA **967,219,802 B [dl/live]**; EU ~2.3 GB | NA `2c46f3f08ac9f93f72a6e15878eb3230c6a3a6f48ce0e4e1034508170cc8ded4` [dl] | NA MD5 `648dc7443ba99af8abd483f20673c295` ✓ / SHA1 `19398226a7cdad3a632a78fb183b7420482d0b90`; EU hashes NOT found | Mazda-USA-CDN (NA); navi-world €31 EU; mazdafiles $15 ADR; PM | **verified-pending-AV** (NA; VirusTotal TODO) | ★★★ **last v70; POINT OF NO RETURN #3 — serial reportedly dead.** Escape = downgrade to 352/335 + ID7v2, or mp3 hack (1 report). NA collected locally | [D-02][C2-mtx][F-21][F-54] |
| 70.00.345 / 70.00.357 | NA/EU | cmu150_<R>_70.00.35x_update.up | single update | — | — | — | reseller/PM | known-to-exist | seen "by accident" (dealer flashed .357 in Italy); same neutralizeid7 family | [B-2.3][F "dealer"] |

### 1.4 Version-74 firmware

| Version | Region | Filename(s) | Type | Size | SHA256 [dl] | MD5/SHA1 (comm) | Obtainable today | Status | Notes | Sources |
|---|---|---|---|---|---|---|---|---|---|---|
| **74.00.230A** | NA/EU/ADR | cmu150_NA_74.00.230A_update.up (+ EU/ADR) | single update | NA **968,212,898 B [live]** | — | NA MD5 `29151b83ba3f77b898a5c94e05cc69cd`/SHA1 `91bbc5af672f2ccdbee95375077b40c56742e2b8` | Mazda-USA-CDN (NA); PM | known-hash | first v74; **do NOT install thinking it enables wireless CarPlay.** Downgradable to 70/59 by USB (bench-tested) | [D-02][B-2.3][F-13] |
| 74.00.310 | NA/EU/ADR | cmu150_<R>_74.00.310_update.up | single update | — | — | — | reseller/PM | known-to-exist | **74.x downgrade floor** — from ≥74.00.310 you can only go back to 74.00.310 (not below) by USB | [C2-mtx][D-05][F-19] |
| 74.00.311A | NA/EU/ADR | cmu150_NA_74.00.311A_update.up; cmu150_EU_74.00.311A_update | single update | NA **968,191,040 B [live]** | — | — | Mazda-USA-CDN (NA); EU paid portal [D-03]; PM | known-to-exist | TSB 09-021/21; EU N installable on 4A/ADR (English) | [D-02][B-2.3] |
| **74.00.324A** | NA/EU/ADR (**final**) | cmu150_NA_74.00.324A_update.up; cmu150_EU_74.00.324A_update.up; cmu150_ADR_… | single update | **NA 1,003,179,676 B [dl/live]**; EU ~2.3 GB; ADR ~1.8 GB | NA `ffd04e2c8cfaf77388aacde0f9c1cddc17cb6b7f02d7caa2fe6ad39c0f40e787` [dl] | NA MD5 `49c7c7a834ca40cbbbb68f29ee696475` ✓ / SHA1 `975935BD09E9EA90CFEC22AE87D66B310A2242E3`; EU MD5 `9B841BC807A5010A8652BB3B9E894F91`/SHA1 `3aa55dadc8d59fadb0c69af17444447b097baf18` | Mazda-USA-CDN (NA); GDrive (NA); navi-world €39; mazdafiles $10–15; PM | **verified-pending-AV** (NA MD5 exact match; VirusTotal TODO) | **last-ever MZD-Connect-1 firmware.** Tweak-locked from factory; mp3 hack restores tweaks. AIO OK on 324. NA collected locally | [D-02][C2-mtx][B-2.3] |
| 74.00.331 | NA/EU/ADR | cmu150_<R>_74.00.331A_update.up | single update | — | — | — | rare; PM | known-to-exist | newer than 324; ⚠️ AIO tweaks on 331 **may disable wireless CarPlay**; AIO recommended only ≤74.00.324 | [D-02][B-2.3][C2-17] |
| 74.00.200(+) | — | — | — | — | — | — | — | known-to-exist | wireless-CarPlay threshold — but also needs a 2021 wireless-capable CMU (~$999); not a firmware-only feature; irrelevant to 124 | [B-2.3][E-03] |

*Note:* JP firmware (SatNav protocol M; e.g. 70.00.110 JP, 59.00.332 JP seen as a stepping build) is
essentially unobtainable publicly and irrelevant to the 124 (never sold in JP). [D-07]

---

## 2. Fiat-specific tools & tweak packages (Ameridan / 68wooley)

All the Ameridan MediaFire packages were downloaded 2026-08-23 from the author's own MediaFire account
→ **"obtained from the original author"** — but VirusTotal is still TODO and the blog publishes no
hashes, so per CLAUDE.md they remain `collected` until the AV step is done. Local path
`downloads/ameridan/` unless noted. Sizes and SHA256 from `downloads/CHECKSUMS.sha256`.

| Package | What it does / targets | MediaFire URL | Size | SHA256 | Local path | Status | Sources |
|---|---|---|---|---|---|---|---|
| **`MazdaToFiatV70AIO.zip`** | THE master re-brand: Fiat/Abarth branding + boot/shutdown animations + CarPlay icon + NNG factory-nav restore + BT name "124 Spider" (+ optional full backup). MZD-AIO-TI 2.8.3 base tweaks.sh; runs stock only on 70.00.000–70.00.100 (`COMPAT_GROUP==6`, `_VER_EXT ≤100`) | `mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip` | 37,724,156 B | `9d8fe6d8107ee038295e19a3a7c578f34530adbbdcd3321a26d4f3c8d7c58b20` | downloads/ameridan/ | collected | [A-3][B-3.3][C1][C2-06] |
| **`Fix_ver70_NNG.zip`** | standalone factory-nav (NNG) restore for v70 — NA Fiat v56/59 `/jci/nng` folder (works NA/EU/ADR, not JP). Same payload embedded in the AIO | `mediafire.com/file/ffjgv4cx7lv0b6f/Fix_ver70_NNG.zip` | 33,811,815 B | `f3e3f7289a12a1e5d97e47f5a62d7232ba7959948f57521f7c93a0eede7b3f17` | downloads/ameridan/ | collected | [A-3][B-3.4][C1][F-43] |
| **`Version_70_Fiat_Boot.zip`** | standalone Fiat static boot logo/animation for v70 (checks `70.00.100A-NA/EU/4A`) | `mediafire.com/file/6al6as23hxqusm1/Version_70_Fiat_Boot.zip` | 1,485,535 B | `d73bd3518ac775393db66ed1f2564f7b56f9abce2d0c638973427bb2361f48cb` | downloads/ameridan/ | collected | [A-3][B-3.5][C1] |
| **`Version_70_Abarth_Boot.zip`** | standalone Abarth boot logo/animation for v70 | `mediafire.com/file/bqhsl025ql05h74/Version_70_Abarth_Boot.zip` | 1,479,637 B | `6d1e2e74484a6f53e3fbf641f4cac2681963846952272595701b994e6fb4b420` | downloads/ameridan/ | collected | [A-3][B-3.5][C1] |
| **`Uninstall_Animations_Tweak.zip`** | reverts the boot/shutdown animation tweak | `mediafire.com/file/6kg38iqnoznd37p/Uninstall_Animations_Tweak.zip` | 33,683 B | `9cd7ebbeb331eac1008ce58cd6a3a080e3d5189b7fd260d22ab3326a8fcf1487` | downloads/ameridan/ | collected | [B-3.5] |
| **`autorun_copy_to_usb.zip`** (ID7 v1) | ID7 "autorun" backdoor + recovery scripts (sshd port 24000, passwd/sshd re-writers, udev tweak-runner). Install on 56.x **before** upgrading. Compiled MZD-AIO-TI 2.6.8 2017-08-27; files re-zipped 2018-11-29; 27 files | `mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip` | 46,659 B | `c8bef694b1dcae78881ad57b9df8fdba09f073ee93d3ca89c9382c7315572726` | downloads/ameridan/ | collected | [A-2.4][B-3.1][C2-01][C2-25] |
| **`RemoveNNG.zip`** | frees ~18 MB by deleting the NNG nav component (pre-dates the nav fix; only if you accept losing nav) | `mediafire.com/file/2m9tt3hsbgb7gam/RemoveNNG.zip` | 99,594 B | `34cf324c91bc361f59daf0a41bf7b23014c2ba098cdf0073288b1ef0142585c6` | downloads/ameridan/ | collected | [B-3.6][C1] |
| **`JCI_Test_Mode_Control.zip`** | adds a T/M button to the Diagnostics menu → test-mode options incl. USB DRIVER / TERMINAL (basis of the later mp3 hack). Needs ID7 on ≥59.00.502 | `mediafire.com/file/qwx7ay66iw9ru4x/JCI_Test_Mode_Control.zip` | 42,029 B | `59f103ca59c548fdc1a6edd73a9bba274e157f5709efe8ed230706a5749ed6fb` | downloads/ameridan/ | collected | [B-3.7] |
| **`StatusBar_Tweak.zip`** | date-in-status-bar 3.3 (MZD-AIO 2.8.2); works v56/59/70 with ID7 | `mediafire.com/file/ms0597xsyg7164t/StatusBar_Tweak.zip` | 84,688 B | `f31f3cedee97d596d1f804b7fccfdacae48dd57a1835716a13fb43feae1d2747` | downloads/ameridan/ | collected | [B-14][B-3.9] |
| **`USB_Tweak.zip`** | Enlsen's USB Audio Mod (MZD-AIO 2.8.0) — **v55–59.00.449 only, NOT v70** | `mediafire.com/file/pxfcs0rbbe42r7a/USB_Tweak.zip` | 83,819 B | `70622083b88118da6b1801a39a375f1ce8b00b129552cde25d45dd2e5b80077d` | downloads/ameridan/ | collected | [B-13][B-3.9] |
| **`Fully-Disable-Touchscreen.zip`** | trezdog44 ghost-touch work-around (compat ≤59.00.5xx; a v70/v74 update lives on mazda3revolution) | `mediafire.com/file/fmht3a17p9tietv/Fully-Disable-Touchscreen.zip` | 35,215 B | `24bad77f82421e871ee8889d97490eb2d7df1be3dd41fe3c5fda5a6d135b579c` | downloads/ameridan/ | collected | [B-15][B-3.9] |
| **`2018_Connect_CMU_Software_Update_Procedure.pdf`** | Mazda's CMU update procedure (MediaFire copy, id `j6b9tibycbe3ztu`) — see also §5 | `mediafire.com/file/j6b9tibycbe3ztu/…` | 778,657 B | `2c347d3dcd16328f85f6d19af94320998807846d34a3223d94a4db7027eab54d` | downloads/ameridan/ | collected | [B-3.10][D-04] |

**Older v56-era Ameridan packages (NOT for v70 — listed for completeness):**

| Package | What / target | URL | Status | Sources |
|---|---|---|---|---|
| `Version 70 Fiat Boot.zip` / `Version 70 Abarth Boot.zip` | (identical to the underscore-named ones above; the OP's Feb-2019 links used spaces) | as above | collected (same files) | [A-2.2] |
| `All-in-one_tweaksV1.51Fiat_c` | Siutsch AIO 1.51 for 56.00.521/530; **donation-gated** (PayPal → emailed link) | — | paywalled | [B-3.9] |
| `All-in-one_tweaksV1.51Fiat_d` (folder) | public `_d` update folder (ExitLogo.ivf, blm_msg-system.xml, speedometer.js…) | `mediafire.com/folder/nmariu5t0fb4c/All-in-one_tweaksV1.51Fiat_d` | known-to-exist (folder live, not hashed) | [B-3.9][C1] |
| `StatusBar` / boot / exit `.ivf` sub-files | Stef's ExitLogo.ivf (754 KB), TranLogoEnd etc. | inside the zips above | collected (inside zips) | [B-11][B-12] |
| Gracenote `.up` files | `Gracenote_{EU,NA,ADR,JP}_January2022.up` — re-apply after v70 (v70 resets Gracenote to v8) | `s3.amazonaws.com/visteon/public-gracenote/…` | known-to-exist | [B-28][B-3.9] |

### 2.1 68wooley guide package (PDFs)

| Artifact | What | URL / path | Size | SHA256 | Status | Sources |
|---|---|---|---|---|---|---|
| **`124Spider_CP_AA_Upgrade_Guide.zip`** | 68wooley's 2-part PDF guide (the version the community says to follow) | `mediafire.com/file/201759io15ariii/124Spider_CP_AA_Upgrade_Guide.zip`; local `downloads/guides/` | 7,807,128 B | `59725fe002d9f05fb4e168dd4a64e71220b01c9f172cf7674d7e0f47171743b0` | collected | [A-2][C2-13] |
| ├ `CarPlay How To - Part 1 - Firmware Update v3.0.pdf` | firmware procedure (ID7 → 70.00.100 → MazdaToFiatV70AIO), dated 2019-05-17 | inside zip; extracted at `research/archive/mediafire/124Spider_CP_AA_Upgrade_Guide/` | 2,017,781 B | `56a1ee28d3b10a155456f28cdcf0fea5a9ddfcd8ea3dfabe777f610062bb4102` | collected | [A-2][C2-13] |
| └ `CarPlay How To - Part 2 - Hardware Install.pdf` | hub+cable hardware install, dated 2019-02-06 | inside zip; extracted as above | 5,990,574 B | `7c09c88a93ddb25e453991ffca9b572c1b536525b43da00a43eef8b229c7f166` | collected | [A-2][E-04] |

---

## 3. Community tooling (MZD-AIO, ID7 recovery, mp3 hack, AA apps, rescue images)

### 3.1 MZD-AIO ("All-In-One Tweaks") desktop installer

Upstream **Trevelopment/MZD-AIO** (GPL v3; homepage mazdatweaks.com). **14 releases; latest v2.8.6
(2020-04-08); no release since; no Fiat/124/NNG option** — the Fiat re-brand is Ameridan's derivative
(§2). Every asset lives at `github.com/Trevelopment/MZD-AIO/releases/download/<tag>/<file>`. [C1]

**Latest release v2.8.6 assets** (status: `known-to-exist`, live, not collected/hashed here):

| Asset | Bytes |
|---|---|
| `MZD-AIO-TI_Setup_2.8.6.exe` (Win64) | 191,084,384 |
| `MZD-AIO-TI_Setup_2.8.6_Win32.exe` | 189,101,720 |
| `MZD-AIO-TI-mac_2.8.6.dmg` | 217,128,280 |
| `MZD-AIO-TI-linux_2.8.6.deb` | 160,111,756 |

All 14 releases (tag / date, briefly): **v2.8.6** 2020-04-08 · v2.8.5 2020-02-21 · v2.8.4 2019-02-25 ·
**v2.8.3** 2018-11-19 (base of MazdaToFiatV70AIO) · v2.8.1 2018-09-30 · v2.8.0 2018-07-29 · v2.7.9
2018-04-11 · v2.7.8 2018-03-03 · v2.7.6 2018-01-16 · v2.7.4 2017-12-26 · v2.7.2 2017-11-26 · v2.7.0
2017-09-21 · v2.6.8 2017-07-29 (base of ID7 v1) · `colors` 2017-07-27 (`color-schemes.zip` 107,864,518 B).
Sizes for all in `research/archive/mzd-aio-releases.{json,txt}`. Community v70 work references v2.8.3+
through v2.8.6; "Build run.sh" option needed for the mp3 method. [C1][A-2.9][C2-05]

Related repos (`known-to-exist`): **Trevelopment/MZD-AIO-TI** (original name, HTTP 451 DMCA-blocked
since 2017-03-06 — NNG takedown); **Trevelopment/cmu-autorun** (recovery SD-card scripts; hosts ID7
XX.zip); **Trevelopment/mazdatweaks** (website source — the only surviving copy of the /id7 & /serial
docs, since mazdatweaks.com is now hijacked/gambling-spam and /id7 is 404); **Trevelopment/headunit**
(bundled community Android Auto app, fork of gartnera/headunit). [C1][C2-09][F-52]

### 3.2 ID7 recovery packages & the mp3 hack

| Artifact | Version / content | URL | Size | SHA256 | Local path | Status | Sources |
|---|---|---|---|---|---|---|---|
| `autorun_copy_to_usb.zip` | ID7 **v1** (Ameridan copy) — see §2 | MediaFire | 46,659 B | `c8bef694…572726` | downloads/ameridan/ | collected | [C2-01] |
| AIO-generated "XX" / id7_recovery pack | ID7 v1 (same scripts) built by MZD-AIO 2.6.6–2.8.6 "Autorun" option | (in the AIO app) | — | — | — | known-to-exist | [C2-04] |
| **`ID7_Recovery_XX.zip`** (= `XX.zip`) | **ID7 v2** pack (`44-recovery-recovery/anti-neutralizeid7.autorun`, `adb`, watch scripts; 26 files, internal dates 2021-06-06). Defeats 70.00.335 `neutralizeid7` — but only via serial-during-install, redone after every flash | `github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip` (release "1", 2021-05-09; 12,247 downloads). Old `trevelopment.win/xx` = dead | 117,907 B | `e6b778079bd61212ae49b88cf1c846b40c0dcb5f59252c0b2396f5f8aa867daa` | downloads/tweaks/ | collected (single author source; no community hash) | [C2-09][C2-22][F-29] |
| **`mzd-connect-1-root`** (mp3 hack payload) | fake-MP3 XSS root: `mp3/a-d.mp3` (41,239 B each), `js/run.js` (4,998 B), `dev.html`, `mp3title.txt`, `css/`. Opens JCI diag → Terminal → run `tweaks.sh`/`run.sh` on locked v70/v74 with a USB keyboard, no ID7/serial | `github.com/mzd-evo/mzd-connect-1-root` (created 2024-03-25; no README) — collected as the GitHub **main-branch zip** | 132,338 B | `95690ef15f38712568e4eb5c9eb03a2de92ab590fc494473ed1b28f20bfb7ca6` | downloads/tweaks/mzd-connect-1-root-main.zip | collected | [C2-23][A-13][F-55][B-3.8] |
| **`shunceyb/mzd74-tweaks-no-touch`** | variant of the mp3 hack auto-launching diag for broken touchscreens (v74) | `github.com/shunceyb/mzd74-tweaks-no-touch` | — | — | — | known-to-exist (README archived) | [C2-24] |
| id7 `autorun.v2.zip` / `autorun-v3.zip` | original 2017-06/07 ID7 v1 scripts (m3r thread attachments) | m3r thread 200450 | — | — | — | lost (attachments not retrievable) | [C2-10] |
| `Checksum_Utility.exe` | MD5/SHA utility bundled in the v74 GDrive folder | GDrive folder `1FSOxXVccKppRURPqZVayfulACGOQW-3Q` | — | — | — | known-to-exist (not hashed) | [A-3][D-11] |
| `Delete Dumps Tweak 1.0.3` | frees rootfs (deletes CJK fonts — not for ADR) | mazda3revolution thread 237136 | — | — | — | known-to-exist | [B-3.6] |

### 3.3 AA Tru_Go (community Android Auto for tweakable firmware)

| Artifact | Versions | Distribution | Status | Notes | Sources |
|---|---|---|---|---|---|
| AA Tru_Go (Radarwild) | 1.14b (v56), 1.15 (FW59.00.504–70.00.352), 1.15b (v70+); AIO 1.51 ships AA 1.13 | **PM / author only** | known-to-exist | for hub-less AA on tweakable FW; needs powered USB3 hub (Unitek Y-3089); **do NOT mix with official v70 AA** | [A-19][A-3][B-3.9] |

### 3.4 Rescue NOR flash images (`.bin`) for brick recovery

Referenced in the recovery threads; used with a CH341A / Raspberry Pi to force the failsafe. Chips:
Macronix **MX25L6445E** (EU), Spansion **S25FL064A/P** (US). Not collected here.

| Image | For | Source | Status | Sources |
|---|---|---|---|---|
| 56.00.513 EU failsafe rescue `.bin` | EU unbrick | shared in yms.livejournal comments | known-to-exist | [F-40] |
| 70.00.100 EU/NA "rescue.bin" (failsafe dump) | force-failsafe then re-flash; used to downgrade 74.00.311→70/59 | F-19 post #88 / Google-Drive link in a CH341A how-to | known-to-exist | [F-19] |
| 59.00.502A / 56.00.513 dumps | forced-failsafe downgrade below the 59.00.502 wall | m3r black-screen thread 229891 | known-to-exist | [F-27][F-19] |

---

## 4. (see §5 — official/reference documents)

---

## 5. Official / reference documents

All the NHTSA PDFs and the archived install PDFs are collected locally under `research/archive/`
(SHA256 below). Status `collected` unless noted.

| Document | Ref / title | Local path | Size | SHA256 | Sources |
|---|---|---|---|---|---|
| **Mazda worldwide CMU update procedure** | "MZD Mazda Connect CMU Firmware Update Procedure", **MME/E004/17**, JUNE 2018, WORLDWIDE (30 steps; brake/clutch every 25 min). Blog copy | `research/archive/ameridan-firmware-cmu-update-procedure-worldwide-2018.pdf` (= `ameridan/pdf/firmware-cmu-update-procedure-worldwide-2018.pdf`) | 1,329,048 B | `2d7f5458750f68d8e5c7f0a53af97c60c1c65b561b0049bd01d6a03d4c9fc708` | [D-04][A-2.5] |
| ” — MediaFire copy | `2018_Connect_CMU_Software_Update_Procedure.pdf` (different file, smaller) | `downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf` | 778,657 B | `2c347d3dcd16328f85f6d19af94320998807846d34a3223d94a4db7027eab54d` | [B-3.10] |
| ” — billswebspace copy (9 pp, w/ 70.00.335 notes) | full + one-page; 25-min ACC timer; ROOM-fuse recovery | `research/archive/F-rollback/mazda-cmu-software-update-procedure-worldwide.pdf` | 1,627,108 B | `b3a3f3b2534ace9b8ec3e37d87589c5c8e6eec721cb2c10c829a3a7f7b40d7b4` | [F-49] |
| ” — motrade copy (EN) | reseller mirror | `research/archive/motrade-mazda-firmware-update-en.pdf` | 140,718 B | `e20fbe027556063db5cba7012a3736c0c70f9f6c26bfa927aa5a60df9a4808db` | [D §motrade] |
| **Mazda USB cable-set install instructions** | "GENUINE USB Cable set INSTALLATION INSTRUCTIONS — part **C922 V6 605** — MX-5 — **C92X_V6_605_01_00**" (10 pp, 2018-09-24). = `mx5z34.pdf` | `research/archive/hardware/mazda-usb-cable-set-install-instructions-mx5z34.pdf` | 2,666,193 B | `1cfcc50ecfe3e29a0a3d205638aaa1dd079e212f56914a7d466345f1837dc7fe` | [E-08] |
| **Mazda CP/AA cable install manual (ND)** | blog copy of the cable install manual | `research/archive/ameridan/pdf/cpaa-cable-installation-manual-nd-mx-5.pdf` | 1,164,243 B | `8014cabf1e36771c23a607f384234a0cf717d94a90cc9efaf8691c6ece04e6fe` | [B §archive] |
| **MNAO retrofit dealer bulletin** | Mazda NAO dealer letter + **CSP02**; kit **0000-8F-Z34** = 1× TK78669U0C + 1× C922V6605; MSRP $199; labor op YY800XRX 1.5 h. NHTSA **MC-10144323-9999** (2018-08-19, 20 pp) | `research/archive/hardware/nhtsa-MC-10144323-9999-mazda-carplay-retrofit-bulletin.pdf` (= `research/archive/nhtsa-MC-10144323-9999.pdf`) | 4,217,760 B | `0e8d022212049408e49453718806dfeb7c608faa2271e2b71e3e98f75b0b3494` | [E-09][D-02] |
| **ASH8 compiled install/links PDF** | "CPAA INSTALL INSTRUCTIONS AND LINKS" (14 pp, 70.00.335C era; per-region parts, hidrive links). Hosted on a Shopify CDN | `research/archive/hardware/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf` (= `research/archive/shopify-CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf`, identical) | 1,807,279 B | `45b6bb4059479fc4324a1bb3ec878d03c6740127a82c8f33e38d71c9753aa73c` | [E-10] |
| **Mazda USA CarPlay user guide** | official CarPlay/AA usage guide | `research/archive/hardware/mazdausa-apple-carplay-user-guide.pdf` | 1,169,541 B | `cf87def9e87a7308a334292b9c295286f25da51940b059e678d2236bf272e8ba` | [E §archive] |
| **Screen-delamination TSB** | MX-5 centre-display cracking TSB (09-036/22 per specs page ❓ "09-136/22" in article). Blog copy | `research/archive/ameridan/pdf/tsb_mx5_screen.pdf` | 802,946 B | `6fa9401458de3770d861db3df18209eac032d9a33adb06afa060b9699e4cccc8` | [B-17][B-25] |
| K-hon "MZD CONNECT VERSION LIST" chart | version×region table (images) | `research/archive/ameridan/pdf/firmware-versions1.png` (25,013 B), `…/firmware-versions-contd4.png` (9,379 B) | — | — | [B-2.1][C2-03] |
| 124-spider firmware name-fixes chart | branding/name fix diagram | `research/archive/ameridan/pdf/124-spider-firmware-name-fixes.png` | 30,452 B | — | [B §archive] |
| NA 59.00.502 TSB excerpt (image) | improvements list for 59.00.502 | `research/archive/ameridan-tsb-na-59.00.502.png` / `ameridan/pdf/tsb-north-america-59-00-502-pdf.png` | 68,711 B | — | [C2-03][B-2.3] |
| Serial-pin photos | CMU serial 2S(RX)/2T(TX)/GND wiring | `research/archive/ameridan/pdf/serial-cmu.png` (1.4 MB), `serial-cmu2.png` (16.7 MB), `serial-connection.jpg` (171 KB) | — | — | [B-4][E §CMU] |
| MEGA 70.00.100 screenshot | proof-of-listing image | `research/archive/ameridan/pdf/new-70-00-100.png` | 125,844 B | — | [B-3.10] |

**NHTSA TSB / Service-Alert PDFs** (all `research/archive/nhtsa-<id>.pdf`, status `collected`):

| NHTSA id | Ref / title | Firmware target | Size | SHA256 | Sources |
|---|---|---|---|---|---|
| MC-10186917-9999 | Service Alert **001324** "MAZDA CONNECT SOFTWARE VERSION 59.00.441 AVAILABLE" (2016) | 59.00.441 | 106,839 B | `04727fe214db07dd236c36612695568dbecc95053a5a8fe2531ac11a05e9013b` | [D-02] |
| MC-10129565-9999 | **TSB 09-001/18** nav-SD cold-repro defect; SD-card kit p/n **0000-8F-Z09E** (16 GB) | — | 362,256 B | `4c5f3190dd7442847a169b29171be01a4359ba334cffca49f0b031355f05029a` | [D-02] |
| MC-10134920-9999 | **SA-008/18** centre-display spider-cracking | — | 358,508 B | `eb304603505a44797a7919a530d556b13db88a26a5b4cf4460c15c3ca757f6e0` | [D-02] |
| MC-10162014-0001 | **TSB 09-022/19** (06/06/2019) master changelog | 70.00.335C or later | 406,429 B | `d15ca458892ebbe7f5b6e9cdb33fb0b189a5b2a1a43cf7832a8cb95d1c66f116` | [D-02] |
| MC-10169542-0001 | **TSB 09-022/19** re-issue (12/19/2019) | 70.00.352 or later | 411,941 B | `50cffb46c360cdb3fe22b346c0e6bf3509086e16bf46e9a6772949663a894e1c` | [D-02] |
| MC-10213201-0001 | **TSB 09-021/21** (06/03/2022); fullest changelog + "cannot be rolled back" language | 74.00.311 or later | 383,115 B | `b6cb9cbe05662932e738df5f9ad6525c1195c2ccf6435484b43433c7461353da` | [D-02] |
| MC-10226834-0001 | **TSB 09-018/22** (05/25/2022) | 74.00.324 or later | 386,343 B | `7b93d130a86d1ad8b206fada6e4c8c0cdcb244344701239cfd195c64addf7ac0` | [D-02] |
| MC-10201864-0001 | Service Alert **SA-019/21** (MAZDA CONNECT troubleshooting) | — | 1,401,509 B | `5bdc99a281f30aaf3b0a559f54afd989d085fc80fc6dedf6b63955bc6f39f3e4` | [D-02] |
| MC-10210842-0001 | Service Alert **SA-001/22** (troubleshooting) | — | 1,485,534 B | `239f8a3516926ac89e75f4088e3ef2342d97e812bc588d30fce06757117cdc50` | [D-02] |
| MC-10144323-9999 | retrofit dealer bulletin + CSP02 (also in §5 hardware row) | — | 4,217,760 B | `0e8d022212049408e49453718806dfeb7c608faa2271e2b71e3e98f75b0b3494` | [D-02][E-09] |
| SB-10085418-6903 | **Mazda NA TSB 09-024/16** (2016-07-05) — 7A battery-charger update caution; all settings lost | 59.00.441 rollout | 1,562,192 B | `b5b4caf30676b23cf9744e38e15606386e06897d9c3d6241641f4a87f5ab9f4a` (`research/archive/F-rollback/mazda-na-tsb-09-024-16.pdf`) | [F-50] |

Other referenced docs (not collected): **z CHANGELOGs for 6th Generation CONNECT.pdf** (Mazda changelog
incl. 70.00.335C/.352B — 124spider attachment, bot-blocked, no Wayback) [A-3]; the **"TESTING BEFORE YOU
DOWNLOAD (MD5 checksum)" PDF** (dead local-path link — `lost`, covered only 021A hashes) [A-3][B-3.10];
Mazda **Connect FAQ for technicians** PDF [B-25]; the **Scribd "EU N CMU HASH Value"** doc 838112560
(login-gated; likely holds EU hashes) [D-23]; **drone540/mazda-firmware-changelogs** GitHub (changelog
text, 55.x/59.x/70.00.021/000; missing 70.1xx+) [D-24]. Public eCatalog cable install sheet:
`ecatalog.trademotion.com/content/itemDocuments/1014/MAZDA6%20SCREEN%20MIRROR%20C922%20V6%20605.pdf` [D-02].

---

## 6. Hardware parts

### 6.1 USB/AUX hub

| Role | Part number | Notes | Sources |
|---|---|---|---|
| **New CarPlay/AA hub** | **TK78-66-9U0C** | Same worldwide; orange label, "Made in Japan" on genuine. Superseded: **TK78-66-9U0D** (2022), **TK78-66-9U0E** (current, "replaces 9U0B/C/D", US MSRP $164.95). Contains Microchip USB84604 (FlexConnect) on clones. Must be the **C** (or D/E) — plain/A/B and green-label **KD5J-66-9U0** (China CX-4) do NOT work with 70.00.021x+ | [E-01][E-06][E-10][E-17][E-18][D-02] |
| Predecessor hubs | **TK78-66-9U0 / -9U0A / -9U0B**, **KD5J-66-9U0** (green, China) | earlier revisions; incompatible with v70 CarPlay firmware | [E-01][E-06][E-37] |
| **Original 124/MX-5 hub** | **N243-66-9U0A / N243-66-9U0B** ("K1414" generic) | the hub being replaced; refit it and everything works except CP/AA (reversible) | [E-01][E-04] |
| Clone/aftermarket codes | "K1414", "ET-1594 (P2.1 / P3)", "M-HUB", "HMYC 2.1" | brand codes, not Mazda p/n; **ET-1594 P3** = wireless-capable (needs 74.00.200+) | [E-03][E-31][E-39] |

### 6.2 USB cable sets (per market) & kit numbers

| Market | Cable set p/n | Kit / extras | Sources |
|---|---|---|---|
| **NA** | **C922-V6-605** → now **C922-V6-605A** | Kit **0000-8F-Z34** (= 00008FZ34, "Smartphone Screen Mirroring Kit") = 1× TK78669U0C + 1× C922V6605 | [E-06][E-09][D-02] |
| **EU / UK** | **C830-V6-60Z** | ordered as separate lines: hub + cable + sponge-tape set **C830-V6-693** + supplement manual **4100-77-300EN** (English) / **4100-77-300ES** (Spanish); no single EU kit number | [E-05][E-24][E-27] |
| **ADR** (AU/NZ…) | **C924-V6-605** | (any of the EU/NA/ADR sets physically fits/works — ASH8) | [E-06][D-02] |
| **JP** | **C921-V6-605** | (+ **C923-V6-605** GPS-unit cable, CX-8 only) | [E-36][D-02] |
| SD-card defect kit | **0000-8F-Z09E** (16 GB) | Mazda nav-SD-card cold-repro kit (TSB 09-001/18) | [D-02] |

Cable-set contents: USB cable Grey/Blue→Brown ×1, Grey/Green→Black ×1, 200 mm tie wraps ×9, 100×30 mm
sponge tape ×30, owner's-manual supplement + parts list. [E-2.1]

### 6.3 Prices / where to buy (hardware)

- **NA kit 0000-8F-Z34:** MSRP $199+labor (2018, official) → today MSRP ~$250.90; dealer web $192–213;
  hub TK78-66-9U0E MSRP $164.95 ($112–135 web); cable C922-V6-605A MSRP $85.95 ($58–72). Dealer-fitted
  $499.99 (Galpin). Amazon B07KRPSRKH ($163, genuine, now often "unavailable"); eBay US Mazda dealers
  $148.13. [E-09][E-21..E-23][E-33][E-34][E-19]
- **EU:** €220 parts / €360 fitted (MME launch 2018); DE OEM web C830-V6-60Z €126. [E-06][E-26]
- **UK:** £196 (rsmagee 2018); £174.37 (CX-3, 4 lines); SG Petch £232.37; cable alone £100–101;
  dealer-fitted £350–467; **124spider.uk £150 kit + £140 fitting**. [E-05][E-24][E-25][E-11]
- **AU/NZ:** A$355 genuine kit (mx5mania). **JP:** hub ¥12,960 + cable ¥2,592 (2019). [E-29][E-36]
- **AliExpress** item **1005001447410048** (~US$81–103, C$136–177, €87) — the listing most 124 owners
  used 2020–21, reported working/"looks genuine"; newer "2024 upgraded" clones $51–67 (Amazon B09MTJ6469,
  B0BPYD7JR9, B0FMXR1V1B). Wireless-only clone HMYC B0BY2J41ZC $111 (no Android Auto in wireless mode).
  [E-35][E-34][E-40] ⚠️ market flooded with clones; SD-nav quirks / DOA cables reported [E-17][E-18]
- 124-naming aftermarket kits: infotainment.com "M-KIT30" $299.95 (US, lists Fiat 124), visioncoding
  €110 (EU, lists Fiat 124), getcartech A$199 (AU). [E-31][E-32][E-30]

### 6.4 CMU / screen / replacement units

| Role | Part number(s) | Notes / price | Sources |
|---|---|---|---|
| Fiat 124 CMU (Mopar) | **68465853AA** (2017-19), **68460741AA** (2018-19) "Entertainment Telematic Module" | "does not participate in radio exchange program"; which is nav/Bose/year ❓ | [F-58] |
| Mazda3 CMU (works in 124) | **BJS7669C0K** (+ screen **BHP1611J0D** / **BHP1-61-1J0D**) | not VIN-locked; plug-and-play (swap dash trim); $299 used | [A-24][F-18] |
| Other interchange CMUs | Mazda6/CX-3 **GMD7-669C0-E** | any MZD-Connect-1 CMU works; firmware version irrelevant (new hub needs ≥70.00.021) | [F-23] |
| Used 124 CMU | — | $125 (no screen, came w/ 59.00.563), $285 w/ display; EU used MZD-1 190–600 € | [F-02][F-06][F-23] |
| Mazda screen assembly | **D0YP-61-1JZ** (Connect 1.0, all 124 years); earlier **ND1F-61-1J0B**; NOT D2YN-61-1JZA | ~$80 | [B-17][B-15] |
| Digitizer / LCD | **TM070RDZ38** (7", 36-pin) | ~$20 (AliExpress item 3256802049591210) | [B-17][E §screen] |
| CMU internals | SPI NOR **MX25L6445E** (EU) / **S25FL064A/P** (US); i.MX6 Linux 3.0.35; serial pins 2S=RX, 2T=TX, GND=housing screw | replacement chip MX25L6445EMI-10G | [E §CMU][F-19][F-40] |

### 6.5 Navigation SD cards

| Card | Region | Part number(s) | Notes | Sources |
|---|---|---|---|---|
| Fiat 124 NA card | NA | **DD1B-66-EZ1** = MOPAR **68366118AA** / 6833417AA / Toyota-Scion PTMZD-1M160 | ~$400 dealer; VIN-locks after ~100 km; clones flagged counterfeit | [B-20][D-06][A-3] |
| Fiat 124 EU card | EU | **NA4N66EZ1A** | | [D-06] |
| Mazda MX-5 cards | NA | **BHP1-66-EZ1x** (…EZ1N/EZ1J/EZ1U), clone **TD2K66EZ1** | **never work in a Fiat** (VIN check), even with Fiat firmware; not clonable | [D-06][B-20] |
| Nav-SD kit | — | **0000-8F-Z09E** (16 GB) | Mazda cold-repro defect kit | [D-02] |

### 6.6 Serial / flashing tools

| Tool | Notes | Sources |
|---|---|---|
| **USB-TTL serial adapter CP2102** | for mazdatweaks.com/serial (2S/2T/GND, 115200 8N1); ⚠️ insulate the bare TX wire (one adapter burned out on the CMU case) | [A-3][C2-08][F-60] |
| **CH341A programmer** + SOIC16 clip (+16→8 adapter) | NOR-flash unbrick; must be 3.3 V on data lines (trace-cut mod); <50 € total. RPi + flashrom or Bus Pirate alternatives | [F-19][F-38][F-39] |

### 6.7 Wireless-CarPlay dongles (on the new hub's phone port)

Carlinkit 2+ (OK, ~35–40 s), Carlinkit 2 air (€32, OK), Motorola MA-1 (OK), AAWireless gen-1 (AA-over-CP
touch trick), CPLAY2air (poor); Ottocast Mini (124spider.uk £37.50). Wireless-**only** clone hubs push
you to 74.x. `known-to-exist`. [B-16][E-03][E-04][E-05][A-3]

---

## 7. Videos & media (YouTube / other)

| id | Title | Author / date | Sources |
|---|---|---|---|
| `Qcyan28QXs4` | "Abarth 124 Spider – Apple CarPlay Install Guide" (first 124-specific install video) | Pistons & Petrol (Eddie Clark), 2018-12-14 | [E-12] |
| `XpPYKikqIDc` | "Mazda MX-5 Miata ND/ND2 ACP/AA USB Cable and Hub Install" (LHD) | Greg's DIY Garage / kill-o-byte, 2018-10-27 | [E-13] |
| `jYfH-ikZoUM` | firmware companion video (linked from E-13) | Greg's DIY Garage | [E-13] |
| `ZZgcWq3ZA38` | "Installing Apple CarPlay To My Abarth 124 Spider!" (UK RHD) | Stef ABtv, 2020-10-10 | [E-14] |
| `ZQTeJukUFII` | "Part 2: Hardware Installation — CarPlay/AA in Mazda MX-5 ND (UK)" (AliExpress kit) | KunziDoesStuff, 2025-04-25 | [E-15] |
| `XdmV-muo188` | *aftermarket* LVDS box (CPA-MAZ-MZD) — NOT the Mazda hub (disambiguation) | NavInc (NL), 2019-07-21 | [E-16] |
| Odysee "FIAT 124 CarPlay Android Auto FILES" | firmware + guide re-host (DanB) | `odysee.com/@DanB:7/…` | [A-3] |
| Odysee "FIAT 124 CarPlay files" | NA files re-host (BookAutowerks) | `odysee.com/@BookAutowerks:0/…:9` | [B-3.10] |
| madfiat mp3-hack tutorial | unlisted video linked from the "V70 tweaks without ID7" thread/blog | (unlisted) | [A-13][F-10] |

---

## 8. Local collection status

Everything under `downloads/` (git-ignored; total **~2.9 GB**), hashes from
`downloads/CHECKSUMS.sha256`. "✓" in MD5 = matches community-reported MD5.

| Local path | Bytes | SHA256 | Status |
|---|---|---|---|
| firmware/NA/cmu150_NA_59.00.502A_failsafe.up | 7,045,747 | `cfe846acb68af8673f9985370ac1eaa6c58082acba77580668ce67e7619a5f79` | collected (MD5 `46006213…`) |
| firmware/NA/cmu150_NA_59.00.545A_failsafe.up | 7,061,576 | `79168c8c2359495d5ecb9927b5dddc80062b7f52020b3e8a63656501b7f2e427` | collected (MD5 `bbdc6c10…`) |
| firmware/NA/cmu150_NA_70.00.021B_failsafe.up | 7,089,899 | `8835f4444cb0d05d2ad6c973e95fdf62ec1be28946a5f32121ac19b9ff830ee1` | collected (MD5 `d342b610…`) |
| firmware/NA/cmu150_NA_70.00.100A_failsafe.up | 7,088,769 | `ef9964509d81d47c1fcae35748096fe7021a9ea15b670acf5675a48679ddbccf` | **verified-pending-AV** (MD5 `9324d190…` ✓) |
| firmware/NA/cmu150_NA_70.00.100A_reinstall.up | 925,592,239 | `5938019df7e333447c7bf60aa8f6a7e7f9cd50d6eeb7b6e33605800b85bd4ad0` | **verified-pending-AV** (MD5 `da766796…` ✓) |
| firmware/NA/cmu150_NA_70.00.367A_update.up | 967,219,802 | `2c46f3f08ac9f93f72a6e15878eb3230c6a3a6f48ce0e4e1034508170cc8ded4` | **verified-pending-AV** (MD5 `648dc744…` ✓) |
| firmware/NA/cmu150_NA_74.00.324A_update.up | 1,003,179,676 | `ffd04e2c8cfaf77388aacde0f9c1cddc17cb6b7f02d7caa2fe6ad39c0f40e787` | **verified-pending-AV** (MD5 `49c7c7a8…` ✓) |
| ameridan/MazdaToFiatV70AIO.zip | 37,724,156 | `9d8fe6d8107ee038295e19a3a7c578f34530adbbdcd3321a26d4f3c8d7c58b20` | collected |
| ameridan/Fix_ver70_NNG.zip | 33,811,815 | `f3e3f7289a12a1e5d97e47f5a62d7232ba7959948f57521f7c93a0eede7b3f17` | collected |
| ameridan/Version_70_Fiat_Boot.zip | 1,485,535 | `d73bd3518ac775393db66ed1f2564f7b56f9abce2d0c638973427bb2361f48cb` | collected |
| ameridan/Version_70_Abarth_Boot.zip | 1,479,637 | `6d1e2e74484a6f53e3fbf641f4cac2681963846952272595701b994e6fb4b420` | collected |
| ameridan/Uninstall_Animations_Tweak.zip | 33,683 | `9cd7ebbeb331eac1008ce58cd6a3a080e3d5189b7fd260d22ab3326a8fcf1487` | collected |
| ameridan/autorun_copy_to_usb.zip | 46,659 | `c8bef694b1dcae78881ad57b9df8fdba09f073ee93d3ca89c9382c7315572726` | collected |
| ameridan/RemoveNNG.zip | 99,594 | `34cf324c91bc361f59daf0a41bf7b23014c2ba098cdf0073288b1ef0142585c6` | collected |
| ameridan/JCI_Test_Mode_Control.zip | 42,029 | `59f103ca59c548fdc1a6edd73a9bba274e157f5709efe8ed230706a5749ed6fb` | collected |
| ameridan/StatusBar_Tweak.zip | 84,688 | `f31f3cedee97d596d1f804b7fccfdacae48dd57a1835716a13fb43feae1d2747` | collected |
| ameridan/USB_Tweak.zip | 83,819 | `70622083b88118da6b1801a39a375f1ce8b00b129552cde25d45dd2e5b80077d` | collected |
| ameridan/Fully-Disable-Touchscreen.zip | 35,215 | `24bad77f82421e871ee8889d97490eb2d7df1be3dd41fe3c5fda5a6d135b579c` | collected |
| ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf | 778,657 | `2c347d3dcd16328f85f6d19af94320998807846d34a3223d94a4db7027eab54d` | collected |
| tweaks/ID7_Recovery_XX.zip | 117,907 | `e6b778079bd61212ae49b88cf1c846b40c0dcb5f59252c0b2396f5f8aa867daa` | collected |
| tweaks/mzd-connect-1-root-main.zip | 132,338 | `95690ef15f38712568e4eb5c9eb03a2de92ab590fc494473ed1b28f20bfb7ca6` | collected |
| guides/124Spider_CP_AA_Upgrade_Guide.zip | 7,807,128 | `59725fe002d9f05fb4e168dd4a64e71220b01c9f172cf7674d7e0f47171743b0` | collected |

(The reference PDFs listed in §5 are collected under `research/archive/`, tracked in git, not in
`downloads/`.)

### TODO / gaps

1. **Run VirusTotal hash lookups** on every collected binary — required to promote any file from
   `collected` / `verified-pending-AV` to `verified`. Priority: the 4 NA firmware images whose MD5
   already matches community MD5s (70.00.100A failsafe+reinstall, 70.00.367A, 74.00.324A).
2. **EU & ADR firmware still missing** — the maintainer's car is **EU**. NA CDN serves NA only (EU/ADR
   objects 403). Get EU/ADR 70.00.100A (failsafe+reinstall) from the GDrive zips / navi-world / paid EU
   portal (mazdashare.com/mtds) and hash them. [D-07]
3. **Reconcile the two EU 70.00.100A reinstall MD5s** (`d5c042588b5de7f0d72e02b03ec78590` vs
   `279f1b81e1fa43b1b43ea1af38aab834`) before trusting either — one may be corrupt/tweaked; jayrock &
   brh both hit certificate/brick failures with EU files. [A-3][B-2.3][D-07]
4. **Google-Drive zips not hashed:** `FIAT 124 CarPlay files NA.zip` (935 MB, id `1f8B3X-…6Tber`),
   `…EU.zip` (2.2 GB, `1kFk-EA6Zuf…`), `…ADR.zip` (1.8 GB, `1Pe24NuIz…`), the v74 NA folder
   (`1FSOxXVccKp…`). Download, hash, and confirm whether they contain unmodified `.up` files (⚠️
   AegirTheLucky says they are "tweaked … optimized for Fiat"). [A-3][A-12][D-11]
5. **EU/ADR community hashes are thin** — missing EU/ADR 021, EU/ADR 367A, ADR 324A, all EU/ADR
   74.00.230/311. Retrieve the Scribd "EU N CMU HASH Value" doc (login-gated). [D-07]
6. **Not yet collected:** MZD-AIO 2.8.6 installers (all 4 platforms); the 124geek-modified MazdaToFiat
   `tweaks.sh` for 335/352; the AA Tru_Go builds (PM-only); rescue NOR `.bin` images; `Checksum_Utility.exe`.
7. **Lost / decayed sources to try to recover:** the HiDrive share tree (`hsodpqja.l`, held every EU/ADR
   hash + a `y Checksum` folder); mazdatweaks.com `/id7` (404; only the GitHub `Trevelopment/mazdatweaks`
   copy survives) and `/serial` (site now hijacked); the 021A-only "TESTING… MD5 checksum" PDF. [A-3][D-07][F-52]
8. **Mirror the official trim/cable PDFs and Mazda mp4 install videos** from the HiDrive
   `-CarPlay-AndroidAuto INSTALL` folder before it disappears (only place with the full MX-5 trim PDFs). [E-42]
