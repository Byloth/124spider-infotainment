---
title: The retrofit kit
---

<script lang="ts" setup>
import SourceCite from "@theme/components/SourceCite.vue";
import HubWiring from "@theme/components/diagrams/HubWiring.vue";
</script>

# The retrofit kit

CarPlay and Android Auto on the 124 need two things: Mazda's v70 firmware, and a different USB hub in
the centre console. This section covers the hardware half: what the kit is, what to buy for your market,
and what the evidence says about the cheap copies. Fitting it is [step 4 of the procedure](/procedure/hardware).

## What the kit is

The hub is the small unit in the front of the centre console with the USB ports, the SD slot and the AUX
socket. The 124's original hub has **two USB 2.0 ports at about 0.5 A each**, plus SD and AUX, and reaches
the head unit through **one** cable<SourceCite ids="E-01,E-08" />.

The retrofit hub looks almost the same. Next to its first USB port is a **phone icon**: that port is the
one CarPlay and Android Auto use, and it charges at about **2.1 A**. It reaches the head unit through
**two** new cables, into two connectors on the unit. The old cable is left in the car, unplugged and
wrapped in foam<SourceCite ids="E-01,B-01,E-08" />.

So the kit is just **a hub and a set of two cables**. There is no bracket and no module: the new hub clips
into the housing the old one came out of<SourceCite ids="E-08,E-10" />.

<HubWiring />

Which hub and which cable set to buy for your market is on [part numbers by market](/hardware/part-numbers).
Whether a cheaper copy will do is on [genuine vs clone](/hardware/oem-vs-clone).

## The screen has to be the 7-inch one

The kit works only with the **7-inch touchscreen**. The base Classica's 3-inch display is a different
system, and the retrofit does not apply to it<SourceCite ids="A-01,B-01,E-11" />. [Is my car
eligible?](/guide/eligibility) has the details.

## Why the firmware comes first

The hub does nothing on its own. With firmware older than v70 it may not be recognised at all, and Mazda
is explicit about the order<SourceCite ids="E-08,E-06" />:

> The firmware MUST BE UPDATED FIRST before beginning the installation. If an older version of the CMU
> software is being used, the CarPlay/Android Auto-compatible USB hub may not be recognized. The software
> must be v70.00.21 or later. Once the CMU has been attached to the CarPlay/Android Auto-compatible USB
> hub, the software cannot be updated.

So the firmware is flashed with the **original** hub still in the car, and the new one goes in last. If
your car already has the new hub and old firmware, the original hub (or any old one) has to go back in
for the flash<SourceCite ids="B-01,E-10" />. [Choose your route](/procedure/#the-order-of-operations)
explains how this shapes the whole procedure.

## Android Auto needs the hub too

A common assumption is that the hub is "the CarPlay part" and that Android Auto can do without it. With
Mazda's firmware it cannot:

- ASH8, whose install instructions are compiled in a widely shared PDF, answers the question directly: Android Auto
  alone without the hub is not possible, and neither is tricking the unit with a stronger power supply.
  On its first start, v70 looks for the new hub specifically<SourceCite ids="E-10" />.
- An owner who flashed v70 before the parts arrived found navigation still working but **no Android
  Auto option anywhere**<SourceCite ids="E-06" />.
- Ameridan's explanation: Android Auto does not need the faster port as such, but the firmware checks
  that the phone port is on the head unit's USB 3.0 connection, and hides the apps if it is
  not<SourceCite ids="E-01" />.

No report anywhere describes Android Auto working on v70 with the original hub.

The one hub-less Android Auto is **not Mazda's**. It is a community app installed with the MZD-AIO
tweaks on **v56 or tweakable v59** firmware. Owners describe it as touch-enabled but unstable, and those
who moved to Mazda's own Android Auto on v70 found it far more reliable, at the cost of the
touchscreen<SourceCite ids="A-01,E-10" />. It needs firmware that this upgrade replaces, and it must not
be installed on top of v70<SourceCite ids="B-01" />. This site does not cover it.

## It is fully reversible

Refit the original hub and the car works exactly as before, just without CarPlay and Android
Auto<SourceCite ids="A-01" />. That makes the hardware the reversible half of this upgrade. The
firmware is the half that is not ([risks and one-way doors](/guide/risks)).

**Keep the original hub.** You need it back in the car for any future firmware update.

---

**Related:** [part numbers by market](/hardware/part-numbers) · [genuine vs clone](/hardware/oem-vs-clone) ·
[4 · Install the hardware](/procedure/hardware) · [what you gain and lose](/guide/what-changes)
