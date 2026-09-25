---
title: 3 · Restore Fiat branding and navigation
---

<script lang="ts" setup>
import RouteBranch from "@theme/components/RouteBranch.vue";
import SourceCite from "@theme/components/SourceCite.vue";
import StepChecklist from "@theme/components/StepChecklist.vue";
</script>

# 3 · Restore Fiat branding and navigation

After step 2 the car runs Mazda's firmware and looks like it: Mazda's boot animation, a Bluetooth name of
"Mazda", and a compass where the map used to be. This step puts the Fiat or Abarth face back and, more
importantly, gets the factory navigation working again. It does this by running one script on the unit.
What differs from car to car is **how you get the unit to run it**, and that is what the route blocks
below cover.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

## What restores it

One package does the whole job: **`MazdaToFiatV70AIO.zip`**, by the 124 owners 68wooley and Ameridan. It
is a single-purpose build of the MZD-AIO tweak installer with the Fiat and Abarth material added:
animations, interface wording, the CarPlay icon, the Bluetooth name, and the North American Fiat
navigation folder<SourceCite ids="B-01" />. The upstream MZD-AIO project has none of that, and it is not
a substitute. Where to get the package and its hash is on
[obtaining and verifying the files](/firmware/obtaining).

Navigation is broken because Mazda's firmware checks the car's VIN before it loads the map data, and a
124's VIN does not pass. The package replaces Mazda's navigation engine folder with Fiat's<SourceCite ids="B-01" />.
The North American Fiat folder is used for NA, EU and ADR cars alike.

## Before you start

- **Step 2 is finished**, and the version string reads 70.00.100 for your market, or the build your route
  left you on.
