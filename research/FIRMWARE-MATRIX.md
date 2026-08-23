# FIRMWARE MATRIX

Version × region matrix for the Fiat/Abarth 124 Spider CMU (Mazda Connect 1.0, shared with MX-5 ND),
plus upgrade/downgrade rules and the points of no return. Consolidated 2026-08-23 from
`research/raw/{B,C2,D,F}`. Source ids refer to `SOURCES.md`.

Markers: ✅ confirmed by ≥2 independent sources · ⚠️ single report / unverified · ❓ contradictory.

---

## 0. How to read a version string

`70.00.100A NA N` (Settings → System → About → Version Information):

| Part | Meaning |
|---|---|
| `70.00.100` | firmware version |
| trailing `A`/`B`/`C` | minor revision (later letter = newer, e.g. 335C newer than 335) [S-13] |
| `NA` / `EU` / `4A` / `JP` | region. **`4A` = ADR** = Australia/NZ/Middle East/Asia-Pacific/South Africa/South America [S-13] |
| final `N` / `M` | **nav protocol**: `N` = NNG/iGO (all regions), `M` = Matsukone/Zenrin (Japan only). Not a revision letter. [S-13] |

Filenames: `cmu150_<REGION>_<VERSION><rev>_<type>.up`, where `cmu150` is the head-unit family.
Types: `_failsafe.up` (~7 MB, bootloader/updater — install **first**), `_reinstall.up` (0.9–2.3 GB, the OS —
install **second**), `_update.up` (single-file, from 70.00.335 onward; failsafe folded in). [S-04, S-13]

---

## 1. The matrix

Columns: **CP/AA** = native CarPlay/Android Auto support · **USB tweaks OOTB** = an MZD-AIO /
MazdaToFiatV70AIO stick autoruns with no preparation · **ID7 v1 survives** = ID7 installed earlier keeps
working · **other route** = what is left if you have neither.

| Version | Region(s) | CP/AA | USB tweaks OOTB | ID7 v1 survives | Other route | Notes |
|---|---|---|---|---|---|---|
| 55.00.7xx | all | no | ✅ yes | n/a | — | 124 never shipped this |
| **56.00.521 / 56.00.530** | NA/EU/4A (+JP) | no | ✅ **yes** | n/a — **install ID7 v1 here** | — | **Factory firmware of MY2017 & early-2018 124/Abarth.** 530 = Abarth-branded boot animation. [S-10] |
| 56.00.511/513 (Mazda) | all | no | ✅ yes | n/a | — | Mazda base of Fiat 56.00.521 |
| 59.00.441–59.00.449 (Mazda) | all | no | ✅ yes | n/a | — | Last USB-tweakable Mazda builds [S-10, S-14] |
| **59.00.502** (Mazda, Jun-2017) | all | no | ❌ **no** | ✅ yes | serial ✅; mp3 ⚠️ | **★ POINT OF NO RETURN #1.** Patches the USB-autorun hole → side-loading dead. **Downgrade floor: nothing below this via USB.** [S-14, S-13] |
| 59.00.504/540/545/546 (Mazda) | NA/EU/4A | no | ❌ no | ✅ yes | serial ✅ | 545 is the target if you want the old AIO Android-Auto tweak |
| **59.00.524** (**124-only**) | NA/EU/4A | no | ❌ no | ✅ (only if car was on 56 with ID7) | serial ✅; mp3 ⚠️ | Fiat equivalent of Mazda 59.00.502; on 124s built from ~Nov-2017 [S-10] |
| **59.00.562 / 59.00.563** (**124-only**) | NA/EU/4A | no | ❌ no | ✅ (rare) | serial ✅ (assumed); **mp3 ⚠️ 1 report** on .563 | **Factory firmware of MY2019–2020 124s.** The "latest Fiat firmware" trap: no CarPlay, tweak-locked. Also arrives on replacement CMUs. [S-10, S-11] |
| 70.00.000A | EU beta | yes | — | — | — | First build with CP/AA code; never distributed |
| **70.00.021A/B** | NA=**B**, EU/4A=**A** | ✅ **yes** (first public) | ❌ no | ✅ yes | serial ✅ | Hub is recognised from here up. Two-file. Reported buggiest v70. [S-18] |
| **70.00.100A** | NA/EU/4A | ✅ yes | ❌ no | ✅ **yes** | serial ✅; **mp3 ✅** | **★ THE COMMUNITY TARGET.** Last v70 where ID7 v1 works and where `MazdaToFiatV70AIO` installs **unmodified** (its script accepts only `70.00.xxx` with ext ≤100). Last two-file build for the 124 path. [S-10, S-11, S-12] |
| 70.00.110 | JP | yes | — | — | — | JP only (Matsukone) |
| 70.00.120 | NA | yes | — | — | — | Echo fix; via Mazda repair contractor only, never released |
| 70.00.130 / 137 / 150A | NA/EU/4A | yes | ❌ no | ❓ unknown | — | Interim builds; **no data in any source about tweak status** ❓ |
| **70.00.335C** | NA/EU/4A | yes | ❌ no | ❌ **NO** | **ID7v2-at-install** ✅ (serial during the flash); mp3 ⚠️ (one 124 owner failed) | **★★ POINT OF NO RETURN #2.** Runs `neutralizeid7` + forced `passwdupdate`: deletes ID7 v1 *and* any pre-installed "v2", removes the serial credentials. First **single-file** `update.up`. Fixes BT echo. [S-15, S-36] |
| 70.00.352B | NA/EU/4A | yes | ❌ no | ❌ no | **ID7v2-at-install ✅** (last version where it works); mp3 ⚠️ | Same neutralize as 335. MazdaToFiat needs the `_VER_EXT -le 360` edit [S-23]. |
| **70.00.367A** | NA/EU/4A | yes | ❌ no | ❌ no | **serial ✗, ID7v2 ✗**; escape = downgrade to 352/335 ✅; mp3 ⚠️ 1 report (2026-04) | **★★★ POINT OF NO RETURN #3.** Serial login credentials gone entirely; updates are **signed** so repacking is infeasible [S-36]. Last v70. |
| 74.00.230A | NA/EU/4A | yes | ❌ no | ❌ no | ID7v2 ✗; **mp3 ✅** | First v74. Downgradable to v70 by USB (bench-tested) [S-16] |
| 74.00.311A / 74.00.310 | NA/EU/4A | yes | ❌ no | ❌ no | mp3 ✅ | **★ Downgrade floor rises: from ≥74.00.310 USB cannot go below 74.00.310** [S-17] |
| **74.00.324A** | NA/EU/4A | yes | ❌ no | ❌ no | **mp3 ✅** (confirmed on 124s) | **The final MZD-Connect-1 firmware** (2022-11). ~50 fixes over v70. MazdaToFiat needs 3 line edits + AIO `run.sh` edit [S-10, S-17] |
| 74.00.331 | NA/EU/4A | yes | ❌ no | ❌ no | mp3 ✅ but **may disable wireless CarPlay** | "AIO tweaks only recommended for 74.00.324 and lower" [S-10] |

