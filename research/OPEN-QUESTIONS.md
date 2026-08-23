# OPEN QUESTIONS

What is still unknown, contradictory, or lost after the 2026-08-23 research sweep — and what has to be
tested on the car. Ordered by how much they block the project. Source ids → `SOURCES.md`.

---

## A. Blocking — must be resolved before the maintainer's own car is touched

1. **EU firmware: no verified source.**
   Mazda's dealer CDN [D-01] serves **NA** objects openly but returns 403 for EU/ADR. The maintainer's car
   is EU. Options: probe other S3 key patterns; buy from `mazdashare.com/mtds` (paid, official) or a
   reseller (€29–39); use the 124spider.org Google-Drive EU zip and hash-check it. **Nothing EU is
   currently held or verified.**

2. **The two contradictory EU 70.00.100A reinstall MD5s.**
   `d5c042588b5de7f0d72e02b03ec78590` vs `279f1b81e1fa43b1b43ea1af38aab834`. One may be a different
   revision, a re-packed copy, or a corrupted one. A German installer used the second successfully on three
   cars and then hit "Invalid packet certificate" on a fourth; a UK owner **bricked** a car in June 2025
   using the EU Google-Drive file. Until this is reconciled, no EU file can be called verified.

3. **What firmware is actually on the maintainer's car?**
   Assumed EU 59.00.5xx, not confirmed. Read HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION and
   record the exact string including the region and `N` suffix. It decides the whole route (see
   PROCEDURE-DRAFT §0) — in particular whether ID7 from USB is still possible (56.x) or not (59.x).

4. **Can you flash 70.00.100 over Fiat 59.00.562/563 at all?**
   Everyone assumes yes, but **no explicit first-hand success report was found** in anything we captured.
   Bob T's replacement CMU on 59.00.563 was described as "not upgradable, as I understand it"; the 68wooley
   guide only warns that the newer Fiat firmware "breaks CarPlay/AA compatibility" without saying whether
   it blocks the flash or just the tweaks. Needs a confirmed report before the guide promises it.

5. **Malware / integrity check is not done.** Every file in `downloads/` is hashed but nothing has been
   scanned. Minimum: VirusTotal hash lookups for all tweak ZIPs and the `.up` files; inspect the tweak
   scripts (`tweaks.sh`) by hand. The `.up` files coming from Mazda's own CDN with matching community MD5s
   are the strongest position we have; everything from MediaFire/GitHub rests on one host.

## B. High value — would materially change the guide

6. **How far does the mp3 method really reach?**
   Confirmed on 70.00.100 and 74.00.324/311. ⚠️ Single reports on 59.00.563 and 70.00.367. ⚠️ One 124 owner
   **failed on 70.00.335** (unclear whether the payload didn't launch or the `tweaks.sh` version gate
   stopped it). This determines whether the "point of no return" disclaimer stays absolute or becomes
   conditional. The maintainer's car can test the 59.x case directly.

7. **Does the mp3 method need the new hub for the USB keyboard?**
   madfiat used the new hub; whether the old hub's ports enumerate a keyboard is unknown; one owner with
   the *new* hub had USB1/USB2 greyed out. Affects step ordering (you may have to fit the hub before you
   can restore branding).

8. **Downgrade file order** (failsafe-first vs reinstall-first) is contradictory across sources, and one
   owner ended with a mismatched OS/failsafe pair. Needs a definitive answer before publishing a rollback
   procedure.

9. **Are the 124spider.org Google-Drive zips unmodified Mazda files?** The uploader says they are "from
   Mazda … but have been tweaked by people to be optimized for Fiat". Probably means the bundled extras,
   not the `.up` files — but this is exactly the kind of ambiguity the project exists to remove. Download,
   hash, compare with published MD5s.

10. **Can a Fiat 59.00.5xx package be re-installed over Mazda 70.x** (return to stock)? No report exists,
    and Fiat packages do not circulate at all. Probably "no" — worth stating definitively.

## C. Documentation gaps to close by more research

11. **Sources we could not read** (need a human with a browser/login):
    - `forum.miata.net` t=782788 posts 142/143 — **the origin of the mp3 method** (login-walled)
    - 124spider.org HowTo thread 32286 pages **3–7, 15, 21** (no Wayback capture)
    - 124spider.org threads 39292 ("Mazda made up a mess, FW 70.00.367"), 42352, 41206, and the 2022–2025
      hardware threads (43650 USB-C hub, 43766 wireless, 42115, 43933, 43852) — no captures
    - Scribd "EU N CMU HASH Value" doc 838112560 — likely holds the missing EU hashes
12. **Mirror before it disappears:** the HiDrive `-CarPlay-AndroidAuto INSTALL` folder [E-42] holds Mazda's
    own trim-removal PDFs and full-install videos — the only copy known.
13. **70.00.130 / 70.00.137 / 70.00.150** — no source we read says anything about their tweak status.
14. **74.00.331** — barely documented; reportedly breaks wireless CarPlay if tweaked. Public release or
    dealer-only?
15. **Hub revisions:** does the current genuine `TK78-66-9U0E` work with 70.00.100 on a 124? Catalogues say
    it supersedes 9U0C, but no 124 report exists.
16. **Torque values** for the CMU and trim bolts — not in Mazda's cable sheet; would be in the ND workshop
    manual (mirror located, not fetched).
17. **Dealer tooling:** does FCA wiTECH contain any 124 CMU flash? Can a Mazda dealer flash against a Fiat
    VIN? (One Fiat dealership demonstrably flashed *Mazda* firmware onto a 124.) Unknown.
18. **Nav SD after a CMU swap:** the Fiat card is VIN-locked after ~100 km; whether it survives a different
    CMU is not reported for the 124.

## D. Known contradictions to flag in the published guide

| # | Contradiction | Handling |
|---|---|---|
| 19 | "70.00.335+ is never tweakable again" (all pre-2025 guides, incl. Ameridan and 68wooley) vs. the 2025 mp3 method | Present the classic rule as the safe assumption, the mp3 method as a documented-but-thin escape, with per-version confidence |
| 20 | "ID7 v2 protects you if pre-installed" (Ameridan's 2019 article) vs. its author's own failed test two days later — the working v2 is a *serial-during-flash procedure* | Say plainly: pre-installing anything does **not** survive 70.00.335 |
| 21 | AIO FAQ "updating with tweaks installed is safe" vs. two bricks attributed to leftover tweaks | Recommend removing tweaks before flashing |
| 22 | Mazda "ACC only, never run the engine" vs. 2x4logic "run the engine so the CMU never loses power" | Follow Mazda; use a battery charger and the pedal timer |
| 23 | Reseller claim "update direct from 59.x to 74.00.324" vs. the dealer two-file rule via 70.00.100 | Follow the dealer rule until a first-hand report says otherwise |
| 24 | Wrong-region firmware = "brick risk" (universal advice) vs. one ADR car happily running NA firmware | Keep the warning; record the anecdote |
| 25 | Bluetooth name fixed to "124 Spider" vs. reports that a "Mazda" pairing entry survives | Note as cosmetic residue |

## E. What only the car can answer

- Actual current firmware version and region string (A3)
- Whether the mp3 method opens the terminal on an EU Fiat 59.x (B6)
- Whether a USB keyboard enumerates on the **old** hub (B7)
- Whether the EU 70.00.100A files obtained (from wherever) flash cleanly (A1/A2)
- Whether `MazdaToFiatV70AIO` restores nav on an **EU** car using the NA NNG folder (reported to work for
  EU and ADR, but by a handful of people)
