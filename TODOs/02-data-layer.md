# 02 · Data layer

Typed data modules under `docs/.vitepress/data/`, consumed by the components and the pages.

⚠️ They are **plain `.ts` modules, not `*.data.ts`**: VitePress treats any file matching
`/\.data\.m?(j|t)s($|\?)/` as a build-time *loader* that must export `{ watch?, load() }`, so those
names would break the build.

**The principle:** the research documents keep the *prose and the reasoning*; these files hold the
*facts*. A changed hash, a newly dead link or a corrected part number is then a one-file edit, and every
page that shows it updates at once. Never duplicate a fact into page prose that also lives here.

Each module ships its own TypeScript interface. Row counts below are what the research documents
currently contain, so progress is measurable.

---

## Modules

- [X] **`firmware.ts`** — ~22 versions × per-region facts.
  Source: `research/FIRMWARE-MATRIX.md`.
  Fields: `version`, `revision`, `regions[]`, `date`, `carplay: boolean`, `usbTweaksOOTB`,
  `id7Survives`, `otherRoutes[]`, `fileType: 'two-file' | 'single-file'`, `notes`, `confidence`,
  `sourceIds[]`, `isPointOfNoReturn`, `isCommunityTarget`.
  - [X] Model confidence explicitly (`confirmed` / `single-report` / `contradictory`) — the matrix is
        full of ⚠️ and ❓ markers and they must survive into the UI, not be flattened away.

- [X] **`files.ts`** — the artifacts: firmware images, tweak packages, guides, documents.
  Source: `research/INVENTORY.md` (~174 rows, many are prose — extract the real artifacts).
  Fields: `id`, `filename`, `kind`, `region`, `version`, `bytes`, `sha256`, `md5`, `status`
  (`verified` / `verified-pending-AV` / `collected` / `known-hash` / `known-to-exist` / `paywalled` /
  `lost`), `scan` (VT result + date), `sources[]` (→ `links.ts`), `notes`.
  - [X] Feeds both `HashVerifier` (lookup by hash) and `HashTable` (display).
  - [X] Include the community-published hashes even for files we do not hold — that is precisely what a
        reader needs to check their own download.

- [X] **`parts.ts`** — hardware.
  Source: `research/INVENTORY.md` §3.
  Fields: `role` (hub / cable set / kit / nav SD / CMU / screen), `partNumber`, `markets[]`,
  `supersededBy`, `contents[]`, `priceRanges[]` (per market, with currency and date), `genuineMarkers`,
  `notes`.

- [X] **`sources.ts`** — 200 entries (see below: the "198" in the research document undercounts).
  Source: `research/SOURCES.md`.
  Fields: `id` (`A-01`, `B-01`, `C1-*`, `C2-*`, `D-*`, `E-*`, `F-*`), `title`, `url`, `author`, `dates`,
  `category`, `linkStatus`, `trust` (A–D), `archivePath`, `aliasOf`, `summary`.
  - [X] Keep the existing id scheme exactly — every research document cites it.

- [X] **`failures.ts`** — 19 symptom → cause → fix rows.
  Source: `research/raw/F-rollback-failures.md` §3 and `research/PROCEDURE-DRAFT.md` §7.
  Fields: `id`, `symptom`, `causes[]`, `fixes[]`, `severity`, `phase` (during flash / after flash /
  after tweaks / hardware), `sourceIds[]`.
  - [X] Feeds both the always-rendered catalogue and `SymptomTree`.

- [X] **`links.ts`** — external URL health. **This one is load-bearing.**
  Fields: `url`, `label`, `status` (`alive` / `dead` / `paywalled` / `login-walled` / `bot-blocked` /
  **`hijacked`**), `lastChecked`, `archiveUrl`, `replacement`, `warning`.
  - [X] Must carry the finding from `research/OPEN-QUESTIONS.md` 5b: `mazdatweaks.com/serial/` now serves
        a gambling/scam site while the site's homepage still renders as "Mazda AIO Tweaks"; `/id7/` is
        404; the surviving mirror is GitHub `Trevelopment/mazdatweaks`.
  - [X] Also: HiDrive (`Not Found: share` from the API), MEGA folders, 1fichier, OneDrive/bit.ly — all
        dead; the Mazda NA CDN — alive and first-party; the 124spider.org Google-Drive bundles — alive.
  - [X] Every external link rendered anywhere on the site should resolve through this file, so a link
        cannot silently rot.

- [X] **`glossary.ts`** — terms and one-paragraph definitions.
  Minimum set: CMU, MZD Connect, JCI, ID7, ID7 v2, NNG / iGO, failsafe vs reinstall vs update package,
  ADR / 4A, TAU, `neutralizeid7`, `passwdupdate`, mp3 method, SPI-NOR / boot-select, MZD-AIO,
  MazdaToFiatV70AIO, CSP02, H2testw.

## Cross-cutting

- [X] A shared `types.ts` for the enums used across modules (`Market`, `Region`, `Confidence`,
      `LinkStatus`, `FileStatus`, `Route`).
- [X] All seven are plain bundled modules. A build-time loader was considered and rejected for now:
      every one of them feeds a component that filters interactively, and the loader form cannot do that.
  - [ ] ⏳ **Measure the bundle cost once the components exist** (task 03). If `sources.ts` (200 rows)
        proves disproportionate on a page that only renders it statically, that is the one worth moving.

## What actually happened

- [X] **The `.data.ts` naming was wrong and had to be dropped.** VitePress matches
      `loaderMatch = /\.data\.m?(j|t)s($|\?)/` and treats **any** such file as a data *loader* that must
      export `LoaderModule` (`{ watch?, load() }`). Plain data modules with those names would have broken
      the build. They are now `firmware.ts`, `files.ts`, and so on.
- [X] **Hashes generated from the files, never transcribed.** `files.ts` was emitted by a script that
      read the real bytes; `tools/verify-data.mjs` (`bun run verify:data`) re-checks all 28 against
      `downloads/CHECKSUMS.sha256` in both directions, and is now part of the routine.
- [X] **The "198 sources" figure was itself derived from a flawed pattern.** The registry has **202**
      table rows in §2; four carry compound ids (`D-04b/E-36`, `C1-04b/C2-26`) or no id at all, so the
      naive `| X-nn |` count missed them — and the count in `SOURCES.md` had been produced the same way,
      which is why it looked consistent. Two were real sources and are now entries; two were placeholder
      rows. **200 sources** in the module.
- [X] **Citations needed an alias-aware resolver.** 20 ids cited in `INVENTORY.md` did not resolve: 5 were
      unpadded (`A-3` for `A-02`) and 15 were aliases folded into a canonical row. `sourceById()` now
      normalises padding and follows aliases, so all 105 cited ids resolve.
- [X] **`research/raw/` is excluded from the citation check** — those reports keep their own local id
      space by design, and checking them against the global registry produced false orphans.
- [X] ⚠️ **The automatic line-wrapper lost seven spaces at concatenation boundaries** ("Certificate
      validation" + "failed"). Caught by recomposing every concatenated string and reading it back, not by
      the linter — which was perfectly happy. Worth remembering the next time formatting is automated:
      lint measures shape, not meaning.

## Done when

- [X] `bun run typecheck` passes with every module strictly typed.
- [X] Row counts match the research documents, and a spot-check of five entries per module matches the
      source exactly.
- [X] No fact in these files contradicts the research documents; where the research is contradictory, the
      contradiction is *represented* (a confidence field), not resolved silently.
