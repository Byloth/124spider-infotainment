---
title: 5 · Verify
---

<script lang="ts" setup>
import SourceCite from "@theme/components/SourceCite.vue";
import StepChecklist from "@theme/components/StepChecklist.vue";
</script>

# 5 · Verify

The last step is checking that everything the upgrade was for actually works, before you put the tools
away. This page gives the checks in the order you can make them from the driver's seat. It also lists the
things that will **stay** Mazda whatever you do, so that nobody spends an evening chasing them.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

## What a finished car looks like

Check these with the navigation SD card in, and your phone un-paired from any earlier attempt.

1. **The version.** Open **Settings → System → About → Version information**. The OS version should read
   `70.00.100 NA N`, `70.00.100 EU N` or `70.00.100 4A N` (ADR) for your market<SourceCite ids="A-01" />.
   On the serial and mp3-only routes it reads the build your route left you on. The
   [regions page](/firmware/regions#the-on-screen-string) decodes the string.
2. **The failsafe version**, on the same screen. On a two-file flash it should match the OS version. Units
   have ended up with a mismatched pair, and one that did still ran, but that is an undefined
   state<SourceCite ids="F-27" /> ⚠️. [Downgrading](/recovery/downgrade) covers it.
3. **The boot animation** is Fiat's or Abarth's, whichever you chose. A Mazda logo flashing briefly on a
   hard reboot is normal<SourceCite ids="B-01" />.
4. **The interface wording** says Fiat or 124 Spider rather than Mazda, in the nine languages the tool
   covers<SourceCite ids="B-01" />.
5. **Navigation shows maps**, not the compass, and finds the car where it is. If the position or the clock
   is wrong, the [blue GPS plug](/procedure/hardware#the-removal-order) is the first suspect. Mazda's own
   procedure adds that a fresh GPS fix may need a short drive of about 50 m at 15 km/h or
   more<SourceCite ids="F-49" />.
6. **The Bluetooth name** your phone sees is **"124 Spider"**<SourceCite ids="A-01,B-01" />. Pair the
   phone again.
7. **CarPlay or Android Auto** starts when the phone is plugged into the hub's port with the **phone
   icon**<SourceCite ids="A-01" />, and appears under Applications.

If the tool's log is on the stick and mentions the root filesystem being about 90 % used, that is storage,
not memory, and 68wooley reads it as normal<SourceCite ids="A-01" />.

<StepChecklist id="procedure-verify" :items="[
  'Version string reads 70.00.100 for your market, or the build your route calls for',
  'Failsafe version matches the OS version (two-file flash)',
  'Fiat or Abarth boot animation',
  'Interface says Fiat or 124 Spider, not Mazda',
  'Navigation shows maps and the right position, with the SD card in',
  'Clock correct',
  'Phone sees the car as 124 Spider, and pairs',
  'CarPlay or Android Auto starts from the phone-icon port'
]" />

## What stays as it is

These are known, and none of them is a fault in your installation<SourceCite ids="B-01" />:

- **The Mazda logo on Android Auto's exit icon.** The Android Auto package is signed, and nobody has found a
  way to change it<SourceCite ids="B-01,B-04" />.
- **No touchscreen inside Android Auto.** Mazda disabled it by design on this firmware. Android Auto is
  driven with the commander knob. CarPlay accepts touch while the car is stationary<SourceCite ids="E-01,A-01" />.
- **Your iPhone still calls the car "Mazda"** in its CarPlay list, even with the Fiat icon on the
  screen<SourceCite ids="B-01" />.
- **Wireless CarPlay** is not something this upgrade can give you. It needs firmware 74.00.200 or later and
  different hardware<SourceCite ids="B-01" />.
- **Interface languages outside the tool's nine** keep the word "Mazda" in places.

[What you gain and lose](/guide/what-changes#what-you-can-never-fix) has the full list, with the reasons.

## If something is wrong

| What is wrong | Look first at |
| --- | --- |
| The version is not the one you flashed | [Step 2](/procedure/flash#what-a-finished-flash-looks-like) |
| Mazda animation, Mazda wording or the compass is still there | The tool did not run, or you skipped that question. Run it again: [step 3](/procedure/rebrand) |
| Wrong position or clock, or CarPlay greyed out | The blue GPS plug: [step 4](/procedure/hardware#the-removal-order) |
| USB ports or CarPlay not recognised straight after the install | [Things that are not faults](/procedure/hardware#things-that-are-not-faults) |
| Anything else | [Troubleshooting](/recovery/) |

## Afterwards

- **Keep the original hub.** It has to go back in before any future firmware update, and refitting it
  restores everything except CarPlay and Android Auto<SourceCite ids="E-08,A-01" />.
- **Do not let a dealer update the head unit.** Mazda dealers flash the newest firmware they have, and a
  124 has lost its branding and navigation that way<SourceCite ids="B-01,A-01" />. If the car goes in for
  other work, say so.
- **Further tweaks:** on v70 use MZD-AIO 2.8.3 or later, never the v56-era packages. [Step 3](/procedure/rebrand#never-run-v56-era-packages-on-v70)
  explains why.
- If you installed ID7, remember what it left behind: [the security section](/security/#what-id7-installs).

---

**Related:** [choose your route](/procedure/) · [what you gain and lose](/guide/what-changes) ·
[troubleshooting](/recovery/) · [the hardware section](/hardware/)
