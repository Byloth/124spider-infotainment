<script lang="ts" setup>
    import { computed } from "vue";

    import { ROUTE_LABELS } from "../../logic/route";
    import { useProfile } from "../../logic/profile";
    import type { Route } from "../../data/types";

    const props = defineProps<{
        /** Which routes this block applies to. */
        routes: Route[];
        title?: string;
    }>();

    const { route, ready } = useProfile();

    // Expanded unless we positively know this block does not apply. Before hydration, without JavaScript,
    // or with no profile, every branch is open — a reader must never be shown a collapsed procedure they
    // cannot expand.
    const applies = computed(() =>
        !ready.value || route.value === undefined || props.routes.includes(route.value));

    const heading = computed(() =>
        props.title ?? props.routes.map((r) => ROUTE_LABELS[r]).join(" · "));
</script>

<template>
    <section class="route-branch" :class="{ dimmed: !applies }">
        <header>
            <h4>{{ heading }}</h4>
            <span v-if="ready && route && !applies" class="not-yours">not your route</span>
            <span v-else-if="ready && route && applies" class="yours">your route</span>
        </header>

        <div class="body">
            <slot></slot>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.route-branch
{
    margin: 16px 0;
    padding: 16px;

    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;

    transition: color .25s, border-color .25s, background-color .25s;

    // Never hidden — only visually de-emphasised, and still fully readable.
    &.dimmed { opacity: .72; }
}

header
{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: baseline;
    margin-bottom: 8px;

    h4
    {
        margin: 0;
        border: 0;
        font-size: 15px;
        font-weight: 600;
    }
}

.yours,
.not-yours
{
    padding: 0 8px;
    border-radius: 12px;

    font-size: 11px;
    font-weight: 600;
    line-height: 18px;
}

.yours
{
    background-color: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.not-yours
{
    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
}

.body :deep(> :first-child) { margin-top: 0; }
.body :deep(> :last-child) { margin-bottom: 0; }
</style>
