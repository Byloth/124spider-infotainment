# Maintainer's car — field log

The one vehicle this project can actually test on: the maintainer's **EU Abarth 124 Spider**. Everything
observed, bought, measured or done on it is recorded here, in order, so that a later session can pick up
exactly where the previous one stopped. This file is the **primary source** for anything about this car;
cite it as `[MC]`.

Rules:

- This is a log, not a guide. The site stays generic (all markets, all starting versions); nothing here
  makes it into `docs/` as a default or a prerequisite. Facts observed here may be cited as *one* data point
  (trust C until corroborated).
- Append, don't rewrite. Date every entry (YYYY-MM-DD). Mark vendor claims as claims and hardware
  observations as observations.
- Nothing in this file is verified by Claude on hardware — only the maintainer can test.

## 1. The car

| item | value | status |
|---|---|---|
| Model | Abarth 124 Spider, EU | known |
| CMU firmware version at start | — | **not yet read** |
| Retrofit kit fitted | no | — |
| Upgrade attempted | no | — |

## 2. Hardware acquired

### 2026-08-28 — CarPlay / Android Auto USB hub, "P3" clone

- **Listing title (verbatim):** `P3 Wireless Carplay Android auto Adattatore Per Retrofit Mazda 2 3 6 CX3 CX5
  CX8 MX5 USB HUB Kit TK78669U0C 00008fz34`.
- What it is: an aftermarket clone of the Mazda hub **TK78-66-9U0C** / kit **00008FZ34**. "P3" is the seller's
  variant code (the ET-1594 family: P2.1 = wired, **P3 = wireless-capable** — see `INVENTORY.md` §6.1), not a
  Mazda part number.
- **Vendor claim (unverified):** works in **both wireless and wired mode**. The listing names **no firmware
  version** for either mode.
- Not yet unboxed, not yet fitted, not yet tested. Cable set / market variant of the kit: not yet recorded.
- Context from the research: the wireless mode is reported to need firmware ≥ 74.00.200 and to offer CarPlay only
  (no Android Auto) [E-03][E-34][E-39] — ❓ some listings claim v70 works. Whether a P3 behaves as a plain wired hub on
  70.00.100A is exactly what the first test on this car will show.

## 3. Observations and tests

*(none yet)*

## 4. Open items for this car

- Read the CMU firmware version and region string (Settings → System → About) — decides the route.
- Unbox the kit: photograph the hub label and PCB, note the cable part numbers, record whether the hub carries the
  Microchip USB84604.
- First test: wired CarPlay **and** Android Auto, before any firmware change, on the stock firmware — establishes
  a baseline for the vendor claim.
