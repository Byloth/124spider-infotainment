<script lang="ts" setup>
    import { computed } from "vue";

    import { sourceById } from "../../data/sources";

    // The base-aware href to the sources page. VitePress rewrites markdown links with the configured
    // `base`, but not component-authored hrefs — so under a project-site base a bare "/reference/sources"
    // would 404. `import.meta.env.BASE_URL` is Vite's copy of `base` (always trailing-slashed, "/" in
    // tests), which is exactly what VitePress's own `withBase()` reads, without pulling the client
    // runtime into a unit-tested component.
    const sourcesHref = `${import.meta.env.BASE_URL}reference/sources`;

    // Inline citations. Every factual claim on a reader-facing page names the source it rests on, the
    // same way the research documents do — this project's value is the verification, so a claim whose
    // provenance is invisible is worth noticeably less.
    //
    // Purely presentational and fully server-rendered: no state, no lifecycle, nothing that needs
    // JavaScript. Citations must survive with scripts off like everything else on this site.
    //
    // Named `SourceCite` rather than `Cite` only because `vue/multi-word-component-names` requires it —
    // the same rule that turned `Checklist` into `StepChecklist`.

    const props = defineProps<{
        /** One or more registered ids, comma-separated: `ids="B-04,D-12"`. */
        ids: string;
    }>();

    const entries = computed(() => props.ids
        .split(",")
        .map((raw) => raw.trim())
        .filter((id) => id !== "")
        .map((id) =>
        {
            // `sourceById` already pads short ids (`A-3` → `A-03`) and follows the alias column, so a
            // citation written in any of the forms the research documents use still resolves.
            const source = sourceById(id);

            return {
                id: id,
                // An id that does not resolve is shown as broken rather than dropped. A silently missing
                // citation is indistinguishable from a claim nobody sourced.
                title: source === undefined ?
                    `Unregistered source id — ${id}` :
                    `${source.title}${source.author === undefined ? "" : ` — ${source.author}`}`,
                known: source !== undefined
            };
        }));
</script>

<template>
    <sup class="cite">
        <template v-for="(entry, i) in entries" :key="entry.id">
            <!-- The separator is real text, not a CSS pseudo-element: it has to survive being copied
                 out of the page, and "doorC2-10B-05" is what happens without it. -->
            <span v-if="i > 0" class="sep">,&nbsp;</span>
            <a :class="{ unknown: !entry.known }"
               :title="entry.title"
               :href="sourcesHref">{{ entry.id }}</a>
        </template>
    </sup>
</template>

<style lang="scss" scoped>
.cite
{
    // `.vp-doc` styles superscripts as footnote references; this is the same idea, so it inherits.
    margin-left: 1px;
    font-size: 12px;
    line-height: 0;
    white-space: nowrap;

    .sep { color: var(--vp-c-text-3); }

    a
    {
        color: var(--vp-c-text-3);
        font-weight: 500;
        text-decoration: none;
        transition: color .25s, border-color .25s, background-color .25s;

        &:hover { color: var(--vp-c-brand-1); }

        // Never conveyed by colour alone: the underline carries it too.
        &.unknown
        {
            color: var(--vp-c-danger-1);
            text-decoration: underline wavy;
        }
    }
}
</style>
