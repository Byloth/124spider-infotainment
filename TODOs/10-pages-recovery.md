# 10 · Pages — Recovery

What to do when it goes wrong. These pages are read by someone with a dead screen in a parked car, so
they must be scannable, unambiguous, and free of reassurance that is not earned.

Backing: `research/raw/F-rollback-failures.md` (61 sources, 19-row failure catalogue, the SPI-NOR
mechanism) · `research/PROCEDURE-DRAFT.md` §7–§8 · `research/FIRMWARE-MATRIX.md` §3.

---

## `/recovery/index.md` — Troubleshooting

- [ ] Open with triage, not prose: **is the screen black with the radio still playing?** That is the
      classic brick — go straight to `/recovery/brick`. Everything else is recoverable from the seat.
- [ ] The **full 19-row catalogue rendered statically** — symptom → cause(s) → fix(es) → source. This is
      the no-JS baseline and it must be complete on its own.
- [ ] Mount **`SymptomTree`** over it for guided narrowing.
- [ ] Group by phase so the reader can find themselves: during the flash · after the flash · after
      tweaking · after the hardware install.
- [ ] The entries that matter most, each written properly rather than as a table cell:
  - [ ] **Black screen, radio plays, controls dead** — power lost between failsafe and reinstall.
  - [ ] **"Install Not Successful: System Failure" loop at ~2 %** — reinstall attempted before failsafe,
        or a corrupt file, or a bad stick, or tweaks left installed. Mazda's ROOM-fuse retry.
  - [ ] **"Failed to validate package certificate"** — antivirus altered the download, partial file, bad
        stick, or **the new hub fitted before the update**.
  - [ ] **Stuck at 19–21 %** — unreliable stick.
  - [ ] **Stick not recognised** — wrong format, USB 3.0, >16 GB, dead car port; or you are ≥59.00.502
        looking for older versions, which are hidden by design.
  - [ ] **Boot loop or half-dead UI after tweaking** — v56-era packages run on v70. Two 124s ended up
        needing a used CMU.
  - [ ] **Navigation shows only a compass** — expected on Mazda firmware; the fix is the NNG restore.
  - [ ] **Rebranding dialog never appears** — ID7 skipped or silently failed.
- [ ] Things mistaken for faults: a Mazda logo flashing before the Fiat animation after tweaking; a slow
      first boot.

## `/recovery/downgrade.md` — Downgrading

- [ ] What downgrading does and does not achieve. The blunt headline: **coming back down does not restore
      tweak access.** After 70.00.335+ the credentials are gone regardless of what you flash next.
- [ ] The **two version walls**, with the diagram (**downgrade walls**): nothing below **59.00.502**, and
      from ≥**74.00.310** nothing below 74.00.310 — by USB. Crossing either needs an SPI programmer.
- [ ] Mount **`DowngradeMatrix`** over a static from/to table.
- [ ] ❓ The unresolved contradiction, stated as such: file order for a downgrade (failsafe-first, as for
      an upgrade, versus reinstall-first per an older guide). Both have worked; one owner ended with a
      mismatched pair (OS 59.00.502 + failsafe 70.00.100A) that ran but is an undefined state. Do not
      invent a recommendation the evidence does not support.
- [ ] **No route back to stock Fiat** — no Fiat firmware above 59 exists and Fiat packages do not
      circulate. Say it here too; people look for it in this section.
- [ ] The old hub may be needed to flash below v70 ⚠️ (reported, unconfirmed).

## `/recovery/brick.md` — Recovering a bricked unit

- [ ] **What actually happened**, because understanding it makes the fix obvious: the failsafe package
      rewrites the bootloader/updater, the reinstall package rewrites the OS. Interrupted between the two,
      the boot-select byte points at a partition that no longer matches, so the unit boots neither.
      The radio keeps playing because that is a different subsystem.
- [ ] Diagram: **SPI-NOR layout and boot-select**.
- [ ] What does **not** work, listed early to save the reader an hour: the Nav+Back+Mute reset, pulling the
      ROOM fuse, disconnecting the battery, waiting.
- [ ] **The fix:** open the CMU, clip a programmer onto the NOR flash, write `0x00` at offset `0x010000`,
      reassemble → the unit boots the failsafe updater and asks for a USB stick → feed it the reinstall
      package.
  - [ ] Hardware: CH341A + SOIC16 clip (**must be 3.3 V** — many need the trace-cut modification) or a
        Raspberry Pi with `flashrom`. Under €50 total.
  - [ ] Chips seen: `MX25L6445E` (EU units), Spansion `S25FL064A/P` (US/early).
  - [ ] **Read and save a backup before writing anything.**
- [ ] The alternative if that fails: any MZD-1 CMU from any Mazda model is plug-and-play — these units are
      **not VIN-locked**. Used €190–600, new €1000–1500. Mazda3 `BJS7669C0K` is documented working in a 124.
- [ ] What a dealer will do: replace the unit. They do not un-brick.
- [ ] Be honest about difficulty: this is soldering-adjacent electronics work. It is well documented and
      many people have done it, but it is not a five-minute fix, and a reader should know that before
      opening the dash.

## Done when

- [ ] The triage question is the first thing on `/recovery/`.
- [ ] All 19 catalogue rows are present without JS.
- [ ] Nothing in this section promises a recovery route that the sources do not actually support.
