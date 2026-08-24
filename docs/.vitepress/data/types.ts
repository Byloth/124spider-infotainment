/**
 * Shared vocabulary for the data modules.
 *
 * The principle these modules exist to serve: the documents under `research/` keep the prose and the
 * reasoning; these modules hold the facts. A changed hash, a newly dead link or a corrected part number
 * is then a one-file edit that every page follows.
 *
 * Note especially `Confidence`. The research is full of ⚠️ (single report) and ❓ (sources contradict),
 * and those markers are load-bearing: flattening them into plain assertions is the one failure mode that
 * would make this site actively worse than the forum posts it replaces.
 */

/** Sales region. `ADR` appears on screen as `4A`; `JP` uses a different nav protocol entirely. */
export type Market = "NA" | "EU" | "ADR" | "JP";

/** How well a claim is supported. Never omit this where the research qualified something. */
export type Confidence =
    | "confirmed" | // two or more independent sources agree
    "single-report" | // ⚠️ one person said it and nobody contradicted them
    "contradictory" | // ❓ sources actively disagree
    "unknown"; // nothing in any source we read

/** Whether a supported behaviour is available, and how sure we are. */
export interface Support
{
    available: boolean | "unknown";
    confidence: Confidence;
    note?: string;
}

/** Live state of an external URL, as last checked. */
export type LinkStatus =
    | "alive" |
    "dead" |
    "paywalled" | // reachable, costs money
    "login-walled" | // reachable, needs an account
    "bot-blocked" | // a browser reaches it; scripts do not
    "hijacked"; // ⚠️ resolves, but the content is now hostile

/** How far a file has been checked. See `/reference/` for the full definitions. */
export type FileStatus =
    | "verified" | // hash matches ≥2 independent reports (or came from the author) AND scanned clean
    "verified-pending-AV" | // hash matches; no scan possible or not yet run
    "collected" | // held locally and hashed, single source
    "known-hash" | // not held, but a community hash exists
    "known-to-exist" | // referenced, no hash, not held
    "paywalled" |
    "lost";

/** Trust placed in a source. */
export type Trust =
    | "A" | // official or first-party, or hash-verified
    "B" | // experienced community author, corroborated
    "C" | // single community report, or a shop's claim
    "D"; // marketing copy

/**
 * The four starting points a reader can be in, which decide the whole procedure.
 * See `research/PROCEDURE-DRAFT.md` §0.
 */
export type Route =
    | "id7-from-usb" | // on 56.x: install ID7 first, everything else follows easily
    "serial-or-mp3" | // on Fiat 59.x: USB side-loading already gone
    "id7v2-serial" | // on 70.00.335/352: ID7 wiped, serial during the flash
    "mp3-only"; // on 70.00.367 / 74.x: serial dead too

/** Which phase of the job a failure belongs to. */
export type FailurePhase = "during-flash" | "after-flash" | "after-tweaks" | "hardware";

/** A price observation. Always dated — these are historic figures, not quotes. */
export interface Price
{
    market: Market;
    amount: string;
    note?: string;
    asOf: string;
}
