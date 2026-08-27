# 07 · Pages — Start here

The reader's entry point. Its job is to get someone from "I heard this is possible" to "I know which of
the four routes is mine, and what it will cost me" — without ever implying the answer is the same for
everyone.

Backing: `research/PROCEDURE-DRAFT.md` §0–§1 · `research/FIRMWARE-MATRIX.md` §4–§5.

---

## `/guide/index.md` — Overview

- [X] What the upgrade is: flash Mazda firmware onto a Fiat CMU, then rebrand it back. Say early that
      **Fiat never released a v70+**, so this is not "updating your Fiat" — it is running Mazda software
      on a Fiat car and repairing the cosmetic and navigation damage afterwards.
- [X] What you end up with: native CarPlay and Android Auto, Fiat branding restored, factory navigation
      working again. What you do not: wireless CarPlay, touchscreen inside Android Auto, the Mazda logo on
      the AA exit icon.
- [X] Honest summary up front — time (firmware ~1 h, hardware ~2.5 h), cost (kit £150–250 / €220 / $190–250
      depending on market and whether genuine), risk (a failed flash can leave the unit dead).
- [X] **The dealer warning**, prominently: do not let a dealer touch the CMU. Mazda dealers flash the
      newest firmware they have (today 74.00.324); Fiat dealerships have flashed *Mazda* firmware onto
      124s by mistake. Multiple owners lost branding and navigation this way.
- [X] Route the reader onward: eligibility → risks → the wizard.

## `/guide/eligibility.md` — Is my car eligible?

- [X] **7-inch display only.** The 3-inch display in some Classica trims cannot be upgraded. Say it first,
      before anyone reads further.
- [X] How to read the version: HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION, and what a full
      string looks like.
- [X] Mount `VersionDecoder`.
- [X] What each starting point implies, as a static table (all four, always visible):
      **56.00.521/530** — the easy path, ID7 can still be installed from USB ·
      **59.00.524/562/563** — Fiat's own later builds, side-loading already dead ·
      **70.00.335/352** — ID7 gone ·
      **70.00.367 / 74.x** — serial gone too.
- [X] Note that replacement CMUs often arrive on 59.00.563, and that a used **v56** CMU is the community's
      answer for permanently locked cars.
- [X] ❓ Flag the open question honestly: no first-hand report was found of flashing 70.00.100 **over**
      Fiat 59.00.562/563. Everyone assumes it works. Do not promise it.

## `/guide/what-changes.md` — What you gain and lose

- [X] Two clear tables: **gained** and **lost**, the latter split into *recoverable* and *not*.
  - [X] Lost and recoverable: Fiat/Abarth boot and shutdown animations, "Mazda" wording throughout the UI
        (9 locales), the CarPlay brand icon, factory navigation (the Mazda firmware VIN-checks against an
        ND VIN, so the Fiat SD card is refused → compass-only screen), the Bluetooth name.
  - [X] Lost and not recoverable: personal settings, radio favourites, sound settings, paired phones —
        every re-flash resets them. Record them first.
  - [X] Never fixable: the Mazda logo on the Android Auto exit icon; touchscreen inside AA (disabled by
        Mazda's design); wireless CarPlay (needs ≥74.00.200 *and* different CMU hardware).
- [X] Note Gracenote resets to v8 and can be re-applied.
- [X] Every recoverable row depends on tweak access — link `/firmware/points-of-no-return` and
      `/security/`.

## `/guide/risks.md` — Risks and one-way doors

- [X] The four one-way doors in plain language, with the diagram (**version timeline**).
- [X] **The brick mechanism, explained rather than just warned about:** the failsafe package rewrites the
      bootloader/updater; the reinstall package rewrites the OS. Lose power between them and the unit
      boots neither — black screen, radio still playing, controls dead. It is the single most common
      catastrophic outcome and it is entirely preventable.
- [X] What recovery actually costs: an SPI flash programmer (CH341A + SOIC16 clip, under €50) and some
      nerve, versus a replacement CMU (used €190–600, new €1000–1500, dealer quote ~€1500).
- [X] What a dealer will and will not do — they replace the CMU, they do not un-brick it.
- [X] Reversibility, stated fairly: the **hardware** change is fully reversible (refit the original hub
      and everything works except CarPlay/AA); the **firmware** change largely is not.
- [X] Link `/recovery/brick` for the actual procedure.

## `/guide/route.md` — Which route is mine? *(new page)*

- [X] Mount `RouteWizard`: market → display → current version → ID7 status → hub fitted.
- [X] Output: the named route, the exact files needed for that market, the warnings that apply, and deep
      links into `/procedure/`. Offer a copyable summary the reader can take to the car.
- [X] **Below the wizard, always: the full static route table**, so the page is complete without JS and so
      a reader can see the routes they were *not* given.
- [X] Add the page to the `/guide/` sidebar in `docs/.vitepress/config.mts`.

## Done when

- [X] A reader who knows nothing can reach a correct route in under two minutes.
- [X] With JS disabled, all four routes and all markets remain visible on every page in this section.
- [X] No page in this section implies one route is the default.
