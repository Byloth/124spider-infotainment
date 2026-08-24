/**
 * Which of the four procedures applies to a given car.
 *
 * This is the most consequential function on the site. It answers "what do I do?" from two facts — the
 * firmware version and whether ID7 was ever installed — and the answer determines whether a reader ends
 * up with a working car or a dead unit.
 *
 * Two deliberate conservatisms, both of which cost the reader nothing but a longer route:
 *
 *   1. **An unknown ID7 state is treated as absent.** Assuming ID7 is present when it is not sends the
 *      reader down the USB path, which then fails silently *after* the firmware flash — by which point
 *      the branding and navigation are already gone. Several owners got stuck exactly this way.
 *   2. **A claimed ID7 is ignored from 70.00.335 upwards.** That update runs `neutralizeid7`, which
 *      deletes ID7 and the serial credentials. Whatever the reader believes, it is not there.
 *
 * Rules from `research/PROCEDURE-DRAFT.md` §0 and `research/FIRMWARE-MATRIX.md` §1 and §4.
 */

import { FIRMWARE } from "../data/firmware";
import type { Route } from "../data/types";

import { versionOrdinal } from "./version";

export const ROUTES: readonly Route[] = ["id7-from-usb", "serial-or-mp3", "id7v2-serial", "mp3-only"];

export type Id7State = "yes" | "no" | "unknown";

const V59_502 = versionOrdinal("59.00.502");
const V70_335 = versionOrdinal("70.00.335");
const V70_367 = versionOrdinal("70.00.367");

export const routeFor = (version: string, id7: Id7State): Route | undefined =>
{
    // Only answer for versions the data actually knows about; an unrecognised string means we have no
    // grounds for an answer, and inventing one here would be worse than saying nothing.
    const known = FIRMWARE.some((f) => f.id === version || f.label.includes(version));
    if (!known) { return undefined; }

    const n = versionOrdinal(version);
    if (Number.isNaN(n)) { return undefined; }

    // 70.00.367 and everything above it: the serial credentials are gone, and updates are signed, so
    // the mp3 method is the only way in.
    if (n >= V70_367) { return "mp3-only"; }

    // 70.00.335 and 70.00.352: neutralizeid7 has run. ID7 cannot have survived, whatever the reader
    // thinks, so the only route is a serial console attached during the flash.
    if (n >= V70_335) { return "id7v2-serial"; }

    // Below 59.00.502 the USB installer still works out of the box — this is where ID7 gets installed,
    // and where it is worth doing before anything else.
    if (n < V59_502) { return "id7-from-usb"; }

    // Between the two: ID7 works if it is genuinely there, and only if the reader is sure.
    return id7 === "yes" ? "id7-from-usb" : "serial-or-mp3";
};

/** A short human label, for the wizard's result and the procedure headings. */
export const ROUTE_LABELS: Record<Route, string> = {
    "id7-from-usb": "Install ID7 from USB, then flash",
    "serial-or-mp3": "Flash first, then the mp3 method (or serial)",
    "id7v2-serial": "Serial console during the flash",
    "mp3-only": "The mp3 method only"
};
