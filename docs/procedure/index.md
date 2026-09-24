---
title: Choose your route
---

<script lang="ts" setup>
import RouteBranch from "@theme/components/RouteBranch.vue";
import SourceCite from "@theme/components/SourceCite.vue";
import RouteComparison from "@theme/components/diagrams/RouteComparison.vue";
</script>

# Choose your route

The procedure is five steps, always in the same order: **prepare, flash the firmware, restore the Fiat
branding and navigation, install the hardware, verify.** What changes from car to car is what happens
*inside* some of those steps — above all, how you get the access that the rebranding tool needs. That is
decided by where your car starts, and it is what this page sorts out before you begin.

::: warning Nothing here has been tested on a car by this project
Every step in this procedure is a synthesis of community reports and Mazda's own documents. Where a step
rests on a single report it is marked as such. Read the whole of your route before you start, and treat
the tidy layout of these pages as presentation, not as proof that it works.
:::

## The four routes

Find the row that matches your car's current firmware version (**Home → Settings → System → About →
Version information**). If you do not know your version yet, or are not sure whether ID7 is installed,
[which route is mine?](/guide/route) walks you through it and names your route.

| Route | Your car is on | Where tweak access comes from | What is different about it |
| --- | --- | --- | --- |
| **Install ID7 from USB, then flash** | 56.00.521 / 530 (any build below 59.00.502) — or up to 70.00.130 with ID7 *genuinely* installed | ID7, installed from a USB stick *before* the flash | The simplest path, and only open at the very start |
| **Flash first, then the mp3 method (or serial)** | 59.00.502–70.00.130 without ID7 — including Fiat's 59.00.524 / 562 / 563 | The mp3 method after the flash; or a serial console | Side-loading is already closed; you regain access once on 70.00.100A |
| **Serial console during the flash** | 70.00.335 / 352 | ID7 v2, pasted over a serial console before the first reboot | Needs a serial adapter and the dashboard apart, and has to be repeated after every flash |
| **The mp3 method only** | 70.00.367 / 74.x | The mp3 method — the only reported way in | The evidence is thin outside a couple of builds |

These are the rules from the research<SourceCite ids="B-01,C2-11,C2-14,C2-17" />; the reasons behind the
version boundaries are on [points of no return](/firmware/points-of-no-return). If you are starting from
**Fiat 59.00.562 / 563**, note that the very first flash from those builds onto 70.00.100A is itself
[unconfirmed](/guide/eligibility).

## The order of operations

::: danger Firmware first, with the old hub still fitted. Hardware last.
Mazda's own instructions for the retrofit kit are explicit: *"Once the CMU has been attached to the
CarPlay/Android Auto-compatible USB hub, the software cannot be updated."*<SourceCite ids="E-08,E-21" />
The same instructions require firmware 70.00.21 or later before the hub goes in — older software may not
recognise it at all.

So every route flashes and rebrands through the car's **original** USB hub, and the new hub is fitted only
in step 4. If the new hub is already in your car, refit the old one before you flash<SourceCite ids="E-08,E-06" />.
:::

One open question sits right on this boundary: the mp3 method needs a USB keyboard, and it is **not known
whether the original hub's ports will drive one** — the only related report comes from an owner with the
*new* hub, who found its ports greyed out. ⚠️ It is unresolved. If your route uses the mp3 method, read
[step 3](/procedure/rebrand) before you start, not when you get there.

## Your route through the five steps

Each block below is one route, laid out step by step. If you used the [route wizard](/guide/route), your
route is marked and the others are dimmed — but every block stays fully readable, so you can see what the
other routes do and why yours is different.

<RouteBranch :routes="['id7-from-usb']">

1. **[Prepare](/procedure/prepare)** — including **installing ID7 from a USB stick, now**. It is the single
   most important step on this route and impossible once you have flashed past it. There is no reliable
   confirmation that it took; several owners only found out it had failed after the flash. Read
   [what ID7 leaves on your car](/security/) before you install it.
2. **[Flash](/procedure/flash)** 70.00.100A for your region — failsafe first, then reinstall.
3. **[Restore branding and navigation](/procedure/rebrand)** from a plain USB stick: ID7 runs the tool for
   you.
4. **[Install the hardware](/procedure/hardware).**
5. **[Verify](/procedure/verify).**

If you are on a build from 59.00.502 up to 70.00.130 and are *certain* ID7 is already installed, skip the
install in step 1 — the rest is the same. If you are not certain, you are on the next route instead:
assuming ID7 is there when it is not only shows up *after* the flash, when the branding and navigation are
already gone.

</RouteBranch>

<RouteBranch :routes="['serial-or-mp3']">

