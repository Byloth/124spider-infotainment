<script lang="ts" setup>
    import { computed } from "vue";

    import { PARTS } from "../../data/parts";
    import { useProfile } from "../../logic/profile";

    const { profile, ready } = useProfile();

    // With no market chosen — and always before hydration — every market's parts are listed. Buying the
    // wrong cable set is recoverable; not knowing it exists is not.
    const rows = computed(() =>
    {
        const market = ready.value ? profile.value.market : null;
        if (market === null) { return PARTS; }

        return PARTS.filter((p) => p.markets === "all" || p.markets.includes(market));
    });
</script>

<template>
    <div class="part-finder">
        <p v-if="ready && profile.market" class="filtered">
            Showing parts for <strong>{{ profile.market }}</strong>. Every market's parts are listed if you
            clear the selection.
        </p>

        <table>
            <thead>
                <tr>
                    <th>Part</th>
                    <th>Number</th>
                    <th>Markets</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in rows" :key="p.id">
                    <td>
                        <strong>{{ p.label }}</strong>
                        <div v-if="p.notes" class="meta">
                            {{ p.notes }}
                        </div>
                    </td>
                    <td>
                        <code>{{ p.partNumber }}</code>
                        <div v-if="p.supersededBy" class="meta">
                            superseded by {{ p.supersededBy }}
                        </div>
                    </td>
                    <td class="nowrap">
                        {{ p.markets === "all" ? "all" : p.markets.join(", ") }}
                    </td>
                    <td>
                        <div v-for="price in p.prices ?? []"
                             :key="price.amount + price.asOf"
                             class="price">
                            {{ price.amount }}
                            <span class="asof">({{ price.market }}, {{ price.asOf }})</span>
                        </div>
                        <span v-if="!p.prices" class="meta">—</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="disclaimer">
            Prices are observations, not quotes: each carries the date it was recorded, and some go back
            to 2018.
        </p>
    </div>
</template>

<style lang="scss" scoped>
.part-finder { margin: 16px 0; }

.filtered,
.disclaimer
{
    margin: 0 0 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
}

.disclaimer { margin: 12px 0 0; font-size: 13px; }

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

th { background-color: var(--vp-c-bg-soft); font-weight: 600; }

.nowrap { white-space: nowrap; }

.meta
{
    margin-top: 2px;
    color: var(--vp-c-text-2);
    font-size: 12px;
    line-height: 18px;
}

.price { white-space: nowrap; }

.asof
{
    color: var(--vp-c-text-3);
    font-size: 12px;
}
</style>
