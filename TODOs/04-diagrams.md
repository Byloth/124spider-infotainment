# 04 · Diagrams

Original SVGs only. No third-party images are republished — the archive holds Mazda TSB pages, workshop
manual scans and forum photos, all under someone else's copyright.

**Status: done.** Eight diagrams in `docs/.vitepress/theme/components/diagrams/`, all mounted in
`docs/dev/components.md`, all rendering server-side. Two corrections were made to this backlog while
executing it; both are recorded below rather than quietly edited away.

---

## Correction 1 — they could not be files in `docs/public/`

This file originally asked for the SVGs to be committed under `docs/public/diagrams/` **and** to be
styled with `var(--vp-c-*)` so they flip with dark mode for free. Those two cannot both be true: an SVG
referenced through `<img src>` is an isolated document and cannot see the page's CSS custom properties,
so a file in `public/` would need one hand-maintained copy per colour scheme.

So every diagram is **inline SVG inside a `.vue` component**. That also gives them scoped styles and, for
three of them, the data.

## Correction 2 — three of them are generated, not drawn

A hand-drawn version timeline falls behind the moment a firmware version is added to `firmware.ts` —
exactly the drift this project exists to prevent, and avoidable because the geometry is computable.

- `VersionTimeline` — one marker per entry in `FIRMWARE`; walls and target read off the flags; the
  `<desc>` names the first and last version from the data rather than from memory.
- `DowngradeWalls` — bands are a partition of `FIRMWARE` at the entries flagged `downgradeFloor`, computed
  in `logic/bands.ts`. The canvas width grows with the band count, so a third floor could not draw itself
  off the edge.
- `RouteComparison` — the three routes against what each leaves installed.

`downgradeFloor` was added to `firmware.ts` for this. Two of the four points of no return are version
floors; the other two close tweak access without moving the floor, so it is its own flag rather than
something inferred from the numbering.

---

## Requirements for every diagram

- [X] Hand-authored inline SVG in a component (see correction 1).
- [X] `var(--vp-c-*)` tokens only — verified: no hex, `rgb()`, `hsl()`, `<image>` or `<foreignObject>`
      anywhere in the eight components, and every token used is one VitePress itself defines in both
      colour schemes.
- [X] Text stays real `<text>` — selectable, translatable, searchable; never outlined paths.
- [X] `role="img"` with `<title>` and `<desc>`, **plus a full prose equivalent inside the component
      itself** rather than left to the page. These carry safety information and cannot depend on the
      page author remembering.
- [~] Readable at 375 px. Honestly: the four 900-unit-wide diagrams are comfortable on a desktop column
      and need panning on a phone. `.diagram` is therefore a horizontal scroll container with a 600 px
      floor (`theme/style.css`), the way VitePress already treats wide tables, and the prose equivalent
      is the reading path on a narrow screen. Smallest label is now 10 px, up from 9.

## The set

- [X] **Version timeline with the points of no return** — `VersionTimeline.vue`.
      Positions by rank rather than by value: the 70.00.1xx builds would otherwise collapse into a
      smudge. The axis is a sequence, not a measurement. Labels stagger on two rows.
  - [ ] The original ask also wanted it to separate "confirmed" from the 2025 mp3-method nuance. It does
        not — that nuance is carried by `RouteComparison`, which states the confidence per route. Decide
        when writing `/firmware/points-of-no-return` whether the timeline needs it too, or whether
        putting the two diagrams on the same page is enough.
- [X] **Two-file flash sequence** — `FlashSequence.vue`. The danger window between the two files, with
      the pedal rule spanning it.
- [X] **Downgrade walls** — `DowngradeWalls.vue`. Free movement inside a band, upward crossings fine,
      downward crossings marked "no USB path".
- [X] **SPI-NOR layout and boot-select** — `NorLayout.vue`. The partition map with `0x010000` called out,
      and what it costs to own the programmer.
- [X] **ID7 mechanism** — `Id7Mechanism.vue`. The project's own finding drawn: a genuine signed
      diagnostic package plus one `CMD_LINE` line, executed *because* the signature is valid.
- [X] **Route comparison** — `RouteComparison.vue`. The inversion made unavoidable: the route everyone
      calls a fallback is the one that leaves nothing behind.
- [X] **Hub and cable schematic** — `HubWiring.vue`. One cable becomes two; the phone-marked port; the
      blue GPS plug; firmware-before-hardware stated on the picture.
- [X] **Trim removal order** — `TrimOrder.vue`. Fourteen steps grouped by area, numbers derived from the
      order so inserting a step cannot leave the numbering behind. Drawn from the written step list, not
      traced from the workshop-manual scans.

## Tests

- [X] `tests/bands.test.ts` (6) — the partition: one more band than floors, every version placed exactly
      once, no empty band, ordering preserved, each floor opening its own band.
- [X] `tests/diagrams.test.ts` (10) — rendered through `@vue/server-renderer`, which needs no DOM, so
      `@vue/test-utils` and `happy-dom` (56 packages) stay out of the tree. Properties only: one marker
      per firmware entry, every version named, walls in order, both floors named, band count following
      the floor count, and `<title>`/`<desc>`/`<figcaption>` present on all three.
- [X] `@vitejs/plugin-vue@5.2.4` added so Vitest can import `.vue` — the exact version VitePress already
      pulls in, so `bun pm ls` shows the same 467 packages and a single `vite@5.4.21`.
- [X] Provably fails when broken: dropping a `downgradeFloor` flag from the data failed
      `DowngradeWalls > names both floors` by name.

**91 tests in total, up from 75.**

## Refactors this pulled in

- [X] `versionOrdinal` moved into `logic/version.ts`. It existed twice — in `logic/route.ts` and again
      inside `VersionTimeline` — with different failure behaviour (`NaN` vs `0`). One copy now, returning
      `NaN`, which is the safe one: every comparison against `NaN` is false, so an unplaceable version
      never satisfies a threshold test by accident.
- [X] `logic/bands.ts` extracted from `DowngradeWalls`, so the partition can be tested without rendering.
- [X] `.diagram` scroll container in `theme/style.css`, with the figcaption pinned so the prose stays in
      view while panning.

## Done when

- [X] Every diagram renders in light and dark without a second asset — all tokens are VitePress's own,
      defined in both schemes.
- [X] Each carries its text equivalent (in the component, not the page).
- [X] Weight is sane: largest rendered SVG is 6.9 KB, largest component 8.5 KB. The ~30 KB line is not
      close.
- [X] `bun run lint`, `bun run typecheck`, `bun run test`, `bun run docs:build` all clean.
- [X] Verified in the **built** HTML: eight SVGs, eight `<title>`, eight `<figcaption>`, no hex colours.
      This is also where a real bug was caught — adjacent `<tspan>` lines concatenate in SVG, so
      "Command injection into Mazda's" + "own signed…" read as "Mazda'sown" to a screen reader and to the
      clipboard. Fixed with trailing spaces; the visual output never showed it.
