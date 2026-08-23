# Theme E — Hardware: the CarPlay / Android Auto USB-hub retrofit kit and its installation in the Fiat/Abarth 124 Spider

Raw research notes, written 2026-08-23 by the theme-E research agent. Everything here is
sourced; source ids are `[E-nn]` (local to this file — to be merged into `research/SOURCES.md`
as `[S-nn]`). Local copies live in `research/archive/hardware/` (see `README.md` there).
Nothing has been verified on a car. Inferences are marked **[inference]**; unverified or
contradictory claims are marked `⚠️ unverified` / `❓ contradictory`.

Scope: part numbers per market, kit contents, prices/where to buy, OEM vs clone evidence,
the 124-specific installation procedure, firmware↔hardware ordering, "is the hub needed for
Android Auto only", 124-specific quirks, open questions.

---

## 1. Sources

Legend — Type: OEM = Mazda official document; F = forum thread; B = blog; V = video; S = shop
listing; Trust: A = official/primary, B = experienced community author corroborated by others,
C = single community report / shop claim, D = marketing copy.
Link status checked 2026-08-23. "bot-blocked" = page exists but is served behind Cloudflare /
POW / tollbit challenge to automated fetchers; we used Wayback snapshots where available.

| id | URL | Type | Author / date | Link status | Archive | Summary | Trust |
|---|---|---|---|---|---|---|---|
| E-01 | https://21stcenturyfiat124spider.wordpress.com/2018/04/30/replacing-the-cmu-to-get-apple-carplay-and-android-auto/ | B | ameridan (Dan Adkins), 2018-04-30, updates to 2023-02-16; comments to 2025-03-26 | live (curl OK; WebFetch 403) | `ameridan-replacing-the-cmu-to-get-apple-carplay-and-android-auto.html` | The 124-Spider reference article on the retrofit kit: history, Mazda EU press release text, ASH8's per-region part list (2018-09-03), hub photo comparison, AT shift-knob warning, links to kill-o-byte/Greg's video and miata.net guides. | B |
| E-02 | https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/ | B | ameridan, 2019-02-18, updated through 2024–2025; comments to 2024 | live | `ameridan-universal-version-70-fiat-tweak.html` | Contains a full copy of 68wooley's HowTo (firmware part + hardware part) re-hosted with updates; "3" Classica not compatible"; hub photo; GPS-cable warning; comment (2024-03) explaining the USB84604 FlexConnect chip in the hub; "if firmware ≤59 the new hub will NOT work; old hub MUST be used to upgrade to V70" (Stu/124spider.uk, 2024-03-13). | B |
| E-03 | https://21stcenturyfiat124spider.wordpress.com/2021/01/04/adding-wireless-carplay/ | B | ameridan, 2021-01-04; comments to 2023 | live | `ameridan-adding-wireless-carplay.html` | Wireless CarPlay needs firmware 74.00.200+ and a wireless-capable hub ("Ver. P3" of AliExpress hub ET-1594) → loses USB tweakability; dongle experiences (CPLAY2air bad, Carlinkit 2+ OK). | B |
| E-04 | https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/ | F | 68wooley (124spider.org), 2019-02-07, 162+ posts to 2022+ | bot-blocked (POW/tollbit) | Wayback `wb-124spider-32286-p1.html` (2020-07-31) + pages 2,8,10–14,16–20 (2020–2025 snapshots) | THE 124-Spider step-by-step guide, Part 2 = hardware install with photos; tools; 2.5 h; Amazon B07KRPSRKH $163; later pages: AliExpress kit reports, AA-only question, hub reversibility, AAWireless. | B |
| E-05 | https://www.124spider.org/threads/carplay-up-and-running.30666/ | F | rsmagee (UK Lusso), 2018-08-28; TheSalamander | bot-blocked | Wayback `wb-124spider-30666-p1.html` (2019-09-20), p25, p29 | First 124 install in UK: parts TK78-66-9U0C + C830-V6-60Z + manual 4100-77-300ES from Mazda Wolverhampton, £196; warning about China-specific hubs. | B |
| E-06 | https://forum.miata.net/vb/showthread.php?t=679114 (archive view: /vb/archive/index.php/t-679114-p-N.html) | F | ASH8 (Oz), 2018-08-08, updated 2018-10-02 | bot-blocked (Cloudflare) | Wayback `wb-miatanet-679114-showthread-20201112.html` (page 1 only; no snapshot of archive pages incl. p-8 exists in Wayback) | "GENUINE MAZDA Car Play plus Android Auto Install Instructions": per-region firmware + cable set + hub part numbers, 0000-8F-Z34 = MNAO kit, A/B hubs don't work with 70.00.021x, EU price €220 parts/€360 fitted, 1.5 h, install order. | B (ASH8 is the recognised authority; some details are his interpretation) |
| E-07 | https://mazda3revolution.com/forums/2014-2018-mazda-3-skyactiv-audio-electronics/230249-genuine-carplay-android-auto-all-here-now.html | F | ASH8 et al., 2018–2020, 183+ pages | bot-blocked (tollbit) | Wayback `wb-m3r-230249-p183-2018.html` (2018-11-09, last page) | Same material as E-06 at larger scale; p183: "0000-8F-Z34 kit has been available on eBay for some time (US)". | B |
| E-08 | https://www.billswebspace.com/mx5z34.pdf | OEM | Mazda (PDF created 2018-09-24, file name mx5z34) | live | `mazda-usb-cable-set-install-instructions-mx5z34.pdf` SHA256 `1cfcc50e…dc7fe` (10 pp) | **Official Mazda "GENUINE USB Cable set INSTALLATION INSTRUCTIONS", part C922 V6 605, vehicle MAZDA MX-5, doc code C92X_V6_605_01_00.** Parts list, tools, connection diagram, MX-5 trim-removal list (LH shown), routing, "firmware MUST be updated FIRST … v70.00.21 or later … once the CMU has been attached to the new hub the software cannot be updated". | A |
| E-09 | https://static.nhtsa.gov/odi/tsbs/2018/MC-10144323-9999.pdf | OEM | Mazda North American Operations, 2018-08-19 (dealer bulletin + CSP02) | live | `nhtsa-MC-10144323-9999-mazda-carplay-retrofit-bulletin.pdf` SHA256 `0e8d0222…b3494` (20 pp) | **Official MNAO dealer letter: kit 0000-8F-Z34 contains 1× TK78669U0C + 1× C922V6605; MSRP $199 + labor (Mazda6 Sport); labor op YY800XRX 1.5 h; CSP02 free for 2018 Mazda6 Touring+; includes the "Common" pages of the Mazda6 instruction sheet (same text as E-08).** | A |
| E-10 | https://cdn.shopify.com/s/files/1/2367/6353/files/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf | F/compiled | ASH8's thread text compiled as PDF (hosted by a Shopify store, undated, references 70.00.335C → 2019–2020) | live | `CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf` SHA256 `45b6bb40…aa73c` (14 pp) | Later version of ASH8's instructions: 70.00.335C era, per-region part numbers (NA cable now **C922-V6-605A**), "MUST be the 'C' hub (plain/A/B will NOT work)", FAQ (no AA-only, can't fool power, old hub discarded, battery disconnect not strictly needed), labor 1.5 h US / 1.4 h MME, hidrive links. | B |
| E-11 | https://124spider.uk/shop/android-auto-carplay-kit | S | 124 Spider UK (Stuart), reviews 2020-12 → 2026-04 | live | `124spider-uk-shop-aa-carplay-kit.html` | UK commercial kit for the 124: £150 self-fit, +£140 fitting; "all 124s with 7" display"; includes hub, cables, firmware, own instructions; "ensure firmware LOWER than 59.00.021 if self-fitting" (sic); "74.00.010+ cannot be updated"; customer says supplied hub looks non-OEM (faceplate slightly large); fitted in <2 h. | C (shop) |
| E-12 | https://www.youtube.com/watch?v=Qcyan28QXs4 | V | Pistons & Petrol (Eddie Clark), 2018-12-14, 18:33, 48.5k views | live | `yt-Qcyan28QXs4.html` | "Abarth 124 Spider – Apple CarPlay Install Guide" — first 124-specific install video; description lists NA/EU/Oceania part numbers and links to hidrive + mazdaman guide. | B |
| E-13 | https://www.youtube.com/watch?v=XpPYKikqIDc | V | Greg's DIY Garage (aka kill-o-byte), 2018-10-27, 29:48, 50.6k views | live | `yt-XpPYKikqIDc.html` | "Mazda MX-5 Miata ND and ND2 ACP/AA USB Cable and Hub Install" (LHD ND; applies to 124). Firmware video linked: https://youtu.be/jYfH-ikZoUM. | B |
| E-14 | https://www.youtube.com/watch?v=ZZgcWq3ZA38 | V | Stef ABtv, 2020-10-10, 9:18, 38.9k views | live | `yt-ZZgcWq3ZA38.html` | "Installing Apple CarPlay To My Abarth 124 Spider!" (UK RHD, fitted by "Bradley" — the 124spider.org member who helps UK owners). Vlog, not a how-to. | C |
| E-15 | https://www.youtube.com/watch?v=ZQTeJukUFII | V | KunziDoesStuff, 2025-04-25, 10:42 | live | `yt-ZQTeJukUFII.html` | "Part 2: Hardware Installation — CarPlay/AA in Mazda MX-5 ND (UK)" — RHD ND RF with AliExpress kit; parts 1 & 3 = firmware. | C |
| E-16 | https://www.youtube.com/watch?v=XdmV-muo188 | V | NavInc (NL), 2019-07-21 | live | `yt-XdmV-muo188.html` | *Aftermarket* LVDS interface box (CPA-MAZ-MZD), NOT the Mazda hub — listed only to disambiguate. | D |
| E-17 | https://www.mazda3revolution.com/threads/mazda-nav-does-not-work-after-installing-aa-carplay-hub.244127/ (+ /page-2) | F | 2021-10-01 → 2022-11, several users | bot-blocked | Wayback `wb-m3r-244127-p1.html`, `-p2.html` (2026-01) | Clone hubs (eBay/AliExpress/Amazon) → SD nav not read / GPS; genuine TK78-66-9U0D fixed it; clone-cable defects; AliExpress $79 clone "works (for now)" on Mazda2/70.00.100. | B/C |
| E-18 | https://www.mazda3revolution.com/threads/retrofit-kits-firmware.248785/ (+ /page-2) | F | 2023-08-27 → 2023-09 | bot-blocked | Wayback `wb-m3r-248785-p1.html`, `-p2.html` | "Market flooded with clones"; HMYC ~£80 Amazon; used genuine TK78-66-9U0E kit ~$200; Mazda-dealer eBay account selling genuine (ebay.co.uk 186045180066); "if you don't buy from dealership it's fake … 'made in Japan' knock-offs seen". | C |
| E-19 | https://forum.mx5oc.co.uk/t/nd-diy-apple-carplay-or-android-auto/121452 | F | SkeppColls et al. (UK RHD ND), 2021-05-24 → 2025-01 | WebFetch 403; Discourse JSON OK | `mx5oc-121452.json`, `-p2.json` | UK RHD DIY: eBay seller "mazdapartsmedcenter" (US Mazda dealer) $148.13; Mazda UK quote £350–400 fitted; AliExpress £90 "obviously the genuine article"; RHD install follows LHD videos; 2025: second-hand K1414 hub without cables. | B/C |
| E-20 | https://www.pistonheads.com/gassing/topic.asp?h=0&f=185&t=2024557 | F | UK, 2021–2022 | live | `pistonheads-2024557.html` | UK ND RHD: Amazon kit £120, 2 h, GPS cable left unplugged; dealer quotes £350 (Snows), £467 (Guildford). | C |
| E-21 | https://mazdaparts.org/mazda-3-smartphone-mirroring-kit.html | S (US dealer parts site) | — | live | `mazdaparts-org-00008FZ34.html` | Kit 0000-8F-Z34 MSRP $250.90, sale $213.27; fitment incl. MX-5 2016-2020; repeats "firmware first, v70.00.21+". | C |
| E-22 | https://parts.mazdausa.com/p/Mazda__/Smartphone-Screen-Mirroring-Kit/94313254/00008FZ34.html | S | Mazda USA parts portal | bot-blocked (search snippet only) | — | 00008FZ34 "Smartphone Screen Mirroring Kit" $250.95. | C |
| E-23 | https://www.galpinmazda.com/retrofit/ | S (dealer) | Galpin Mazda, CA | live | `galpinmazda-retrofit.html` | Dealer retrofit $499.99 + tax parts+labor, ~2 h, 2014+ Mazda Connect cars. | C |
| E-24 | https://www.sgpetchaccessories.co.uk/product/genuine-mazda-apple-carplay-android-auto-unit/ | S (UK dealer) | — | live | `sgpetch-genuine-mazda-carplay-unit.html` | UK genuine kit £232.37: TK78-66-9U0C + C830-V6-60Z + tape C830-V6-693; "6.5 Gen MZD connect only". | C |
| E-25 | https://www.arnoldclarkautoparts.com/products/genuine-mazda-carplay-c830v660z ; https://www.sandicliffeshop.co.uk/products/genuine-mazda-cx-3-2018-usb-cable-for-apple-carplay-android-auto-c830v660z | S (UK dealers) | — | live | `arnoldclark-C830V660Z.html`, `sandicliffe-C830V660Z.html` | C830V660Z cable set alone £101.48 (sold out) / £100.02. | C |
| E-26 | https://www.online-teile.com/mazda-ersatzteile/en/C830V660Z_Cord-Short.html (+ TK78669U0C page) | S (DE OEM parts) | — | live | `online-teile-C830V660Z.html`, `online-teile-TK78669U0C.html`, `online-teile-TK78669U0_.html` | C830-V6-60Z "Cord Short" €126.00 incl. VAT; TK78669U0C "This part was replaced, order TK78669U0_" (supersession; price field garbage). | C |
| E-27 | https://www.cx3forums.co.uk/viewtopic.php?t=1427 (p.4/7) | F | UK CX-3 owners, 2018 | bot-blocked (snippet only) | — | UK dealer kit £174.37 inc VAT = C830-V6-60Z + C830-V6-693 tape + TK78-66-9U0C + manual **4100-77-300EN**. | C |
| E-28 | https://www.mazda.com.au/owners/help-and-support/apple-carplay-and-android-auto/ | OEM | Mazda Australia | live | `mazda-com-au-carplay.html` | Official AU page: retrofit via dealer, "several hours", price on request. | A (no numbers) |
| E-29 | https://mx5mania.com.au/products/mazda-apple-carplay-nd-2015-2019 | S (AU) | — | live | `mx5mania-carplay-nd.html` | Genuine kit for ND 2015-2019 (RHD) A$355 incl. GST; 2–3 h; ~50 min firmware. | C |
| E-30 | https://getcartech.com/products/mazda-connect-carplay-upgrade-kit | S (AU aftermarket) | — | live | `getcartech-mazda-kit.html` | Wired/wireless kits A$199 (reg. A$250); software USB per region (74.00.324A); "AA via rotary dial only" note. | D |
| E-31 | https://infotainment.com/shop/interior-accessories/infotainment-radio-upgrades/m-kit30/ | S (US aftermarket) | — | live | `infotainment-com-m-kit30.html` | $299.95 kit explicitly listing **FIAT 124 Spider 2017-2021**; NA only; hub "M-HUB" + 2 cables + software USB. | D |
| E-32 | https://www.visioncoding.us/products/mazda-tk78-66-9u0c | S (UK/EU aftermarket) | — | live | `visioncoding-tk78.html` | €110 kit, lists **Fiat 124 (2017-2021)**; out of stock; "firmware below v70.00.21 must update — included". | D |
| E-33 | https://www.germanaudiotech.com/products/usb-hub-aux-console-carplay-android-for-mazda-2016-2019-cx-9-oem-new-tk78-66-9u0c | S (US) | — | live | — | Hub alone "Genuine Mazda" $149.95, cable kit C922-V6-605A sold separately. | C |
| E-34 | Amazon listings (mobile pages saved) B07KRPSRKH, B08ZKBNDS7, B09TQNH7LF, B09MTJ6469, B0BPYD7JR9, B0BY2J41ZC, B0FMXR1V1B | S | — | live (prices as of 2026-08-23) | `amazon-m-*.html` | See §2.4 table. | C/D |
| E-35 | https://www.aliexpress.com/item/1005001447410048.html | S | — | live (price not parsed) | `aliexpress-1005001447410048.html` | The AliExpress listing most 124spider.org members used 2020–2021 ("Apple CarPlay Android Auto USB adapter hub OEM for Mazda … fiat 124 TK78 66 9U0C"), US$81.7–103 + shipping; claimed "genuine" by buyers. | C |
| E-36 | https://sunnyday-lifelog.ssl-lolipop.jp/blog/diy/cx-8/cx-8-carplay/ ; https://hitoiki.xyz/blog/2019/08/mazda_carplay_androidauto_retrofitkit/ | B (JP) | 2019-08 / 2022-09 | live | `jp-sunnyday-cx8-carplay.html`, `jp-hitoiki-cx8-retrofit.html` | Japanese dealer parts/prices: hub TK78-66-9U0C ¥12,960; USB cable set **C921-V6-605** ¥2,592; (CX-8 only) C923-V6-605 GPS unit cable ¥5,940; 2022: hub TK78-66-9U0E, parts ¥23,204 + labour ¥26,334. | C |
| E-37 | https://www.mazda3revolution.com/threads/carplay-diagram-installation.228689/ (p.14-15) | F | 2017–2018 | bot-blocked (snippet) | — | Pre-release hub experiments: K1414 9U0A / KD5J-66-9U0 (green label, China CX-4) tested; KD5J under-powered. | C |
| E-38 | https://autotechinsight.spglobal.com/news/5245987/… | news | 2018-07-16 (press release 2018-07-12) | live | `autotechinsight-mazda-carplay-2018.html` | Mazda Europe announcement: CP/AA for all MZD Connect cars + retrofit for existing owners. (Full press text quoted in E-01; eu.mazda-press.com now login-only.) | A/B |
| E-39 | https://www.124spider.org/threads/updated-carplay-hardware-w-usb-c-and-fast-charging.43650/ ; …/wireless-carplay-success.43766/ ; …/apple-carplay-android-auto-usb-adapter-hub-for-retrofit-tk78669u0c-kit.42115/ ; …/installing-apple-carplay-into-abarth-124-spider-enquiry.43933/ ; …/carplay-upgrade-without-complicated-to-me-hardware-upgrade.43852/ | F | 2022–2025 | bot-blocked, **no Wayback snapshots** (search snippets only) | — | USB-C (27 W PD) AliExpress hub variants, wired & wireless; hub-only swap ≈10 min without removing knee panel; wireless boxes need 74.00.200+ → no USB tweaks; kit ≈$100; total 4 h (2 h fw + 2 h hub). | C ⚠️ snippet-level only |
| E-40 | https://www.124spider.org/threads/mazda-apple-carplay-and-android-auto-usb-retrofit-kit.38673/ ; …/apple-carplay-installed-rebranding-from-mazda-to-fiat-does-not-happen.41032/ | F | ~2021-01-10 ; ~2022-01-14 | bot-blocked | Wayback `wb-124spider-38673.html`, `wb-124spider-41032.html` | AliExpress kit C$177→C$136 "genuine"; 124spider.uk kit fitted by auto-electrician, 70.00.100A-NA, rebranding failed (ID7 presumably skipped), auto-lock not working. | C |
| E-41 | https://www.124spider.org/threads/v59-00-524-to-car-play-android-auto.42352/ ; …/car-play-easy-update.41206/ ; …/android-auto-and-tweaks-install.39474/ | F | 2021–2022 | bot-blocked, no snapshot | — | Titles only; not read. | — |
| E-42 | https://my.hidrive.com/share/hsodpqja.l#$/Mazda_Firmware/-CarPlay-AndroidAuto%20INSTALL | file share | modfreakz (hosts ASH8's material) | not fetched (JS app) | — | Folder with Mazda trim-removal PDFs ("Mazda Trim Removal/Cable Install Instructions.pdf"), "USB CABLE Installation Mazda.pdf"s, full-install mp4 videos, firmware update procedure PDF. **Canonical location of the official PDFs, to be mirrored.** | B |
| E-43 | http://mazdaman.x10host.com/SM356305/ | web | workshop-manual mirror (linked by E-01, E-12 as "Guide to Replace USB Module") | not fetched | — | ND workshop manual section used for trim removal. | B |

