/**
 * Firmware version × market matrix.
 *
 * Transcribed from `research/FIRMWARE-MATRIX.md` §1 (21 rows). The ✅/❌/⚠️/❓ markers in that document
 * are deliberately turned into typed fields rather than kept as prose: `usbTweaksOutOfTheBox`,
 * `id7v1Survives` and the entries in `otherRoutes` each carry their own `confidence`, so a page can
 * render "one owner reported this and nobody confirmed it" instead of a bare tick.
 *
 * `pointOfNoReturn` marks the four thresholds that cannot be walked back.
 */

import type { Confidence, Market, Support } from "./types";

export interface FirmwareRoute
{
    /** How tweak access is regained on this version, if at all. */
    method: "serial" | "id7v2-at-install" | "mp3" | "downgrade-first";
    available: boolean;
    confidence: Confidence;
    note?: string;
}

export interface FirmwareVersion
{
    /** Display label, exactly as an owner would read it on screen. */
    id: string;
    label: string;
    markets: Market[] | "all";
    vendor: "mazda" | "fiat" | "both";

    /** Native CarPlay / Android Auto. */
    carplay: Support;
    /** Does an MZD-AIO / MazdaToFiatV70AIO stick autorun with no preparation? */
    usbTweaksOutOfTheBox: Support;
    /** Does an ID7 v1 installed earlier keep working after this version is flashed? */
    id7v1Survives: Support;
    /** What is left if neither of the above applies. */
    otherRoutes: FirmwareRoute[];

    packaging?: "two-file" | "single-file";
    pointOfNoReturn?: 1 | 2 | 3 | 4;
    /**
     * The lowest version of a band you cannot leave downwards over USB. Two of the four points of
     * no return are floors of this kind; the other two close tweak access without moving the
     * floor, which is why this is its own flag rather than something inferred from the numbering.
     */
    downgradeFloor?: true;
    communityTarget?: true;
    factoryOn?: string;
    notes: string;
    sourceIds: string[];
}

const UNKNOWN: Support = { available: "unknown", confidence: "unknown" };
const YES: Support = { available: true, confidence: "confirmed" };
const NO: Support = { available: false, confidence: "confirmed" };

