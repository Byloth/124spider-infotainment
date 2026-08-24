# 08 · Pages — Procedure

The operational core. Everything else on the site exists to make these six pages safe to follow.

Backing: `research/PROCEDURE-DRAFT.md` in full · Mazda's own worldwide update procedure PDF
(`downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf`) · the recovered ASH8 testing
document (`research/archive/recovered/`).

> ⚠️ **Standing caveat that must appear on these pages:** nothing here has been tested on a car by this
> project. Every step is a synthesis of community reports and Mazda's own documents. Items resting on a
> single report stay marked. Do not let the site's tidy presentation imply more certainty than the
> evidence carries.

---

## `/procedure/index.md` — Choose your route

- [ ] The four routes side by side, as a **static table that is always visible**.
- [ ] Reads the profile to highlight the reader's route; links to `/guide/route` for those who have not
      chosen yet.
- [ ] The order of operations, stated once and unmistakably: **firmware first, with the old hub fitted;
      hardware last.** Mazda's own wording: *"once the CMU has been attached to the CarPlay/AA-compatible
      USB hub, the software cannot be updated."*
- [ ] The dealer warning again, briefly.
- [ ] Diagram: **route comparison** (`04-diagrams.md`).

## `/procedure/prepare.md` — 1 · Prepare

- [ ] **Parts** (fitted later, but bought now) — hub + region cable set; link `/hardware/part-numbers`.
- [ ] **Files**, region-matched; link `/firmware/obtaining` for sources and hashes.
- [ ] **The USB stick** — FAT32, 4–16 GB, USB 2.0 preferred, one partition, **formatted on Windows**
      (Mac-formatted sticks add hidden files and are rejected; >32 GB defaults to exFAT and is not seen).
      Known-good and known-bad models from the reports. Test it with H2testw first — a failing stick is
      the most common cause of a failed flash.
- [ ] Download the `.up` files **individually**; a zip of the folder has corrupted them. Verify hashes
      before copying.
- [ ] **`Checklist`** covering: settings and favourites recorded · every phone un-paired in the car *and*
      on the phone (the BT identity becomes "Mazda" and old pairings cannot be cleaned up afterwards) ·
      nav SD card removed · all other USB/AUX devices removed · existing tweaks uninstalled · DTCs cleared
      · battery charger connected (Mazda's TSB asks for ~7 A) · all electrical loads off.
- [ ] **`RouteBranch` (56.x only): install ID7 now.** The single most important step for that route, and
      impossible later. Full sub-procedure, plus the warning that there is **no reliable confirmation it
      took** — several owners only discovered the failure after flashing v70.
      Link `/security/` so the reader knows what ID7 leaves behind before installing it.
- [ ] ❓ Note the contradiction on updating with tweaks installed (AIO FAQ says safe; two bricks were
      attributed to it) and give the cautious recommendation.

## `/procedure/flash.md` — 2 · Flash the firmware

- [ ] Follow Mazda's own 30-step procedure; this page is the practical gloss, not a replacement.
- [ ] The sequence: stick holds **only** the two `.up` files → ACC (one press, no pedal) → diagnostic
      screen (Music + Mute + Favorites) → **failsafe first, alone** (~8 min) → then reinstall (~27–40 min).
- [ ] **The pedal rule, given the weight it deserves:** ACC times out at 25 minutes, and losing power
      mid-flash is the classic brick. Press and release clutch/brake right after the failsafe finishes and
      roughly every 20 minutes. Never switch the ignition off during the process.
- [ ] Mount **`FlashTimer`**, described as an aid and not a guarantee.
- [ ] What "done" looks like, and what is *expected* to be wrong at this point: Mazda boot animation,
      Bluetooth name "Mazda", navigation showing only a compass. Readers panic here otherwise.
- [ ] **If it fails** — Mazda's own recovery: IG OFF → wait for black screen → remove stick → pull the
      ROOM fuse for 1 minute → refit → ACC → the update screen returns → re-insert.
- [ ] Diagram: **two-file flash sequence**.
- [ ] Link `/recovery/` for anything the ROOM-fuse retry does not fix.

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
- [ ] The untested-on-hardware caveat appears on every page in this section.