**No Fiat firmware above 59 exists.** FCA never released a v70+ or any CarPlay build for the 124;
the only Fiat move was a NA 59.00.5xx update. There is therefore **no "back to stock Fiat" path**. [S-10]

---

## 2. Upgrade rules

1. **≤ 59.00.560 (this includes every Fiat 124 factory build)** → you must pass through **70.00.100A as a
   two-file step**: `_failsafe.up` **first**, then `_reinstall.up`. Direct single-file jumps from 59.x are
   not the documented path. [S-04, S-13] ❓ one reseller claims direct-from-59.x to 74.00.324 works —
   treat as reseller optimism until a first-hand report exists.
2. **≥ 70.00.021A** → single `_update.up` direct to any later version, including 74.00.324A. Real example:
   70.00.367 EU N → 74.00.324 EU N in one file. [S-13, S-17]
3. **Failsafe package exists only up to ~70.00.110**; from 70.00.335 every build is one `update.up`. [S-04, S-13]
4. **Always use your own region's files.** A wrong-region flash did **not** brick in the one report we have
   (NA firmware on an ADR car — CarPlay worked, auto-lock setting missing) ⚠️, but region mismatch shifts
   radio behaviour and is treated as brick risk everywhere. Flashing another region deliberately is the
   documented way to switch tuner markets; the **TAU tuner module** still holds the original band plan. [S-13, S-10]
5. **Firmware BEFORE hardware**, with the **old hub fitted**. Mazda: "once the CMU has been attached to the
   CarPlay/AA-compatible USB hub, the software cannot be updated." If the new hub is already in, refit an
   old one to flash. [S-06, S-18]

## 3. Downgrade rules and walls

