# 05 · Pages — Security

**Written first, deliberately.** This section is the only part of the site that exists nowhere else: it
comes from reading the tweak packages line by line on 2026-08-23, and it includes a hazard that is live
right now for anyone following the community guides.

Backing: `research/PROCEDURE-DRAFT.md` §4b · `research/OPEN-QUESTIONS.md` items 5, 5b, 10b, 10c.

**Status: done.** Both pages written, 2026-08-25. They are also the first real pages on the site, so they
set the house style for tasks 06–11 — see "What these two established" at the bottom.

---

## `/security/index.md` — What the tweaks leave on your car

- [X] **Framing paragraph.** Nothing here says the tools are malicious. They do exactly what they claim,
      they are the work of people who solved a real problem, and the whole community depends on them.
      This is about what they *leave behind* — which no published guide documents.

- [X] **How tweak installation actually works.**
  - [X] `59.00.502` removed the USB autorun path. Everything since is about getting back in.
  - [X] **ID7 is not an exploit against the firmware.** The genuine JCI diagnostic package, its 2013
        certificates, and the one line in `dataRetrieval_config.txt` that does the work.
  - [X] Command injection into Mazda's own signed diagnostic tool, accepted *because* the signature is
        valid — stated with why it matters, on both counts.
  - [X] The byte-identical copy inside `MazdaToFiatV70AIO.zip`, with the consequence spelled out: anyone
        who ran the rebranding tool ran this mechanism whether they thought of it that way or not.
  - [X] Diagram: `<Id7Mechanism />`.

- [X] **What ID7 installs, stated plainly.** The three UID-0 accounts and their published hashes; the
      second sshd as a table, because six settings in prose is unreadable; the firewall script on every
      interface with the WiFi rule commented out and the deliberate 90-second re-run; v2's wider port
      set; `data_persist` and why surviving updates is the *point* of the tool.
  - [X] The market difference — WiFi disabled on NA, enabled on EU/JP — in its own callout.

- [X] **What the mp3 method installs: nothing.** Four fake MP3s, a page, a stylesheet, ~5 KB of
      JavaScript. One session, nothing left.

- [X] **The route comparison** as a table plus `<RouteComparison />`.
  - [X] ⚠️ **Changed from the original ask, with the user.** The backlog said to conclude that "mp3 is
        the less invasive option, not merely the more convenient one". It is — but stopping there reads
        as a recommendation, and the evidence does not support one. ID7 has been in use since 2017 on
        thousands of cars; the mp3 method is confirmed on 70.00.100 and 74.00.324/311 and is one forum
        post deep everywhere else, with one 124 owner for whom it did not run at all. The page presents
        **both costs** and explicitly declines to choose: *"Neither of them is the safe one."* What it
        refuses to allow is a reader believing the routes differ only in convenience.

- [X] **The unexplained artifact.** The 220 KB stripped ARM `adb` in `44-recovery-recovery/`. Says it has
      not been analysed; does not speculate past the name.

- [X] **Antivirus results**, honestly framed — and the counts are rendered from `files.ts` rather than
      typed, so the page cannot drift from the data. Plus the point that matters more than the numbers:
      a clean scan of a shell script proves very little, because "opens an SSH server with empty
      passwords permitted" is not malware, it is a configuration choice.

- [X] Cross-links: `/procedure/rebrand`, `/firmware/points-of-no-return`, `/security/link-safety`,
      `/reference/open-questions`.

## `/security/link-safety.md` — Old guides, dead links, one hijacked domain

- [X] **The headline, up top, unmissable.** A `danger` callout as the first thing on the page.
  - [X] The working front page makes it **more** deceptive, not less — with the specific reasoning: a
        reader backs up one level, sees what looks like the real homepage, and concludes they mistyped.
  - [X] The surviving copy is the GitHub mirror, now registered in `links.ts` in its own right.

- [X] **How this surfaced.** The ESET false positive, what the PDF actually contains (nothing), and the
      distinction worth drawing: the scanner was wrong about the file and right that the file was worth
      looking at.

- [X] **The link table**, via the new `<LinkTable />`. Four dead firmware mirrors were added to
      `links.ts` for it — the two MEGA folders, the `bit.ly`/OneDrive share and 1fichier — since the
      research documented them and the table is meant to be the register, not a selection from it.
  - [X] Prose reads the *pattern* rather than the rows, and names why each failure mode is its own trap.

- [X] **What a reader should do**: date the guide, distrust its links, hash what you are about to run,
      prefer the author's own copy.

- [X] Cross-links: `/firmware/obtaining`, `/reference/sources`.

## Scope added while writing

- [X] **`theme/components/SourceCite.vue`** — inline citations resolving through the existing
      `sourceById()`. Named `SourceCite` and not `Cite` because `vue/multi-word-component-names` forbids
      the short name, the same rule that produced `StepChecklist`. An id that resolves to nothing renders
      marked rather than dropped: a silently missing citation is indistinguishable from a claim nobody
      sourced. The separator between adjacent ids is real text, not a CSS pseudo-element, because it has
      to survive being copied out of the page.
- [X] **`theme/components/LinkTable.vue`** — the register rendered whole, worst-first, delegating each
      row to `LinkStatus` rather than re-deriving the badge.
- [X] **A real bug found by reading the built page.** `LinkStatus` refused to link a `hijacked` URL, but
      `mazdatweaks.com/id7/` is merely `dead` — so the site was emitting a live link to a page on a
      domain someone else now controls. A 404 today is not a promise about tomorrow. `links.ts` now
      exports `HOSTILE_HOSTS` / `isHostile()`, the check is on the **host** rather than the URL, and two
      tests cover it — including one asserting no `replacement` may point at a hostile host.
- [X] `tsconfig/test.json` now includes the whole component tree and the DOM libs, since the tests render
      components that legitimately name `HTMLInputElement` and `navigator.clipboard`.

## Done when

- [X] Both pages read as finished prose, not as extracted notes — checked by rendering the built HTML to
      text and reading it end to end, which is also how the three presentation bugs above were caught.
- [X] Every claim carries its source id, or says explicitly that it comes from a file we hold.
- [X] The hijack warning is the first thing on `/security/link-safety`, inside a `danger` callout.
- [X] A reader with JS off sees the full link table: it is server-rendered, verified in the built HTML.
- [X] `bun run lint`, `typecheck`, `test` (105), `docs:build` all clean.

## What these two established for tasks 06–11

- Citations are `<SourceCite ids="…" />`, inline, at the end of the sentence they support.
- Numbers that exist in the data are interpolated from it (`{{ UNSCANNABLE.length }}`), never typed.
- Market-dependent facts are stated for all markets at once, never gated behind a selector.
- Where the sources do not support a recommendation, the page says so instead of implying one.
- The last step before calling a page done is rendering the built HTML to plain text and reading it.
