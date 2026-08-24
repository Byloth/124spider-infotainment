<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { FAILURES } from "../../data/failures";
    import type { FailurePhase } from "../../data/types";

    const phase = ref<FailurePhase | "">("");

    const PHASES: { value: FailurePhase, label: string }[] = [
        { value: "during-flash", label: "During the firmware flash" },
        { value: "after-flash", label: "After the flash" },
        { value: "after-tweaks", label: "After installing tweaks" },
        { value: "hardware", label: "After the hardware install" }
    ];

    const rows = computed(() =>
        (phase.value === "" ? FAILURES : FAILURES.filter((f) => f.phase === phase.value)));

    const bricks = computed(() => rows.value.filter((f) => f.severity === "brick"));
</script>

<template>
    <div class="symptom-tree">
        <div class="custom-block danger">
            <p class="custom-block-title">
                Start here
            </p>
            <p>
                <strong>Is the screen black while the radio still plays?</strong> That is the classic
                brick and it cannot be fixed from the driver's seat — go straight to the recovery page.
                Everything else on this page is recoverable where you sit.
            </p>
        </div>

        <div class="controls">
            <label for="sym-phase">When did it happen?</label>
            <select id="sym-phase" v-model="phase">
                <option value="">
                    Any time
                </option>
                <option v-for="p in PHASES"
                        :key="p.value"
                        :value="p.value">
                    {{ p.label }}
                </option>
            </select>

            <span class="count">{{ rows.length }} of {{ FAILURES.length }}</span>
        </div>

        <p v-if="bricks.length > 0" class="brick-note">
            {{ bricks.length }} of these need a flash programmer or a replacement unit.
        </p>

        <details v-for="f in rows"
                 :key="f.id"
                 class="failure">
            <summary>
                {{ f.symptom }}
                <span class="severity" :class="f.severity">{{ f.severity }}</span>
            </summary>

            <p class="label">
                Likely causes
            </p>
            <ul>
                <li v-for="(c, i) in f.causes" :key="i">
                    {{ c }}
                </li>
            </ul>

            <p class="label">
                What worked
            </p>
            <ul>
                <li v-for="(x, i) in f.fixes" :key="i">
                    {{ x }}
                </li>
            </ul>

            <p v-if="f.caveat" class="caveat">
                {{ f.caveat }}
            </p>
        </details>
    </div>
</template>

<style lang="scss" scoped>
.symptom-tree { margin: 16px 0; }

.controls
{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin: 16px 0 12px;

    label { font-size: 14px; font-weight: 600; }

    select
    {
        padding: 6px 10px;

        border: 1px solid var(--vp-c-border);
        border-radius: 8px;

        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-1);
        font-family: inherit;
        font-size: 14px;

        transition: color .25s, border-color .25s, background-color .25s;

        &:focus { border-color: var(--vp-c-brand-1); }
    }
}

.count
{
    margin-left: auto;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.brick-note
{
    margin: 0 0 12px;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.failure
{
    margin-bottom: 8px;
    padding: 12px 16px;

    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;

    summary
    {
        cursor: pointer;
        font-weight: 600;
        line-height: 24px;
    }
}

.severity
{
    display: inline-block;
    margin-left: 6px;
    padding: 0 8px;
    border-radius: 12px;

    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
    font-size: 11px;
    line-height: 18px;

    &.brick
    {
        background-color: var(--vp-c-danger-soft);
        color: var(--vp-c-danger-1);
    }
    &.serious
    {
        background-color: var(--vp-c-warning-soft);
        color: var(--vp-c-warning-1);
    }
}

.label
{
    margin: 12px 0 4px;
    font-size: 13px;
    font-weight: 600;
}

ul
{
    margin: 0;
    padding-left: 20px;
    font-size: 14px;
    line-height: 22px;
}

.caveat
{
    margin: 12px 0 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
}
</style>
