# 99 · Deferred

Explicitly out of scope until the documentation site is finished. Recorded here so they stop resurfacing
in every planning conversation — each one is a real decision, just not this one.

---

## Deployment

- [ ] Choose a target. Currently **local only**: `base: '/'`, no CI workflow.
- [ ] If GitHub Pages as a project site: `base: '/124spider-infotainment/'` plus a Actions workflow.
      A custom domain or a `<user>.github.io` repo changes the base again.
- [ ] Consider whether a takedown-resistant host matters here. The site itself carries no binaries, only
      hashes and prose, so the exposure is low — but the subject matter is proprietary firmware and every
      historic mirror in this community died for exactly that reason.
- [ ] Whatever is chosen, the deploy decision changes one config line and adds one workflow file. It is
      deliberately cheap to defer.

## Internationalisation

- [ ] Italian, most likely, given the audience overlap.
- [ ] The scaffold is already prepared: English lives at the root of `docs/` on purpose, because VitePress
      keeps the root locale in place and gives additional locales their own subdirectory. Adding Italian
      needs a `locales` key in `config.mts` and no file moves.
- [ ] Do this only once the English content is stable. Translating a moving target doubles the work and
      guarantees the two drift.
- [ ] Note the tension to resolve later: safety-critical warnings must not depend on a translation being
      up to date. Consider marking untranslated pages rather than serving stale ones.

## Hosting the binaries

- [ ] Still open. Current position: **the site hosts nothing** — hashes and provenance only, with
      `HashVerifier` so a reader can check whatever they obtained from wherever.
- [ ] On **Mega.nz** specifically, since it was raised: it is a poor bet *for this content*, and our own
      research is the evidence — every historic MEGA folder in this community is dead or empty (ASH8's
      2018 folder, Ameridan's 2021 one). Add its transfer quotas on 2.3 GB files and readers hit a wall
      before they hit a takedown.
- [ ] The design that survives is not a host at all, it is `links.data.ts`:
  - [ ] **NA needs no mirror** — Mazda's own dealer CDN still serves it, first-party and free.
  - [ ] **EU/ADR**: list every known source ranked with its status, rather than betting on one.
  - [ ] **A torrent** (magnet + webseed) is the only mirror that cannot be taken down with its host: the
        magnet is a line of text in git, and it can be seeded by whoever cares.
  - [ ] Any choice is then **one row in a data file**, so a dead link is a five-minute fix.
- [ ] Whatever is decided, keep the principle: the project's value is the verification, not the bytes.

## The maintainer's own car

- [ ] **A separate task, to be started only once the site is finished.** One thing at a time.
- [ ] It is not a prerequisite for any page: the documentation is generic by design and must serve every
      market and every starting version equally (see `CLAUDE.md`).
- [ ] When it does start: read the exact version string, pick the route from the finished guide, and treat
      the whole thing as the site's first real-world test — the results feed back into the pages,
      especially the open questions the sources could not settle.
- [ ] The car is an EU Abarth 124 Spider, retrofit kit not yet fitted. The EU 70.00.100A pair is already
      held and hash-verified.

## Nice-to-have, unprioritised

- [ ] A printable one-page checklist for use in the car (offline, no phone signal in a garage).
- [ ] Offline/PWA support for the same reason.
- [ ] Contribution guide: how someone with a different car or a forum login can close an open question.
- [ ] Re-check external link health periodically and update `links.data.ts` — decay is the project's
      permanent adversary.
