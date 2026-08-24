<script lang="ts" setup>
    import { useStorage } from "@vueuse/core";
    import { computed, onMounted, ref } from "vue";

    const props = defineProps<{
        /** Stable id — the ticks are remembered against it across reloads. */
        id: string;
        items: string[];
    }>();

    // This gets used in the car, mid-procedure, with the phone locking and the page reloading. Losing the
    // ticks at that moment is worse than not offering them.
    const checked = useStorage<string[]>(`124spider:checklist:${props.id}`, []);

    const ready = ref(false);
    onMounted(() => { ready.value = true; });

    const isChecked = (item: string): boolean => ready.value && checked.value.includes(item);

    const toggle = (item: string): void =>
    {
        checked.value = isChecked(item) ?
            checked.value.filter((i) => i !== item) :
            [...checked.value, item];
    };

    const done = computed(() => props.items.filter((i) => isChecked(i)).length);
</script>

<template>
    <div class="checklist">
        <p class="progress">
            {{ done }} of {{ items.length }} done
        </p>

        <ul>
            <li v-for="item in items" :key="item">
                <label>
                    <input type="checkbox"
                           :checked="isChecked(item)"
                           @change="toggle(item)" />
                    <span :class="{ struck: isChecked(item) }">{{ item }}</span>
                </label>
            </li>
        </ul>

        <button v-if="done > 0"
                type="button"
                class="reset"
                @click="checked = []">
            Clear
        </button>
    </div>
</template>

<style lang="scss" scoped>
.checklist
{
    margin: 16px 0;
    padding: 16px;

    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;

    background-color: var(--vp-c-bg-soft);
}

.progress
{
    margin: 0 0 12px;

    color: var(--vp-c-text-2);
    font-size: 13px;
    font-weight: 600;
}

ul
{
    margin: 0;
    padding: 0;
    list-style: none;
}

li { margin-bottom: 8px; }

label
{
    display: flex;
    gap: 10px;
    align-items: flex-start;

    cursor: pointer;
    line-height: 24px;
}

input
{
    margin-top: 4px;
    flex-shrink: 0;
}

.struck
{
    color: var(--vp-c-text-3);
    text-decoration: line-through;
}

.reset
{
    margin-top: 8px;
    padding: 0 12px;

    border: 1px solid var(--vp-c-border);
    border-radius: 20px;

    background: none;
    color: var(--vp-c-text-2);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    line-height: 28px;

    transition: color .25s, border-color .25s, background-color .25s;

    &:hover
    {
        border-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1);
    }
}
</style>