| From | To | Method | Caveats |
|---|---|---|---|
| 70.00.021/100 | 59.00.545 / 59.00.502 | USB, same procedure | ❓ file order disputed: some did failsafe-first (upgrade order) successfully; an old guide says reinstall-first for downgrades. One owner ended with **OS 59.00.502 + Fail-Safe 70.00.100A** — it ran, but it is an undefined state. |
| 70.00.335/352/367 | 70.00.100 / 59.00.502+ | USB | **Being back on 70.00.100 does NOT restore USB tweaking** — the credentials are gone. [S-11 thread 39292] |
| 70.00.367 | 70.00.352 | USB | The documented escape for 367; 352 can then take ID7v2-at-install. |
| 74.00.230 | 70.x / 59.00.502+ | USB | bench-tested [S-16] |
| 74.00.310/311/324 | anything < 74.00.310 | **NOT by USB** | Only by SPI-NOR surgery (write a 70.00.100 failsafe dump + boot-select 0x00). [S-16] |
| ≥59.00.502 | anything < 59.00.502 | **NOT by USB** (the update screen simply does not list lower versions) | Only by SPI-NOR. Mazda: "if your car was born with any 59.00.xxxx or above, DO NOT roll back." |
| Mazda 70.x | **Fiat 59.00.5xx** | ❓ **no report of anyone doing it**; Fiat packages do not circulate | Open question. |

**Version walls, summarised:** `<59.00.502` ↔ `≥59.00.502`, and `<74.00.310` ↔ `≥74.00.310`. Inside each
band, up and down by USB; across a wall, only with an SPI flash programmer.

## 4. The three (four) points of no return — plain language

1. **59.00.502 / any Fiat 59.00.5xx** — USB side-loading is gone. If ID7 was never installed while the car
   was on 56.x, you need the serial console or (since 2025) the mp3 method to ever run a tweak stick again.
   **You cannot go back below this version.**
2. **70.00.335 / 352** — the update actively deletes ID7 and the serial credentials. Only route: serial
   console attached *during* the flash, ID7v2 commands pasted before the first reboot — and repeated after
   *every* subsequent flash.
3. **70.00.367** — serial login itself is dead; ID7/ID7v2 impossible. Escape = downgrade to 352/335 and do
   ID7v2 at install.
4. **74.00.310+** — you can no longer return to v70 by USB.

### ⚠️ Important nuance (2024–2025): the mp3 method changes this picture

The `mzd-evo/mzd-connect-1-root` payload (fake MP3 files that open the JCI diagnostic screen → on-screen
terminal, driven with a USB keyboard) runs `tweaks.sh` / `run.sh` **without ID7 and without serial**.
Evidence status:

- **70.00.100** ✅ confirmed by several 124 owners
- **74.00.324 / 74.00.311** ✅ confirmed (needs 3 `tweaks.sh` line edits + 1 `run.sh` edit)
- **59.00.563** ⚠️ one report that it opens the shell on factory Fiat 59
- **70.00.367** ⚠️ one report (2026-04) of tweaks applied
- **70.00.335** ⚠️ one 124 owner **could not** get it to run (cause not isolated: `tweaks.sh` version gate vs
  the payload itself)

So the historic "70.00.335+ = never tweakable again" statement — which is what most guides still say — is
**no longer categorically true**, but the evidence outside 70.00.100 and 74.00.324 is thin. Any published
guidance must state both the classic rule and this nuance, with the confidence level attached.

## 5. What the 124 loses on Mazda firmware, and what comes back

| Lost | Recoverable? | How |
|---|---|---|
| Fiat/Abarth boot + shutdown animations | ✅ | MazdaToFiatV70AIO |
| "Mazda" wording throughout the UI (9 locales) | ✅ | MazdaToFiatV70AIO |
| CarPlay brand icon | ✅ | MazdaToFiatV70AIO (Fiat or Abarth scorpion) |
| **Factory navigation** (Mazda firmware VIN-checks against an ND VIN; Fiat card refused → compass screen) | ✅ | NNG-folder swap (`Fix_ver70_NNG`, also bundled in MazdaToFiatV70AIO). The **NA** Fiat NNG folder works for NA, EU and ADR; not JP. |
| Bluetooth name → "Mazda", pairings invalid | ✅ (mostly) | MazdaToFiatV70AIO sets "124 Spider". **Un-pair phones before flashing** — you cannot afterwards. |
| Personal settings, favourites, sound settings | ❌ (re-enter) | Record them first; any re-flash resets to factory |
| Android Auto "Exit" icon still Mazda | ❌ | AA package is signed; "hasn't been figured out" |
| Touchscreen inside official Android Auto | ❌ | Disabled by Mazda design (CarPlay touch works when stationary) |
| Wireless CarPlay | ❌ | Needs ≥74.00.200 **and** different CMU hardware — not achievable on this unit |

All the ✅ rows require tweak access (ID7 beforehand, serial, or the mp3 method). Gracenote also resets to
v8 after the v70 flash and can be re-applied.
