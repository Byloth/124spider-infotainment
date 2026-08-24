---
title: Component gallery
---

# Component gallery

<div class="custom-block warning">
  <p class="custom-block-title">Internal page</p>
  <p>
    Not linked from the navigation and not written for readers. It exists so every component can be seen
    rendering while the real pages are still being written — and so the no-JavaScript and dark-mode checks
    have somewhere to run. Whether it ships is a deploy-time decision; see <code>TODOs/99-deferred.md</code>.
  </p>
</div>

<script lang="ts" setup>
import StepChecklist from "@theme/components/StepChecklist.vue";
import DowngradeMatrix from "@theme/components/DowngradeMatrix.vue";
import DownloadSources from "@theme/components/DownloadSources.vue";
import FirmwareMatrix from "@theme/components/FirmwareMatrix.vue";
import FlashTimer from "@theme/components/FlashTimer.vue";
import GlossaryTip from "@theme/components/GlossaryTip.vue";
import HashTable from "@theme/components/HashTable.vue";
import HashVerifier from "@theme/components/HashVerifier.vue";
import LinkStatus from "@theme/components/LinkStatus.vue";
import MarketSelect from "@theme/components/MarketSelect.vue";
import PartFinder from "@theme/components/PartFinder.vue";
import RouteBranch from "@theme/components/RouteBranch.vue";
import RouteWizard from "@theme/components/RouteWizard.vue";
import SourceTable from "@theme/components/SourceTable.vue";
import SymptomTree from "@theme/components/SymptomTree.vue";
import VersionDecoder from "@theme/components/VersionDecoder.vue";

import DowngradeWalls from "@theme/components/diagrams/DowngradeWalls.vue";
import FlashSequence from "@theme/components/diagrams/FlashSequence.vue";
import HubWiring from "@theme/components/diagrams/HubWiring.vue";
import Id7Mechanism from "@theme/components/diagrams/Id7Mechanism.vue";
import NorLayout from "@theme/components/diagrams/NorLayout.vue";
import RouteComparison from "@theme/components/diagrams/RouteComparison.vue";
import TrimOrder from "@theme/components/diagrams/TrimOrder.vue";
import VersionTimeline from "@theme/components/diagrams/VersionTimeline.vue";
</script>

## LinkStatus

A healthy link, a dead one, and the hijacked domain the old guides still point at.

<LinkStatus url="https://21stcenturyfiat124spider.wordpress.com/" />

<LinkStatus url="http://trevelopment.win/xx" />

<LinkStatus url="https://mazdatweaks.com/serial/" />

## GlossaryTip

The <GlossaryTip term="CMU" /> runs <GlossaryTip term="MZD Connect">Mazda's infotainment platform</GlossaryTip>,
and the <GlossaryTip term="failsafe package" /> must be installed before the reinstall package.

## MarketSelect

<MarketSelect />

## VersionDecoder

<VersionDecoder />

## FirmwareMatrix

<FirmwareMatrix />

## PartFinder

<PartFinder />

## DownloadSources

<DownloadSources />

## HashVerifier

<HashVerifier />

## HashTable

<HashTable />

## Checklist

<StepChecklist id="gallery-demo" :items="[
  'Battery charger connected',
  'Every phone un-paired, in the car and on the phone',
  'Navigation SD card removed',
  'File hashes verified',
  'USB stick tested with H2testw'
]" />

## FlashTimer

<FlashTimer />

## RouteBranch

<RouteBranch :routes="['id7-from-usb']">

This block applies to cars still on 56.x, where ID7 can be installed straight from USB.

</RouteBranch>

<RouteBranch :routes="['mp3-only']">

This one applies to 70.00.367 and the 74.x builds, where serial access is gone.

</RouteBranch>

## SymptomTree

<SymptomTree />

## DowngradeMatrix

<DowngradeMatrix />

## RouteWizard

<RouteWizard />

## SourceTable

<SourceTable />

---

# Diagrams

Eight inline SVGs. They live in components rather than in `docs/public/` on purpose: an SVG loaded
through `<img src>` is an isolated document and cannot read the page's `var(--vp-c-*)` tokens, so a file
would need one hand-maintained copy per colour scheme.

Three of them are generated from `firmware.ts`, so adding a firmware version cannot leave the picture
behind. The other five are illustrations of things that are not in the data.

## VersionTimeline

<VersionTimeline />

## DowngradeWalls

<DowngradeWalls />

## RouteComparison

<RouteComparison />

## FlashSequence

<FlashSequence />

## NorLayout

<NorLayout />

## Id7Mechanism

<Id7Mechanism />

## HubWiring

<HubWiring />

## TrimOrder

<TrimOrder />
