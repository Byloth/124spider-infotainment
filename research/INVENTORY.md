# INVENTORY

Every file, package and hardware part the upgrade needs — what it is, where it lives, whether it is
still obtainable, and what we hold locally. Consolidated 2026-08-23. Source ids → `SOURCES.md`.

**Status vocabulary** (per `CLAUDE.md`):
- **verified** = SHA256 matches ≥2 independent community-reported hashes **or** obtained from its original
  author/first-party host, **and** a malware check is clean.
- **collected** = we hold a byte copy + SHA256, but the hash rests on a single source.
- **located** = we know where it is, not downloaded.
- **lost** = the artifact or its only known host is gone.

Local binaries live in `downloads/` (git-ignored); every one is hashed in `downloads/CHECKSUMS.sha256`.
**Malware scanning is still TODO for everything** — see OPEN-QUESTIONS.md.

---

## 1. Firmware packages

### 1.1 Held locally — NA, straight from Mazda's dealer CDN [S-01]

Downloaded from `https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<file>`. **Four of these have a
community-published MD5, and all four matched exactly** → strong evidence the CDN serves genuine,
unmodified files. Total 2.8 GB.

| File | Bytes | SHA256 (short) | MD5 | Status |
|---|---|---|---|---|
| `cmu150_NA_70.00.100A_failsafe.up` | 7,088,769 | `ef996450…` | `9324d190…` ✓ matches community | **verified** (pending scan) |
| `cmu150_NA_70.00.100A_reinstall.up` | 925,592,239 | `5938019d…` | `da766796…` ✓ matches community | **verified** (pending scan) |
| `cmu150_NA_70.00.367A_update.up` | 967,219,802 | `2c46f3f0…` | `648dc744…` ✓ matches community | **verified** (pending scan) |
| `cmu150_NA_74.00.324A_update.up` | 1,003,179,676 | `ffd04e2c…` | `49c7c7a8…` ✓ matches community | **verified** (pending scan) |
| `cmu150_NA_70.00.021B_failsafe.up` | 7,089,899 | `8835f444…` | `d342b610…` | collected (no community hash found) |
| `cmu150_NA_59.00.502A_failsafe.up` | 7,045,747 | `cfe846ac…` | `46006213…` | collected |
| `cmu150_NA_59.00.545A_failsafe.up` | 7,061,576 | `79168c8c…` | `bbdc6c10…` | collected |

Full hashes: `downloads/CHECKSUMS.sha256`. Note the 59.x/021B **reinstall** halves were not pulled (only
the failsafe halves) — the CDN serves them too.

### 1.2 EU and ADR — **the project's real gap**

The same CDN returns **HTTP 403** for EU/ADR objects. The maintainer's car is EU, so this is the key
missing piece. Known routes today:

| Route | What | Cost | Status |
|---|---|---|---|
| 124spider.org thread 45543 Google Drive [S-20] | `FIAT 124 CarPlay files EU.zip` (2.2 GB), `…ADR.zip` (1.8 GB), `…NA.zip` (935 MB) — firmware + instructions + MZD-AIO | free | **located, alive** ⚠️ uploader says the zips are "tweaked/optimised for Fiat" — the `.up` files must be hashed and compared before use; one EU **brick report** (Jun-2025, "Failed to validate package certificate") |
| Mazda EU portal `mazdashare.com/mtds` [S-03] | EU 70.00.100A failsafe+reinstall, 74.00.311A | paid registration | located |
| navi-world.com [S-40] | per-region `.up` + PDF | €29–39 | located |
| mazdafiles.com [S-41] | single `.up` | $10–15 | located |
| Private message on the forums (ASH8, Candurin, AegirTheLucky, Lawrence, RJJ) | any region | free | the normal 2022-2024 route |