- **The original USB hub is still fitted.** The new hub goes in at step 4.
- **Tweaks from the v56 era have not been run on v70.** See [the warning below](#never-run-v56-era-packages-on-v70).
- **No phone is paired.** If you paired one to the car since the flash, un-pair it now, in the car and on
  the phone. The tool changes the car's Bluetooth name, and a pairing made under "Mazda" stays behind as
  a stale entry<SourceCite ids="B-01" />.
- **The navigation SD card is out.** It goes back in after this step<SourceCite ids="B-01,A-01" />.
- **A FAT32 stick, formatted on Windows**, with the contents of `MazdaToFiatV70AIO.zip` (not the folder)
  copied to its root. Your route may add files to it; see its block.
- **A battery charger connected.** The car runs in ACC for the whole step. The navigation restore takes
  several minutes and the optional debug copy up to half an hour, so the pedal rule from
  [step 2](/procedure/flash#the-pedal-rule) still applies: press the clutch or brake about every 20
  minutes<SourceCite ids="B-01" />.

## The seven questions the tool asks

Every route ends at the same script, so it asks the same questions in the same order. The wording below
is quoted from the `tweaks.sh` in the package this project holds. The script itself is safe to run again
later to pick up anything you skipped<SourceCite ids="B-01" />.

First it checks the firmware version. On a build it accepts, it shows *"Detected compatible version …"*
and asks you to continue: choose **YES**. On any other build it shows *"PLEASE UPDATE YOUR CMU FW TO
VERSION 70 BEFORE APPLYING THESE UPDATES"*, **renames its own `tweaks.sh` to `_tweaks.sh` on the stick**
and reboots. If that happens, the script needs the edits for your build (see your route's block), and the
file has to be renamed back to `tweaks.sh` before it will run again.

| # | Dialog title | What it asks | What it does |
| --- | --- | --- | --- |
| 1 | SELECT BRANDING | *"Do you want to update your CMU with Fiat or Abarth branding?"* | Buttons **FIAT** / **ABARTH**. Every later step uses this choice. |
| 2 | REPLACE BOOT ANIMATION | *"Do you want to replace the Mazda startup and shutdown annimations?"* | Replaces both animations. A Mazda logo can still flash briefly on a hard reboot<SourceCite ids="B-01" />. |
| 3 | UPDATE RESPOURCE FILES | *"Do you want to replace the word 'Mazda' with '…' in the system interface where possible?"* | Rewrites the interface text in 9 languages: German, English (AU, UK, US), Spanish, French (FR, CN), Italian, Dutch. Other languages keep "Mazda". |
| 4 | REPLACE MAZDA CARPLAY ICON | *"Do you want to replace the Mazda icon in Apple CarPlay"* | Replaces the icon with the Fiat or Abarth badge. The iPhone still lists the car as "Mazda"<SourceCite ids="B-01" />. |
| 5 | RESTORE OEM NAVIGATION | *"Do you want to restore the OEM Navigation functionality?"* | **The one that matters.** Deletes Mazda's navigation folder and copies in Fiat's. *"This may take several minutes."* Do not switch off. |
| 6 | RESTORE OEM NAVIGATION *(sic)* | *"Do you want to change the vehicle Bluetooth ID from 'Mazda' to '124 Spider'?"* | Renames the car. It reuses the previous dialog's title, so read the question, not the title. It also clears some stored settings, after copying them to the stick. |
| 7 | COPY SYSTEM FOR DEBUG ANALYSIS | *"Do you want to copy your system to your USB stick for debug analysis? In most cases, you should answer 'No' to this …"* | A copy of the system for troubleshooting, not a backup you can restore. It needs a stick of at least 4 GB and can take up to 30 minutes<SourceCite ids="B-01" />. Answer **NO - FINISH**. |

The spelling mistakes are in the original. Dialogs 2–6 answer with **YES - CONTINUE** or **NO - SKIP**.
While a step runs, a message says *"You do not need to click OK on this screen."* At the end the unit
says *"THE SYSTEM WILL REBOOT IN A FEW SECONDS!"*, then *"YOU CAN REMOVE THE USB DRIVE NOW"*.

## Getting the tool to run: your route

Every block stays readable whatever your route. If you used the [route wizard](/guide/route), yours is
marked. There are three ways to run the script: **ID7 from USB**, the **mp3 method**, and a **serial
console**. [The security section](/security/) sets out what each one leaves on the car.

<RouteBranch :routes="['id7-from-usb']">

### With ID7 installed: a plain USB stick {#with-id7}

ID7 went in at step 1 and survived the flash, so the unit runs the script from a USB stick by
itself<SourceCite ids="B-01,B-05" />.

1. With the ignition off, check that the SD card is out and nothing else is plugged in.
2. Switch Bluetooth off on your phones.
3. Press START **once, without the pedals**, to reach ACC. Set the audio source to **FM**.
4. Plug the stick into the **upper** USB port<SourceCite ids="A-01" />.
5. Wait. After a few minutes the tool's first message appears, then the version check and the seven
   questions above.
6. When it says *"YOU CAN REMOVE THE USB DRIVE NOW"*, remove the stick.

**If nothing appears**, ID7 did not survive or never took. That is the failure step 1 warned about.
Owners in that position have used the serial console<SourceCite ids="A-01,B-05" />. Since 2025 the mp3
method is the lighter alternative (the next block describes both).

</RouteBranch>

<RouteBranch :routes="['serial-or-mp3']">

### Without ID7: the mp3 method {#mp3-method}

The mp3 method opens a terminal on the unit through its own diagnostic screen. It needs a USB keyboard
and installs nothing permanent<SourceCite ids="B-04,A-13" />. It is confirmed on 70.00.100 by several 124
owners<SourceCite ids="A-13,B-04" />.

::: warning Unresolved: the keyboard and the original hub
The method needs a USB keyboard in the second port. The owner who wrote it up had the **new** hub already
fitted<SourceCite ids="A-13" />. Whether the **original** hub's ports will drive a keyboard is not known ⚠️.
If the keyboard does nothing, you may have to fit the new hub (step 4) before this step. That does not
break Mazda's order of operations, because this step does not update the firmware. But any *future*
firmware update needs the original hub back in first.
:::

1. On the empty stick, copy the **contents** of the `mzd-connect-1-root` payload (four files named
   `a.mp3` to `d.mp3`, plus `dev.html`, a `js` folder and a `css` folder) to the root. Then copy the
   **contents** of `MazdaToFiatV70AIO.zip` to the same root. *"Yes you're mixing
   files."*<SourceCite ids="B-04" />
2. Start the unit in ACC and remove the navigation SD card.
3. Plug the stick into the **top** port and the keyboard into the **bottom** one.
4. Set the audio source to **USB1**. The unit "plays" the files. They are not music. They open the
   diagnostic screen.
5. A white screen appears, and about a minute later a black dialog. Select **Terminal** (you may need
   **Next** first). If no dialog appears, tap **Open Terminal**<SourceCite ids="B-04" />.
6. In the hard-to-read terminal, type these lines, pressing Enter after each:

   ```sh
   cd /mnt
   cd sdb1
   ./tweaks.sh
   ```

   If `sdb1` is not there, type `ls` after `cd /mnt` to see what is<SourceCite ids="B-04" />.
7. The screen fills with errors about missing directories. That is expected. The tool's dialogs follow,
   and from there it is the seven questions above.
8. When the unit reboots, remove the stick and the keyboard.

### Without ID7: the serial console {#serial-console}

The wiring below is also what the [serial route in step 2](/procedure/flash#what-your-route-changes)
needs during its flash. This is the pre-2025 way in. It still works on 59.00.502 up to 70.00.100<SourceCite ids="C2-08,C2-10" />,
but it is much more work than the mp3 method, and it leaves ID7 installed permanently. Treat it as the
fallback.

::: danger The canonical guide for this is on a hijacked domain
Old guides and forum posts send you to `mazdatweaks.com/serial/`. That address now serves a scam site.
[Old guides and dead links](/security/link-safety) has the details. Do not follow the link, and do not
download anything from that domain. The steps below come from a surviving 124-specific write-up<SourceCite ids="F-51" />.
:::

**What you need:** a CP2102 USB-to-serial adapter, **insulated, solid-core** wire, a 10 mm socket with an
extension, a terminal program (PuTTY or SecureCRT), and a stick holding an `XX` folder with the ID7
recovery scripts. For this use, MZD-AIO 2.7.9 or later generates the `XX` folder: **Autorun & Recovery**,
with "Recovery Via Serial Connection" and "Install ID_7 Recovery Scripts Pack" ticked<SourceCite ids="F-51" />.
Do not mix its contents with the ID7 v2 `ID7_Recovery_XX` pack<SourceCite ids="C2-10" />.

::: danger A bare wire destroyed an adapter and the unit's serial port
One 124 owner's transmit wire touched the unit's metal case. The adapter burned out, and the unit's
serial port no longer answered<SourceCite ids="F-60" />. Use insulated solid-core wire, and check the
connections with a multimeter before you power anything.
:::

1. **Get to the back of the unit.** Remove the centre panel with the hazard switch, then the unit's 10 mm
   bolt, and slide the unit out far enough to reach its connectors<SourceCite ids="F-51" />.
   [Step 4](/procedure/hardware) has the trim in order.
2. **Wire three connections** on the unit's main power connector: the adapter's **RX to pin 2S**, its
   **TX to pin 2T**, and **ground** to the unit's metal case, for example wedged under a slightly
   loosened case screw. Each wire goes about an inch into the connector<SourceCite ids="F-51" />.
   ❓ Two sources label these pins the opposite way round<SourceCite ids="F-51,F-62" />. If the console
   stays silent, swap RX and TX.
3. **Open the console**: the adapter's COM port, **115200 baud**, 8 data bits, no parity, 1 stop bit. Text
   should scroll even with the car off.
4. Plug in the stick with the `XX` folder. Press START once without the pedals to reach ACC.
5. Reboot the unit by holding **Nav + Mute** for 10 seconds or more. Press Enter in the console. At
   `login`, type **`user`**, then the password **`jci`**. The text scrolls so fast that you cannot see
   your typing. Paste rather than type<SourceCite ids="F-51,C2-08" />.
6. Paste this and press Enter<SourceCite ids="F-51" />:

   ```sh
   cp -r /mnt/sd*/XX/* /mnt/data_persist/dev/bin/; chmod +x /mnt/data_persist/dev/bin/autorun; /mnt/data_persist/dev/bin/autorun
   ```

7. Remove the stick and switch off. **ID7 is now installed**, with everything [the security section](/security/#what-id7-installs)
   describes. From here, the tool runs from a plain USB stick exactly as in the ID7 route:
   ignition off, SD out, ACC, FM, stick in the upper port, and wait for the dialogs. The
   [ID7 block above](#with-id7) has those steps in full.
8. When the tool has run, disconnect the three wires, slide the unit back, and refit the bolt and trim.

</RouteBranch>

<RouteBranch :routes="['id7v2-serial']">

### ID7 v2, put back during the flash {#id7-v2}

You pasted the ID7 v2 command at the end of step 2, so the unit runs scripts from USB again, as with
ID7<SourceCite ids="C2-11" />. The procedure is the one in the ID7 route: ignition off, SD out, ACC, FM,
stick in the upper port, wait for the dialogs.

**The script refuses 70.00.335 and 352 as it stands.** It accepts only builds up to 70.00.100. The
fix used by a 124 owner on 335 is one edit to `tweaks.sh`, in a plain-text editor (Notepad++, not
Word)<SourceCite ids="C2-12" />:

```sh
# line 161, inside compatibility_check()
if [ $_VER_EXT -le 100 ]    # before
if [ $_VER_EXT -le 360 ]    # after
```

That owner also built the stick from a **MZD-AIO 2.8.6** tweaks stick, replacing its `config` folder and
`tweaks.sh` with the ones from `MazdaToFiatV70AIO`, and set the version variables at the top of the file
to 2.8.6's. They were "not sure if necessary, but didn't try without"<SourceCite ids="C2-12" />. The line
161 edit is the one the version check depends on.

::: warning You are switching off a check the author put there deliberately
When the script meets a build above 70.00.100, it says why: *"AIO COMPATIBILITY HAS ONLY BEEN TESTED UP TO
V70.00.100"*. The edit makes it run anyway. It worked for the owner who reported it. Nobody has tested
it more widely.
:::

ID7 v2 is wiped by every later flash, so after any future update the serial console and step 2's paste
come back. If the dialogs never appear, the paste did not take: the mp3 method is the no-hardware
alternative, although one 124 owner could not get it to run on 70.00.335 ⚠️. See
[points of no return](/firmware/points-of-no-return).

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

### The mp3 method, with the script edited for your build {#mp3-only}

On 70.00.367 and every 74.x build, the mp3 method is the only reported way in. The steps are the mp3
steps in the second block on this page: payload plus tool on one stick, keyboard in the other port,
audio source USB1, **Terminal**, then `cd /mnt`, `cd sdb1`, `./tweaks.sh`<SourceCite ids="B-04" />.
⚠️ The same keyboard question applies: it is not known whether the original hub drives it.

**On 74.00.324 the script needs three edits** before it will run, all in `tweaks.sh`, in a plain-text
editor<SourceCite ids="B-04,B-01" />:

```sh
# line 159
elif [ $_VER -eq 70 ]    →  elif [ $_VER -eq 74 ]
# line 161
if [ $_VER_EXT -le 100 ] →  if [ $_VER_EXT -le 324 ]
# line 653
if [ $COMPAT_GROUP -ne 6 ] || [ $CMU_VER -ne 70 ]  →  if [ $COMPAT_GROUP -ne 6 ] || [ $CMU_VER -ne 74 ]
```

These lines match the `tweaks.sh` in the package this project holds. If you also run MZD-AIO 2.8.6
tweaks the same way, its `run.sh` needs line 184 changed from `-eq 70` to `-eq 74`<SourceCite ids="B-04" />.

- **74.00.331:** the write-up warns that AIO tweaks *"may disable wireless CarPlay"* on this build, and
  recommends them only up to 74.00.324<SourceCite ids="B-04" />.
- **70.00.367:** nobody has reported running this tool on 367. Reading the held script, its check rejects
  367 as it stands, just as it rejects 335. By the same logic, line 161 would need a value of at least 367.
  That is this project's reading of the script, not a report ⚠️.
- **The language gap on v74.** The tool's text files date from v70. A reader who compared them with
  74.00.324 EU found 9 language files where the firmware has 38 or 41 in the same folders, and a
  messaging file missing Ukrainian<SourceCite ids="B-01" />. Nobody has reported what that does in
  practice. At the least, a unit set to any other language keeps "Mazda" in places. Whether the older
  files drop any v74 text in the nine languages is unknown ⚠️.

The same warning applies as on the serial route: these edits switch off a check the author added because
they could not test later builds.

</RouteBranch>

## Never run v56-era packages on v70 {#never-run-v56-era-packages-on-v70}

::: danger Ameridan's AIO 1.51 and other v56 tweak packages break a v70 unit
Two 124 owners ran Ameridan's older tweak package (AIO 1.51, written for v56) after upgrading to v70. One
unit stuck at the Abarth logo with an unusable diagnostic screen, so it could not even be re-flashed. The
other lost its touchscreen and the knob's select button. **Both needed a used replacement
unit**<SourceCite ids="A-04,F-06" />. On v70, use only `MazdaToFiatV70AIO` and, for further tweaks,
MZD-AIO 2.8.3 or later<SourceCite ids="B-01" />.
:::

## After the tool has run

1. Let the unit reboot and remove the stick (and the keyboard, if you used one).
2. With the ignition off, **put the navigation SD card back**.
3. Start in ACC and check: the Fiat or Abarth animation, maps instead of the compass, the Bluetooth name.
   [Step 5](/procedure/verify) has the full list.
4. **Pair your phones again.** They see the car under its new name.
5. Ameridan's instructions end by re-applying the Gracenote music database, which supplies album and
   artist names for USB music<SourceCite ids="B-01" />. It is optional, and not part of what makes the
   upgrade work.

If something did not take, run the tool again and answer **YES** only to what is missing. It is written
to be run more than once<SourceCite ids="B-01" />.

<StepChecklist id="procedure-rebrand" :items="[
  'Phones un-paired; navigation SD card out; charger on',
  'Stick: FAT32, the tool contents at the root (plus the mp3 payload on that route)',
  'Script edited for your build, if your route needs it',
  'Version check passed and YES chosen',
  'Branding, animations, wording and CarPlay icon answered',
  'Navigation restored, pedal pressed if it ran long',
  'Bluetooth name changed; debug copy declined',
  'Stick removed after the reboot; SD card back in',
  'Maps showing instead of the compass',
  'Phones paired again'
]" />

## Before you move on

The unit boots with the Fiat or Abarth animation, the navigation shows maps with the SD card in, and the
car appears as "124 Spider" to your phone. Only now is it time for the new hub.

**[4 · Install the hardware →](/procedure/hardware)**

---

**Related:** [2 · Flash](/procedure/flash) · [what the tweaks leave on your car](/security/) ·
[old guides and dead links](/security/link-safety) · [points of no return](/firmware/points-of-no-return)