---

## 2. Part numbers, kit contents, prices, where to buy

### 2.1 The parts (all markets)

| Role | Part number | Notes | Sources |
|---|---|---|---|
| **New USB/SD/AUX hub ("AUX unit", "HUB unit")** | **TK78-66-9U0C** | Same part worldwide (NA/EU/ADR/JP). Orange label, "Made in Japan" on genuine boxes. Superseded over time: **TK78-66-9U0D** (seen 2022), **TK78-66-9U0E** (current, "replaces 9U0B/9U0C/9U0D", US MSRP $164.95). Earlier revisions **TK78-66-9U0 / -9U0A / -9U0B** and China-market **KD5J-66-9U0** (green label) exist and are reported NOT to work with 70.00.021x+ firmware. The 124's original hub is **N243-66-9U0A/B** (shared with MX-5; "K1414" is the hub's generic designation seen on listings). | E-06, E-10, E-01, E-17, E-18, E-37, search snippets (mazdaswag/mazdapartsfactor) |
| **USB cable set (2 cables hub↔CMU)** | NA: **C922-V6-605** → now **C922-V6-605A**; EU/UK: **C830-V6-60Z**; ADR (AU/NZ…): **C924-V6-605**; JP: **C921-V6-605** | Sets differ only by part number/region catalogue (connector colours may differ); **any of the three EU/NA/ADR sets physically fits and works in any market** (ASH8 confirmed; mx5oc quotes same). Contents: USB cable Gray/Blue→Brown ×1, USB cable Gray/Green→Black ×1, tie wraps 200 mm ×9, sponge tape 100×30 mm 10 sheets ×3, owner's-manual supplement + parts list. | E-08 p.2, E-09 p.9, E-06, E-10 p.5, E-19 #6, E-36 |
| **Kit (NA only)** | **0000-8F-Z34** (a.k.a. 00008FZ34, "Smartphone Screen Mirroring Kit" / "Mazda Apple CarPlay™ and Android Auto™ Retrofit Kit") | MNAO kit = 1× TK78669U0C + 1× C922V6605 (official CSP02 parts table). Fits CX-3 16-20, CX-5 16-20, CX-9 16-21, Mazda3 14-21, Mazda6 16-20, **MX-5 2016-2020**. | E-09 p.4, E-21 |
| **UK/EU dealer "kit"** | no single kit number; ordered as 4 lines | TK78-66-9U0C + C830-V6-60Z + urethane sponge-tape set **C830-V6-693** + supplement manual **4100-77-300EN** (English) / **4100-77-300ES** (Spanish, as bought by rsmagee) — other languages exist (ASH8 mentions a German one). | E-27, E-24, E-05 |
| **JP** | no kit number found | TK78-66-9U0C/E + C921-V6-605 (+ C923-V6-605 GPS-unit cable, CX-8 only). | E-36 |
| Clone/aftermarket "part numbers" | "K1414", "ET-1594 (Ver. P2.1 / P3)", "M-HUB", "HMYC 2.1" | Listing/brand codes, not Mazda numbers. "ET-1594 P3" = wireless-capable clone hub variant (needs 74.00.200+ per ameridan). | E-03, E-31, E-39 |

