<script lang="ts" setup>
    import { computed } from "vue";

    import { isHostile, linkFor } from "../../data/links";
    import type { ExternalLink } from "../../data/links";

    const props = defineProps<{
        /** The URL to render. Its health is looked up in `links.ts`. */
        url: string;
        /** Override the registered label. */
        label?: string;
    }>();

    const entry = computed<ExternalLink | undefined>(() => linkFor(props.url));
    const text = computed(() => props.label ?? entry.value?.label ?? props.url);

    const tone = computed(() =>
    {
        switch (entry.value?.status)
        {
            case "hijacked": return "danger";
            case "dead": return "warning";
            case "paywalled":
            case "login-walled":
            case "bot-blocked": return "info";
            default: return "none";
        }
    });

    // A hijacked destination must never be a live link: the whole point is to stop the reader arriving
    // there.
    //
    // The check is on the *host*, not just this URL. `mazdatweaks.com/id7/` is a harmless 404 today, but
    // the party serving a gambling site from `/serial/` decides what `/id7/` returns tomorrow — so
    // nothing on a domain with a hijacked page gets an `href`, whatever its own status says.
    const clickable = computed(() => entry.value?.status !== "hijacked" && !isHostile(props.url));
</script>

<template>
    <span class="link-status">
        <a v-if="clickable"
           :href="url"
           target="_blank"
           rel="noreferrer">{{ text }}</a>
        <span v-else class="dead-url">{{ text }}</span>

        <span v-if="tone !== 'none'"
              class="badge"
              :class="tone">{{ entry?.status }}</span>

        <span v-if="entry?.warning" class="warning">
            {{ entry.warning }}

            <template v-if="entry.replacement">
                Use <a :href="entry.replacement"
                       target="_blank"
                       rel="noreferrer">{{ entry.replacement }}</a> instead.
            </template>
            <template v-else-if="entry.archiveUrl">
                An archived copy is at
                <a :href="entry.archiveUrl"
                   target="_blank"
                   rel="noreferrer">the Wayback Machine</a>.
            </template>
        </span>
    </span>
</template>

<style lang="scss" scoped>
.link-status
{
    display: inline;
}

.dead-url
{
    color: var(--vp-c-text-2);
    text-decoration: line-through;
}

.badge
{
    display: inline-block;
    margin-left: 6px;
    padding: 0 8px;
    border-radius: 12px;

    font-size: 12px;
    font-weight: 600;
    line-height: 20px;

    // Status is never conveyed by colour alone — the badge always carries the word too.
    &.danger
    {
        background-color: var(--vp-c-danger-soft);
        color: var(--vp-c-danger-1);
    }
    &.warning
    {
        background-color: var(--vp-c-warning-soft);
        color: var(--vp-c-warning-1);
    }
    &.info
    {
        background-color: var(--vp-c-default-soft);
        color: var(--vp-c-text-2);
    }
}

.warning
{
    display: block;
    margin: 4px 0 0;

    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 22px;
}
</style>
