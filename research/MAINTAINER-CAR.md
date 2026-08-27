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

### 2026-08-28 — the P3 hub: listing, seller claims, buyer reviews, images

- **Listing:** AliExpress item `1005010287487680`, brand **CARABC**. Combined listing, title
  "P2 Wired o P3 Wireless Carplay Android auto Adattatore Per Retrofit Mazda 2 3 6 CX3 CX5 CX8 MX5 USB HUB Kit
  TK78669U0C 00008fz34"; SKUs "P3 Wireless con strumento" / "P3 Wireless Senza Attrezzi" (with/without tools).
  Body text is bot-walled (only title + images retrievable); images archived under
  `research/archive/hardware/carabc-p3/`.
- **Seller claim, from the listing images (verbatim):** "The 2025 NEW P3 supports wireless carplay and wireless
  Android auto, while the old P3 does not support wireless Android auto or fast charging" — "2026 NEW P3":
  ✓ wireless CarPlay ✓ wireless Android Auto ✓ fast charging; "Old P3 model": ✓ wireless CarPlay ✗ wireless AA
  ✗ fast charging. Box photo shows two USB-A ports (one marked with a phone/wireless glyph) + AUX; kit = hub,
  USB cable pair, sponge tape ×2, manual, 10 tie wraps. No firmware version anywhere.
- **This reconciles the earlier contradiction:** CARABC's own manual (manuals.plus `ae/1005009269258401`) says
  "By default, only wireless CarPlay is supported. To use wired CarPlay and wired Android Auto, adjust the
  switch" — that describes the **old** P3. The "new P3" is a different revision under the same name.
- **Buyer reviews on this listing** (Italian, machine-translated on AliExpress; quoted as given):
  - 2026-05-08, "P3 Wireless con strumento": works perfectly, but *"wireless Android Auto only works after
    connecting it via cable first — not sure whether that is always the case"*.
  - 2026-04-04, "P3 Wireless Senza Attrezzi": description misleading — advertised Type-C, **arrived with USB-A**;
    hub and cables look good; *"wireless Android Auto really works"*; **touchscreen does not work** even with the
    car stopped; resolution poorer than the OEM menus; **no fast charging** despite several cables; "disappointing
    and expensive".
  - 2026-03-27, "P3 Wireless Senza Attrezzi": labelled wireless, *"worked only via cable"* after many tries;
    fiddling with the switch **broke it inside the box**.
- **Reading:** 2 of 3 buyers got wireless AA (one after an initial wired pairing, which is normal for dongle-type
  wireless AA), 1 of 3 got wired-only — consistent with old-stock units shipping under the new listing (the
  USB-A-instead-of-C complaint points the same way). Touch/resolution limits are typical of a built-in wireless
  box that renders the phone session itself. The switch is fragile.
- **What to check on arrival:** (1) port type (USB-A vs C) and any revision marking on the hub/PCB; (2) the
  switch positions and their labels — photograph before touching, move it gently once; (3) with an Android
  phone: wired first, then wireless — record whether wireless AA connects at all, and whether touch works.
  Wired mode is all the upgrade route needs; wireless AA is a bonus, not a requirement.

## 3. Observations and tests

*(none yet)*

## 4. Open items for this car

- Read the CMU firmware version and region string (Settings → System → About) — decides the route.
- Unbox the kit: photograph the hub label and PCB, note the cable part numbers, record whether the hub carries the
  Microchip USB84604.
- First test: wired CarPlay **and** Android Auto, before any firmware change, on the stock firmware — establishes
  a baseline for the vendor claim.