What the retrofit physically is (E-01, E-02, E-08): the old hub has USB1+USB2 (USB 2.0, 0.5 A each) + SD + AUX; the new hub has an **iPhone/phone icon next to USB port #1**, which is a USB 3.x port (~2.1 A charge) wired through **two** new cables to two connectors on the CMU (the old single cable is left disconnected and foam-wrapped, never reused); the back of the new hub has an extra, unused middle connector. A 2024 comment on E-02 observed clone hubs advertise a Microchip **USB84604** hub IC whose "FlexConnect" feature lets downstream port 1 swap roles with the upstream port — consistent with CarPlay's host-role swap and with the need for two cables **[community explanation, plausible, unverified]**. Claims that the hub contains the Apple iAP2 authentication chip are disputed by ameridan (he says it has always been in the CMU) `❓ contradictory`.

### 2.2 Mazda MSRP / dealer prices (historic and current)

| Market | Price | Date | Source |
|---|---|---|---|
| **NA (US)** kit 0000-8F-Z34 | MSRP **$199 + labor** (2018 Mazda6 Sport); labor op YY800XRX **1.5 h**; free (CSP02) for 2018 Mazda6 Touring+ | 2018-08 | E-09 (official) |
| NA kit today | MSRP $250.90–$250.95; dealer web $192–$213; hub TK78-66-9U0E MSRP $164.95 ($112–135 web); cable C922-V6-605A MSRP $85.95 ($58–72 web) | 2026-08 | E-21, E-22, E-33, snippets (mazdaswag, mazdapartsfactor, realmazdaparts) |
| NA dealer fitted | $499.99 + tax (Galpin, ~2 h) | undated page, live 2026 | E-23 |
| **EU (Mazda Motors Europe)** | **€220 parts / €360 parts+fitting** at launch (MME allows 1.4 h labour) | 2018-08-06 launch | E-06, E-10 |
| EU examples | Germany hub+cables secured from dealer (price n/a, 2018-09); Portugal "budget of 175 €" from dealer (2018-08); DE OEM web: C830-V6-60Z €126 | 2018 / 2026 | E-01 comments, E-06 p.1, E-26 |
| **UK** | rsmagee: £196 (hub+cable+manual, Mazda Wolverhampton, 2018-08); CX-3 owner: £174.37 inc VAT (4 lines, 2018); SG Petch web £232.37 (2026); cable alone £100–101; dealer fitted £350 (Snows 2021) / £467 (Guildford) / £350–400 quotes; 124spider.uk £150 kit + £140 fitting (2020–2026) | — | E-05, E-27, E-24, E-25, E-20, E-19, E-11 |
| **AU/NZ** | A$355 genuine kit (mx5mania, 2026); AU harness quoted A$123.82 (2021, snippet); dealer "contact for pricing", "several hours" | — | E-29, E-28, search |
| **JP** | hub ¥12,960 + cable ¥2,592 (2019 dealer prices); 2022: parts ¥23,204 + labour ¥26,334 (CX-8, with GPS cable) | 2019 / 2022 | E-36 |

