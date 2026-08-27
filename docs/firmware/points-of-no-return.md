---
title: Points of no return
---

<script lang="ts" setup>
import VersionTimeline from "@theme/components/diagrams/VersionTimeline.vue";
import SourceCite from "@theme/components/SourceCite.vue";

import { POINTS_OF_NO_RETURN } from "../.vitepress/data/firmware";
</script>

# Points of no return

Most firmware changes can be walked back: flash up, flash down, try again. **{{ POINTS_OF_NO_RETURN.length }}
of them cannot.** Each one permanently removes something — the ability to side-load, the ID7 credentials,
the serial login, or a downgrade path — and no firmware file puts it back. Cross one without meaning to
and the route you were counting on is simply gone.

This is the page to read *before* you flash anything newer than you need to, because the entire logic of
targeting [70.00.100A](/firmware/#v70-00-100a) rather than the newest build is about staying on the near
side of these lines.

## The four thresholds

### 1 · 59.00.502 — USB side-loading closes {#pnr-1}

Mazda's June 2017 build patched the hole that let the car autorun a script from a USB
stick<SourceCite ids="C2-10,C2-16" />. After it, a plain tweak stick does nothing on its own — you need
ID7 (installed earlier, on 56.x), a serial console, or the mp3 method to get a payload to run.

It is also a **downgrade floor**: once the car has been on any 59.00.5xx or later, USB cannot take it
below 59.00.502. *"If your car was born with any 59.00.xxxx or above, do not try to roll back below it"* —
the only way under this line is an SPI-NOR programmer on the bench. **What reopens it:** nothing, in
software.

### 2 · 70.00.335 — ID7 and the serial credentials are deleted {#pnr-2}

335C does not merely fail to support ID7; it actively runs `neutralizeid7` and a forced `passwdupdate`
that **delete ID7 v1, delete any pre-installed "v2", and remove the serial
credentials**<SourceCite ids="C2-11,C2-14" />. This is the first single-file `update.up`.

After it, the only classic way to run tweaks is to attach a serial console *during the flash* and paste
the ID7 v2 commands before the first reboot — and to repeat that after every subsequent flash, because
each one neutralises it again. **What reopens it:** downgrading to 70.00.100 does **not** restore
tweaking — the credentials are already gone<SourceCite ids="A-03" />. Only re-installing at 352/335 with a
serial console attached brings ID7 v2 back.

### 3 · 70.00.367 — serial login itself dies {#pnr-3}

367A goes further than 335: the **serial login credentials are gone entirely**, so even the
console-during-flash route is closed, and updates from here are signed — repacking a modified image is
infeasible<SourceCite ids="C2-14" />. This is the last v70 build. **What reopens it:** downgrade to
70.00.352 or 335 (this is still possible over USB), then do ID7 v2 at install there.

### 4 · 74.00.310 — the road back to v70 closes {#pnr-4}

From 74.00.310 upward, **USB can no longer take the car below 74.00.310**<SourceCite ids="C2-17,F-19" />.
74.00.230 was still downgradable to v70 on the bench; from 310 the floor rises and v70 is out of USB
reach. **What reopens it:** only SPI-NOR surgery — a 70.00.100 failsafe dump written with a hardware
programmer and the boot-select flipped. Not a field procedure.

## The timeline

The diagram places the four thresholds against the version line, with the two downgrade floors marked. It
carries its own written description; the four sections above are the reading path with scripting off.

<VersionTimeline />

## What 2025 changed — and what it did not

Almost every guide written before mid-2025 states one rule: **"70.00.335 and up can never be tweaked
again — install ID7 first or lose the ability forever."** For years that was true. It is the single thing
those guides now get wrong, because they predate the mp3 method<SourceCite ids="C2-17,B-01" />.

The **mp3 method** runs a tweak payload through the unit's own JCI diagnostic terminal, triggered by fake
MP3 files and driven with a USB keyboard — **with neither ID7 nor a serial console**. If it works on a
locked build, then that build's "point of no return" is, for *tweaking* purposes, not absolute.

The honest state of the evidence, version by version:

| Build | mp3 method | Confidence |
| --- | --- | --- |
| 70.00.100 | works | ✅ confirmed by several 124 owners |
| 74.00.324 / 74.00.311 | works | ✅ confirmed (needs a few script line-edits) |
| 59.00.563 | reported to open the shell on factory Fiat 59 | ⚠️ single report |
| 70.00.367 | reported tweaks applied, April 2026 | ⚠️ single report |
| 70.00.335 | **one owner could not get it to run** | ⚠️ single failure, cause not isolated |

::: warning Hold both facts at once
This does **not** mean the points of no return are cancelled. The downgrade floors (#1 and #4) are about
*version movement* and are unaffected by any of this — you still cannot get below 59.00.502 or 74.00.310
over USB, mp3 method or not. And for *tweak access* on the locked builds, the evidence outside 70.00.100
and the 74.x builds is one forum post deep, including one owner on 70.00.335 for whom it simply did not
run.

So: **treat the classic rule as the safe assumption, and the mp3 method as a documented-but-thin
escape** — never as a reason to flash past a threshold expecting to walk it back. If tweak access
matters to you and you have a choice, still get onto the near side of the line first.
:::

## What each escape costs

Getting past a threshold is not free even when it works. ID7 leaves three root accounts and a permanent
SSH service on the car; the serial route means taking the dashboard apart; the mp3 method leaves nothing
behind but is the least proven. Those trade-offs are set out in full on
[what the tweaks leave on your car](/security/) — read it before choosing a route past any of these lines.

---

**Related:** [firmware version matrix](/firmware/) · [regions and file naming](/firmware/regions) ·
[what the tweaks leave on your car](/security/) · [obtaining and verifying files](/firmware/obtaining)
