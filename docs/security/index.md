---
title: What the tweaks leave on your car
---

<script lang="ts" setup>
import Id7Mechanism from "@theme/components/diagrams/Id7Mechanism.vue";
import RouteComparison from "@theme/components/diagrams/RouteComparison.vue";
import SourceCite from "@theme/components/SourceCite.vue";

import { ARTIFACTS, UNSCANNABLE } from "../.vitepress/data/files";

const scannedClean = ARTIFACTS.filter((a) => a.scan === "clean").length;
</script>

# What the tweaks leave on your car

Nothing on this page says the tweak tools are malicious. They are not. They do exactly what they claim to
do, they are the work of people who solved a real problem and gave the solution away, and every single
route described anywhere on this site depends on them. Without `MazdaToFiatV70AIO` there would be no way
to put a Fiat badge back on a car running Mazda firmware, and this project would have nothing to write
about.

This page is about something narrower: **what each route leaves behind on the car once it has done its
job.** That question is not answered by any published guide we found, and the answer turns out to differ
enormously between routes that the guides treat as interchangeable.

It comes from reading the packages line by line — the files themselves, not what anyone says about them.
Where a claim rests on someone else's report it carries a citation; where it comes from a file we hold, it
says so.

## Why there is anything to get past

On early firmware the car would run a script from a USB stick without being asked twice. Firmware
**59.00.502** closed that door<SourceCite ids="C2-10,B-05" />, and every technique since has been about
getting back in. That is the whole story of ID7, of the serial console, and of the 2025 mp3 method: three
different answers to the same question, invented years apart, with very different consequences.

## How ID7 actually works

This is the part no guide explains, and it is worth understanding before you decide whether to install it.

ID7 is **not an exploit against Mazda's firmware**. Open the package<SourceCite ids="C2-25,B-05" /> and
what you find is `cmu_dataretrieval.up` — a genuine Johnson Controls diagnostic data-retrieval package,
dated 2014-11-20, carrying JCI's own `publisher_cert.pem` and `jci_subord_cert.pem` from 2013. It is real,
it is signed, and its signature is valid.

Beside it sits `dataRetrieval_config.txt`. Every actual diagnostic option in that file — `SCREENSHOT`,
`MEMINFO`, `NVRAM_DATA`, `FLASHINFO` — is set to `no`. One line does all the work:

```ini
CMD_LINE=sh /mnt/sd*/tweaks.sh
```

So ID7 is **command injection into Mazda's own signed diagnostic tool**, which the unit accepts precisely
*because* the signature checks out. It is doing what it was built to do.

<Id7Mechanism />

That single fact explains two things the guides state without explaining. It explains why ID7 kept working
long after plain USB side-loading was removed — the signature was never the thing that broke. And it
explains why Mazda needed three firmware releases and two purpose-built scripts (`neutralizeid7`,
`passwdupdate`) to shut it down<SourceCite ids="B-06,F-53" />, rather than simply revoking a
certificate.

::: tip The same file travels further than you might expect
The identical `cmu_dataretrieval.up` and its config ship inside `MazdaToFiatV70AIO.zip`
too<SourceCite ids="C1-13" /> — byte-identical, verified against the standalone package. If you have run
the Fiat rebranding tool, you have run this mechanism, whether or not you thought of it as installing ID7.
:::

## What ID7 installs

Both v1 and v2 install a **byte-identical `/etc/passwd`** containing three accounts with UID 0 — that is,
three root accounts: `cmu`, `jci` and `user`. Their password hashes ship inside every copy of the package
that has ever been distributed, so they are not secrets in any meaningful sense. The `jci` hash is
traditional DES, a 1970s format that is trivially reversible on a modern machine.

They then start a **second SSH daemon** — separate from anything Mazda ships — configured like this:

| Setting | Value |
| --- | --- |
| `PermitRootLogin` | `yes` |
| `PasswordAuthentication` | `yes` |
| `PermitEmptyPasswords` | **`yes`** |
| `ListenAddress` | `0.0.0.0` |
| `StrictModes` | `no` |
| `UsePrivilegeSeparation` | `no` |

And they run a firewall script that opens the ports on **every network interface, `wlan0` included**. The
rule that would have excluded the wireless interface is present in the script but commented out. The
script deliberately runs a second time about ninety seconds after boot, because the unit's own firewall
closes those ports when it starts — so the opening is not accidental, it is maintained.