### 2.3 Where to buy (genuine)

- Any Mazda dealer parts counter worldwide, by the part numbers above (several 124 owners did this without saying what car it was for — E-05). NA dealers in 2018 initially restricted to 2018 Mazda6 VINs (E-06, E-09); by late 2018 freely sold, incl. on eBay by US Mazda dealers ("mazdapartsmedcenter" $148.13 shipped to UK, E-19; "a Mazda dealer's eBay account" ebay.co.uk 186045180066, E-18).
- US online dealer parts sites: parts.mazdausa.com, mazdaparts.org, mazdaswag.com, mazdapartsfactor.com, realmazdaparts.com, mazda-parts.com (all list 00008FZ34 / TK78-66-9U0E / C922-V6-605A; all bot-blocked to fetch, prices from snippets).
- UK: SG Petch, Arnold Clark, Sandicliffe (genuine, part-numbered) — E-24/E-25.
- EU: online-teile.com (DE), dealers. AU: mx5mania (genuine kit), dealers.
- 124-specific resellers: **124spider.uk** (UK, kit + own instructions + firmware on USB; hub probably not OEM per a customer review — E-11); infotainment.com (US, lists Fiat 124) — E-31; visioncoding (EU, lists Fiat 124) — E-32.

### 2.4 Amazon / eBay / AliExpress listings seen (prices captured 2026-08-23 from Amazon mobile pages; all are third-party sellers unless noted)

