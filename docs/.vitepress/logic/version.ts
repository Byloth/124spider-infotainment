/**
 * Parsing the version string a car shows on its About screen.
 *
 * `HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION` produces something like `70.00.100A EU N`,
 * and that string decides which route through the upgrade applies. See `research/FIRMWARE-MATRIX.md` §0.
 *
 * The parser is deliberately strict about the market. Guessing wrong there would point a reader at
 * firmware for another region, and region-mismatched firmware is treated as brick risk everywhere in the
 * sources — so an unrecognised market yields `undefined` rather than a best guess.
 */

import type { Market } from "../data/types";

export interface ParsedVersion
{
    /** The three-part number, without the revision letter: `70.00.100`. */
    version: string;
    /** `A`, `B`, `C` — sequential revisions of the same version. Absent on some builds. */
    revision?: string;
    market?: Market;
    /** `N` = NNG / iGO (everywhere except Japan), `M` = Matsukone (Japan only). */
    navProtocol?: "N" | "M";
    /** Exactly what the reader typed, kept for display. */
    raw: string;
}

/** What the car displays, mapped to what every document and file name calls it. */
const MARKETS: Record<string, Market> = {
    "NA": "NA",
    "EU": "EU",
    "4A": "ADR",
    "ADR": "ADR",
    "JP": "JP"
};

/** The inverse: ADR is written `4A` on screen. */
const MARKET_LABELS: Record<Market, string> = {
    NA: "NA",
    EU: "EU",
    ADR: "4A",
    JP: "JP"
};

const PATTERN = /^(\d{2}\.\d{2}\.\d{3})([A-Z])?(?:\s+([A-Z0-9]{2,3}))?(?:\s+([NM]))?$/;

export const parseVersion = (input: string): ParsedVersion | undefined =>
{
    const raw = input.trim();
    const normalised = raw.replace(/\s+/g, " ").toUpperCase();

    const match = PATTERN.exec(normalised);
    if (!match) { return undefined; }

    const [, version, revision, market, navProtocol] = match;

    // An unrecognised market is a refusal, not a guess: the market decides which firmware is safe.
    if (market !== undefined && !(market in MARKETS)) { return undefined; }

    return {
        version: version,
        revision: revision,
        market: market === undefined ? undefined : MARKETS[market],
        navProtocol: navProtocol as "N" | "M" | undefined,
        raw: raw
    };
};

/** Render a parsed version the way the car itself would — ADR as `4A`. */
export const formatVersion = (parsed: ParsedVersion): string =>
{
    const parts = [`${parsed.version}${parsed.revision ?? ""}`];

    if (parsed.market !== undefined) { parts.push(MARKET_LABELS[parsed.market]); }
    if (parsed.navProtocol !== undefined) { parts.push(parsed.navProtocol); }

    return parts.join(" ");
};
