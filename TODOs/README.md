# TODO index

The backlog for turning the research into the documentation site. Work the files in numeric order —
the numbering *is* the dependency order.

## Checkbox convention

| Mark | Meaning |
| --- | --- |
| `- [ ]` | not started |
| `- [X]` | done |
| `- [~]` | this task's children are partially done |

A parent task becomes `[~]` as soon as one child is `[X]` and at least one is still `[ ]`, and `[X]` only
when every child is `[X]`.

## The files

| # | File | Tasks | State | What it covers |
| --- | --- | ---: | :---: | --- |
| 00 | [Toolchain](00-toolchain.md) | 42 | `[~]` | TypeScript, ESLint + `@byloth/eslint-config-nuxt`, SASS, Husky, `@vueuse/core` pinning — and the rejected dependencies, with reasons |
| 01 | [Theme foundation](01-theme-foundation.md) | 30 | `[X]` | `theme/index.ts`, brand tokens, the styling contract, the SSR rule, conventions into `CLAUDE.md` |
| 02 | [Data layer](02-data-layer.md) | 27 | `[~]` | Seven typed data modules — firmware, files, parts, sources, failures, links, glossary |
| 03 | [Components](03-components.md) | 41 | `[X]` | `useProfile()` plus 18 components, each with its contract and its no-JS obligation (`SourceCite` and `LinkTable` were added later, in 05) |
| 03b | [Testing](03b-testing.md) | 35 | `[X]` | Vitest 3, data invariants and the two resolver functions — plus the three logic pieces to write test-first in 03 |
| 04 | [Diagrams](04-diagrams.md) | 35 | `[~]` | Eight original SVGs — inline in components, three generated from the data, each with a text equivalent |
| 05 | [Pages · Security](05-pages-security.md) | 38 | `[X]` | The original findings and the live hijacked domain — **written first**, and the house style for every page after |
| 06 | [Pages · Firmware](06-pages-firmware.md) | 31 | `[ ]` | Matrix, regions, points of no return, obtaining and verifying |
| 07 | [Pages · Start here](07-pages-guide.md) | 30 | `[ ]` | Overview, eligibility, what changes, risks, the route wizard |
| 08 | [Pages · Procedure](08-pages-procedure.md) | 45 | `[ ]` | Route selector and the five steps — the operational core |
| 09 | [Pages · Hardware](09-pages-hardware.md) | 22 | `[ ]` | The kit, part numbers per market, genuine vs clone |
| 10 | [Pages · Recovery](10-pages-recovery.md) | 33 | `[ ]` | Troubleshooting, downgrading, un-bricking |
| 11 | [Pages · Reference](11-pages-reference.md) | 31 | `[ ]` | Sources, inventory, open questions, glossary, changelog |
| 12 | [Verification](12-verification.md) | 28 | `[ ]` | Build, typecheck, lint, no-JS, dark mode, responsive, hash verifier |
| 99 | [Deferred](99-deferred.md) | 26 | `[ ]` | Deploy, i18n, binary hosting, the maintainer's own car |

**494 tasks.** Update this table's state column as files progress.

## Why this order

**00–01 first** so the first component written is already linted, typed and styled to the contract, rather
than retrofitted later. The toolchain follows Matteo's own repositories rather than inventing a house
style for this repo alone: `Byloth/tuemplate` (the newest template) and `Byloth/website` (a VitePress
1.6.4 project, so the closest existing model — its `tsconfig/` split is copied almost verbatim).

**03b before 03** so the three pieces of real logic in the components — the version parser, the route
derivation and the chunked digest — get written test-first. Adding the runner later would mean
retrofitting tests onto code whose bugs would be silent and, in the route case, dangerous.

**02–04 next** because they are the shared substrate: pages consume the data modules and mount the
components, so building a page before them means writing it twice.

**05 before everything else in the pages** because `/security/` is the only part of this site that exists
nowhere else — it comes from reading the tweak packages line by line — and because it carries a hazard
that is live right now: the canonical community guide still points firmware-59 owners at a domain that
today serves a scam site.

**06 next** because the firmware reference is what every other page links into.

**07–11** follow the reader's own path, then the reference material that indexes it all.

**12 continuously**, not just at the end. Run the automated checks per section.

## Current state of the repository

- **Research: complete.** Five consolidated documents in `research/` — 22-version firmware matrix,
  198-source registry, 174-row inventory, reconstructed procedure, 19-entry failure catalogue — plus
  ~430 archived pages and seven per-theme raw reports.
