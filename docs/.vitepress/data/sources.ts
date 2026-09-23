/**
 * The source registry — 225 entries: 200 extracted from `research/SOURCES.md` §2.1–2.10, plus F-62 and E-44…E-48
 * added by hand (2026-08-28).
 *
 * Extracted with a parser rather than transcribed by hand: ~200 rows across ten sub-tables with
 * *different column headers* is exactly the kind of job where typing errors creep in. The parser mapped
 * columns per section from each table's own header row.
 *
 * The id scheme is repo-wide and must not be renumbered — every research document cites it:
 * `A-nn` 124spider.org · `B-nn` Ameridan's blog · `C1/C2-nn` tooling and compatibility ·
 * `D-nn` firmware availability · `E-nn` hardware · `F-nn` rollback and failures.
 *
 * On `status`: the pillar forums answer a proof-of-work challenge and redirect scripted fetchers to a
 * paywall, so most of this research was read from Wayback captures. `bot-blocked` means a browser
 * reaches it and a script does not — it is not a judgement about the source.
 */

import type { LinkStatus, Trust } from "./types";

export type SourceCategory =
    | "official" |
    "forum-124spider" |
    "forum-mazda3revolution" |
    "forum-other" |
    "blog-ameridan" |
    "blog-other" |
    "github" |
    "firmware-distribution" |
    "hardware-vendor" |
    "video";

export interface Source
{
    id: string;
    title: string;
    url?: string;
    type?: string;
    author?: string;
    dates?: string;
    category: SourceCategory;
    status: LinkStatus;
    trust: Trust;
    /** Path under `research/archive/`, where a local copy exists. */
    archive?: string;
    /** Other ids pointing at the same URL, found independently by different research themes. */
    alias?: string;
    /** Other copies of the *same* document on other hosts — not other sources. */
    mirrors?: string[];
    summary: string;
}

