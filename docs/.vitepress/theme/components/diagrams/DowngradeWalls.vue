<script lang="ts" setup>
    import { computed } from "vue";

    import { DOWNGRADE_FLOORS } from "../../../data/firmware";
    import { bands as partition } from "../../../logic/bands";

    // The two version walls, from `research/FIRMWARE-MATRIX.md` §3. Derived rather than drawn: the bands are
    // a partition of `firmware.ts` at the entries flagged `downgradeFloor`, so a new firmware version lands
    // in the right band without anyone editing this file.
    //
    // The partition itself lives in `logic/bands.ts` — it is the part that can be wrong, and it is tested
    // there without rendering anything.

    const NOTES = [
        "USB side-loading still works out of the box",
        "free movement up and down, by USB",
        "free movement within the band only"
    ];

    /** Two versions per line, two lines per band — what actually fits in a 250-unit box at 375 px. */
    const PER_LINE = 2;
    const MAX_LINES = 2;

    // Geometry, so the canvas grows with the data instead of the data having to fit the canvas. A third
    // floor would otherwise draw its band past the right edge of a hard-coded viewBox.
    const BAND_W = 250;
    const PITCH = 290;
    const MARGIN = 30;
    const HEIGHT = 300;

    const bands = computed(() => partition().map((band, index) =>
    {
        const shown = band.entries.slice(0, PER_LINE * MAX_LINES).map((e) => e.id);
        const hidden = band.entries.length - shown.length;

        const lines: string[] = [];
        for (let i = 0; i < shown.length; i += PER_LINE)
        {
            lines.push(shown.slice(i, i + PER_LINE).join(" · "));
        }
        if (hidden > 0) { lines[lines.length - 1] += ` · +${hidden} more`; }

        return {
            label: band.label,
            lines: lines,
            note: NOTES[index] ?? "",
            count: band.entries.length,
            x: MARGIN + (index * PITCH),
            mid: MARGIN + (index * PITCH) + (BAND_W / 2)
        };
    }));

    /** The floors, named — used in the description and the prose, so neither can drift from the data. */
    const floorList = computed(() => DOWNGRADE_FLOORS.map((f) => f.id).join(" and "));

    const width = computed(() => (bands.value.length * PITCH) - PITCH + BAND_W + (MARGIN * 2));

    /** One crossing per gap between bands: this is where a wall is. */
    const crossings = computed(() => bands.value.slice(0, -1)
        .map((band, i) => ({
            key: band.label,
            left: MARGIN + (i * PITCH) + BAND_W,
            right: MARGIN + ((i + 1) * PITCH),
            mid: MARGIN + (i * PITCH) + BAND_W + ((PITCH - BAND_W) / 2)
        })));
</script>

<template>
    <figure class="diagram">
        <svg :viewBox="`0 0 ${width} ${HEIGHT}`"
             role="img"
             aria-labelledby="dw-title dw-desc">
            <title id="dw-title">The two downgrade walls</title>
            <desc id="dw-desc">
                {{ bands.length }} bands of firmware versions, split at {{ floorList }}. Inside a band you
                can move up or down freely over USB. Crossing downward between bands is impossible over
                USB and needs a flash programmer.
            </desc>

            <g v-for="b in bands" :key="b.label">
                <rect :x="b.x"
                      y="60"
                      :width="BAND_W"
                      height="120"
                      rx="12"
                      class="band" />
                <text :x="b.mid"
                      y="92"
                      class="band-label">{{ b.label }}</text>
                <text v-for="(line, j) in b.lines"
                      :key="line"
                      :x="b.mid"
                      :y="112 + j * 15"
                      class="band-detail">{{ line }}</text>
                <text :x="b.mid"
                      y="152"
                      class="band-note">{{ b.note }}</text>

                <!-- movement inside the band -->
                <path :d="`M ${b.x + 40} 164 L ${b.x + BAND_W - 10} 164`"
                      class="within"
                      marker-end="url(#arrow)"
                      marker-start="url(#arrow-back)" />
            </g>

            <g v-for="c in crossings" :key="`cross-${c.key}`">
                <!-- upward is free -->
                <path :d="`M ${c.left} 100 L ${c.right} 100`"
                      class="up"
                      marker-end="url(#arrow)" />
                <text :x="c.mid"
                      y="88"
                      class="cross-label ok">up: fine</text>

                <!-- downward is the wall -->
                <path :d="`M ${c.right} 150 L ${c.left} 150`"
                      class="down"
                      marker-end="url(#arrow-danger)" />
                <text :x="c.mid"
                      y="206"
                      class="cross-label bad">no USB path</text>
            </g>

            <text :x="width / 2"
                  y="248"
                  class="footnote">
                Crossing a wall downward needs an SPI-NOR programmer, not a USB stick.
            </text>

            <defs>
                <marker id="arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="marker" />
                </marker>
                <marker id="arrow-back"
                        viewBox="0 0 10 10"
                        refX="1"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto">
                    <path d="M 10 0 L 0 5 L 10 10 z" class="marker" />
                </marker>
                <marker id="arrow-danger"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="marker-danger" />
                </marker>
            </defs>
        </svg>

        <figcaption>
            <p>
                Firmware sits in {{ bands.length }} bands. Inside a band you can move up or down freely
                with a USB stick. Moving <em>up</em> between bands is fine. Moving <em>down</em> between bands is not
                possible over USB at all — the update screen does not even list the older versions — and
                needs opening the unit and writing its flash chip directly.
            </p>
            <p>
                The practical consequence: <strong>{{ floorList }}</strong> are one-way doors.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg
{
    display: block;
    width: 100%;
    height: auto;
}

.band
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;
}

.band-label
{
    fill: var(--vp-c-text-1);
    font-size: 15px;
    font-weight: 700;
    text-anchor: middle;
}

.band-detail,
.band-note
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    text-anchor: middle;
}

.within
{
    stroke: var(--vp-c-text-3);
    stroke-width: 1.5;
}

.up
{
    stroke: var(--vp-c-text-2);
    stroke-width: 2;
}

.down
{
    stroke: var(--vp-c-danger-1);
    stroke-width: 2;
    stroke-dasharray: 4 3;
}

.marker { fill: var(--vp-c-text-2); }
.marker-danger { fill: var(--vp-c-danger-1); }

.cross-label
{
    font-size: 11px;
    text-anchor: middle;

    &.ok { fill: var(--vp-c-text-2); }
    &.bad { fill: var(--vp-c-danger-1); font-weight: 700; }
}

.footnote
{
    fill: var(--vp-c-text-2);
    font-size: 13px;
    text-anchor: middle;
}

figcaption
{
    margin-top: 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;
}
</style>
