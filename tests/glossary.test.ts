/**
 * `glossaryFor()` — term lookup with aliases.
 *
 * `GlossaryTip` will call this for every marked-up term on the site, and readers write these terms
 * inconsistently ("CMU", "cmu", "Mazda Connect", "MZD"). Matching has to be forgiving without becoming
 * loose enough to return the wrong definition.
 */

import { describe, expect, it } from "vitest";

import { GLOSSARY, glossaryFor } from "../docs/.vitepress/data/glossary";

describe("glossaryFor", () =>
{
    it("finds a term by its exact name", () =>
    {
        expect(glossaryFor("CMU")?.term).toBe("CMU");
    });

    it("ignores case", () =>
    {
        expect(glossaryFor("cmu")).toBe(glossaryFor("CMU"));
    });

    it("ignores surrounding whitespace", () =>
    {
        expect(glossaryFor("  CMU  ")).toBe(glossaryFor("CMU"));
    });

    it("finds a term through one of its aliases", () =>
    {
        // "MZD" and "Mazda Connect" both point at the MZD Connect entry.
        expect(glossaryFor("MZD")?.term).toBe("MZD Connect");
        expect(glossaryFor("mazda connect")?.term).toBe("MZD Connect");
    });

    it("returns undefined for a term nobody defined", () =>
    {
        expect(glossaryFor("flux capacitor")).toBeUndefined();
    });

    it("does not match on a partial word", () =>
    {
        // "CM" must not resolve to "CMU": a loose match would show the reader the wrong definition.
        expect(glossaryFor("CM")).toBeUndefined();
    });

    it("every defined alias resolves back to its own term", () =>
    {
        const broken = GLOSSARY
            .flatMap((g) => (g.aliases ?? []).map((a) => ({ term: g.term, alias: a })))
            .filter(({ term, alias }) => glossaryFor(alias)?.term !== term)
            .map(({ term, alias }) => `${alias} → expected ${term}`);

        expect(broken).toEqual([]);
    });
});
