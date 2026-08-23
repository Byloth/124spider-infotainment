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
  ameridan/                – the 12 MediaFire tweak packages + Mazda's update-procedure PDF
  tweaks/                  – ID7_Recovery_XX.zip, mzd-connect-1-root-main.zip
  guides/                  – 68wooley's PDF guide zip
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

## Key findings from the research phase (2026-08-23)

Read `research/` before doing anything; the headlines:

- **Mazda's own dealer CDN is still open for NA files**: `https://s3.amazonaws.com/tsd.mazdausa.com/
  MAZDA_CONNECT/<file>` (direct object GET; listing denied; **EU/ADR return 403**). Four downloaded NA
  files matched the community-published MD5s exactly → genuine, unmodified, free. **EU is the open gap**
  and the maintainer's car is EU.
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

- 2026-08-23: repo bootstrapped; **research phase complete** — six consolidated docs in `research/`,
  ~430 archived pages, 2.9 GB of binaries collected and hashed.
- **Next decisions (not yet taken):** (1) source verified EU firmware; (2) VirusTotal/manual scan of
  everything in `downloads/`; (3) VitePress scaffold + page structure; (4) where/whether to publish the
  binaries (Mazda firmware is proprietary — takedown risk is precisely why every historic mirror died).
