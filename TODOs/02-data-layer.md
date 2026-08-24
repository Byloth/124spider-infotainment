# 02 · Data layer

Typed data modules under `docs/.vitepress/data/`, consumed by components and by VitePress build-time
loaders (`*.data.ts`) where a page needs the values at render time.

**The principle:** the research documents keep the *prose and the reasoning*; these files hold the
*facts*. A changed hash, a newly dead link or a corrected part number is then a one-file edit, and every
page that shows it updates at once. Never duplicate a fact into page prose that also lives here.

Each module ships its own TypeScript interface. Row counts below are what the research documents
currently contain, so progress is measurable.

---

## Modules

- [ ] **`firmware.data.ts`** — ~22 versions × per-region facts.
  Source: `research/FIRMWARE-MATRIX.md`.
  Fields: `version`, `revision`, `regions[]`, `date`, `carplay: boolean`, `usbTweaksOOTB`,
  `id7Survives`, `otherRoutes[]`, `fileType: 'two-file' | 'single-file'`, `notes`, `confidence`,
  `sourceIds[]`, `isPointOfNoReturn`, `isCommunityTarget`.
  - [ ] Model confidence explicitly (`confirmed` / `single-report` / `contradictory`) — the matrix is
        full of ⚠️ and ❓ markers and they must survive into the UI, not be flattened away.

- [ ] **`files.data.ts`** — the artifacts: firmware images, tweak packages, guides, documents.
  Source: `research/INVENTORY.md` (~174 rows, many are prose — extract the real artifacts).
  Fields: `id`, `filename`, `kind`, `region`, `version`, `bytes`, `sha256`, `md5`, `status`
  (`verified` / `verified-pending-AV` / `collected` / `known-hash` / `known-to-exist` / `paywalled` /
  `lost`), `scan` (VT result + date), `sources[]` (→ `links.data.ts`), `notes`.
  - [ ] Feeds both `HashVerifier` (lookup by hash) and `HashTable` (display).
  - [ ] Include the community-published hashes even for files we do not hold — that is precisely what a
        reader needs to check their own download.

- [ ] **`parts.data.ts`** — hardware.
  Source: `research/INVENTORY.md` §3.
  Fields: `role` (hub / cable set / kit / nav SD / CMU / screen), `partNumber`, `markets[]`,
  `supersededBy`, `contents[]`, `priceRanges[]` (per market, with currency and date), `genuineMarkers`,
  `notes`.

- [ ] **`sources.data.ts`** — 198 entries.
  Source: `research/SOURCES.md`.
  Fields: `id` (`A-01`, `B-01`, `C1-*`, `C2-*`, `D-*`, `E-*`, `F-*`), `title`, `url`, `author`, `dates`,
  `category`, `linkStatus`, `trust` (A–D), `archivePath`, `aliasOf`, `summary`.
  - [ ] Keep the existing id scheme exactly — every research document cites it.

- [ ] **`failures.data.ts`** — 19 symptom → cause → fix rows.
  Source: `research/raw/F-rollback-failures.md` §3 and `research/PROCEDURE-DRAFT.md` §7.
  Fields: `id`, `symptom`, `causes[]`, `fixes[]`, `severity`, `phase` (during flash / after flash /
  after tweaks / hardware), `sourceIds[]`.
  - [ ] Feeds both the always-rendered catalogue and `SymptomTree`.

- [ ] **`links.data.ts`** — external URL health. **This one is load-bearing.**
  Fields: `url`, `label`, `status` (`alive` / `dead` / `paywalled` / `login-walled` / `bot-blocked` /
  **`hijacked`**), `lastChecked`, `archiveUrl`, `replacement`, `warning`.
  - [ ] Must carry the finding from `research/OPEN-QUESTIONS.md` 5b: `mazdatweaks.com/serial/` now serves
        a gambling/scam site while the site's homepage still renders as "Mazda AIO Tweaks"; `/id7/` is
        404; the surviving mirror is GitHub `Trevelopment/mazdatweaks`.
  - [ ] Also: HiDrive (`Not Found: share` from the API), MEGA folders, 1fichier, OneDrive/bit.ly — all
        dead; the Mazda NA CDN — alive and first-party; the 124spider.org Google-Drive bundles — alive.
  - [ ] Every external link rendered anywhere on the site should resolve through this file, so a link
        cannot silently rot.

- [ ] **`glossary.data.ts`** — terms and one-paragraph definitions.
  Minimum set: CMU, MZD Connect, JCI, ID7, ID7 v2, NNG / iGO, failsafe vs reinstall vs update package,
  ADR / 4A, TAU, `neutralizeid7`, `passwdupdate`, mp3 method, SPI-NOR / boot-select, MZD-AIO,
  MazdaToFiatV70AIO, CSP02, H2testw.

## Cross-cutting

- [ ] A shared `types.ts` for the enums used across modules (`Market`, `Region`, `Confidence`,
      `LinkStatus`, `FileStatus`, `Route`).
- [ ] Decide per module whether it is a plain `.ts` import (bundled into the client) or a VitePress
      `*.data.ts` loader (resolved at build, kept out of the client bundle). Rule of thumb: anything a
      component filters interactively must be bundled; anything only rendered once should be a loader.
      `sources.data.ts` (198 rows) and `files.data.ts` are the ones worth measuring.

## Done when

- [ ] `npm run typecheck` passes with every module strictly typed.
- [ ] Row counts match the research documents, and a spot-check of five entries per module matches the
      source exactly.
- [ ] No fact in these files contradicts the research documents; where the research is contradictory, the
      contradiction is *represented* (a confidence field), not resolved silently.
