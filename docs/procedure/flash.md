---
title: 2 · Flash the firmware
---

<script lang="ts" setup>
import FlashTimer from "@theme/components/FlashTimer.vue";
import RouteBranch from "@theme/components/RouteBranch.vue";
import SourceCite from "@theme/components/SourceCite.vue";
import StepChecklist from "@theme/components/StepChecklist.vue";
import FlashSequence from "@theme/components/diagrams/FlashSequence.vue";
</script>

# 2 · Flash the firmware

This is the step that can brick the unit. It is also the step with the best documentation, because it is
Mazda's own dealer procedure and Mazda has written it down in detail. This page explains that procedure
for a 124 owner working without a dealer. It covers the order of the two files, the one rule that
prevents the classic brick, what the car looks like when the flash has worked, and what to do when it has
not.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

**Mazda's procedure is the authority. This page is a commentary on it.** Have the 30-step document
printed and in the car<SourceCite ids="F-49,D-04" />. Where this page and Mazda's document seem to disagree,
stop and work out why before you go on.

## Before you start

This step assumes [step 1](/procedure/prepare) is finished. If you have come straight here, check each of
these first. Several of them cannot be put right once the flash has started.

- The car still has its **original USB hub**. The new CarPlay / Android Auto hub is fitted only in
  step 4, and Mazda's own instructions say the software cannot be updated through it<SourceCite ids="E-08,E-21" />.
- The stick is FAT32, formatted on Windows, has passed H2testw, and holds **only** the firmware files for
  your market. Every file has matched its hash.
- Every phone is un-paired, in the car and on the phone. The navigation SD card and every other USB and
  AUX device are out.
- Existing tweaks are uninstalled, **except ID7**, and stored fault codes are cleared.
- A battery charger is connected, and the blower, rear defogger and lamps are off<SourceCite ids="F-50" />.
- If your route installs ID7 from USB, it is **already installed**. After this step that is no longer
  possible.
- You have an hour with nobody needing the car, and a phone or kitchen timer that is not this web page.

## Which flash your route does

