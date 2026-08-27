---
title: Which route is mine?
---

<script lang="ts" setup>
import RouteWizard from "@theme/components/RouteWizard.vue";
import RouteBranch from "@theme/components/RouteBranch.vue";
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Which route is mine?

There are four routes through this upgrade, and which one is yours is decided entirely by where your car
starts — its firmware version, and whether ID7 is already installed. They are not interchangeable, and
none of them is the "normal" one: the right route for a 56.x car is the wrong route for a 74.x car and
vice versa.

Answer the questions below and the wizard names your route and lists the files you need. **Everything the
wizard tells you is also in the static table further down** — every route, nothing hidden — so this page
is complete even with scripting disabled.

<RouteWizard />

## The four routes

This is the whole map. Find the row that matches where your car is now; the wizard above just does this
lookup for you and fills in your region's filenames.

| Route | Your car is on | ID7 already installed? | The catch | Start at |
| --- | --- | --- | --- | --- |
| **Install ID7 from USB, then flash** | 56.00.521 / 530 (any build below 59.00.502) | Not needed — you install it now | The easy path, but only open at the very start | [Prepare](/procedure/prepare) |
| **Flash first, then the mp3 method (or serial)** | 59.00.502–70.00.130, no ID7 | No | Side-loading is already closed; you regain access after the flash | [Prepare](/procedure/prepare) |
| **Serial console during the flash** | 70.00.335 / 352 | Wiped by the firmware | Needs a serial adapter and the dashboard apart; repeat after every flash | [Choose your route](/procedure/) |
| **The mp3 method only** | 70.00.367 / 74.x | Gone, and unrecoverable | The only way in — and outside a couple of builds the evidence for it is thin | [Choose your route](/procedure/) |

If your car is on **56.x with ID7 already installed**, you are still on the first route — ID7 being
present just means that step is already done. If you are on **Fiat 59.00.562/563**, note the
[unconfirmed first flash](/guide/eligibility) before committing.

## Each route in detail

The block that matches your car is marked below; the others are dimmed but fully readable, so you can see
what you were *not* given. Each carries a short summary you can copy and take to the car.

<RouteBranch :routes="['id7-from-usb']">

For cars on **56.00.521 / 530** (or any build below 59.00.502). USB side-loading still works here, so you
install ID7 from a stick *first* — that is what keeps tweak access alive across the flash — then flash
70.00.100A and rebrand<SourceCite ids="B-01" />. It is the simplest route, and it is only available if you
have not already flashed past 59.00.502. ID7 leaves a permanent SSH service on the car; understand
[what it leaves behind](/security/) before installing it.

```
Route: Install ID7 from USB, then flash
Car on: 56.00.521 / 530 (or any build below 59.00.502)
Steps: install ID7 from USB → flash 70.00.100A (failsafe, then reinstall) → run MazdaToFiatV70AIO → restore nav
Files (your region): cmu150_<REGION>_70.00.100A_failsafe.up + _reinstall.up, MazdaToFiatV70AIO.zip
Watch: keep the unit powered through the whole flash; ID7 leaves a permanent SSH service
```

</RouteBranch>

<RouteBranch :routes="['serial-or-mp3']">

For cars on **59.00.502 through 70.00.130 without ID7** — including Fiat's own 59.00.524/562/563. Plain
USB side-loading is already gone, so you flash 70.00.100A first and regain tweak access afterwards, either
with the mp3 method (leaves nothing behind) or a serial console (dashboard apart)<SourceCite ids="B-01" />.
If you are starting from Fiat 59.00.562/563, the very first flash is the [unconfirmed
step](/guide/eligibility).

```
Route: Flash first, then the mp3 method (or serial)
Car on: 59.00.502–70.00.130, no ID7 (includes Fiat 59.00.524/562/563)
Steps: flash 70.00.100A (failsafe, then reinstall) → run the mp3 method (or serial) → run MazdaToFiatV70AIO → restore nav
Files (your region): cmu150_<REGION>_70.00.100A_failsafe.up + _reinstall.up, MazdaToFiatV70AIO.zip, the mp3-method payload
Watch: keep power up through the flash; if starting from Fiat 59.00.563 the first flash is unconfirmed
```

</RouteBranch>

<RouteBranch :routes="['id7v2-serial']">

For cars on **70.00.335 / 352**, where the firmware has already deleted ID7 and the serial credentials.
The only classic way in is to attach a serial console *during* the flash and paste the ID7 v2 commands
before the first reboot — and to repeat that after **every** later flash, because each one wipes it
again<SourceCite ids="C2-11,C2-14" />. The mp3 method may also work here, but one owner could not get it
to run on 70.00.335 — see [points of no return](/firmware/points-of-no-return).

```
Route: Serial console during the flash
Car on: 70.00.335 / 352
Steps: open the dashboard for serial access → flash → paste ID7 v2 over serial before first reboot → run MazdaToFiatV70AIO
Files (your region): the 70.00.100A pair (if downgrading) or your update.up, MazdaToFiatV70AIO.zip
Watch: ID7 v2 must be re-applied after every flash; serial means taking the dash apart
```

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

For cars on **70.00.367 or the 74.x line**, where serial login is dead and updates are signed. The mp3
method is the only reported way in. It is confirmed on 74.00.324/311 but **thin elsewhere** — a single
report on 70.00.367 — so weigh it against [the evidence](/firmware/points-of-no-return) before
committing<SourceCite ids="C2-17,B-01" />. It leaves nothing behind, which is its one clear advantage.

```
Route: The mp3 method only
Car on: 70.00.367 / 74.x
Steps: prepare the mp3-method payload + USB keyboard → open the JCI terminal → run the tweaks → run MazdaToFiatV70AIO
Files (your region): your update.up (or the 70.00.100A pair if downgrading), MazdaToFiatV70AIO.zip, the mp3-method payload
Watch: evidence is thin outside 74.00.324/311; check the firmware page for your exact build
```

</RouteBranch>

---

**Related:** [start here](/guide/) · [is my car eligible?](/guide/eligibility) ·
[points of no return](/firmware/points-of-no-return) · [what the tweaks leave on your car](/security/) ·
[choose your route in the procedure](/procedure/)
