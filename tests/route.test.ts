/**
 * Route derivation — the safety-critical piece.
 *
 * `(firmware version, ID7 state) → Route` decides which of the four procedures a reader is sent down.
 * Getting it wrong does not produce a cosmetic bug: it can send someone toward a flash their car cannot
 * come back from, or tell them a tweak route exists when their firmware closed it years ago.
 *
 * The rules come from `research/PROCEDURE-DRAFT.md` §0 and `research/FIRMWARE-MATRIX.md` §1 and §4.
 * Written before the implementation.
 *
 * The strongest test here is the last one: every firmware entry in the data must resolve to *some*
 * route, so adding a version to `firmware.ts` without teaching this function about it fails the build.
 */

import { describe, expect, it } from "vitest";

import { FIRMWARE } from "../docs/.vitepress/data/firmware";
import { ROUTES, routeFor } from "../docs/.vitepress/logic/route";

describe("routeFor", () =>
{
    describe("on 56.x — the one version where ID7 can still be installed from USB", () =>
    {
        it("sends the reader to install ID7 first", () =>
        {
            expect(routeFor("56.00.521", "no")).toBe("id7-from-usb");
            expect(routeFor("56.00.521", "unknown")).toBe("id7-from-usb");
        });

        it("still works if ID7 is already there", () =>
        {
            expect(routeFor("56.00.521", "yes")).toBe("id7-from-usb");
        });
    });

    describe("on Fiat 59.x — USB side-loading already closed", () =>
    {
        it("routes to serial or the mp3 method when ID7 was never installed", () =>
        {
            expect(routeFor("59.00.524", "no")).toBe("serial-or-mp3");
            expect(routeFor("59.00.562", "no")).toBe("serial-or-mp3");
            expect(routeFor("59.00.502", "no")).toBe("serial-or-mp3");
        });

        it("routes as if on 56.x when ID7 survived from an earlier flash", () =>
        {
            // ID7 installed on 56.x keeps working right through to 70.00.100.
            expect(routeFor("59.00.524", "yes")).toBe("id7-from-usb");
        });

        it("treats an unknown ID7 state as absent", () =>
        {
            // Assuming ID7 is present when it is not sends the reader down a path that silently fails
            // after the flash — the single most common way people got stuck.
            expect(routeFor("59.00.562", "unknown")).toBe("serial-or-mp3");
        });
    });

    describe("on 70.00.100 — the community target", () =>
    {
        it("uses ID7 when present", () =>
        {
            expect(routeFor("70.00.100A", "yes")).toBe("id7-from-usb");
        });

        it("falls back to serial or mp3 without it", () =>
        {
            expect(routeFor("70.00.100A", "no")).toBe("serial-or-mp3");
        });
    });

    describe("on 70.00.335 and 352 — ID7 has been deleted by the update", () =>
    {
        it("ignores a claimed ID7, because neutralizeid7 removed it", () =>
        {
            // Claiming ID7 here must not route the reader to the USB path: the update wiped it.
            expect(routeFor("70.00.335C", "yes")).toBe("id7v2-serial");
            expect(routeFor("70.00.335C", "no")).toBe("id7v2-serial");
            expect(routeFor("70.00.352B", "yes")).toBe("id7v2-serial");
        });
    });

    describe("on 70.00.367 and 74.x — serial is gone too", () =>
    {
        it("leaves only the mp3 method", () =>
        {
            expect(routeFor("70.00.367A", "no")).toBe("mp3-only");
            expect(routeFor("74.00.324A", "no")).toBe("mp3-only");
            expect(routeFor("74.00.331", "yes")).toBe("mp3-only");
        });
    });

    it("returns undefined for a version it has never heard of", () =>
    {
        expect(routeFor("99.00.999", "no")).toBeUndefined();
    });

    it("every firmware version in the data resolves to a route", () =>
    {
        // The guard that matters: adding a version to firmware.ts without teaching this function about
        // it must fail here rather than silently returning nothing to a reader.
        const unrouted = FIRMWARE
            .filter((f) => routeFor(f.id, "no") === undefined)
            .map((f) => f.id);

        expect(unrouted).toEqual([]);
    });

    it("only ever returns a route the type allows", () =>
    {
        const returned = new Set(FIRMWARE.map((f) => routeFor(f.id, "no")));

        for (const route of returned)
        {
            expect(ROUTES).toContain(route);
        }
    });
});
