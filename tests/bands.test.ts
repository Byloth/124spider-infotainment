/**
 * The firmware bands.
 *
 * `DowngradeWalls` draws these, but the partition is what can actually be wrong, so it is tested here
 * without rendering anything. A version falling outside every band — or into two — would tell a reader
 * they can downgrade somewhere they cannot, and the picture would look perfectly reasonable either way.
 *
 * As everywhere in this project, these assert properties rather than values: nothing here restates where
 * a floor sits, only that whatever the data says, the partition follows it.
 */

import { describe, expect, it } from "vitest";

import { bands } from "../docs/.vitepress/logic/bands";
import { DOWNGRADE_FLOORS, FIRMWARE } from "../docs/.vitepress/data/firmware";
import { versionOrdinal } from "../docs/.vitepress/logic/version";

describe("bands", () =>
{
    it("produces one more band than there are floors", () =>
    {
        expect(bands()).toHaveLength(DOWNGRADE_FLOORS.length + 1);
    });

    it("places every firmware version in exactly one band", () =>
    {
        const placed = bands().flatMap((b) => b.entries.map((e) => e.id));

        expect(placed).toHaveLength(FIRMWARE.length);
        expect(new Set(placed).size).toBe(FIRMWARE.length);
    });

    it("leaves no band empty", () =>
    {
        // An empty band would draw a box with nothing in it, which reads as "nothing lives here" rather
        // than "the data lost something".
        for (const band of bands()) { expect(band.entries.length, band.label).toBeGreaterThan(0); }
    });

    it("keeps every band internally ordered, and the bands themselves in order", () =>
    {
        let previous = Number.NEGATIVE_INFINITY;

        for (const band of bands())
        {
            for (const entry of band.entries)
            {
                const n = versionOrdinal(entry.id);

                expect(n, entry.id).not.toBeNaN();
                expect(n, entry.id).toBeGreaterThanOrEqual(previous);
                previous = n;
            }
        }
    });

    it("opens each band with its floor", () =>
    {
        // A floor is the first version you cannot come back down from, so it belongs at the bottom of
        // the band it opens — not at the top of the one it closes.
        const all = bands();

        DOWNGRADE_FLOORS.forEach((floor, i) =>
        {
            expect(all[i + 1].entries[0].id, floor.id).toBe(floor.id);
        });
    });

    it("names both floors in its labels", () =>
    {
        const labels = bands().map((b) => b.label)
            .join(" | ");

        for (const floor of DOWNGRADE_FLOORS) { expect(labels).toContain(floor.id); }
    });
});
