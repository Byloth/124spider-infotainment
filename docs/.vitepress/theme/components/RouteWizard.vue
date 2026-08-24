<script lang="ts" setup>
    import { computed } from "vue";

    import { ARTIFACTS } from "../../data/files";
    import { ROUTE_LABELS } from "../../logic/route";
    import { useProfile } from "../../logic/profile";
    import VersionDecoder from "./VersionDecoder.vue";

    const { profile, ready, route, parsedVersion, reset } = useProfile();

    const eligible = computed(() => profile.value.display !== "3-inch");

    const files = computed(() =>
    {
        const market = profile.value.market;
        if (market === null) { return []; }

        return ARTIFACTS.filter((a) =>
            a.kind === "firmware" &&
            a.market === market &&
            (a.version?.startsWith("70.00.100") ?? false));
    });

    const warnings = computed(() =>
    {
        const out: string[] = [];

        if (profile.value.display === "3-inch")
        {
            out.push("The 3-inch display cannot be upgraded at all. Nothing below applies to your car.");
        }
        if (route.value === "id7v2-serial")
        {
            out.push("Your firmware has already deleted ID7 and the serial credentials. Whatever you may " +
                "have installed before, it is not there any more.");
        }
        if (route.value === "mp3-only")
        {
            out.push("Serial access is gone on your firmware and updates are signed, so the mp3 method is " +
                "the only way in. Evidence for it on your exact version may be thin — check the firmware " +
                "page before committing.");
        }
        if (profile.value.id7 === "unknown" && route.value === "serial-or-mp3")
        {
            out.push("You are treated as not having ID7, because assuming otherwise fails silently after " +
                "the flash — by which point the branding and navigation are already gone.");
        }
        if (profile.value.hubFitted === true)
        {
            out.push("With the new hub already fitted the firmware cannot be updated. An old hub has to go " +
                "back in first.");
        }

        return out;
    });
</script>

<template>
    <div class="route-wizard">
        <!--
            VitePress's `ClientOnly` renders `null` before mount and supports no fallback slot, so the
            no-JavaScript message is rendered here instead — outside it, and gated on `ready`.
            Without
            this the whole wizard is simply absent from the server-rendered HTML, which is precisely the
            failure the progressive-enhancement rule exists to prevent.
        -->
        <p v-if="!ready" class="fallback">
            These questions need JavaScript. Without it, read the full route table further down the
            page — every route is there, and none of them is hidden behind this wizard.
        </p>

        <template v-if="ready">
            <fieldset>
                <legend>1 · Which display does your car have?</legend>
                <label><input v-model="profile.display"
                              type="radio"
                              value="7-inch" /> 7-inch</label>
                <label><input v-model="profile.display"
                              type="radio"
                              value="3-inch" /> 3-inch</label>
            </fieldset>

            <template v-if="eligible">
                <fieldset>
                    <legend>2 · Which market?</legend>
                    <label v-for="m in (['NA', 'EU', 'ADR', 'JP'] as const)" :key="m">
                        <input v-model="profile.market"
                               type="radio"
                               :value="m" /> {{ m }}
                    </label>
                </fieldset>

                <fieldset>
                    <legend>3 · What version is on it now?</legend>
                    <VersionDecoder />
                </fieldset>

                <fieldset>
                    <legend>4 · Was ID7 ever installed?</legend>
                    <label><input v-model="profile.id7"
                                  type="radio"
                                  value="yes" /> Yes, definitely</label>
                    <label><input v-model="profile.id7"
                                  type="radio"
                                  value="no" /> No</label>
                    <label><input v-model="profile.id7"
                                  type="radio"
                                  value="unknown" /> I do not know</label>
                </fieldset>

                <fieldset>
                    <legend>5 · Is the CarPlay hub already fitted?</legend>
                    <label><input v-model="profile.hubFitted"
                                  type="radio"
                                  :value="true" /> Yes</label>
                    <label><input v-model="profile.hubFitted"
                                  type="radio"
                                  :value="false" /> No</label>
                </fieldset>
            </template>

            <section v-if="ready && (route || warnings.length > 0)" class="result">
                <h3>Your route</h3>

                <p v-if="route" class="route">
                    {{ ROUTE_LABELS[route] }}
                </p>
                <p v-else class="route muted">
                    Answer the questions above to see which route applies.
                </p>

                <div v-for="(w, i) in warnings"
                     :key="i"
                     class="custom-block warning">
                    <p>{{ w }}</p>
                </div>

                <template v-if="files.length > 0">
                    <h4>The files you need</h4>
                    <ul>
                        <li v-for="f in files" :key="f.path">
                            <code>{{ f.filename }}</code> — <code class="sha">{{ f.sha256 }}</code>
                        </li>
                    </ul>
                </template>

                <p v-if="parsedVersion" class="summary">
                    Recorded: {{ parsedVersion.raw }}<template v-if="profile.market">
                        , {{ profile.market }}
                    </template>.
                </p>

                <button type="button"
                        class="reset"
                        @click="reset">
                    Forget everything about my car
                </button>
            </section>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.route-wizard { margin: 16px 0; }

.fallback
{
    color: var(--vp-c-text-2);
    font-size: 14px;
}

fieldset
{
    margin: 0 0 16px;
    padding: 16px;

    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;

    legend
    {
        padding: 0 8px;
        font-size: 14px;
        font-weight: 600;
    }

    label
    {
        display: inline-flex;
        gap: 6px;
        align-items: center;
        margin-right: 16px;

        cursor: pointer;
        font-size: 14px;
        line-height: 28px;
    }
}

.result
{
    padding: 16px;

    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;

    background-color: var(--vp-c-bg-soft);

    h3,
    h4
    {
        margin: 0 0 8px;
        border: 0;
        font-size: 16px;
    }

    h4 { margin-top: 16px; font-size: 14px; }
}

.route
{
    margin: 0 0 12px;
    color: var(--vp-c-brand-1);
    font-size: 18px;
    font-weight: 600;

    &.muted
    {
        color: var(--vp-c-text-2);
        font-size: 14px;
        font-weight: 400;
    }
}

ul
{
    margin: 0;
    padding-left: 20px;
    font-size: 14px;
    line-height: 24px;
}

.sha
{
    font-size: 11px;
    word-break: break-all;
}

.summary
{
    margin: 16px 0 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.reset
{
    margin-top: 12px;
    padding: 0 16px;

    border: 1px solid var(--vp-c-border);
    border-radius: 20px;

    background: none;
    color: var(--vp-c-text-2);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    line-height: 32px;

    transition: color .25s, border-color .25s, background-color .25s;

    &:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
}
</style>
