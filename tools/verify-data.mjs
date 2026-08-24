#!/usr/bin/env node
/**
 * Integrity checks for the data modules under `docs/.vitepress/data/`.
 *
 *   bun run verify:data
 *
 * These are the checks that make the data trustworthy rather than merely present:
 *
 *   1. Every SHA256 in `files.ts` matches `downloads/CHECKSUMS.sha256`, in both directions.
 *      A mistyped hash would tell a reader their download is sound when it is not.
 *   2. Every source id cited across `research/*.md` resolves to an entry in `sources.ts`.
 *   3. Row counts match the research documents.
 *
 * It reads the TypeScript as text on purpose — no build step, no imports, so it runs anywhere and
 * cannot be fooled by a module that fails to load.
 */

/* eslint-disable no-console -- this is a CLI reporter; printing is its entire job. */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "docs/.vitepress/data");

let failures = 0;
const fail = (msg) =>
{
    console.error(`  ✗ ${msg}`);
    failures += 1;
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

// -- 1. hashes -----------------------------------------------------------------------------------

console.log("\nfiles.ts against downloads/CHECKSUMS.sha256");

const filesTs = readFileSync(join(DATA, "files.ts"), "utf8");
const declared = new Map();
for (const m of filesTs.matchAll(/path: "([^"]+)",[\s\S]*?sha256: "([0-9a-f]{64})"/g))
{
    declared.set(m[1], m[2]);
}

const checksumsPath = join(ROOT, "downloads/CHECKSUMS.sha256");
if (!existsSync(checksumsPath))
{
    fail("downloads/CHECKSUMS.sha256 not found — cannot verify hashes");
}
else
{
    const recorded = new Map();
    for (const line of readFileSync(checksumsPath, "utf8").split("\n"))
    {
        const [sha, path] = line.split("  ");
        if (sha && path) { recorded.set(path.trim(), sha.trim()); }
    }

    for (const [path, sha] of declared)
    {
        if (!recorded.has(path)) { fail(`declared in files.ts but absent from CHECKSUMS: ${path}`); }
        else if (recorded.get(path) !== sha) { fail(`SHA256 mismatch for ${path}`); }
    }
    for (const path of recorded.keys())
    {
        if (!declared.has(path)) { fail(`present in CHECKSUMS but missing from files.ts: ${path}`); }
    }

    if (!failures) { pass(`${declared.size} artifacts, every hash matching in both directions`); }
}

// -- 2. citation coverage ------------------------------------------------------------------------

console.log("\nsource ids cited in research/ against sources.ts");

const sourcesFile = join(DATA, "sources.ts");
if (!existsSync(sourcesFile))
{
    console.log("  – sources.ts not written yet, skipping");
}
else
{
    const sourcesTs = readFileSync(sourcesFile, "utf8");

    // Ids are written inconsistently across the research documents (A-3 vs A-03), and the registry
    // keeps one primary entry per URL with the other themes' ids in an `alias` column. Both must
    // resolve, so normalise the padding and treat aliases as known.
    const normalise = (id) =>
    {
        const at = id.lastIndexOf("-");
        return `${id.slice(0, at)}-${String(Number.parseInt(id.slice(at + 1), 10)).padStart(2, "0")}`;
    };

    const known = new Set();
    for (const m of sourcesTs.matchAll(/id: "([A-F][0-9]?-[0-9]+)"/g)) { known.add(normalise(m[1])); }
    for (const m of sourcesTs.matchAll(/alias: "([^"]*)"/g))
    {
        for (const a of m[1].matchAll(/\b([A-F][0-9]?-[0-9]+)\b/g)) { known.add(normalise(a[1])); }
    }

    const cited = new Set();
    const walk = (dir) =>
    {
        for (const entry of readdirSync(dir, { withFileTypes: true }))
        {
            const full = join(dir, entry.name);
            if (entry.isDirectory())
            {
                // `archive/` is third-party copy; `raw/` reports keep their own local id space.
                if (entry.name !== "archive" && entry.name !== "raw") { walk(full); }
            }
            else if (entry.name.endsWith(".md"))
            {
                for (const m of readFileSync(full, "utf8").matchAll(/\[([A-F][0-9]?-[0-9]+)[\],]/g))
                {
                    cited.add(normalise(m[1]));
                }
            }
        }
    };
    walk(join(ROOT, "research"));

    const orphans = [...cited].filter((id) => !known.has(id)).sort();
    if (orphans.length)
    {
        const shown = orphans.slice(0, 12).join(", ");
        const more = orphans.length > 12 ? " …" : "";

        fail(`${orphans.length} cited ids missing from sources.ts: ${shown}${more}`);
    }
    else
    {
        pass(`${cited.size} distinct cited ids, all resolving among ${known.size} registered sources`);
    }
}

// -- 3. row counts -------------------------------------------------------------------------------

console.log("\nrow counts against the research documents");

const countIn = (file, pattern) =>
    existsSync(join(DATA, file)) ? [...readFileSync(join(DATA, file), "utf8").matchAll(pattern)].length : null;

const expectations = [
    ["firmware.ts", /^ {8}id: "/gm, 21, "firmware versions"],
    ["failures.ts", /^ {8}id: "/gm, 19, "failure modes"]
];

for (const [file, pattern, expected, label] of expectations)
{
    const actual = countIn(file, pattern);
    if (actual === null) { console.log(`  – ${file} not written yet, skipping`); }
    else if (actual !== expected) { fail(`${file}: ${actual} ${label}, expected ${expected}`); }
    else { pass(`${file}: ${actual} ${label}`); }
}

console.log(failures ? `\n${failures} problem(s)\n` : "\nall checks passed\n");
process.exit(failures ? 1 : 0);
