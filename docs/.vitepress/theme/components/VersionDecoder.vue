<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { FIRMWARE } from "../../data/firmware";
    import { formatVersion, parseVersion } from "../../logic/version";
    import { ROUTE_LABELS, routeFor } from "../../logic/route";
    import { useProfile } from "../../logic/profile";

    const { profile, ready } = useProfile();

    const input = ref("");
    const parsed = computed(() => (input.value.trim() === "" ? undefined : parseVersion(input.value)));

    const entry = computed(() =>
    {
        if (parsed.value === undefined) { return undefined; }

        return FIRMWARE.find((f) => f.id.startsWith(parsed.value!.version)) ??
            FIRMWARE.find((f) => f.label.includes(parsed.value!.version));
    });

    const route = computed(() =>
    {
        if (parsed.value === undefined) { return undefined; }

        return routeFor(parsed.value.version + (parsed.value.revision ?? ""), "unknown");
    });

    const remember = (): void =>
    {
        if (parsed.value === undefined) { return; }

        profile.value.version = parsed.value.raw;
        if (parsed.value.market !== undefined) { profile.value.market = parsed.value.market; }
    };
</script>

<template>
    <div class="version-decoder">
        <label for="vd-input">Paste what your car shows</label>
        <input id="vd-input"
               v-model="input"
               type="text"
               placeholder="70.00.100A EU N"
               autocomplete="off"
               spellcheck="false" />
        <p class="hint">
            <code>HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION</code>
        </p>

        <div v-if="input.trim() !== '' && parsed === undefined" class="custom-block warning">
            <p class="custom-block-title">
                Not recognised
            </p>
            <p>
                That does not look like a version string. It should read like <code>70.00.100A EU N</code>
                — three numbers, an optional revision letter, then the market and the navigation protocol.
                If the market is one this guide does not cover, the decoder refuses rather than guessing:
                pointing you at another region's firmware would be worse than saying nothing.
            </p>
        </div>

        <dl v-if="parsed" class="result">
            <div><dt>Version</dt><dd>{{ parsed.version }}</dd></div>
            <div><dt>Revision</dt><dd>{{ parsed.revision ?? "none" }}</dd></div>
            <div><dt>Market</dt><dd>{{ parsed.market ?? "not stated" }}</dd></div>
            <div>
                <dt>Navigation</dt>
                <dd>
                    {{ parsed.navProtocol === "M" ? "Matsukone (Japan)" :
                        parsed.navProtocol === "N" ? "NNG / iGO" : "not stated" }}
                </dd>
            </div>
            <div><dt>Canonical form</dt><dd><code>{{ formatVersion(parsed) }}</code></dd></div>
            <div v-if="route">
                <dt>Your route</dt><dd>{{ ROUTE_LABELS[route] }}</dd>
            </div>
        </dl>

        <div v-if="entry" class="entry">
            <p class="entry-notes">
                {{ entry.notes }}
            </p>
            <p v-if="entry.pointOfNoReturn" class="pnr">
                This is point of no return {{ entry.pointOfNoReturn }}.
            </p>
        </div>

        <button v-if="parsed && ready"
                type="button"
                class="remember"
                @click="remember">
            Remember this for the rest of the site
        </button>
    </div>
</template>

<style lang="scss" scoped>
.version-decoder { margin: 16px 0; }

label
{
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
}

input
{
    width: 100%;
    max-width: 360px;
    padding: 8px 12px;

    border: 1px solid var(--vp-c-border);
    border-radius: 8px;

    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    font-family: var(--vp-font-family-mono);
    font-size: 15px;

    transition: color .25s, border-color .25s, background-color .25s;

    &:focus { border-color: var(--vp-c-brand-1); }
}

.hint
{
    margin: 6px 0 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.result
{
    margin: 16px 0 0;
    padding: 16px;

    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;

    background-color: var(--vp-c-bg-soft);

    div
    {
        display: flex;
        gap: 12px;
        padding: 4px 0;
    }

    dt
    {
        flex: 0 0 140px;
        color: var(--vp-c-text-2);
        font-size: 14px;
    }

    dd
    {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }
}

.entry
{
    margin-top: 12px;

    .entry-notes
    {
        margin: 0;
        color: var(--vp-c-text-2);
        font-size: 14px;
        line-height: 22px;
    }
}

.pnr
{
    margin: 8px 0 0;
    color: var(--vp-c-danger-1);
    font-size: 14px;
    font-weight: 600;
}

.remember
{
    margin-top: 12px;
    padding: 0 20px;

    border: 1px solid transparent;
    border-radius: 20px;

    background-color: var(--vp-c-brand-3);
    color: var(--vp-c-white);
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    line-height: 38px;

    transition: color .25s, border-color .25s, background-color .25s;

    &:hover { background-color: var(--vp-c-brand-2); }
}
</style>
