# 00 · Toolchain

Set up the build tooling before anything else is written, so the first component is already linted,
typed and formatted the way every later one will be.

**Hard constraint that drives every decision here:** VitePress 1.6.4 owns the build and pins
**vite `^5.4.14`**, **@vitejs/plugin-vue `^5.2.1`**, **vue `^3.5.13`** (3.5.41 installed) and
**@vueuse/core `^12.4.0`**. Anything that fights those pins breaks the site.

---

## Adopt

- [ ] **TypeScript** — `npm i -D typescript`
  - [ ] Add `tsconfig.json`: `"target": "ESNext"`, `"module": "ESNext"`, `"moduleResolution": "bundler"`,
        `"strict": true`, `"jsx": "preserve"`, `"types": ["vite/client"]`, include `docs/.vitepress/**/*`.
  - [ ] Do **not** set `"noEmit": false` — nothing here is compiled by `tsc`; Vite handles it.
- [ ] **vue-tsc** — `npm i -D vue-tsc`; add script `"typecheck": "vue-tsc --noEmit"`.
- [ ] **ESLint 10 + the @byloth rules** — `npm i -D eslint @byloth/eslint-config-nuxt`
  - [ ] The config pulls `@byloth/eslint-config-typescript` and `@byloth/eslint-config-vue` transitively.
  - [ ] Flat config in `eslint.config.js` (ESLint 10 has no `.eslintrc` support).
  - [ ] Ignore `docs/.vitepress/{cache,dist}`, `node_modules`, `downloads`, `research/archive`.
  - [ ] Add script `"lint": "eslint ."` and `"lint:fix": "eslint . --fix"`.
- [ ] **SASS** — `npm i -D sass`
  - [ ] Required: Vite resolves the preprocessor lazily and throws
        *"Preprocessor dependency `sass` not found"* the moment any `lang="scss"` block compiles.
  - [ ] **Policy:** SCSS is for nesting and mixins only. Colours, spacing and dark mode come from
        `var(--vp-*)`. SCSS variables cannot read CSS custom properties at build time, so hardcoding
        them there would silently break the theme's light/dark switch.
- [ ] **Husky** — `npm i -D husky && npx husky init`
  - [ ] Pre-commit hook running, in order: `npm run lint` → `npm run typecheck` → `npm run docs:build`.
  - [ ] The build is deliberately part of it: VitePress fails on dead links, so this is also the
        link checker.
- [ ] **@vueuse/core pinned to `^12.4.0`** — `npm i -D @vueuse/core@^12`
  - [ ] ⚠️ **Not `^14`.** VitePress depends on `^12.4.0`. A top-level `^14` does not satisfy that range,
        so npm nests a second copy under `node_modules/vitepress/`, and the bundle ships two builds of
        the same library. Pinning to `^12` dedupes cleanly.
  - [ ] Revisit when VitePress 2.x leaves alpha (currently `2.0.0-alpha.19`).
  - [ ] Needed for: `useStorage` (the profile), `useEventListener`, `useMediaQuery`.

## Reject — with the reason, so this is not relitigated

- [ ] Record these in the file itself (this list is the deliverable, not a code change):
  - **`vite ^8` and `@vitejs/plugin-vue ^6`** — VitePress pins v5 of both. Installing v8 either gets
    deduped wrongly or breaks the build outright. VitePress owns the bundler; we do not.
  - **`vue` as an explicit dependency** — already provided at 3.5.41 by VitePress. Declaring it invites a
    second Vue instance, which is fatal (two reactivity systems, broken `provide`/`inject`).
  - **`vue-router`** — VitePress ships its own router. Adding this does nothing.
  - **`pinia`** — a global store is the wrong shape here. One `useStorage`-backed composable covers the
    whole state need and survives SSR without a hydration dance.
  - **`bootstrap`** — directly contradicts "stay compliant with the default theme". It would fight the
    `--vp-c-*` tokens and break dark mode.
  - **`axios`** — no backend, no runtime HTTP. All data is build-time.
  - **`three`** — no 3D.
  - **`@byloth/micro-ecs`** — an entity-component system solves nothing on a documentation site.
  - **`@byloth/exceptions`, `@byloth/vuert`** — no error surface and no modal layer; VitePress custom
    blocks cover the messaging.
  - **`@fortawesome/fontawesome-free`** — the theme already has an icon convention
    (`.vp-icon { --icon: url(…) }` masked with `background-color: currentColor`). Inline SVG matches it,
    inherits colour automatically, and adds no dependency.

## Optional, only if a concrete need appears

- [ ] **`@byloth/core`** — general utilities.
  - [ ] ⚠️ Caveat before adopting: its `exports` map points `types` at `./src/index.ts`, so the consumer
        compiles its TypeScript straight from `node_modules`. That can trip `vue-tsc` under
        `moduleResolution: bundler`. Verify with a throwaway import before committing to it.

## Scripts to end up with

- [ ] `package.json` scripts: `docs:dev`, `docs:build`, `docs:preview`, `lint`, `lint:fix`, `typecheck`.

## Done when

- [ ] `npm run lint`, `npm run typecheck` and `npm run docs:build` all pass on the current scaffold.
- [ ] The husky hook fires on a test commit and blocks a deliberately broken one.
- [ ] `npm ls @vueuse/core` shows a single deduped copy.