- **Binaries: collected and verified.** ~11 GB in the git-ignored `downloads/`, all 28 files hashed in
  `downloads/CHECKSUMS.sha256`. EU, ADR and NA 70.00.100A all present and matching community MD5s.
  20 files scanned clean by VirusTotal; 7 exceed every scanner's size limit and never can be.
- **Site: the first two pages are written** (file 05). `/security/` and `/security/link-safety` are
  finished prose — the section that exists nowhere else, plus the live hijacked-domain warning. The other
  27 pages are still stubs. Two more pages remain to create: `guide/route` and `reference/changelog`.
- **Components: done** (file 03, plus two from 05). `useProfile()` plus 18 components in `docs/.vitepress/theme/components/`,
  and three pure-logic modules in `docs/.vitepress/logic/` — the version parser, the route derivation and
  an incremental SHA-256 (WebCrypto cannot hash a 2.4 GB file). A development gallery at
  `docs/dev/components.md`, unlisted in the navigation, renders every one of them.
- **Testing: set up** (file 03b). Vitest 3 (not 4 — 4 needs vite ≥6 and VitePress pins 5), 37 tests
  covering data invariants and the two resolver functions, type-checked via a third tsconfig project.
  Now **105 tests**: the three logic pieces in task 03 were written test-first, task 04 added the band
  partition and the three data-driven diagrams, and task 05 added `SourceCite` and `LinkTable` — the
  latter carrying the rule that nothing on a hostile *host* may ever be rendered as a clickable link.
  All of it renders through `@vue/server-renderer`, which needs no DOM, so `@vue/test-utils` and
  `happy-dom` stay out of the tree.
- **Diagrams: done** (file 04). Eight in `docs/.vitepress/theme/components/diagrams/`, inline in
  components rather than files in `docs/public/` — an SVG in an `<img src>` cannot read the page's
  `var(--vp-c-*)` tokens, so a file would need one copy per colour scheme. Three are generated from
  `firmware.ts` so the picture cannot drift from the data; the partition behind the downgrade bands lives
  in `logic/bands.ts` and is tested on its own. Every one carries a `<title>`, a `<desc>` and a full prose
  equivalent, because they hold safety information and cannot rely on a single channel.
- **Data layer: done** (file 02). Seven typed modules in `docs/.vitepress/data/` — 21 firmware versions,
  28 artifacts with hashes generated from the files themselves, 200 sources, 19 failure modes, the
  external-link health register, the parts catalogue and the glossary. `bun run verify:data` re-checks
  hashes and citation coverage. One item deferred: measuring the client-bundle cost, which needs the
  components to exist first.
- **Theme foundation: done** (file 01). `docs/.vitepress/theme/index.ts` extends the default theme and
  `style.css` carries a contrast-checked brand scale derived from `#8c1007` (dark variants are *lighter*,
  since the base reads 1.79:1 on the dark background). The styling contract, the full slot list and the
  SSR rule are now recorded in `CLAUDE.md`, so no future session has to re-read `node_modules`.
- **Toolchain: done** (file 00). `bun` as package manager, TypeScript 6.0.3 with the `tsconfig/` split,
  ESLint 10 + `@byloth/eslint-config-nuxt`, SASS, and a husky pre-commit running lint → typecheck →
  build. One item stays open there: whether to adopt `@byloth/core`. (The suspected
  `.editorconfig`-vs-ESLint conflict turned out not to exist — `*.config.mts` does not match a bare
  `config.mts`, so both agree on 4 spaces.)
- **Not decided:** deploy target, i18n, whether binaries are ever hosted. See `99-deferred.md`.

## Source of truth

The pages are a distillation. The full record stays in the repository:

| Document | What it holds |
| --- | --- |
| `research/PROCEDURE-DRAFT.md` | The reconstructed end-to-end procedure, plus §4b — the original script review |
| `research/FIRMWARE-MATRIX.md` | Version × region matrix, upgrade/downgrade rules, the points of no return |
| `research/INVENTORY.md` | Every file and part, with hashes and status |
| `research/SOURCES.md` | The 198-source registry with link status and trust level |
| `research/OPEN-QUESTIONS.md` | What is unknown, contradictory, or answerable only by a car |
| `research/raw/*.md` | The seven per-theme reports, with the per-post detail the summaries drop |

## Two rules that override convenience

**Progressive enhancement.** This is safety-critical documentation. With JavaScript disabled, every page
must still show every route and every market. Components filter, highlight and reorder — they never gate.
No content may exist only inside a component.

**Confidence markers survive.** The research is full of ⚠️ (single report) and ❓ (sources contradict).
Those must reach the reader intact. Flattening them into confident prose is the one failure mode that
would make this site actively worse than the forum posts it replaces.
