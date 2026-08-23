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

Owner context: the maintainer has an EU Abarth 124 Spider on 59.xx firmware, retrofit kit not yet
installed — the car is the test bench; nothing can be verified on hardware by Claude.

## Hard constraints / ground truth to keep in mind

- Firmware is **region-locked**; files carry a region suffix. Wrong region = brick risk.
- Mazda **70.00.335+ neutralises the ID7 tweak / serial access**; 70.00.367 reportedly cannot be
  serial-enabled at all. Anyone already on 70.00.335+ *without* ID7 installed beforehand can no
  longer side-load tweaks (logo/nav fix). This must be stated as a prominent disclaimer everywhere.
- Fiat-specific 59.00.5xx firmware newer than the factory one exists (e.g. 59.00.562/563-NA) and is
  reported to break CarPlay/AA compatibility — treat "latest Fiat firmware" as a trap, verify.
- Online sources are decaying (dead links, re-hosted/"hacked" files). Every source must be archived
  (Wayback / local copy) and every file hashed. Never present an unverified file as verified.

## Repository layout

```
CLAUDE.md                  – this file (keep it updated when scope/layout/status changes)
research/                  – phase 1 deliverables (plain Markdown, later fed into the site)
  SOURCES.md               – every source: URL, type, author, dates, coverage, link status, archive
  INVENTORY.md             – every file/artifact: firmware, tweaks, PDFs, hardware part numbers
  FIRMWARE-MATRIX.md       – version × region matrix, upgrade/downgrade paths, point of no return
  PROCEDURE-DRAFT.md       – reconstructed end-to-end procedure, each step cites a source
  OPEN-QUESTIONS.md        – unknowns, contradictions, lost material, what to test on the car
  raw/                     – per-theme raw research notes written by research agents
  archive/                 – local copies of key web pages / PDFs
downloads/                 – git-ignored binaries; CHECKSUMS.sha256 + README.md are tracked
```

No site scaffold yet. Planned: VitePress (`npm`), Node is available via nvm (v24).

## Conventions

- Language of all docs: English. Commit messages: English.
- Every factual claim in research docs cites its source (`[S-nn]` id from `SOURCES.md`).
- Every file in `downloads/` is listed in `research/INVENTORY.md` and hashed in
  `downloads/CHECKSUMS.sha256` (`sha256sum <file> >> downloads/CHECKSUMS.sha256`).
- "Verified" in this repo means: SHA256 matches ≥2 independent community-reported hashes **or** the
  file was obtained from its original author, **and** a VirusTotal hash lookup is clean. Anything
  less is "collected" / "unverified".
- Mark unverified or contradictory statements explicitly (`⚠️ unverified`, `❓ contradictory`).

## Status

- 2026-08-23: repo bootstrapped; research sweep (sources, inventory, firmware matrix, procedure
  draft, open questions) in progress. Next decision after research: VitePress scaffold + where to
  publish binaries.
