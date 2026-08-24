<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { ARTIFACTS } from "../../data/files";
    import type { Artifact } from "../../data/files";
    import { useProfile } from "../../logic/profile";

    const { profile, ready } = useProfile();

    const kind = ref<Artifact["kind"] | "">("");
    const copied = ref<string | null>(null);

    const rows = computed(() =>
    {
        const market = ready.value ? profile.value.market : null;

        return ARTIFACTS.filter((a) =>
        {
            if (kind.value !== "" && a.kind !== kind.value) { return false; }
            // Market-less artifacts (tweaks, documents) always show: they apply everywhere.
            return market === null || a.market === undefined || a.market === market;
        });
    });

    const copy = async (value: string): Promise<void> =>
    {
        try
        {
            await navigator.clipboard.writeText(value);
            copied.value = value;
            setTimeout(() => { copied.value = null; }, 1500);
        }
        catch
        {
        // Clipboard access can be refused; the hash is selectable either way.
        }
    };

    const size = (bytes: number): string =>
        (bytes >= 1024 * 1024 ?
            `${(bytes / (1024 * 1024)).toFixed(1)} MB` :
            `${(bytes / 1024).toFixed(0)} KB`);
</script>

<template>
    <div class="hash-table">
        <div class="controls">
            <label for="hash-kind">Kind</label>
            <select id="hash-kind" v-model="kind">
                <option value="">
                    All
                </option>
                <option value="firmware">
                    Firmware
                </option>
                <option value="tweak">
                    Tweak packages
                </option>
                <option value="document">
                    Documents
                </option>
                <option value="bundle">
                    Bundles
                </option>
            </select>

            <span class="count">{{ rows.length }} of {{ ARTIFACTS.length }}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>File</th>
                    <th>Size</th>
                    <th>SHA-256</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in rows" :key="a.path">
                    <td>
                        <strong>{{ a.filename }}</strong>
                        <div v-if="a.market || a.version" class="meta">
                            {{ [a.market, a.version].filter(Boolean).join(" · ") }}
                        </div>
                    </td>
                    <td class="nowrap">
                        {{ size(a.bytes) }}
                    </td>
                    <td>
                        <button type="button"
                                class="hash"
                                :title="'Copy ' + a.sha256"
                                @click="copy(a.sha256)">
                            <code>{{ a.sha256 }}</code>
                            <span class="copied" :class="{ shown: copied === a.sha256 }">copied</span>
                        </button>
                    </td>
                    <td class="nowrap">
                        {{ a.status }}
                        <div v-if="a.scan === 'too-large'" class="meta">
                            too large to scan
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.hash-table { margin: 16px 0; }

.controls
{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;

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
}

.hash
{
    display: block;
    padding: 0;

    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    text-align: left;

    code
    {
        font-size: 12px;
        word-break: break-all;
    }

    &:hover code { color: var(--vp-c-brand-1); }
}

.copied
{
    display: inline-block;
    margin-left: 6px;

    color: var(--vp-c-brand-1);
    font-size: 11px;
    opacity: 0;

    transition: opacity .25s;

    &.shown { opacity: 1; }
}
</style>
