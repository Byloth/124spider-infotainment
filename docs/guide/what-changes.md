---
title: What you gain and lose
---

<script lang="ts" setup>
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# What you gain and lose

Flashing Mazda firmware onto the car gives you CarPlay and Android Auto and, in the same stroke, strips
the car of everything that made it look and behave like a Fiat. Most of that damage is repairable; some of
it is not; and a little of it you have to prevent *before* you start, because once it is gone the tools
cannot bring it back. This page is the honest ledger.

## What you gain

| Gained | Notes |
| --- | --- |
| **Apple CarPlay** | Wired. Touch works when the car is stationary. |
| **Android Auto** | Wired. See the "never fixable" list below for its two limitations. |

That is the whole reason for doing this. Everything else on the page is the cost side.

## What you lose but can get back

All of these are restored by the rebranding tool **`MazdaToFiatV70AIO`** (with factory navigation needing
its bundled folder swap). Every one of them depends on **tweak access** — ID7, serial, or the mp3 method —
so whether you can apply them at all is decided by your firmware version. See
[points of no return](/firmware/points-of-no-return) and [what the tweaks leave on your car](/security/).

| Lost on the Mazda flash | Restored by | Note |
| --- | --- | --- |
| Fiat / Abarth boot **and** shutdown animations | `MazdaToFiatV70AIO` | — |
| "Mazda" wording throughout the interface | `MazdaToFiatV70AIO` | Across **9 UI locales**. |
| The CarPlay brand icon | `MazdaToFiatV70AIO` | Set to the Fiat badge or the Abarth scorpion. |
| **Factory navigation** | The bundled NNG-folder swap | See the explanation below — this one is not obvious. |
| The Bluetooth device name | `MazdaToFiatV70AIO` | Reset to "124 Spider". **But read the warning below first.** |

### Why navigation breaks — and why it is not a fault

When you flash Mazda firmware, the car stops offering navigation and shows a **compass-only screen**. This
is not a bug and not a broken SD card. The Mazda firmware **checks the car's VIN against an ND (MX-5) VIN**
before it will load the map data, and a 124's VIN is not one — so it refuses the Fiat navigation
card<SourceCite ids="B-01" />. The fix is to swap in the correct NNG map-engine folder, which the
rebranding tool bundles. (The North-American Fiat NNG folder works for NA, EU and ADR alike; Japan is the
exception.)

::: warning Un-pair your phones before you flash
The flash invalidates every existing Bluetooth pairing, and **you cannot remove the old pairings
afterwards** — the menu to do so is gone until branding is restored. Delete your paired phones from the
car *before* you start, or you will be left with dead entries you can't clear<SourceCite ids="B-01" />.
:::

## What you lose every single flash

These reset to factory on **every** re-flash — and you will likely flash more than once. There is no tool
for them; the only defence is to write them down first.

- Personal settings
- Radio favourites
- Sound settings
- Paired phones (see the warning above)

**Gracenote** (the music-recognition database) also resets to **v8** after the v70 flash. It can be
re-applied afterwards<SourceCite ids="B-01" />.

::: tip Record everything before you begin
Photograph your radio presets and your sound settings, and write down anything else you have customised.
Every flash is a factory reset for these, and no amount of tweaking brings them back.
:::

## What you can never fix

| Never recoverable | Why |
| --- | --- |
| The **Mazda logo on the Android Auto exit icon** | That package is cryptographically signed; nobody has cracked it. |
| **Touchscreen inside Android Auto** | Disabled by Mazda's own design. (CarPlay touch works, stationary.) |
| **Wireless CarPlay** | Needs firmware ≥ 74.00.200 **and** different CMU hardware — not achievable on this unit. |

None of these is a limitation of the tools or of this procedure. They are properties of the Mazda platform
itself, and no route on this site changes them<SourceCite ids="B-01" />. If wireless CarPlay is what you
are after, this upgrade is not the way to get it.

---

**Related:** [start here](/guide/) · [is my car eligible?](/guide/eligibility) ·
[risks and one-way doors](/guide/risks) · [points of no return](/firmware/points-of-no-return) ·
[what the tweaks leave on your car](/security/)