**Known EU/ADR hashes** (community, thin):
- EU 70.00.100A failsafe MD5 `cc485f4f16541cd803f615df42dc3512` ⚠️ single source
- EU 70.00.100A reinstall MD5 `d5c042588b5de7f0d72e02b03ec78590` ❓ **contradicted by** `279f1b81e1fa43b1b43ea1af38aab834`
  (reported by a German installer who used the file successfully on 3 cars, then hit "Invalid packet
  certificate" on a 4th) — must be reconciled before either is called verified
- EU 70.00.335C update MD5 `4980D1E107A37209F4D7FE42803EFB3E` / SHA1 `03E4C336…`
- EU 74.00.324A MD5 `9B841BC807A5010A8652BB3B9E894F91` / SHA1 `3aa55dad…`
- ADR 70.00.100A failsafe MD5 `46D7A81AF84845EEA30557146221F303`; reinstall MD5 `AFB5CF9AC044459C2A494C6B1EB46DD9`
- **Missing entirely:** EU/ADR 70.00.021, EU/ADR 70.00.367A, ADR 74.00.324A, all EU/ADR 74.00.230/311

### 1.3 Fiat firmware

**No Fiat `.up` file above 59 exists anywhere** — FCA never released one. Fiat factory builds
(56.00.521/530, 59.00.524, 59.00.562/563) are not distributed either; a request for genuine Fiat
`59.00.561 EU N` on the forum went unanswered. Practical consequence: **there is no "restore to stock
Fiat" route.** [S-10, S-11]

### 1.4 Dead firmware hosts (for the record)

`my.hidrive.com/share/hsodpqja` (the canonical free index with a `y Checksum` folder) — gone since
~2021–22 after Mazda forced takedowns; MEGA folders (empty), odysee, 1fichier, OneDrive/bit.ly, we.tl —
dead or unverifiable. See `raw/B-ameridan-blog.md` §3.10 for the full decay timeline. [S-50, S-51]

---

## 2. Tweaks and tools

### 2.1 Held locally — Ameridan's MediaFire packages (all links alive 2026-08-23, downloaded from the author's own host)

| File | Bytes | Purpose | Firmware | Status |
|---|---|---|---|---|
| **`MazdaToFiatV70AIO.zip`** | 37,724,156 | **The one that matters**: Fiat/Abarth branding, boot+shutdown animations, CarPlay icon, UI de-Mazda-ing (9 locales), **factory-nav restore**, Bluetooth name → "124 Spider", optional full backup | script accepts only 70.00.000–70.00.100 unmodified; edits documented for 335/352 and 74.x | **collected** (author's host; no published hash anywhere) |
| `autorun_copy_to_usb.zip` (**ID7 v1**) | 46,659 | Keeps USB tweak installs working across firmware updates. Must be installed **while still on 56.x** | install on 56.x; survives to 70.00.100 | collected |
| `Fix_ver70_NNG.zip` | 33,811,815 | Standalone nav fix (same payload as the one inside MazdaToFiatV70AIO) | v70 | collected |
| `Version_70_Fiat_Boot.zip` | 1,485,535 | Standalone Fiat boot animation | checks for `70.00.100A-NA/EU/4A` | collected |
| `Version_70_Abarth_Boot.zip` | 1,479,637 | Standalone Abarth boot animation | as above | collected |
| `Uninstall_Animations_Tweak.zip` | 33,683 | Reverts animations | — | collected |
| `RemoveNNG.zip` | 99,594 | Frees ~18 MB by deleting the nav engine (pre-dates the nav fix; only if you accept losing nav) | v70 | collected |
| `JCI_Test_Mode_Control.zip` | 42,029 | Adds a T/M button to reach JCI test mode (incl. TERMINAL — the mechanism the mp3 hack later triggers without a tweak) | ≥59.00.502 needs ID7 | collected |
| `StatusBar_Tweak.zip` | 84,688 | Date in status bar | v56/59/70 with ID7 | collected |
| `USB_Tweak.zip` | 83,819 | USB audio mod | **v55–59.00.449 only, NOT v70** | collected |
| `Fully-Disable-Touchscreen.zip` | 35,215 | Ghost-touch workaround | ≤59.00.5xx | collected |
| `2018_Connect_CMU_Software_Update_Procedure.pdf` | 778,657 | Mazda's own 30-step update procedure | — | collected (also = S-04) |

### 2.2 Held locally — other

| File | Bytes | Source | Status |
|---|---|---|---|
| `downloads/tweaks/ID7_Recovery_XX.zip` (**ID7 v2 "XX" pack**) | 117,907 | GitHub `Trevelopment/cmu-autorun` release "1" [S-32] | collected (author's GitHub; no independent hash). Contains `44-recovery-recovery/anti-neutralizeid7.autorun` etc. |
| `downloads/tweaks/mzd-connect-1-root-main.zip` (**mp3-hack payload**) | 132,338 | GitHub `mzd-evo/mzd-connect-1-root` [S-34] | collected. 13 files: `mp3/a–d.mp3` (41,239 B each), `js/run.js`, `dev.html`, `css/init.css`, `mp3title.txt` |
| `downloads/guides/124Spider_CP_AA_Upgrade_Guide.zip` | 7,807,128 | 68wooley's PDFs, Part 1 v3.0 + Part 2 [S-12] | collected |

### 2.3 Located, not held

| Artifact | Where | Notes |
|---|---|---|
| **MZD-AIO 2.8.6** installer (`MZD-AIO-TI_Setup_2.8.6.exe` 182 MB, + Win32/mac/linux) | GitHub `Trevelopment/MZD-AIO` releases [S-30] | Needed for further tweaks on v70 and to build a `run.sh` stick for the mp3 method. **Latest release 2020-04-08; project unmaintained for 70.335+/74.x.** Upstream contains **no** Fiat logo / nav-restore option. |
| Mazda cable-install PDF (`mx5z34.pdf`) | billswebspace.com [S-06] | Already archived as a PDF in `research/archive/hardware/`; SHA256 `1cfcc50e…` |
| Mazda trim-removal PDFs + full-install mp4s | HiDrive `-CarPlay-AndroidAuto INSTALL` folder [S-67] | **Should be mirrored before it disappears** — the only copy of Mazda's own videos |
| Gracenote update `.up` (resets to v8 after a v70 flash) | `s3.amazonaws.com/visteon/public-gracenote/Gracenote_{EU,NA,ADR,JP}_January2022.up` | not re-checked |
| 124geek's modified `tweaks.sh` for 70.00.335/352 | 124spider.org thread 38004 attachment [S-23] | behind the bot-block; the edits themselves are documented (see FIRMWARE-MATRIX) |

### 2.4 Lost

- `mazdatweaks.com/id7/` and `/faq/` — the canonical ID7-on-335 and serial procedure (404 since 2025-08;
  domain now hijacked). Only the GitHub mirror `Trevelopment/mazdatweaks` survives. [S-33]
- `trevelopment.win/xx` — dead (the XX pack moved to GitHub).
- Ameridan's "TESTING BEFORE YOU DOWNLOAD (MD5 checksum)" PDF — the link is a broken local path.
- `id7`'s original `autorun.v2.zip` / `autorun-v3.zip` forum attachments (2017) — not retrievable.
- AIO 1.51Fiat_c — donation-gated, never public (v56-era; **must not** be used on v70 anyway).
- 124spider.uk blog/kit pages — 404.

---

## 3. Hardware

### 3.1 Parts

| Role | Part number | Notes |
|---|---|---|
| **New USB hub** | **TK78-66-9U0C** | Same worldwide. Genuine = orange label, "Made in Japan". Superseded by **9U0D** → **9U0E** (current, listed as replacing B/C/D). Earlier `-9U0`/`-9U0A`/`-9U0B` and the China-market green-label **KD5J-66-9U0** are reported **not** to work with 70.00.021+. The 124's original hub is **N243-66-9U0A/B**. |
| **USB cable set (2 cables)** | NA **C922-V6-605(A)** · EU/UK **C830-V6-60Z** · ADR **C924-V6-605** · JP **C921-V6-605** | Differ only by catalogue entry — any set physically fits any market. Kit contents: 2 USB cables (grey/blue→brown, grey/green→black), 9× 200 mm ties, 3× 10 sheets of 100×30 mm sponge tape, manual supplement. |
| **NA kit** | **0000-8F-Z34** ("Smartphone Screen Mirroring Kit") | Official contents per Mazda's dealer bulletin: 1× TK78669U0C + 1× C922V6605. Labor op YY800XRX, 1.5 h. |
| UK/EU "kit" | no single number — 4 lines | hub + C830-V6-60Z + tape **C830-V6-693** + manual **4100-77-300EN/ES/DE** |
| Nav SD (Fiat) | NA **DD1B-66-EZ1** = MOPAR **68366118AA**; EU **NA4N66EZ1A** | **Mazda cards (BHP1-66-EZ1x) do not work in a 124** — tested and failed. VIN-locks after ~100 km. |
| CMU (replacement) | Mopar **68465853AA** / **68460741AA**; Mazda3 **BJS7669C0K** (+ screen BHP1611J0D) works | **Not VIN-locked** — any MZD-1 CMU from any Mazda model is plug-and-play. Screen assembly **D0YP-61-1JZ**; digitizer TM070RDZ38 (~$20). |

### 3.2 Prices seen (2026-08-23 unless noted)

| Market | Genuine | Notes |
|---|---|---|
| NA | kit MSRP $250.90 (web $192–213); hub 9U0E $164.95; cable $85.95; dealer fitted $499.99 | Launch 2018: $199 + labor |
| EU | launch **€220 parts / €360 fitted**; DE cable €126 | |
| UK | £174–232 genuine parts; dealer fitted £350–467; **124spider.uk £150 kit / +£140 fitting** | |
| AU | A$355 genuine kit | |
| JP | hub ¥12,960 + cable ¥2,592 (2019) | |
| Clones | Amazon $51–68 wired, $111 wireless (no AA); AliExpress ~$80–105 (item 1005001447410048, used successfully by several 124 owners 2020–21) | |

### 3.3 OEM vs clone — what the evidence actually says

- Multiple independent reports: **clone hubs break SD-navigation / GPS lock** on Mazdas; swapping in a
  genuine 9U0D fixed it. Relevant to a 124 only if you keep factory nav working via the NNG fix. [S-63]
- Clone cables occasionally dead on arrival. [S-63]
- Wireless-CarPlay clones: **no wireless Android Auto**, and they push you to 74.00.200+ (losing the easy
  tweak path). Some reviews report failures after days.
- Several 124 owners report AliExpress "genuine" kits working perfectly — buyers' impression only, no
  teardown exists.
- **The change is reversible**: refit the original hub and everything works except CP/AA — useful before a
  dealer visit.

**Recommendation to carry into the guide:** buy genuine (dealer, dealer-run eBay/Amazon store, UK dealer
web shops) if the budget allows; if buying a clone, use a seller with returns, expect possible SD-nav
quirks, and avoid wireless-only variants.

### 3.4 Compatibility gates

- **7" display only.** The 3" display in some Classicas cannot be upgraded.
- **Firmware ≥70.00.021 before the hub**, and the flash must be done with the **old hub** fitted.
- Android Auto is gated by hub detection exactly like CarPlay — **no report anywhere** of AA working on
  genuine v70 with the old hub. (The only hub-less AA is the old community MZD-AIO tweak on v56/59, which
  is unstable and must not be mixed with official AA.)

---

## 4. What we hold, in numbers

```
downloads/firmware/NA/   2.8 GB   7 files   (4 hash-verified against community MD5)
downloads/ameridan/       73 MB  12 files   (author's host)
downloads/guides/        7.5 MB   1 file
downloads/tweaks/        252 KB   2 files
research/archive/        178 MB  ~430 files (HTML/PDF/text captures of every key page)
```
