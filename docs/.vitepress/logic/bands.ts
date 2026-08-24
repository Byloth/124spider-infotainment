/**
 * The three firmware bands, and which versions fall in each.
 *
 * A car moves freely up and down by USB *inside* a band, and never down across a floor: the update
 * screen simply does not offer the lower versions, so getting back below one needs an SPI-NOR
 * programmer. `DowngradeWalls` draws this; `DowngradeMatrix` tabulates it.
 *
 * The partition lives here rather than in the component because it is the part that can be wrong. A
 * version silently falling outside every band, or into two, would tell a reader they can go somewhere
 * they cannot — so it is worth testing on its own, without rendering anything.
 */

import { DOWNGRADE_FLOORS, FIRMWARE } from "../data/firmware";
import type { FirmwareVersion } from "../data/firmware";
import { versionOrdinal } from "./version";

export interface Band
{
    /** `below 59.00.502`, `59.00.502 → 74.00.311A`, `74.00.311A and above`. */
    label: string;
    /** Everything in this band, oldest first. */
    entries: FirmwareVersion[];
}

/**
 * One band per floor, plus one below the lowest — so two floors give three bands.
 *
 * A floor belongs to the band it opens, not the one it closes: 59.00.502 is the first version you cannot
 * come back down from, so it sits at the bottom of the middle band.
 */
export const bands = (): Band[] =>
{
    const floors = DOWNGRADE_FLOORS.map((f) => versionOrdinal(f.id));
    const sorted = [...FIRMWARE].sort((a, b) => versionOrdinal(a.id) - versionOrdinal(b.id));

    const label = (index: number): string =>
    {
        const lower = DOWNGRADE_FLOORS[index - 1]?.id;
        const upper = DOWNGRADE_FLOORS[index]?.id;

        if (lower === undefined) { return `below ${upper}`; }
        if (upper === undefined) { return `${lower} and above`; }

        return `${lower} → ${upper}`;
    };

    const out: Band[] = floors.map((_, i) => ({ label: label(i), entries: [] }));
    out.push({ label: label(floors.length), entries: [] });

    for (const entry of sorted)
    {
        const n = versionOrdinal(entry.id);

        // `NaN >= anything` is false, so a version we cannot place lands in the lowest band rather than
        // silently vanishing. It would still be a data bug — the tests catch it.
        out[floors.filter((floor) => n >= floor).length].entries.push(entry);
    }

    return out;
};
