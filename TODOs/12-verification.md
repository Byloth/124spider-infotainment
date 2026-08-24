# 12 · Verification

The acceptance checklist for the site. Run before calling any section finished, and in full before
considering the documentation complete.

---

## Automated

- [ ] `npm run lint` clean.
- [ ] `npm run typecheck` (`vue-tsc --noEmit`) clean.
- [ ] `npm run docs:build` green. **This is also the dead-link checker** — VitePress fails the build on a
      broken internal link, which is exactly the behaviour this project wants.
- [ ] The husky pre-commit hook runs all three and blocks a deliberately broken commit.
- [ ] `grep -L 'script lang="ts" setup' docs/.vitepress/theme/components/*.vue` returns nothing —
      catches the easy slip back into `<script setup lang="ts">`.
- [ ] `grep -rn 'style lang="scss" scoped' docs/.vitepress/theme/components/` matches every component.
- [ ] No hardcoded colour in any component: grep for `#` hex literals and `rgb(` in
      `docs/.vitepress/theme/` and confirm every hit is inside a token definition in `custom.css`.

## Manual — the ones that actually catch problems

- [ ] **JavaScript disabled.** Load every page carrying a component. Every route, every market, every
      matrix row, the whole failure catalogue and every source must still be visible. A component that
      hides content without JS is a bug, not a limitation.
- [ ] **Server-rendered output.** Inspect `docs/.vitepress/dist/**/*.html` directly, not just the dev
      server — confirm the neutral show-everything state is in the emitted HTML.
- [ ] **Dark mode.** Toggle on every page. No component may define a colour outside `var(--vp-*)`.
      Check the brand red in particular: `#8c1007` is dark, and its dark-mode counterpart must be a
      lighter, desaturated red or it will be unreadable.
- [ ] **Responsive** at 375 / 768 / 1440 px. Tables are the usual failure: the firmware matrix, the source
      table and the hash tables must scroll or reflow rather than overflow the page.
- [ ] **Keyboard only.** Tab through the wizard, the filters, the checklists and `GlossaryTip`. Focus must
      be visible everywhere (do not remove the theme's outlines).
- [ ] **`HashVerifier`, properly exercised:**
  - [ ] A known file matches — use the EU failsafe (MD5 `cc485f4f16541cd803f615df42dc3512`, SHA256 in
        `downloads/CHECKSUMS.sha256`).
  - [ ] An unknown file reports "not recognised" calmly, without implying it is dangerous.
  - [ ] **A 2.3 GB file completes** — this is the real test. If it was implemented with a single
        `ArrayBuffer` read it will fail here.
  - [ ] Progress indication is visible throughout.
  - [ ] Confirm in the browser's network tab that **nothing is uploaded**.
- [ ] **Profile round-trip.** Set it in the wizard → confirm the procedure, firmware and hardware pages
      react → `reset()` → confirm everything returns to the neutral state.
- [ ] **Local search** returns sensible results for the terms a reader will actually type:
      "carplay", "70.00.100", "brick", "ID7", "black screen", "EU firmware".

## Content integrity — the checks specific to this project

- [ ] Every `[X-nn]` citation resolves to a row on `/reference/sources`.
- [ ] Every file named on any page resolves to a row on `/reference/inventory`.
- [ ] Every firmware version string links to its matrix anchor.
- [ ] **Confidence markers survived the port.** Spot-check ten claims that are ⚠️ or ❓ in the research
      documents and confirm the pages did not quietly flatten them into certainty. This is the failure
      mode most likely to make the site actively harmful.
- [ ] The untested-on-hardware caveat is present on every `/procedure/` page.
- [ ] Attribution to the original community authors is visible on `/reference/sources`.
- [ ] No page tailors its advice to one market or one starting version — the documentation is generic by
      design (see `CLAUDE.md`).

## Done when

- [ ] Everything above passes, and a person who has never seen the repository can follow the site from
      `/guide/` to a finished, verified installation without needing the research documents.
