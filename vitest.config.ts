import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

// VitePress owns `docs/.vitepress/config.mts` and never reads this file, so the two configurations
// cannot collide. Vitest is only ever invoked through `bun run test`.

export default defineConfig({
  // `css: false` below stops Vitest putting styles in the module graph, but Vite still hands the SFC's
  // `<style lang="scss">` block to SASS. Ask for the modern compiler so the run is not buried in
  // legacy-JS-API deprecation notices.
  css: { preprocessorOptions: { scss: { api: "modern-compiler" } } },

  // Only so the diagram tests can import `.vue` files. `@vitejs/plugin-vue@5.2.4` is the exact version
  // VitePress already pulls in, so declaring it added nothing to the tree — verified with `bun pm ls`.
  plugins: [vue()],

  test: {
    include: ["tests/**/*.test.ts"],

    // Explicit imports in every test file, as in Byloth/tuemplate — no ambient globals.
    globals: false,

    // `renderToString` from `@vue/server-renderer` needs no DOM, which is why the diagram tests do not
    // drag in `@vue/test-utils` and `happy-dom` (56 packages) to assert on markup.
    environment: "node",

    // Styles are irrelevant to what these tests assert, and skipping them avoids running SASS per file.
    css: false
  }
});
