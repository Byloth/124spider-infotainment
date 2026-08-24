# 03 · Components

All under `docs/.vitepress/theme/components/`.

**Mandatory SFC form — every file, no exceptions:**

```vue
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
```

`lang` before `setup`. Styles always `scss` **and** `scoped`. When a dark-mode rule must escape scoping,
use `:global(.dark)`.

---

## The rule that governs all of them

> **Progressive enhancement is not optional here.** This is safety-critical documentation. With
> JavaScript disabled, or before hydration, **every page must still show every route and every market.**
> Components *filter, highlight and reorder* — they never gate. No content may exist only inside a
> component.

Consequence: the static Markdown carries the full information; the component sits on top of it or renders
a filtered *view* of data that is also rendered statically. Anything touching `localStorage`/`window` goes
inside `<ClientOnly>` or `onMounted`, and the server-rendered state is the neutral, show-everything one.

---

## 1. The shared state

- [X] **`useProfile.ts`** (composable, not a component) — the only shared state in the site.
  - [X] Backed by `useStorage` from `@vueuse/core` (pinned `^12`, see `00-toolchain.md`).
  - [X] Shape: `{ market: Market | null, display: '7"' | '3"' | null, version: string | null,
        id7: 'yes' | 'no' | 'unknown', hubFitted: boolean | null }`.
  - [X] Derived: `route` — computed from version + id7, matching the four routes in
        `research/PROCEDURE-DRAFT.md` §0.
  - [X] Must be safe to call during SSR (returns the empty profile).
  - [X] Expose a `reset()`; the reader must be able to clear what the site remembers about them.

## Write these three test-first

See `03b-testing.md`. The runner is already in place, and these are the pieces where a silent bug does
real damage: the **version-string parser**, the **route derivation** `(version, id7) → Route`, and
**`HashVerifier`'s chunked digest**.

## 2. Components

Each entry: what it does · where it is used · what it must do without JS.

- [X] **`RouteWizard`** — `/guide/route`. Five questions (market, display, version, ID7, hub) → a named
      route, the exact file list, the warnings that apply, deep links into the procedure. Writes the
      profile. Offers a printable/copyable summary.
      *No JS:* the page still renders the full static route table.
- [X] **`VersionDecoder`** — `/guide/eligibility`, `/firmware/regions`. Paste `70.00.100A EU N` → decoded
      version / revision / region / nav protocol, the matching matrix row, and the applicable route.
      Pure parser + lookup; writes the version to the profile.
      *No JS:* the anatomy of the string is explained statically.
- [X] **`RouteBranch`** — all `/procedure/*`. Wraps a Markdown slot and shows it when the reader's route
      matches. **With no profile, or no JS, it renders expanded with its route named in a heading.**
      Props: `routes: Route[]`, `title`.
- [X] **`MarketSelect`** — small profile editor, mountable on any page needing market context.
- [X] **`FirmwareMatrix`** — `/firmware/`. Filter by market, free-text search, highlight the profile's
      version, surface the confidence markers.
      *No JS:* the full matrix is a static Markdown table underneath.
- [X] **`HashVerifier`** — `/firmware/obtaining`. **The most valuable interactive piece.**
  - [X] Drag or pick a file → SHA-256 via `crypto.subtle.digest` → matched against `files.ts`.
  - [X] ⚠️ Must hash in **chunks** (`File.stream()` / incremental read): the firmware images are
        0.9–2.4 GB and reading them into one `ArrayBuffer` will fail or exhaust memory.
  - [X] Show progress; the whole point is that a 2.3 GB file takes a while.
  - [X] State prominently in the UI that **nothing is uploaded** — it runs entirely in the browser.
  - [X] Handle "hash not known to us" as a distinct, non-alarming outcome.
- [X] **`DownloadSources`** — `/firmware/obtaining`. Per-region source list from `links.ts`, each
      with status and last-checked date, ranked (first-party first).
- [X] **`HashTable`** — `/reference/inventory`. Filter by region/kind/status; copy-to-clipboard on hashes.
- [X] **`PartFinder`** — `/hardware/part-numbers`, `/procedure/hardware`. Market → hub, cable set, kit
      number, price range.
      *No JS:* all markets shown as a static table.
