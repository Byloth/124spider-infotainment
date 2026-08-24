/**
 * External link health.
 *
 * This module is load-bearing. Link rot is the adversary this whole project exists to fight: most of the
 * knowledge about this upgrade lives in forum posts and a personal blog, and the guides people still
 * follow today point at hosts that are dead — or worse, at one that now serves a scam.
 *
 * Every external URL rendered anywhere on the site should resolve through here, so a link cannot rot
 * silently. When a status changes, this file changes and every page follows.
 *
 * ⚠️ `hijacked` is not a theoretical category. See `mazdatweaks.com/serial/` below.
 */

import type { LinkStatus } from "./types";

export interface ExternalLink
{
    url: string;
    label: string;
    status: LinkStatus;
    /** ISO date of the last check. */
    lastChecked: string;
    /** A Wayback capture or local archive, where one exists. */
    archiveUrl?: string;
    /** Where to go instead. */
    replacement?: string;
    /** Shown to the reader beside the link. Mandatory for anything not `alive`. */
    warning?: string;
}

const CHECKED = "2026-08-24";

export const LINKS: readonly ExternalLink[] = [
    // -- The hazard ------------------------------------------------------------------------------
    {
        url: "https://mazdatweaks.com/serial/",
        label: "mazdatweaks.com — serial-access instructions",
        status: "hijacked",
        lastChecked: CHECKED,
        replacement: "https://github.com/Trevelopment/mazdatweaks",
        warning: "This page now serves an Indonesian lottery/gambling site. It is the exact page that " +
            "68wooley's guide — still bundled with every firmware package in circulation — tells " +
            "firmware-59 owners to follow. The site's front page still renders as \"Mazda AIO Tweaks\", " +
            "which makes it more deceptive, not less. The surviving copy of the real material is the " +
            "GitHub mirror."
    },
    {
        url: "https://mazdatweaks.com/id7/",
        label: "mazdatweaks.com — ID7 instructions",
        status: "dead",
        lastChecked: CHECKED,
        archiveUrl: "https://web.archive.org/web/2025/https://mazdatweaks.com/id7/",
        replacement: "https://github.com/Trevelopment/mazdatweaks",
        warning: "404 since August 2025, on a domain whose other pages are now hostile."
    },
    {
        url: "https://mazdatweaks.com/",
        label: "mazdatweaks.com — home",
        status: "hijacked",
        lastChecked: CHECKED,
        replacement: "https://github.com/Trevelopment/mazdatweaks",
        warning: "Still renders a plausible \"Mazda AIO Tweaks\" homepage, but sub-pages on this domain " +
            "serve scam content. Treat every link to it in an older guide as unsafe."
    },

    // -- Firmware sources ------------------------------------------------------------------------
    {
        url: "https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/",
        label: "Mazda USA dealer firmware CDN",
        status: "alive",
        lastChecked: CHECKED,
        warning: "North American objects only — a direct GET of a known filename works, listing is " +
            "denied, and EU/ADR objects return 403. This is first-party and free: the four NA files " +
            "with a published MD5 all matched exactly."
    },
    {
        url: "https://my.hidrive.com/share/hsodpqja",
        label: "HiDrive — the old canonical firmware index",
        status: "dead",
        lastChecked: CHECKED,
        warning: "Gone for good, not merely rearranged: the share API answers " +
            "`{\"msg\":\"Not Found: share\"}`. The HTTP 200 on the share root is only the JavaScript " +
            "shell loading. It held every regional file plus a checksum folder, and took Mazda's own " +
            "trim-removal PDFs and install videos with it."
    },
    {
        url: "https://www.mazdashare.com/mtds",
        label: "Mazda EU technical download portal",
        status: "paywalled",
        lastChecked: CHECKED,
        warning: "Official, but requires registration as an independent operator and time-based payment. " +
            "A paying user reported finding only EU 70.00.100A and 74.00.311A, not a full catalogue."
    },
    {
        url: "https://navi-world.com/",
        label: "navi-world — firmware reseller",
        status: "alive",
        lastChecked: CHECKED,
        warning: "Commercial: €29–39 per region. The files themselves are Mazda's."
    },

    // -- The living community --------------------------------------------------------------------
    {
        url: "https://21stcenturyfiat124spider.wordpress.com/",
        label: "Ameridan — 21st Century Fiat / Abarth 124 Spider",
        status: "alive",
        lastChecked: CHECKED,
        warning: "The Fiat-specific reference. Note the author no longer owns the car, so it is no longer " +
            "being developed, and posts predating May 2025 do not know about the mp3 method."
    },
    {
        url: "https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/",
        label: "124spider.org — CarPlay / Android Auto Upgrade HowTo",
        status: "bot-blocked",
        lastChecked: CHECKED,
        // eslint-disable-next-line @stylistic/max-len -- a URL cannot be wrapped
        archiveUrl: "https://web.archive.org/web/2025/https://www.124spider.org/threads/carplay-android-auto-upgrade-howto.32286/",
        warning: "A browser reaches it; scripted fetchers get a proof-of-work challenge and a paywall " +
            "redirect. Most of this research was read from Wayback captures."
    },
    {
        url: "https://forum.miata.net/vb/showthread.php?t=782788",
        label: "miata.net — where the mp3 method was first published",
        status: "login-walled",
        lastChecked: CHECKED,
        warning: "Requires an account. The origin of the mp3 method has therefore never been read " +
            "directly by this project — everything about it here is second-hand."
    },
    {
        url: "https://github.com/Trevelopment/MZD-AIO",
        label: "MZD-AIO — the community tweak installer",
        status: "alive",
        lastChecked: CHECKED,
        warning: "Last release v2.8.6, April 2020. Nothing for firmware 70.00.335+ or 74.x, and the " +
            "upstream tool contains no Fiat branding or navigation restore at all."
    },
    {
        url: "https://github.com/Trevelopment/cmu-autorun",
        label: "cmu-autorun — hosts the ID7 v2 recovery pack",
        status: "alive",
        lastChecked: CHECKED
    },
    {
        url: "https://github.com/mzd-evo/mzd-connect-1-root",
        label: "mzd-connect-1-root — the mp3-method payload",
        status: "alive",
        lastChecked: CHECKED,
        warning: "No README. Four fake MP3 files, a page of JavaScript, and nothing else — no " +
            "credentials, no SSH daemon, no persistence."
    },
    {
        url: "https://www.hexorcism.com/16ND/",
        label: "MX-5 ND workshop manual mirror",
        status: "alive",
        lastChecked: CHECKED,
        warning: "The trim-removal sections survive here after HiDrive took Mazda's own PDFs down."
    },

    // -- Dead mirrors, recorded so nobody chases them ---------------------------------------------
    {
        url: "http://mazdaman.x10host.com/SM356305/",
        label: "mazdaman — old workshop-manual mirror",
        status: "dead",
        lastChecked: CHECKED,
        replacement: "https://www.hexorcism.com/16ND/",
        warning: "404."
    },
    {
        url: "http://trevelopment.win/xx",
        label: "trevelopment.win — the old ID7 v2 download",
        status: "dead",
        lastChecked: CHECKED,
        replacement: "https://github.com/Trevelopment/cmu-autorun",
        warning: "DNS no longer resolves. The pack moved to GitHub."
    }
];

/** Anything a reader must be warned about before clicking. */
export const UNSAFE_LINKS = LINKS.filter((l) => l.status === "hijacked" || l.status === "dead");

export const linkFor = (url: string): ExternalLink | undefined => LINKS.find((l) => l.url === url);
