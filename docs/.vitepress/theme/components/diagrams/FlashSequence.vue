<script lang="ts" setup>
// Why the order matters, and where the unit dies.
//
// The failsafe package rewrites the bootloader and the updater; the reinstall package rewrites the
// operating system. Between them the unit is pointing at a system that is not there yet. Cut the power
// in that window and it boots neither — black screen, radio still playing.
</script>

<template>
    <figure class="diagram">
        <svg viewBox="0 0 900 260"
             role="img"
             aria-labelledby="fs-title fs-desc">
            <title id="fs-title">The two-file flash sequence, and the window where power loss is fatal</title>
            <desc id="fs-desc">
                The failsafe package is installed first and replaces the bootloader and updater. The
                reinstall package follows and replaces the operating system. Between the two the unit
                cannot boot either system, which is why losing power there kills it.
            </desc>

            <!-- step 1 -->
            <rect x="30"
                  y="60"
                  width="220"
                  height="90"
                  rx="12"
                  class="step" />
            <text x="140"
                  y="90"
                  class="step-name">1 · failsafe.up</text>
            <text x="140"
                  y="112"
                  class="step-detail">~7 MB, about 8 minutes</text>
            <text x="140"
                  y="132"
                  class="step-detail">replaces bootloader + updater</text>

            <!-- the danger window -->
            <rect x="280"
                  y="46"
                  width="180"
                  height="118"
                  rx="12"
                  class="danger-zone" />
            <text x="370"
                  y="76"
                  class="danger-title">danger</text>
            <text x="370"
                  y="100"
                  class="danger-detail">the unit points at</text>
            <text x="370"
                  y="118"
                  class="danger-detail">a system not yet</text>
            <text x="370"
                  y="136"
                  class="danger-detail">written</text>

            <!-- step 2 -->
            <rect x="490"
                  y="60"
                  width="220"
                  height="90"
                  rx="12"
                  class="step" />
            <text x="600"
                  y="90"
                  class="step-name">2 · reinstall.up</text>
            <text x="600"
                  y="112"
                  class="step-detail">0.9–2.3 GB, 27–40 minutes</text>
            <text x="600"
                  y="132"
                  class="step-detail">replaces the operating system</text>

            <!-- done -->
            <rect x="740"
                  y="60"
                  width="130"
                  height="90"
                  rx="12"
                  class="step done" />
            <text x="805"
                  y="100"
                  class="step-name">done</text>
            <text x="805"
                  y="122"
                  class="step-detail">70.00.100A</text>

            <path d="M 252 105 L 276 105"
                  class="flow"
                  marker-end="url(#fs-arrow)" />
            <path d="M 462 105 L 486 105"
                  class="flow"
                  marker-end="url(#fs-arrow)" />
            <path d="M 712 105 L 736 105"
                  class="flow"
                  marker-end="url(#fs-arrow)" />

            <!-- the pedal rule spans the whole thing -->
            <line x1="30"
                  y1="196"
                  x2="870"
                  y2="196"
                  class="rule-line" />
            <text x="450"
                  y="188"
                  class="rule-label">
                press the clutch or brake every 20 minutes — ACC cuts out at 25
            </text>
            <text x="450"
                  y="228"
                  class="rule-note">
                never switch the ignition off between the two files
            </text>

            <defs>
                <marker id="fs-arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="marker" />
                </marker>
            </defs>
        </svg>

        <figcaption>
            <p>
                The failsafe package goes first and replaces the bootloader and the updater itself. The
                reinstall package follows with the operating system. In the window between them the unit
                is configured to boot something that has not been written yet — so a power cut there
                leaves it unable to start either the old system or the new one.
            </p>
            <p>
                The symptom is unmistakable: a black screen with the radio still playing, and the knob
                and touchscreen dead. It cannot be recovered from the driver's seat.
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg { display: block; width: 100%; height: auto; }

.step
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;

    &.done { stroke: var(--vp-c-brand-1); }
}

.step-name
{
    fill: var(--vp-c-text-1);
    font-size: 15px;
    font-weight: 700;
    text-anchor: middle;
}

.step-detail
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
    text-anchor: middle;
}

.danger-zone
{
    fill: var(--vp-c-danger-soft);
    stroke: var(--vp-c-danger-1);
    stroke-width: 1.5;
    stroke-dasharray: 5 4;
}

.danger-title
{
    fill: var(--vp-c-danger-1);
    font-size: 15px;
    font-weight: 700;
    text-anchor: middle;
}

.danger-detail
{
    fill: var(--vp-c-danger-1);
    font-size: 12px;
    text-anchor: middle;
}

.flow { stroke: var(--vp-c-text-3); stroke-width: 2; }
.marker { fill: var(--vp-c-text-3); }

.rule-line
{
    stroke: var(--vp-c-warning-1);
    stroke-width: 1.5;
}

.rule-label
{
    fill: var(--vp-c-warning-1);
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
}

.rule-note
{
    fill: var(--vp-c-text-2);
    font-size: 12px;
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
