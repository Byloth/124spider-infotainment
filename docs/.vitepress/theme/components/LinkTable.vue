<script lang="ts" setup>
    import { computed } from "vue";

    import { LINKS } from "../../data/links";

    import LinkStatus from "./LinkStatus.vue";

    // The external-link register, rendered whole. `LinkStatus` handles one URL inline; this is the table
    // that shows the reader the state of every host the community's guides still point at.
    //
    // It renders `LINKS` rather than restating it, so a status change is a one-line edit to the data and
    // every page follows. Server-rendered, no filtering, no JavaScript: with scripts off the table is
    // exactly the same table.

    const props = withDefaults(defineProps<{
        /** `all` (default) or `problems` — everything whose status is not `alive`. */
        filter?: "all" | "problems";
    }>(), { filter: "all" });

    const rows = computed(() => (props.filter === "problems" ?
        LINKS.filter((link) => link.status !== "alive") :
        LINKS));

    /** Sorted worst-first, so what can actually hurt someone is never below the fold. */
    const SEVERITY: Record<string, number> = {
        "hijacked": 0,
        "dead": 1,
        "login-walled": 2,
        "paywalled": 3,
        "bot-blocked": 4,
        "alive": 5
    };

    const sorted = computed(() => [...rows.value]
        .sort((a, b) => (SEVERITY[a.status] ?? 9) - (SEVERITY[b.status] ?? 9))
        .map((link) => ({ ...link, host: new URL(link.url).hostname })));
</script>

<template>
    <div class="link-table">
        <table>
            <thead>
                <tr>
                    <th>What it was</th>
                    <th>Host</th>
                    <th>Checked</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="link in sorted" :key="link.url">
                    <td>
                        <!-- Delegated on purpose: LinkStatus refuses to make a hijacked destination
                             clickable, and that guarantee must hold here too. -->
                        <LinkStatus :url="link.url" :label="link.label" />
                    </td>
                    <td class="host">
                        <code>{{ link.host }}</code>
                    </td>
                    <td class="checked">
                        {{ link.lastChecked }}
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="footnote">
            {{ sorted.length }} entries. Every external link on this site resolves through this register,
            so a host cannot rot silently — but a date here is when <em>we</em> last looked, not a promise
            about today.
        </p>
    </div>
</template>

<style lang="scss" scoped>
.link-table { margin: 16px 0; }

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
    padding: 10px;
    border-bottom: 1px solid var(--vp-c-divider);
    text-align: left;
    vertical-align: top;
}

th
{
    background-color: var(--vp-c-bg-soft);
    font-weight: 600;
}

.host code { font-size: 12px; }

.checked
{
    color: var(--vp-c-text-3);
    font-size: 13px;
    white-space: nowrap;
}

.footnote
{
    margin: 8px 0 0;
    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 20px;
}
</style>
