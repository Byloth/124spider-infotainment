<script lang="ts" setup>
    import { useProfile } from "../../logic/profile";
    import type { Market } from "../../data/types";

    const { profile, ready } = useProfile();

    const MARKETS: { value: Market, label: string }[] = [
        { value: "NA", label: "North America (NA)" },
        { value: "EU", label: "Europe and UK (EU)" },
        { value: "ADR", label: "Australia, NZ, Asia-Pacific (4A / ADR)" },
        { value: "JP", label: "Japan (JP)" }
    ];
</script>

<template>
    <div class="market-select">
        <label :for="'market-select'">Your market</label>
        <select id="market-select"
                v-model="profile.market"
                :disabled="!ready">
            <option :value="null">
                All markets
            </option>
            <option v-for="m in MARKETS"
                    :key="m.value"
                    :value="m.value">
                {{ m.label }}
            </option>
        </select>

        <p class="hint">
            Choosing a market filters part numbers and firmware files across the site. It never hides
            anything you cannot get back — pick "All markets" to see everything again.
        </p>
    </div>
</template>

<style lang="scss" scoped>
.market-select
{
    margin: 16px 0;

    label
    {
        display: block;
        margin-bottom: 6px;

        font-size: 14px;
        font-weight: 600;
    }

    select
    {
        width: 100%;
        max-width: 420px;
        padding: 8px 12px;

        border: 1px solid var(--vp-c-border);
        border-radius: 8px;

        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-1);
        font-family: inherit;
        font-size: 14px;

        transition: color .25s, border-color .25s, background-color .25s;

        &:focus { border-color: var(--vp-c-brand-1); }
        &:disabled { opacity: .6; }
    }
}

.hint
{
    margin: 6px 0 0;

    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 20px;
}
</style>
