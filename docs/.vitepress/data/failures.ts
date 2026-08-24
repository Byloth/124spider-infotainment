/**
 * The failure catalogue — 19 entries from `research/raw/F-rollback-failures.md` §3.
 *
 * These pages get read by someone with a dead screen in a parked car, so the shape matters: symptom
 * first, in the words an owner would use, then causes, then what actually fixed it for the people who
 * hit it.
 *
 * `severity: "brick"` marks the ones that cannot be recovered from the driver's seat.
 */

import type { FailurePhase } from "./types";

export interface Failure
{
    id: string;
    /** As an owner would describe it, not as an engineer would classify it. */
    symptom: string;
    causes: string[];
    fixes: string[];
    phase: FailurePhase;
    severity: "brick" | "serious" | "recoverable" | "cosmetic";
    sourceIds: string[];
    /** Set where the sources disagree or rest on a single report. */
    caveat?: string;
}

export const FAILURES: readonly Failure[] = [
    {
        id: "black-screen-after-failsafe",
        symptom: "Black screen after the failsafe step. The radio keeps playing, the knob and touchscreen are dead, " +
            "and the NAV+BACK+MUTE reset does nothing.",
        causes: [
            "Power lost between the failsafe and the reinstall package — the car switched off to check something, " +
            "the " +
            "battery disconnected, or the 25-minute ACC timeout expired",
            "\"Failed to validate package certificate\" on the reinstall, followed by switching off"
        ],
        fixes: [
            "This is the classic brick and it cannot be fixed from the seat. Open the CMU, clip a programmer onto " +
            "the " +
            "SPI-NOR flash and write 0x00 at offset 0x010000, which forces a failsafe boot; then feed it the " +
            "reinstall package from USB",
            "Hardware: CH341A plus a SOIC16 clip (must be 3.3 V — many need the trace-cut modification) or a " +
            "Raspberry Pi with flashrom. Under €50 total",
            "Read and save a backup of the flash before writing anything",
            "Alternatively fit any MZD-1 CMU from any Mazda model — these units are not VIN-locked"
        ],
        phase: "during-flash",
        severity: "brick",
        sourceIds: ["F-19", "F-03", "F-38"]
    },
    {
        id: "system-failure-loop",
        symptom: "\"Install Not Successful: System Failure\", looping every 5–10 seconds after validating.",
        causes: [
            "The reinstall package was selected before the failsafe",
            "A corrupt or incomplete download",
            "A failing USB stick",
            "Tweaks left installed during the update"
        ],
        fixes: [
            "Mazda's own recovery: ignition off, wait for the black screen, remove the stick, pull the ROOM fuse for " +
            "one minute, refit it, switch to ACC, then re-insert the stick",
            "Try another stick — smaller and older is better",
            "Verify the file hashes before copying",
            "Remove the navigation SD card"
        ],
        phase: "during-flash",
        severity: "serious",
        sourceIds: ["F-23", "F-47", "F-30", "F-49"]
    },
    {
        id: "certificate-validation-failed",
        symptom: "\"Failed to validate package certificate\" or \"Verification not successful. Certificate " +
            "validation " +
            "failed\".",
        causes: [
            "Antivirus software altered the download",
            "A partial or wrong-region file",
            "A failing USB stick",
            "The new CarPlay hub was fitted before the firmware update"
        ],
        fixes: [
            "Re-download with the antivirus disabled and verify the hash",
            "Refit the original hub, update, then fit the new one",
            "Clear diagnostic trouble codes before retrying"
        ],
        phase: "during-flash",
        severity: "serious",
        sourceIds: ["F-19", "F-47", "F-26", "F-24"]
    },
    {
        id: "stuck-19-21-percent",
        symptom: "The update stops at 19–21 % (sometimes 2 %), reports failure, and the radio freezes.",
        causes: ["An unreliable no-name 32 GB stick", "The AA hub installed before the update"],
        fixes: [
            "Use a branded FAT32 stick — a Toshiba worked where the no-name failed",
            "Update before fitting the hub"
        ],
        phase: "during-flash",
        severity: "serious",
        sourceIds: ["F-36"]
    },
    {
        id: "stick-not-recognised",
        symptom: "The USB stick is not recognised, or the update files are not listed.",
        causes: [
            "Wrong format — exFAT, NTFS, or formatted on a Mac, which adds hidden files",
            "A USB 3.0 stick, or one larger than 16 GB",
            "A dead USB port in the car",
            "You are on 59.00.502 or above and looking for older versions, which are hidden by design"
        ],
        fixes: [
            "Reformat as FAT32 on Windows",
            "Try an old 2 GB USB 2.0 stick",
            "A full shutdown — lock the car and walk away — often makes the CMU pick the stick up"
        ],
        phase: "during-flash",
        severity: "recoverable",
        sourceIds: ["F-24", "F-28", "F-31", "F-01", "F-21"]
    },
    {
        id: "connecting-to-firmware-hang",
        symptom: "The failsafe installs, then the reinstall sits on \"Connecting to firmware\" for more than twenty " +
            "minutes.",
        causes: ["Not established — the stick or the file"],
        fixes: [
            "Do not switch the car off. One owner did and woke to a black screen the next day",
            "Use the ROOM-fuse retry instead"
        ],
        phase: "during-flash",
        severity: "serious",
        sourceIds: ["F-22"]
    },
    {
        id: "failsafe-install-failed",
        symptom: "\"Failsafe file installation failed\", and the About screen loses its Fail-Safe version.",
        causes: ["Tweaks still installed", "A bad checksum", "A two-file set from an unreliable source"],
        fixes: ["Remove all tweaks before updating", "Verify hashes", "Or use a single-file update package"],
        phase: "during-flash",
        severity: "serious",
        sourceIds: ["F-26", "F-19", "F-53"],
        caveat: "❓ The AIO FAQ says updating with tweaks installed is safe; two bricks were nevertheless attributed " +
            "to it. The cautious reading wins here."
    },
    {
        id: "boot-loop-after-tweaks",
        symptom: "After v70: stuck on the boot logo, looping, or a half-dead interface with no touch and a knob that " +
            "cannot select. The firmware itself is fine.",
        causes: [
            "v56-era tweak packages run on v70 — AIO 1.51 in particular",
            "The community Android Auto tweak layered on top of official AA",
            "\"System Restore\" in the AIO app",
            "The Speedometer app"
        ],
        fixes: [
            "Remove tweaks two or three at a time",
            "Re-run MazdaToFiatV70AIO",
            "Re-flash v70 — but this needs a working diagnostic screen",
            "Two 124s ended up needing a used CMU"
        ],
        phase: "after-tweaks",
        severity: "serious",
        sourceIds: ["F-02", "F-06", "F-54", "F-03"]
    },
    {
        id: "dealer-flashed-latest",
        symptom: "A dealer flashed 70.00.367 or 74.x: Mazda logos everywhere, no navigation, and no way to tweak.",
        causes: [
            "Mazda technicians only have the newest firmware in their system, and written instructions " +
            "get ignored"
        ],
        fixes: [
            "Before 2025: downgrade by USB, then ID7v2 over serial — which works for 335 and 352, so 367 must be " +
            "downgraded first",
            "Since 2025: the mp3 method on v70 and v74, with no serial needed",
            "Or fit a replacement CMU"
        ],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-04", "F-13", "F-21", "F-29", "F-10", "F-41"]
    },
    {
        id: "74-downgrade-wall",
        symptom: "On 74.00.310 or above, the update list shows no lower version — there is no way back to v70 or v59.",
        causes: ["Mazda closed the downgrade path from 74.00.310"],
        fixes: [
            "Only via SPI-NOR: flash a 70.00.100 failsafe dump and set the boot-select byte, which " +
            "forces a reinstall of 70.00.100"
        ],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-19"]
    },
    {
        id: "tweaks-no-longer-autorun",
        symptom: "Tweak sticks no longer autorun, although ID7 \"was\" installed.",
        causes: [
            "ID7 never actually took — a bad stick or port, and there is no reliable confirmation at install time",
            "An update to 70.00.335 or above ran neutralizeid7, which deletes the autorun files"
        ],
        fixes: ["ID7v2 recovery over serial, up to 70.00.352", "The mp3 payload", "Test the stick on a spare CMU"],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-01", "F-29", "F-54", "F-53"]
    },
    {
        id: "serial-login-refused",
        symptom: "The serial console refuses every login after 70.00.367.",
        causes: ["367 removes the credentials entirely"],
        fixes: ["Downgrade to 352 by USB, then use serial", "Or the mp3 payload"],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-54", "F-21", "F-26", "F-41"]
    },
    {
        id: "bluetooth-and-settings-lost",
        symptom: "The phone will not pair, the Bluetooth name is now \"Mazda\", and favourites and sound settings " +
            "are " +
            "gone.",
        causes: ["Any re-flash restores factory defaults, and the Bluetooth identity changes with the firmware"],
        fixes: [
            "Un-pair every phone in the car *and* on the phone **before** updating — it cannot be cleaned up " +
            "afterwards",
            "Record favourites first",
            "MazdaToFiatV70AIO sets the name back to \"124 Spider\""
        ],
        phase: "after-flash",
        severity: "cosmetic",
        sourceIds: ["F-42", "F-17", "F-50"]
    },
    {
        id: "nav-shows-compass",
        symptom: "Navigation shows only a compass or a latitude/longitude readout.",
        causes: ["The Fiat SD card's licence is tied to a Fiat VIN, and Mazda firmware checks for an ND VIN"],
        fixes: ["The NNG-folder restore, which is part of MazdaToFiatV70AIO — but it needs tweak access"],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-43", "F-42", "F-13"]
    },
    {
        id: "cmu-dying-hardware",
        symptom: "The unit dies gradually — black screen sometimes, then always. NOR patching and rescue images do " +
            "nothing, and there is no sign of life over serial.",
        causes: ["Hardware: a cold solder joint, a power rail, or the chip itself — not firmware"],
        fixes: ["Replacement CMU"],
        phase: "after-flash",
        severity: "brick",
        sourceIds: ["F-19", "F-34"]
    },
    {
        id: "technician-interrupted-update",
        symptom: "A technician updated with the windows open, the alarm triggered, or the key away from the car, and " +
            "the screen went black.",
        causes: ["Most likely a power interruption"],
        fixes: ["Unresolved in the source thread; SPI-NOR recovery was the plan"],
        phase: "during-flash",
        severity: "brick",
        sourceIds: ["F-35"],
        caveat: "⚠️ Anecdotal, and the cause was never confirmed."
    },
    {
        id: "airbag-warning-after-hardware",
        symptom: "An airbag warning light after hub or CMU work.",
        causes: ["A connector left disconnected during the dash work"],
        fixes: ["Re-seat the connectors and clear the code"],
        phase: "hardware",
        severity: "recoverable",
        sourceIds: ["F-07"],
        caveat: "⚠️ A single anecdote."
    },
    {
        id: "serial-adapter-burned",
        symptom: "During the serial procedure the USB-TTL adapter burned out, and serial never connected again — " +
            "though the CMU still worked.",
        causes: ["A bare TX wire shorted against the CMU case"],
        fixes: [
            "No fix was found in the thread",
            "Use insulated solid-core wire and check with a multimeter first",
            "The mp3 method avoids serial altogether"
        ],
        phase: "after-flash",
        severity: "serious",
        sourceIds: ["F-60"]
    },
    {
        id: "reboot-loop-after-nor-patch",
        symptom: "A 45-second reboot loop after patching the NOR flash (seen on 59.00.545 ADR).",
        causes: ["Not established — possibly the wrong rescue image"],
        fixes: ["Unresolved in the source threads"],
        phase: "during-flash",
        severity: "brick",
        sourceIds: ["F-03", "F-19"],
        caveat: "⚠️ Unresolved. Recorded so nobody assumes NOR recovery always works."
    }
];

/** The ones that cannot be fixed from the driver's seat. */
export const BRICKS = FAILURES.filter((f) => f.severity === "brick");

export const failuresByPhase = (phase: FailurePhase): Failure[] => FAILURES.filter((f) => f.phase === phase);
