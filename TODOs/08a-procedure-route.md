# 08a · Procedure — Choose your route

The hub of the operational core: the page that reads where the reader's car is and points them at the
right one of the four routes. Delivered as the first of three procedure stages (08a → 08b → 08c).

Backing: `research/PROCEDURE-DRAFT.md` §0 · Mazda's own worldwide update procedure PDF
(`downloads/ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf`, for the order-of-operations rule).

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

## Done when

- [ ] The page stands alone: a reader landing here is not silently missing a prerequisite.
- [ ] With JS disabled, every branch is expanded and every route visible.
- [ ] The untested-on-hardware caveat appears on the page.
