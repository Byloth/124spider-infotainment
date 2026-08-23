---
layout: home

hero:
  name: 124 Spider Infotainment
  text: CarPlay and Android Auto, properly documented
  tagline: >-
    Everything needed to upgrade the infotainment unit of a Fiat or Abarth 124 Spider from the
    factory Fiat firmware to Mazda firmware — collected in one place, sourced, hashed and honest
    about what is still unverified.
  actions:
    - theme: brand
      text: Start here
      link: /guide/
    - theme: alt
      text: The procedure
      link: /procedure/
    - theme: alt
      text: Firmware matrix
      link: /firmware/

features:
  - title: One source instead of forty
    details: >-
      The knowledge is scattered across forum threads, a personal blog and dead file hosts, much of it
      written years ago and quietly outdated. This collects it, dates it, and says which parts still hold.
  - title: Every claim carries its source
    details: >-
      231 registered sources, each with its link status and how much it can be trusted. Where sources
      contradict each other, both are shown rather than one being silently picked.
  - title: Files identified, not just linked
    details: >-
      Firmware and tweak packages are recorded by SHA256 with their provenance, so you can tell a genuine
      Mazda image from a re-hosted copy of unknown history.
  - title: Honest about the risk
    details: >-
      This procedure has bricked cars. Some steps cannot be undone. Failure modes, recovery routes and the
      points of no return are documented as prominently as the happy path.
---

## This site is being written

The research behind it is complete — sources, firmware matrix, procedure reconstruction, inventory and
open questions all live in the repository under `research/`. What you are looking at is the structure
those findings are being moved into. **The pages are still empty.**

Until they are written, the working documents are the real content:

| Document | What it holds |
| --- | --- |
| `research/PROCEDURE-DRAFT.md` | The reconstructed end-to-end procedure |
| `research/FIRMWARE-MATRIX.md` | Version × region matrix and the points of no return |
| `research/INVENTORY.md` | Every file and part, with hashes and status |
| `research/SOURCES.md` | The 231-source registry |
| `research/OPEN-QUESTIONS.md` | What is still unknown, contradictory or lost |

## Scope

For **Fiat and Abarth 124 Spider (2016–2019)** owners with the 7-inch display. The unit is the same
Johnson Controls CMU used in the Mazda MX-5 ND, so Mazda sources apply directly and are used throughout.
Mazda owners should go to a dealer — this exists because Fiat never released the firmware that Mazda did.

All markets are covered: EU, North America, ADR and Japan.
