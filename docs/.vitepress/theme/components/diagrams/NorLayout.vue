<script lang="ts" setup>
    import { computed } from "vue";

    // The 8 MB SPI-NOR flash inside the unit, and the one byte that decides which system it starts.
    // Offsets from `research/raw/F-rollback-failures.md` §2.
    //
    // This is the map someone uses with a clip-on programmer to revive a bricked unit, so the offsets have
    // to be right and the boot-select partition has to be unmistakable.

    interface Partition
    {
        name: string;
        offset: string;
        /** Fraction of the chip, for the bar. Approximate — the map is about order, not area. */
        span: number;
        key?: boolean;
    }

    const PARTITIONS: Partition[] = [
        { name: "bootstrap", offset: "0x000000", span: 1 },
        { name: "boot-select", offset: "0x010000", span: 1, key: true },
        { name: "ibc1", offset: "0x020000", span: 1 },
        { name: "ibc2", offset: "0x040000", span: 1 },
        { name: "nv-config", offset: "0x060000", span: 1 },
        { name: "config", offset: "0x070000", span: 1 },
        { name: "jci-boot-diag", offset: "0x0D0000", span: 1 },
        { name: "fail-safe", offset: "0x0E0000", span: 3 },
        { name: "update", offset: "0x7E0000", span: 1 }
    ];

    const total = PARTITIONS.reduce((sum, p) => sum + p.span, 0);

    const boxes = computed(() =>
    {
        let x = 30;

        return PARTITIONS.map((p) =>
        {
            const width = (840 * p.span) / total;
            const box = { ...p, x, width };
            x += width;

            return box;
        });
    });
</script>

<template>
    <figure class="diagram">
        <svg viewBox="0 0 900 250"
             role="img"
             aria-labelledby="nor-title nor-desc">
            <title id="nor-title">The SPI-NOR flash map and the boot-select byte</title>
            <desc id="nor-desc">
                The unit boots from an 8 MB flash chip. The byte at offset 0x010000 chooses between the
                normal system and the failsafe updater. Writing zero there forces the failsafe to run,
                which is how a bricked unit is revived.
            </desc>

            <text x="30"
                  y="34"
                  class="heading">8 MB SPI-NOR flash</text>

            <g v-for="b in boxes" :key="b.name">
                <rect :x="b.x"
                      y="52"
                      :width="b.width - 2"
                      height="56"
                      rx="4"
                      :class="['part', { key: b.key }]" />
                <text :x="b.x + (b.width - 2) / 2"
                      y="78"
                      :class="['part-name', { key: b.key }]">
                    {{ b.name }}
                </text>
                <text :x="b.x + (b.width - 2) / 2"
                      y="96"
                      class="part-offset">{{ b.offset }}</text>
            </g>

            <path d="M 108 138 L 108 112"
                  class="pointer"
                  marker-end="url(#nor-arrow)" />
            <text x="108"
                  y="160"
                  class="callout">write 0x00 here</text>
            <text x="108"
                  y="180"
                  class="callout-detail">forces a failsafe boot</text>

            <text x="450"
                  y="218"
                  class="footnote">
                CH341A with a SOIC16 clip, at 3.3 V — or a Raspberry Pi with flashrom. Under €50.
            </text>

            <defs>
                <marker id="nor-arrow"
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
                The unit starts from an 8 MB flash chip separate from the main storage. One byte, at
                offset <code>0x010000</code>, decides whether it boots the normal system or the failsafe
                updater. A flash interrupted between its two files leaves that byte pointing at a system
                that was never written, and the unit boots nothing.
            </p>
            <p>
                Setting that byte back to zero with a clip-on programmer forces the failsafe to run,
                which then asks for a USB stick and reinstalls. The chips seen are
                <code>MX25L6445E</code> in European units and Spansion <code>S25FL064A/P</code> in
                American and early ones. <strong>Read and save a backup before writing anything.</strong>
            </p>
        </figcaption>
    </figure>
</template>

<style lang="scss" scoped>
.diagram { margin: 24px 0; }

svg { display: block; width: 100%; height: auto; }

.heading
{
    fill: var(--vp-c-text-2);
    font-size: 13px;
    font-weight: 700;
}

.part
{
    fill: var(--vp-c-bg-soft);
    stroke: var(--vp-c-divider);
    stroke-width: 1;

    &.key
    {
        fill: var(--vp-c-danger-soft);
        stroke: var(--vp-c-danger-1);
        stroke-width: 2;
    }
}

.part-name
{
    fill: var(--vp-c-text-1);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;

    &.key { fill: var(--vp-c-danger-1); }
}

.part-offset
{
    fill: var(--vp-c-text-3);
    font-family: var(--vp-font-family-mono);
    font-size: 10px;
    text-anchor: middle;
}

.pointer { stroke: var(--vp-c-danger-1); stroke-width: 2; }
.marker { fill: var(--vp-c-danger-1); }

.callout
{
    fill: var(--vp-c-danger-1);
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
}

.callout-detail,
.footnote
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
