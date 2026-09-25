---
title: Genuine vs clone
---

<script lang="ts" setup>
import SourceCite from "@theme/components/SourceCite.vue";
</script>

# Genuine vs clone

A genuine Mazda kit costs roughly $190–250, €220 or £175–235. Hubs sold under the same part number cost
$50–110<SourceCite ids="E-34d,E-34f,E-35" />. The question is whether the cheap ones work. This page sets out what owners have actually
reported, who reported it, and how much weight each report can carry. The recommendation at the end is
this site's own reading of that evidence, and says so.

## What the reports say

"Strength" is how far the claim is corroborated: **B** is several independent reports or an official
source, **C** is one report, a seller's claim or an opinion.

| Claim | Who and when | Strength |
| --- | --- | --- |
| The genuine hub is `TK78-66-9U0C` (later D, E), orange label, made in Japan. Earlier revisions and the green-label China-market hub do not work with the CarPlay firmware | ASH8's instructions and Ameridan, 2018<SourceCite ids="E-06,E-10,E-01" /> | B. Consistent across sources; the reason is not known |
| The Mazda kit sold by **dealers** on Amazon and eBay is genuine and works in a 124 | 68wooley, Ameridan, several 124 owners, 2019–2021<SourceCite ids="A-01,B-01,E-34a" /> | B |
| **Clone hubs have stopped the factory SD navigation loading, or the GPS from getting a fix.** Swapping in a genuine `-9U0D` fixed it. One owner found the clone needed the SD card inserted before the unit started | Several owners of Mazda3s and Mazda2s, 2021–2022<SourceCite ids="E-17" /> | B. Several independent reports |
| Some clone cables arrived dead | Owners in the same thread<SourceCite ids="E-17" /> | C |
| One AliExpress listing (about $80–100 in 2020–21) sold what looked like a genuine kit, and it worked first time in several 124s | 124 owners, 2020–2021<SourceCite ids="A-01,A-18,E-35" /> | C. Buyers' impression; nobody opened one up. The same sellers now sell "2024 upgraded" hubs |
| "The market is flooded with clones"; "Made in Japan" stickers are faked | A Mazda forum thread, 2023<SourceCite ids="E-18" /> | C. Opinion, but it matches the listings on sale |
| A UK 124 reseller's hub was not genuine: its faceplate was slightly too big and had to be sanded to fit. It worked otherwise | A customer review, 2022<SourceCite ids="E-11" /> | C |
| Cheap clones "work, at least for now"; a wireless clone's reviews report units dying after a few days | Owners and reviewers, 2022–2025<SourceCite ids="E-17,E-34f" /> | C |
| Newer USB-C and fast-charging hubs work in a 124, as a hub-only swap | A 124 forum thread, 2024<SourceCite ids="E-39" /> | C. Seen only as a search snippet ⚠️ |
| A dealer-fitted genuine kit "works very quickly and smoothly", and the two "probably come from the same factory" | One owner's opinion, 2024<SourceCite ids="E-46" /> | C |

## Why the navigation finding matters for a 124

Keeping the factory navigation is one of the goals of this upgrade: it is what the rebranding tool's
navigation step restores in [step 3](/procedure/rebrand). The one clone fault reported by several owners
independently is exactly that navigation failing, or the GPS never getting a fix. The reports come from
Mazdas, not 124s, but the hub, the head unit and the SD card slot are the same<SourceCite ids="E-17" />.

If you fit a clone and navigation does not work afterwards, check the [blue GPS plug](/procedure/hardware#the-removal-order)
first, then try inserting the SD card before the unit starts. After that, the reports point at the hub.

## The clone variants

Clone hubs are sold under seller codes, not Mazda numbers. The same code can mean different hardware from
different sellers: *"the same version could be totally different from seller to seller"*<SourceCite ids="E-45" />.
Every one of these is a copy of Mazda's hub, most with a wireless box built in behind the phone port.
None is genuine<SourceCite ids="E-44,E-45,E-47,E-48" />.

| Code | CarPlay | Android Auto | Notes |
| --- | --- | --- | --- |
| **P2 / P2.1** | Wired | Wired | A plain copy of the hub. P2.1 has USB-C with fast charging |
| **P3** (sold before 2025) | Wireless by default, wired with a switch | **Wired only** | The manual: *"by default only wireless CarPlay is supported"*<SourceCite ids="E-48" />. One owner found Android Auto disabled until switched to wired<SourceCite ids="E-44" /> |
| **P3** ("2025/2026 new") | Wireless or wired | Wireless (claimed) and wired | **Same name, different hub**<SourceCite ids="E-47" />. Buyer reports are mixed, and touch was reported dead in wireless mode |
| **P3.1** | Wireless only | Wired | USB-C fast charging<SourceCite ids="E-45" /> |
| **P3.2** | Wireless | Wireless | An **Android box** with its own operating system. One owner returned it<SourceCite ids="E-45" /> |
| **P3B** | Wireless and wired | Wireless only | One owner's wireless Android Auto did not work<SourceCite ids="E-45" /> |

⚠️ Every claim in that table comes from sellers or single owners. Because the same code is reused for
different hardware, a "P3" in one listing tells you little about the "P3" in another.

Two more cautions from the same threads. Wireless Android Auto on these boxes usually needs one **wired**
pairing first. And one owner considers the fast-charging variants unsafe for the head unit, because
they reportedly push more than 3 A through the port<SourceCite ids="E-45" /> ⚠️.

## Wireless CarPlay clones and the firmware

Mazda never offered wireless CarPlay for this head unit<SourceCite ids="B-16" />. The wireless hubs do it with a box that runs the
phone session itself, which is why touch and picture quality suffer in wireless mode<SourceCite ids="E-47" />.
Several of them drop Android Auto entirely in wireless mode. One widely sold model says so in its
title: *"Only Supporting Wireless Carplay NO Android Auto"*<SourceCite ids="E-34f" />.

❓ **Which firmware they need is disputed.** Ameridan's reading is that a wireless hub needs firmware
**74.00.200 or later**<SourceCite ids="B-16" />. Sellers and some owners say v70 is
enough<SourceCite ids="E-45,E-48" />. Nobody has settled it on a 124.

If a hub does need 74.x, that is a real cost for a 124. From 74.00.310 there is no USB road back to v70,
and the Fiat rebranding tool needs script edits to run there. Since 2025 the mp3 method has reopened
tweak access on 74.00.324 and 311, where owners have confirmed it. [Points of no return](/firmware/points-of-no-return#pnr-4)
has the details. The v70 route this site describes is built around 70.00.100A.

## What this site recommends

This is our reading of the evidence above, not a tested result:

- **Buy genuine if the budget allows**: from a dealer's parts counter, a dealer-run online shop, or a UK
  dealer web shop. [Part numbers](/hardware/part-numbers#where-to-buy-genuine) lists them.
- **If you buy a copy**, buy from a seller who accepts returns. Expect possible SD-navigation quirks and
  possibly a dead cable, and test everything **before** you refit the trim.
- **Prefer a plain wired copy (P2-type)** over a wireless one if you want Android Auto, or want to stay on
  the v70 route without doubt about the firmware.

---

**Related:** [the retrofit kit](/hardware/) · [part numbers by market](/hardware/part-numbers) ·
[4 · Install the hardware](/procedure/hardware) · [points of no return](/firmware/points-of-no-return)
