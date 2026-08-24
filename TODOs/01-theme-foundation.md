# 01 · Theme foundation

Create the theme layer every component will sit on, and write down the styling contract so custom
components look native instead of bolted on.

Everything below was established by reading the installed theme source at
`node_modules/vitepress/dist/client/theme-default/`. Values are real, not guessed.

---

## Theme entry point

- [X] Create `docs/.vitepress/theme/index.ts`:
  ```ts
  import DefaultTheme from 'vitepress/theme'
  import type { Theme } from 'vitepress'
  import "./style.css"   // named style.css, matching Byloth/website's house pattern

  export default {
    extends: DefaultTheme,
    enhanceApp({ app }) { /* register global components here */ }
  } satisfies Theme
  ```
  - [X] ⚠️ `extends` shallow-merges the child over the base, **except `enhanceApp`, which is chained**
        (base first, then ours). Defining `Layout` would *replace* the default one entirely — so if a
        layout wrapper is ever needed, wrap `DefaultTheme.Layout` with `h()` and pass slots, never
        reimplement it.
- [X] Register components globally in `enhanceApp` only when used on 3+ pages; otherwise import per page
      inside the `.md` via a `<script lang="ts" setup>` block.

## Brand tokens

- [X] Create `docs/.vitepress/theme/style.css` — plain CSS, named as in `Byloth/website` (SCSS would add
      nothing to a file of custom-property declarations) — and map the existing `#8c1007` (already set as
      `theme-color` in `config.mts`) onto the brand scale.
  - [X] The theme's own convention: `-1` solid text colour, `-2` hover, `-3` solid background
        (must stay contrast-safe against white text), `-soft` deliberately semi-transparent so softs
        can stack.
  - [X] Override `--vp-c-brand-1/2/3/soft` for light, and again under `.dark` — the dark variants must be
        *lighter*, not darker (compare the theme's indigo: `#3451b2` light vs `#a8b1ff` dark).
  - [X] Check contrast for both schemes before committing. `#8c1007` is dark; its dark-mode counterpart
        needs to be a desaturated light red, not the same value.

## The styling contract — record this in the file, it is the thing that keeps components native

- [X] **Consume tokens, never hardcode.** `--vp-c-bg`, `--vp-c-bg-soft`, `--vp-c-bg-alt`, `--vp-c-bg-elv`,
      `--vp-c-text-1/2/3`, `--vp-c-divider`, `--vp-c-border`, `--vp-c-gutter`, plus the semantic scales
      `--vp-c-{tip,note,success,important,warning,danger,caution}-{1,2,3,soft}`.
      ⚠️ There is **no** `--vp-c-info-*` scale — "info" blocks use `--vp-c-default-soft`.
- [X] **There are no radius or transition tokens.** Match the theme's literals instead:
      `4px` small · `6px` icon tiles · `8px` custom blocks and code blocks · `12px` cards and badges ·
      `20px`/`24px` pill buttons; and
      `transition: color .25s, border-color .25s, background-color .25s` (`.1s` on `:active`).
- [X] **Callouts:** emit the theme's own markup rather than restyling —
      `<div class="custom-block warning"><p class="custom-block-title">TITLE</p>…</div>`.
      Modifiers available: `info note tip important warning danger caution details`.
- [X] **Cards:** copy the `VPFeature` pattern —
      `border: 1px solid var(--vp-c-bg-soft); border-radius: 12px; background: var(--vp-c-bg-soft)`,
      hover `border-color: var(--vp-c-brand-1)`.
- [X] **Globally available without import:** only `Badge`, `Content`, `ClientOnly`.
      `VPButton` (`theme: brand|alt|sponsor`, `size: medium|big`, `text`, `href`) and `VPBadge` are
      importable from `vitepress/theme` — reuse them instead of writing new buttons.
- [X] **Dark mode** is a `.dark` class on `<html>`. Best practice: define no `.dark` rule at all and only
      consume `--vp-c-*`, which already flips. When a rule genuinely must target it from inside a scoped
      block, use `:global(.dark) .thing` — a plain `.dark .thing` will **not** match, because the scoping
      attribute is added to `.dark` as well.
- [X] **Content is inside `.vp-doc`.** Markup a component renders from within a `.md` page inherits the
      theme's `h2` borders, paragraph margins and link colours. Keep component markup in its own scoped
      styles and do not rely on that inheritance.
- [X] **Icons:** the theme masks any `.vp-icon` / `.vpi-*` element —
      `-webkit-mask: var(--icon) no-repeat; mask-size: 100% 100%; background-color: currentColor`.
      Custom icons follow the same pattern so they inherit colour for free.

## SSR — the rule that will otherwise cause hydration bugs

- [X] VitePress server-renders every page at build time. **Anything touching `localStorage`, `window` or
      `document` must be inside `<ClientOnly>` or `onMounted`.**
- [X] A component that reads the reader profile must render its **neutral, show-everything** state on the
      server. This is the same requirement as progressive enhancement (see `03-components.md`), and it is
      not optional: the pages are safety-critical.

## Conventions to record in CLAUDE.md

- [X] Add an SFC-conventions section to `CLAUDE.md` so future sessions comply:
  - [X] `<script lang="ts" setup>` — `lang` **before** `setup`.
  - [X] `<style lang="scss" scoped>` — always both.
  - [X] `:global(.dark)` when a dark rule must escape scoping.
  - [X] SCSS for nesting/mixins only; colours from `var(--vp-*)`.
- [X] Add the theme-token contract summary and the SSR rule too — a future session must not have to
      re-read `node_modules` to know them.

## What actually happened

- [X] **Brand scale derived and contrast-checked**, not eyeballed. `#8c1007` reads 9.58:1 on white but
      only **1.79:1** on the dark background, so the dark variants are lighter — mirroring how the stock
      theme takes indigo from `#3451b2` to `#a8b1ff`. Final scale, every pair measured:

      |      | light     | ratio               | dark      | ratio               |
      |------|-----------|---------------------|-----------|---------------------|
      | `-1` | `#8c1007` | 9.58:1 on white     | `#ff9b8d` | 8.44:1 on `#1b1b1f` |
      | `-2` | `#a01208` | 8.12:1 white on it  | `#d4291a` | 5.08:1 white on it  |
      | `-3` | `#b3150a` | 6.93:1 white on it  | `#a3150a` | 7.87:1 white on it  |
      | soft | `rgba(140,16,7,.14)` | `-1` over it 7.37:1 | `rgba(140,16,7,.16)` | `-1` over it 8.15:1 |

      All clear WCAG AA; most clear AAA. For comparison the stock theme's `-3` manages 4.48:1.
- [X] **No `Layout` override.** `Byloth/website` defines one, but only because it injects a hero
      component. Defining `Layout` *replaces* the default entirely, so ours stays absent until a slot is
      genuinely needed.
- [X] **One bug deliberately not copied** from the reference: its
      `--vp-c-brand-soft: rgb(223, 48, 32, 0.14)` is malformed (`rgb()` with four arguments) and its RGB
      values are left over from a previous brand that no longer matches its blue. Ours uses correct
      `rgba()` derived from our own colour.
- [X] **Cascade order verified in the built CSS**, not assumed: the default
      `--vp-c-brand-1: var(--vp-c-indigo-1)` sits at byte 6810 and our `#8c1007` at 108460, so ours wins.
      The last declaration resolving in the file is the dark `#ff9b8d`.
- [X] **`@theme/*` alias proven** by type-checking a throwaway file that imports through it.

## Done when

- [X] `docs/.vitepress/theme/index.ts` exists, the build still passes, and the brand colour visibly
      changes in both light and dark.
- [X] `CLAUDE.md` documents the conventions.
