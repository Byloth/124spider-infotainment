/**
 * Invariants over the data modules.
 *
 * These deliberately assert *properties*, never values. A test saying
 * `FIRMWARE.find(f => f.id === "70.00.100A").communityTarget === true` would verify nothing — it just
 * restates the datum somewhere else, so every corrected fact would then need correcting twice. This
 * project exists because the facts change; duplicating them into tests makes the expensive thing more
 * expensive.
 *
 * What these catch instead is structural damage: a duplicated id, a source reference that stopped
 * resolving, a malformed hash — and, most importantly, a link that went dead without anyone writing the
 * warning that goes with it.
 *
 * Note the division of labour with `tools/verify-data.mjs`: that script checks the modules against files
 * *outside* the module system (`downloads/CHECKSUMS.sha256`, the research documents). These tests check
 * the modules against *each other*. Neither replaces the other.
 */

import { describe, expect, it } from "vitest";

import { FAILURES } from "../docs/.vitepress/data/failures";
import { ARTIFACTS } from "../docs/.vitepress/data/files";
import { FIRMWARE, POINTS_OF_NO_RETURN } from "../docs/.vitepress/data/firmware";
import { GLOSSARY } from "../docs/.vitepress/data/glossary";
import { LINKS } from "../docs/.vitepress/data/links";
import { PARTS } from "../docs/.vitepress/data/parts";
import { SOURCES, sourceById } from "../docs/.vitepress/data/sources";

const duplicates = (values: string[]): string[] =>
{
    const seen = new Set<string>();
    const dupes = new Set<string>();
    for (const v of values)
    {
        if (seen.has(v)) { dupes.add(v); }
        seen.add(v);
    }

    return [...dupes];
};

describe("identifiers", () =>
{
    it.each([
        ["firmware", FIRMWARE.map((f) => f.id)],
        ["sources", SOURCES.map((s) => s.id)],
        ["failures", FAILURES.map((f) => f.id)],
        ["parts", PARTS.map((p) => p.id)],
        ["artifacts", ARTIFACTS.map((a) => a.path)],
        ["links", LINKS.map((l) => l.url)],
        ["glossary", GLOSSARY.map((g) => g.term)]
    ])("%s have no duplicates", (_label, ids) =>
    {
        expect(duplicates(ids as string[])).toEqual([]);
    });
});

describe("source references resolve", () =>
{
    const referenced = [
        ...FIRMWARE.flatMap((f) => f.sourceIds),
        ...ARTIFACTS.flatMap((a) => a.sourceIds),
        ...PARTS.flatMap((p) => p.sourceIds),
        ...FAILURES.flatMap((f) => f.sourceIds)
    ];

    it("every referenced id exists in the registry", () =>
    {
        const unresolved = [...new Set(referenced)].filter((id) => sourceById(id) === undefined);

        expect(unresolved).toEqual([]);
    });

    it("something is actually being referenced", () =>
    {
        // Guards against the check above passing trivially if the fields were ever emptied.
        expect(referenced.length).toBeGreaterThan(50);
    });
});

describe("links", () =>
{
    it("every link that is not alive carries a warning", () =>
    {
        // The safety invariant: a dead or hijacked link rendered without a warning is exactly the
        // failure this project exists to prevent.
        const silent = LINKS
            .filter((l) => l.status !== "alive")
            .filter((l) => l.warning === undefined || l.warning.trim() === "")
            .map((l) => l.url);

        expect(silent).toEqual([]);
    });

    it("every link records when it was last checked", () =>
    {
        const undated = LINKS.filter((l) => !(/^\d{4}-\d{2}-\d{2}$/).test(l.lastChecked));

        expect(undated.map((l) => l.url)).toEqual([]);
    });

    it("hijacked links offer somewhere else to go", () =>
    {
        const stranded = LINKS
            .filter((l) => l.status === "hijacked" && l.replacement === undefined)
            .map((l) => l.url);

        expect(stranded).toEqual([]);
    });
});

describe("artifacts", () =>
{
    it("hashes are well formed", () =>
    {
        const malformed = ARTIFACTS
            .filter((a) => !(/^[0-9a-f]{64}$/).test(a.sha256) || !(/^[0-9a-f]{32}$/).test(a.md5))
            .map((a) => a.path);

        expect(malformed).toEqual([]);
    });

    it("sizes are positive", () =>
    {
        expect(ARTIFACTS.filter((a) => a.bytes <= 0).map((a) => a.path)).toEqual([]);
    });

    it("anything too large to scan says so rather than claiming to be clean", () =>
    {
        // Files above VirusTotal's analysis cap can never be scanned; claiming otherwise would be a lie
        // to the reader. Roughly 650 MB, so use a conservative threshold.
        const CAP = 650 * 1024 * 1024;
        const lying = ARTIFACTS
            .filter((a) => a.bytes > CAP && a.scan !== "too-large")
            .map((a) => a.path);

        expect(lying).toEqual([]);
    });
});

describe("firmware", () =>
{
    it("every alternative route states its confidence", () =>
    {
        const bare = FIRMWARE
            .filter((f) => f.otherRoutes.some((route) => route.confidence === undefined))
            .map((f) => f.id);

        expect(bare).toEqual([]);
    });

    it("the points of no return are ordered and complete", () =>
    {
        const ordinals = POINTS_OF_NO_RETURN.map((f) => f.pointOfNoReturn);

        expect(ordinals).toEqual([1, 2, 3, 4]);
    });

    it("exactly one version is marked as the community target", () =>
    {
        expect(FIRMWARE.filter((f) => f.communityTarget === true)).toHaveLength(1);
    });

    it("every version explains itself", () =>
    {
        expect(FIRMWARE.filter((f) => f.notes.trim() === "").map((f) => f.id)).toEqual([]);
    });
});

describe("failures", () =>
{
    it("every failure has at least one cause and one fix", () =>
    {
        const incomplete = FAILURES
            .filter((f) => f.causes.length === 0 || f.fixes.length === 0)
            .map((f) => f.id);

        expect(incomplete).toEqual([]);
    });

    it("no symptom is left blank", () =>
    {
        expect(FAILURES.filter((f) => f.symptom.trim() === "").map((f) => f.id)).toEqual([]);
    });
});

describe("parts", () =>
{
    it("every price carries the date it was observed", () =>
    {
        // These are historic figures gathered between 2018 and 2026, not quotes. Rendering one without
        // its date would mislead.
        const undated = PARTS
            .filter((part) => (part.prices ?? []).some((price) => !(/^\d{4}(-\d{2})?$/).test(price.asOf)))
            .map((part) => part.id);

        expect(undated).toEqual([]);
    });
});

describe("glossary", () =>
{
    it("no alias collides with another term", () =>
    {
        const terms = new Set(GLOSSARY.map((g) => g.term.toLowerCase()));
        const clashing = GLOSSARY
            .flatMap((g) => (g.aliases ?? []).map((a) => ({ term: g.term, alias: a })))
            .filter(({ alias }) => terms.has(alias.toLowerCase()))
            .map(({ term, alias }) => `${term} → ${alias}`);

        expect(clashing).toEqual([]);
    });

    it("every term is defined", () =>
    {
        expect(GLOSSARY.filter((g) => g.definition.trim().length < 20).map((g) => g.term)).toEqual([]);
    });
});
