# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A single, versioned, **English-language** knowledge base (eventually a VitePress site) that collects
*everything* needed to upgrade the infotainment unit (CMU, "MZD Connect" / Mazda Connect — the same
Johnson Controls unit used in the Mazda MX-5 ND) of the **Fiat / Abarth 124 Spider (2016–2019)**
from the stock Fiat firmware (59.xx.xxx series) to Mazda firmware 70.xx.xxx so that **Android Auto and
Apple CarPlay work**, including:

- the CarPlay/AA **USB hub retrofit kit** (Mazda `00008FZ34` / hub `TK78-66-9U0C`, OEM and clones);
- the firmware packages themselves, **per market** (EU / NA / ADR / JP …), failsafe + main files;
- the **required** tweaks only (for now): ID7 autorun / serial backdoor, the Fiat logo + factory
  navigation fix for v70 (Ameridan's `MazdaToFiatV70AIO`), anything else needed for a *complete and
  working* upgrade — not cosmetic/feature tweaks;
- rollback / downgrade paths, failure modes (brick, black screen), troubleshooting;
- **verified binaries**: every file hashed (SHA256) and malware-scanned, collected locally first;
  where/how to publish them is an open decision (Mazda firmware is proprietary — takedown risk).

Audience: 124 Spider owners only (Mazda owners go to a dealer). Mazda MX-5 ND / MZD sources are
used freely because the hardware and firmware are shared.

**The documentation is generic by design.** It must serve every 124 Spider owner equally: all markets
(EU / NA / ADR / JP) and every starting firmware, with no route privileged because it happens to match
one particular car. Do not tailor procedures, examples or defaults to the maintainer's vehicle, and do
not treat any fact about it as a prerequisite for writing a page.

The maintainer does own an EU Abarth 124 Spider (retrofit kit not yet fitted), and it will eventually be
the first real-world test. That is **a separate task, to be started only once the documentation site is
finished** — deliberately kept out of this one. Nothing can be verified on hardware by Claude in any case.

## Hard constraints / ground truth to keep in mind

- Firmware is **region-locked**; files carry a region suffix. Wrong region = brick risk.
- Mazda **70.00.335+ neutralises the ID7 tweak / serial access**; 70.00.367 cannot be serial-enabled
  at all (updates are signed). Classic rule: without ID7 installed beforehand you can no longer
  side-load the logo/nav fix. **Nuance discovered in research:** since 2024–25 the "mp3 method"
  (`mzd-evo/mzd-connect-1-root` payload + USB keyboard → JCI terminal) runs the tweaks with neither
  ID7 nor serial — confirmed on 70.00.100 and 74.00.324, thin evidence elsewhere. State both, with
  confidence levels. See `research/FIRMWARE-MATRIX.md` §4.
- Fiat-specific 59.00.5xx firmware newer than the factory one exists (e.g. 59.00.562/563-NA) and is
  reported to break CarPlay/AA compatibility — treat "latest Fiat firmware" as a trap, verify.
- Online sources are decaying (dead links, re-hosted/"hacked" files). Every source must be archived
  (Wayback / local copy) and every file hashed. Never present an unverified file as verified.

## Repository layout

```
CLAUDE.md                  – this file (keep it updated when scope/layout/status changes)
research/
  SOURCES.md               – deduplicated master source index [S-nn], link status, trust level
  INVENTORY.md             – every file/artifact + hardware part numbers; what we hold and its status
  FIRMWARE-MATRIX.md       – version × region matrix, upgrade/downgrade rules, points of no return
  PROCEDURE-DRAFT.md       – reconstructed end-to-end procedure (route table, flash, tweaks, hub,
                             troubleshooting, rollback) — untested on hardware
  OPEN-QUESTIONS.md        – blockers, contradictions, lost material, what only the car can answer
  raw/                     – the seven per-theme research reports (A,B,C1,C2,D,E,F) these were built
                             from; keep them, they hold the per-post detail the summaries drop
  archive/                 – ~430 local copies of key pages/PDFs (178 MB), incl. Wayback captures
downloads/                 – git-ignored binaries; CHECKSUMS.sha256 + README.md are tracked
  firmware/NA/             – 7 NA .up files straight from Mazda's dealer CDN (2.8 GB)
  firmware/EU/, ADR/       – 70.00.100A failsafe+reinstall pairs, hash-checked (+ source bundles)
  ameridan/                – the 12 MediaFire tweak packages + Mazda's update-procedure PDF
  tweaks/                  – ID7_Recovery_XX.zip, mzd-connect-1-root-main.zip
  guides/                  – 68wooley's PDF guide zip
docs/                      – the VitePress site (reader-facing)
  .vitepress/config.mts    – nav, per-section sidebars, local search, footer disclaimer
  .vitepress/data/         – seven typed modules: firmware, files, sources, failures, links,
                             parts, glossary. Plain `.ts` — a `*.data.ts` name would make VitePress
                             treat them as build-time loaders needing a `load()` export.
  .vitepress/logic/        – pure functions, no Vue: version parsing + `versionOrdinal`, route
                             derivation, the firmware band partition, incremental SHA-256
  .vitepress/theme/        – index.ts (extends DefaultTheme), style.css (brand tokens),
                             components/ and components/diagrams/ — via the `@theme/*` alias
  index.md                 – home
  dev/components.md        – unlisted gallery mounting every component and diagram
  security/                – the only section that exists nowhere else; the first pages written
  guide/ procedure/ firmware/ hardware/ recovery/ reference/
tests/                     – Vitest; data invariants, the resolvers, the logic modules, the diagrams
TODOs/                     – the backlog, one file per phase + README.md as the index
tools/
  vt-check.sh              – VirusTotal hash-lookup / URL-scan helper (needs VT_API_KEY)
  verify-data.mjs          – checks the data modules against CHECKSUMS.sha256 and the research docs
package.json               – docs:dev, docs:build, docs:preview, lint, typecheck, test, verify:data
```

## The site

VitePress 1.6.4, **bun**, Node v24 via nvm. `bun run docs:dev` to serve, `bun run docs:build` to build.

- **Deploy: GitHub Pages, decided.** `.github/workflows/publish.yml` builds and publishes on every push
  to `master` (quality-gated: lint → typecheck → test → strict-link build, then the modern
  configure-pages/upload-pages-artifact/deploy-pages flow). The site is a project site at
  `https://byloth.github.io/124spider-infotainment/`, so `base: '/124spider-infotainment/'`. VitePress
  base-rewrites markdown links automatically; **component-authored internal links must prefix the base
  themselves via `import.meta.env.BASE_URL`** (only `SourceCite.vue` needed it — `withBase()` from
  `vitepress` is the idiomatic API but is unavailable in the bare Vitest SSR context, so the env var is
  used instead). A one-time repo setting is required: Pages source = "GitHub Actions".
- **Eleven of the 29 pages are written**; the rest are stubs. `/security/` + `/security/link-safety`, the
  whole `/firmware/` section (`index`, `regions`, `points-of-no-return`, `obtaining`), and the whole
  `/guide/` "Start here" section (`index`, `eligibility`, `what-changes`, `risks`, and the new `route`) are
  finished prose. Every remaining stub carries a warning block pointing at its backing document — keep that
  warning until the page actually stands on its own, so an empty page is never mistaken for guidance, and
  delete it only in the commit that writes the page.
- **i18n**: English content stays at the root of `docs/` on purpose. VitePress keeps the root locale in
  place and gives other locales a subdirectory, so adding Italian later needs only a `locales` key.
- `bun run docs:build` fails on dead links by design — use it as the link checker.
- Known: `bun audit` reports esbuild advisories reaching in through vite. Dev-server-only, no fix on the
  VitePress 1.x line. Accepted for a locally-served docs site; revisit if the site is ever deployed.

## Writing components (VitePress theme)

Established by reading `node_modules/vitepress/dist/client/theme-default/` — do not re-derive it.

**SFC block form — mandatory, no exceptions:**

```vue
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
```

`lang` comes **before** `setup`; styles are always `lang="scss"` **and** `scoped`. SCSS is for nesting
and mixins only — colours and spacing come from CSS custom properties, which SCSS cannot read at build
time.

**Styling contract**

- Consume `--vp-c-*` tokens; **never hardcode a colour**. That is what makes dark mode free.
  Available: `--vp-c-brand-{1,2,3,soft}`, `--vp-c-bg{,-soft,-alt,-elv}`, `--vp-c-text-{1,2,3}`,
  `--vp-c-divider`, `--vp-c-border`, `--vp-c-gutter`, and the semantic scales
  `--vp-c-{tip,note,success,important,warning,danger,caution}-{1,2,3,soft}`.
  ⚠️ There is **no** `--vp-c-info-*` scale — "info" blocks use `--vp-c-default-soft`.
- **No radius or transition tokens exist.** Match the theme's literals: `8px` custom/code blocks,
  `12px` cards and badges, `20px`/`24px` pill buttons, and
  `transition: color .25s, border-color .25s, background-color .25s` (`.1s` on `:active`).
- **Callouts:** emit the theme's own markup instead of restyling —
  `<div class="custom-block warning"><p class="custom-block-title">TITLE</p>…</div>`.
  Modifiers: `info note tip important warning danger caution details`.
- **Cards:** copy `VPFeature` — `border: 1px solid var(--vp-c-bg-soft); border-radius: 12px;
  background: var(--vp-c-bg-soft)`, hover `border-color: var(--vp-c-brand-1)`.
- Globally registered, no import needed: **only** `Badge`, `Content`, `ClientOnly`. `VPButton`
  (`theme`, `size`, `text`, `href`) and `VPBadge` are importable from `vitepress/theme` — reuse them
  rather than writing new ones.
- Markdown content is wrapped in `.vp-doc`, so markup rendered from inside a `.md` inherits its heading
  borders, paragraph margins and link colours. Keep component markup in its own scoped styles.
- Icons: the theme masks any `.vp-icon` / `.vpi-*` element with `background-color: currentColor`, so an
  inline SVG using the same pattern inherits colour for free.

**Diagrams** live in `theme/components/diagrams/` as **inline SVG inside components**, never as files in
`docs/public/`: an SVG loaded through `<img src>` is an isolated document and cannot read the page's
`var(--vp-c-*)` tokens, so a file would need one hand-maintained copy per colour scheme. Rules:

- `viewBox` only, no fixed `width`/`height`; `role="img"` with `<title>` and `<desc>`; **and a full prose
  equivalent inside the component itself** — these carry safety information, so it must not depend on
  whoever writes the page remembering.
- Text stays real `<text>`, never outlined paths — selectable, searchable, translatable when Italian
  arrives. No `<foreignObject>`, no `<image>`.
- ⚠️ Adjacent `<tspan>` line breaks are visual only: SVG concatenates their content, so every line but
  the last needs a **trailing space** or a screen reader reads "Mazda'sown".
- `.diagram` is a horizontal scroll container with a 600 px floor (`theme/style.css`) — below that the
  labels stop being readable, and on a phone the prose equivalent is the reading path.
- Anything derivable from `data/` **is** derived, geometry included: three of the eight are generated
  from `firmware.ts` so the picture cannot drift, and their canvases grow with the data rather than the
  data having to fit a hardcoded `viewBox`.

**Dark mode** is a `.dark` class on `<html>`. Best practice: define no `.dark` rule at all and only
consume tokens. Inside a `scoped` block, `.dark .thing` will **not** match (the scope attribute lands on
`.dark` too) — use `:global(.dark) .thing`.

**SSR — the rule that otherwise causes hydration bugs.** VitePress server-renders every page at build
time. Anything touching `localStorage`, `window` or `document` must be inside `<ClientOnly>` or
`onMounted`, and a component that reads the reader profile must render its **neutral, show-everything**
state on the server. That is the same requirement as the progressive-enhancement rule below.

**Theme entry point** is `docs/.vitepress/theme/index.ts` (`extends: DefaultTheme`). Defining a `Layout`
there *replaces* the default one — to use a layout slot, wrap it:
`h(DefaultTheme.Layout, null, { "doc-before": () => h(Thing) })`. Slots available: `layout-{top,bottom}`,
`nav-bar-{title,content}-{before,after}`, `nav-screen-content-{before,after}`,
`sidebar-nav-{before,after}`, `page-{top,bottom}`, `not-found`,
`home-hero-{before,info-before,info,info-after,actions-after,image,after}`,
`home-features-{before,after}`, `doc-{footer-before,before,after,top,bottom}`,
`aside-{top,bottom,outline-before,outline-after,ads-before,ads-after}`.
⚠️ Using `layout-top` or `doc-top` requires setting `--vp-layout-top-height` / `--vp-doc-top-height`
yourself.

## Writing pages

Established by `/security/` and `/security/link-safety`, the first two real pages — follow them rather
than re-deciding.

- **Citations are inline**: `<SourceCite ids="B-04,C2-25" />` at the end of the sentence it supports,
  resolving through `sourceById()`. An id that resolves to nothing renders visibly marked. Where a claim
  comes from a file the project holds rather than from a source, the page says that instead of citing.
- **Numbers that live in the data are interpolated from it** — `{{ UNSCANNABLE.length }}`, never typed.
  A `<script lang="ts" setup>` block in the `.md` imports what the page needs; `@theme/*` resolves for
  components, and data is a relative path (`../.vitepress/data/files`).
- **Market-dependent facts are stated for every market at once**, never gated behind a selector.
- **Where the sources do not support a recommendation, say so** rather than implying one by omission.
  The ID7-vs-mp3 comparison is the model: both costs stated, no winner declared.
- **Never render a link to a hostile host.** `links.ts` exports `isHostile()`; `LinkStatus` refuses an
  `href` for anything on a domain with a `hijacked` entry, whatever that page's own status says.
- **The last step before calling a page done is reading it.** Render the built HTML to plain text and
  read it end to end — three presentation bugs on the first two pages were invisible in the source and
  obvious in the output.

**Progressive enhancement is a hard rule.** This is safety-critical documentation: with JavaScript
disabled, every page must still show every route and every market. Components filter, highlight and
reorder — they never gate. No content may exist only inside a component.

## Conventions

- Language of all docs: English. Commit messages: English.
- **Commits: plain `git commit`.** Never pass `-c user.name=…`, `-c user.email=…`, `--author`, or set
  `GIT_AUTHOR_*`/`GIT_COMMITTER_*`. Identity is routed by directory through `includeIf` in
  `~/.gitconfig` (this repo resolves to `~/byloth/.gitconfig`), and `commit.gpgsign = true` means commits
  are **already GPG-signed** — do not add signing flags either. Note that `git config --local` and
  `--global` report nothing for `user.name` because it comes from the included file; use
  `git config --show-origin --get user.name` before concluding it is unset.
- Every factual claim in research docs cites its source using the single repo-wide id scheme
  `[A-nn]` `[B-nn]` `[C1-nn]` `[C2-nn]` `[D-nn]` `[E-nn]` `[F-nn]`, registered in `research/SOURCES.md`
  (231 sources, with an alias column for URLs several themes found independently). Per-post detail lives
  in the matching `research/raw/<X>-*.md`.
- Every file in `downloads/` is listed in `research/INVENTORY.md` and hashed in
  `downloads/CHECKSUMS.sha256` (`sha256sum <file> >> downloads/CHECKSUMS.sha256`).
- "Verified" in this repo means: SHA256 matches ≥2 independent community-reported hashes **or** the
  file was obtained from its original author, **and** a VirusTotal hash lookup is clean. Anything
  less is "collected" / "unverified".
- Mark unverified or contradictory statements explicitly (`⚠️ unverified`, `❓ contradictory`).

## Key findings from the research phase (2026-08-23)

Read `research/` before doing anything; the headlines:

- **Mazda's own dealer CDN is still open for NA files**: `https://s3.amazonaws.com/tsd.mazdausa.com/
  MAZDA_CONNECT/<file>` (direct object GET; listing denied; **EU/ADR return 403**). Four downloaded NA
  files matched the community-published MD5s exactly → genuine, unmodified, free. EU/ADR had to come
  from elsewhere (community re-hosts) — since acquired and hash-checked.
- **The target version is 70.00.100A**, not the newest. It is the last build where the Fiat rebrand +
  nav-restore tool installs unmodified. 70.00.335/352/367 and 74.x progressively close the door.
- **Fiat never released a v70+ firmware** — the whole procedure is "flash Mazda firmware, then rebrand".
  There is no path back to stock Fiat.
- **The single tool that matters is Ameridan's `MazdaToFiatV70AIO.zip`** (branding + boot animations +
  CarPlay icon + factory-nav restore + BT name). Upstream MZD-AIO contains none of that and has had no
  release since 2020.
- **The 2025 "mp3 method" changed the rules** — tweaks without ID7 or serial on 70.00.100 and 74.00.324.
  Most guides online still predate it.
- All 12 of Ameridan's MediaFire packages and 68wooley's PDF guide are **still alive and now held locally**;
  most other historic mirrors (HiDrive, MEGA, 1fichier, mazdatweaks.com) are dead — `mazdatweaks.com` is
  now hijacked/spam.

## Status

- 2026-08-23: repo bootstrapped; **research phase complete** — five consolidated docs in `research/`,
  ~430 archived pages, ~11 GB of binaries collected and hashed.
- 2026-08-23: **EU and ADR firmware acquired and hash-checked** (the long-standing blocker); tweak scripts
  reviewed by hand (see `research/PROCEDURE-DRAFT.md` §4b — ID7 is command injection into Mazda's own
  signed diagnostic package and leaves a permanent root SSH service); a document previously recorded as
  lost was recovered; ND workshop-manual trim sections mirrored (HiDrive confirmed dead).
- 2026-08-23: **VitePress scaffold in place** — structure, navigation, 27 stub pages. No content ported.
- 2026-08-24: **the substrate is complete** — toolchain (bun, TS 6, ESLint 10, husky), theme foundation,
  seven data modules, 16 components, four logic modules and eight diagrams, with **91 Vitest tests**.
  The backlog lives in `TODOs/`; `TODOs/README.md` is its index and its current-state summary.
  Everything a page needs now exists; the pages themselves are still stubs.
- 2026-08-25: **the security section is written** — `/security/` and `/security/link-safety`, the first
  two real pages, plus `SourceCite` and `LinkTable`. 105 tests. Writing them found a live bug: the site
  was rendering a clickable link to a page on the hijacked domain because that page's own status was
  merely `dead`; the check is now on the host.
- 2026-08-27: **the firmware section is written** (`TODOs/06`) — the four `/firmware/` pages: the version
  matrix (mounts `FirmwareMatrix`; weight-bearing rows anchored `#v70-00-100a` etc.), regions and file
  naming (`VersionDecoder`), points of no return (the four thresholds + `VersionTimeline`, classic rule
  vs. the 2025 mp3 nuance with confidence intact), and obtaining and verifying (per-region sourcing,
  hand-written MD5/provenance tables + `HashTable`/`HashVerifier`, the H2testw USB-stick test, the EU
  corroboration-not-independence caveat). No new data or components — data-derived tables are left to the
  components (SSR-rendered = the no-JS baseline) rather than hand-duplicated. File 06 is `[~]` for one
  cross-cutting item: anchoring every matrix row waits on the pages that will cite them.
- 2026-08-27: **the guide / "Start here" section is written** (`TODOs/07`) — five pages: overview (what
  the upgrade is, gain/lose, time/cost, the dealer warning), eligibility (7″-only, reading the version,
  the ❓ unconfirmed 70.00.100-over-Fiat-59.00.563 flash), what you gain and lose (three tables incl. the
  VIN-check nav explanation and the un-pair-before-flashing note), risks (the four one-way doors +
  `VersionTimeline`, the brick mechanism explained, recovery cost, reversibility), and the **new**
  `guide/route` (mounts `RouteWizard`, then a full static route table + per-route `RouteBranch` cards with
  copyable fenced summaries — the wizard renders no table and points to it). `route.md` registered in the
  `/guide/` sidebar. No new data/components; 105 tests green.
- 2026-08-27: **the site is set up to publish.** `.github/workflows/publish.yml` deploys to GitHub Pages
  on every push to `master`; `base` moved to `/124spider-infotainment/` (with the `SourceCite` `withBase`
  fix and a sitemap); `package.json` repackaged under `@byloth/` (v0.1.0, Apache-2.0, authored metadata);
  root `README.md` + `LICENSE` added; the homepage now states plainly that the guide is in progress and
  nothing is hardware-tested yet. **One-time manual step still required: set the repo's Pages source to
  "GitHub Actions."** Flagged separately: 28 `blog-ameridan` sources in `sources.ts` store domain-less
  relative URLs — a pre-existing latent bug surfacing on the unlisted `dev/components` gallery (and later
  on `/reference/sources`); fix with file 11 or a data pass.
- 2026-08-27: **the site has a logo.** An original red-and-cyan scorpion mark (evokes the Abarth heritage
  without replicating any trademark; a generic phone→car connectivity glyph stands in for CarPlay/AA)
  lives at `docs/public/logo.png`, wired into the home hero. Favicons (`favicon.ico` + 16/32 PNG +
  `apple-touch-icon`) were generated from it and referenced in `config.mts` head with the base prefix
  (VitePress does not base-prefix head hrefs — `BASE` const added). The hero glow gradient in
  `theme/style.css` was retuned from red-on-red to the logo's sampled red (`#d11a1f`) → cyan (`#0fbfd6`).
- **Next:** (1) continue porting the research into the pages — procedure next (the operational core),
  then hardware, recovery, reference — written generically for all markets and all starting versions;
  (2) decide where/whether to publish the binaries (proprietary — takedown risk killed every past mirror).
- **Deferred to a separate task, after the site is complete:** anything specific to the maintainer's own
  car (reading its version string, choosing its route, an actual attempt).
