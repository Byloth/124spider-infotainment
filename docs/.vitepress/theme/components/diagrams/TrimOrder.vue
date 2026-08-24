<script lang="ts" setup>
    import { computed } from "vue";

    // The order the interior comes apart in, drawn from the written step list in
    // `research/PROCEDURE-DRAFT.md` §5 (itself from 68wooley's guide, cross-checked against Mazda's own
    // cable-set sheet [E-08]).
    //
    // ⚠️ Drawn from the *text*, never traced from the workshop-manual scans — those are Mazda's, and this
    // project publishes original diagrams only.
    //
    // A picture of a dashboard would be prettier and less useful. What actually goes wrong is doing things
    // out of order: each piece is held by the one before it, and forcing a trim panel that is still captive
    // breaks clips that are not sold separately.

    interface Step
    {
        what: string;
        detail: string;
        flag?: "gps" | "care";
    }

    interface Group
    {
        name: string;
        steps: Step[];
    }

    // Grouped rather than flat because the grouping is the point: the console comes apart as a run, and
    // the dash only after it. Step numbers are derived from the order, so inserting a step cannot leave
    // the numbering behind.
    const GROUPS: Group[] = [
        {
            name: "start",
            steps: [
                { what: "battery negative", detail: "10 mm — the plastic cover is brittle" }
            ]
        },
        {
            name: "passenger side",
            steps: [
                { what: "passenger scuff plate", detail: "clips only, lift from one end" },
                { what: "passenger foot-well trim", detail: "one pop-clip — keep its centre pin" }
            ]
        },
        {
            name: "centre console",
            steps: [
                { what: "shift knob", detail: "manual unscrews; automatic differs" },
                { what: "centre console", detail: "one piece — two plugs underneath", flag: "care" },
                { what: "handbrake boot panel", detail: "two clips, slide up over the lever" }
            ]
        },
        {
            name: "passenger side",
            steps: [
                { what: "passenger A-pillar trim", detail: "tweeter attached — lay it on the dash" },
                { what: "passenger lower trim", detail: "one 10 mm bolt, then clips" }
            ]
        },
        {
            name: "centre console",
            steps: [
                { what: "rear tunnel trim", detail: "two screws ahead of the shifter" },
                { what: "front console panel", detail: "carries the old hub — three plugs" }
            ]
        },
        {
            name: "dash",
            steps: [
                { what: "hazard / vent panel", detail: "clips from the passenger side" },
                { what: "meter hood", detail: "lower the wheel, pull straight back" },
                { what: "head unit", detail: "one 10 mm bolt — five plugs behind", flag: "gps" }
            ]
        },
        {
            name: "the actual job",
            steps: [
                { what: "swap the hub", detail: "four tabs, two screws each side" }
            ]
        }
    ];

    const STEPS = GROUPS.flatMap((g) => g.steps.map((step) => ({ ...step, group: g.name })));

    const ROW = 40;
    const TOP = 54;

    const rows = computed(() => STEPS.map((step, i) => ({ ...step, n: i + 1, y: TOP + (i * ROW) })));

    /** One band per contiguous run of the same group, so the label is drawn once. */
    const bands = computed(() =>
    {
        const out: { group: string, y: number, height: number }[] = [];

        for (const row of rows.value)
        {
            const last = out[out.length - 1];

            if (last !== undefined && last.group === row.group) { last.height += ROW; }
            else { out.push({ group: row.group, y: row.y - 26, height: ROW }); }
        }

        return out;
    });

    const height = TOP + STEPS.length * ROW + 60;
</script>

<template>
    <figure class="diagram">
        <svg :viewBox="`0 0 560 ${height}`"
             role="img"
             aria-labelledby="trim-title trim-desc">
            <title id="trim-title">The order the interior comes apart in</title>
            <desc id="trim-desc">
                Fourteen steps, in order: battery negative, passenger scuff plate, foot-well trim, shift
                knob, centre console, handbrake boot panel, A-pillar trim, passenger lower trim, rear
                tunnel trim, front console panel, hazard and vent panel, meter hood, head unit, and
                finally the hub swap. Each piece is held by the one before it. Behind the head unit, the
                blue GPS antenna plug is the one most often left unseated on reassembly. Refitting runs
                in reverse.
            </desc>

            <text x="20"
                  y="28"
                  class="heading">Removal order — reassembly runs in reverse</text>

            <g v-for="b in bands" :key="`${b.group}-${b.y}`">
                <rect x="20"
                      :y="b.y"
                      width="4"
                      :height="b.height - 6"
                      rx="2"
                      class="band" />
                <text x="34"
                      :y="b.y + 13"
                      class="band-label">{{ b.group }}</text>
            </g>

            <g v-for="s in rows" :key="s.n">
                <circle cx="152"
                        :cy="s.y"
                        r="14"
                        :class="['badge', s.flag]" />
                <text x="152"
                      :y="s.y + 4"
                      :class="['badge-n', s.flag]">{{ s.n }}</text>

                <text x="178"
                      :y="s.y - 1"
                      class="what">{{ s.what }}</text>
                <text x="178"
                      :y="s.y + 13"
                      class="detail">{{ s.detail }}</text>
            </g>

            <path :d="`M 152 ${TOP + 16} L 152 ${TOP + (STEPS.length - 1) * ROW - 16}`" class="spine" />

            <text x="20"
                  :y="height - 30"
                  class="warning">
                Behind the head unit: the blue GPS antenna plug is the one people forget to re-seat.
            </text>
        </svg>

        <figcaption>
            <p>
                Nothing here is difficult, but the order is not optional: each panel is held captive by
                the one removed before it, and a trim clip forced while it is still trapped breaks. Budget
                two to three hours the first time — Mazda's own labour allowance is 1.5 hours, which
                assumes a technician who has done it before.
            </p>
            <p>
                The step that costs people an evening is not a step at all. Five plugs come off the back
                of the head unit, and the blue GPS antenna plug is the one that gets left half-seated on
                reassembly. The symptoms — no navigation, a clock stuck on the wrong time, a greyed-out
                CarPlay entry — read like a failed firmware flash, so it is worth checking that plug
                before suspecting anything else.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg { display: block; width: 100%; height: auto; }

.heading
{
    fill: var(--vp-c-text-1);
    font-size: 14px;
    font-weight: 700;
}

.band { fill: var(--vp-c-divider); }

.band-label
{
    fill: var(--vp-c-text-3);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
}

.spine
{
    stroke: var(--vp-c-divider);
    stroke-width: 2;
}

.badge
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1.5;

    &.care { stroke: var(--vp-c-brand-1); }

    &.gps
    {
        fill: var(--vp-c-danger-soft);
        stroke: var(--vp-c-danger-1);
    }
}

.badge-n
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    font-weight: 700;
    text-anchor: middle;

    &.care { fill: var(--vp-c-brand-1); }
    &.gps { fill: var(--vp-c-danger-1); }
}

.what
{
    fill: var(--vp-c-text-1);
    font-size: 13px;
    font-weight: 600;
}

.detail
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
}

.warning
{
    fill: var(--vp-c-danger-1);
    font-size: 12px;
    font-weight: 600;
}

figcaption
{
    margin-top: 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;
}
</style>
