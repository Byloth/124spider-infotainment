<script lang="ts" setup>
    import { computed, ref } from "vue";

    import { SOURCES } from "../../data/sources";
    import type { SourceCategory } from "../../data/sources";

    const search = ref("");
    const category = ref<SourceCategory | "">("");
    const problemsOnly = ref(false);

    const CATEGORIES: { value: SourceCategory, label: string }[] = [
        { value: "official", label: "Official / OEM" },
        { value: "forum-124spider", label: "124spider.org" },
        { value: "forum-mazda3revolution", label: "mazda3revolution" },
        { value: "forum-other", label: "Other forums" },
        { value: "blog-ameridan", label: "Ameridan's blog" },
        { value: "blog-other", label: "Other blogs" },
        { value: "github", label: "GitHub / tools" },
        { value: "firmware-distribution", label: "Firmware distribution" },
        { value: "hardware-vendor", label: "Hardware vendors" },
        { value: "video", label: "Videos" }
    ];

    const rows = computed(() =>
    {
        const needle = search.value.trim().toLowerCase();

        return SOURCES.filter((s) =>
        {
            if (category.value !== "" && s.category !== category.value) { return false; }
            if (problemsOnly.value && s.status === "alive") { return false; }
            if (needle === "") { return true; }

            return s.id.toLowerCase().includes(needle) ||
                s.title.toLowerCase().includes(needle) ||
                s.summary.toLowerCase().includes(needle);
        });
    });
</script>

<template>
    <div class="source-table">
        <div class="controls">
            <label for="src-search">Search</label>
            <input id="src-search"
                   v-model="search"
                   type="search"
                   placeholder="id, title or summary" />

            <label for="src-category">Category</label>
            <select id="src-category" v-model="category">
                <option value="">
                    All
                </option>
                <option v-for="c in CATEGORIES"
                        :key="c.value"
                        :value="c.value">
                    {{ c.label }}
                </option>
            </select>

            <label for="src-problems" class="checkbox">
                <input id="src-problems"
                       v-model="problemsOnly"
                       type="checkbox" />
                Only sources with a problem
            </label>

            <span class="count">{{ rows.length }} of {{ SOURCES.length }}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Trust</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in rows" :key="s.id">
                    <td class="id">
                        {{ s.id }}
                    </td>
                    <td>
                        <a v-if="s.url"
                           :href="s.url"
                           target="_blank"
                           rel="noreferrer">{{ s.title }}</a>
                        <template v-else>
                            {{ s.title }}
                        </template>
                        <div v-if="s.author || s.dates" class="meta">
                            {{ [s.author, s.dates].filter(Boolean).join(" · ") }}
                        </div>
                    </td>
                    <td>
                        <span class="status" :class="s.status">{{ s.status }}</span>
                    </td>
                    <td>{{ s.trust }}</td>
                    <td class="summary">
                        {{ s.summary }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.source-table { margin: 16px 0; }

.controls
{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;

    label { font-size: 14px; font-weight: 600; }

    label.checkbox
    {
        display: flex;
        gap: 6px;
        align-items: center;
        font-weight: 400;
    }

    input[type="search"],
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

.id
{
    font-family: var(--vp-font-family-mono);
    white-space: nowrap;
}

.meta,
.summary
{
    color: var(--vp-c-text-2);
}

.summary { min-width: 300px; }
.meta { margin-top: 2px; font-size: 12px; }

.status
{
    display: inline-block;
    padding: 0 8px;
    border-radius: 12px;

    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
    font-size: 11px;
    font-weight: 600;
    line-height: 18px;
    white-space: nowrap;

    &.hijacked
    {
        background-color: var(--vp-c-danger-soft);
        color: var(--vp-c-danger-1);
    }
    &.dead
    {
        background-color: var(--vp-c-warning-soft);
        color: var(--vp-c-warning-1);
    }
}
</style>
