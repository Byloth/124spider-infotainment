---
title: 4 · Install the hardware
---

<script lang="ts" setup>
import PartFinder from "@theme/components/PartFinder.vue";
import SourceCite from "@theme/components/SourceCite.vue";
import StepChecklist from "@theme/components/StepChecklist.vue";
import HubWiring from "@theme/components/diagrams/HubWiring.vue";
import TrimOrder from "@theme/components/diagrams/TrimOrder.vue";
</script>

# 4 · Install the hardware

The software is done. This step swaps the car's original USB hub for the CarPlay / Android Auto one and
runs two new cables to the head unit. Nothing here can brick anything. The risks are broken trim clips,
a plug left half-seated, and an afternoon longer than planned. Compared with steps 2 and 3, this is the
easy part.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

## Before you start

**Steps 2 and 3 must be finished and working.** Mazda: *"Once the CMU has been attached to the
CarPlay/Android Auto-compatible USB hub, the software cannot be updated."*<SourceCite ids="E-08,E-21" />
The new hub also does nothing until the car runs v70 firmware. With older firmware it may not be
recognised at all<SourceCite ids="E-08,E-06" />. If you fitted the hub early to drive a keyboard for the
mp3 method in step 3, you only need to finish it off here.

The retrofit is **fully reversible**. Refit the original hub and the car works as before, except for
CarPlay and Android Auto<SourceCite ids="A-01" />. Keep the old hub. You need it back in for any future
firmware update.

## Parts

The kit is one hub and a set of two cables. Nothing else is needed: the hub clips into the housing the
old one came out of<SourceCite ids="E-08,E-10" />. The hub is the same part worldwide. The cable set has a
different number in each market, but reports say any of them fits any car<SourceCite ids="E-10,E-19" />.

<PartFinder />

The **3-inch display** of the base Classica is not compatible. The kit needs the 7-inch screen<SourceCite ids="A-01,B-01" />.
Genuine hubs, clones and how to tell them apart are covered in [the hardware section](/hardware/), and
the full part-number list is on [part numbers](/hardware/part-numbers).

## Tools and time

- 10 mm socket with a 200 mm extension: battery terminal, one trim bolt, the head unit's bolt.
- Phillips and flat screwdrivers, **with the tips taped**, and plastic trim tools.
- Scissors and cable ties. The Mazda cable set includes ties and foam tape<SourceCite ids="A-01,E-08" />.

**Time:** about 2.5 hours for the owner who wrote the 124 guide, including photos. Reports range from 2
hours to 5 ("be careful")<SourceCite ids="A-01" />. Mazda's labour allowance is 1.5 hours, for a
technician who has done it before<SourceCite ids="E-09" />.

Mazda's instruction sheet is for the MX-5, and the 124's dash and console are the MX-5's. Every 124
guide follows Mazda's sheet unchanged, with two practical differences noted below<SourceCite ids="A-01,E-12" />.
Lower the roof and the windows, and open both doors.

## The removal order

<TrimOrder />

Numbers in brackets are the matching items on Mazda's sheet<SourceCite ids="E-08" />. The steps are
68wooley's, from the 124 guide<SourceCite ids="A-01" />.

1. **Disconnect the battery negative** (10 mm). The black plastic cover is fragile *(①)*.
2. **Passenger scuff plate.** Clips only: lift from one end *(②)*.
3. **Passenger foot-well side trim.** One pop-clip (keep its centre pin) and the door seal strip; pull
   rearwards *(③)*.
4. **Shift knob.** On a manual it unscrews *(④)*. On an **automatic**, it is better not to remove the knob:
   the white lock rod inside is easy to misplace, and if it goes back misaligned the ignition stays on.
   Select N and work around the boot surround instead<SourceCite ids="E-01" />.
5. **The centre console panel, as one piece.** Mazda's sheet removes the shift panel, the cubby and the
   commander-knob panel separately *(⑤⑥⑦)*. On the 124 they come out together. Start at the rear of the
   shifter bezel on the passenger side and work round. **Two plugs underneath** at the commander. The
   larger one's latch is hard to find, so do not force it.
6. **Parking-brake boot panel.** Two clips; slide it up over the lever *(⑧)*.
7. **Passenger A-pillar trim.** Pop the small end piece first, then work from the top down. The tweeter
   is attached: leave the trim lying on the dash rather than pulling the wire *(⑨)*.
8. **Passenger lower dash trim.** One 10 mm bolt in the foot-well, then clips; pull rearwards *(⑩)*.
9. **Rear centre console.** Remove the cup holders, then two Phillips screws ahead of the shifter, then
   the clips from front to rear *(⑪)*.
