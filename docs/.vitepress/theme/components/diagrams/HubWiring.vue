<script lang="ts" setup>
// What the retrofit actually changes, electrically: one cable becomes two.
//
// From `research/raw/E-hardware.md` §2.1 and §4.3 step 17, and Mazda's own cable-set instruction sheet
// [E-08]. The pairing — grey/blue to brown, grey/green to black — is Mazda's; the plugs are keyed, so
// the diagram is a sanity check rather than a wiring guide.
</script>

<template>
    <figure class="diagram">
        <svg viewBox="0 0 620 420"
             role="img"
             aria-labelledby="hub-title hub-desc">
            <title id="hub-title">The old hub and the new one: one cable becomes two</title>
            <desc id="hub-desc">
                The original hub connects to the head unit with a single USB cable. The retrofit hub
                connects with two, one grey-and-blue to brown and one grey-and-green to black. Its first
                USB port carries a phone icon and supplies about 2.1 amps instead of 0.5. The old
                vehicle-side connector is left disconnected and wrapped in foam, never reused.
            </desc>

            <!-- before -->
            <text x="20"
                  y="26"
                  class="stage">before</text>

            <rect x="20"
                  y="40"
                  width="200"
                  height="92"
                  rx="8"
                  class="box" />
            <text x="120"
                  y="62"
                  class="box-title">original hub</text>
            <text x="120"
                  y="80"
                  class="part-no">N243-66-9U0A / B</text>
            <g class="ports">
                <text x="120" y="102">USB 1 · USB 2 — 0.5 A each</text>
                <text x="120" y="118">SD · AUX</text>
            </g>

            <path d="M 226 86 L 394 86" class="cable one" />
            <text x="310"
                  y="76"
                  class="cable-label">one cable</text>

            <rect x="400"
                  y="40"
                  width="200"
                  height="92"
                  rx="8"
                  class="box" />
            <text x="500"
                  y="62"
                  class="box-title">head unit (CMU)</text>
            <text x="500"
                  y="88"
                  class="note">one USB socket used</text>
            <text x="500"
                  y="112"
                  class="note">GPS antenna · SD nav · power</text>

            <!-- after -->
            <text x="20"
                  y="196"
                  class="stage">after</text>

            <rect x="20"
                  y="210"
                  width="200"
                  height="112"
                  rx="8"
                  class="box new" />
            <text x="120"
                  y="232"
                  class="box-title">retrofit hub</text>
            <text x="120"
                  y="250"
                  class="part-no">TK78-66-9U0C / D / E</text>
            <g class="ports">
                <text x="120"
                      y="272"
                      class="highlight">USB 1 — phone icon, ≈2.1 A</text>
                <text x="120" y="288">USB 2 — 0.5 A</text>
                <text x="120" y="304">SD · AUX</text>
            </g>

            <path d="M 226 246 L 394 246" class="cable two" />
            <text x="310"
                  y="238"
                  class="cable-label">grey/blue → brown</text>

            <path d="M 226 292 L 394 292" class="cable two" />
            <text x="310"
                  y="312"
                  class="cable-label">grey/green → black</text>

            <rect x="400"
                  y="210"
                  width="200"
                  height="112"
                  rx="8"
                  class="box new" />
            <text x="500"
                  y="232"
                  class="box-title">head unit (CMU)</text>
            <text x="500"
                  y="258"
                  class="note">two USB sockets used</text>
            <text x="500"
                  y="282"
                  class="note">GPS antenna · SD nav · power</text>
            <text x="500"
                  y="308"
                  class="warn">re-seat the blue GPS plug</text>

            <text x="310"
                  y="358"
                  class="footnote">
                The old vehicle-side connector is wrapped in foam and tied back — never reused.
            </text>
            <text x="310"
                  y="382"
                  class="footnote">
                The retrofit hub has a third connector on its back that this car does not use.
            </text>
            <text x="310"
                  y="406"
                  class="order">
                Firmware first. On 59.xx the retrofit hub does not work.
            </text>
        </svg>

        <figcaption>
            <p>
                Electrically the retrofit is small: the original hub reaches the head unit through one USB
                cable, the new one through two — grey-and-blue to brown, and grey-and-green to black. Each
                plug fits only its own socket, so the pairing is hard to get wrong. Its first USB port,
                marked with a phone icon, is the one CarPlay and Android Auto use, and it supplies roughly
                2.1 A rather than 0.5 A.
            </p>
            <p>
                Two things bite people here. The blue GPS antenna plug on the back of the head unit is the
                one most often left unseated, and the symptom — no navigation, wrong clock, a greyed-out
                CarPlay entry — does not obviously point at it. And the order matters:
                <strong>the firmware must already be on 70.xx before the hub goes in</strong>, because the
                retrofit hub does not work with 59.xx firmware and the old hub is the one that has to be
                fitted while you flash.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg { display: block; width: 100%; height: auto; }

.stage
{
    fill: var(--vp-c-text-3);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
}

.box
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;

    &.new { stroke: var(--vp-c-brand-1); }
}

.box-title
{
    fill: var(--vp-c-text-1);
    font-size: 14px;
    font-weight: 700;
    text-anchor: middle;
}

.part-no
{
    fill: var(--vp-c-text-2);
    font-family: var(--vp-font-family-mono);
    font-size: 11px;
    text-anchor: middle;
}

.ports text
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

.ports .highlight
{
    fill: var(--vp-c-brand-1);
    font-weight: 600;
}

.note
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

.warn
{
    fill: var(--vp-c-danger-1);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
}

.cable
{
    fill: none;
    stroke-width: 3;

    &.one { stroke: var(--vp-c-text-3); }
    &.two { stroke: var(--vp-c-brand-1); }
}

.cable-label
{
    fill: var(--vp-c-text-2);
    font-size: 11px;
    text-anchor: middle;
}

.footnote
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    text-anchor: middle;
}

.order
{
    fill: var(--vp-c-danger-1);
    font-size: 13px;
    font-weight: 700;
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
