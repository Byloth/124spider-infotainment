<script lang="ts" setup>
    import { computed } from "vue";

    import { glossaryFor } from "../../data/glossary";

    const props = defineProps<{
        /** The term to define. Matched case-insensitively, aliases included. */
        term: string;
    }>();

    const entry = computed(() => glossaryFor(props.term));
</script>

<template>
    <!--
        `<abbr>` carries the definition to screen readers and to keyboard users on focus, not only on
        hover. When a term is not in the glossary the slot still renders — a missing definition must
        never swallow the word itself.
    -->
    <abbr v-if="entry"
          class="glossary-tip"
          :title="entry.definition"
          tabindex="0">
        <slot>{{ term }}</slot>
    </abbr>
    <span v-else><slot>{{ term }}</slot></span>
</template>

<style lang="scss" scoped>
.glossary-tip
{
    border-bottom: 1px dotted var(--vp-c-text-3);
    cursor: help;
    text-decoration: none;

    transition: color .25s, border-color .25s, background-color .25s;

    &:hover,
    &:focus
    {
        border-bottom-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1);
    }
}
</style>
