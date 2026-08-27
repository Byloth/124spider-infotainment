# 124 Spider Infotainment 🏎️

[![Publish on GitHub Pages](https://github.com/Byloth/124spider-infotainment/actions/workflows/publish.yml/badge.svg)](https://github.com/Byloth/124spider-infotainment/actions/workflows/publish.yml)
[![Live site](https://img.shields.io/badge/live-byloth.github.io-8c1007)](https://byloth.github.io/124spider-infotainment/)
[![Built with VitePress](https://img.shields.io/badge/built%20with-VitePress-5c73e7)](https://vitepress.dev/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

Everything needed to bring **Apple CarPlay and Android Auto** to the infotainment unit of a
**Fiat / Abarth 124 Spider (2016–2019)** — by flashing the Mazda firmware the shared Johnson Controls
head unit was always capable of running, then rebranding it back to a Fiat.

A single, versioned, sourced and hash-verified knowledge base, honest about what is still unproven.

> 📖 **Read it here → <https://byloth.github.io/124spider-infotainment/>**

## ⚠️ Work in progress — and untested on hardware

Two things to know before relying on any of it:

- **It is still being written.** The security, firmware and "Start here" sections are finished prose;
  the procedure, hardware, recovery and reference sections are still stubs. Every stub says so at the top.
- **Nothing here has been tested on a real car by the author yet.** It is a careful synthesis of
  community reports and Mazda's own documents — not a first-hand account. It *will* be: the maintainer
  owns an EU Abarth 124 Spider intended as the first real-world test, once the documentation is complete.
  Until then, treat every procedure as unproven and cross-check it against the sources it cites.

## Why this exists

The knowledge is scattered across forum threads, a personal blog and file hosts that are steadily going
dead, much of it written years ago and quietly outdated. This project collects it, dates it, says which
parts still hold — and, crucially:

- 🔗 **Every claim carries its source.** 231 registered sources, each with its link status and how far it
  can be trusted. Where sources contradict, both are shown rather than one being silently chosen.
- #️⃣ **Files are identified, not just linked.** Firmware and tweak packages are recorded by SHA-256 with
  their provenance, so a genuine Mazda image can be told from a re-host of unknown history.
- 🧱 **It is honest about the risk.** This procedure has bricked cars, and some steps cannot be undone.
  Failure modes, recovery routes and the points of no return are documented as prominently as the happy
  path.

## Scope

For 124 Spider owners with the **7-inch display**. The unit is the same CMU used in the Mazda MX-5 ND,
so Mazda sources apply directly and are used throughout. All markets are covered — **EU, North America,
ADR and Japan**. Mazda owners should go to a dealer; this exists because Fiat never released the firmware
that Mazda did.

## Repository layout

| Path | What it holds |
| --- | --- |
| `research/` | The source of truth: the firmware matrix, the 231-source registry, the file inventory, the reconstructed procedure and the open questions — all archived and hashed. |
| `docs/` | The VitePress site that distils `research/` into reader-facing pages. |
| `docs/.vitepress/data/` | Seven typed data modules (firmware, files, sources, parts, links, failures, glossary) the pages and components draw from. |
| `tests/` | Vitest suite — data invariants, the resolver logic and the diagrams. |
| `TODOs/` | The backlog, one file per phase; `TODOs/README.md` is its index and current-state summary. |
| `downloads/` | The collected binaries — git-ignored; only `CHECKSUMS.sha256` and its README are tracked. |

## Local development

Built with [VitePress](https://vitepress.dev/), using [Bun](https://bun.sh/) and Node 24.

```bash
bun install          # install dependencies
bun run docs:dev     # serve locally with hot reload
bun run docs:build   # build the static site (also the dead-link checker)
bun run docs:preview # preview the production build
```

The quality gate — run on every commit (husky) and in CI before anything is published:

```bash
bun run lint         # ESLint (@byloth/eslint-config-nuxt)
bun run typecheck    # vue-tsc
bun run test         # Vitest
bun run docs:build   # fails on dead links by design
```

## Deployment

Every push to `master` triggers [`.github/workflows/publish.yml`](./.github/workflows/publish.yml), which
runs the full quality gate and, only if it passes, publishes the site to GitHub Pages at
<https://byloth.github.io/124spider-infotainment/>. A broken build never reaches production.

## Contributing

Corrections and first-hand reports are especially welcome — a confirmed success or failure on a specific
firmware version is worth more than any amount of reconstruction. Open an
[issue](https://github.com/Byloth/124spider-infotainment/issues) or a pull request. If you touch the data,
`bun run verify:data` re-checks the hashes and citation coverage.

## License

Released under the [Apache-2.0](./LICENSE) license.

Mazda firmware and Johnson Controls software referenced here remain the property of their respective
owners; this project redistributes none of it and only records how to identify and verify what you obtain
elsewhere.

---

Made with care by [Matteo Bilotta](https://www.byloth.dev/) 🏁
