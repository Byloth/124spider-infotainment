---
title: Obtaining and verifying files
---

<script lang="ts" setup>
import DownloadSources from "@theme/components/DownloadSources.vue";
import HashTable from "@theme/components/HashTable.vue";
import HashVerifier from "@theme/components/HashVerifier.vue";
import SourceCite from "@theme/components/SourceCite.vue";

import { UNSCANNABLE } from "../.vitepress/data/files";
</script>

# Obtaining and verifying files

Firmware is the one thing this upgrade needs that you cannot make yourself, and it is proprietary Mazda
software — so where it comes from, and whether the copy you got is the real thing unmodified, is a safety
question, not a licensing footnote. A tampered or truncated image can brick the unit.

**This project hosts none of it.** What it does instead is publish the hashes and the provenance, so that
whatever you obtained, from wherever you obtained it, you can check it against a known-good value before
you flash. This page is how.

## Where the files come from, per region

The picture is not the same in every market, so the honest ranking below is region-dependent.

### North America needs no mirror

Mazda's own dealer CDN still serves the NA files, first-party and free<SourceCite ids="A-03,D-02" />:

```
https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT/<filename>
```

A direct GET of a known object works; *listing* the bucket is denied, so you need the exact filename (the
matrix and the hash tables below give them). Four NA files downloaded this way matched the community-
published MD5s exactly — which is strong evidence the CDN copies are genuine and unmodified. If you are in
NA, this is the best source there is: the manufacturer, at no cost.

### Europe and ADR return 403 there

The same CDN refuses EU and ADR objects. For those regions the realistic options, best first:

- **The 124spider.org community bundles** — Google-Drive archives holding the failsafe, the reinstall and
  the tweak packages together, free, and verified byte-for-byte against the community
  hashes<SourceCite ids="A-03,A-12" />. This is what the project itself holds for EU and ADR.
- **The paid official EU portal** — `mazdashare.com/mtds`, Mazda's own paid distribution.
- **Resellers** — €29–39 for a stick or a download. They work, but you are paying for a file you can
  verify is identical to a free one.

Whatever the source, the rule is the same: **verify before you flash.** A convenient link is not a
trustworthy file; the hash is what makes it trustworthy.

The register below tracks the **durable public distribution points**, ranked first-party first, with each
one's health as last checked — a dead entry like HiDrive is kept precisely to mark it dead. The
124spider.org bundles are not among them because they reach owners as shared Google-Drive links, the kind
that come and go: the [link register](/security/link-safety) already lists several such shares
(OneDrive, 1fichier, MEGA) that have since died. The bundles themselves are pinned here by their
**hashes** — in the table below and in the [inventory](/reference/inventory) — which is what lets you
verify a copy no matter which short-lived link you got it from.

<DownloadSources />

## The hashes to check against

Below are the checksums for **70.00.100A**, the [community target](/firmware/#v70-00-100a), one small
table per region. Each build is two files — the failsafe and the reinstall — and each line gives the MD5
and the source lineage the published value comes from. **The SHA-256 for every file the project holds is
in the interactive table further down**, where you can filter by market and copy a value with one click;
it renders in full with scripting disabled too.

The MD5 is what ties a file to what the community published years ago. It is a weak hash cryptographically,
but here it is doing archival matching, not defending against a forger — a match tells you your copy is
the same file everyone else has been flashing.

### North America — from Mazda's CDN

| File | Bytes | MD5 |
| --- | --- | --- |
| `cmu150_NA_70.00.100A_failsafe.up` | 7,088,769 | `9324d1907c2c722738b0a389de73e91d` |
| `cmu150_NA_70.00.100A_reinstall.up` | 925,592,239 | `da7667967e62e324c4ef457de4a262bf` |

Both MD5s match the community-published values, and the files came straight from
Mazda<SourceCite ids="A-03,D-02" />.

### Europe — from the community bundle

| File | Bytes | MD5 |
| --- | --- | --- |
| `cmu150_EU_70.00.100A_failsafe.up` | 7,078,085 | `cc485f4f16541cd803f615df42dc3512` |
| `cmu150_EU_70.00.100A_reinstall.up` | 2,355,206,863 | `d5c042588b5de7f0d72e02b03ec78590` |

The reinstall MD5 `d5c042…` settled a long-standing contradiction: a rival value `279f1b81…` circulated
for years but turns out to be an older copy that threw *"Invalid packet certificate"* on
flashing<SourceCite ids="A-03,D-02,D-07" />.

::: warning The EU hashes are corroborated, not independently confirmed
The two sources that agree on the EU reinstall MD5 are **both Google-Drive re-hosts, and may share a
single upstream copy**<SourceCite ids="A-03,A-12" />. That is corroboration, not true independence — if
the upstream was wrong, both would be wrong together. It is the best the research could establish for EU,
and it is stated plainly rather than dressed up as two-source agreement. The ADR pair below is stronger.
:::

### ADR — from the community bundle

| File | Bytes | MD5 |
| --- | --- | --- |
| `cmu150_ADR_70.00.100A_failsafe.up` | 7,089,960 | `46d7a81af84845eea30557146221f303` |
| `cmu150_ADR_70.00.100A_reinstall.up` | 1,917,094,531 | `afb5cf9ac044459c2a494c6b1eb46dd9` |

Both ADR halves match community-published MD5s from a **different source lineage** than the EU pair, which
is why the ADR corroboration is the more trustworthy of the two<SourceCite ids="A-03,D-02" />.

### Every file the project holds

The table below is generated from the file inventory itself — filter it by kind, and if you have told the
site which market your car is, it narrows to your region. Click any hash to copy it.

<HashTable />

## Check a file in your own browser

Pick a `.up` file and the tool computes its SHA-256 locally and tells you whether it matches something
this site knows about. **Nothing is uploaded** — the hashing happens in the page, on your machine; the
file never leaves it. A 2.3 GB reinstall image takes a while, so give it time.

<HashVerifier />

## Two things a hash cannot tell you

::: danger Test the USB stick before you flash — this is the number-one brick cause
A failing or fake-capacity USB stick that corrupts the image mid-write is the **single most common cause
of a failed flash**, and a failed flash can brick the unit. Verify the *stick*, not just the file: write
it full with **H2testw** and confirm every byte reads back, before you put a firmware image on it. This
step comes from the recovered ASH8 verification guide the project holds
(`research/archive/recovered/`), and it belongs here — before the flash — not buried in the procedure.
:::

And a clean checksum is not a clean bill of health for the largest files. **{{ UNSCANNABLE.length }} of
the images this project holds exceed VirusTotal's analysis cap entirely** — they run past 650 MB, so they
cannot be scanned by hash, by upload or by URL, ever<SourceCite ids="A-03" />. For those, a matching MD5
tells you the file was not altered in transit from the community copy; it tells you nothing about what is
inside. That is a limit to state, not to paper over — the full reasoning is on
[what the tweaks leave on your car](/security/).

---

**Related:** [firmware version matrix](/firmware/) · [regions and file naming](/firmware/regions) ·
[points of no return](/firmware/points-of-no-return) · [old guides and dead links](/security/link-safety) ·
[the file inventory](/reference/inventory)
