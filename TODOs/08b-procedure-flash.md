# 08b · Procedure — Prepare & flash

The dangerous half: getting the car onto the target firmware without bricking it. The second of three
procedure stages (08a → 08b → 08c), and the one where careful, incremental review matters most.

Backing: `research/PROCEDURE-DRAFT.md` §1–§3 · Mazda's own worldwide update procedure PDF
(`downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf`, the 30-step sequence) · the
recovered ASH8 testing document (`research/archive/recovered/`, for USB-stick verification).

> ⚠️ **Standing caveat that must appear on these pages:** nothing here has been tested on a car by this
> project. Every step is a synthesis of community reports and Mazda's own documents. Items resting on a
> single report stay marked. Do not let the site's tidy presentation imply more certainty than the
> evidence carries.

---

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

## Done when

- [ ] Each page stands alone: a reader landing mid-procedure is not silently missing a prerequisite.
- [ ] With JS disabled, every branch is expanded and every route visible.
- [ ] The untested-on-hardware caveat appears on every page in this stage.