export const SOURCES: readonly Source[] = [
    {
        id: "E-36",
        title: "JP dealer-parts blogs (CX-8 CarPlay retrofit)",
        url: "https://sunnyday-lifelog.ssl-lolipop.jp/blog/diy/cx-8/cx-8-carplay/",
        type: "blog",
        dates: "2019-08 / 2022-09",
        category: "blog-other",
        status: "alive",
        trust: "C",
        archive: "hardware/jp-sunnyday-cx8-carplay.html",
        alias: "D-04b",
        summary: "Japanese dealer part numbers and prices: hub TK78-66-9U0C ¥12,960, cable set C921-V6-605 ¥2,592 " +
            "(2019); 2022 prices with hub TK78-66-9U0E."
    },
    {
        id: "C2-26",
        title: "Web searches performed during the research sweep",
        type: "search",
        dates: "2026-08-23",
        category: "official",
        status: "alive",
        trust: "C",
        alias: "C1-04b",
        summary: "Not a source in itself — recorded so the search terms that surfaced C2-09/14/17/24 and the " +
            "miata.net threads are reproducible."
    },
    {
        id: "D-01",
        title: "Mazda USA Technical-Service-Download firmware CDN (AWS S3)",
        url: "https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/",
        type: "OEM CDN",
        author: "Mazda USA",
        dates: "checked 2026-08-23",
        category: "official",
        status: "bot-blocked",
        trust: "A",
        archive: "`downloads/firmware/NA/` (5 files)",
        alias: "—",
        summary: "First-party dealer firmware; NA `.up` objects world-readable & hash-verified; the single most " +
            "reliable free source"
    },
    {
        id: "D-02",
        title: "Mazda dealer TSB / Service-Alert PDFs on NHTSA",
        type: "OEM TSB",
        author: "Mazda NA Operations",
        dates: "2016–2022",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`nhtsa-MC-*.pdf` (10 PDFs)",
        alias: "see D-50/E-09 (MC-10144323)",
        summary: "Official bulletins incl. TSB 09-022/19 changelog, 09-021/21, 09-018/22, retrofit memo MC-10144323, " +
            "nav-SD & screen-crack SAs"
    },
    // Split from raw D-03, which bundled several pages under one id; each page is its own source.
    {
        id: "D-03a",
        title: "Mazda EU dealer portal (portal.mazdaeur.com)",
        url: "https://portal.mazdaeur.com",
        type: "OEM portal",
        author: "Mazda Europe",
        dates: "2026",
        category: "official",
        status: "paywalled",
        trust: "A",
        archive: "`wb-m3r-official-fw-download-eu-245120.html`",
        summary: "Official EU firmware but pay-per-time (register as \"Independent Operator\"); only a thin " +
            "current set (70.00.100A, 74.00.311A) found by a paying user"
    },
    {
        id: "D-03b",
        title: "Mazda Technical Download Server (mazdashare.com/mtds)",
        url: "https://mazdashare.com/mtds",
        type: "OEM portal",
        author: "Mazda Europe",
        dates: "2026",
        category: "official",
        status: "paywalled",
        trust: "A",
        archive: "—",
        summary: "The \"Mazda Technical Download Server\" behind the EU portal; Mazda intends updates to be " +
            "dealer-only"
    },
    {
        id: "D-04",
        title: "\"2018 FIRMWARE CMU UPDATE PROCEDURE-WORLDWIDE\" dealer PDF (ref MME/E004/17, Jun 2018)",
        url: "https://21stcenturyfiat124spider.wordpress.com/wp-content/uploads/2019/02/" +
            "firmware-cmu-update-procedure-worldwide-2018.pdf",
        type: "OEM procedure",
        author: "Mazda",
        dates: "Jun 2018",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`ameridan-firmware-cmu-update-procedure-worldwide-2018.pdf`; " +
            "`downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf`",
        alias: "alias B-§3.10 PDF; F-49; A-§2.5",
        mirrors: ["https://www.mediafire.com/file/j6b9tibycbe3ztu/2018_Connect_CMU_Software_Update_Procedure.pdf/file"],
        summary: "The actual 30-step dealer update procedure bundled with the files; brake/clutch every 20–25 min"
    },
    {
        id: "F-49",
        title: "Mazda firmware-update procedure WORLDWIDE PDF (9 pp, rev. w/ 70.00.335 notes)",
        url: "https://www.billswebspace.com/MAZDA%20FIRMWARE%20UPDATE%20PROCEDURE%20WORLDWIDE.pdf",
        type: "OEM procedure",
        author: "Mazda",
        dates: "rev. ≥2019",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`F-rollback/mazda-cmu-software-update-procedure-worldwide.pdf/.txt`",
        alias: "see D-04",
        summary: "Full + one-page procedure; 25-min ACC timer; CMU-sleep; \"DO NOT turn IG OFF\"; ROOM-fuse recovery"
    },
    {
        id: "F-50",
        title: "Mazda NA TSB 09-024/16 (2016-07-05)",
        url: "https://static.nhtsa.gov/odi/tsbs/2016/SB-10085418-6903.pdf",
        type: "OEM TSB",
        author: "Mazda NAO",
        dates: "2016-07-05",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`F-rollback/mazda-na-tsb-09-024-16.pdf/.txt`",
        alias: "see D-02",
        summary: "Battery-charger ~7 A during update; all loads off; SD/USB out; **all settings/pairings lost**"
    },
    {
        id: "E-08",
        title: "Mazda \"GENUINE USB Cable set INSTALLATION INSTRUCTIONS\", p/n C922 V6 605, MX-5 (doc " +
            "C92X_V6_605_01_00, 10 pp)",
        url: "https://www.billswebspace.com/mx5z34.pdf",
        type: "OEM install sheet",
        author: "Mazda (PDF 2018-09-24)",
        dates: "2018",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`hardware/mazda-usb-cable-set-install-instructions-mx5z34.pdf` (SHA256 1cfcc50e…)",
        alias: "applies to 124 unchanged",
        summary: "The official cable/hub install sheet; parts, tools, wiring diagram, MX-5 trim list; \"firmware " +
            "FIRST … cannot update after hub fitted\""
    },
    {
        id: "E-09",
        title: "MNAO CarPlay/AA retrofit dealer bulletin + CSP02 (20 pp)",
        url: "https://static.nhtsa.gov/odi/tsbs/2018/MC-10144323-9999.pdf",
        type: "OEM bulletin",
        author: "Mazda NA Operations",
        dates: "2018-08-19",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`hardware/nhtsa-MC-10144323-9999-mazda-carplay-retrofit-bulletin.pdf` (SHA256 0e8d0222…)",
        alias: "= D-02 (MC-10144323); alias E-50",
        summary: "Kit 0000-8F-Z34 = 1× TK78669U0C + 1× C922V6605; MSRP $199+labor; CSP02 free on 2018 Mazda6 " +
            "Touring+; labor op YY800XRX 1.5 h"
    },
    // Split from raw F-38, which bundled several pages under one id; each page is its own source.
    {
        id: "F-38a",
        title: "2x4logic \"JCI fail-safe\" reverse-engineering page",
        url: "http://www.2x4logic.com/jci-failsafe.html",
        type: "technical",
        author: "majbthrd",
        dates: "2016",
        category: "official",
        status: "dead",
        trust: "B",
        archive: "`F-rollback/2x4logic-jci-failsafe.wayback2016.html`",
        summary: "SPI-NOR partition map, why \"fail-safe\" isn't, boot-select byte @0x010000; \"even Mazda's " +
            "procedures seem insufficient; run the engine\""
    },
    {
        id: "F-38b",
        title: "2x4logic \"invoke fail-safe\" page",
        url: "http://www.2x4logic.com/invokefailsafe.html",
        type: "technical",
        author: "majbthrd",
        dates: "2016",
        category: "official",
        status: "dead",
        trust: "B",
        archive: "`F-rollback/2x4logic-invokefailsafe.wayback20160605.html`",
        summary: "Forcing the failsafe by setting the boot-select byte to 0xFF; Bus-Pirate procedure"
    },
    {
        id: "F-58",
        title: "Mopar CMU part numbers for the 124 Spider",
        type: "parts catalogue",
        author: "Mopar/FCA",
        dates: "—",
        category: "official",
        status: "bot-blocked",
        trust: "C",
        archive: "—",
        alias: "see F-§7",
        summary: "Fiat \"Entertainment Telematic Module\" p/ns 68465853AA (2017-19) / 68460741AA (2018-19); \"does " +
            "not participate in radio exchange\""
    },
    {
        id: "E-28",
        title: "Mazda Australia CarPlay/AA help page",
        url: "https://www.mazda.com.au/owners/help-and-support/apple-carplay-and-android-auto/",
        type: "OEM",
        author: "Mazda Australia",
        dates: "2026",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`hardware/mazda-com-au-carplay.html`",
        alias: "—",
        summary: "Official AU: retrofit via dealer, \"several hours\", price on request (no numbers)"
    },
    {
        id: "E-38",
        title: "Mazda Europe CP/AA + retrofit press announcement (via SPGlobal)",
        url: "https://autotechinsight.spglobal.com/news/5245987/" +
            "mazda-to-offer-apple-carplay-android-auto-in-new-vehicles-equipped-with-mzd-connect-system",
        type: "news / OEM PR",
        author: "Mazda Europe (2018-07-12)",
        dates: "2018-07-16",
        category: "official",
        status: "alive",
        trust: "A",
        archive: "`hardware/autotechinsight-mazda-carplay-2018.html`",
        alias: "—",
        summary: "Mazda EU announcement of CP/AA for all MZD Connect cars + retrofit; full text quoted in E-01 " +
            "(eu.mazda-press.com now login-only)"
    },
    {
        id: "A-01",
        title: "CarPlay / Android Auto Upgrade HowTo (32286)",
        url: "https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/",
        author: "68wooley",
        dates: "OP 2019-02; to 2024-06 (21 pp)",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-howto-32286-p*.html`",
        alias: "E-04, F-17 (page-6)",
        summary: "THE canonical 124 guide (firmware Part 1 + hardware Part 2); OP text outdated → follow PDF v3.0 / " +
            "blog"
    },
    {
        id: "A-02",
        title: "68wooley PDF guide zip `124Spider_CP_AA_Upgrade_Guide.zip`",
        url: "https://www.mediafire.com/file/201759io15ariii/124Spider_CP_AA_Upgrade_Guide.zip/file",
        author: "68wooley",
        dates: "Part1 v3.0 2019-05-17",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "`mediafire/124Spider_CP_AA_Upgrade_Guide/`",
        alias: "C2-13 (Part-1 PDF); E-04",
        summary: "Updated procedure PDF (uses MazdaToFiatV70AIO; warns off 70.00.335); zip SHA256 5972…743b0"
    },
    {
        id: "A-03",
        title: "Mazda made up a mess!!! FW 70.00.367 (39292)",
        url: "https://www.124spider.org/threads/mazda-made-up-a-mess-fw-70-00-367.39292/",
        author: "EU user",
        dates: "2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-mazda-mess-70.00.367-39292.html` (F copy)",
        alias: "F-04",
        summary: "Dealer flashed 70.00.367 vs instructions; downgrade to .100 didn't restore tweaks; serial only"
    },
    {
        id: "A-04",
        title: "OK…Screwed up the Infotainment Upgrade – Fixed!! (38071)",
        url: "https://www.124spider.org/threads/ok-screwed-up-the-infotainment-upgrade-fixed.38071/",
        author: "Bob T",
        dates: "Oct 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-screwedup-38071-p1/p2.html`",
        alias: "F-02",
        summary: "Old DOS AIO 1.5 on v70 → boot loop; Speedometer tweak → brick; fixed w/ used CMU ($125, 59.00.563)"
    },
    {
        id: "A-05",
        title: "USB not recognized after downgrade 70.00.100A→59.00.502 (38159)",
        url: "https://www.124spider.org/threads/" +
            "infotainment-not-recognizing-usb-to-install-tweaks-after-downgrade-70-00-100a-to-59-00-502.38159/",
        author: "manwithastick",
        dates: "Oct–Dec 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-usb-not-recognized-38159-p1.html`",
        alias: "C2-21, F-01",
        summary: "Downgraded to run AA Tru_Go 1.14b; USB stopped autorunning (dying stick); bought Mazda3 CMU"
    },
    {
        id: "A-06",
        title: "Android Auto Upgrade (38677)",
        url: "https://www.124spider.org/threads/android-auto-upgrade.38677/",
        author: "Griswold381",
        dates: "Jan–Mar 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-android-auto-upgrade-38677-p1.html`",
        alias: "—",
        summary: "Asks for install service; replies: AliExpress genuine kit ~$105, serial hack on v59"
    },
    {
        id: "A-07",
        title: "Car play easy update (41206)",
        url: "https://www.124spider.org/threads/car-play-easy-update.41206/",
        author: "unknown",
        dates: "Feb 2022",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "—",
        alias: "E-41 (partial)",
        summary: "Non-OEM hub+cable (Amazon); \"update software first, then hub; some knockoffs may not work\""
    },
    {
        id: "A-08",
        title: "MazdaToFiat70AIO on 70.00.335C / 70.00.352B — SUCCESS (38004)",
        url: "https://www.124spider.org/threads/" +
            "mazdatofiat70aio-and-cmu-firmware-70-00-335c-or-70-00-352b-success.38004/",
        author: "124geek",
        dates: "Sep 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-aio-335c-352b-success-38004.html`; `wb-124s-38004.*`",
        alias: "C2-12, F-09",
        summary: "Run MazdaToFiatV70AIO on 335/352 by editing tweaks.sh (`_VER_EXT -le 360`) from AIO 2.8.6 stick"
    },
    {
        id: "A-09",
        title: "Mazda Cracked Down / Removed Firmware Downloads (40247)",
        url: "https://www.124spider.org/threads/" +
            "mazda-cracked-down-removed-firmware-downloads-impacts-all-new-potential-aa-carplay-upgraders.40247/",
        author: "AnClar",
        dates: "Aug–Dec 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-mazda-crackdown-40247-p1/p2.html`",
        alias: "C2-15",
        summary: "Nov 2021: all firmware hosts (HiDrive, ASH8's links) taken down; sharing by PM after"
    },
    {
        id: "A-10",
        title: "CMU Firmware V70.00.100 (EU) (42393)",
        url: "https://www.124spider.org/threads/cmu-firmware-v70-00-100-eu.42393/",
        author: "Neighbour (UK)",
        dates: "Oct 2022",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-cmu-fw-70-00-100-eu-42393.html`; `wb-124spider-cmu-firmware-70.00.100-eu-42393.html`",
        alias: "D-12",
        summary: "UK owner hunting EU 70.00.100 files; littletone101 has them"
    },
    {
        id: "A-11",
        title: "File for 70.00.100 firmware? (44172)",
        url: "https://www.124spider.org/threads/file-for-70-00-100-firmware.44172/",
        author: "bstem (AU)",
        dates: "2024-02 → 2025-07",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-file-for-70-00-100-44172.html`; `wb-124spider-file-for-70.00.100-44172.html`",
        alias: "D-12",
        summary: "Files shared by PM (NA/EU/ADR); a Google-Drive link posted then removed"
    },
    {
        id: "A-12",
        title: "Firmware Files Download Locations (45543)",
        url: "https://www.124spider.org/threads/firmware-files-download-locations.45543/",
        author: "AegirTheLucky",
        dates: "2025-01-28 → Aug 2025",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-firmware-download-locations-45543.html`; " +
            "`wb-124spider-firmware-files-download-locations-45543.html`",
        alias: "**D-11a**",
        summary: "Public Google-Drive zips NA/EU/ADR + v74 NA + MZD-AIO; one EU brick report"
    },
    {
        id: "A-13",
        title: "V70 Tweaks without ID7 — YES YOU CAN! (45965)",
        url: "https://www.124spider.org/threads/v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can.45965/",
        author: "madfiat",
        dates: "2025-05 → Jul 2025",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-v70-tweaks-without-id7-45965.html`",
        alias: "C2-19, F-10",
        summary: "MP3-payload root method to run MazdaToFiatV70AIO/MZD-AIO on v70 & v74 without ID7/serial"
    },
    {
        id: "A-14",
        title: "Upgrading to Native AA from V56 tweaks AA (45021)",
        url: "https://www.124spider.org/threads/upgrading-to-native-aa-version-from-v56-tweaks-aa.45021/",
        author: "Scorpius",
        dates: "2024",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-upgrading-native-aa-45021-p2.html`",
        alias: "—",
        summary: "Has AA-tweak on v56, wants native v70; little content"
    },
    {
        id: "A-15",
        title: "Some settings not displaying after 70.00.100NA A (42919)",
        url: "https://www.124spider.org/threads/" +
            "some-settings-not-displaying-after-firmware-update-70-00-100na-a.42919/",
        author: "Liz787",
        dates: "Jan 2023",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-settings-not-displaying-42919.html`",
        alias: "—",
        summary: "Non-issue: some settings show only in ACC/ON"
    },
    {
        id: "A-16",
        title: "CarPlay installed, rebranding Mazda→Fiat doesn't happen (41032)",
        url: "https://www.124spider.org/threads/" +
            "apple-carplay-installed-rebranding-from-mazda-to-fiat-does-not-happen.41032/",
        author: "Ausboy (AU)",
        dates: "Dec 2021–Jan 2022",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-rebranding-not-happen-41032.html`; `wb-124spider-rebranding-not-happen-41032.html`",
        alias: "E-40, D-12 (partial)",
        summary: "70.00.100A-NA flashed on an AU car; ID7 step skipped → serial needed; auto-lock missing"
    },
    {
        id: "A-17",
        title: "Odd man out — CMU update 74.00.230 (39761)",
        url: "https://www.124spider.org/threads/odd-man-out-cmu-update-74-00-230.39761/",
        author: "Garrettt93",
        dates: "Jun 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-cmu-74-00-230-39761.html`",
        alias: "F-14",
        summary: "Installed 74.00.230 NA: smoother; no rebrand (no ID7); asks about repacking .up"
    },
    {
        id: "A-18",
        title: "Mazda CarPlay/AA USB Retrofit Kit (38673)",
        url: "https://www.124spider.org/threads/mazda-apple-carplay-and-android-auto-usb-retrofit-kit.38673/",
        author: "frankmar",
        dates: "Jan 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-retrofit-kit-38673.html`; `wb-124spider-38673.html`",
        alias: "E-40",
        summary: "AliExpress genuine kit item 1005001447410048, ~US$106"
    },
    {
        id: "A-19",
        title: "All In One Tweaks V1.51 and Android Auto (42151)",
        url: "https://www.124spider.org/threads/all-in-one-tweaks-v1-51-and-android-auto.42151/",
        author: "derekperry37 (UK)",
        dates: "Oct 2022–Jan 2023",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-aio-151-aa-42151-p1/p2.html`",
        alias: "—",
        summary: "AA-tweak versions (1.13/1.14b/1.15/1.15b); don't mix tweak-AA with official AA"
    },
    {
        id: "A-20",
        title: "Installing AA via MZD-AIO on v56 (40537)",
        url: "https://www.124spider.org/threads/" +
            "installing-android-auto-using-the-mzd-aio-all-in-one-tweaks-installer-on-to-version-56.40537/",
        author: "LondonAbarth124",
        dates: "Oct 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-aa-via-aio-v56-40537.html`",
        alias: "—",
        summary: "Hub only needed for power/CarPlay; MZD-AIO AA \"compatible with v56\""
    },
    {
        id: "A-21",
        title: "Is the official Abarth/Fiat CMU SW downloadable? (38211)",
        url: "https://www.124spider.org/threads/is-the-official-abarth-fiat-cmu-sw-available-for-download.38211/",
        author: "jayrock (DE)",
        dates: "Oct 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-official-fiat-cmu-sw-38211.html`",
        alias: "—",
        summary: "Asks for genuine Fiat 59.00.561 EU N failsafe+reinstall — no one has it"
    },
    {
        id: "A-22",
        title: "Infotainment update (freeze) (39797)",
        url: "https://www.124spider.org/threads/infotainment-update.39797/",
        author: "DAC17",
        dates: "Jun 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-infotainment-update-39797.html`",
        alias: "—",
        summary: "Random lock-ups; reboot = hold Mute+Nav 10 s; Speedometer tweak blamed"
    },
    {
        id: "A-23",
        title: "Carplay Up and Running (30666)",
        url: "https://www.124spider.org/threads/carplay-up-and-running.30666/",
        author: "rsmagee (UK)",
        dates: "2018-08 → 2023 (29+ pp)",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`124spider-carplay-up-and-running-30666-p1/p25/p29.html`",
        alias: "E-05",
        summary: "First UK install (EU fw, £196); history of HiDrive moves, 335C lockout, ID7 v2 news"
    },
    {
        id: "A-24",
        title: "Mazda screen BHP1611J0D + CMU BJS7669C0K for sale (38459)",
        url: "https://www.124spider.org/threads/" +
            "124-spider-mazda-screen-bhp1611j0d-mazda_gen_65_cmu-bjs7669c0k-tweaks-installed.38459/",
        author: "manwithastick",
        dates: "Dec 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-mazda-screen-tweaks-38459.html`; `wb-124s-38459.*`",
        alias: "F-18",
        summary: "Mazda3 CMU BJS7669C0K fits Spider; not VIN-locked; 59.00.502 NA N + ID7 + AA Tru_Go"
    },
    {
        id: "A-25",
        title: "No sound with CarPlay (41439)",
        url: "https://www.124spider.org/threads/no-sound-with-carplay.41439/",
        author: "Natnat",
        dates: "Apr 2022",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-no-sound-carplay-41439.html`",
        alias: "—",
        summary: "No sound after install → a speaker connector not fully seated"
    },
    {
        id: "A-26",
        title: "Apple Carplay DIY or replace… (39874)",
        url: "https://www.124spider.org/threads/apple-carplay-diy-or-replace-with-a-different-infotainment.39874/",
        author: "cje11",
        dates: "Jun 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-carplay-diy-or-replace-39874.html`",
        alias: "—",
        summary: "~4 h; $150 hub + $100 wireless dongle; no DIN option for 7\" cars"
    },
    {
        id: "A-27",
        title: "Android Auto without hardware change (33670)",
        url: "https://www.124spider.org/threads/android-auto-without-hardware-change.33670/",
        author: "iassaei (EU)",
        dates: "Jul 2019",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-aa-without-hw-33670.html`",
        alias: "—",
        summary: "AA head-unit tweak runs on v56 without hub; ameridan: install ID7 anyway"
    },
    {
        id: "A-28",
        title: "Tweaks and Mods for dummies (37676)",
        url: "https://www.124spider.org/threads/tweaks-and-mods-for-dummies.37676/",
        author: "Spider Fan Buffalo",
        dates: "Jun 2020",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-tweaks-for-dummies-37676.html`",
        alias: "—",
        summary: "General encouragement; little technical content"
    },
    {
        id: "A-29",
        title: "February 2021 North America Nav update available (38950)",
        url: "https://www.124spider.org/threads/february-2021-north-america-nav-update-available.38950/",
        author: "—",
        dates: "Feb 2021",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`124spider-feb2021-nav-update-38950.html`",
        alias: "—",
        summary: "Map update (not firmware); not read in detail"
    },
    {
        id: "A-30",
        title: "V59.00.524 to Car Play / Android Auto (42352)",
        url: "https://www.124spider.org/threads/v59-00-524-to-car-play-android-auto.42352/",
        author: "2018 NA user",
        dates: "Sep–Oct 2022",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "`wb-124spider-59.00.524-to-carplay-42352.html`",
        alias: "E-41 (partial)",
        summary: "Serial-method upgrade from 59.00.524, \"no major issues\"; factory nav retained"
    },
    {
        id: "A-31",
        title: "CarPlay installation question (42640)",
        url: "https://www.124spider.org/threads/carplay-installation-question.42640/",
        author: "—",
        dates: "~2023",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "(not read)"
    },
    // Split from raw A-32, which bundled several pages under one id; each page is its own source.
    {
        id: "A-32a",
        title: "Ameridan \"Universal Version 70 Fiat AIO Tweak\", as referenced by the forum",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/",
        author: "ameridan",
        dates: "2019",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "(see B)",
        alias: "**= B-01**",
        summary: "Forum repeatedly says \"follow the blog / PDFs, not the OP\""
    },
    {
        id: "A-32b",
        title: "Ameridan \"V70 & V74 Tweaks without ID7\", as referenced by the forum",
        url: "https://21stcenturyfiat124spider.wordpress.com/2025/05/25/" +
            "v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/",
        author: "ameridan",
        dates: "2025",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "(see B)",
        alias: "**= B-04**",
        summary: "Forum points owners of locked v70/v74 at the blog's mp3-hack write-up"
    },
    {
        id: "F-03",
        title: "I bricked my CMU then recovered it (22986)",
        url: "https://www.124spider.org/threads/i-bricked-my-cmu-then-recovered-it.22986/",
        author: "Doriath; SJWhiteley; Mrphanbg",
        dates: "2017-12 → 2020-02",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "B",
        archive: "`F-rollback/124s-22986-p1.*`",
        alias: "—",
        summary: "Two full recovery write-ups (SPI-NOR squashfs passwd; CH341A boot-select FF→00)"
    },
    {
        id: "F-05",
        title: "Update my CMU and now I have Mazda (HELP) (45814)",
        url: "https://www.124spider.org/threads/update-my-cmu-and-now-i-have-mazda-help.45814/",
        author: "(owner)",
        dates: "2025-04 → 08",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/124s-45814-p1.*`; `wb-124spider-update-cmu-now-mazda-45814.html`",
        alias: "D-12 (partial)",
        summary: "Flashed 70.00.100A without ID7 → locked out; mp3 method; \"id7/serial no longer needed\""
    },
    {
        id: "F-06",
        title: "Issues with tweaks v1.51 after v70 CarPlay upgrade (40317)",
        url: "https://www.124spider.org/threads/issues-with-tweaks-v1-51-after-v70-carplay-upgrade.40317/",
        author: "kd215",
        dates: "2021-09",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/124s-40317-p1.*`",
        alias: "—",
        summary: "AIO 1.51 on v70 bricked CMU; used 2018 124 CMU $285; redid ID7→100→MazdaToFiat→AIO 2.8.6"
    },
    {
        id: "F-07",
        title: "Infotainment update question (41083)",
        url: "https://www.124spider.org/threads/infotainment-update-question.41083/",
        author: "(owner)",
        dates: "2022-01 → 2023-01",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-41083-p1.*`",
        alias: "—",
        summary: "2017 CMU into 2019 car; ID7 first; firmware before hub; mega link dead by 2023"
    },
    {
        id: "F-08",
        title: "Version 74.00.324 CMU Firmware Discussion (45963)",
        url: "https://www.124spider.org/threads/version-74-00-324-cmu-firmware-discussion.45963/",
        author: "madfiat et al.",
        dates: "2025-05 → 12",
        category: "forum-124spider",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/124s-45963-p1/p2.*`; `wb-124spider-v74-discussion-45963-p1/p2.html`",
        alias: "D-12 (partial)",
        summary: "v74.00.324 on 124 works; rebrand+nav via mp3 w/ script edits; \"need ORIGINAL USB module for " +
            "upgrade\""
    },
    {
        id: "F-11",
        title: "Install tweaks using Mazda mp3 hack to v59/v70 (45459)",
        url: "https://www.124spider.org/threads/install-tweaks-using-mazda-mp3-hack-to-v59-v70.45459/",
        author: "Esch",
        dates: "2024-12 → 2025-07",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-45459-p1.*`",
        alias: "—",
        summary: "mp3 hack reached diag/terminal on a v59 2019 Lusso; Fiat scripts not yet done then"
    },
    {
        id: "F-12",
        title: "Tweak firmware v74 and older with only USB (44940)",
        url: "https://www.124spider.org/threads/tweak-firmware-v74-and-older-with-only-usb.44940/",
        author: "(owner)",
        dates: "2024-08 → 2025-05",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-44940-p1.*`; `wb-124spider-tweak-v74-usb-only-44940.html`",
        alias: "—",
        summary: "Points to miata.net guide (posts 142/143); madfiat confirms on v70"
    },
    {
        id: "F-13",
        title: "SD card help needed (40534)",
        url: "https://www.124spider.org/threads/sd-card-help-needed.40534/",
        author: "(owner)",
        dates: "2021-10",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-40534-p1.*`",
        alias: "—",
        summary: "Used 2018 Lusso from Fiat dealer with 74.00.230 NA N: Mazda logo, compass-only nav; 74.00.230 " +
            "downgradable"
    },
    {
        id: "F-15",
        title: "Software program updates (43884)",
        url: "https://www.124spider.org/threads/software-program-updates.43884/",
        author: "(owner)",
        dates: "2023-11",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-43884-p1.*`; `wb-124spider-software-program-updates-43884.html`",
        alias: "—",
        summary: "Indie shop billed $515 for a \"software update\" on a 59.00.524 NA N car; no official Fiat access"
    },
    {
        id: "F-16",
        title: "Is it possible to upgrade the infotainment software (45237)",
        url: "https://www.124spider.org/threads/" +
            "is-it-possible-to-upgrade-the-infotainment-software-has-anyone-done-that.45237/",
        author: "UK owners",
        dates: "2024-10 → 2025-03",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/124s-45237-p1.*`",
        alias: "—",
        summary: "\"no hardware needed for AA, only CarPlay\" ❓ (contradicted by F-08)"
    },
    {
        id: "F-59",
        title: "Software debacle, part II (40588)",
        url: "https://www.124spider.org/threads/software-debacle-part-ii.40588/",
        author: "(owner)",
        dates: "2021-10",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "A Fiat dealership flashed Mazda 74.x onto a 59.00.562 NA N car by mistake"
    },
    {
        id: "F-60",
        title: "CMU serial port blown out (43811)",
        url: "https://www.124spider.org/threads/cmu-serial-port-blown-out.43811/",
        author: "(owner)",
        dates: "2023",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Bare TX wire touched CMU case → USB-TTL burned; serial no longer connectable (2019, 59.00.562)"
    },
    {
        id: "F-61",
        title: "Confirmed CarPlay through replacement CMU (42231)",
        url: "https://www.124spider.org/threads/confirmed-carplay-through-replacement-cmu.42231/",
        author: "(owner)",
        dates: "2022",
        category: "forum-124spider",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Confirmed path for locked 2018.5+ cars: fit used v56 CMU → ID7 → v70 → hub → tweaks"
    },
    {
        id: "E-39",
        title: "Updated CarPlay hardware / wireless / adapter-hub threads (43650, 43766, 42115, 43933, 43852)",
        url: "https://www.124spider.org/threads/updated-carplay-hardware-w-usb-c-and-fast-charging.43650/",
        author: "(owners)",
        dates: "2022–2025",
        category: "forum-124spider",
        status: "bot-blocked",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "USB-C (27 W PD) & wireless clone hubs; hub-only swap ≈10 min; wireless needs 74.00.200+"
    },
    {
        id: "B-01",
        title: "Universal Version 70 Fiat AIO Tweak",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/",
        dates: "2019-02-18, edits to 2025-08; 194 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/universal-version-70-fiat-tweak.*`, `ameridan-universal-v70-fiat-aio.html`, " +
            "`…-comments-p1.html`",
        alias: "**A-32a, C1-14, C2-06, E-02, F-42**",
        summary: "THE master guide: MazdaToFiatV70AIO + 68wooley Part 1/2; 335/352 neutralizeid7 warning; serial " +
            "pins; mp3-hack addendum"
    },
    {
        id: "B-02",
        title: "Fixing factory Navigation for Version 70 firmware",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/01/31/fix-navigation-for-version-70-firmware/",
        dates: "2019-01-31, edits to 02-16; 34 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/fix-navigation-for-version-70-firmware.*`, `ameridan-fix-navigation-v70.html`",
        alias: "**C1-15, C2-(nav), F-43**",
        summary: "Replace Mazda v70 `/jci/nng` with NA Fiat NNG folder → Fiat SD nav works; NA folder works " +
            "NA/EU/ADR, not JP"
    },
    {
        id: "B-03",
        title: "Common tweaks that work in the Fiat 124 Infotainment 7.0",
        url: "https://21stcenturyfiat124spider.wordpress.com/ameridans-radio-silencer/" +
            "common-tweaks-that-work-in-the-fiat-124-spider-infotainment-center-7-0/",
        dates: "2016-08 → 2025; 383 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/common-tweaks-that-work-…`, `common-tweaks-cp{1,2,3}.*`, `ameridan-common-tweaks.html`",
        alias: "**C2-02**",
        summary: "v56 tweaking; region/suffix legend; Fiat version list; ID7 \"#backdoor\" section; SPI-flash brick fix"
    },
    {
        id: "B-04",
        title: "V70 & V74 Tweaks without ID7 — YES YOU CAN! (mp3 hack)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2025/05/25/" +
            "v70-tweaks-without-id7-no-serial-connection-needed-yes-you-can/",
        dates: "2025-05-25; 40 comments to 2026-06",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/v70-tweaks-without-id7-…`, `ameridan-v70-tweaks-without-id7-mp3-hack.html`",
        alias: "**A-32b, C2-05, F-41**",
        summary: "madfiat's mp3-hack (mzd-connect-1-root + USB keyboard → terminal → tweaks.sh) on locked v70/v74; " +
            "v74 line edits"
    },
    {
        id: "B-05",
        title: "Preserve your ability to Tweak in future firmware versions (ID7 v1)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2017/08/29/" +
            "preserve-your-ability-to-tweak-in-future-firmware-versions/",
        dates: "2017-08-29",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/preserve-your-ability-…`, `ameridan-preserve-tweak-id7.html`",
        alias: "**C2-01**",
        summary: "ID7 autorun v1 (`autorun_copy_to_usb.zip`); why 59.00.502 locked USB; install on 56.x"
    },
    {
        id: "B-06",
        title: "Preserve … VERSION 2.0 (ID7 v2)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/05/20/" +
            "preserve-your-ability-to-tweak-in-future-firmware-versions-version-2-0/",
        dates: "2019-05-20; 8 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/preserve-…-version-2-0.*`, `ameridan-preserve-tweak-v2-id7v2.html`",
        alias: "**C2-04**",
        summary: "trezdog44's ID7 Recovery v2 vs 70.00.335-C neutralizeid7; \"no v2 before .335 = never tweak again\""
    },
    {
        id: "B-07",
        title: "Replacing Mazda bootup/shutdown animations",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/11/04/" +
            "replacing-mazda-bootup-shutdown-for-those-installing-carplay-hub/",
        dates: "2018-11-04, upd. 2019-01-31; 10 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/replacing-mazda-bootup-shutdown-…`, `ameridan-v70-boot-animations.html`",
        alias: "—",
        summary: "Version_70_{Fiat,Abarth}_Boot.zip / Uninstall_Animations; serial wiring; order id7→v70→hub"
    },
    {
        id: "B-08",
        title: "Freeing up memory in Version 70 firmware",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/11/11/freeing-up-memory-in-version-70-firmware/",
        dates: "2018-11-11, upd. to 2025-03; 17 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/freeing-up-memory-…`, `ameridan-freeing-memory-v70-jci-test-mode.html`",
        alias: "—",
        summary: "RemoveNNG.zip, JCI_Test_Mode_Control.zip (T/M button → USB DRIVER/TERMINAL = basis of mp3 hack)"
    },
    {
        id: "B-09",
        title: "Replacing the CMU to get CarPlay/AA (+ retrofit kit)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/04/30/" +
            "replacing-the-cmu-to-get-apple-carplay-and-android-auto/",
        dates: "2018-04-30, upd. to 2023-02; 15 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/replacing-the-cmu-to-get-…`, `ameridan-carplay-retrofit-kit.html`",
        alias: "**E-01, F-45**",
        summary: "Retrofit kit details: hub TK78-66-9U0C (orange/Japan vs green KD5J China), cable sets, ASH8 order " +
            "rules"
    },
    {
        id: "B-10",
        title: "New Fiat firmware is showing up (59.00.524)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/04/22/new-fiat-firmware-is-showing-up/",
        dates: "2018-04-22; 10 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/new-fiat-firmware-is-showing-up.*`, `ameridan-new-fiat-firmware-59.html`",
        alias: "**C2-03, F-44**",
        summary: "2018 NA Abarth ships 59.00.524 (≈Mazda 59.00.502) → USB tweaks impossible; install id7 before " +
            "dealer visit"
    },
    {
        id: "B-11",
        title: "Exclusive Tweak ~ An Abarth Shutdown Animation",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/10/03/exclusive-tweak-an-abarth-shutdown-animation/",
        dates: "2018-10-03",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/exclusive-tweak-an-abarth-shutdown-animation.*`",
        alias: "—",
        summary: "ExitLogo.ivf (754 KB) by Stef for AIO 1.51Fiat_d; memory warning for v70"
    },
    {
        id: "B-12",
        title: "Abarth 124 startup screens / unique parts",
        url: "https://21stcenturyfiat124spider.wordpress.com/2017/03/11/abarth-124-startup-screens/",
        dates: "2017-03-11, upd. to 2022-11; 30 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/abarth-124-startup-screens.*`",
        alias: "—",
        summary: "Option [X] Abarth boot animation (EU fw files); ffmpeg `.ivf` (VP8) build commands"
    },
    {
        id: "B-13",
        title: "New USB Audio Tweak",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/10/19/new-usb-audio-patch-tweak/",
        dates: "2018-10-19; 7 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/new-usb-audio-patch-tweak.*`",
        alias: "—",
        summary: "`USB_Tweak.zip` (Enlsen's USB Audio Mod, AIO 2.8.0) — v55–59.00.449 only, NOT v70"
    },
    {
        id: "B-14",
        title: "Update for Date-to-Statusbar Tweak",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/11/03/update-for-date-to-statusbar-tweak/",
        dates: "2018-11-03, upd. 11-11; 8 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/update-for-date-to-statusbar-tweak.*`",
        alias: "—",
        summary: "`StatusBar_Tweak.zip` (AIO 2.8.2; works v56/59/70 with id7); downgrade below 59.00.502 impossible"
    },
    {
        id: "B-15",
        title: "Resolving Touchscreen Issues",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/02/03/tweak-to-disable-touchscreen-input/",
        dates: "2018-02-03, upd. to 2025-07; 8 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/tweak-to-disable-touchscreen-input.*`",
        alias: "—",
        summary: "trezdog44's Fully-Disable-Touchscreen.zip; screen part #s; ash8's blind factory-reset for black " +
            "screens"
    },
    {
        id: "B-16",
        title: "Adding Wireless CarPlay",
        url: "https://21stcenturyfiat124spider.wordpress.com/2021/01/04/adding-wireless-carplay/",
        dates: "2021-01-04, upd. to 05-31; 22 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/adding-wireless-carplay.*`",
        alias: "**E-03**",
        summary: "Wireless CP needs 74.00.200+ AND new CMU hardware → not for our CMU; dongle reports"
    },
    {
        id: "B-17",
        title: "Infotainment Replacement Touch-Screen Details",
        url: "https://21stcenturyfiat124spider.wordpress.com/2022/08/14/infotainment-replacement-screen-details/",
        dates: "2022-08-14, upd. to 2023-04; 14 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/infotainment-replacement-screen-details.*`",
        alias: "**F-46**",
        summary: "Delamination fix: digitizer TM070RDZ38; Mazda screen assy D0YP-61-1JZ (all 124 years); TSB pdf"
    },
    {
        id: "B-18",
        title: "Encouraging news re CarPlay and Android Auto",
        url: "https://21stcenturyfiat124spider.wordpress.com/2017/03/15/" +
            "encouraging-news-regarding-apple-carplay-and-android-auto/",
        dates: "2017-03-15; 10 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/encouraging-news-…*`",
        alias: "—",
        summary: "Mazda's 2017 CP/AA announcement; JCI/Visteon Linux CMU background"
    },
    {
        id: "B-19",
        title: "M.Y. 2019 Fiat Connect?",
        url: "https://21stcenturyfiat124spider.wordpress.com/2017/09/25/my-2019-fiat-connect/",
        dates: "2017-09-25; 7 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/my-2019-fiat-connect.*`",
        alias: "—",
        summary: "CMU supplier speculation; 70.00.00 beta screenshots; expectation Fiat would release v70 (never did)"
    },
    {
        id: "B-20",
        title: "Navigation",
        url: "https://21stcenturyfiat124spider.wordpress.com/2016/10/30/navigation/",
        dates: "2016-10-30, upd. to 2021-02; 176 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/navigation.*`, `navigation-cp1.*`",
        alias: "—",
        summary: "Mopar card 68366118AA, suffix legend, VIN-lock (62 mi), Toolbox, XCOPY cloning, NA map saga"
    },
    {
        id: "B-21",
        title: "New map updates (December 2018)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/12/10/" +
            "new-map-updates-dated-december-2018-are-available/",
        dates: "2018-12-10; 7 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/new-map-updates-dated-december-2018-…*`",
        alias: "—",
        summary: "Dec-2018 NA / Feb-2019 EU maps; manual-copy theory (keep `license`)"
    },
    {
        id: "B-22",
        title: "New map updates (August 2022, was June 2019)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/06/07/new-map-updates-dated-june-2019-are-available/",
        dates: "2019-06-07, upd. to 2023-12; 46 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/new-map-updates-dated-june-2019-…*`",
        alias: "—",
        summary: "Last maps ever = Aug 2022; Toolbox EOL Dec 2023; 16 GB card imaging"
    },
    {
        id: "B-23",
        title: "Welcome / Radio Silencer (home)",
        url: "https://21stcenturyfiat124spider.wordpress.com/ameridans-radio-silencer/",
        dates: "2016→; 62 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/ameridans-radio-silencer.html`",
        alias: "—",
        summary: "Home; comments = 70.00.100 source hunting, 59.00.562 \"not tweakable\", serial pointer"
    },
    {
        id: "B-24",
        title: "Blog articles (index)",
        url: "https://21stcenturyfiat124spider.wordpress.com/blog/",
        dates: "index",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/blog.html`",
        alias: "—",
        summary: "Post index (titles/dates)"
    },
    {
        id: "B-25",
        title: "Complete Specifications",
        url: "https://21stcenturyfiat124spider.wordpress.com/specs/",
        dates: "living; 243 comments",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/specs.html`",
        alias: "—",
        summary: "CMU apps list, TSB table (screen TSB 09-036 ❓ vs 09-136/22), Mazda Connect FAQ PDF"
    },
    {
        id: "B-26",
        title: "The Infotainment Control Buttons",
        url: "https://21stcenturyfiat124spider.wordpress.com/2016/11/16/the-infotainment-control-buttons/",
        dates: "2016-11-16",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/the-infotainment-control-buttons.html`",
        alias: "—",
        summary: "Diagnostics key combos (Music+Favorites+Mute), test options 11–19, \"DISPLAY TOGGLE = black screen\""
    },
    {
        id: "B-27",
        title: "TAU exchange hookup (EU⇔NA tuner)",
        url: "https://21stcenturyfiat124spider.wordpress.com/2021/06/11/" +
            "european-%e2%87%94-north-american-tuner-module-tau-exchange-hookup/",
        dates: "2021-06-11",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/european-___-north-american-tuner-module-tau-exchange-hookup.html`",
        alias: "—",
        summary: "Market switch: firmware region flash reprograms tuner; TAU part readout (Test 85)"
    },
    // Split from raw B-28, which bundled several pages under one id; each page is its own source.
    {
        id: "B-28a",
        title: "Gracenote music database version 12 update",
        url: "https://21stcenturyfiat124spider.wordpress.com/2022/12/05/gracenote-music-database-version-12-update/",
        dates: "2022-12-05",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/gracenote-music-database-version-12-update.html`",
        summary: "January 2022 database, \"probably the last one\"; Gracenote_{EU,NA,ADR,JP}_January2022.up on " +
            "s3.amazonaws.com/visteon; how to disable Gracenote. ⚠️ Raw B also records \"v70 resets Gracenote to " +
            "v8\" for this series without naming the post"
    },
    {
        id: "B-28b",
        title: "Gracenote music database version 9 update",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/10/16/gracenote-music-database-version-9-update/",
        dates: "2018-10-16",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/gracenote-music-database-version-9-update.html`",
        summary: "June 2018 database; \"Disabling Gracenote\" section; superseded by v12 (B-28a)"
    },
    {
        id: "B-28c",
        title: "Gracenote music database version 8 update",
        url: "https://21stcenturyfiat124spider.wordpress.com/2017/12/22/gracenote-music-database-version-8-update/",
        dates: "2017-12-22",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/gracenote-music-database-version-8-update.html`",
        summary: "Version 8 database; early 124s shipped with version 5 (2015); superseded by v9"
    },
    {
        id: "B-28d",
        title: "Gracenote music database update",
        url: "https://21stcenturyfiat124spider.wordpress.com/2016/09/29/gracenote-music-database-update/",
        dates: "2016-09-29",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/gracenote-music-database-update.html`",
        summary: "The first update post: what the database does, the .up install procedure from USB"
    },
    {
        id: "B-29",
        title: "Supporting/context posts (fuel-economy, screenshots, BT, camera, canbus, waypoints, emblem, about, " +
            "favorites…)",
        dates: "various",
        category: "blog-ameridan",
        status: "alive",
        trust: "C",
        archive: "`ameridan/*.html`",
        alias: "—",
        summary: "Archived for completeness; no firmware/upgrade facts beyond the above. The 14 URL paths are " +
            "listed in raw B §1.3"
    },
    {
        id: "C2-10",
        title: "AIO Tweaks and Firmware Ver .502 – READ THIS (200450)",
        author: "arathol 2017-06; Trezdog44/id7 posts",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-aio-tweaks-fw-502-200450-p*.html`",
        alias: "—",
        summary: "Origin of ID7: id7's analysis of the .502 lockdown; autorun.v2/v3 zips; Tristan-cx5 \"what works " +
            "where\""
    },
    {
        id: "C2-11",
        title: "ID7 Recovery v2 (234619)",
        author: "Trezdog44 2019-05-20 →",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-id7-recovery-v2-234619-p*.html`",
        alias: "**F-29**; see B-06",
        summary: "Pre-installed v2 FAILED on 335; working method = serial during update; redo after every flash; 367 no"
    },
    {
        id: "C2-16",
        title: "MZD I connect firmware info/hints (236211)",
        author: "Tristan-cx5 2019-08-29 →",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-mzd-i-connect-firmware-info-hints-236211.html`; `F-rollback/m3r-236211-p1.*`",
        alias: "**D-05, F-24**",
        summary: "Best plain-English explainer: region codes, suffixes, update/downgrade rules (floor 59.00.502)"
    },
    {
        id: "D-06",
        title: "Mazda-MZD Connect FIRMWARE Downloads-UPDATED (180578)",
        author: "ASH8",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-firmware-downloads-updated-180578.html`; `F-rollback/m3r-180578-p1.*`",
        alias: "**F-33**",
        summary: "Original file index (links DMCA-stripped); \"born on ≥59.00.xxxx DO NOT roll back\"; nav-SD VIN lock"
    },
    {
        id: "D-07",
        title: "NEW 74 Mazda CONNECT MZD Firmware, CP/AA, WCP, Help (236775)",
        author: "ASH8",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-new-74-firmware-236775.html`, `wb-m3r-236775-p13.html`",
        alias: "see A-§3 (post-2520624)",
        summary: "Current distribution hub; files only by PM to @ASH8 (MEGA link)"
    },
    {
        id: "C2-17",
        title: "MZD-AIO tweak on FW 74+ (252435)",
        author: "aeromiata 2024-11 → 2025-03",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-aio-tweak-on-fw74-252435.html`",
        alias: "—",
        summary: "mp3-hack on 74.00.324A EU; run.sh `-eq 70`→`-eq 74`; 74.00.331 wireless-CP warning; downgrade floors"
    },
    {
        id: "C2-18",
        title: "AIO tweaks in 59 and 70 version (240484)",
        author: "2020-04 → 08",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`wb-m3r-aio-tweaks-in-59-and-70-240484.html`",
        alias: "—",
        summary: "Tristan-cx5: serial for 59.00.504/70.00.100; ID7v2 for .335/.352; \"do not update to .367 NA\""
    },
    {
        id: "C2-20",
        title: "old 70.00.367A (240820) / update 367 to last (246357)",
        author: "Albuyeh 2020-06 →",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`wb-m3r-old-70.00.367A-240820.html`, `wb-m3r-old-367A-p2.html`, " +
            "`wb-m3r-update-367-to-last-246357.html`",
        alias: "—",
        summary: "367 has same neutralize_ID7.sh as 335C; \"367 WILL BREAK YOUR SERIAL\"; 74.00.324A released"
    },
    {
        id: "E-07",
        title: "GENUINE CarPlay + Android Auto ALL HERE NOW (230249)",
        author: "ASH8 et al., 2018–2020, 183+ pp",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`hardware/wb-m3r-230249-p183-2018.html`",
        alias: "see D-09/E-06",
        summary: "Same retrofit material as E-06 at scale; \"0000-8F-Z34 on eBay for some time (US)\""
    },
    {
        id: "E-17",
        title: "Mazda nav does not work after installing AA/CarPlay hub (244127)",
        author: "2021-10 → 2022-11",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`hardware/wb-m3r-244127-p1/p2.html`",
        alias: "—",
        summary: "Clone hubs → SD nav not read / no GPS; genuine TK78-66-9U0D fixed it; clone-cable defects"
    },
    {
        id: "E-18",
        title: "Retrofit kits / firmware (248785)",
        author: "2023-08 → 09",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "C",
        archive: "`hardware/wb-m3r-248785-p1/p2.html`",
        alias: "—",
        summary: "\"Market flooded with clones\"; HMYC ~£80; genuine TK78-66-9U0E ~$200; dealer eBay seller"
    },
    {
        id: "E-37",
        title: "CarPlay diagram installation (228689)",
        author: "2017–2018",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Pre-release hub experiments: K1414 9U0A / KD5J-66-9U0 (green, China) under-powered"
    },
    {
        id: "F-19",
        title: "black-screen-mzd (229891, 18 pp)",
        author: "raoulh et al., 2018-08 → 2026-07",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`F-rollback/m3r-229891-p1..9,11,18.*`; `wb-m3r-black-screen-p11/p13.html`",
        alias: "—",
        summary: "THE recovery thread: CH341A/RPi flashrom, offsets, chips, rescue .bin, downgrade locks, forced " +
            "failsafe"
    },
    {
        id: "F-20",
        title: "Successful downgrade 70.00.021A → 59.00.545A (230305)",
        author: "p82maarj/hrm701/Tristan-cx5 2018-09 → 2020-01",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-230305-p1.*`",
        alias: "—",
        summary: "Downgrade by standard procedure; file-order dispute; \"only as far as 59.00.502\"; serial to tweak"
    },
    {
        id: "F-21",
        title: "Firmware downgrade (242237)",
        author: "Tristan-cx5 2020-12 → 2021-09",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`F-rollback/wb-m3r-242237.*`",
        alias: "—",
        summary: "Photo test: on 70.00.335 the USB list hides <59.00.502; serial options per version; 367 can't be " +
            "enabled"
    },
    {
        id: "F-22",
        title: "Update half-installed, now black screen (242671)",
        author: "2021-02-23",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/wb-m3r-242671.*`",
        alias: "—",
        summary: "56→70 4A: failsafe OK, reinstall stuck \"Connecting to firmware\", turned off → black"
    },
    {
        id: "F-23",
        title: "Black screen after failed update — CMU dead, Mazda6 GJ (254150)",
        author: "kuschi79/Tristan-cx5 2025-06 → 07",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-254150-p1.*`",
        alias: "—",
        summary: "Failsafe then battery disconnect → black; DTC U3000:42; any MZD-1 CMU works as replacement"
    },
    {
        id: "F-24",
        title: "MZD i-connect firmware info/hints (236211, sticky)",
        author: "Tristan-cx5 2019-08-29",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-236211-p1.*`",
        alias: "**= C2-16 / D-05**",
        summary: "2-file before .335 / 1 after; ≥31.00.100 → latest; downgrade to 59.00.502; format on Windows"
    },
    {
        id: "F-25",
        title: "Is NA car with EU firmware possible (243977)",
        author: "2021-09",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m3r-243977-p1.*`",
        alias: "—",
        summary: "EU firmware on NA car: no brick, radio freqs shift (TAU); 70.00.100A then 70.00.367"
    },
    {
        id: "F-26",
        title: "My CMU fail-safe version not available, how to fix (241706)",
        author: "2020-10 → 2021-08",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-241706-p1.*`",
        alias: "—",
        summary: "\"Failsafe file installation failed\"; causes: bad checksum, AIO tweaks present, new hub fitted first"
    },
    {
        id: "F-27",
        title: "Downgrading firmware (201994)",
        author: "d3vi1/alej0, 2017",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-201994-p1.*`",
        alias: "—",
        summary: "<59.00.502 downgrade free; ≥.502 only via NOR programmer; forced failsafe installs first reinstall.up"
    },
    {
        id: "F-28",
        title: "USB thumb drive for FW updates (246137)",
        author: "2022-08",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m3r-246137-p1.*`",
        alias: "—",
        summary: "Sticks that worked/failed (SanDisk Ultra 32, Cruzer 16, Verbatim 8, Transcend 8; one 8 GB failed)"
    },
    {
        id: "F-30",
        title: "Cannot install update package (235497)",
        author: "2019-07 → 2023",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m3r-235497-p1.*`",
        alias: "—",
        summary: "\"Install Not Successful: System Failure\" loop; other/older/smaller stick, verify hashes, remove " +
            "Nav SD"
    },
    {
        id: "F-31",
        title: "Install not successful (226986)",
        author: "2018 → 2025",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m3r-226986-p1.*`",
        alias: "—",
        summary: "Fixed by an old 2 GB USB 2.0 stick; \"usb 3.0 will not work\" (some do)"
    },
    {
        id: "F-32",
        title: "Firmware version mayhem (244479)",
        author: "2021-12 → 2023",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m3r-244479-p1.*`",
        alias: "—",
        summary: "74 is 1-file; 56→74 directly \"should be fine\"; 70.00.021 buggiest v70; links removed by " +
            "copyright " +
            "owners"
    },
    {
        id: "F-29",
        title: "ID7 Recovery v2 (234619)",
        author: "Trezdog44 2019-05-20",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-234619-p1.*`",
        alias: "**= C2-11**",
        summary: "70.00.335-C neutralizeid7; \"no recovery installed = no tweak, serial won't even work\" (later " +
            "relaxed)"
    },
    {
        id: "F-33",
        title: "Mazda MZD Connect firmware downloads-updated (180578, sticky)",
        author: "ASH8",
        category: "forum-mazda3revolution",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/m3r-180578-p1.*`",
        alias: "**= D-06**",
        summary: "\"Fail Safe Version\" in About; \"born ≥59.00.xxxx DO NOT roll back\"; nav SD locked to CMU+VIN " +
            "after 100 km"
    },
    {
        id: "D-09",
        title: "GENUINE MAZDA CarPlay+AA Install Instructions UPDATED (miata.net t=679114)",
        url: "https://forum.miata.net/vb/showthread.php?t=679114",
        author: "ASH8, upd. 2018-10-02",
        category: "forum-other",
        status: "login-walled",
        trust: "B",
        archive: "`wb-miatanet-679114-showthread-20250207.html`; `hardware/wb-miatanet-679114-*`",
        alias: "**E-06**",
        summary: "Canonical ND retrofit post: per-region 70.00.021 filenames + cable/hub part numbers + MME facts"
    },
    {
        id: "F-56",
        title: "mp3-hack origin thread (miata.net t=782788, posts 142/143)",
        url: "https://forum.miata.net/vb/showthread.php?t=782788",
        author: "2024-06 →",
        category: "forum-other",
        status: "login-walled",
        trust: "C",
        archive: "`F-rollback/miata-net-post142.loginwall.txt`",
        alias: "see C2-26",
        summary: "Origin of the mp3 hack; cited via A-13/B-04/F-10/F-41"
    },
    {
        id: "F-57",
        title: "Install Not Successful (miata.net t=716112)",
        url: "https://forum.miata.net/vb/showthread.php?t=716112",
        author: "2019 RF owner",
        category: "forum-other",
        status: "login-walled",
        trust: "C",
        archive: "`wb-miatanet-716112.html`, `wb-miatanet-t716112-install-not-successful.html`",
        alias: "—",
        summary: "70.00.100A reinstall started before failsafe; ROOM-fuse retries until it worked; knob trick"
    },
    {
        id: "D-08",
        title: "mazdas247 \"DIY Firmware Update Information\" + 74.00.324A / 70.00.367 threads (123881478, " +
            "123883736, " +
            "123875753)",
        author: "—",
        category: "forum-other",
        status: "alive",
        trust: "B",
        archive: "(WebFetch summaries); `wb-mazdas247-*.html`",
        alias: "—",
        summary: "Files via PM to @Candurin; public links dead"
    },
    {
        id: "F-35",
        title: "2016 CX-5 CMU bricked after firmware update (mazdas247 123884841)",
        url: "https://mazdas247.com/forum/threads/" +
            "2016-cx-5-cmu-bricked-after-firmware-update-black-screen-but-radio-works.123884841/",
        author: "2026-05 → 08",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m247-123884841-p1.*`",
        alias: "—",
        summary: "Technician update w/ windows open/alarm/key away → black; NAV+BACK+MUTE + battery useless; CH341A " +
            "planned"
    },
    {
        id: "F-36",
        title: "Firmware update stuck at 19–21% and frozen radio (mazdas247 123883481)",
        url: "https://mazdas247.com/forum/threads/" +
            "mazda-connect-firmware-update-stuck-at-19%E2%80%9321-and-frozen-radio.123883481/",
        author: "2025-08",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m247-123883481-p1.*`",
        alias: "—",
        summary: "56→70.00.100A EU stuck then \"unsuccessful\"; fixed with a branded (Toshiba) FAT32 stick"
    },
    {
        id: "F-37",
        title: "Issues updating firmware, help (mazdas247 123884804)",
        url: "https://mazdas247.com/forum/threads/issues-updating-firmware-help.123884804/",
        author: "2026-05-14",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m247-123884804-p1.*`",
        alias: "—",
        summary: "Textbook brick: failsafe done, car switched off before reinstall → black; ROOM fuse/battery/ACC " +
            "useless"
    },
    {
        id: "F-34",
        title: "Bricked CMU, offset 0x10000 to FF and still bricked (mazda6club 444748)",
        url: "https://www.mazda6club.com/threads/bricked-cmu-replaced-offset-0x10000-to-ff-and-still-bricked.444748/",
        author: "2021-03",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/m6c-444748-p1.*`; `mazda6club-440990-p1.html`, `wb-mazda6club-440990*.html`",
        alias: "—",
        summary: "Boot-select patch alone did not revive (serial also dead) → F-19 rescue .bin"
    },
    {
        id: "E-06",
        title: "GENUINE Mazda CarPlay+AA Install Instructions (miata.net t=679114)",
        url: "https://forum.miata.net/vb/showthread.php?t=679114",
        author: "ASH8, 2018-08-08 upd. 2018-10-02",
        category: "forum-other",
        status: "bot-blocked",
        trust: "B",
        archive: "`hardware/wb-miatanet-679114-showthread-20201112.html`",
        alias: "**= D-09**",
        summary: "Per-region firmware + cable + hub p/ns; A/B hubs don't work with 70.00.021x; EU €220/€360"
    },
    {
        id: "E-19",
        title: "ND DIY Apple CarPlay or Android Auto (mx5oc.co.uk t/121452)",
        url: "https://forum.mx5oc.co.uk/t/nd-diy-apple-carplay-or-android-auto/121452",
        author: "SkeppColls et al., 2021-05 → 2025-01",
        category: "forum-other",
        status: "bot-blocked",
        trust: "B",
        archive: "`hardware/mx5oc-121452.json`, `-p2.json`",
        alias: "—",
        summary: "UK RHD DIY: eBay US dealer $148; AliExpress £90 \"genuine article\"; second-hand K1414 hub"
    },
    {
        id: "E-20",
        title: "UK ND RHD CarPlay retrofit (pistonheads t=2024557)",
        url: "https://www.pistonheads.com/gassing/topic.asp?h=0&f=185&t=2024557",
        author: "UK, 2021–2022",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "`hardware/pistonheads-2024557.html`",
        alias: "—",
        summary: "Amazon kit £120, 2 h, GPS cable left unplugged; dealer quotes £350/£467"
    },
    {
        id: "E-27",
        title: "UK CX-3 kit part list (cx3forums.co.uk t=1427)",
        url: "https://www.cx3forums.co.uk/viewtopic.php?t=1427",
        author: "UK CX-3 owners, 2018",
        category: "forum-other",
        status: "bot-blocked",
        trust: "C",
        archive: "`cx3forumsuk-t2170/t2276/t2507.html`, `wb-cx3forum-11610-*.html`",
        alias: "—",
        summary: "UK dealer kit £174.37 = C830-V6-60Z + C830-V6-693 tape + TK78-66-9U0C + manual 4100-77-300EN"
    },
    // Split from raw D-14, which bundled several pages under one id; each page is its own source.
    {
        id: "D-14a",
        title: "mikele85.ru (Russian EU firmware list)",
        url: "https://mikele85.ru/",
        dates: "2020s",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "—",
        summary: "Lists EU span cmu140_EU_30.00.100A … cmu150_EU_74.00.324A; files paid/Telegram/Yandex. Only the " +
            "host was recorded"
    },
    {
        id: "D-14b",
        title: "drive2.ru build-log (EU 74.00.324 over JP 59.00.332)",
        url: "https://www.drive2.ru/",
        dates: "2020s",
        category: "forum-other",
        status: "alive",
        trust: "C",
        archive: "—",
        summary: "A build-log documents a direct JP 59.00.332 → EU 74.00.324 flash, to add Russian. Only the host " +
            "was recorded, not the post"
    },
    {
        id: "D-15",
        title: "Regional ASH8-material mirrors (mx5oc.co.uk, mx5life.com, cx3forums, mazda6club.com; mx5blog.co.uk)",
        author: "—",
        category: "forum-other",
        status: "alive",
        trust: "B",
        archive: "`mx5life-51411-p1.html`, `wb-mx5life-51411.html`",
        alias: "—",
        summary: "Same ASH8 files by PM; mx5blog documents a real 70.00.367 EU N → 74.00.324 EU N single-file upgrade"
    },
    {
        id: "C1-01",
        title: "Trevelopment/MZD-AIO (main app)",
        url: "https://github.com/Trevelopment/MZD-AIO",
        type: "GitHub repo",
        author: "Trevelopment (Trevor G. Martin)",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mzd-aio-readme.md`",
        alias: "—",
        summary: "THE AIO installer GUI; Electron+AngularJS; GPL v3; 684★; last release v2.8.6 (2020-04-08)"
    },
    {
        id: "C1-02",
        title: "Trevelopment/MZD-AIO-TI (original repo)",
        url: "https://github.com/Trevelopment/MZD-AIO-TI",
        type: "GitHub repo",
        author: "Trevelopment",
        category: "github",
        status: "dead",
        trust: "B",
        archive: "—",
        alias: "—",
        summary: "Original name; DMCA-blocked since 2017-03-06 (NNG takedown) → app renamed to MZD-AIO"
    },
    {
        id: "C1-03",
        title: "Trevelopment/MZD-AIO-UI",
        url: "https://github.com/Trevelopment/MZD-AIO-UI",
        type: "GitHub repo",
        author: "—",
        category: "github",
        status: "dead",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Does not exist"
    },
    {
        id: "C1-04",
        title: "GitHub REST API (Trevelopment repos)",
        url: "https://api.github.com/repos/Trevelopment/...",
        type: "API",
        author: "GitHub",
        category: "github",
        status: "alive",
        trust: "A",
        archive: "—",
        alias: "—",
        summary: "Source of repo/release metadata"
    },
    {
        id: "C1-05",
        title: "MZD-AIO releases API dump",
        url: "https://github.com/Trevelopment/MZD-AIO/releases",
        type: "JSON dump",
        author: "—",
        category: "github",
        status: "alive",
        trust: "A",
        archive: "`mzd-aio-releases.json`",
        alias: "—",
        summary: "14 releases, full JSON (tags/dates/assets/sizes/URLs)"
    },
    {
        id: "C1-06",
        title: "MZD-AIO releases text summary",
        url: "https://github.com/Trevelopment/MZD-AIO/releases",
        type: "text",
        author: "—",
        category: "github",
        status: "alive",
        trust: "A",
        archive: "`mzd-aio-releases.txt`",
        alias: "—",
        summary: "tag/date/asset/size/URL summary"
    },
    {
        id: "C1-07",
        title: "MZD-AIO README (archived)",
        url: "https://github.com/Trevelopment/MZD-AIO",
        type: "README",
        author: "—",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mzd-aio-readme.md`",
        alias: "—",
        summary: "README of v2.8.x; no Fiat/124/ID7/nav-restore options; supported-car list"
    },
    {
        id: "C1-08",
        title: "MZD-AIO issue #135 comments (archived)",
        url: "https://github.com/Trevelopment/MZD-AIO/issues/135",
        type: "issue thread",
        author: "community",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mzd-aio-issue-135-comments.md`",
        alias: "**C2-14, F-54b**",
        summary: "Serial doesn't work for 70.00.367 EU; signed updates; only path = downgrade to 352"
    },
    {
        id: "C1-09",
        title: "MZD-AIO latest release asset (spot-check)",
        url: "https://github.com/Trevelopment/MZD-AIO/releases/download/v2.8.6/MZD-AIO-TI_Setup_2.8.6.exe",
        type: "binary",
        author: "Trevelopment",
        category: "github",
        status: "alive",
        trust: "A",
        archive: "—",
        alias: "—",
        summary: "v2.8.6 installer, 191,084,384 B; spot-checked present"
    },
    {
        id: "C1-10",
        title: "MZD-AIO wiki",
        url: "https://github.com/Trevelopment/MZD-AIO/wiki",
        type: "wiki",
        author: "—",
        category: "github",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "\"Create the first page\" — no pages; docs live on mazdatweaks.com / Ameridan's blog"
    },
    {
        id: "C1-11",
        title: "mazdatweaks.com (project homepage)",
        url: "https://mazdatweaks.com",
        type: "website",
        author: "Trevelopment",
        category: "github",
        status: "hijacked",
        trust: "B",
        archive: "`mazdatweaks-home.html`",
        alias: "**C2-07**",
        summary: "Project homepage; \"FW V55–V70 supported; .502+ serial; .335+ id7\"; ID7_Recovery Pack changelog"
    },
    {
        id: "C1-12",
        title: "AIO download mirror",
        url: "http://dl.mazdatweaks.win",
        type: "mirror",
        author: "Trevelopment",
        category: "github",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Redirect shown in README badge; patched Speedometer for AIO 2.8.4"
    },
    {
        id: "C1-13",
        title: "Ameridan derivative `MazdaToFiatV70AIO.zip`",
        url: "http://www.mediafire.com/file/zj0cp690a7x5rq1/MazdaToFiatV70AIO.zip/file",
        type: "tweak zip",
        author: "ameridan/68wooley",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`downloads/ameridan/MazdaToFiatV70AIO.zip` (SHA256 9d8fe6d8…, 37,724,156 B)",
        alias: "see B-01/§3.3, C2-06",
        summary: "Master repackage: Mazda→Fiat/Abarth branding + boot logos + NNG nav for v70; AIO 2.8.3 base"
    },
    {
        id: "C1-14",
        title: "Ameridan \"Universal V70 Fiat AIO Tweak\" article",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/02/18/universal-version-70-fiat-tweak/",
        type: "blog",
        author: "ameridan",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "(see B)",
        alias: "**= B-01**",
        summary: "(blog content covered by theme B)"
    },
    {
        id: "C1-15",
        title: "Ameridan \"Fix Navigation for v70\" article",
        url: "https://21stcenturyfiat124spider.wordpress.com/2019/01/31/fix-navigation-for-version-70-firmware/",
        type: "blog",
        author: "ameridan",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "(see B)",
        alias: "**= B-02**",
        summary: "(blog content covered by theme B)"
    },
    {
        id: "C2-07",
        title: "mazdatweaks.com home",
        url: "https://mazdatweaks.com/",
        type: "website",
        author: "Trevelopment",
        category: "github",
        status: "hijacked",
        trust: "B",
        archive: "`mazdatweaks-home.html`",
        alias: "**= C1-11**",
        summary: "Supported FW statement; serial/id7 approach notes"
    },
    {
        id: "C2-08",
        title: "mazdatweaks.com/serial (Albuyeh serial instructions)",
        url: "https://mazdatweaks.com/serial/",
        type: "guide",
        author: "Albuyeh",
        category: "github",
        status: "hijacked",
        trust: "B",
        archive: "`mazdatweaks-serial-wayback.html`; `F-rollback/mazdatweaks-serial.HIJACKED-2026-08-23.html`",
        alias: "see F-52a",
        summary: "Serial (CP2102, TX/RX/GND, 115200) for 59.00.502+ up to 70.00.100; login user/jci; copy XX"
    },
    {
        id: "C2-09",
        title: "mazdatweaks.com/id7 \"ID7 Recovery v2\"",
        url: "https://mazdatweaks.com/id7/",
        type: "guide",
        author: "Trezdog44",
        category: "github",
        status: "dead",
        trust: "B",
        archive: "`wb-mazdatweaks-id7-20190717.html`, `mazdatweaks-id7-wayback.html`, `github-mazdatweaks-id7.md`",
        alias: "see F-52b",
        summary: "\"UPDATING TO 70.00.335+ REQUIRES SERIAL DURING UPDATE\"; paste cp/chmod XX before reboot"
    },
    {
        id: "C2-13",
        title: "68wooley CarPlay How-To Part 1 v3.0 (PDF, in Ameridan's MediaFire)",
        url: "https://www.mediafire.com/file/201759io15ariii/124Spider_CP_AA_Upgrade_Guide.zip/file",
        type: "PDF guide",
        author: "68wooley",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mediafire/124Spider_CP_AA_Upgrade_Guide/…Part 1…v3.0.pdf`",
        alias: "**= A-02**",
        summary: "Official 124 sequence: FW+ID7+MazdaToFiat; ID7 on 56 via USB, on 59 → mazdatweaks.com/serial"
    },
    {
        id: "C2-14",
        title: "MZD-AIO issue #135 \"Serial doesn't work for 70.00.367 EU\"",
        url: "https://github.com/Trevelopment/MZD-AIO/issues/135",
        type: "issue",
        author: "community",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mzd-aio-issue-135-comments.md`",
        alias: "**= C1-08; F-54b**",
        summary: "neutralizeid7 text; 70.x passwdupdate always; 367 no login; updates signed; 367→352+XX works"
    },
    {
        id: "C2-22",
        title: "Trevelopment/cmu-autorun release \"1\" (`XX.zip` = ID7_Recovery_XX)",
        url: "https://github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip",
        type: "binary",
        author: "Trevelopment",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`downloads/tweaks/ID7_Recovery_XX.zip` (SHA256 e6b77807…)",
        alias: "see C2-09",
        summary: "ID7 v2 pack (44-recovery-recovery/anti-neutralizeid7); replaces dead `trevelopment.win/xx`"
    },
    {
        id: "C2-23",
        title: "mzd-evo/mzd-connect-1-root (mp3-hack payload)",
        url: "https://github.com/mzd-evo/mzd-connect-1-root",
        type: "GitHub repo",
        author: "mzd-evo",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`github-mzd-connect-1-root-README.md`",
        alias: "**D-25, F-55**",
        summary: "mp3-hack payload: `mp3/a-d.mp3`, `js/run.js`, `dev.html`; created 2024-03-25"
    },
    {
        id: "F-62",
        title: "silverchris/mazda-cmu-documentation (CMU reverse-engineering docs)",
        url: "https://github.com/silverchris/mazda-cmu-documentation",
        type: "GitHub repo (docs only)",
        author: "silverchris",
        dates: "2023",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`github-silverchris-mazda-cmu-documentation/` (markdown tree @ 838b1a4, datasheets omitted)",
        alias: "see F-38a, F-38b, C2-14, F-51",
        summary: "i.MX6 CMU hardware + SPI-NOR partition map; `.up` container format + JCI cert chain; " +
            "failsafe/IBC2 boot; UART pins 2S/2T; per-component version table with build dates + SWI part " +
            "numbers for NA 59.00.546 / 70.00.100 / 70.00.367 / 74.00.230 / 74.00.310; D-Bus, VIP, CAN. " +
            "Author's own caveat: \"not all information may be correct\""
    },
    {
        id: "C2-24",
        title: "shunceyb/mzd74-tweaks-no-touch",
        url: "https://github.com/shunceyb/mzd74-tweaks-no-touch",
        type: "GitHub repo",
        author: "shunceyb",
        category: "github",
        status: "alive",
        trust: "C",
        archive: "`github-shunceyb-mzd74-tweaks-no-touch-README.md`",
        alias: "—",
        summary: "mp3-hack variant auto-launching diag for broken touchscreens (v74)"
    },
    {
        id: "C2-25",
        title: "Ameridan ID7 v1 package `autorun_copy_to_usb.zip`",
        url: "http://www.mediafire.com/file/0r6pzhongok9h0u/autorun_copy_to_usb.zip",
        type: "tweak zip",
        author: "ameridan",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mediafire/autorun_copy_to_usb.zip` = `downloads/ameridan/autorun_copy_to_usb.zip` (SHA256 " +
            "c8bef694…)",
        alias: "see B-05",
        summary: "ID7 v1 autorun+recovery pack; install on 56.x before flashing"
    },
    {
        id: "D-24",
        title: "GitHub drone540/mazda-firmware-changelogs",
        url: "https://github.com/drone540/mazda-firmware-changelogs",
        type: "GitHub repo",
        author: "drone540",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "—",
        alias: "—",
        summary: "Changelog text only (no binaries); 55.x/59.x/70.00.021/70.00.000; missing 70.00.1xx+"
    },
    {
        id: "D-25",
        title: "GitHub mzd-evo/mzd-connect-1-root",
        url: "https://github.com/mzd-evo/mzd-connect-1-root",
        type: "GitHub repo",
        author: "mzd-evo",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "—",
        alias: "**= C2-23 / F-55**",
        summary: "The 2025 USB-only root method (mp3/XSS); not firmware itself"
    },
    // Split from raw F-52, which bundled several pages under one id; each page is its own source.
    {
        id: "F-52a",
        title: "mazdatweaks.com/serial (hijacked)",
        url: "https://mazdatweaks.com/serial/",
        type: "tweak site",
        author: "Trezdog44",
        category: "github",
        status: "hijacked",
        trust: "C",
        archive: "`F-rollback/mazdatweaks-serial.HIJACKED-2026-08-23.html`",
        alias: "**= C2-08**",
        summary: "Now serves gambling spam. Flag everywhere it is linked; the GitHub mirror is the surviving copy"
    },
    {
        id: "F-52b",
        title: "mazdatweaks.com/id7 (404, hijacked domain)",
        url: "https://mazdatweaks.com/id7/",
        type: "tweak site",
        author: "Trezdog44",
        category: "github",
        status: "dead",
        trust: "C",
        archive: "—",
        alias: "**= C2-09**",
        summary: "404 on a domain whose /serial/ is hijacked. Flag everywhere it is linked; the GitHub mirror is " +
            "the surviving copy"
    },
    {
        id: "F-53",
        title: "Trevelopment/mazdatweaks AIO-FAQ.md (GitHub)",
        url: "https://github.com/Trevelopment/mazdatweaks/blob/master/AIO-FAQ.md",
        type: "GitHub doc",
        author: "Trezdog44",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`github-mazdatweaks-id7.md`",
        alias: "—",
        summary: "\"70.00.335+ deletes autorun … install via serial after update before reboot\"; updating w/ tweaks " +
            "\"safe\" ❓"
    },
    // Split from raw F-54, which bundled several pages under one id; each page is its own source.
    {
        id: "F-54a",
        title: "MZD-AIO issue #47 (GitHub)",
        url: "https://github.com/Trevelopment/MZD-AIO/issues/47",
        type: "issue",
        author: "community",
        dates: "2019-03",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "—",
        summary: "Brick after \"System Restore\": stuck on the Mazda logo forever"
    },
    {
        id: "F-54b",
        title: "MZD-AIO issue #135 (GitHub)",
        url: "https://github.com/Trevelopment/MZD-AIO/issues/135",
        type: "issue",
        author: "community",
        dates: "2021-09 → 11",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`mzd-aio-issue-135-comments.md`",
        alias: "**= C1-08 / C2-14**",
        summary: "70.00.367 EU serial login fails; `neutralizeid7` script listing; downgrade 367→352 by USB works " +
            "(\"same manual as upgrade\")"
    },
    {
        id: "F-55",
        title: "mzd-evo/mzd-connect-1-root (GitHub)",
        url: "https://github.com/mzd-evo/mzd-connect-1-root",
        type: "GitHub repo",
        author: "mzd-evo",
        category: "github",
        status: "alive",
        trust: "B",
        archive: "`github-mzd-connect-1-root-README.md`",
        alias: "**= C2-23 / D-25**",
        summary: "The mp3/JS payload used by F-10/F-41"
    },
    // Split from raw D-11, which bundled several pages under one id; each page is its own source.
    {
        id: "D-11a",
        title: "124spider.org \"Firmware Files Download Locations\" (thread 45543)",
        url: "https://www.124spider.org/threads/firmware-files-download-locations.45543/",
        type: "forum thread",
        author: "AegirTheLucky",
        dates: "2025-01-28 →",
        category: "firmware-distribution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-124spider-firmware-files-download-locations-45543.html`",
        alias: "**= A-12**",
        summary: "First post carries per-region NA/EU/ADR links (text links, not raw URLs in the archive) and the " +
            "Drive folder (D-11b)"
    },
    {
        id: "D-11b",
        title: "Google Drive folder linked from thread 45543 (v74 NA)",
        url: "https://drive.google.com/drive/folders/1FSOxXVccKppRURPqZVayfulACGOQW-3Q",
        type: "free re-host",
        author: "AegirTheLucky",
        category: "firmware-distribution",
        status: "alive",
        trust: "B",
        archive: "—",
        summary: "Live 2026: cmu150_NA_74.00.324A_update.up, the worldwide procedure PDF, a \"README FIRST\" PDF, " +
            "Checksum_Utility.exe"
    },
    {
        id: "D-12",
        title: "124spider.org other firmware threads (44172, 42393, 38004, 45057→410, 45963, 45814)",
        type: "free (PM)",
        category: "firmware-distribution",
        status: "dead",
        trust: "C",
        archive: "(see A / F archives)",
        alias: "see A-08/10/11, F-05/08",
        summary: "Files change hands by PM (\"Sent!\"), rarely public links"
    },
    {
        id: "D-16",
        title: "navi-world.com (reseller)",
        url: "https://navi-world.com",
        type: "reseller",
        category: "firmware-distribution",
        status: "alive",
        trust: "D",
        archive: "`F-rollback/navi-world-*.{html,txt}`",
        alias: "see F-47, F-51",
        summary: "Per-region firmware €29–39, emailed in 24 h; Fiat nav + ID7_Recovery serial service; genuine Mazda " +
            "files"
    },
    {
        id: "D-17",
        title: "mazdafiles.com (Gumroad \"nathanair\")",
        url: "https://www.mazdafiles.com",
        type: "reseller",
        category: "firmware-distribution",
        status: "alive",
        trust: "D",
        archive: "`F-rollback/mazdafiles-update-procedure.txt`",
        alias: "see F-48",
        summary: "$10–15 per single `.up` via Gumroad; 70.00.367 ADR, 74.00.324 NA/EU/ADR, 70.00.100 EU"
    },
    {
        id: "D-18",
        title: "UK resellers (satnavishop.co.uk, latestsatnav.co.uk, eBay, gumtree)",
        type: "reseller",
        category: "firmware-distribution",
        status: "alive",
        trust: "D",
        archive: "—",
        alias: "see D-13a/E-11",
        summary: "£34.99–39.99; some list Fiat/Abarth 124-branded 70.00.100 / 74.00.324 \"+ Support\"; files are " +
            "Mazda's"
    },
    {
        id: "D-19",
        title: "AliExpress (kits ship firmware link/USB)",
        url: "https://www.aliexpress.com",
        type: "reseller",
        category: "firmware-distribution",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "see E-35",
        summary: "One MX-5 owner used an AliExpress link for 70.00.110→70.00.367A; often wrong-region/incomplete"
    },
    {
        id: "D-20",
        title: "HiDrive share (Modfreakz) — was THE free index",
        url: "https://my.hidrive.com/share/hsodpqja",
        type: "free index",
        category: "firmware-distribution",
        status: "dead",
        trust: "B",
        archive: "—",
        alias: "see E-42",
        summary: "Folders per region (`NA N`, `EU N`, `4A N`) + `y Checksum`; naming preserved in D-09 / Shopify PDF"
    },
    // Split from raw D-21, which bundled several pages under one id; each page is its own source.
    {
        id: "D-21a",
        title: "odysee.com \"FIAT 124 CarPlay Android Auto FILES\" (DanB)",
        url: "https://odysee.com/@DanB:7/FIAT-124-CarPlay-Android-Auto-FILES",
        type: "free mirror",
        dates: "2017",
        category: "firmware-distribution",
        status: "dead",
        trust: "C",
        archive: "—",
        alias: "see B-§3.10",
        summary: "2017 copies; JS-rendered, content unverified, likely stale"
    },
    {
        id: "D-21b",
        title: "MEGA links to the same files (various)",
        type: "free mirror",
        category: "firmware-distribution",
        status: "dead",
        trust: "C",
        archive: "—",
        alias: "see SOURCES.md dead-mirror table",
        summary: "No specific link recorded under this id; MEGA folders load but are reported empty"
    },
    {
        id: "D-22",
        title: "mazdas247-posted NA CDN object (Bingoy 2021)",
        url: "https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/cmu150_NA_74.00.230A_update.up",
        type: "CDN object",
        category: "firmware-distribution",
        status: "alive",
        trust: "A",
        archive: "—",
        alias: "**= D-01**",
        summary: "74.00.230A NA posted openly; resolves on the live NA CDN"
    },
    {
        id: "D-23",
        title: "Scribd \"EU N CMU HASH Value\" (doc 838112560)",
        url: "https://www.scribd.com/document/838112560",
        type: "hash doc",
        category: "firmware-distribution",
        status: "login-walled",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Would hold EU firmware hashes; body not extractable without login"
    },
    {
        id: "E-42",
        title: "HiDrive `-CarPlay-AndroidAuto INSTALL` folder (official PDFs/videos)",
        url: "https://my.hidrive.com/share/hsodpqja.l#$/Mazda_Firmware/-CarPlay-AndroidAuto%20INSTALL",
        type: "file share",
        category: "firmware-distribution",
        status: "alive",
        trust: "B",
        archive: "—",
        alias: "see D-20",
        summary: "Mazda trim-removal PDFs, cable-install PDFs, full-install mp4s, update-procedure PDF — canonical " +
            "official-PDF location"
    },
    {
        id: "E-01",
        title: "Ameridan \"Replacing the CMU… / retrofit kit\"",
        url: "https://21stcenturyfiat124spider.wordpress.com/2018/04/30/" +
            "replacing-the-cmu-to-get-apple-carplay-and-android-auto/",
        type: "blog",
        category: "hardware-vendor",
        status: "bot-blocked",
        trust: "B",
        archive: "`ameridan-replacing-the-cmu-…html`; `hardware/ameridan-replacing-the-cmu-…html`",
        alias: "**= B-09**; F-45",
        summary: "The 124 reference article on the retrofit kit (history, part list, hub photos, AT knob warning)"
    },
    {
        id: "E-10",
        title: "ASH8 install instructions compiled as PDF (Shopify-hosted)",
        url: "https://cdn.shopify.com/s/files/1/2367/6353/files/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf",
        type: "compiled PDF",
        category: "hardware-vendor",
        status: "alive",
        trust: "B",
        archive: "`shopify-CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf`; " +
            "`hardware/CPAA_INSTALL_INSTRUCTIONS_AND_LINKS.pdf` (SHA256 45b6bb40…)",
        alias: "—",
        summary: "70.00.335C-era ASH8 instructions; per-region part numbers, \"must be the 'C' hub\", FAQ, labor times"
    },
    {
        id: "E-11",
        title: "124 Spider UK — Android Auto/CarPlay kit",
        url: "https://124spider.uk/shop/android-auto-carplay-kit",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/124spider-uk-shop-aa-carplay-kit.html`",
        alias: "see D-13a, D-13b",
        summary: "UK 124 kit £150 self-fit / +£140 fit; hub+cables+firmware+own instructions; hub possibly non-OEM"
    },
    // Split from raw D-13, which bundled several pages under one id; each page is its own source.
    {
        id: "D-13a",
        title: "124spider.uk blog \"124 Spider CMU firmware updates\" (Stuart Clark)",
        url: "https://124spider.uk/blog/124-spider-cmu-firmware-updates",
        type: "guide",
        author: "Stuart Clark",
        dates: "2020-03-05",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`wb-124spideruk-cmu-firmware-updates.html`",
        alias: "see E-11",
        summary: "\"Use 70.00.100 and NOTHING NEWER\"; the vendor also sells a kit (E-11)"
    },
    {
        id: "D-13b",
        title: "124spider.uk \"Support: firmware updates\" (Stuart Clark)",
        url: "https://124spider.uk/support/firmware-updates",
        type: "guide",
        author: "Stuart Clark",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`wb-124spideruk-support-firmware-updates.html`",
        summary: "Full serial-connection ID7 walk-through"
    },
    {
        id: "E-21",
        title: "mazdaparts.org (US dealer parts)",
        url: "https://mazdaparts.org/mazda-3-smartphone-mirroring-kit.html",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/mazdaparts-org-00008FZ34.html`",
        alias: "—",
        summary: "Kit 0000-8F-Z34 MSRP $250.90 / sale $213.27; fitment incl. MX-5 2016-2020"
    },
    {
        id: "E-22",
        title: "parts.mazdausa.com (Mazda USA parts portal)",
        url: "https://parts.mazdausa.com/p/Mazda__/Smartphone-Screen-Mirroring-Kit/94313254/00008FZ34.html",
        type: "shop",
        category: "hardware-vendor",
        status: "bot-blocked",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "00008FZ34 \"Smartphone Screen Mirroring Kit\" $250.95"
    },
    {
        id: "E-23",
        title: "Galpin Mazda retrofit (CA dealer)",
        url: "https://www.galpinmazda.com/retrofit/",
        type: "dealer",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/galpinmazda-retrofit.html`",
        alias: "—",
        summary: "Dealer retrofit $499.99 + tax, ~2 h, 2014+ Mazda Connect cars"
    },
    {
        id: "E-24",
        title: "SG Petch (UK dealer)",
        url: "https://www.sgpetchaccessories.co.uk/product/genuine-mazda-apple-carplay-android-auto-unit/",
        type: "dealer",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/sgpetch-genuine-mazda-carplay-unit.html`",
        alias: "—",
        summary: "UK genuine kit £232.37 = TK78-66-9U0C + C830-V6-60Z + tape C830-V6-693"
    },
    // Split from raw E-25, which bundled several pages under one id; each page is its own source.
    {
        id: "E-25a",
        title: "Arnold Clark (UK dealer): C830V660Z cable set",
        url: "https://www.arnoldclarkautoparts.com/products/genuine-mazda-carplay-c830v660z",
        type: "dealer",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/arnoldclark-C830V660Z.html`",
        summary: "Genuine C830V660Z cable set alone, £101.48 (sold out)"
    },
    {
        id: "E-25b",
        title: "Sandicliffe (UK dealer): C830V660Z cable set",
        url: "https://www.sandicliffeshop.co.uk/products/" +
            "genuine-mazda-cx-3-2018-usb-cable-for-apple-carplay-android-auto-c830v660z",
        type: "dealer",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/sandicliffe-C830V660Z.html`",
        summary: "Genuine C830V660Z cable set alone, £100.02"
    },
    {
        id: "E-26",
        title: "online-teile.com (DE OEM parts)",
        url: "https://www.online-teile.com/mazda-ersatzteile/en/C830V660Z_Cord-Short.html",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/online-teile-C830V660Z.html`, `online-teile-TK78669U0C.html`, " +
            "`online-teile-TK78669U0_.html`",
        alias: "—",
        summary: "C830-V6-60Z \"Cord Short\" €126; TK78669U0C superseded → order TK78669U0_"
    },
    {
        id: "E-29",
        title: "mx5mania.com.au (AU)",
        url: "https://mx5mania.com.au/products/mazda-apple-carplay-nd-2015-2019",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/mx5mania-carplay-nd.html`",
        alias: "—",
        summary: "Genuine kit ND 2015-2019 (RHD) A$355; 2–3 h; ~50 min firmware"
    },
    {
        id: "E-30",
        title: "getcartech.com (AU aftermarket)",
        url: "https://getcartech.com/products/mazda-connect-carplay-upgrade-kit",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/getcartech-mazda-kit.html`",
        alias: "—",
        summary: "Wired/wireless kits A$199; software USB per region (74.00.324A); \"AA via rotary dial only\""
    },
    {
        id: "E-31",
        title: "infotainment.com (US aftermarket)",
        url: "https://infotainment.com/shop/interior-accessories/infotainment-radio-upgrades/m-kit30/",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/infotainment-com-m-kit30.html`",
        alias: "—",
        summary: "$299.95 kit explicitly listing FIAT 124 Spider 2017-2021; NA only; M-HUB + 2 cables + software USB"
    },
    {
        id: "E-32",
        title: "visioncoding.us (UK/EU aftermarket)",
        url: "https://www.visioncoding.us/products/mazda-tk78-66-9u0c",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/visioncoding-tk78.html`",
        alias: "—",
        summary: "€110 kit lists Fiat 124 (2017-2021); out of stock; \"firmware below v70.00.21 must update — " +
            "included\""
    },
    {
        id: "E-33",
        title: "germanaudiotech.com (US)",
        url: "https://www.germanaudiotech.com/products/" +
            "usb-hub-aux-console-carplay-android-for-mazda-2016-2019-cx-9-oem-new-tk78-66-9u0c",
        type: "shop",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "—",
        summary: "Hub alone \"Genuine Mazda\" $149.95; cable kit C922-V6-605A sold separately"
    },
    // Split from raw E-34, which bundled several pages under one id; each page is its own source.
    {
        id: "E-34a",
        title: "Amazon B07KRPSRKH: \"Mazda Retrofit Kit – 0000-8F-Z34\" (genuine)",
        url: "https://www.amazon.com/dp/B07KRPSRKH",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/amazon-m-B07KRPSRKH.html`",
        summary: "Brand: Mazda, sold by a certified Mazda dealer; 4.8★ / 631; the listing 68wooley and ameridan " +
            "bought from; currently unavailable, was $163 in 2019"
    },
    {
        id: "E-34b",
        title: "Amazon B08ZKBNDS7: \"TK78-66-9U0C CarPlay Android Auto Retrofit Kit\"",
        url: "https://www.amazon.com/dp/B08ZKBNDS7",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B08ZKBNDS7.html`",
        summary: "Generic; unavailable; 4.3★ / 145"
    },
    {
        id: "E-34c",
        title: "Amazon B09TQNH7LF: \"TK78-66-9U0C Adapter … MX5 Fiat 124\"",
        url: "https://www.amazon.com/dp/B09TQNH7LF",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B09TQNH7LF.html`",
        summary: "One of few listings naming the Fiat 124; a review mentions 70.00.100 NA N; unavailable; 4.0★ / 90"
    },
    {
        id: "E-34d",
        title: "Amazon B09MTJ6469: Dasbecan \"TK78-66-9U0C (2024 New Upgraded)\"",
        url: "https://www.amazon.com/dp/B09MTJ6469",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B09MTJ6469.html`",
        summary: "Clone; $51.37 in stock; 4.2★ / 490; seller offers to \"help you upgrade the firmware\""
    },
    {
        id: "E-34e",
        title: "Amazon B0BPYD7JR9: \"Mazda Carplay and Android Auto Retrofit Kit, TK78-66-9U0C OEM Hub\"",
        url: "https://www.amazon.com/dp/B0BPYD7JR9",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B0BPYD7JR9.html`",
        summary: "Clone; $59.93, unavailable; 4.3★ / 740"
    },
    {
        id: "E-34f",
        title: "Amazon B0BY2J41ZC: HMYC \"Wireless Carplay Retrofit Kit\" (no Android Auto)",
        url: "https://www.amazon.com/dp/B0BY2J41ZC",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B0BY2J41ZC.html`",
        summary: "Wireless-CarPlay-only clone, \"NO Android Auto\"; $111.31 in stock; 3.9★ / 308; reviews say " +
            "units \"stop working after a few days\""
    },
    {
        id: "E-34g",
        title: "Amazon B0FMXR1V1B: \"TK78-66-9U0C for Mazda … 00008FZ34 (2024 New Upgraded)\"",
        url: "https://www.amazon.com/dp/B0FMXR1V1B",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "D",
        archive: "`hardware/amazon-m-B0FMXR1V1B.html`",
        summary: "Clone; $67.65, \"only 2 left\"; copies Mazda's \"firmware MUST BE UPDATED FIRST … v70.00.21\" text"
    },
    {
        id: "E-35",
        title: "AliExpress 1005001447410048",
        url: "https://www.aliexpress.com/item/1005001447410048.html",
        type: "marketplace",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "`hardware/aliexpress-1005001447410048.html`",
        alias: "see E-40",
        summary: "The listing most 124 members used 2020–21 (~$80–103), claimed \"genuine\" by buyers"
    },
    {
        id: "E-43",
        title: "mazdaman workshop-manual mirror (trim removal)",
        url: "http://mazdaman.x10host.com/SM356305/",
        type: "manual mirror",
        category: "hardware-vendor",
        status: "dead",
        trust: "B",
        archive: "—",
        alias: "—",
        summary: "ND workshop-manual section used for trim removal (linked by E-01/E-12)"
    },
    {
        id: "E-44",
        title: "New USB Hub with Wireless Carplay (m3r 248768)",
        url: "https://www.mazda3revolution.com/threads/new-usb-hub-with-wireless-carplay.248768/",
        type: "forum thread",
        author: "dkeske, Ultramic, Deano et al.",
        dates: "2023-08 → 2025-11",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-248768-p1.html`",
        alias: "see E-45, E-46, E-47",
        summary: "First wireless clone hubs (2023). Ultramic: wireless hub = only wireless CarPlay out of the " +
            "box, Android Auto disabled; a toggle switch under a sticker selects wired mode, where both " +
            "CarPlay and AA work. CARABC wired hub one year without problems"
    },
    {
        id: "E-45",
        title: "Android Auto / CarPlay wired (P2) to wireless upgrade (P3.2) (m3r 250046)",
        url: "https://www.mazda3revolution.com/threads/android-auto-carplay-wired-p2-to-wireless-upgrade-p3-2.250046/",
        type: "forum thread",
        author: "krisztiantobias, dpawlak et al.",
        dates: "2024-02 → 2024-08",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "B",
        archive: "`wb-m3r-250046-p1.html`",
        alias: "see E-44, E-46",
        summary: "The clone-hub variant table: P2.x wired only; P3.x wireless CP + USB-C; P3.1 wireless CP + " +
            "wired AA; P3.2 = Android box (wireless CP + AA, buttons captured by Android, returned by one " +
            "owner); P3B wireless CP/AA + wired CP. Maker Renwoda (AliExpress); same version can differ " +
            "between sellers"
    },
    {
        id: "E-46",
        title: "Mazda Connect CarPlay/Android Auto retrofit kit options (m3r 251908)",
        url: "https://www.mazda3revolution.com/threads/" +
            "mazda-connect-apple-carplay-andriod-auto-retrofit-kit-options.251908/",
        type: "forum thread",
        author: "FreeseFrame et al.",
        dates: "2024-09 → 2025-11",
        category: "forum-mazda3revolution",
        status: "bot-blocked",
        trust: "C",
        archive: "`wb-m3r-251908-p1.html`",
        alias: "see E-44, E-45",
        summary: "Brand round-up (CARabc, HMYC): no OEM kit, same Chinese hubs under different sellers; HMYC 2.1 " +
            "wired works perfectly; kit instructions inadequate"
    },
    {
        id: "E-47",
        title: "CARABC \"P2 Wired o P3 Wireless\" hub listing (AliExpress 1005010287487680)",
        url: "https://it.aliexpress.com/item/1005010287487680.html",
        type: "listing",
        author: "CARABC",
        dates: "2026",
        category: "hardware-vendor",
        status: "bot-blocked",
        trust: "D",
        archive: "`hardware/carabc-p3/ali-1005010287487680-*.png`",
        alias: "see E-48, E-44, E-45",
        summary: "Listing image: the 2025/2026 NEW P3 supports wireless CarPlay and wireless Android Auto, the " +
            "old P3 does not (nor fast charging) — two hubs sold as P3. Buyer reviews: 2 of 3 got wireless " +
            "AA, 1 wired-only; USB-A shipped instead of Type-C; touch dead in wireless; switch fragile. No " +
            "firmware version stated"
    },
    {
        id: "E-48",
        title: "CARABC wireless CarPlay / Android Auto USB hub — instruction manual",
        url: "https://manuals.plus/ae/1005009269258401",
        type: "manual",
        author: "CARABC",
        dates: "2025",
        category: "hardware-vendor",
        status: "alive",
        trust: "C",
        archive: "—",
        alias: "see E-47",
        summary: "Variants P2 USB-A wired, P2 Type-C wired, P3 Type-C wireless AI box. By default only wireless " +
            "CarPlay; the switch enables wired CarPlay + wired Android Auto (the old P3). Requires software " +
            "v70.00.21 or later"
    },
    {
        id: "E-12",
        title: "Abarth 124 Spider – Apple CarPlay Install Guide",
        url: "https://www.youtube.com/watch?v=Qcyan28QXs4",
        author: "Pistons & Petrol (Eddie Clark), 2018-12-14",
        category: "video",
        status: "alive",
        trust: "B",
        archive: "`hardware/yt-Qcyan28QXs4.html`",
        alias: "—",
        summary: "First 124-specific install video; NA/EU/Oceania part numbers; links hidrive + mazdaman guide"
    },
    {
        id: "E-13",
        title: "Mazda MX-5 ND/ND2 ACP/AA USB Cable & Hub Install",
        url: "https://www.youtube.com/watch?v=XpPYKikqIDc",
        author: "Greg's DIY Garage (kill-o-byte), 2018-10-27",
        category: "video",
        status: "alive",
        trust: "B",
        archive: "`hardware/yt-XpPYKikqIDc.html`",
        alias: "—",
        summary: "LHD ND hub/cable install (applies to 124); firmware video linked youtu.be/jYfH-ikZoUM"
    },
    {
        id: "E-14",
        title: "Installing Apple CarPlay To My Abarth 124 Spider!",
        url: "https://www.youtube.com/watch?v=ZZgcWq3ZA38",
        author: "Stef ABtv, 2020-10-10",
        category: "video",
        status: "alive",
        trust: "C",
        archive: "`hardware/yt-ZZgcWq3ZA38.html`",
        alias: "—",
        summary: "UK RHD vlog (fitted by \"Bradley\"); not a how-to"
    },
    {
        id: "E-15",
        title: "Part 2: Hardware Installation — CarPlay/AA in MX-5 ND (UK)",
        url: "https://www.youtube.com/watch?v=ZQTeJukUFII",
        author: "KunziDoesStuff, 2025-04-25",
        category: "video",
        status: "alive",
        trust: "C",
        archive: "`hardware/yt-ZQTeJukUFII.html`",
        alias: "—",
        summary: "RHD ND RF with AliExpress kit; parts 1 & 3 = firmware"
    },
    {
        id: "E-16",
        title: "(disambiguation) aftermarket LVDS interface box CPA-MAZ-MZD",
        url: "https://www.youtube.com/watch?v=XdmV-muo188",
        author: "NavInc (NL), 2019-07-21",
        category: "video",
        status: "alive",
        trust: "D",
        archive: "`hardware/yt-XdmV-muo188.html`",
        alias: "—",
        summary: "NOT the Mazda hub — listed only to disambiguate the aftermarket interface"
    },
    {
        id: "D-10",
        title: "Ameridan blog (Fiat-specific bible)",
        url: "https://21stcenturyfiat124spider.wordpress.com",
        author: "ameridan",
        category: "blog-other",
        status: "alive",
        trust: "B",
        archive: "`ameridan/*`",
        alias: "**= B-01…B-29**",
        summary: "(full content = theme B)"
    },
    {
        id: "F-39",
        title: "Reset CMU NOR flash with RPi (Thai blog)",
        url: "https://mzdonline.wordpress.com/2017/07/19/reset-cmu-nor-flash-with-rpi/",
        author: "mzdonline, 2017-07-19",
        category: "blog-other",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/mzdonline-reset-cmu-nor-flash-rpi.html/.txt`",
        alias: "—",
        summary: "RPi + flashrom + SOIC16 clip, S25FL064A/P, write 0x00 at boot-select, backup first"
    },
    {
        id: "F-40",
        title: "First public CMU unbrick",
        url: "https://yms.livejournal.com/3007282.html",
        author: "Michael Yutsis, 2017-08-05",
        category: "blog-other",
        status: "alive",
        trust: "B",
        archive: "`F-rollback/yms-livejournal-unbricked-cmu.*`",
        alias: "—",
        summary: "Spansion S25FL064A, CH341A, chip de-soldered; EU 56.00.513 rescue .bin in comments"
    },
    {
        id: "F-47",
        title: "navi-world Mazda Connect firmware update procedure",
        url: "https://navi-world.com/2022/05/02/mazda-connect-firmware-update-procedure/",
        author: "\"Jonathan\", 2022 → 2026",
        category: "blog-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/navi-world-mazda-connect-update-procedure.*`",
        alias: "see D-16",
        summary: "Mazda procedure verbatim + \"if update fails\" (ROOM fuse); useful failure-mode comments"
    },
    {
        id: "F-48",
        title: "mazdafiles firmware update procedure",
        url: "https://www.mazdafiles.com/mazda-connect-firmware-update-procedure/",
        author: "n/d",
        category: "blog-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/mazdafiles-update-procedure.txt`",
        alias: "see D-17",
        summary: "Same procedure text"
    },
    {
        id: "F-51",
        title: "navi-world Fiat 124 Spider CMU serial access",
        url: "https://navi-world.com/2025/04/20/fiat-124-spider-cmu-serial-access/",
        author: "2025-04-20",
        category: "blog-other",
        status: "alive",
        trust: "C",
        archive: "`F-rollback/navi-world-124-spider-cmu-serial-access.*`",
        alias: "see C2-08",
        summary: "Re-host of the mazdatweaks serial guide (CP2102, 2S/2T pins, 115200); \".335+ = serial before " +
            "updating\" ❓"
    }
];