| Listing | Title (abridged) | Price seen | Rating / #ratings | Notes |
|---|---|---|---|---|
| Amazon **B07KRPSRKH** | "Mazda Retrofit Kit – 0000-8F-Z34" — **Brand: Mazda**, "Buy with confidence from a certified Mazda dealer" | currently unavailable (was $163 in 2019 per 68wooley; "in the region of $165" in a later post) | 4.8 ★ / 631 | The listing 68wooley and ameridan bought from; reviews say "genuine OEM, everything included (foam tape, ties)". Best evidence of a genuine kit on Amazon. E-04, E-02 |
| Amazon **B08ZKBNDS7** | "TK78-66-9U0C CarPlay Android Auto Retrofit Kit … 00008FZ34" | unavailable | 4.3 ★ / 145 | generic |
| Amazon **B09TQNH7LF** | "TK78-66-9U0C Adapter … MX5 **Fiat 124**, 00008FZ34" | unavailable | 4.0 ★ / 90 | one of few listings naming the Fiat 124; review mentions 70.00.100 NA N |
| Amazon **B09MTJ6469** | Dasbecan "TK78-66-9U0C … (2024 New Upgraded)" | **$51.37**, in stock | 4.2 ★ / 490 | clone; seller offers to "help you upgrade the firmware" |
| Amazon **B0BPYD7JR9** | "Mazda Carplay and Android Auto Retrofit Kit, TK78-66-9U0C OEM Hub … (2024 New Upgraded)" | $59.93, unavailable | 4.3 ★ / 740 | clone |
| Amazon **B0FMXR1V1B** | "TK78-66-9U0C for Mazda … 00008FZ34 … (2024 New Upgraded)" | **$67.65**, "only 2 left" | — | clone; copies Mazda's "firmware MUST BE UPDATED FIRST … v70.00.21" text |
| Amazon **B0BY2J41ZC** | HMYC "**Wireless** Carplay Retrofit Kit, TK78-66-9U0C OEM USB Hub … (Only Supporting Wireless Carplay **NO Android Auto**)" | **$111.31** (EUR 124.17 shown), in stock | 3.9 ★ / 308 | Wireless-CarPlay clone; "in wireless mode iPhone only; switch at SD slot → wired mode supports wired CP + wired AA; cannot do both". Reviews reported (snippet) units dying after days. |
| Amazon B0H65X6WKY, B0999C284Q, B0CB34WR4H, B0CSJN563Y, B0CG1S4NSB (Type-C 27 W PD), B0D25GKH2Y (Type-C wireless), B0FVRTCFBN ("P2 PRO") | more clone variants | n/a | | Type-C / PD / wireless variants are third-party re-engineered hubs, not Mazda (E-39) |
| eBay 335054903897 | "CarPlay and Android Auto Retrofit Kit for Mazda 00008FZ34 TK78-66-9U0C" | page not retrievable (bot-blocked); title/fitment from search | | unknown seller |
| eBay 144292587949, 196033042914, 374511619202, 192679403436 … | generic kits | — | | 124spider.org member: "eBay has it for 148.00, free shipping" (2019) E-04 p2 |
| eBay (US Mazda dealers) | genuine 0000-8F-Z34 | $148.13 (2021) | | E-19 |
| AliExpress 1005001447410048 | "… hub OEM for Mazda … Toyota Yaris **fiat 124** TK78 66 9U0C" | US$81.7–103 (2020–21), C$177→C$136, €87 shipped (FR, 2021) | | the listing 124spider.org members bought in 2020–2021; all reported it worked and "looked genuine" (E-04 p10/p16, E-40) |
| AliExpress 1005003026413983 ("huaben autoparts"), 1005001872564098 (K1414 C922 V6 605A, US$229), 3256801627001009 (ET-1594 P3 wireless), 3256804198165919 (Android head-unit) | | $79–229 | | E-17, E-03, E-04 p20 |
| Walmart 5082832365 / 5091146146 / 7765924739 | marketplace clones (incl. Type-C) | — | | |

