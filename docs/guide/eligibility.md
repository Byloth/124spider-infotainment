---
title: Is my car eligible?
---

<script lang="ts" setup>
import VersionDecoder from "@theme/components/VersionDecoder.vue";
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Is my car eligible?

Two things decide eligibility: the **display** your car has, and the **firmware version** it is running.
The first is a hard yes/no. The second does not decide *whether* you can upgrade so much as *how hard it
will be* — and, in a couple of cases, whether you are already stuck.

## The 7-inch requirement

::: warning This does not work on the 3-inch display
Only cars with the **7-inch touchscreen** can be upgraded. The small **3-inch display** fitted to some
Classica trims runs different hardware, and there is no path to CarPlay on it at all<SourceCite ids="A-01" />.
Nothing else on this site applies to a 3-inch car. Check this first, before reading further.
:::

If you are not sure which you have: the 7-inch is the central tablet-style touchscreen that sits on top of
the dashboard. The 3-inch is a small strip display and is not a touchscreen.

## Read your firmware version

Everything downstream depends on knowing your exact version. On the car:

**`HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION`**

You will see a string like `59.00.502A EU N` or `70.00.100A NA N`. The parts of it — version, region,
revision, nav protocol — are explained in full on [regions and file naming](/firmware/regions). Paste it
below and this will decode it and tell you which route it puts you on:

<VersionDecoder />

## What your starting point means

Every 124 can *reach* CarPlay in principle, but the version your car is on now decides which door is still
open to get a tweak onto it. This table covers all four starting situations; none is hidden behind the
decoder above.

| You are on | Situation | What it means for you |
| --- | --- | --- |
| **56.00.521 / 56.00.530** | Factory firmware of MY2017–early-2018 cars | The easy path. ID7 can still be installed straight from USB — see [the matrix](/firmware/#v56). |
| **59.00.502 / 504 / 545** (Mazda) | USB side-loading already closed | ID7 must have been installed earlier, or you use serial / the mp3 method. [The lock](/firmware/#v59-00-502). |
| **59.00.524 / 562 / 563** (Fiat) | Fiat's own later builds — the "latest Fiat" trap | No CarPlay, side-loading already dead. [Why this traps people](/firmware/#v59-fiat). |
| **70.00.335 / 352** | ID7 has been deleted by the firmware | Serial console during the flash, or the mp3 method. [The shutdown](/firmware/#v70-locks). |
| **70.00.367 / 74.x** | Serial gone too | The mp3 method only, and the evidence for it thins out here. [Points of no return](/firmware/points-of-no-return). |

The [route wizard](/guide/route) turns this into a single answer once it knows your version and whether
ID7 is already installed.

## Two things worth knowing before you buy or flash

**Replacement units often arrive locked.** A CMU fitted as a warranty or repair replacement frequently
comes on **59.00.563** — Fiat's latest, and already tweak-locked<SourceCite ids="B-01,A-01" />. If your
car has had its head unit replaced, check the version before assuming you are on the easy path.

**A permanently locked car has one escape: different hardware.** If your unit is on a build past every
tweak route and you cannot get in, the community's answer is to fit a **used v56 CMU** and run the easy
path on that instead — any MZD-1 head unit from any Mazda is plug-and-play and is not VIN-locked to a
particular car<SourceCite ids="A-01" />. It is a last resort, not a first choice, but it exists.

::: warning ❓ One thing nobody has confirmed
There is **no first-hand report** of anyone successfully flashing 70.00.100 *over* Fiat **59.00.562/563**.
Everyone assumes it works, and it probably does, but the research could not find a single confirmed
success — one owner described a 59.00.563 replacement unit as "not upgradable"<SourceCite ids="A-01" />.
If you are starting from 59.00.562/563, treat the first flash as the unproven step it is, and see
[open questions](/reference/open-questions). This site will not promise you something nobody has reported
doing.
:::

---

**Related:** [start here](/guide/) · [what you gain and lose](/guide/what-changes) ·
[which route is mine?](/guide/route) · [firmware version matrix](/firmware/) ·
[regions and file naming](/firmware/regions)
