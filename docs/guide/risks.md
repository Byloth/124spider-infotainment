---
title: Risks and one-way doors
---

<script lang="ts" setup>
import VersionTimeline from "@theme/components/diagrams/VersionTimeline.vue";
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Risks and one-way doors

Two kinds of thing can go wrong, and they are not the same. One is **reversible with a version number** —
you flashed too far and closed a door, and getting back means understanding which doors are one-way. The
other is **a brick** — the unit boots nothing at all. This page explains both plainly, because the brick
in particular is preventable once you understand how it happens.

## The one-way doors

There are four version thresholds that cannot be walked back. Cross one without meaning to and the route
you were counting on is simply gone. In short:

- **59.00.502** — USB side-loading closes, and you can no longer downgrade below it.
- **70.00.335** — the firmware deletes ID7 and the serial credentials.
- **70.00.367** — serial login itself dies; updates are signed.
- **74.00.310** — you can no longer return to v70 over USB.

<VersionTimeline />

Each of these is set out in full — what it closes and whether anything reopens it — on
[points of no return](/firmware/points-of-no-return). The practical consequence is the reason this whole
guide targets [70.00.100A](/firmware/#v70-00-100a) rather than the newest firmware: it keeps you on the
near side of every one of these lines.

## The brick, and exactly how it happens

The catastrophic outcome is a **black screen with the radio still playing and every control dead**. It has
one common cause, and understanding it is most of avoiding it.

A firmware release for the 124 is **two packages**<SourceCite ids="B-01" />:

1. the **failsafe** (~7 MB) rewrites the bootloader and updater, and installs **first**;
2. the **reinstall** (0.9–2.3 GB) rewrites the operating system, and installs **second**.

Between the two, the unit has a *new updater but no operating system*. If it loses power in that window,
it can boot neither half — hence the black screen. The usual trigger is not a slip of the hand: the car's
accessory power **times out at about 25 minutes**, and the reinstall takes longer than that. So the unit
switches itself off mid-flash unless you keep it awake<SourceCite ids="F-49" />.

::: danger Keep the unit powered through the whole flash
Press and release the clutch (manual) or brake (automatic) **right after the failsafe finishes, and again
roughly every 20 minutes**, to reset the accessory timeout. **Never turn the ignition off during the
process.** A battery charger or tender is Mazda's own requirement for the job. Losing power between the
failsafe and the reinstall is the classic brick, and it is entirely preventable.
:::

## What recovery actually costs

If it does brick, it is **not recoverable from the driver's seat** — but it is usually recoverable on the
bench<SourceCite ids="F-49" />:

| Route | Cost | What it involves |
| --- | --- | --- |
| **SPI-NOR programmer** | **under €50** | A CH341A programmer and a SOIC16 clip (3.3 V). Write `0x00` at offset `0x010000` so the unit boots the failsafe, then feed it the reinstall. Some nerve required. |
| **Used replacement CMU** | **€190–600** | Any MZD-1 unit is plug-and-play; you then run the upgrade on it. |
| **New CMU** | **€1000–1500** | Dealer part. |

**A dealer will replace the unit; a dealer will not un-brick it.** The full bench procedure is on
[recovering a bricked unit](/recovery/brick).

## What is reversible, stated fairly

It is worth being clear about which half of this upgrade you can undo:

- **The hardware change is fully reversible.** Refit the original USB hub and the car works exactly as it
  did — you simply lose CarPlay/AA again. Nothing about the retrofit is permanent.
- **The firmware change largely is not.** There is no stock-Fiat image to flash back (Fiat never made a
  v70), and several of the version thresholds above are one-way. You can move *within* a band, but you
  cannot generally return the car to how it left the factory.

Going in knowing that asymmetry — cheap, reversible hardware over one-way, un-stock-able firmware — is the
honest basis for deciding whether to start at all.

---

**Related:** [start here](/guide/) · [what you gain and lose](/guide/what-changes) ·
[which route is mine?](/guide/route) · [points of no return](/firmware/points-of-no-return) ·
[recovering a bricked unit](/recovery/brick)
