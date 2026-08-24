<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { FIRMWARE } from "../../data/firmware";
    import { useProfile } from "../../logic/profile";
    import type { Market, Support } from "../../data/types";

    const { profile, ready, parsedVersion } = useProfile();

    const search = ref("");
    const marketFilter = ref<Market | null>(null);

    // Until mounted, and whenever no filter is set, every row shows. Filtering is an aid; the full matrix
    // is always reachable.
    const rows = computed(() =>
    {
        const market = ready.value ? (marketFilter.value ?? profile.value.market) : null;
        const needle = search.value.trim().toLowerCase();

        return FIRMWARE.filter((f) =>
        {
            const marketOk = market === null || f.markets === "all" || f.markets.includes(market);
            const searchOk = needle === "" ||
                f.label.toLowerCase().includes(needle) ||
                f.notes.toLowerCase().includes(needle);

            return marketOk && searchOk;
        });
    });

    const isReaders = (id: string): boolean =>
        ready.value && parsedVersion.value !== undefined &&
        id.startsWith(parsedVersion.value.version);

    /** Confidence is rendered as words, never as colour alone. */
    const describe = (s: Support): string =>
    {
        const base = s.available === "unknown" ? "unknown" : (s.available ? "yes" : "no");
        switch (s.confidence)
        {
            case "single-report": return `${base} — one report only`;
            case "contradictory": return `${base} — sources disagree`;
            case "unknown": return "no data";
            default: return base;
        }
    };
</script>

<template>
    <div class="firmware-matrix">
        <div class="controls">
            <label for="fw-search">Search</label>
            <input id="fw-search"
                   v-model="search"
                   type="search"
                   placeholder="version or keyword" />

            <label for="fw-market">Market</label>
            <select id="fw-market" v-model="marketFilter">
                <option :value="null">
                    All
                </option>
                <option value="NA">
                    NA
                </option>
                <option value="EU">
                    EU
                </option>
                <option value="ADR">
                    ADR (4A)
                </option>
                <option value="JP">
                    JP
                </option>
            </select>

            <span class="count">{{ rows.length }} of {{ FIRMWARE.length }}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Version</th>
                    <th>Markets</th>
                    <th>CarPlay / AA</th>
                    <th>USB tweaks</th>
                    <th>ID7 survives</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="f in rows"
                    :key="f.id"
                    :class="{ target: f.communityTarget, yours: isReaders(f.id), wall: f.pointOfNoReturn }">
                    <td>
                        <strong>{{ f.label }}</strong>
                        <span v-if="f.communityTarget" class="tag">the target</span>
                        <span v-if="f.pointOfNoReturn" class="tag danger">
                            point of no return {{ f.pointOfNoReturn }}
                        </span>
                        <span v-if="isReaders(f.id)" class="tag">your car</span>
                    </td>
                    <td>{{ f.markets === "all" ? "all" : f.markets.join(", ") }}</td>
                    <td>{{ describe(f.carplay) }}</td>
                    <td>{{ describe(f.usbTweaksOutOfTheBox) }}</td>
                    <td>{{ describe(f.id7v1Survives) }}</td>
                    <td class="notes">
                        {{ f.notes }}
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="rows.length === 0" class="empty">
            No version matches that filter. Clear the search to see all {{ FIRMWARE.length }}.
        </p>
    </div>
</template>

<style lang="scss" scoped>
.firmware-matrix
{
    margin: 16px 0;
}

.controls
{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;

    label
    {
        font-size: 14px;
        font-weight: 600;
    }

    input,
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

table
{
    display: block;
    width: 100%;
    overflow-x: auto;

    border-collapse: collapse;
    font-size: 14px;
}

th,
td
{
    padding: 8px 10px;
    border-bottom: 1px solid var(--vp-c-divider);
    text-align: left;
    vertical-align: top;
}

th
{
    background-color: var(--vp-c-bg-soft);
    font-weight: 600;
}

tr.target td { background-color: var(--vp-c-brand-soft); }
tr.yours td { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }

.notes
{
    min-width: 280px;
    color: var(--vp-c-text-2);
}

.tag
{
    display: inline-block;
    margin-left: 6px;
    padding: 0 8px;
    border-radius: 12px;

    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
    font-size: 11px;
    font-weight: 600;
    line-height: 18px;

    &.danger
    {
        background-color: var(--vp-c-danger-soft);
        color: var(--vp-c-danger-1);
    }
}

.empty
{
    color: var(--vp-c-text-2);
    font-size: 14px;
}
</style>