**ID7 v2 is broader than v1**: it listens on ports 22, 24000 *and* 36000, where v1 used only
24000<SourceCite ids="C2-22,B-06" />.

None of this is removed when you are finished. It lives in `data_persist` and survives firmware updates
**by design** — that is the entire point of the tool, and it is exactly why Mazda spent three releases
trying to remove it. A tool whose purpose is "preserve your ability to tweak future firmware" cannot work
any other way.

::: warning Whether this is reachable depends on your market
The unit's WiFi is **disabled on North American cars and enabled on European and Japanese
ones**<SourceCite ids="B-05,C2-10" />. On a car where it is enabled, everything described above is a root
login with published credentials, reachable over the car's own wireless interface, permanently.

That is a statement of fact, not a recommendation. Plenty of owners have run ID7 for years without
incident, and an attacker still has to be within wireless range of your car. But it is your decision to
make, and you cannot make it if nobody tells you.
:::

## What the mp3 method installs

Nothing.

The `mzd-connect-1-root` payload<SourceCite ids="C2-23,D-25" /> is four fake MP3 files, one HTML page,
one CSS file and about five kilobytes of JavaScript. There is no `/etc/passwd`, no SSH daemon, no firewall
script, no persistence of any kind. It opens a terminal for the length of one session, you run what you
came to run, and when the unit restarts there is nothing left of it.

## Choosing between them

Read the two columns below together. Neither of them is the safe one.

| | ID7 | The mp3 method |
| --- | --- | --- |
| In use since | 2017–2019<SourceCite ids="B-05,B-06" /> | 2024–2025<SourceCite ids="B-04,F-56" /> |
| Confirmed working on | every version where it can be installed at all | 70.00.100 and 74.00.324 / 74.00.311<SourceCite ids="A-13,B-04" /> |
| Thin evidence | — | ⚠️ single reports on 59.00.563<SourceCite ids="F-11" /> and 70.00.367 |
| Known failure | — | ⚠️ one 124 owner could not get it to run on 70.00.335 |
| Needs | a USB stick, or a serial adapter and the dashboard apart | a USB stick and a USB keyboard |
| Leaves behind | three root accounts, a second SSH daemon, an opened firewall — permanently | nothing |

<RouteComparison />

The trade is real in both directions. ID7 has years of use behind it on thousands of cars and it works
where it works; what it costs you is a permanent remote-access service you did not ask for. The mp3 method
costs you nothing afterwards, but it is new, and outside 70.00.100 and the 74.x builds the evidence for it
is one forum post deep — including one owner for whom it simply did not run<SourceCite ids="B-04" />.

This site does not choose for you. What it will not do is let you make that choice believing the two
routes differ only in convenience, which is how every guide we found frames it.

## One thing we could not explain

ID7 v2 ships a 220 KB stripped ARM executable named `adb`, in `44-recovery-recovery/`, and installs it
persistently<SourceCite ids="C2-22" />.

We have not analysed it, and no source we captured mentions it at all. Its name suggests the Android Debug
Bridge; what it is doing in this package, and whether it is that, we do not know. It is recorded here
because "we did not look into this" is a more useful thing to publish than silence — see
[open questions](/reference/open-questions).

## What the antivirus pass actually proves

Every file this project holds was checked against VirusTotal. **{{ scannedClean }} came back clean** across
57 to 68 engines: every tweak package, both ID7 packages, the mp3 payload and every failsafe image.

There is one detection, and it is a false positive — the story is on
[old guides and dead links](/security/link-safety), because chasing it down is what uncovered something
that is not a false positive at all.

::: danger What a clean scan does not mean
**{{ UNSCANNABLE.length }} of the firmware images cannot be scanned by anyone, ever.** They run from
883 MB to 2.3 GB, and VirusTotal's analysis cap is around 650 MB — by hash, by upload and by URL alike.
For those files the only evidence available is that their hashes match the ones the community published,
which tells you the file was not modified in transit. It does not tell you anything about what is inside.

And a clean scan of a shell script means very little regardless. Antivirus engines are not looking for
"opens an SSH server with empty passwords permitted" — that is not malware, it is a configuration choice,
and it is why the whole of this page exists. Reading the scripts is the control that actually matters
here, and it is why we did.
:::

See [obtaining firmware](/firmware/obtaining) for what the hashes do and do not establish.

---

**Related:** [the routes in practice](/procedure/rebrand) ·
[points of no return](/firmware/points-of-no-return) ·
[old guides and dead links](/security/link-safety) ·
[open questions](/reference/open-questions)