Most routes flash the same thing: the two-file [70.00.100A](/firmware/#v70-00-100a) release for your market. Two routes differ.

| Route | Files on the stick | What you do in this step |
| --- | --- | --- |
| **Install ID7 from USB, then flash** | `…_70.00.100A_failsafe.up` + `…_70.00.100A_reinstall.up` | The two-file flash below |
| **Flash first, then the mp3 method (or serial)** | The same two files | The two-file flash below |
| **Serial console during the flash** | One `…_update.up` (70.00.335 or 352) + the `XX` folder | A single-file flash with a serial console attached, and one command pasted at the end |
| **The mp3 method only** | Depends on the exact build | A downgrade on 70.00.367, possibly nothing at all on 74.x |

The differences are written out in full [at the end of this page](#what-your-route-changes). Read your
route's block before you start, not after.

Three things are true of every route:

- The files must match your car's market: `NA`, `EU`, `4A` (ADR) or `JP`. The
  [regions page](/firmware/regions) explains the codes. Flashing another market's firmware is treated
  everywhere as a brick risk.
- From 70.00.335 onwards, Mazda merged the two files into one: *"'Fail Safe Package' has been eliminated
  since 70.00.335. No need to perform Failsafe installation process since then."*<SourceCite ids="F-49" />
  If you see only one package, that is why.
- If your car **already reads 70.00.100** for your market, the target build is already installed and
  this step has nothing to add. Go on to [step 3](/procedure/rebrand).

## Why the order matters, and where the unit dies

A two-file release has a **failsafe** package (about 7 MB) and a **reinstall** package (0.9–2.3 GB). The
failsafe goes first and replaces the unit's boot and recovery images. The reinstall follows and replaces
the operating system<SourceCite ids="B-01,F-62" />.

<FlashSequence />

The dangerous moment is the gap between them. Once the failsafe is in, the unit is set to boot something
that does not match the system still installed. One reverse-engineer put it this way: *"it cannot boot
anymore"* if the power goes before the reinstall has run<SourceCite ids="F-19" />. The symptom is always
the same: a **black screen, the last radio station still playing, and the knob and touchscreen
dead**<SourceCite ids="F-19,F-22,F-37" />. The reset button combinations do nothing. It is recoverable,
but only on the bench, with the unit out of the car. [Risks and one-way doors](/guide/risks#the-brick-and-exactly-how-it-happens)
has the costs.

Doing it the other way round does not work either. Choosing the reinstall before the failsafe gives an
"Install not successful: System failure" loop at about 2 %, which Mazda's recovery step below has
fixed<SourceCite ids="F-23,F-47,F-57" />. That mistake is recoverable. Losing power after the failsafe is
not.

## The pedal rule

::: danger Keep the car in accessory mode for the whole flash
In accessory mode (ACC) the car **switches itself off after 25 minutes**. The reinstall takes up to 40, so
unless something resets that timer, the car cuts the power partway through the flash<SourceCite ids="F-49" />.

- **Press and release the clutch** (manual) **or the brake** (automatic) **as soon as the failsafe
  finishes**, and then **about every 20 minutes** until the flash is complete. Press the pedal only. Do
  not touch START.
- **Never switch the ignition off** until the flash is complete. Mazda: *"DO NOT turn IG OFF to avoid
  damaging CMU."*<SourceCite ids="F-49" />
- **Stay in the car, with the key.** Mazda asks you to stay inside at least until the failsafe has
  finished<SourceCite ids="F-49" />, and the pedal rule keeps you there for the rest. One unit that went
  black after a technician's update had been flashed with the windows open and the key away from the
  car<SourceCite ids="F-35" /> ⚠️.
:::

Mazda's own document asks for a pedal press after approximately 25 minutes and recommends *"a timer to 25
minutes"*<SourceCite ids="F-49" />. That is the same length as the timeout, so it leaves no margin. The
124 guides say every 20 minutes<SourceCite ids="A-01,B-01" />, and one vendor's copy of Mazda's procedure
says 15<SourceCite ids="F-47" />. Pressing more often costs nothing, and this site uses 20.

The timer below counts those 20 minutes. Use it as a second alarm, never as the only one.

<FlashTimer />

❓ One reverse-engineer's page suggested that the engine has to be running to keep the unit
powered<SourceCite ids="F-38a,F-38b" />. That contradicts Mazda, whose procedure is done in ACC with the
engine off and the pedal resetting the timer. This site follows Mazda. Do not start the engine at any
point in this step.

## The two-file flash

The numbers in brackets are the matching steps of Mazda's full procedure<SourceCite ids="F-49" />. 124
owners report the same button combination on their commander<SourceCite ids="A-01" />.

### Wake the unit and clear the fault codes

1. With the ignition **off**, check that the navigation SD card and every USB, AUX and phone connection
   are out *(1)*.
2. Press START **once, without touching either pedal**. That puts the car in ACC without starting the
   engine. Wait for the unit to boot *(2)*.
3. Select **AM or FM radio** *(3)*.
4. Hold **Music + Favorites + Mute** together for 2–5 seconds. The Diagnostic Test screen opens *(4)*.
5. Enter **3**, then ENTER and CLEAR. Enter **2**, then ENTER, CLEAR and EXIT *(5–6)*. If you did this in
   step 1, it does no harm to do it again.

### Let the unit sleep

6. Switch the ignition **off**, close every door, **lock the car** with the remote, take all the keys
   **at least 5 m away**, and **wait 3 minutes** *(7)*. This puts the unit into its sleep mode, so the
   flash starts from a clean boot.
7. Unlock the car and press START **once, without the pedals**, to get back to ACC *(8)*.

### Start the update

8. Plug the stick into **one** USB port. Leave the other port and the SD slot empty *(9)*.
9. A message briefly confirms that the stick has been recognised *(10)*. One 124 owner never saw it and
   the update still found the stick<SourceCite ids="A-01" />. If the next steps show no packages, go back
   and replug it.
10. Open the Diagnostic Test screen again (**Music + Favorites + Mute**), enter **99**, then ENTER
    *(11–12)*.
11. Select **Search** *(13)*. The packages on the stick are listed.

### File one: the failsafe

12. Select **Fail Safe Package**, then **Install** *(14–15)*. Mazda: *"CAUTION: Always do the 'Fail Safe
    Package' first."*
13. It takes several minutes. One 124 owner timed it at about 8<SourceCite ids="A-01" />.
14. When it finishes, select **OK** *(17)*.
15. **Press and release the clutch or brake now**, and start your 20-minute timer *(18)*. Carry straight
    on. Mazda's note: *"proceed with following steps without stopping."*

### File two: the reinstall

16. Open the Diagnostic Test screen again, enter **99**, ENTER, then **Search** *(19–21)*.
17. Select **Reinstallation Package**, then **Install** *(22–23)*.
18. The screen shows "Preparing to update", goes black, then white, and a progress bar climbs from 0 to
    100 % *(24)*. Mazda says about 40 minutes. The same 124 owner took about 27<SourceCite ids="A-01" />.
    The bar can pause for several minutes, which is normal. Keep pressing the pedal every 20 minutes.

### Finish

19. When the update completes, the unit may show **"Please restart"**. **Do not restart the engine.**
    Switch the ignition **off**, without pressing either pedal *(25)*.
20. Remove the stick. Close the doors, lock the car, take the keys 5 m away and **wait 3 minutes**
    again *(26)*.
21. Unlock, press START **once without the pedals**, and wait **one minute** without touching any switch
    *(27)*.
22. Check the version: **Settings → System → About → Version information** *(28)*. See
    [what a finished flash looks like](#what-a-finished-flash-looks-like) below.
23. Switch the ignition off *(29)*. **Leave the navigation SD card out for now.** Mazda's step 30 puts it
    back, but on a 124 the maps will not work until step 3 has restored navigation, and step 3 is run
    with the card out as well<SourceCite ids="A-01" />.

<StepChecklist id="procedure-flash" :items="[
  'Original USB hub fitted; SD card, phones and other devices out',
  'ACC with one press of START, no pedal; AM or FM radio selected',
  'Fault codes cleared (3 ENTER CLEAR, 2 ENTER CLEAR EXIT)',
  'Car locked, keys 5 m away, 3 minutes of sleep',
  'Back to ACC, stick in one port only, 99 then Search',
  'Fail Safe Package installed first, OK selected',
  'Pedal pressed straight after the failsafe; timer started',
  'Reinstallation Package installed, pedal pressed every 20 minutes',
  'Ignition off at the end (no restart), stick out, 3 minutes of sleep',
  'ACC, one minute untouched, version checked'
]" />

## What a finished flash looks like {#what-a-finished-flash-looks-like}

The version string should read **`70.00.100 <REGION> N`**: `70.00.100 NA N`, `70.00.100 EU N` or
`70.00.100 4A N` for ADR<SourceCite ids="A-01,C2-16" />. The letter after the region is the navigation
engine, not a revision. The [regions page](/firmware/regions#the-on-screen-string) decodes the whole
string, and the Japanese case.

Several things now look wrong, and all of them are **expected at this point**. The car is running Mazda's
firmware without Fiat's branding:

- The boot animation is **Mazda's**, not Fiat's or Abarth's.
- The Bluetooth name is **"Mazda"**.
- **Navigation shows only a compass**, not maps. Mazda's firmware checks the car's VIN before it loads
  the map data, and a 124's VIN does not pass<SourceCite ids="B-01" />.
  [What you gain and lose](/guide/what-changes#why-navigation-breaks-—-and-why-it-is-not-a-fault) explains it.
- Your settings, presets and pairings are gone. That is true of every flash<SourceCite ids="F-50" />.

[Step 3](/procedure/rebrand) puts the branding, the Bluetooth name and the navigation back.
[What you gain and lose](/guide/what-changes) lists what cannot be put back.

## If the flash fails

Mazda's recovery, word for word, for when *"updating process will not finish
successfully"*<SourceCite ids="F-49,F-50" />:

> a. Turn the ignition switch OFF. (Do not start the engine.)\
> b. Wait until the screen turns to black.\
> c. Remove the USB memory stick.\
> d. Remove ROOM fuse and wait for one minute.\
> e. Install ROOM fuse.\
> f. Turn ignition switch to ACC. (Do not turn to ON or Start.)\
> g. Confirm the screen below appears. *[the update screen]*\
> h. Connect the USB memory stick to the USB port.\
> i. Confirm that update process restarts.\
> j. Continue from step 25 (update successful) again.

⚠️ **Find the ROOM fuse before you start, not when you need it.** Mazda's bulletin places it in the fuse
block in the engine compartment<SourceCite ids="F-50" />, but that is Mazda's documentation for Mazda cars.
No source this project has found says which fuse carries that name on a 124, and a 124 owner who asked on
the forum got no answer<SourceCite ids="A-01" />. Check the fuse chart in your owner's manual or on the
fuse-box lid.

What the reports say about the usual failures:

| What you see | What it has meant | What has fixed it |
| --- | --- | --- |
| "Install not successful: System failure", looping at about 2 % | The reinstall was chosen before the failsafe; or a corrupt file or a bad stick | Mazda's recovery above, then the failsafe first. Recheck the hashes and try another stick<SourceCite ids="F-23,F-47,F-57,F-30" /> |
| "Failed to validate package certificate" | A file altered after download (an antivirus has done it), the wrong file, or the new hub fitted too early | Re-download, recheck the hash, refit the original hub<SourceCite ids="F-47,F-26,F-24" /> |
| Stuck at 19–21 %, radio frozen | An unreliable stick | Another stick; a branded one worked<SourceCite ids="F-36" /> |
| The stick is not seen, or no packages are listed | Wrong format, a Mac-formatted or oversized stick, or files older than your firmware allows | [Step 1](/procedure/prepare#the-usb-stick); [points of no return](/firmware/points-of-no-return)<SourceCite ids="F-24,F-31" /> |
| Reinstall sits at "Connecting to firmware" for over 20 minutes | Unknown | **Do not switch off.** One owner did, and found a black screen the next morning. Use Mazda's recovery above instead<SourceCite ids="F-22" /> |
| Black screen, radio still playing, controls dead | Power lost after the failsafe | Not fixable from the driver's seat. See [recovering a bricked unit](/recovery/brick)<SourceCite ids="F-19,F-37" /> |

Anything the ROOM-fuse retry does not fix belongs on [troubleshooting](/recovery/).

## What your route changes {#what-your-route-changes}

Every block stays readable whatever your route. If you used the [route wizard](/guide/route), yours is
marked.

<RouteBranch :routes="['id7-from-usb']">

The two-file flash above, unchanged. ID7, installed in step 1, **survives the flash to
70.00.100**<SourceCite ids="C2-13,C2-11" />. That is the point of installing it first, so do not
uninstall it and do not reinstall it now. Whether it really took shows up only in step 3, when the
branding tool runs or does not.

</RouteBranch>

<RouteBranch :routes="['serial-or-mp3']">

The two-file flash above, unchanged. If you are starting from **Fiat 59.00.562 or 563**, a flash from
those builds straight to 70.00.100A is itself [unconfirmed](/guide/eligibility) ❓. Nobody has reported it
either working or failing.

If you plan to use a serial console in step 3 instead of the mp3 method, you do not need it during this
flash.

</RouteBranch>

<RouteBranch :routes="['id7v2-serial']">

You are on 70.00.335 or 352, which have already deleted ID7 and the serial passwords. The only window in
which ID7 v2 can be put back is **the end of a flash, before the first reboot**<SourceCite ids="C2-11,C2-14" />.
So on this route you re-flash **70.00.335 or 352** for your market (both exist for NA, EU and ADR), a
single `update.up`, with a serial console attached. Flashing 70.00.100 instead does not bring tweaking back. The credentials are already
gone<SourceCite ids="A-03" />.

How to wire and open the serial console is covered with the rest of the serial method in
[step 3](/procedure/rebrand). Read that before you start, and have the console working before you touch
the update. ⚠️ Two sources label the unit's serial pins the other way round from each
other<SourceCite ids="F-51,F-62" />, so if the console shows nothing, swap TX and RX.

1. Put the `update.up` file **and the `XX` folder** from `ID7_Recovery_XX.zip` on the stick, side by
   side at its root<SourceCite ids="C2-09" />. On this route that is the one exception to "only the
   firmware on the stick".
2. Start the console, then follow Mazda's procedure above. There is **no failsafe**: after **99** and
   **Search**, select **Update Package**, then **Update**<SourceCite ids="F-49" />. The pedal rule
   applies exactly as above.
3. When the update is complete, the console text stops. **Before switching the ignition off or
   restarting anything**, paste this into the console<SourceCite ids="C2-09,C2-11" />:

   ```sh
   cp -r /mnt/sd*/XX/* /mnt/data_persist/dev/bin/; chmod +x /mnt/data_persist/dev/bin/autorun; /mnt/data_persist/dev/bin/autorun
   ```

4. Error messages at this point are expected<SourceCite ids="C2-09" />. After a minute, turn ACC off and
   on again, then continue with Mazda's steps from *(26)*.

This has to be repeated after **every** later flash, because each one deletes ID7 v2
again<SourceCite ids="C2-11" />. Before installing it, read [what ID7 leaves on your car](/security/).

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

What you flash, if anything, depends on the exact build<SourceCite ids="C2-17,F-19" />:

- **70.00.367:** you can downgrade by USB to **70.00.352 or 335**, a single `update.up` for your market.
  That puts you on the serial-console route, and the flash itself is the one in the
  [serial route's block](#what-your-route-changes) above, with the console attached. If you would rather
  use the mp3 method, it has one report of working on 70.00.367 itself<SourceCite ids="B-01" /> ⚠️. In
  that case there is nothing to flash.
- **74.00.230:** a downgrade to v70 has been done, but only on the bench<SourceCite ids="F-19" /> ⚠️.
  This site does not give a procedure for it.
- **74.00.310 and later:** there is **no USB road back to v70**. The unit hides every lower version from
  the package list<SourceCite ids="C2-17,F-24,F-19" />. There is nothing to flash. Go on to
  [step 3](/procedure/rebrand), where the mp3 method and the script edits for 74.00.324 are covered.

[Points of no return](/firmware/points-of-no-return) explains each of these limits.

</RouteBranch>

## Before you move on

The version string reads 70.00.100 for your market, or the build your route called for. The unit boots
with Mazda's animation and shows a compass where the map was. If you are on the serial route, the ID7 v2
command went in before the first reboot.

**[3 · Restore Fiat branding and navigation →](/procedure/rebrand)**

---

**Related:** [choose your route](/procedure/) · [1 · Prepare](/procedure/prepare) ·
[risks and one-way doors](/guide/risks) · [regions and file naming](/firmware/regions) ·
[recovering a bricked unit](/recovery/brick)
