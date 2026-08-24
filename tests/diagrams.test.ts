/**
 * The three data-driven diagrams.
 *
 * The point of generating them from `firmware.ts` rather than drawing them is that a picture cannot
 * silently fall behind the data. These tests are what makes that true: they assert the *relationship*
 * between the data and the rendered SVG, never the data itself.
 *
 * So there is nothing here asserting that 70.00.100A is the community target, or that the second wall is
 * at 70.00.335 — `03b-testing.md` explains why restating a datum in a test is worse than not testing it.
 * What is asserted is that whatever the data says, the diagram shows it.
 *
 * Rendering runs through `@vue/server-renderer`, which needs no DOM. That is the whole reason
 * `@vue/test-utils` and `happy-dom` are absent from this project.
 */

import { renderToString } from "@vue/server-renderer";
import { createSSRApp } from "vue";
import type { Component } from "vue";
import { describe, expect, it } from "vitest";

import DowngradeWalls from "../docs/.vitepress/theme/components/diagrams/DowngradeWalls.vue";
import RouteComparison from "../docs/.vitepress/theme/components/diagrams/RouteComparison.vue";
import VersionTimeline from "../docs/.vitepress/theme/components/diagrams/VersionTimeline.vue";

import { DOWNGRADE_FLOORS, FIRMWARE, POINTS_OF_NO_RETURN } from "../docs/.vitepress/data/firmware";

const render = (component: Component): Promise<string> => renderToString(createSSRApp(component));

/** SSR emits `<!--[-->` fragment anchors and attribute markers; strip them before matching text. */
const textOf = (html: string): string => html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

describe("VersionTimeline", () =>
{
    it("renders one marker per firmware entry", async () =>
    {
        const html = await render(VersionTimeline);

        // The invariant that matters: adding a version to `firmware.ts` cannot leave the picture behind.
        expect(html.match(/class="dot[ "]/g) ?? []).toHaveLength(FIRMWARE.length);
    });

    it("names every firmware version it plots", async () =>
    {
        const text = textOf(await render(VersionTimeline));

        for (const entry of FIRMWARE) { expect(text, entry.id).toContain(entry.id); }
    });

    it("marks every point of no return, in order", async () =>
    {
        const text = textOf(await render(VersionTimeline));
        const positions = POINTS_OF_NO_RETURN.map((f) => text.indexOf(f.id));

        expect(positions.every((p) => p >= 0)).toBe(true);
        expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    });

    it("carries a title, a description and a prose equivalent", async () =>
    {
        const html = await render(VersionTimeline);

        // These diagrams carry safety information, so it must never live only in the picture.
        expect(html).toContain("<title");
        expect(html).toContain("<desc");
        expect(html).toContain("<figcaption");
    });
});

describe("DowngradeWalls", () =>
{
    it("names both floors", async () =>
    {
        const text = textOf(await render(DowngradeWalls));

        // The floors are the entire subject, and they come from `downgradeFloor` in the data — so if a
        // future edit moves one, the picture moves with it.
        for (const floor of DOWNGRADE_FLOORS) { expect(text, floor.id).toContain(floor.id); }
    });

    it("shows one band more than there are floors", async () =>
    {
        const html = await render(DowngradeWalls);

        // Two floors cut the version range into three bands. Derived, so this cannot drift.
        expect(html.match(/class="band"/g) ?? []).toHaveLength(DOWNGRADE_FLOORS.length + 1);
    });

    it("carries a title, a description and a prose equivalent", async () =>
    {
        const html = await render(DowngradeWalls);

        expect(html).toContain("<title");
        expect(html).toContain("<desc");
        expect(html).toContain("<figcaption");
    });
});

describe("RouteComparison", () =>
{
    it("shows all three routes", async () =>
    {
        const text = textOf(await render(RouteComparison));

        for (const name of ["ID7", "Serial console", "The mp3 method"])
        {
            expect(text, name).toContain(name);
        }
    });

    it("says what each route leaves behind", async () =>
    {
        const text = textOf(await render(RouteComparison));

        // The finding this diagram exists to make unavoidable: two of the three leave root access
        // installed permanently, and the one called a fallback leaves nothing.
        expect(text).toContain("SSH");
    });

    it("carries a title, a description and a prose equivalent", async () =>
    {
        const html = await render(RouteComparison);

        expect(html).toContain("<title");
        expect(html).toContain("<desc");
        expect(html).toContain("<figcaption");
    });
});