---

## 3. OEM vs clones — evidence table

| # | Claim | Evidence | Source | Date | Assessment |
|---|---|---|---|---|---|
| 1 | Genuine hub is TK78-66-9U0**C** (later D/E), orange label, made in Japan; A/B/plain and green-label KD5J (China CX-4) do NOT work with 70.00.021x+ | ASH8's instructions; ameridan repeats it | E-06, E-10, E-01 | 2018 | B — consistent across sources, mechanism unverified |
| 2 | The 0000-8F-Z34 kit sold by **certified Mazda dealers on Amazon/eBay** is genuine and works in the 124 | 68wooley (B07KRPSRKH, $163), ameridan, multiple 124spider.org members; Amazon reviews "Genuine Mazda parts and OEM quality" | E-04, E-02, E-34 | 2019–2021 | B |
| 3 | AliExpress listing 1005001447410048 (~$80–100) "is genuine Mazda, everything included, worked first time" in a 2017 Abarth (FR) and others | 124spider.org p10 (kit matched Amazon P/Ns), p16 (FR owner, 2 h, "genuine parts"), 38673 (CA owner) | E-04, E-40 | 2020–2021 | C — buyers' impression only; no teardown; note the same sellers now ship "2024 upgraded" clones |
| 4 | "The market is flooded with clones"; genuine ones are hard to find outside dealers; "made in Japan" stickers are faked; "if you don't buy from the dealership it's fake" | mazda3revolution 2023 | E-18 | 2023 | C — opinion, but consistent with the product churn seen on Amazon |
| 5 | **Clone hub (eBay/Amazon TK78-66-9U0C) → native SD navigation does not load / GPS no lock**; replacing with genuine **TK78-66-9U0D** fixed it; another user found the clone needs the SD card inserted before CMU boot; "at some AliExpress/eBay clone buyers the cables were defective" | mazda3revolution thread 244127 (several users, Mazda3/Mazda2) | E-17 | 2021-10 → 2022-11 | B — multiple independent reports. **Relevant to 124 only if factory nav is kept working via ameridan's NNG fix.** |
| 6 | 124spider.uk kit hub "is not OEM … faceplate slightly too big, sanded to fit", otherwise works | customer review (Will, 2022-06) | E-11 | 2022 | C |
| 7 | Wireless-CarPlay clone hubs: **no Android Auto in wireless mode**; need firmware **74.00.200+** (→ lose USB tweaks incl. Fiat AIO) per ameridan; 124spider.org "Wireless CarPlay success" thread reports boxes working but tweak loss | E-03, E-39, E-34 (B0BY2J41ZC) | 2023–2024 | B for the AA limitation (vendor states it); ⚠️ the 74.00.200 requirement is ameridan's reading; some listings claim v70 works with the wireless box `❓ contradictory` |
| 8 | Type-C / 27 W PD hubs from AliExpress (wired and wireless) work in the 124, hub-only swap ≈10 min | 124spider.org 43650 (snippet) | E-39 | 2024 | C ⚠️ snippet only |
| 9 | Clone longevity: "works (at least for now, time will tell)" (Mazda2, $79 AliExpress); Amazon wireless clone reviews "stop working after a few days" | E-17, search snippet on B0BY2J41ZC | 2022 / 2025 | C |
| 10 | Dealer-installed genuine kit "works very quickly and smoothly"; "both probably come from the same factory" | mazda3revolution 251908 (snippet) | — | 2024 | C opinion |
| 11 | Genuine hub vs original: CarPlay needs the hub; putting the **original hub back** after the v70 upgrade works fine (just no CP/AA) — i.e. the hardware change is reversible | 68wooley + confirmation by another owner | E-04 p8 | 2020 | B |

Community recommendation (synthesis): buy genuine when you can (dealer, dealer-run eBay/Amazon stores, UK dealer web shops — £175–235 / $190–250 / €220); if buying cheap, use a vendor with returns, expect possible SD-nav quirks (insert card before boot) or dead-on-arrival cables, and avoid the wireless-only variants if you want Android Auto or intend to keep USB tweaking (they push you to 74.x). **[inference from rows 2–9]**

---

## 4. Installation in the Fiat/Abarth 124 Spider

### 4.1 Does the 124 differ from the MX-5 ND?

