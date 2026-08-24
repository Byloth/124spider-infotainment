/**
 * The version-string parser.
 *
 * A reader types (or photographs, then types) whatever their car's About screen shows. That string
 * decides which route applies to them, so parsing it loosely — or refusing something valid — has real
 * consequences. Written before the implementation, per `03b-testing.md`.
 *
 * The anatomy, from `research/FIRMWARE-MATRIX.md` §0:
 *
 *   70.00.100A EU N
 *   └──┬───┘ │  │  └─ nav protocol: N = NNG/iGO, M = Matsukone (Japan only)
 *      │     │  └──── market: NA, EU, 4A (= ADR), JP
 *      │     └─────── revision letter, A/B/C — a different thing from the protocol letter
 *      └───────────── version
 */

import { describe, expect, it } from "vitest";

import { formatVersion, parseVersion } from "../docs/.vitepress/logic/version";

describe("parseVersion", () =>
{
    it("parses a full string", () =>
    {
        expect(parseVersion("70.00.100A EU N")).toEqual({
            version: "70.00.100",
            revision: "A",
            market: "EU",
            navProtocol: "N",
            raw: "70.00.100A EU N"
        });
    });

    it("accepts 4A and reports it as ADR", () =>
    {
        // The screen says `4A`; every document and every file name says ADR.
        expect(parseVersion("70.00.100A 4A N")?.market).toBe("ADR");
    });

    it("accepts ADR written out", () =>
    {
        expect(parseVersion("70.00.100A ADR N")?.market).toBe("ADR");
    });

    it("parses the Japanese Matsukone protocol", () =>
    {
        const parsed = parseVersion("70.00.110 JP M");

        expect(parsed?.market).toBe("JP");
        expect(parsed?.navProtocol).toBe("M");
    });

    it("parses a version with no revision letter", () =>
    {
        const parsed = parseVersion("59.00.502 NA N");

        expect(parsed?.version).toBe("59.00.502");
        expect(parsed?.revision).toBeUndefined();
    });

    it("parses a bare version with no market or protocol", () =>
    {
        // Plenty of owners quote just the number.
        const parsed = parseVersion("70.00.100A");

        expect(parsed?.version).toBe("70.00.100");
        expect(parsed?.revision).toBe("A");
        expect(parsed?.market).toBeUndefined();
        expect(parsed?.navProtocol).toBeUndefined();
    });

    it("ignores case", () =>
    {
        // `raw` deliberately preserves what the reader typed, so compare the parsed fields only.
        const lower = parseVersion("70.00.100a eu n");
        const upper = parseVersion("70.00.100A EU N");

        expect({ ...lower, raw: undefined }).toEqual({ ...upper, raw: undefined });
    });

    it("preserves what the reader actually typed", () =>
    {
        expect(parseVersion("  70.00.100a eu n  ")?.raw).toBe("70.00.100a eu n");
    });

    it("tolerates stray whitespace", () =>
    {
        expect(parseVersion("  70.00.100A   EU   N  ")?.version).toBe("70.00.100");
    });

    it("rejects nonsense", () =>
    {
        expect(parseVersion("")).toBeUndefined();
        expect(parseVersion("hello")).toBeUndefined();
        expect(parseVersion("70.00")).toBeUndefined();
        expect(parseVersion("1.2.3.4")).toBeUndefined();
    });

    it("rejects a market it does not recognise", () =>
    {
        // Better to say "I do not understand this" than to guess a market wrong: the market decides
        // which firmware files are safe to flash.
        expect(parseVersion("70.00.100A XX N")).toBeUndefined();
    });

    it("does not mistake the revision letter for the nav protocol", () =>
    {
        const parsed = parseVersion("70.00.335C NA N");

        expect(parsed?.revision).toBe("C");
        expect(parsed?.navProtocol).toBe("N");
    });
});

describe("formatVersion", () =>
{
    it("round-trips a parsed string back to canonical form", () =>
    {
        const parsed = parseVersion("70.00.100a eu n");

        expect(formatVersion(parsed!)).toBe("70.00.100A EU N");
    });

    it("renders ADR as the 4A the car actually shows", () =>
    {
        const parsed = parseVersion("70.00.100A ADR N");

        expect(formatVersion(parsed!)).toBe("70.00.100A 4A N");
    });

    it("omits what was not present", () =>
    {
        expect(formatVersion(parseVersion("59.00.502")!)).toBe("59.00.502");
    });
});
