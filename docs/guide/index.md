---
title: Start here
---

<script lang="ts" setup>
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Start here

You are here because you want CarPlay or Android Auto in a Fiat or Abarth 124 Spider, and you have worked
out that the car's infotainment unit is the same Johnson Controls hardware Mazda uses in the MX-5 ND. It
is, and that is the whole reason this is possible. This section takes you from "I heard this can be done"
to "I know which of the four routes is mine, and what it will cost me" — before you touch anything.

## What this upgrade actually is

It is not "updating your Fiat". **Fiat never released a firmware with CarPlay** — nothing above the 59
series exists for the 124<SourceCite ids="B-01" />. So the upgrade is, precisely:

1. **Flash Mazda firmware** (version 70.00.100A) onto the Fiat unit, and
2. **rebrand it back** to look like a Fiat again, repairing the cosmetic and navigation damage the Mazda
   firmware causes.

You are running Mazda software on a Fiat car on purpose, and then hiding that fact. There is no
stock-Fiat image to return to afterwards — see [the firmware matrix](/firmware/#v70-00-100a) for why
70.00.100A specifically, and not the newest build.

## What you end up with — and what you don't

**You gain:** native CarPlay and Android Auto, with the Fiat/Abarth branding restored and factory
navigation working again<SourceCite ids="B-01" />.

**You do not gain**, and cannot on this hardware<SourceCite ids="B-01" />:

- **wireless** CarPlay — it needs firmware ≥ 74.00.200 *and* a different CMU entirely;
- a touchscreen inside Android Auto — Mazda disables it by design (CarPlay touch does work, when stationary);
- a Fiat logo on the Android Auto *exit* icon — that package is signed and has never been cracked.

The full breakdown is on [what you gain and lose](/guide/what-changes). Read it before you start, because
some of what you lose you have to record *first* or it is gone.

## What it takes

| | Roughly |
| --- | --- |
| **Time** | Firmware ≈ 1 hour; the hardware retrofit ≈ 2.5 hours. |
| **Cost** | The genuine retrofit kit runs about **€220 / £150–230 / A$355 / US$190–250** depending on market and where you buy — clones are cheaper. Full breakdown on [hardware](/hardware/). |
| **Risk** | A failed flash can leave the unit **dead** — black screen, controls unresponsive. It is preventable, and [risks and one-way doors](/guide/risks) explains exactly how it happens. |

You need a 7-inch car (the 3-inch Classica cannot be upgraded), the retrofit hub for your market, the
firmware files for your region, and a correctly prepared USB stick. [Is my car eligible?](/guide/eligibility)
is the checklist.

::: danger Do not let a dealer touch the CMU
This is the single most expensive mistake around this upgrade. **Mazda dealers flash the newest firmware
they have** — today that is 74.00.324, which is well past the point where the rebranding tool installs
cleanly. And **Fiat dealers have flashed *Mazda* firmware onto 124s by mistake.** Multiple owners have
lost their branding and their navigation this way, and a dealer will not put them back<SourceCite ids="B-01,A-01" />.

If your car is in for other work, make sure nobody "updates" the infotainment. Once it is on a locked
build, your options narrow sharply — see [points of no return](/firmware/points-of-no-return).
:::

## Where to go next

Work through this section in order — each page assumes you have read the one before:

1. **[Is my car eligible?](/guide/eligibility)** — the 7-inch requirement, and reading your version string.
2. **[What you gain and lose](/guide/what-changes)** — including the things to record before you begin.
3. **[Risks and one-way doors](/guide/risks)** — how a brick happens, and what recovery costs.
4. **[Which route is mine?](/guide/route)** — answer five questions and get your named route and files.

---

**Related:** [is my car eligible?](/guide/eligibility) · [which route is mine?](/guide/route) ·
[firmware version matrix](/firmware/) · [what the tweaks leave on your car](/security/)
