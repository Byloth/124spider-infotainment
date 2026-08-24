<script lang="ts" setup>
// The three ways to regain tweak access, against what each one leaves installed.
//
// This is the project's own finding rendered as a picture: the route everyone calls the fallback is the
// one that leaves nothing behind, and the route everyone calls easy installs a permanent root SSH
// service. Drawn so the comparison is unavoidable.

    // `how` is broken into lines by hand because SVG has no text wrapping. Each line but the last keeps a
    // trailing space: tspans concatenate, so without it a screen reader — and the clipboard — read
    // "Mazda'sown".
    const ROUTES = [
        {
            name: "ID7",
            when: "Only installable while still on 56.x",
            how: ["Command injection into Mazda's ", "own signed diagnostic package"],
            leaves: ["Three UID-0 accounts", "A second SSH daemon", "Firewall opened on every interface"],
            permanent: true
        },
        {
            name: "Serial console",
            when: "59.00.502 to 70.00.352",
            how: ["A serial adapter on the unit's ", "pins, dashboard apart"],
            leaves: ["The same accounts and SSH daemon as ID7"],
            permanent: true
        },
        {
            name: "The mp3 method",
            when: "70.00.100 and 74.x confirmed; thinner evidence elsewhere",
            how: ["Four files the unit mistakes for ", "music open its terminal"],
            leaves: [],
            permanent: false
        }
    ];
</script>

<template>
    <figure class="diagram">
        <svg viewBox="0 0 900 340"
             role="img"
             aria-labelledby="rc-title rc-desc">
            <title id="rc-title">The three tweak routes, and what each leaves on the car</title>
            <desc id="rc-desc">
                ID7 and the serial console both install three root accounts and an SSH daemon that
                survive firmware updates. The mp3 method installs nothing at all.
            </desc>

            <g v-for="(r, i) in ROUTES" :key="r.name">
                <rect :x="20 + i * 295"
                      y="20"
                      width="265"
                      height="290"
                      rx="12"
                      :class="['card', { permanent: r.permanent }]" />
                <text :x="152 + i * 295"
                      y="52"
                      class="name">{{ r.name }}</text>
                <text :x="152 + i * 295"
                      y="76"
                      class="when">{{ r.when }}</text>

                <text :x="152 + i * 295"
                      y="112"
                      class="how">
                    <tspan v-for="(line, j) in r.how"
                           :key="line"
                           :x="152 + i * 295"
                           :dy="j === 0 ? 0 : 17">{{ line }}</tspan>
                </text>

                <text :x="152 + i * 295"
                      y="188"
                      class="leaves-label">Leaves behind</text>

                <template v-if="r.leaves.length > 0">
                    <text v-for="(l, j) in r.leaves"
                          :key="l"
                          :x="152 + i * 295"
                          :y="212 + j * 22"
                          class="leaves danger">{{ l }}</text>
                    <text :x="152 + i * 295"
                          y="292"
                          class="verdict danger">permanent</text>
                </template>
                <template v-else>
                    <text :x="152 + i * 295"
                          y="212"
                          class="leaves ok">Nothing</text>
                    <text :x="152 + i * 295"
                          y="292"
                          class="verdict ok">one session only</text>
                </template>
            </g>
        </svg>

        <figcaption>
            <p>
                Two of the three routes leave a permanent way into the car: three accounts with root
                privileges whose passwords are published in every copy of the package, plus an SSH server
                listening on every interface — including the wireless one, which is enabled on European
                cars. It survives firmware updates by design; that is what makes it useful.
            </p>
            <p>
                The mp3 method installs none of that. Where both work, it is the <em>less</em> invasive
                option — which inverts how every existing guide frames it.
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

.card
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;

    &.permanent { stroke: var(--vp-c-danger-1); }
}

.name
{
    fill: var(--vp-c-text-1);
    font-size: 17px;
    font-weight: 700;
    text-anchor: middle;
}

.when
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

.how
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    text-anchor: middle;
}

.leaves-label
{
    fill: var(--vp-c-text-3);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-anchor: middle;
    text-transform: uppercase;
}

.leaves
{
    font-size: 12px;
    text-anchor: middle;

    &.danger { fill: var(--vp-c-danger-1); }
    &.ok { fill: var(--vp-c-text-1); font-size: 15px; font-weight: 700; }
}

.verdict
{
    font-size: 12px;
    font-weight: 700;
    text-anchor: middle;

    &.danger { fill: var(--vp-c-danger-1); }
    &.ok { fill: var(--vp-c-text-2); }
}

figcaption
{
    margin-top: 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;
}
</style>
