---
title: Old guides and dead links
---

<script lang="ts" setup>
import LinkStatus from "@theme/components/LinkStatus.vue";
import LinkTable from "@theme/components/LinkTable.vue";
import SourceCite from "@theme/components/SourceCite.vue";

import { LINKS, UNSAFE_LINKS } from "../.vitepress/data/links";
</script>

# Old guides and dead links

::: danger The guide everyone still follows points at a site that is no longer what it was
68wooley's *CarPlay / Android Auto Upgrade HowTo, Part 1* is still the reference document for this
upgrade. It is still bundled inside the firmware packages circulating today, and it is still what people
are handed when they ask how to do this. For owners on firmware 59 it says to follow
**`https://mazdatweaks.com/serial/`**<SourceCite ids="C2-13,A-02" />.

Checked on 2026-08-24, that page serves an **Indonesian lottery and gambling site**. Meanwhile
`mazdatweaks.com/` itself still renders a perfectly plausible "Mazda AIO Tweaks" homepage.

**The working front page is what makes this dangerous.** A reader who follows the guide's link lands on a
page that is obviously wrong, backs up one level to check the site is legitimate, sees something that
looks exactly like the tool's real homepage, and concludes they mistyped. There is no cue that anything
has changed hands.

**Nothing on that domain should be run, downloaded or trusted** — including the pages that look harmless.
`/id7/`, the other one the guides lean on, has returned 404 since August
2025<SourceCite ids="C2-09,F-52" />, which is fine today and is not a promise about tomorrow: whoever
serves a gambling site from `/serial/` decides what `/id7/` returns next. Nothing on
`mazdatweaks.com` is clickable anywhere on this site, whatever its own status says.

The surviving copy of the real material is the author's own GitHub repository,
<LinkStatus url="https://github.com/Trevelopment/mazdatweaks" label="Trevelopment/mazdatweaks" />.
:::

## How this surfaced

It is worth telling, because it is the clearest illustration of why this project exists at all.

Every file collected here was put through VirusTotal. One came back with a detection: the 68wooley guide
archive, where **ESET alone out of 65 engines** reported `PDF/Phishing.A.Gen` on Part 1. Part 2 was clean.

So the PDF was examined directly. It contains **no active content whatsoever** — no `/JavaScript`, no
`/OpenAction`, no `/Launch`, no `/EmbeddedFile`, no `/SubmitForm`, no `/XFA`. Nine plain hyperlinks, and
nothing else. A generic heuristic had fired on a document whose entire purpose is to point at download
links, which is a reasonable thing for a heuristic to be suspicious of and, in this case, wrong.

**A false positive on the file. But checking those nine links is what found the real problem.** The
scanner was wrong about the PDF and right that the PDF was worth looking at — which is not the same thing,
and is a good argument for treating a lone detection as a reason to investigate rather than a verdict.

## The register

Every external link anywhere on this site resolves through one file, so a host cannot rot without the
whole site noticing. This is that file, rendered whole:
**{{ LINKS.length }} hosts, of which {{ UNSAFE_LINKS.length }} are dead or hostile.**

<LinkTable />

Read the pattern rather than the individual rows. Almost every mirror this community relied on is gone,
and they failed in different ways:

- **HiDrive** — the canonical firmware index for years, linked from every guide. Its share API now answers
  `Not Found: share`. Not moved, not reorganised: removed.
- **MEGA** — two separate folders, one from 2018 and one from 2021. The 2021 one is the nastier failure,
  because the page still opens and simply shows nothing, which reads as a mistake at your end.
- **1fichier, OneDrive behind a `bit.ly`** — dead and 403 respectively. The shortened link is the worst
  case of all: you cannot tell from the URL what it pointed at or who shared it, so there is nothing to
  search for once it stops working.
- **`trevelopment.win`** — the ID7 v2 download. The domain no longer resolves; the package moved to GitHub.
- **`mazdatweaks.com`** — the only one that did not die. Someone else has it now.

Takedown pressure is the obvious explanation for most of these: this is proprietary Mazda firmware, and
every host that ever mirrored it in volume eventually stopped. It is also why this site hosts no binaries
of its own — see [obtaining firmware](/firmware/obtaining) for what it does instead.

## Reading a guide you found somewhere else

Most of the material about this upgrade was written between 2018 and 2022 and has not been touched since.
It is still largely correct about the car. It is almost entirely wrong about where to get things.

**Work out roughly when it was written.** If it treats 70.00.335 as the end of the road — "install ID7
first or you will never tweak again" — it predates May 2025 and does not know about the mp3
method<SourceCite ids="B-04,A-13" />. That is not a small omission: it is the difference between "your car
is permanently locked" and "there is a route, though a less proven one".

**Distrust every download link in it, and check the ones you follow.** Assume the file is gone; the useful
part of an old guide is the procedure, not the URL. If a link does resolve, that is not reassurance — the
`mazdatweaks.com` case is precisely a link that still works.

**Check anything you are about to run against [the file inventory](/reference/inventory).** Every file
this project holds is listed there with its SHA-256, and you can check a download in your own browser
without uploading it anywhere. A file that hashes to a value nobody has published is not necessarily bad,
but it is not the file the guide was written about.

**Prefer the author's own copy.** Where a package still exists in the place its author put it —
Ameridan's blog, the Trevelopment and mzd-evo repositories on GitHub — take it from there rather than from
a re-host, even a convenient one.

::: tip If you find something we have not
Link health here is a snapshot, dated in the table above. If a host in that list has changed state, or you
find a guide pointing somewhere we have not checked, that is worth recording — see
[open questions](/reference/open-questions).
:::

---

**Related:** [what the tweaks leave on your car](/security/) ·
[obtaining firmware](/firmware/obtaining) · [sources](/reference/sources)
