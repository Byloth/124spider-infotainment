# 11 · Pages — Reference

The backing material: where every claim comes from, what every file is, what is still unknown, and what
the vocabulary means. Written last, because it indexes everything else.

Backing: `research/SOURCES.md` · `research/INVENTORY.md` · `research/OPEN-QUESTIONS.md`.

---

## `/reference/index.md` — How to read this documentation

- [ ] **The confidence markers**, explained once for the whole site: ✅ confirmed by two or more
      independent sources · ⚠️ single report or unverified · ❓ sources contradict each other. A reader
      must know that these are load-bearing, not decoration.
- [ ] **What "verified" means here** — the project's own definition: a SHA256 matching two or more
      independent community-reported hashes, **or** obtained from the original author/first-party host,
      **and** a clean malware check. Anything less is "collected". Say plainly that some files can never
      reach "verified" because they exceed every scanner's size limit.
- [ ] **The standing caveat:** nothing on this site has been tested on a car by this project.
- [ ] The citation scheme: `[A-nn]` 124spider.org · `[B-nn]` Ameridan's blog · `[C1/C2-nn]` tooling and
      compatibility · `[D-nn]` firmware availability · `[E-nn]` hardware · `[F-nn]` rollback and failures.
- [ ] Note that the site is a distillation and the research documents in the repository are the full
      record, with per-post detail the pages deliberately drop.

## `/reference/sources.md` — Sources

- [ ] Mount **`SourceTable`** over a static rendering of all 198 entries.
- [ ] Filters: category, link status, trust level.
- [ ] **The access reality, stated up front** — it explains why so many entries read "archived copy":
      the pillar forums (124spider.org, mazda3revolution, mazdas247, mazda6club) now answer a JavaScript
      proof-of-work challenge and redirect scripted fetchers to a paywall; forum.miata.net is login-walled.
      Most of this research was read from Wayback captures.
- [ ] Mark dead, hijacked and login-walled sources unmistakably — link `/security/link-safety`.
- [ ] Credit properly: 68wooley, Ameridan, Trezdog44/Trevelopment, id7, ASH8, madfiat, 124geek,
      Tristan-cx5 and the rest did this work first. The site is a distillation of theirs; say so
      prominently, not in a footnote.

## `/reference/inventory.md` — File inventory

- [ ] Mount **`HashTable`** over static tables.
- [ ] Group by kind: firmware images · tweak packages · guides and documents · hardware parts.
- [ ] Per file: name, region, version, size, SHA256, MD5, status, provenance, scan result.
- [ ] The status vocabulary, explained inline (`verified` / `verified-pending-AV` / `collected` /
      `known-hash` / `known-to-exist` / `paywalled` / `lost`).
- [ ] Copy-to-clipboard on every hash — the reader is going to paste these.
- [ ] Link `/firmware/obtaining` for the verifier.

## `/reference/open-questions.md` — Open questions

- [ ] The honest ledger: what is unknown, what sources contradict, what only a car can answer.
- [ ] Include the ones that matter to a reader making a decision: whether 70.00.100 can be flashed over
      Fiat 59.00.562/563 (no first-hand report found) · how far the mp3 method really reaches · whether it
      needs the new hub for the keyboard · downgrade file order · the unidentified `adb` binary in ID7 v2.
- [ ] Also the ones a contributor could close: sources that need a human with a browser or a forum login
      (the miata.net thread that originated the mp3 method, several 124spider.org threads with no Wayback
      capture, the Scribd EU hash document).
- [ ] Frame it as an invitation: this is where someone with the right car or the right login can help.

## `/reference/glossary.md` — Glossary

- [ ] Every term `GlossaryTip` can reference, from `glossary.data.ts`.
- [ ] Minimum: CMU · MZD Connect · JCI · ID7 (v1 and v2) · NNG / iGO · failsafe vs reinstall vs update
      package · ADR / 4A · TAU · `neutralizeid7` · `passwdupdate` · the mp3 method · SPI-NOR /
      boot-select · MZD-AIO · MazdaToFiatV70AIO · CSP02 · H2testw · region suffix N vs M.
- [ ] Each definition one paragraph, written for someone who has never opened a car's dashboard.

## `/reference/changelog.md` — Changelog *(new page)*

- [ ] What changed in the documentation and when — dated entries, newest first.
- [ ] Seed it with what already happened: research phase completed 2026-08-23 · EU and ADR firmware
      acquired and hash-verified · the tweak-script review and its findings · the antivirus pass ·
      the hijacked-domain discovery (2026-08-24).
- [ ] Purpose beyond housekeeping: a reader who followed this guide six months ago needs to know what has
      since been corrected. In a field where every other guide silently rots, a dated changelog is itself
      a trust signal.
- [ ] Add the page to the `/reference/` sidebar in `docs/.vitepress/config.mts`.

## Done when

- [ ] Every `[X-nn]` id cited anywhere on the site resolves to a row on `/reference/sources`.
- [ ] Every file named anywhere resolves to a row on `/reference/inventory`.
- [ ] Attribution to the original community authors is visible, not buried.
- [ ] All tables render fully with JS disabled.
