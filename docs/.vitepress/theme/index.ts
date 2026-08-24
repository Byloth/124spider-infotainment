// https://vitepress.dev/guide/custom-theme
//
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./style.css";

// `extends` shallow-merges this object over the default theme, except `enhanceApp`,
// which is chained (the default theme's runs first, then ours).
//
// Note there is deliberately no `Layout` here: defining one REPLACES the default
// layout entirely. When a layout slot is eventually needed, wrap it instead —
// `h(DefaultTheme.Layout, null, { "doc-before": () => h(SomeComponent) })` —
// never reimplement it. Slot names are listed in CLAUDE.md.
//
export default {
    extends: DefaultTheme,
    enhanceApp: ({ app }) =>
    {
        // Register a component globally only when it is used on three or more pages.
        // Otherwise import it per page from a `<script lang="ts" setup>` block in the
        // Markdown file itself.
        //
        void app;
    }

} satisfies Theme;
