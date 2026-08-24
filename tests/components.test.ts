/**
 * The two components the security pages introduced.
 *
 * Both are pure functions of the data with no state and no lifecycle, so they are testable the same way
 * the diagrams are: render to a string through `@vue/server-renderer` and assert on the relationship
 * between the data and the markup. Nothing here restates a datum.
 *
 * `LinkTable` gets the harder test, because it carries a safety guarantee: a hijacked destination must
 * never reach the reader as a clickable link. That guarantee lives in `LinkStatus`, and the point of the
 * test is that composing it into a table cannot quietly lose it.
 */

import { renderToString } from "@vue/server-renderer";
import { createSSRApp, h } from "vue";
import type { Component } from "vue";
import { describe, expect, it } from "vitest";

import LinkTable from "../docs/.vitepress/theme/components/LinkTable.vue";
import SourceCite from "../docs/.vitepress/theme/components/SourceCite.vue";

import { isHostile, LINKS } from "../docs/.vitepress/data/links";
import { SOURCES } from "../docs/.vitepress/data/sources";

const render = (component: Component, props?: Record<string, unknown>): Promise<string> =>
    renderToString(createSSRApp({ render: () => h(component, props) }));

describe("SourceCite", () =>
{
    it("renders one link per id", async () =>
    {
        const html = await render(SourceCite, { ids: "A-01,B-01" });

        expect(html.match(/<a /g) ?? []).toHaveLength(2);
        expect(html).toContain("A-01");
        expect(html).toContain("B-01");
    });

    it("resolves a canonical id to its registered title", async () =>
    {
        const source = SOURCES[0];
        const html = await render(SourceCite, { ids: source.id });

        expect(html).toContain(source.title.slice(0, 20));
        expect(html).not.toContain("Unregistered");
    });

    it("resolves an unpadded id, as the older research documents write them", async () =>
    {
        // `sourceById` pads `A-3` to `A-03`. Citations copied out of `research/raw/` rely on this.
        const padded = SOURCES.find((s) => (/^[A-Z]+-0\d$/).exec(s.id));
        expect(padded, "no single-digit source id to test with").toBeDefined();

        const html = await render(SourceCite, { ids: padded!.id.replace("-0", "-") });

        expect(html).not.toContain("Unregistered");
    });

    it("resolves an alias", async () =>
    {
        // Several research themes found the same page independently and each gave it an id; both must
        // resolve or the older documents' citations break.
        const aliased = SOURCES.find((s) => s.alias !== undefined);
        expect(aliased, "no aliased source to test with").toBeDefined();

        const alias = (/([A-Z]\d?-\d+)/).exec(aliased!.alias!)?.[1];
        expect(alias, "alias column held no parseable id").toBeDefined();

        const html = await render(SourceCite, { ids: alias! });

        expect(html).not.toContain("Unregistered");
    });

    it("marks an id that resolves to nothing instead of dropping it", async () =>
    {
        // A silently missing citation is indistinguishable from a claim nobody sourced.
        const html = await render(SourceCite, { ids: "ZZ-99" });

        expect(html).toContain("ZZ-99");
        expect(html).toContain("Unregistered");
        expect(html).toContain("unknown");
    });

    it("ignores stray whitespace and empty entries", async () =>
    {
        const html = await render(SourceCite, { ids: " A-01 , , B-01 " });

        expect(html.match(/<a /g) ?? []).toHaveLength(2);
    });
});

describe("LinkTable", () =>
{
    it("renders one row per registered link", async () =>
    {
        const html = await render(LinkTable);

        expect(html.match(/<tr[ >]/g) ?? []).toHaveLength(LINKS.length + 1); // + the header row
    });

    it("never emits an href for anything on a hostile host", async () =>
    {
        const html = await render(LinkTable);
        const hostile = LINKS.filter((l) => l.status === "hijacked" || isHostile(l.url));

        expect(hostile.length, "no hostile link to test with").toBeGreaterThan(0);

        for (const link of hostile)
        {
            // The URL must still be *shown* — a reader needs to recognise it in an old guide — but it
            // must not be reachable in one click from this site. That includes the merely-404 pages on
            // the same domain: whoever controls it decides what they return tomorrow.
            expect(html, link.url).toContain(link.label);
            expect(html, link.url).not.toContain(`href="${link.url}"`);
        }
    });

    it("catches a dead page on a hijacked domain, not just the hijacked page itself", async () =>
    {
        // The bug this exists to prevent: `mazdatweaks.com/id7/` is a 404, so its own status is `dead`
        // and an earlier version of `LinkStatus` happily linked it.
        const collateral = LINKS.filter((l) => l.status !== "hijacked" && isHostile(l.url));

        expect(collateral.length, "no same-host non-hijacked link to test with").toBeGreaterThan(0);

        const html = await render(LinkTable);
        for (const link of collateral) { expect(html, link.url).not.toContain(`href="${link.url}"`); }
    });

    it("keeps every other link clickable", async () =>
    {
        const html = await render(LinkTable);

        for (const link of LINKS.filter((l) => !isHostile(l.url) && l.status !== "hijacked"))
        {
            expect(html, link.url).toContain(`href="${link.url}"`);
        }
    });

    it("never offers a replacement that is itself on a hostile host", async () =>
    {
        // A replacement is where we send the reader instead. Sending them somewhere worse would be a
        // data error nothing else would catch.
        for (const link of LINKS)
        {
            if (link.replacement !== undefined)
            {
                expect(isHostile(link.replacement), link.url).toBe(false);
            }
        }
    });

    it("orders the table worst-first", async () =>
    {
        const html = await render(LinkTable);
        const positions = LINKS.filter((l) => l.status === "hijacked")
            .map((l) => html.indexOf(l.label));
        const alive = LINKS.filter((l) => l.status === "alive").map((l) => html.indexOf(l.label));

        // What can actually hurt someone is never below what cannot.
        expect(Math.max(...positions)).toBeLessThan(Math.min(...alive));
    });

    it("shows only the problems when asked", async () =>
    {
        const html = await render(LinkTable, { filter: "problems" });
        const problems = LINKS.filter((l) => l.status !== "alive");

        expect(html.match(/<tr[ >]/g) ?? []).toHaveLength(problems.length + 1);
    });

    it("carries the last-checked date for every row", async () =>
    {
        const html = await render(LinkTable);

        for (const link of LINKS) { expect(html, link.url).toContain(link.lastChecked); }
    });
});