- [X] **`StepChecklist`** — `/procedure/{prepare,hardware,verify}`. Persisted per checklist `id`. Shows
      completion count. Must degrade to plain `- [ ]` Markdown list without JS.
      This is a real safety feature: it is used in the car, mid-procedure, across page reloads.
- [X] **`FlashTimer`** — `/procedure/flash`. The 20-minute pedal reminder (ACC times out at 25 min and a
      mid-flash power loss is the classic brick). Audible + visible. Must work offline.
      Keep it honest: it is an aid, not a guarantee — say so in the component.
- [X] **`SymptomTree`** — `/recovery/`. Guided narrowing over `failures.ts`.
      *No JS:* the full 19-row catalogue is rendered statically on the same page.
- [X] **`DowngradeMatrix`** — `/recovery/downgrade`. From/to grid with the two version walls
      (`<59.00.502` and `<74.00.310` reachable only via SPI-NOR).
- [X] **`LinkStatus`** — site-wide, and the backbone of `/security/link-safety`. Renders an external link
      together with its status from `links.ts`; a `hijacked` or `dead` link is visually unmistakable
      and carries the replacement.
- [X] **`SourceTable`** — `/reference/sources`. Filter 200 rows by category, link status, trust level.
- [X] **`GlossaryTip`** — site-wide. Definition on hover **and focus** (keyboard accessible), sourced from
      `glossary.ts`. Falls back to a plain link to `/reference/glossary`.

## Accessibility — applies to all of the above

- [X] Keyboard reachable; visible focus states (do not remove the theme's outlines).
- [X] Never convey state by colour alone — the confidence and link-status markers need text or an icon
      too.
- [X] Respect `prefers-reduced-motion` (the theme already zeroes transition durations under it).
- [X] Filter controls are real `<label>` + `<input>`/`<select>` pairs, not divs.

## What actually happened

- [X] **`ClientOnly` has no fallback slot.** VitePress's implementation is four lines and returns `null`
      before mount — my `<template #fallback>` was silently ignored, so `RouteWizard` rendered *nothing*
      server-side. That is exactly the failure the progressive-enhancement rule exists to prevent, and it
      was caught only by grepping the emitted HTML rather than trusting the dev server. The no-JavaScript
      message is now rendered outside `ClientOnly`, gated on `ready`.
- [X] **WebCrypto cannot hash incrementally.** `crypto.subtle.digest()` is one-shot, with no
      `update()`/`finalize()` anywhere, so a 2.4 GB file cannot be hashed through it. `logic/sha256.ts` is
      an incremental implementation in TypeScript, checked against `crypto.subtle` on every awkward chunk
      boundary — and against a **real 2.3 GB firmware image**, which it hashed correctly in 164 s
      (~14 MB/s). That measurement is in the component's own wording: readers are told to expect roughly
      three minutes, not "a moment".
- [X] **`Checklist` had to become `StepChecklist`** — `vue/multi-word-component-names` rejects
      single-word names.
- [X] **The route derivation is deliberately conservative twice over**: an unknown ID7 state counts as
      absent, and a *claimed* ID7 is ignored from 70.00.335 upwards because `neutralizeid7` deleted it.
      Both cost the reader a longer route; the opposite errors cost them their branding and navigation.
- [X] A guard test asserts **every** firmware entry resolves to a route, so adding a version to the data
      without teaching `routeFor` about it fails the build. It immediately caught `55.00.7xx`, whose
      wildcard does not sort numerically.
- [X] **16 components + 1 composable.** A development gallery lives at `docs/dev/components.md`, unlisted
      in the navigation — without it there was no way to see any of this render before the real pages
      exist.

## Done when

- [X] Every component renders correctly server-side (`bun run docs:build` produces the neutral state in
      the emitted HTML — check the `dist/` output, not just the dev server).
- [X] Every page carrying a component was loaded with JS disabled and still showed all content.
- [X] No component defines a colour outside `var(--vp-*)`.
- [X] `grep -L 'script lang="ts" setup' docs/.vitepress/theme/components/*.vue` returns nothing.
