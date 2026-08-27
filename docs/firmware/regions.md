---
title: Regions and file naming
---

<script lang="ts" setup>
import VersionDecoder from "@theme/components/VersionDecoder.vue";
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Regions and file naming

Two strings tell you almost everything about a firmware file before you flash it: the filename on the
stick, and the version line the car shows on screen. Both encode the same four facts — version, region,
package type, nav protocol — and reading them wrong is one of the ways people flash the wrong image.
This page is how to read them.

## The filename

Mazda's `.up` packages follow one pattern<SourceCite ids="C2-16,D-04" />:

```
cmu150_EU_70.00.100A_reinstall.up
│      │  │          │
│      │  │          └─ package type: failsafe · reinstall · update
│      │  └─ version and revision: 70.00.100, revision A
│      └─ region: NA · EU · 4A (ADR) · JP
└─ platform: cmu150 (the CMU generation; constant for the 124)
```

| Fragment | In the example | What it means |
| --- | --- | --- |
| `cmu150` | `cmu150` | The head-unit generation. The same across every 124 file. |
| region | `EU` | Which regional lineage the file belongs to. **`4A` here means ADR.** |
| version | `70.00.100` | The firmware version proper. |
| revision | `A` | A minor revision. A later letter is newer: `335C` is newer than `335`. |
| type | `reinstall` | `failsafe`, `reinstall` or `update` — see below. |

## The on-screen string

The car shows its version under **`HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION`**, and it looks
like this:

```
70.00.100A EU N
│          │  │
│          │  └─ nav protocol: N = NNG/iGO · M = Matsukone (Japan)
│          └─ region
└─ version and revision
```

The trailing letter is the piece most often misread. **`N` and `M` are the navigation protocol, not a
revision**<SourceCite ids="C2-16" />: `N` is the NNG / iGO engine used in every region except Japan, and
`M` is Matsukone (Zenrin), which only Japan uses. The revision is the letter *attached* to the version
number — the `A` in `70.00.100A` — never the one at the end.

## The region codes

| Code | Region | Covers |
| --- | --- | --- |
| `NA` | North America | US, Canada, Mexico |
| `EU` | Europe | European market cars |
| `4A` | **ADR** | Australia / NZ, the Middle East, Asia-Pacific, South Africa, South America |
| `JP` | Japan | Japan only; uses the `M` nav protocol |

`4A` is the code that surprises people: on screen and in filenames the ADR region is written `4A`, not
`ADR`<SourceCite ids="C2-16" />. Japan is a special case throughout — the 124 was never sold there, its
firmware uses a different nav protocol, and its images are effectively unobtainable — so for a 124 owner
the live choice is really NA, EU or ADR.

## The three package types

A firmware release is not always one file<SourceCite ids="D-04,C2-16" />:

- **`_failsafe.up`** — around 7 MB. The bootloader/updater half. On a two-file build it installs
  **first**.
- **`_reinstall.up`** — 0.9 to 2.3 GB depending on region. The operating system itself. It installs
  **second**, after the failsafe.
- **`_update.up`** — a single file that folds both halves together. Every build from **70.00.335
  onward** ships this way; the older two-file split stops there.

So 70.00.100A, the community target, is a *two-file* build: you flash the failsafe, then the reinstall.
74.00.324A is a *single-file* update. Getting the order wrong on a two-file build — or flashing only one
half — is a documented way to leave the unit in an undefined state.

## Why the region has to match

The version determines what the software can do; the region determines whether it is the right software
for *your* car's hardware and market at all. The universal rule is simple: **flash your own region's
files.**

::: warning One anecdote is not permission
Exactly one owner reported running NA firmware on an ADR car without bricking it — CarPlay worked, though
an auto-lock setting went missing<SourceCite ids="C2-16,B-01" />. It is recorded here honestly, but it
changes nothing: the tuner (TAU) module keeps the car's original band plan regardless of the firmware, so
a mismatched image is running against hardware it was not built for, and wrong-region flashing is treated
as **brick risk everywhere**. One car that survived does not make it safe. Match your region.
:::

## Decode a string

Paste the version line from your car — or a filename you are unsure about — and this will break it into
its parts and tell you which route it puts you on. It runs entirely in your browser; nothing is sent
anywhere. With scripting off, the instruction above for finding the string on the car is the reading path.

<VersionDecoder />

---

**Related:** [firmware version matrix](/firmware/) · [points of no return](/firmware/points-of-no-return) ·
[obtaining and verifying files](/firmware/obtaining)
