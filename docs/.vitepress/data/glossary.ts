/**
 * The vocabulary these documents assume.
 *
 * Written for someone who has never opened a car's dashboard. Anything a reader would have to search
 * for belongs here — and `GlossaryTip` surfaces these definitions inline across the site, so the pages
 * themselves can stay readable without stopping to explain an acronym for the fourth time.
 */

export interface GlossaryTerm
{
    term: string;
    /** Other spellings and abbreviations that should resolve to this entry. */
    aliases?: string[];
    definition: string;
}

export const GLOSSARY: readonly GlossaryTerm[] = [
    {
        term: "CMU",
        aliases: ["Connectivity Master Unit"],
        definition: "The Connectivity Master Unit — the computer behind the dashboard screen that runs " +
            "the whole infotainment system. On a 124 Spider it is the same Johnson Controls unit fitted " +
            "to the Mazda MX-5 ND, which is why Mazda's firmware runs on it at all."
    },
    {
        term: "MZD Connect",
        aliases: ["Mazda Connect", "MZD"],
        definition: "Mazda's name for the infotainment platform. Fiat rebadged it as \"Fiat Connect\" " +
            "for the 124, but the software underneath is the same."
    },
    {
        term: "JCI",
        aliases: ["Johnson Controls"],
        definition: "Johnson Controls, who built the unit. Their name appears throughout the system's " +
            "internals — the diagnostic screens, the file paths, and the signed diagnostic package that " +
            "the ID7 tweak turns to its own ends."
    },
    {
        term: "failsafe package",
        aliases: ["failsafe", "_failsafe.up"],
        definition: "The smaller of the two firmware files, roughly 7 MB. It replaces the bootloader and " +
            "the updater itself, and must be installed **first**. Its name is misleading: it is not a " +
            "safety net. Losing power between it and the reinstall package is the classic way to brick " +
            "the unit, because the system then boots neither the old software nor the new."
    },
    {
        term: "reinstall package",
        aliases: ["reinstall", "_reinstall.up"],
        definition: "The large firmware file, between 0.9 and 2.3 GB depending on region, containing the " +
            "operating system. Installed **second**, after the failsafe package."
    },
    {
        term: "update package",
        aliases: ["_update.up"],
        definition: "From firmware 70.00.335 onwards Mazda merged the two files into one. Simpler, and " +
            "notably safer: the classic power-loss brick belongs to the two-file era."
    },
    {
        term: "ID7",
        definition: "A small package that keeps the USB tweak installer working after Mazda closed it in " +
            "firmware 59.00.502. It works by command injection into Mazda's own signed diagnostic tool, " +
            "and it leaves three root accounts and an SSH server permanently on the car. Named after " +
            "the forum user who wrote it."
    },
    {
        term: "ID7 v2",
        definition: "Not a newer package so much as a different procedure: a serial console attached " +
            "*during* the firmware flash, with the recovery files pasted in before the first reboot. " +
            "Needed from 70.00.335 onwards, and it must be repeated after every subsequent flash."
    },
    {
        term: "neutralizeid7",
        definition: "A script Mazda added in firmware 70.00.335 that deletes the ID7 files and, together " +
            "with a forced password update, removes the known serial credentials. This is the mechanism " +
            "behind the second point of no return."
    },
    {
        term: "mp3 method",
        aliases: ["mp3 hack"],
        definition: "A 2024–25 discovery: four specially crafted files that the CMU treats as music open " +
            "its diagnostic terminal, which a USB keyboard can then drive. It runs the tweaks with " +
            "neither ID7 nor a serial console, and — unlike ID7 — installs nothing permanent."
    },
    {
        term: "MZD-AIO",
        aliases: ["AIO", "All-In-One Tweaks"],
        definition: "The community tweak installer for Mazda infotainment units. Its last release was " +
            "April 2020, and it contains no Fiat branding or navigation restore of its own."
    },
    {
        term: "MazdaToFiatV70AIO",
        definition: "The single tool that matters for a 124: it restores the Fiat or Abarth branding, " +
            "the boot animations, the CarPlay icon, the factory navigation and the Bluetooth name after " +
            "Mazda firmware has replaced them. Built by 68wooley and Ameridan on top of an older " +
            "MZD-AIO build."
    },
    {
        term: "NNG",
        aliases: ["iGO"],
        definition: "The navigation engine, made by NNG and also known as iGO. Mazda's firmware ships a " +
            "version that checks for a Mazda VIN, which is why the Fiat map card stops working after " +
            "the upgrade — and why the fix is to put the Fiat version of that folder back."
    },
    {
        term: "ADR",
        aliases: ["4A"],
        definition: "The market covering Australia, New Zealand, the Middle East, Asia-Pacific, South " +
            "Africa and South America. It appears on screen as `4A`, which catches people out when they " +
            "go looking for files."
    },
    {
        term: "TAU",
        definition: "The tuner module, which is separate from the CMU. Flashing another region's firmware " +
            "does not change it, so a car keeps its original radio band plan regardless."
    },
    {
        term: "SPI-NOR flash",
        aliases: ["boot-select", "NOR"],
        definition: "An 8 MB memory chip inside the CMU holding the bootloader and a byte that decides " +
            "which system to start. Rewriting that byte with a clip-on programmer is what revives a " +
            "unit bricked mid-flash — the whole recovery procedure rests on it."
    },
    {
        term: "H2testw",
        definition: "A small utility that writes and re-reads a USB stick to prove it actually stores " +
            "what it claims. Worth the wait: a failing stick is the most common cause of a failed " +
            "flash, and a failed flash can cost the unit."
    },
    {
        term: "CSP02",
        definition: "The Mazda customer-satisfaction programme under which the CarPlay retrofit kit was " +
            "distributed in North America, which is why the official part numbers and labour times are " +
            "public at all."
    },
    {
        term: "region suffix",
        aliases: ["N suffix", "M suffix"],
        definition: "The letters after the version number, as in `70.00.100A EU N`. `NA`, `EU`, `4A` and " +
            "`JP` are the market; the trailing `N` means the NNG navigation protocol and `M` means " +
            "Matsukone, used only in Japan. The `A`, `B` or `C` before it is the revision — a different " +
            "thing entirely."
    }
];

export const glossaryFor = (term: string): GlossaryTerm | undefined =>
{
    const wanted = term.trim().toLowerCase();

    return GLOSSARY.find((g) =>
        g.term.toLowerCase() === wanted ||
        (g.aliases?.some((a) => a.toLowerCase() === wanted) ?? false));
};
