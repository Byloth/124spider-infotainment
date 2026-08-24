import { defineConfig } from "vitest/config";

// VitePress owns `docs/.vitepress/config.mts` and never reads this file, so the two configurations
// cannot collide. Vitest is only ever invoked through `bun run test`.

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],

    // Explicit imports in every test file, as in Byloth/tuemplate — no ambient globals.
    globals: false,
    environment: "node"
  }
});
