# 08c · Procedure — Rebrand, hardware & verify

The finishing half: making the Mazda firmware wear a Fiat face again, fitting the hub, and confirming the
result. The last of three procedure stages (08a → 08b → 08c).

Backing: `research/PROCEDURE-DRAFT.md` §4–§6 · the recovered rebrand/tweak material
(`research/archive/recovered/`) · the ND trim-removal sections mirrored in `research/`.

> ⚠️ **Standing caveat that must appear on these pages:** nothing here has been tested on a car by this
> project. Every step is a synthesis of community reports and Mazda's own documents. Items resting on a
> single report stay marked. Do not let the site's tidy presentation imply more certainty than the
> evidence carries.

---

## `/procedure/rebrand.md` — 3 · Restore Fiat branding and navigation

- [ ] Explain what is being restored and by what: `MazdaToFiatV70AIO`, and that upstream MZD-AIO contains
      none of it.
- [ ] **Three `RouteBranch` blocks**, each complete on its own:
  - [ ] **Route A — ID7 installed:** plain USB. The tool's seven prompts, each explained (branding,
        animations, UI wording, CarPlay icon, **navigation restore**, Bluetooth name, optional backup).
  - [ ] **Route B — mp3 method (2025+):** the payload plus the tool on one stick, USB keyboard, audio
        source → USB1 → diagnostic screen → Terminal → `cd /mnt`, `cd sdb1`, `./tweaks.sh`.
        ⚠️ Unresolved: whether the *old* hub's ports enumerate a keyboard.
  - [ ] **Route C — serial console:** the pre-2025 method. Present it as the fallback it now is, note the
        canonical write-up is on a **hijacked domain** (link `/security/link-safety`), and that one owner
        destroyed both adapter and CMU serial port with a bare wire.
- [ ] The script edits needed on 70.00.335/352 (`_VER_EXT -le 360`) and on 74.00.324 (three `tweaks.sh`
      lines plus one in `run.sh`), with the caveat that this defeats a compatibility check the author put
      there because he could not test.
- [ ] Note the language gap on v74: the tool ships 9 locale dictionaries against 38–41 in 74.00.324.
- [ ] After: reboot, re-insert nav SD, re-pair phones, re-apply Gracenote.

## `/procedure/hardware.md` — 4 · Install the hardware

- [ ] Mount **`PartFinder`**; link `/hardware/`.
- [ ] Tools and time (2.5 h typical; reports range 2–5 h).
- [ ] The trim removal order for the 124, with the two documented deviations from Mazda's MX-5 sheet (the
      shift/console/upper panel comes out as one piece; front console and its panel as one unit).
- [ ] **The GPS connector** — the blue plug everyone forgets to re-seat; symptom is wrong location, wrong
      clock, greyed-out CarPlay. Give it its own callout.
- [ ] Automatic transmission: prefer not to remove the knob (the white lock rod is easy to misplace).
- [ ] RHD is identical; the "passenger side" is simply the other side.
- [ ] Post-install oddities that are **not** faults: USB ports needing 15–30 minutes or a full shutdown to
      appear; "no device recognized" clearing after locking the car and walking away.
- [ ] Diagrams: **hub and cable schematic**, **trim removal order**.
- [ ] `Checklist` for reassembly.

## `/procedure/verify.md` — 5 · Verify

- [ ] What a correct result looks like: version string, Fiat/Abarth boot animation, UI wording, maps
      instead of compass, Bluetooth name "124 Spider", phone on the icon-marked port launching CarPlay/AA.
- [ ] The known-unfixable cosmetics, repeated here so nobody chases them.
- [ ] `Checklist`.
- [ ] Where to go if something is wrong: `/recovery/`.

## Done when

- [ ] Each page stands alone: a reader landing mid-procedure is not silently missing a prerequisite.
- [ ] All three rebrand routes are fully written — none is a stub pointing at another.
- [ ] With JS disabled, every branch is expanded and every route visible.
- [ ] The untested-on-hardware caveat appears on every page in this stage.