export const FIRMWARE: readonly FirmwareVersion[] = [
    {
        id: "55.00.7xx",
        label: "55.00.7xx",
        markets: "all",
        vendor: "mazda",
        carplay: NO,
        usbTweaksOutOfTheBox: YES,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "The 124 Spider never shipped this.",
        sourceIds: []
    },
    {
        id: "56.00.521",
        label: "56.00.521 / 56.00.530",
        markets: ["NA", "EU", "ADR", "JP"],
        vendor: "fiat",
        carplay: NO,
        usbTweaksOutOfTheBox: YES,
        id7v1Survives: { available: "unknown", confidence: "confirmed", note: "This is where ID7 v1 gets installed." },
        otherRoutes: [],
        factoryOn: "MY2017 and early-2018 124 / Abarth",
        notes: "Factory firmware of MY2017 and early-2018 cars. 56.00.530 carries the Abarth-branded boot " +
            "animation. The one version where ID7 can still be installed straight from USB.",
        sourceIds: ["B-01"]
    },
    {
        id: "56.00.511",
        label: "56.00.511 / 513",
        markets: "all",
        vendor: "mazda",
        carplay: NO,
        usbTweaksOutOfTheBox: YES,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "Mazda's base for Fiat 56.00.521.",
        sourceIds: []
    },
    {
        id: "59.00.441",
        label: "59.00.441 – 59.00.449",
        markets: "all",
        vendor: "mazda",
        carplay: NO,
        usbTweaksOutOfTheBox: YES,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "The last USB-tweakable Mazda builds.",
        sourceIds: ["B-01", "C2-10"]
    },
    {
        id: "59.00.502",
        label: "59.00.502",
        markets: "all",
        vendor: "mazda",
        carplay: NO,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: YES,
        otherRoutes: [
            { method: "serial", available: true, confidence: "confirmed" },
            { method: "mp3", available: true, confidence: "single-report" }
        ],
        pointOfNoReturn: 1,
        downgradeFloor: true,
        notes: "Mazda, June 2017. Patches the USB-autorun hole, so side-loading dies here. Also the " +
            "downgrade floor: nothing below this version can be reached over USB.",
        sourceIds: ["C2-10", "C2-16"]
    },
    {
        id: "59.00.504",
        label: "59.00.504 / 540 / 545 / 546",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: NO,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: YES,
        otherRoutes: [{ method: "serial", available: true, confidence: "confirmed" }],
        notes: "59.00.545 is the target if you specifically want the old community Android Auto tweak.",
        sourceIds: []
    },
    {
        id: "59.00.524",
        label: "59.00.524",
        markets: ["NA", "EU", "ADR"],
        vendor: "fiat",
        carplay: NO,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: {
            available: true,
            confidence: "confirmed",
            note: "Only if the car was on 56.x with ID7 already installed."
        },
        otherRoutes: [
            { method: "serial", available: true, confidence: "confirmed" },
            { method: "mp3", available: true, confidence: "single-report" }
        ],
        factoryOn: "124s built from roughly November 2017",
        notes: "Fiat's equivalent of Mazda 59.00.502, and 124-only.",
        sourceIds: ["B-01"]
    },
    {
        id: "59.00.562",
        label: "59.00.562 / 59.00.563",
        markets: ["NA", "EU", "ADR"],
        vendor: "fiat",
        carplay: NO,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: {
            available: true,
            confidence: "single-report",
            note: "Rare — only on a car that carried ID7 across from 56.x."
        },
        otherRoutes: [
            {
                method: "serial",
                available: true,
                confidence: "single-report",
                note: "Assumed identical to the other 59.00.5xx builds; no explicit report."
            },
            { method: "mp3", available: true, confidence: "single-report", note: "One report, on .563." }
        ],
        factoryOn: "MY2019–2020 124s, and many replacement CMUs",
        notes: "The \"latest Fiat firmware\" trap: no CarPlay, and already tweak-locked. Arriving here by " +
            "way of a dealer update or a replacement unit is the most common way owners get stuck.",
        sourceIds: ["B-01", "A-01"]
    },
    {
        id: "70.00.000A",
        label: "70.00.000A",
        markets: ["EU"],
        vendor: "mazda",
        carplay: { available: true, confidence: "confirmed", note: "First build carrying CarPlay/AA code." },
        usbTweaksOutOfTheBox: UNKNOWN,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "EU beta. Never distributed.",
        sourceIds: []
    },
    {
        id: "70.00.021",
        label: "70.00.021A / 70.00.021B",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: { available: true, confidence: "confirmed", note: "First public CarPlay/AA firmware." },
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: YES,
        otherRoutes: [{ method: "serial", available: true, confidence: "confirmed" }],
        packaging: "two-file",
        notes: "NA shipped revision B, EU and ADR revision A. The retrofit hub is recognised from here " +
            "upwards. Widely reported as the buggiest v70.",
        sourceIds: ["E-06"]
    },
    {
        id: "70.00.100A",
        label: "70.00.100A",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: YES,
        otherRoutes: [
            { method: "serial", available: true, confidence: "confirmed" },
            { method: "mp3", available: true, confidence: "confirmed" }
        ],
        packaging: "two-file",
        communityTarget: true,
        notes: "The version the whole 124 community standardised on — and deliberately not the newest. " +
            "It is the last v70 where ID7 v1 still works and where MazdaToFiatV70AIO installs " +
            "unmodified: its script accepts only 70.00.xxx with an extension of 100 or lower. Also the " +
            "last two-file build on the 124 path.",
        sourceIds: ["B-01", "A-01", "A-02"]
    },
    {
        id: "70.00.110",
        label: "70.00.110",
        markets: ["JP"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: UNKNOWN,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "Japan only, and Japan uses the Matsukone nav protocol rather than NNG.",
        sourceIds: []
    },
    {
        id: "70.00.120",
        label: "70.00.120",
        markets: ["NA"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: UNKNOWN,
        id7v1Survives: UNKNOWN,
        otherRoutes: [],
        notes: "An echo fix distributed through a Mazda repair contractor; never generally released.",
        sourceIds: []
    },
    {
        id: "70.00.130",
        label: "70.00.130 / 137 / 150A",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: { available: "unknown", confidence: "unknown" },
        otherRoutes: [],
        notes: "Interim bug-fix builds. No source we read says anything about their tweak status — treat " +
            "as unknown rather than assuming they behave like 70.00.100.",
        sourceIds: []
    },
    {
        id: "70.00.335C",
        label: "70.00.335C",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [
            {
                method: "id7v2-at-install",
                available: true,
                confidence: "confirmed",
                note: "Serial console attached during the flash; must be repeated after every later flash."
            },
            {
                method: "mp3",
                available: true,
                confidence: "contradictory",
                note: "One 124 owner could not get it to run here."
            }
        ],
        packaging: "single-file",
        pointOfNoReturn: 2,
        notes: "Runs neutralizeid7 plus a forced passwdupdate: it deletes ID7 v1 and any pre-installed " +
            "\"v2\", and removes the serial credentials. The first single-file update package. Fixes " +
            "the Bluetooth echo.",
        sourceIds: ["C2-11", "C2-14"]
    },
    {
        id: "70.00.352B",
        label: "70.00.352B",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [
            {
                method: "id7v2-at-install",
                available: true,
                confidence: "confirmed",
                note: "The last version where this works at all."
            },
            { method: "mp3", available: true, confidence: "single-report" }
        ],
        packaging: "single-file",
        notes: "Same neutralize behaviour as 335. MazdaToFiatV70AIO needs its version gate edited to " +
            "`_VER_EXT -le 360` to run here.",
        sourceIds: ["A-08"]
    },
    {
        id: "70.00.367A",
        label: "70.00.367A",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [
            {
                method: "downgrade-first",
                available: true,
                confidence: "confirmed",
                note: "Downgrade to 352 or 335, then ID7v2 at install."
            },
            { method: "mp3", available: true, confidence: "single-report", note: "A single report, April 2026." }
        ],
        packaging: "single-file",
        pointOfNoReturn: 3,
        notes: "The serial login credentials are gone entirely, and updates are signed so repacking is " +
            "infeasible. The last v70.",
        sourceIds: ["C2-14"]
    },
    {
        id: "74.00.230A",
        label: "74.00.230A",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [{ method: "mp3", available: true, confidence: "confirmed" }],
        packaging: "single-file",
        notes: "The first v74. Still downgradable to v70 over USB — bench-tested.",
        sourceIds: ["F-19"]
    },
    {
        id: "74.00.311A",
        label: "74.00.311A / 74.00.310",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [{ method: "mp3", available: true, confidence: "confirmed" }],
        packaging: "single-file",
        pointOfNoReturn: 4,
        downgradeFloor: true,
        notes: "The downgrade floor rises here: from 74.00.310 upwards, USB cannot reach anything below " +
            "74.00.310.",
        sourceIds: ["C2-17"]
    },
    {
        id: "74.00.324A",
        label: "74.00.324A",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [{ method: "mp3", available: true, confidence: "confirmed", note: "Confirmed by 124 owners." }],
        packaging: "single-file",
        notes: "The final MZD-Connect-1 firmware, November 2022, with roughly 50 fixes over v70. " +
            "MazdaToFiatV70AIO needs three edited lines plus one in MZD-AIO's run.sh.",
        sourceIds: ["B-01", "C2-17"]
    },
    {
        id: "74.00.331",
        label: "74.00.331",
        markets: ["NA", "EU", "ADR"],
        vendor: "mazda",
        carplay: YES,
        usbTweaksOutOfTheBox: NO,
        id7v1Survives: NO,
        otherRoutes: [
            {
                method: "mp3",
                available: true,
                confidence: "single-report",
                note: "Reported to possibly disable wireless CarPlay."
            }
        ],
        packaging: "single-file",
        notes: "Tweaks are only recommended up to 74.00.324.",
        sourceIds: ["B-01"]
    }
];

/** The four thresholds, in the order a reader meets them. */
export const POINTS_OF_NO_RETURN = FIRMWARE
    .filter((f) => f.pointOfNoReturn !== undefined)
    .sort((a, b) => (a.pointOfNoReturn ?? 0) - (b.pointOfNoReturn ?? 0));

export const COMMUNITY_TARGET = FIRMWARE.find((f) => f.communityTarget);

/**
 * The two version floors, low to high.
 *
 * A car can move freely up and down by USB *within* a band, but never down across a floor — the update
 * screen simply does not offer the lower versions. Getting back below one needs an SPI-NOR programmer.
 */
export const DOWNGRADE_FLOORS = FIRMWARE
    .filter((f) => f.downgradeFloor === true)
    .sort((a, b) => (a.pointOfNoReturn ?? 0) - (b.pointOfNoReturn ?? 0));