- All 124-specific guides (68wooley E-04, Pistons & Petrol E-12, ameridan E-01/E-02) state that the **official Mazda MX-5 USB-cable instructions (E-08) and trim-removal list apply unchanged to the 124 Spider**; the centre-console/dash architecture is the ND's. 68wooley notes two practical deviations from Mazda's list: the **shift panel + console panel + upper panel come out as one piece**, and the **front console + front console panel come out as one unit** (E-04 #7). No source reports any 124-specific trim part that differs for this job. **[inference: the 124's different seats/door cards/emblems are irrelevant here]**
- **RHD vs LHD**: Mazda's sheet shows "■ LH" only (E-08 p.6). UK RHD 124/ND owners (E-19 #19, E-20, E-14, E-15) followed the LHD videos and report the process is the same (passenger side = left on RHD, so the scuff plate / A-pillar / lower trim you remove are on the LEFT of a RHD car — **[inference]**); the UK cable set C830-V6-60Z is the EU one; nothing else differs.
- **Automatic transmission**: removing the AT selector knob risks misplacing the white lock-rod (ignition stays on if misaligned) — ameridan/Mark Booth story; better to leave the knob, select N and rotate the boot surround (E-01 "UPDATE 11/12/2018"; E-04 step 7 refers to https://21stcenturyfiat124spider.wordpress.com/2017/03/05/removing-the-shift-knob/).
- **Display**: 124 Classica with the **3" display is not compatible**; 7" (Classica w/ option, Lusso, Lusso Plus, Abarth) only (E-04 #1, E-02, E-11).

### 4.2 Parts & tools (68wooley E-04 #7 + Mazda E-08 p.3)

Parts: TK78-66-9U0C hub; USB cable set (C922-V6-605A in NA — EU owners use C830-V6-60Z; any works); ~10 cable ties; sponge/foam tape 100×30 mm (kit includes 30 sheets + 9 ties — 68wooley's extra purchase was unnecessary).
Tools: 10 mm socket + 200 mm extension (battery terminal, lower trim bolt, CMU bolt), Phillips & flat screwdrivers (taped), trim/pry tools, scissors; Mazda adds torque wrench, fastener remover, IPA, gloves, mat. No torque values are given in E-08 for this job (the sheet says torque values would be in the workshop manual; the only bolts are the 10 mm trim bolt and the 10 mm CMU bolt) ⚠️ no torque figures found.
Time: 68wooley 2.5 h incl. photos; FR owner 2 h; Mazda labor 1.5 h (US) / 1.4 h (MME); 124spider.uk <2 h / 1.5 h fitted; one member 5 h ("be careful"); forum consensus 2–3 h hardware + ~1 h firmware.

### 4.3 Step list (68wooley, 124spider.org #7–#14, 2019-02-07; cross-refs to Mazda E-08)

Pre-condition: **firmware already on 70.00.xxx and working** (see §5). Lower the top and windows; both doors open; blanket for trim.

1. Disconnect battery negative (10 mm; fragile black plastic cover). [Mazda ①] (ASH8 FAQ: not strictly necessary if ACC/radio off — E-10 p.13.)
2. Passenger scuff plate — clips, lift from one end. [②]
3. Passenger front side trim (foot-well) — one pop-clip (keep its centre pin) + seaming strip, pull rearwards. [③]
4. Shift knob — MT unscrews; AT see ameridan. [④]
5. Centre console as ONE piece (shift panel + rubber cubby + commander-knob panel) [⑤⑥⑦] — start at silver shifter bezel rear passenger side, work round; under it unplug two cables at the commander unit (the bigger plug's latch is hard to find — photo in thread); lift over shifter.
6. Parking-brake boot panel — 2 clips (front/rear), slide up over lever. [⑧]
7. Passenger A-pillar trim — pop the small end piece first, then top-down; tweeter attached — leave trim lying on dash. [⑨]
8. Passenger lower trim — one 10 mm bolt in foot-well + clips, pull rearwards. [⑩]
9. Rear centre console (tunnel trim + rear cubby) — remove cup holders, 2 Phillips screws ahead of shifter, then clips front→rear. [⑪]
10. Front console + front console panel as ONE unit (old hub + seatbelt/airbag light panel + seat-heater switches) — pull rearwards; 3 cables on the back: **foam-wrapped small black plug = old USB (to be replaced by the 2 new cables)**; the larger black and white plugs are reused. [⑫⑬]
11. Centre panel No. 2 (hazard switch + centre vent) — clips from passenger side; 1 hazard cable. [⑭]
12. Meter hood — lower wheel, pull straight back; just move aside. [⑮]
13. Centre display/CMU — one 10 mm bolt, pull back; 5 cables: **black-and-green plug = old USB, replaced**; others reused — note positions. **The GPS antenna (blue) cable is the one everyone forgets to re-seat** (E-02 update, E-20, E-10 troubleshooting). [⑯] Navigation SD card is removed/reused [⑰].
14. Hub swap: pull front-console trim off the unit, 2 Phillips screws each side of warning-light unit, press the 4 tabs, slide old hub out, new hub in; reassemble the unit. (Another member did it without disassembling the panel.)
15. Cable prep per Mazda diagram: line up plugs, measure run, bundle excess with ties + foam (measurements "pretty good" for the 124). [E-08 MX-5 p.3]
16. Route the foam-wrapped ends (black + brown plugs) from top of dash down to the hub area (gap near the CMU opening); wrap the disconnected old vehicle connector in foam, bend back, tie the new cables to the existing harness; tuck excess under the upper dash member and tie. [E-08 MX-5 p.4–5, 1–10]
17. Reconnect hub + CMU per the Mazda connection diagram (grey/blue→brown = one pair, grey/green→black = other); each plug only fits its socket; reconnect the 3 other CMU cables and the hazard & warning-light cables.
18. Reconnect battery, press START once (ACC), plug phone into the phone-icon USB port, confirm CarPlay/AA appears under Applications (Mazda "Operation check" also says check for service codes with the diagnostic assist). Then press START twice to shut down and refit trim in reverse. Mazda: "Check Navigation System operation" and do the "required servicing after battery disconnect" (windows init etc.).

Official Mazda document for the MX-5: **"GENUINE USB Cable set INSTALLATION INSTRUCTIONS — PART NUMBER C922 V6 605 — VEHICLE MAZDA MX-5 — For vehicles with MZD Connect only — C92X_V6_605_01_00"**, 10 pages, PDF created 2018-09-24 (E-08; mirrored at billswebspace.com/mx5z34.pdf; also in the hidrive folder E-42 together with trim-removal excerpts from the ND workshop manual and Mazda's full-install mp4s). The Mazda6 equivalent is inside the NHTSA bulletin (E-09). 68wooley also published PDF versions of his guide (mediafire `124Spider_CP_AA_Upgrade_Guide.zip`, E-04 #1 — ⚠️ link not checked).

Videos: E-12 (124, LHD, 2018), E-13 (ND LHD, 2018, the "kill-o-byte" video ameridan links), E-14 (Abarth 124 RHD vlog), E-15 (ND RHD 2025, AliExpress kit), plus Mazda's own mp4s on hidrive (E-42). "Tork" video cited by a member (E-04 p13) not located — ⚠️.

### 4.4 Reported problems during/after install

- GPS/blue antenna plug not re-seated → no nav / wrong clock / greyed CP-AA (E-02, E-10, E-20).
- USB1/USB2 on the new hub "not working" right after install — resolved itself after 15–30 min (E-04 p13).
- AT lock-rod misalignment (E-01).
- Clone-hub SD-nav issues (§3 #5).
- After the upgrade Bluetooth ID becomes "Mazda" — re-pair (E-04 #1).
- Android Auto under genuine v70 is **commander-knob only (no touchscreen)**, by Mazda design; CarPlay touch only when stationary unless tweaked (E-01 press text, E-04 p14/p16, E-30).

---

## 5. Firmware ↔ hardware ordering; is the hub needed at all for AA?

### 5.1 Ordering — unanimous: **firmware first, hub + cables last**

- Mazda (official, E-08 p.2/p.6, E-09 p.9): "The firmware MUST BE UPDATED FIRST before beginning the installation. If an older version of the CMU software is being used, the CarPlay/Android Auto-compatible USB hub may not be recognized. The software must be v70.00.21 or later. **Once the CMU has been attached to the CarPlay/Android Auto-compatible USB hub, the software cannot be updated.**"
- ASH8 (E-06, E-10): install and *run* the 70.x firmware for a few minutes, shut down properly, then swap hardware; "if you install the new parts first you CANNOT install the 70s firmware — you will have to re-install the two OLD parts again before you can install the new firmware"; first initialisation of v70 searches for the specific new hub, and CP/AA icons appear only after the hub is detected.
- ameridan/nXt (E-01, 2018): pre-70 firmware "hiccups" on the new hub; an early adopter had to put the old hub back. Stu (124spider.uk) 2024: "If the firmware is V59 or below, the new USB hub will NOT work properly. The old USB hub MUST be used to upgrade to V70" (E-02 comment).
- 68wooley (E-04 #1): v70 "will run on your existing hardware quite happily" — you can flash one weekend and do the hardware the next.
- Why (community reading): the v70 update process and/or the CMU's USB enumeration expects the old hub during flashing; after flashing, v70 probes USB1 for the new hub on the USB-3 link and only then enables the CP/AA apps (E-01, E-10). **[mechanism unverified]**
- Consequence for the 124: the whole firmware chain (ID7 → 70.00.100 → Fiat AIO/NNG fix) must be finished and tested **before** touching the dash; the new hub adds nothing until firmware is 70.x, and you cannot (easily) re-flash with the new hub fitted ⚠️ (one 2024 owner bought a car with the hub already fitted but old firmware — ameridan's advice: refit an old hub, flash, refit new hub, E-02).

Does the kit require the new cable harness? Yes — every source (Mazda E-08: "HUB unit sold separately", the cable set is the part being installed; ASH8: "old hub + single old USB cable cannot be used", E-10 FAQ). The kit is hub + 2 cables; nothing else (no bracket; the hub snaps into the existing front-console housing; the old cable is left in place, taped).

### 5.2 Android Auto only — do I need the hub?

| Position | Source | Assessment |
|---|---|---|
| **No shortcut with genuine v70**: "Can I just install Android Auto ONLY without CarPlay? No. Can I alter the power supply to 2.1 A and trick it? No — first initialisation searches for the specific new AUX hub; CP/AA apps will not run without new hub and data cables." | ASH8 E-10 p.13; E-06 | B |
| Users who flashed v70 without hardware saw **no CarPlay/AA option** (GarethC, UK, 2018-08-08, miata.net #11/#14: flashed EU 70.00.021 before the parts arrived — nav still works, "no AndroidAuto option that I can see") | E-06 p.1 | B |
| ameridan: "AA doesn't need the Lightning USB, but the firmware checks that USB1 is on the CMU's previously unused USB 3.0 port, or the apps won't appear" | E-01 | B (same conclusion) |
| **Alternative without hub**: the *unofficial* Android Auto from MZD-AIO (Trevelopment) / ameridan's package on **v56 (or tweakable 59) firmware** — works wired and (with good WiFi, EU cars) wireless, touchscreen enabled, but crash-prone/stuttery; needs a tweakable firmware (ID7) and is the "old buggy 59" route ASH8 warns against. Owners who moved to genuine v70 say it is far more stable ("no more random crashing") but lose touchscreen AA. | E-04 p14 (ChaoticMike/ameridan 2021-04), p17 (Santtu 2021), E-11 review (Joe 2022-08), E-10 p.2 | B |
| 124spider.uk kit: "OEM AA/CP"; a customer who only wanted AA still needed the hub | E-11 | C |

Bottom line (sourced): with Mazda v70 firmware, Android Auto is gated by hub detection exactly like CarPlay — no report anywhere of AA working on v70 with the old hub. The only hub-less AA is the MZD-AIO tweak on v56/59. **[inference: for this project's "required tweaks only" scope, the hub is mandatory]**

---

## 6. 124-specific quirks (collected)

1. 3" Classica display: not compatible (E-04, E-02, E-11).
2. Fiat never released a v70; Mazda firmware loses Fiat nav/boot logos → ameridan's tweaks (theme of other raw files) — must be done before the hub (ID7 etc.).
3. The hub is reversible: original hub back in → everything except CP/AA works (E-04 p8) — useful for dealer visits/warranty (one member suggests swapping back before a dealer visit, E-05 p25).
4. Bluetooth name becomes "Mazda" (E-04).
5. Auto-lock not working after an electrician's install (E-40) — cause unclear (possibly AIO/branding steps skipped) ⚠️.
6. EU 124s have a usable CMU WiFi (for wireless AA tweak) whereas NA cars' WiFi is poor (E-04 p17, E-03 comments) — only relevant to the hub-less AA route.
7. Wireless CarPlay: not available from Mazda for this CMU generation; Carlinkit 2+/Ottocast/AAWireless dongles on the new hub's phone port are the community solution (E-03, E-04 p17, E-05 p29, E-11 sells Ottocast Mini £37.50).

---

## 7. Open questions / to verify

1. **Hub revision compatibility**: does the current genuine TK78-66-9U0E (and the 9U0D) work with 70.00.100 on the 124 (it "replaces" 9U0C per US catalogues; one user fixed nav with a 9U0D on 70.00.100/74.x)? No 124 report found.
2. **Clone vs genuine technical difference**: no teardown/PCB comparison found; only symptoms (SD-nav read, cable quality). Is the SD-nav quirk relevant with ameridan's NNG fix? Unknown.
3. The exact reason flashing fails with the new hub attached (Mazda statement) — and whether the *failsafe* two-file 70.00.021 path behaves differently from the single-file 70.00.335C path on a new hub. Not documented.
4. 124spider.uk's "ensure firmware LOWER than 59.00.021 if you self-fit" — likely means "must still be tweakable/ID7-able"; the threshold number looks odd ⚠️ (ask them / compare with theme-B firmware matrix).
5. Official MME document numbers: EU dealer parts list had a manual 4100-77-300xx (EN/ES/DE…); is there an EU accessory *kit* number analogous to 0000-8F-Z34? Not found (ASH8: "Europe lists one set of part numbers for ALL models", i.e. separate lines).
6. Torque values: none in Mazda's sheet; ND workshop manual would have the CMU/trim bolt torques (E-43 mirror not fetched).
7. The hidrive folder (E-42) — mirror the official trim PDFs/videos locally before it disappears (it is the only place with Mazda's full MX-5 trim PDFs and the full-install mp4s); 68wooley's mediafire PDF likewise.
8. 124spider.org newer threads (43650 USB-C hub, 43766 wireless, 42115, 43933, 43852, 45401) have **no Wayback copies** and the site is bot-blocked — need a human/browser session to archive them.
9. Whether the JP cable set C921-V6-605 differs physically from the others (only Japanese sources mention it).
10. Price today at an EU Mazda dealer for TK78-66-9U0E + C830-V6-60Z (only web-shop prices found, £232 / €126+hub).

