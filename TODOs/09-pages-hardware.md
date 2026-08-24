# 09 · Pages — Hardware

The retrofit kit: what it is, what to buy per market, and what the evidence says about clones.

Backing: `research/raw/E-hardware-retrofit-kit.md` · `research/INVENTORY.md` §3 · Mazda's official
cable-set installation instructions (`research/archive/hardware/`, doc `C92X_V6_605_01_00`).

---

## `/hardware/index.md` — The retrofit kit

- [ ] What the kit physically is and does: the original hub has USB1 + USB2 (0.5 A each) + SD + AUX on a
      single cable to the CMU; the new hub adds a phone-marked USB 3.x port (~2.1 A) wired through **two**
      new cables to two CMU connectors. The old cable is retired, foam-wrapped and left in place.
- [ ] Diagram: **hub and cable schematic** (`04-diagrams.md`).
- [ ] **Why firmware must come first**, quoting Mazda: the CMU will not recognise the new hub on older
      software, and *"once the CMU has been attached to the CarPlay/Android Auto-compatible USB hub, the
      software cannot be updated."* If the hub is already fitted, an old hub must go back in to flash.
- [ ] **Android Auto needs the hub too.** This is the most common misconception. With genuine v70, AA is
      gated by hub detection exactly like CarPlay — no report anywhere of AA working on v70 with the old
      hub. The only hub-less AA is the old community MZD-AIO tweak on v56/59, which is unstable and must
      not be mixed with official AA.
- [ ] Reversibility: refit the original hub and everything works except CarPlay/AA. Useful before a dealer
      visit.
- [ ] The 7-inch display requirement, repeated.

## `/hardware/part-numbers.md` — Part numbers by market

- [ ] Mount **`PartFinder`** over a **static table of all markets** (no-JS baseline).
- [ ] **Hub:** `TK78-66-9U0C` — the same part worldwide. Genuine units carry an orange label and
      "Made in Japan". Superseded by `-9U0D` → `-9U0E` (catalogues list 9U0E as replacing B/C/D).
      Earlier `-9U0`/`-9U0A`/`-9U0B` and the China-market green-label `KD5J-66-9U0` are reported **not** to
      work with 70.00.021+. The 124's original hub is `N243-66-9U0A/B`.
- [ ] **Cable sets, per market:** NA `C922-V6-605(A)` · EU/UK `C830-V6-60Z` · ADR `C924-V6-605` ·
      JP `C921-V6-605`. They differ only by catalogue entry — any set physically fits any car.
- [ ] **Kit numbers:** NA `0000-8F-Z34` (officially 1× hub + 1× cable set; labour op YY800XRX, 1.5 h).
      UK/EU is ordered as separate lines: hub + `C830-V6-60Z` + tape `C830-V6-693` + manual
      `4100-77-300EN/ES/DE`.
- [ ] **Prices**, dated and per market — NA kit MSRP ~$250 (web $192–213), EU launch €220 parts / €360
      fitted, UK £174–232 genuine (dealer-fitted £350–467), AU A$355, JP ¥12,960 + ¥2,592 (2019).
      Mark every price with its date; these are historic figures, not quotes.
- [ ] Where to buy genuine: dealer parts counters, dealer-run eBay/Amazon stores, UK dealer web shops.
- [ ] ❓ Open: whether the current genuine `-9U0E` works with 70.00.100 on a 124 — catalogues say it
      supersedes 9U0C, but no 124 report exists.

## `/hardware/oem-vs-clone.md` — Genuine vs clone

- [ ] Present this as **evidence, not opinion** — a table of claims with who reported them, when, and how
      strong the corroboration is.
- [ ] The finding that matters: **clone hubs have repeatedly broken SD navigation and GPS lock** on
      Mazdas; swapping in a genuine `-9U0D` fixed it. Directly relevant to a 124 owner, because keeping
      factory navigation working is one of the goals.
- [ ] Clone cables occasionally dead on arrival.
- [ ] **Wireless-CarPlay clones:** no wireless Android Auto, and they push the car to 74.00.200+ — which
      costs the easy tweak path. Some reviews report failures after days.
- [ ] The other side, fairly: several 124 owners report AliExpress "genuine" kits working perfectly. That
      is buyers' impression; no teardown exists.
- [ ] Recommendation, stated as such: buy genuine where budget allows; if buying a clone, use a seller
      with returns, expect possible SD-nav quirks, and avoid wireless-only variants.

## Done when

- [ ] Every part number in the pages resolves to a row in `parts.data.ts`.
- [ ] All markets visible with JS disabled.
- [ ] No price appears without its date.