const ID_RE = /\b([A-F][0-9]?-[0-9]+[a-z]?)\b/g;

/**
 * Ids are written inconsistently across the research documents — `A-3` in one place, `A-03` in another.
 * Normalise the numeric part to two digits so both resolve.
 */
const normalise = (id: string): string =>
{
    const at = id.lastIndexOf("-");
    const prefix = id.slice(0, at);
    const num = Number.parseInt(id.slice(at + 1), 10);

    // Keep the split suffix: `F-54a` and `F-54b` are different pages, and `parseInt` would drop it.
    const suffix = (/[a-z]$/).exec(id)?.[0] ?? "";

    return `${prefix}-${String(num).padStart(2, "0")}${suffix}`;
};

/**
 * Resolve an id to its source, following aliases.
 *
 * The registry keeps ONE primary entry per URL; when several research themes found the same page
 * independently they each gave it their own id, and those live in the `alias` column. Both the canonical
 * id and any alias must resolve, or citations in the older documents break.
 */
export const sourceById = (id: string): Source | undefined =>
{
    const wanted = normalise(id);
    const direct = SOURCES.find((s) => s.id === wanted);
    if (direct) { return direct; }

    return SOURCES.find((s) =>
        s.alias !== undefined &&
        [...s.alias.matchAll(ID_RE)].some((m) => normalise(m[1]) === wanted));
};

/** Sources a reader should be warned about, or that we could not read ourselves. */
export const PROBLEM_SOURCES = SOURCES.filter(
    (s) => s.status === "dead" || s.status === "hijacked" || s.status === "login-walled"
);
