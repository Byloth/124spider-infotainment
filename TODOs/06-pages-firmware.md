# 06 · Pages — Firmware

The reference section everything else cites. Written second, because the guide and the procedure both
link into it constantly.

Backing: `research/FIRMWARE-MATRIX.md` · `research/INVENTORY.md` §1 · `research/OPEN-QUESTIONS.md`.

---

## `/firmware/index.md` — Version matrix

- [ ] Short orientation: what the matrix is for, and the one sentence that matters —
      **the target is 70.00.100A, not the newest version.**
- [ ] The full matrix, ~22 versions, as a **static Markdown table** (the no-JS baseline), with
      `FirmwareMatrix` mounted over it for filtering, search and profile highlighting.
- [ ] Columns: version · regions · CarPlay/AA · USB tweaks out of the box · ID7 survives · other route ·
      notes. Confidence markers (⚠️ single report, ❓ contradictory) must survive into the rendering.
- [ ] Call out the rows that carry weight: `56.00.521/530` (where ID7 can still be installed),
      `59.00.502` (the lock), the Fiat-only `59.00.524/562/563` (the "latest Fiat firmware" trap),
      `70.00.100A` (the target), `70.00.335/352/367`, `74.00.324A` (the last build ever).
- [ ] State plainly: **no Fiat firmware above 59 exists**, so there is no route back to stock Fiat.
- [ ] Anchor ids per version (`#v70-00-100a`) — every other page links to them.

## `/firmware/regions.md` — Regions and file naming

- [ ] Anatomy of `cmu150_EU_70.00.100A_reinstall.up` and of the on-screen string `70.00.100A EU N`.
- [ ] Region codes: NA · EU · **4A = ADR** (Australia/NZ/Middle East/Asia-Pacific/South Africa/South
      America) · JP. The trailing **N** = NNG/iGO nav protocol, **M** = Matsukone (Japan only) — not a
      revision letter. The `A`/`B`/`C` suffix *is* the revision.
- [ ] File types: `_failsafe.up` (~7 MB, the bootloader/updater, installs **first**), `_reinstall.up`
      (0.9–2.3 GB, the OS, **second**), `_update.up` (single file, from 70.00.335 on).
- [ ] Why the region must match, and the honest nuance: one ADR car ran NA firmware without bricking
      (CarPlay worked, an auto-lock setting went missing) ⚠️ — but the TAU tuner keeps the original band
      plan, and this is treated as brick risk everywhere. Do not turn one anecdote into permission.
- [ ] Mount `VersionDecoder`.

## `/firmware/points-of-no-return.md`

- [ ] The four thresholds, each with what it closes and whether anything reopens it:
  - [ ] **59.00.502** — USB side-loading gone; cannot go below this version.
  - [ ] **70.00.335** — `neutralizeid7` + `passwdupdate` delete ID7 and the serial credentials.
  - [ ] **70.00.367** — serial login itself dead; updates are signed, so repacking is infeasible.
  - [ ] **74.00.310** — cannot return to v70 by USB.
- [ ] Diagram: **version timeline** (`04-diagrams.md`).
- [ ] **The 2025 nuance, with confidence levels attached** — this is the section most guides get wrong
      because they predate it. The mp3 method runs tweaks with neither ID7 nor serial:
      ✅ confirmed on 70.00.100 and 74.00.324/311 · ⚠️ single report on 59.00.563 · ⚠️ single report on
      70.00.367 · ⚠️ one owner **failed** on 70.00.335.
      Present the classic rule as the safe assumption and the mp3 method as a documented-but-thin escape.
      Never flatten the two into one confident claim.
- [ ] Cross-link `/security/` for what each escape route costs.

## `/firmware/obtaining.md` — Obtaining and verifying files

- [ ] **Where files come from, per region**, ranked, rendered by `DownloadSources` from `links.data.ts`:
  - [ ] **NA needs no mirror** — Mazda's own dealer CDN still serves it, first-party and free
        (`s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<file>`; direct object GET works, listing is
        denied). Four downloaded NA files matched community MD5s exactly.
  - [ ] **EU/ADR** return 403 there. Options: the paid official EU portal (`mazdashare.com/mtds`), the
        124spider.org Google-Drive bundles (free, alive, verified byte-for-byte against the community
        hashes), resellers (€29–39).
  - [ ] State the site's position: **this project hosts nothing.** It publishes hashes and provenance so
        you can verify whatever you obtained, wherever you obtained it.
- [ ] **The hash tables** — per region, failsafe and reinstall, SHA256 + MD5, with which community source
      each published hash comes from.
- [ ] **`HashVerifier`** with a plain explanation: pick your file, the browser computes SHA-256 locally,
      nothing is uploaded anywhere. Warn that a 2.3 GB file takes a while.
- [ ] **How to test the USB stick before flashing** — H2testw, from the recovered ASH8 document
      (`research/archive/recovered/`). A failing stick is the single most common cause of a failed flash,
      and a failed flash can brick the unit. This belongs here, not buried in the procedure.
- [ ] Note what cannot be verified by scanning: the three large images exceed VirusTotal's cap entirely.
- [ ] ⚠️ Carry the EU caveat honestly: the two sources agreeing on the EU reinstall MD5 are both Google
      Drive re-hosts and may share an upstream — corroboration, not independence. The **ADR** pair is
      stronger.

## Done when

- [ ] Every version in the matrix has an anchor and is linked from at least one other page.
- [ ] `HashVerifier` correctly identifies a known local file and correctly reports an unknown one.
- [ ] With JS disabled, the full matrix, the full source list and the full hash tables are all visible.
