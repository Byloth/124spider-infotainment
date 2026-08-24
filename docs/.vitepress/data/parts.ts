/**
 * Hardware: the retrofit kit, the navigation cards, and the replacement units.
 *
 * From `research/INVENTORY.md` §3 and `research/raw/E-hardware-retrofit-kit.md`.
 *
 * Every price carries the date it was observed. These are historic figures gathered from forum posts,
 * dealer sites and parts catalogues between 2018 and 2026 — they are not quotes, and a page that renders
 * them without the date would be misleading.
 */

import type { Market, Price } from "./types";

export interface Part
{
    id: string;
    role: "hub" | "cable-set" | "kit" | "tape" | "manual" | "nav-sd" | "cmu" | "screen" | "tool";
    partNumber: string;
    /** Markets this specific part number is catalogued for. */
    markets: Market[] | "all";
    label: string;
    supersededBy?: string;
    contents?: string[];
    prices?: Price[];
    notes?: string;
    sourceIds: string[];
}

export const PARTS: readonly Part[] = [
    {
        id: "hub-9U0C",
        role: "hub",
        partNumber: "TK78-66-9U0C",
        markets: "all",
        label: "CarPlay / Android Auto USB hub",
        supersededBy: "TK78-66-9U0E",
        prices: [
            { market: "NA", amount: "$164.95 MSRP (9U0E)", asOf: "2026-08" },
            { market: "JP", amount: "¥12,960", asOf: "2019" }
        ],
        notes: "The same part worldwide. Genuine units carry an orange label and \"Made in Japan\". " +
            "Superseded by -9U0D then -9U0E, which US catalogues list as replacing B, C and D. The " +
            "earlier -9U0, -9U0A and -9U0B, and the China-market green-label KD5J-66-9U0, are reported " +
            "not to work with 70.00.021 and above.",
        sourceIds: ["E-06", "E-10", "E-01"]
    },
    {
        id: "hub-original",
        role: "hub",
        partNumber: "N243-66-9U0A / N243-66-9U0B",
        markets: "all",
        label: "The 124's original hub",
        notes: "What comes out. Keep it: refitting it restores everything except CarPlay and Android " +
            "Auto, which is useful before a dealer visit — and it is required if the firmware ever " +
            "needs re-flashing.",
        sourceIds: ["E-01"]
    },
    {
        id: "cable-NA",
        role: "cable-set",
        partNumber: "C922-V6-605A",
        markets: ["NA"],
        label: "USB cable set — North America",
        contents: [
            "USB cable, grey/blue to brown plug",
            "USB cable, grey/green to black plug",
            "9 × 200 mm cable ties",
            "3 × 10 sheets of 100×30 mm sponge tape",
            "Owner's manual supplement and parts list"
        ],
        prices: [{ market: "NA", amount: "$85.95 MSRP", asOf: "2026-08" }],
        notes: "The regional cable sets differ only by catalogue entry — any of them physically fits any " +
            "car.",
        sourceIds: ["E-08", "E-09"]
    },
    {
        id: "cable-EU",
        role: "cable-set",
        partNumber: "C830-V6-60Z",
        markets: ["EU"],
        label: "USB cable set — Europe and UK",
        prices: [
            { market: "EU", amount: "€126", asOf: "2026-08" },
            { market: "EU", amount: "£100–101", note: "UK dealer web shops", asOf: "2026-08" }
        ],
        sourceIds: ["E-24", "E-26"]
    },
    {
        id: "cable-ADR",
        role: "cable-set",
        partNumber: "C924-V6-605",
        markets: ["ADR"],
        label: "USB cable set — Australia, NZ and Asia-Pacific",
        sourceIds: ["E-06"]
    },
    {
        id: "cable-JP",
        role: "cable-set",
        partNumber: "C921-V6-605",
        markets: ["JP"],
        label: "USB cable set — Japan",
        prices: [{ market: "JP", amount: "¥2,592", asOf: "2019" }],
        notes: "A separate GPS-unit cable, C923-V6-605, exists for the CX-8 only.",
        sourceIds: ["E-36"]
    },
    {
        id: "kit-NA",
        role: "kit",
        partNumber: "0000-8F-Z34",
        markets: ["NA"],
        label: "Smartphone Screen Mirroring Kit (North America)",
        contents: ["1 × TK78-66-9U0C hub", "1 × C922-V6-605 cable set"],
        prices: [
            { market: "NA", amount: "$199 + labour", note: "at launch, labour op YY800XRX, 1.5 h", asOf: "2018-08" },
            { market: "NA", amount: "$250.90 MSRP, $192–213 online", asOf: "2026-08" },
            { market: "NA", amount: "$499.99 fitted", note: "dealer, roughly 2 hours", asOf: "2026-08" }
        ],
        notes: "The only market with a single kit part number. Europe orders the pieces as separate lines.",
        sourceIds: ["E-09", "E-21", "E-23"]
    },
    {
        id: "kit-EU-lines",
        role: "kit",
        partNumber: "(no single number)",
        markets: ["EU"],
        label: "Europe and UK — ordered as separate lines",
        contents: [
            "TK78-66-9U0C hub",
            "C830-V6-60Z cable set",
            "C830-V6-693 urethane sponge tape",
            "Manual supplement 4100-77-300EN / -ES / -DE"
        ],
        prices: [
            { market: "EU", amount: "€220 parts, €360 fitted", note: "at launch", asOf: "2018-08" },
            { market: "EU", amount: "£174–232 genuine parts", asOf: "2026-08" },
            { market: "EU", amount: "£350–467 dealer-fitted", asOf: "2026-08" },
            { market: "EU", amount: "£150 kit, £140 fitting", note: "124spider.uk", asOf: "2026-08" }
        ],
        sourceIds: ["E-27", "E-24", "E-11"]
    },
    {
        id: "kit-ADR",
        role: "kit",
        partNumber: "(no single number)",
        markets: ["ADR"],
        label: "Australia and NZ",
        prices: [{ market: "ADR", amount: "A$355 genuine kit", asOf: "2026-08" }],
        sourceIds: ["E-29"]
    },
    {
        id: "nav-sd-fiat-na",
        role: "nav-sd",
        partNumber: "DD1B-66-EZ1 (MOPAR 68366118AA)",
        markets: ["NA"],
        label: "Fiat navigation SD card — North America",
        notes: "Mazda cards (BHP1-66-EZ1x) do not work in a 124: this was tested and failed. The card " +
            "VIN-locks after roughly 100 km, so it cannot be moved to another car afterwards.",
        sourceIds: ["B-20"]
    },
    {
        id: "nav-sd-fiat-eu",
        role: "nav-sd",
        partNumber: "NA4N66EZ1A",
        markets: ["EU"],
        label: "Fiat navigation SD card — Europe",
        notes: "Map updates ended: the last release was August 2022 and the update tool went end-of-life " +
            "on 31 December 2023.",
        sourceIds: ["B-20", "B-22"]
    },
    {
        id: "cmu-replacement",
        role: "cmu",
        partNumber: "MOPAR 68465853AA / 68460741AA · Mazda3 BJS7669C0K",
        markets: "all",
        label: "Replacement CMU",
        prices: [
            { market: "EU", amount: "€190–600 used, €1000–1500 new", asOf: "2026-08" },
            { market: "NA", amount: "$125–299 used", asOf: "2026-08" }
        ],
        notes: "These units are **not VIN-locked**: any MZD-1 CMU from any Mazda model is plug-and-play. " +
            "That makes a used unit both the last-resort repair and the community's answer for a car " +
            "stuck on locked firmware — fit a used v56 unit and run the easy path on that.",
        sourceIds: ["F-01", "F-23", "F-18"]
    },
    {
        id: "screen",
        role: "screen",
        partNumber: "D0YP-61-1JZ",
        markets: "all",
        label: "Screen assembly (Connect 1.0)",
        prices: [{ market: "NA", amount: "~$80", asOf: "2026-08" }],
        notes: "The digitizer alone (TM070RDZ38, 7-inch, 36-pin) runs about $20 — relevant for the " +
            "well-known delamination fault rather than for this upgrade.",
        sourceIds: ["B-17"]
    },
    {
        id: "tool-spi-programmer",
        role: "tool",
        partNumber: "CH341A + SOIC16 clip",
        markets: "all",
        label: "SPI flash programmer — for un-bricking only",
        prices: [{ market: "EU", amount: "under €50 for the whole kit", asOf: "2026-08" }],
        notes: "**Must be 3.3 V** on the data lines; many CH341A boards need the well-documented " +
            "trace-cut modification first. A Raspberry Pi with flashrom does the same job. Chips seen: " +
            "MX25L6445E in EU units, Spansion S25FL064A/P in US and early ones.",
        sourceIds: ["F-19", "F-03"]
    },
    {
        id: "tool-serial",
        role: "tool",
        partNumber: "CP2102 USB-TTL adapter",
        markets: "all",
        label: "Serial adapter — for the pre-2025 tweak route",
        notes: "Only needed for the serial route. One owner shorted a bare TX wire against the CMU case " +
            "and destroyed both the adapter and the unit's serial port.",
        sourceIds: ["C2-08", "F-60"]
    }
];

export const partsForMarket = (market: Market): Part[] =>
    PARTS.filter((p) => p.markets === "all" || p.markets.includes(market));
