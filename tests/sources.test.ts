/**
 * `sourceById()` — the id resolver.
 *
 * Worth testing because it is the one piece of real logic in the data layer, and because it exists to
 * paper over two messes that are easy to reintroduce:
 *
 *   1. The research documents write ids inconsistently — `A-3` in one place, `A-02` in another.
 *   2. The registry keeps ONE primary entry per URL. When several research themes found the same page
 *      independently they each gave it their own id, and those live in an `alias` field. Citations in
 *      the older documents use whichever id their author had.
 *
 * Twenty citations failed to resolve before this function existed, so the regression is not theoretical.
 */

import { describe, expect, it } from "vitest";

import { SOURCES, sourceById } from "../docs/.vitepress/data/sources";

describe("sourceById", () =>
{
    it("resolves a canonical id", () =>
    {
        expect(sourceById("A-01")?.id).toBe("A-01");
    });

    it("resolves an id written without zero-padding", () =>
    {
        // `INVENTORY.md` cites `[A-3]` where the registry says `A-03`.
        expect(sourceById("A-3")).toBe(sourceById("A-03"));
        expect(sourceById("A-3")).toBeDefined();
    });

    it("resolves an alias to its canonical entry", () =>
    {
        const withAlias = SOURCES.find((s) => s.alias !== undefined && (/\b[A-F][0-9]?-[0-9]+\b/).test(s.alias));
        expect(withAlias).toBeDefined();

        const alias = withAlias!.alias!.match(/\b[A-F][0-9]?-[0-9]+\b/)![0];

        expect(sourceById(alias)?.id).toBe(withAlias!.id);
    });

    it("returns undefined for an id nobody registered", () =>
    {
        expect(sourceById("Z-99")).toBeUndefined();
    });

    it("does not confuse ids that differ only in their number", () =>
    {
        expect(sourceById("A-01")?.id).not.toBe(sourceById("A-02")?.id);
    });

    it("every registered id resolves to itself", () =>
    {
        const broken = SOURCES.filter((s) => sourceById(s.id)?.id !== s.id).map((s) => s.id);

        expect(broken).toEqual([]);
    });
});
