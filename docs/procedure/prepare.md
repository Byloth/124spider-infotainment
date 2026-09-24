---
title: 1 · Prepare
---

<script lang="ts" setup>
import RouteBranch from "@theme/components/RouteBranch.vue";
import SourceCite from "@theme/components/SourceCite.vue";
import StepChecklist from "@theme/components/StepChecklist.vue";
</script>

# 1 · Prepare

Everything on this page happens before the car's firmware is touched: getting the parts and files, making
a USB stick that will not fail halfway through a flash, and recording or removing whatever the flash would
otherwise destroy. On one route it also includes the most important step of the whole procedure,
installing ID7, which can only be done now.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

If you do not yet know which route you are on, [choose your route](/procedure/) first. Most of this page
is the same for everyone. What differs by route is collected [at the end](#what-your-route-adds).

## Parts

Buy the CarPlay / Android Auto USB hub and the cable set for your market now, but **do not fit them yet**.
Everything up to step 4 is done through the car's **original** USB hub. Once the new hub is fitted, the
software can no longer be updated<SourceCite ids="E-08,E-21" />. [Choose your route](/procedure/) explains
why the order matters, and [part numbers](/hardware/part-numbers) lists what to buy for each market.

Also have a **battery charger** that can hold the battery up during the flash. Mazda's own service
bulletin asks for a charge current of about 7 A<SourceCite ids="F-50" />.

## Files

What you need depends on your route, but everyone needs the first three:

| File | Who needs it | What it is for |
| --- | --- | --- |
| `cmu150_<REGION>_70.00.100A_failsafe.up` | Every route that flashes | Step 2, installed first |
| `cmu150_<REGION>_70.00.100A_reinstall.up` | Every route that flashes | Step 2, installed second |
| `MazdaToFiatV70AIO.zip` | Everyone | Step 3: Fiat / Abarth branding, boot animation and navigation |
| `autorun_copy_to_usb.zip` (ID7) | Install ID7 from USB | Installed on this page, [below](#install-id7-now) |
| `ID7_Recovery_XX.zip` (ID7 v2) | Serial console during the flash | Pasted in during step 2 |
| The `mzd-connect-1-root` payload | The mp3 method | Step 3 |

`<REGION>` must match your car's market: `NA`, `EU`, `4A` (ADR) or `JP`, as explained on
[regions and file naming](/firmware/regions). Flashing another market's firmware is treated everywhere as a
brick risk. Which file to get for
which market, where each one comes from and the hashes to check against are all on
[obtaining and verifying the files](/firmware/obtaining). Nothing is duplicated here, so there is one
place to keep correct.

Also print **Mazda's own update procedure**: the 30-step dealer document for these files<SourceCite ids="D-04,F-49" />.
Step 2 on this site explains that document; it does not replace it.

Two things about the downloads themselves:

- **Download each `.up` file on its own.** Some file hosts offer a "download all" button that zips the
  whole folder first, and that zip has corrupted the update files<SourceCite ids="A-01" />.
- **Check the hash of every file before copying it to the stick**, not after. An antivirus program that
  quietly modifies a download gives you a corrupt file with the right name. The unit then rejects it with
  a certificate or validation error, halfway through the process<SourceCite ids="F-47,F-24" />.

## The USB stick

A failing USB stick is the most common cause of a failed flash, and a failed flash can leave the unit
unusable<SourceCite ids="A-01" />. The stick deserves more care than it seems to need.

- **FAT32, one partition, 4–16 GB.** Sticks larger than 32 GB are formatted exFAT by default and the unit
  does not see them<SourceCite ids="A-01,F-24" />.
- **Format it on Windows.** macOS writes hidden files to the stick, and Mac-formatted sticks have been
  rejected repeatedly<SourceCite ids="A-01,F-24,F-47" />.
- **USB 2.0 is the safer choice.** Some USB 3.0 sticks work, but in one long-running thread "Install not
  successful" was fixed by switching to an old 2 GB USB 2.0 stick<SourceCite ids="F-31" />.
- **Put nothing else on it.** For the flash, the stick holds only the two `.up` files. For ID7, it holds
  only the contents of the ID7 package<SourceCite ids="F-49,B-05" />.

What owners have reported, for what it is worth. These are individual reports, not a tested list:

| Worked | Did not work |
| --- | --- |
| SanDisk Ultra (USB 3, 32 GB)<SourceCite ids="F-28" /> | An unnamed 8 GB stick, not recognised<SourceCite ids="F-28" /> |
| SanDisk Cruzer Blade 16 GB, Verbatim 8 GB, Transcend 8 GB<SourceCite ids="F-28" /> | A no-name 32 GB stick: the update stuck at 19–21 %<SourceCite ids="F-36" /> |
| Cheap no-name 2–8 GB sticks<SourceCite ids="F-28,F-31" /> | "Some USB 3.0 sticks"<SourceCite ids="F-31" /> |
| A branded Toshiba stick, after a no-name one failed<SourceCite ids="F-36" /> | |

Before any firmware goes on it, **test the stick with H2testw**: write it full and confirm that every
byte reads back. A fake-capacity or failing stick passes a quick look and corrupts the image during the
write. The details are on [obtaining and verifying the files](/firmware/obtaining#two-things-a-hash-cannot-tell-you).

## Before you flash

These have to be done before step 2. Several of them cannot be done afterwards.

**Write down your settings.** Radio presets, sound settings and every personalisation are reset on every
flash<SourceCite ids="F-50" />. There is no tool for this; take photos of the screens.
[What you lose every single flash](/guide/what-changes#what-you-lose-every-single-flash) has the list.

**Un-pair every phone, in the car *and* on the phone.** After the flash the car's Bluetooth identity
changes and every old pairing becomes invalid. The menu to delete them is gone until the branding is
restored, so any pairing left in place stays behind as a dead entry<SourceCite ids="B-01" />.

**Remove the navigation SD card, and every other USB and AUX device.** Only the update stick stays
connected<SourceCite ids="F-49,D-04" />. Keep the SD card safe. It holds your maps and goes back in once
step 3 is done.

**Uninstall any tweaks already on the unit**, using the uninstall option of the tool that installed them.
Ameridan's guide names the large ones in particular: Speedometer, the community Android Auto app and
CASDK<SourceCite ids="B-01" />. See [the open question below](#tweaks-left-installed) for why. **ID7
itself is the exception.** If you are on the ID7 route, do not uninstall it: it is what the rest of the
procedure depends on<SourceCite ids="B-05" />.

**Clear the stored fault codes.** Open the diagnostic screen (hold **Music + Mute + Favorites**), then
**3** → ENTER / CLEAR, and **2** → ENTER. Mazda's procedure does this before updating<SourceCite ids="F-49,F-47" />.

**Connect the battery charger, and switch off every electrical load.** Mazda's bulletin names the
blower, the rear defogger and the interior lamps, and asks for the charger to "stabilize voltage
fluctuation"<SourceCite ids="F-50" />. The flash takes most of an hour with the car in accessory mode, and
losing power partway through is the classic way a unit gets bricked. Step 2 explains the rest of that
danger.

<StepChecklist id="procedure-prepare" :items="[
  'Parts bought, but the original USB hub still fitted',
  'Firmware files for your market downloaded one at a time',
  'Hash of every file checked before copying',
  'USB stick: FAT32, 4-16 GB, formatted on Windows',
  'USB stick tested with H2testw',
  'Mazda update procedure printed',
  'Settings, presets and personalisation photographed',
  'Every phone un-paired, in the car and on the phone',
  'Navigation SD card removed and kept safe',
  'Every other USB and AUX device removed',
  'Existing tweaks uninstalled (but not ID7)',
  'Stored fault codes cleared',
  'Battery charger connected',
  'Blower, rear defogger, lamps and other loads off'
]" />

### Tweaks left installed {#tweaks-left-installed}

❓ **The sources disagree.** The MZD-AIO FAQ says it is safe to update with its tweaks
installed<SourceCite ids="F-53" />. On the other side are updates that failed with tweaks still in place:
"Failsafe file installation failed", with the failsafe version disappearing from the About screen. In
one thread, removing the tweaks is what fixed it<SourceCite ids="F-26,F-19" />. Neither side is a
controlled test.

This site recommends removing them, because the two costs are unequal. If the FAQ is right, you lose
tweaks you can reinstall. If it is wrong, you get a failed flash. Leave ID7 alone.

(A different and well-documented failure is running old v56-era tweak packages *on* v70 after the flash.
That is a step 3 hazard, and [step 3](/procedure/rebrand) covers it.)

## What your route adds {#what-your-route-adds}

Every block stays readable whatever your route. If you used the [route wizard](/guide/route), yours is
marked.

<RouteBranch :routes="['id7-from-usb']">

### Install ID7 now {#install-id7-now}

This is the one step on this route that cannot be done later. From 59.00.502 on, Mazda closed the USB
autorun that ID7 installs through<SourceCite ids="B-05" />, and the flash in step 2 takes you past that
point. Before installing it, read [what ID7 leaves on your car](/security/): three root accounts and an SSH
service that stay on the unit permanently.

1. On a computer, unzip `autorun_copy_to_usb.zip` and copy its **contents** (not the folder) to the root of
   the empty, Windows-formatted stick<SourceCite ids="B-05,A-01" />. Check that every file arrived.
   One owner whose stick was missing a file found out only after the flash<SourceCite ids="A-01" />.
2. Switch Bluetooth off on every paired phone, unplug any USB cables and remove the navigation SD card.
   If a phone is still connected the unit keeps looking for it, which delayed one install by several
   minutes<SourceCite ids="A-01" />.
3. Plug in the stick. Press START **once, without touching the pedals**, to reach accessory mode (ACC).
4. Set the audio source to **FM**<SourceCite ids="A-01" />.
5. Wait. After a few minutes (up to 5–10) a dialog titled **"Tweaks Selection for AUTORUN"** appears,
   reading "Choose Installation Method", with **Install / Uninstall / Skip**. Choose **Install**.
6. If an older autorun is already on the unit, a second dialog asks **"autorun found — Would you like to
   update?"**. Choose **Update**.
7. About a minute later: **"autorun installation complete — Reboot?"** Choose **Now**.
8. When the screen goes black, remove the stick.

The dialog wording in steps 5–7 is quoted from the installer script inside the package the project
holds<SourceCite ids="C2-25" />. Forum write-ups paraphrase it in different ways, but they all describe the
same dialogs.

::: warning There is no reliable way to confirm that ID7 took
The completion dialog is the only sign you get. Ameridan treats it as proof enough<SourceCite ids="B-03" />,
but owners have finished these steps,
flashed v70, and only then found that the branding tool never ran and navigation was
gone<SourceCite ids="A-01,B-05" />. They then needed the serial console, which means taking the dashboard
apart. Before you flash, double-check the files on the stick, and repeat the install if you are in any
doubt. The installer is written to handle a second run (that is the "update" dialog in step 6), and it
costs a few minutes.
:::

If you are on a build between 59.00.502 and 70.00.130 and are *certain* ID7 is already on the unit, there
is nothing to install. If you are not certain, you are on the next route.

</RouteBranch>

<RouteBranch :routes="['serial-or-mp3']">

Nothing extra to install: USB autorun is already closed on your firmware. Have the
`mzd-connect-1-root` payload and a **USB keyboard** ready for step 3. ⚠️ It is not known whether the
original hub's ports will drive the keyboard. [Step 3](/procedure/rebrand) covers this, so read it before
you flash. If you plan to use the serial console instead, you also need a USB-to-serial adapter and
access to the unit's serial pins, which means taking the dashboard apart.

</RouteBranch>

<RouteBranch :routes="['id7v2-serial']">

A **USB-to-serial adapter**, access to the unit's serial pins (the dashboard comes apart) and
`ID7_Recovery_XX.zip`, with the commands you will paste ready to hand. They go in during step 2, before the
first reboot, and there is no second chance within that flash<SourceCite ids="C2-11,C2-14" />.
[Flash](/procedure/flash) has the timing.

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

The `mzd-connect-1-root` payload and a **USB keyboard**. If your build allows a downgrade and you plan to
take it, you also need the downgrade firmware, which [points of no return](/firmware/points-of-no-return)
covers build by build. ⚠️ Whether the original hub's ports drive the keyboard is unresolved;
[step 3](/procedure/rebrand) covers it.

</RouteBranch>

## Before you move on

Everything on the checklist is done, every file has matched its hash, and the stick has passed H2testw
and holds only the two `.up` files for your market. If you are on the ID7 route, it is installed.

**[2 · Flash the firmware →](/procedure/flash)**

---

**Related:** [choose your route](/procedure/) · [obtaining and verifying the files](/firmware/obtaining) ·
[what you gain and lose](/guide/what-changes) · [what the tweaks leave on your car](/security/)
