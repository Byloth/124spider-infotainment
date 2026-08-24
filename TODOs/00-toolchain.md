# 00 · Toolchain

Set up the build tooling before anything else is written, so the first component is already linted,
typed and formatted the way every later one will be.

**Package manager: `bun`** (as in both reference repos, which ship a `bun.lock`).

**Reference repositories** (Matteo's own, to match house style):
- `Byloth/tuemplate` — the most up-to-date template (Vite app, not VitePress).
- `Byloth/website` — a **VitePress 1.6.4** project; its `tsconfig/` is the closest existing model.

**Constraint that shapes the dependency choices:** VitePress 1.6.4 declares `vite ^5.4.14`,
`@vitejs/plugin-vue ^5.2.1`, `vue ^3.5.13` and `@vueuse/core ^12.4.0` as **regular dependencies** (not
peers), so the installer nests its own copies when a top-level range does not overlap. Verified below
by dry-run.

---

## TypeScript — mirror the reference layout

Both reference repos split the config into a `tsconfig/` directory with project references. Adopt the
same shape, adapted to this repo's layout (VitePress lives in `docs/`, and the config is `.mts`).

- [X] `bun add -d typescript@^6.0.3 @types/node`
  - [X] ⚠️ **TypeScript must be 6.0.x, not 7.** `@typescript-eslint/parser ^8.60.1` (pulled in by
        `@byloth/eslint-config-typescript`) declares `peerDependencies.typescript: ">=4.8.4 <6.1.0"`.
        `6.0.3` is the newest version inside that range — exactly what `tuemplate` pins.
- [X] **`tsconfig.json`** (root) — references only:
  ```json
  { "files": [], "references": [{ "path": "./tsconfig/app.json" }, { "path": "./tsconfig/node.json" }] }
  ```
- [X] **`tsconfig/_base.json`** — copy from `Byloth/website`, verbatim:
      `target`/`module` `ESNext`, `moduleResolution: "Bundler"`, `lib: ["ESNext"]`, `strict`, `noEmit`,
      `noFallthroughCasesInSwitch`, `noImplicitThis`, `noImplicitReturns`, `skipLibCheck`,
      `esModuleInterop`, `isolatedModules`, `resolveJsonModule`, `verbatimModuleSyntax`,
      `experimentalDecorators`, `useDefineForClassFields`, `allowImportingTsExtensions`,
      `allowSyntheticDefaultImports`, `forceConsistentCasingInFileNames`, `rootDir: ".."`.
      ⚠️ **`baseUrl` was dropped.** TypeScript 6 deprecates it (`TS5101`), which is precisely why
      `tuemplate` (TS 6) has no `baseUrl` while `website` (TS 5.9) still does. Following the newer one.
  - [X] Consider also `noImplicitOverride` — present in `tuemplate` (newer) but not in `website`.
- [X] **`tsconfig/app.json`** — from `website`, with paths adapted to `docs/`:
  ```jsonc
  {
    "extends": "./_base.json",
    "compilerOptions": {
      "composite": true,
      "lib": ["ESNext", "DOM", "DOM.Iterable", "WebWorker"],
      "jsx": "preserve",
      "jsxImportSource": "vue",
      "paths": { "@theme/*": ["../docs/.vitepress/theme/*"] },  // relative to tsconfig/, no baseUrl
      "tsBuildInfoFile": "../node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "types": ["vite/client", "vitepress/client"]
    },
    "include": [
      "../docs/.vitepress/**/*",
      "../docs/.vitepress/**/*.json",
      "../docs/.vitepress/**/*.vue"
    ],
    "exclude": ["../docs/.vitepress/cache", "../docs/.vitepress/dist", "../node_modules"]
  }
  ```
  - [X] ⚠️ `website` has both `@/*` → `src/*` and `@theme/*`. We have no `src/`, so keep only `@theme/*`.
  - [X] `"types": ["vitepress/client"]` is the VitePress-specific bit — do not drop it.
- [X] **`tsconfig/node.json`** — same as `website`, but our config file is `.mts`:
  ```jsonc
  {
    "extends": "./_base.json",
    "compilerOptions": {
      "composite": true,
      "tsBuildInfoFile": "../node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "types": ["node"]
    },
    "include": ["../docs/.vitepress/config.mts"]
  }
  ```
- [X] `bun add -d vue-tsc`; script **`"typecheck": "vue-tsc --build --force"`**.
      ⚠️ `--build`, not `--noEmit` — the reference repos use project references with `composite: true`,
      and `--noEmit` is incompatible with that.
- [X] Add `node_modules/.tmp/` build-info output to `.gitignore` if `node_modules/` does not already
      cover it (it does).

## ESLint — copy the reference config exactly

- [X] `bun add -d eslint @byloth/eslint-config-nuxt @eslint/compat`
- [X] **`eslint.config.mjs`** — byte-identical to both reference repos:
  ```js
  import path from "node:path";
  import { fileURLToPath } from "node:url";

  import eslintNuxt from "@byloth/eslint-config-nuxt";
  import { includeIgnoreFile } from "@eslint/compat";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const gitignorePath = path.resolve(__dirname, ".gitignore");

  export default [includeIgnoreFile(gitignorePath), ...eslintNuxt];
  ```
  - [X] Note the neat consequence: ignores come from `.gitignore`, so `downloads/`, `node_modules/` and
        both `.vitepress/{cache,dist}` are already excluded. **Add `research/archive/` to `.gitignore`?
        No** — it is tracked on purpose. Instead confirm ESLint does not try to parse those ~430 archived
        HTML files; add an explicit ignore for `research/archive/` in the flat config if it does.
- [X] Script `"lint": "eslint ."`.

## SASS

- [X] `bun add -d sass`
- [X] Required: Vite resolves the preprocessor lazily and throws *"Preprocessor dependency `sass` not
      found"* the moment any `lang="scss"` block compiles.
- [X] **Policy:** SCSS for nesting and mixins only. Colours, spacing and dark mode come from
      `var(--vp-*)` — SCSS variables cannot read CSS custom properties at build time, so hardcoding them
      would silently break the theme's light/dark switch.

## Husky

- [X] `bun add -d husky` and add script `"prepare": "husky"` (that is the whole setup in the reference
      repos — no `husky install`).
- [X] `.husky/pre-commit`, following `Byloth/website` but with our extra step:
  ```sh
  NODE_ENV="production" bun run lint
  bun run typecheck
  bun run docs:build
  ```
  - [X] The build is deliberately included **here and not in the reference repos**: VitePress fails on
        dead internal links, so this doubles as our link checker — and a documentation site whose
        cross-references rot is exactly the failure this project exists to fix.
  - [X] If the build proves too slow for a pre-commit hook, move it to a pre-push hook rather than
        dropping it.

## Editor config

- [X] Copy `.editorconfig` from `tuemplate` verbatim: 4-space indent, LF, UTF-8, final newline, trim
      trailing whitespace — with 2-space for `*.config.{js,mjs,ts,mts}`, `*.{json,yml}`, and
      `max_line_length = off` plus no trailing-whitespace trim for `*.{js,md,ts,vue}`.
- [X] ⚠️ It sets **4-space indentation**, which differs from what the scaffold's existing `config.mts`
      uses. Reformat `docs/.vitepress/config.mts` to match — except it is a `*.config.mts`, so it stays
      at 2. Check the existing file complies.

## Dependencies — verified by dry-run, not assumed

An earlier draft of this file overstated two of these. Corrected against `npm install --dry-run`:

- [X] **`vue`** — ✅ **safe to declare.** `vue@^3.5.41` overlaps VitePress's `^3.5.13`, and the dry-run
      reports **no changes at all**: it dedupes to the single existing copy. `Byloth/website` declares
      `vue: ^3.5.28` for exactly this reason. Optional, but harmless and it documents intent.
- [X] **`vite`** — ⚠️ **does not break the build, but do not add it.** A top-level `vite@^8` installs a
      whole rolldown/oxc toolchain *alongside* VitePress's nested vite 5; VitePress keeps using its own.
      It is unused weight here because we have no `vite.config.ts` — the VitePress config owns the Vite
      options. Add it only if a real need appears.
- [X] **`@vueuse/core` — pin to `^12`.** This warning stands and the dry-run confirms it: `^14` produces
      `add @vueuse/core 12.8.2` (nested for vitepress) *and* `change → 14.4.0` (top level) — **two copies
      in the tree**. `bun add -d @vueuse/core@^12`. Revisit when VitePress 2.x leaves alpha (currently
      `2.0.0-alpha.19`).
- [X] Needed for: `useStorage` (the reader profile), `useEventListener`, `useMediaQuery`.

## Not adopted — with the reason, so this is not relitigated

- [X] Record in this file: **`pinia`**, **`vue-router`** (VitePress has its own router; a
      `useStorage`-backed composable is the right state layer and survives SSR) · **`bootstrap`**
      (contradicts staying compliant with the default theme; would fight the `--vp-c-*` tokens and dark
      mode) · **`axios`** (no backend, no runtime HTTP — all data is build-time) · **`three`** ·
      **`@byloth/micro-ecs`** · **`@byloth/exceptions`**, **`@byloth/vuert`** (no error surface, no modal
      layer; VitePress custom blocks cover the messaging) · **`@fortawesome/fontawesome-free`** (the theme
      already masks any `.vp-icon` with `background-color: currentColor`, so inline SVG matches natively
      and costs nothing).
- [ ] **`@byloth/core`** — optional, only if a concrete need appears. ⚠️ Its `exports` map points `types`
      at `./src/index.ts`, so the consumer compiles its TypeScript straight from `node_modules`; that can
      trip `vue-tsc` under `moduleResolution: Bundler`. Verify with a throwaway import first.

## Scripts to end up with

- [X] `docs:dev`, `docs:build`, `docs:preview` (existing) · `typecheck` · `lint` · `prepare`.
- [X] ⚠️ The reference repos name them `dev`/`build`/`preview` because VitePress is the whole project
      there. Ours keeps the `docs:` prefix, since `docs/` is one part of a repo that also holds
      `research/`, `downloads/` and `tools/`.

## What actually happened — deviations worth knowing

- [X] **`bun`, not `npm`** — matches the reference repos. `bun.lock` is committed; `package-lock.json`
      removed.
- [X] **`baseUrl` removed from `_base.json`.** TS 6 raises `TS5101` on it. `tuemplate` had already
      dropped it; `website` still carries it because it is on TS 5.9. Consequence: `paths` entries are
      resolved **relative to the tsconfig file**, so `@theme/*` is `../docs/.vitepress/theme/*`.
- [X] **`composite: true` + `noEmit: true` works.** The feared `TS6304` never appeared under TS 6 /
      vue-tsc 3.
- [X] **ESLint had to be told to ignore `research/archive/`.** `includeIgnoreFile` derives ignores from
      `.gitignore`, and that directory is tracked on purpose — so it was being linted: 4 archived forum
      JSON dumps produced ~12,000 of the 12,181 initial errors. Added an explicit `{ ignores: [...] }`
      entry to the flat config rather than polluting `.gitignore`.
- [X] **`@parcel/watcher` postinstall stays blocked.** bun blocks it by default; it is an *optional*
      dependency of `sass` (for sass's own watch mode, which we do not use — Vite watches). Build and
      typecheck both pass without it, so it is left untrusted rather than compiled from source.
- [ ] ⚠️ **`.editorconfig` and ESLint disagree on `docs/.vitepress/config.mts`.** The editorconfig rule
      `[*.config.{js,mjs,ts,mts}]` asks for 2-space indentation, but `@stylistic/indent` enforces 4 and
      that file matches the glob. ESLint won (it is in the pre-commit hook) and the file is now 4-space.
      The same conflict exists in `Byloth/website`. **Decide which one should give way** — this is the one
      open item in this file.

## Done when

- [X] `bun run lint`, `bun run typecheck` and `bun run docs:build` all pass on the current scaffold.
- [X] The husky hook fires on a test commit and blocks a deliberately broken one.
- [X] `bun pm ls` shows a single `@vueuse/core@12.8.2` and a single `vue@3.5.41`.
- [X] `tsconfig/app.json` actually type-checks a `.vue` file placed in `docs/.vitepress/theme/`.
