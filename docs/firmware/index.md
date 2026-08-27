---
title: Firmware version matrix
---

<script lang="ts" setup>
import FirmwareMatrix from "@theme/components/FirmwareMatrix.vue";
import SourceCite from "@theme/components/SourceCite.vue";

import { FIRMWARE, POINTS_OF_NO_RETURN } from "../.vitepress/data/firmware";
</script>

# Firmware version matrix

Almost every decision in this upgrade turns on one number: the firmware version your car is running now,
and the one you are trying to reach. The version decides whether CarPlay and Android Auto are even
possible, whether you can still get a tweak onto the car, and — the part that catches people out —
whether a step you are about to take can ever be undone.

This page is the reference the rest of the site links into. It lists every build the 124 community has
identified, **{{ FIRMWARE.length }} in all**, across the four regional lineages. Read one sentence before
anything else:

**The target is 70.00.100A — deliberately not the newest version.** It is the last build where ID7 v1
still works and where the Fiat rebranding tool installs unmodified<SourceCite ids="B-01,A-01,A-02" />.
Every later release closes a door, and there are **{{ POINTS_OF_NO_RETURN.length }} of those doors** that
do not reopen — see [points of no return](/firmware/points-of-no-return).

## The matrix

The table below reads on any device with scripting disabled — it is the whole matrix, every column, in
source order. With scripting on it gains a search box, a market filter, and it will highlight your own
car's row if you have told the site which version it runs. It never hides a row you have not filtered for;
everything here is visible to everyone.

Each cell states its confidence in words, not colour: an unadorned *yes* or *no* is a settled fact, *one
report only* is a single unconfirmed sighting, and *sources disagree* is a genuine contradiction the
research could not resolve. Those markers are load-bearing. Where a route is *no report*, that means
nobody has documented it either way — not that it fails.

<FirmwareMatrix />

## The rows that carry weight

Most of the {{ FIRMWARE.length }} builds are context. These few are the ones a route actually pivots on.

### 56.00.521 / 56.00.530 — the last chance to install ID7 {#v56}

The factory firmware of MY2017 and early-2018 cars, and **the one version where ID7 v1 can still be
installed straight from a USB stick**<SourceCite ids="B-01" />. If your car left the factory here and ID7
was put on then, it carries across later flashes. If it did not, this door is already shut — 59.00.502
closed it — and you are into the serial or mp3 routes instead.

### 59.00.502 — the lock {#v59-00-502}

Mazda, June 2017. This build patched the USB-autorun hole, and **plain side-loading dies
here**<SourceCite ids="C2-10,C2-16" />. It is also a *downgrade floor*: nothing below this version can be
reached over USB again. If your car was born on any 59.00.5xx or later, rolling back beneath it needs an
SPI-NOR programmer, not a firmware file. This is [point of no return #1](/firmware/points-of-no-return).

### 59.00.524 / 562 / 563 — the "latest Fiat firmware" trap {#v59-fiat}

These are Fiat-badged builds, 124-only, and the newest firmware Fiat ever shipped for the
car<SourceCite ids="B-01,A-01" />. They look like the safe, up-to-date choice and they are the opposite:
**no CarPlay, and already tweak-locked.** 59.00.562/563 are the factory firmware of MY2019–2020 cars and
arrive on many replacement head units, which is how owners most often get stuck here. "Install the latest
Fiat update" is the single most expensive piece of bad advice around this upgrade.

### 70.00.100A — the target {#v70-00-100a}

The version the whole community standardised on<SourceCite ids="B-01,A-01,A-02" />. Native CarPlay and
Android Auto, ID7 v1 still survives a flash, and the mp3 method is confirmed working here. Crucially, the
Fiat rebranding tool `MazdaToFiatV70AIO` runs unmodified only up to this build — its own script accepts
`70.00.xxx` with an extension of 100 or lower and refuses anything higher. It is the last two-file build
on the 124 path. If you have a free choice of destination, this is it.

### 70.00.335 / 352 / 367 — the shutdown, in three acts {#v70-locks}

335C runs `neutralizeid7` and a forced `passwdupdate`: it **deletes ID7 and the serial
credentials**<SourceCite ids="C2-11,C2-14" />. 352B behaves the same and is the last build where ID7 v2
can still be pasted in during the flash. 367A removes the serial login entirely, and because updates from
here on are signed, repacking them is infeasible. These are [points of no return #2 and
#3](/firmware/points-of-no-return); the mp3 method is the only reported way past them, and outside a
couple of builds the evidence for it is thin.

### 74.00.324A — the last build there will ever be {#v74-00-324a}

The final MZD-Connect-1 firmware, November 2022<SourceCite ids="B-01,C2-17" />. The mp3 method is
confirmed on it. Reaching it is a one-way trip in one respect: from 74.00.310 upward, USB can no longer
take the car below 74.00.310 ([point of no return #4](/firmware/points-of-no-return)). 74.00.331 exists
above it but is not recommended — tweaking it is reported to disable wireless CarPlay.

## There is no way back to a Fiat badge in software

One fact frames the entire project. **Fiat never released a firmware above the 59 series** — no v70, no
CarPlay build, nothing<SourceCite ids="B-01" />. The whole procedure is therefore "flash *Mazda*
firmware, then rebrand it to look like a Fiat again." There is no stock-Fiat image to return to. If you
want your car back to exactly how it left the dealer, the honest answer is that the closest you can get is
the rebranding tool making Mazda firmware wear a Fiat face — which is what the
[rebrand step](/procedure/rebrand) does.

---

**Related:** [points of no return](/firmware/points-of-no-return) ·
[regions and file naming](/firmware/regions) · [obtaining and verifying files](/firmware/obtaining) ·
[what the tweaks leave on your car](/security/)
