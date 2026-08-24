<script lang="ts" setup>
    import { computed } from "vue";

    import { FIRMWARE } from "../../../data/firmware";

    // Generated from `firmware.ts`, never hand-drawn. A hand-drawn timeline would silently fall behind the
    // moment a firmware version is added to the data — exactly the drift this project exists to prevent.

    const WIDTH = 900;
    const HEIGHT = 220;
    const LEFT = 40;
    const RIGHT = WIDTH - 40;
    const AXIS_Y = 132;

    const ordinal = (id: string): number =>
    {
        const m = (/^(\d{2})\.(\d{2})\.([\dx]{3})/i).exec(id);
        if (!m) { return 0; }

        return (Number(m[1]) * 1_000_000) + (Number(m[2]) * 10_000) + Number(m[3].replace(/x/gi, "0"));
    };

    const points = computed(() =>
    {
        const sorted = [...FIRMWARE].sort((a, b) => ordinal(a.id) - ordinal(b.id));
        const lo = ordinal(sorted[0].id);
        const hi = ordinal(sorted[sorted.length - 1].id);
        const span = hi - lo || 1;

        return sorted.map((f, i) => ({
            entry: f,
            // A linear scale would bunch the 70.00.1xx builds into a smudge, so position by rank and keep
            // the real ordering rather than the real spacing. The axis is a sequence, not a measurement.
            x: LEFT + ((RIGHT - LEFT) * i) / (sorted.length - 1),
            rank: i,
            value: (ordinal(f.id) - lo) / span
        }));
    });

    const walls = computed(() => points.value.filter((p) => p.entry.pointOfNoReturn !== undefined));

    const target = computed(() => points.value.find((p) => p.entry.communityTarget === true));

    // Read off the data rather than written down, so the description cannot outlive the timeline it
    // describes — the same reason the markers are generated.
    const first = computed(() => points.value[0].entry.id);
    const last = computed(() => points.value[points.value.length - 1].entry.id);

    /** Stagger the labels so 21 of them do not overlap at 375 px. */
    const labelY = (rank: number): number => (rank % 2 === 0 ? AXIS_Y + 26 : AXIS_Y + 44);
</script>

<template>
    <figure class="diagram">
        <svg :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
             role="img"
             aria-labelledby="vt-title vt-desc">
            <title id="vt-title">Firmware timeline with the points of no return</title>
            <desc id="vt-desc">
                Every firmware version in order, from {{ first }} to {{ last }}, with the
                {{ walls.length }} thresholds marked that cannot be walked back<template v-if="target">,
                    and {{ target.entry.id }} marked as the version this guide targets</template>.
            </desc>

            <line :x1="LEFT"
                  :y1="AXIS_Y"
                  :x2="RIGHT"
                  :y2="AXIS_Y"
                  class="axis" />

            <g v-for="w in walls" :key="'wall-' + w.entry.id">
                <line :x1="w.x"
                      :y1="28"
                      :x2="w.x"
                      :y2="AXIS_Y"
                      class="wall" />
                <text :x="w.x"
                      :y="20"
                      class="wall-label">{{ w.entry.pointOfNoReturn }}</text>
            </g>

            <g v-if="target">
                <circle :cx="target.x"
                        :cy="AXIS_Y"
                        r="9"
                        class="target-ring" />
                <text :x="target.x"
                      y="108"
                      class="target-label">target</text>
            </g>

            <g v-for="p in points" :key="p.entry.id">
                <circle :cx="p.x"
                        :cy="AXIS_Y"
                        :r="p.entry.pointOfNoReturn ? 5 : 3"
                        :class="['dot', { wall: p.entry.pointOfNoReturn, target: p.entry.communityTarget }]" />
                <text :x="p.x"
                      :y="labelY(p.rank)"
                      class="tick">{{ p.entry.id }}</text>
            </g>
        </svg>

        <figcaption>
            <p>
                The versions in order, oldest on the left. Four thresholds cannot be walked back once
                crossed:
            </p>
            <ol>
                <li v-for="w in walls" :key="w.entry.id">
                    <strong>{{ w.entry.label }}</strong> — {{ w.entry.notes }}
                </li>
            </ol>
            <p v-if="target">
                <strong>{{ target.entry.label }}</strong> is what this guide targets, and deliberately not
                the newest: it is the last build where the Fiat rebranding tool installs unmodified.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram
{
    margin: 24px 0;
}

svg
{
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
}

.axis
{
    stroke: var(--vp-c-divider);
    stroke-width: 2;
}

.wall
{
    stroke: var(--vp-c-danger-1);
    stroke-width: 1.5;
    stroke-dasharray: 4 4;
}

.wall-label
{
    fill: var(--vp-c-danger-1);
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
}

.dot
{
    fill: var(--vp-c-text-3);

    &.wall { fill: var(--vp-c-danger-1); }
    &.target { fill: var(--vp-c-brand-1); }
}

.target-ring
{
    fill: none;
    stroke: var(--vp-c-brand-1);
    stroke-width: 2;
}

.target-label
{
    fill: var(--vp-c-brand-1);
    font-size: 12px;
    font-weight: 700;
    text-anchor: middle;
}

.tick
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

figcaption
{
    margin-top: 12px;

    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;

    ol { padding-left: 20px; }
    li { margin-bottom: 6px; }
}
</style>