1. **[Prepare](/procedure/prepare)** — nothing extra to install; plain USB side-loading is already closed
   on your firmware.
2. **[Flash](/procedure/flash)** 70.00.100A for your region — failsafe first, then reinstall. From Fiat
   59.00.562 / 563, this first flash is [unconfirmed](/guide/eligibility).
3. **[Restore branding and navigation](/procedure/rebrand)** using the **mp3 method**, which runs the tool
   from a USB stick and a USB keyboard and leaves nothing installed. It is confirmed on
   70.00.100<SourceCite ids="A-13,B-04" />. The alternative is a serial console, which needs the dashboard apart
   and is now the fallback.
4. **[Install the hardware](/procedure/hardware).**
5. **[Verify](/procedure/verify).**

</RouteBranch>

<RouteBranch :routes="['id7v2-serial']">

1. **[Prepare](/procedure/prepare)** — plus a USB-to-serial adapter and access to the unit's serial pins,
   which means taking the dashboard apart.
2. **[Flash](/procedure/flash)** with the serial console attached, and paste the ID7 v2 commands **before
   the first reboot**. Your firmware has already deleted ID7 and the serial credentials; this is the one
   window in which they can be put back<SourceCite ids="C2-11,C2-14" />.
3. **[Restore branding and navigation](/procedure/rebrand)** — on 70.00.335 / 352 the tool's version check
   has to be edited first, which step 3 explains.
4. **[Install the hardware](/procedure/hardware).**
5. **[Verify](/procedure/verify).**

ID7 v2 has to be re-applied after **every** later flash, because each one wipes it again. The mp3 method
may also work on these builds, but one owner could not get it to run on 70.00.335 ⚠️ — see
[points of no return](/firmware/points-of-no-return).

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

1. **[Prepare](/procedure/prepare)** — plus the mp3-method payload and a USB keyboard.
2. **[Flash](/procedure/flash)** — on this route, whether you flash at all, and to what, depends on your
   exact build:
   - **70.00.367:** a USB downgrade to 70.00.352 or 335 is documented, after which the serial route's
     ID7 v2 at install becomes possible again ([points of no return #3](/firmware/points-of-no-return#pnr-3)).
   - **74.00.230:** a downgrade to v70 has been done, but only on the bench<SourceCite ids="F-19" /> ⚠️.
   - **74.00.310 and later:** there is **no USB road back to v70**<SourceCite ids="C2-17,F-19" />
     ([points of no return #4](/firmware/points-of-no-return#pnr-4)). You stay where you are, and on
     74.00.324 the rebranding tool needs a few script edits, which step 3 explains.
3. **[Restore branding and navigation](/procedure/rebrand)** using the **mp3 method** — the only reported
   way in, since serial login is dead and updates are signed. It is confirmed on 74.00.324 / 311; on
   70.00.367 it rests on a single report ⚠️<SourceCite ids="C2-17,B-01" />.
4. **[Install the hardware](/procedure/hardware).**
5. **[Verify](/procedure/verify).**

</RouteBranch>

## Three ways in, and what each leaves behind

The routes differ in how they get access, and those three mechanisms are not equivalent. Two of them
install a permanent remote-login service on the car; one leaves nothing at all. That is this project's own
finding from reading the tweak packages — [the security section](/security/) has the detail — and it is
worth knowing before you pick between two options that both work.

<RouteComparison />

Where both are open to you, the trade runs in both directions. ID7 has years of use behind
it<SourceCite ids="B-05,B-06" /> and works where it works; what it costs is a permanent remote-access
service. The mp3 method costs nothing afterwards, but it is new: confirmed on 70.00.100 and 74.00.324 /
311<SourceCite ids="A-13,B-04" />, one report deep elsewhere, and one owner could not get it to run at all.
This site does not choose for you — [the security section](/security/) sets out both columns in full.

::: danger Do not let a dealer touch the CMU
Mazda dealers flash the newest firmware they have, and Fiat dealers have flashed Mazda firmware onto 124s
by mistake — owners have lost their branding and navigation both ways<SourceCite ids="B-01,A-01" />. If
your car goes in for other work while you are part-way through, make sure nobody "updates" the
infotainment.
:::

## Before you start

The five steps assume you have been through [start here](/guide/): that your car is
[eligible](/guide/eligibility), that you know [what you gain and lose](/guide/what-changes), and that you
have read [risks and one-way doors](/guide/risks). If you have not, do that first — some of what the
upgrade removes has to be recorded *before* step 1.

When you are ready: **[1 · Prepare →](/procedure/prepare)**

---

**Related:** [which route is mine?](/guide/route) · [points of no return](/firmware/points-of-no-return) ·
[obtaining and verifying the files](/firmware/obtaining) · [what the tweaks leave on your car](/security/)