10. **Front console and its panel, as one unit** *(⑫⑬)*. This holds the old hub, the seat-belt / airbag
    light panel and the seat-heater switches. Pull it rearwards. Three plugs on the back: the **small,
    foam-wrapped black plug is the old USB cable**, which is retired. The other two are reused.
11. **Centre panel No. 2** (hazard switch and centre vent). Clips, from the passenger side; one hazard
    plug *(⑭)*.
12. **Meter hood.** Lower the steering wheel and pull straight back. Just move it aside *(⑮)*.
13. **The head unit.** One 10 mm bolt, then pull it back. Five plugs: the **black-and-green one is the old
    USB cable**, which is replaced. Note where the others go *(⑯)*.

::: danger The blue GPS plug
Of the head unit's plugs, the **blue GPS antenna connector** is the one owners forget to re-seat. The
symptoms do not point at it: navigation that cannot find the car, a clock on the wrong time, and a
greyed-out CarPlay entry. It looks like a failed firmware flash<SourceCite ids="B-01,E-10,E-20" />. Before
you suspect anything else after this step, check that plug.
:::

On a **right-hand-drive** car the job is the same. The "passenger side" trim is simply on the other
side<SourceCite ids="E-14,E-15,E-19" />. Mazda's sheet shows left-hand drive only.

## Swap the hub and run the cables

<HubWiring />

14. **Swap the hub.** On the front-console unit, remove the trim, the two Phillips screws either side of
    the warning-light unit, then press the hub's **four tabs** and slide it out forwards. Slide the new
    one in and reassemble the unit<SourceCite ids="A-01" />. One owner did it without taking the panel
    apart.
15. **Prepare the cables** to Mazda's diagram: line up the plugs, measure the run, and bundle the excess
    with ties and foam. The measurements suit the 124<SourceCite ids="A-01,E-08" />.
16. **Route them** from the top of the dash down to the hub area, through the gap by the head-unit
    opening. Wrap the **disconnected old connector** in foam, fold it back, and tie the new cables to the
    existing harness. Tuck the excess under the upper dash member. Pass the harness **under** the head
    unit before you refit it<SourceCite ids="A-01,E-08" />.
17. **Connect:** grey/blue to brown, grey/green to black. Each plug fits only its own socket. Reconnect
    the head unit's other plugs, **the blue GPS plug included**, and the hazard and warning-light
    plugs<SourceCite ids="A-01,E-08" />.

## Test before you reassemble

18. Reconnect the battery. Press START **once** (ACC). Plug your phone into the hub's port with the
    **phone icon**. CarPlay or Android Auto should appear under Applications<SourceCite ids="A-01,E-08" />.
19. If it does, press START to switch off and refit the trim in reverse order. If it does not, see
    [below](#things-that-are-not-faults) before taking anything apart again.
20. Mazda's sheet ends with the servicing required after a battery disconnect<SourceCite ids="E-08" />.
    Check that anything the disconnect may have reset, such as the one-touch power windows, still
    works.

<StepChecklist id="procedure-hardware" :items="[
  'Steps 2 and 3 finished; original hub kept for future updates',
  'Battery negative disconnected',
  'Trim removed in order; the two commander plugs unplugged',
  'Old hub out, new hub in (four tabs)',
  'Old USB connector wrapped in foam and tied back, never reused',
  'Cables routed under the head unit; excess bundled',
  'Grey/blue to brown, grey/green to black',
  'Every head-unit plug refitted, blue GPS plug included',
  'Battery reconnected; phone on the phone-icon port launches CarPlay or Android Auto',
  'Trim refitted in reverse; windows and clock checked'
]" />

## Things that are not faults {#things-that-are-not-faults}

Owners have reported these straight after the install. Each one cleared without any further work:

- **USB ports not working at first.** One owner's USB1 and USB2 came up after 15–30 minutes, or after a
  full shutdown<SourceCite ids="A-01" />.
- **"No device recognized", CarPlay greyed out.** Cleared by locking the car and walking away for a few
  minutes, which lets the unit go fully to sleep<SourceCite ids="A-01" />.
- **Flaky CarPlay or Android Auto.** Usually the phone cable. Try another one before anything
  else<SourceCite ids="A-01" />.
- **No touchscreen in Android Auto.** That is Mazda's design on this firmware, not a fault. Android Auto
  is driven with the commander knob<SourceCite ids="E-01,A-01" />. [Step 5](/procedure/verify) lists the
  other things that stay as they are.

If none of these explains it, check the blue GPS plug, then see [troubleshooting](/recovery/).

## Before you move on

The trim is back, the phone-icon port starts CarPlay or Android Auto, and the navigation finds the car.

**[5 · Verify →](/procedure/verify)**

---

**Related:** [the hardware section](/hardware/) · [part numbers](/hardware/part-numbers) ·
[3 · Restore branding and navigation](/procedure/rebrand) · [troubleshooting](/recovery/)
