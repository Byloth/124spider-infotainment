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

- [ ] **`useProfile.ts`** (composable, not a component) — the only shared state in the site.
  - [ ] Backed by `useStorage` from `@vueuse/core` (pinned `^12`, see `00-toolchain.md`).
  - [ ] Shape: `{ market: Market | null, display: '7"' | '3"' | null, version: string | null,
        id7: 'yes' | 'no' | 'unknown', hubFitted: boolean | null }`.
  - [ ] Derived: `route` — computed from version + id7, matching the four routes in
        `research/PROCEDURE-DRAFT.md` §0.
  - [ ] Must be safe to call during SSR (returns the empty profile).
  - [ ] Expose a `reset()`; the reader must be able to clear what the site remembers about them.

## 2. Components

Each entry: what it does · where it is used · what it must do without JS.

- [ ] **`RouteWizard`** — `/guide/route`. Five questions (market, display, version, ID7, hub) → a named
      route, the exact file list, the warnings that apply, deep links into the procedure. Writes the
      profile. Offers a printable/copyable summary.
      *No JS:* the page still renders the full static route table.
- [ ] **`VersionDecoder`** — `/guide/eligibility`, `/firmware/regions`. Paste `70.00.100A EU N` → decoded
      version / revision / region / nav protocol, the matching matrix row, and the applicable route.
      Pure parser + lookup; writes the version to the profile.
      *No JS:* the anatomy of the string is explained statically.
- [ ] **`RouteBranch`** — all `/procedure/*`. Wraps a Markdown slot and shows it when the reader's route
      matches. **With no profile, or no JS, it renders expanded with its route named in a heading.**
      Props: `routes: Route[]`, `title`.
- [ ] **`MarketSelect`** — small profile editor, mountable on any page needing market context.
- [ ] **`FirmwareMatrix`** — `/firmware/`. Filter by market, free-text search, highlight the profile's
      version, surface the confidence markers.
      *No JS:* the full matrix is a static Markdown table underneath.
- [ ] **`HashVerifier`** — `/firmware/obtaining`. **The most valuable interactive piece.**
  - [ ] Drag or pick a file → SHA-256 via `crypto.subtle.digest` → matched against `files.data.ts`.
  - [ ] ⚠️ Must hash in **chunks** (`File.stream()` / incremental read): the firmware images are
        0.9–2.4 GB and reading them into one `ArrayBuffer` will fail or exhaust memory.
  - [ ] Show progress; the whole point is that a 2.3 GB file takes a while.
  - [ ] State prominently in the UI that **nothing is uploaded** — it runs entirely in the browser.
  - [ ] Handle "hash not known to us" as a distinct, non-alarming outcome.
- [ ] **`DownloadSources`** — `/firmware/obtaining`. Per-region source list from `links.data.ts`, each
      with status and last-checked date, ranked (first-party first).
- [ ] **`HashTable`** — `/reference/inventory`. Filter by region/kind/status; copy-to-clipboard on hashes.
- [ ] **`PartFinder`** — `/hardware/part-numbers`, `/procedure/hardware`. Market → hub, cable set, kit
      number, price range.
      *No JS:* all markets shown as a static table.
- [ ] **`Checklist`** — `/procedure/{prepare,hardware,verify}`. Persisted per checklist `id`. Shows
      completion count. Must degrade to plain `- [ ]` Markdown list without JS.
      This is a real safety feature: it is used in the car, mid-procedure, across page reloads.
- [ ] **`FlashTimer`** — `/procedure/flash`. The 20-minute pedal reminder (ACC times out at 25 min and a
      mid-flash power loss is the classic brick). Audible + visible. Must work offline.
      Keep it honest: it is an aid, not a guarantee — say so in the component.
- [ ] **`SymptomTree`** — `/recovery/`. Guided narrowing over `failures.data.ts`.
      *No JS:* the full 19-row catalogue is rendered statically on the same page.
- [ ] **`DowngradeMatrix`** — `/recovery/downgrade`. From/to grid with the two version walls
      (`<59.00.502` and `<74.00.310` reachable only via SPI-NOR).
- [ ] **`LinkStatus`** — site-wide, and the backbone of `/security/link-safety`. Renders an external link
      together with its status from `links.data.ts`; a `hijacked` or `dead` link is visually unmistakable
      and carries the replacement.
- [ ] **`SourceTable`** — `/reference/sources`. Filter 198 rows by category, link status, trust level.
- [ ] **`GlossaryTip`** — site-wide. Definition on hover **and focus** (keyboard accessible), sourced from
      `glossary.data.ts`. Falls back to a plain link to `/reference/glossary`.

## Accessibility — applies to all of the above

- [ ] Keyboard reachable; visible focus states (do not remove the theme's outlines).
- [ ] Never convey state by colour alone — the confidence and link-status markers need text or an icon
      too.
- [ ] Respect `prefers-reduced-motion` (the theme already zeroes transition durations under it).
- [ ] Filter controls are real `<label>` + `<input>`/`<select>` pairs, not divs.

## Done when

- [ ] Every component renders correctly server-side (`npm run docs:build` produces the neutral state in
      the emitted HTML — check the `dist/` output, not just the dev server).
- [ ] Every page carrying a component was loaded with JS disabled and still showed all content.
- [ ] No component defines a colour outside `var(--vp-*)`.
- [ ] `grep -L 'script lang="ts" setup' docs/.vitepress/theme/components/*.vue` returns nothing.
