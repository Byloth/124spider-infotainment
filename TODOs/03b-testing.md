# 03b · Testing

Vitest, and the tests worth having on a project whose content is mostly *data*.

Slotted before `03-components.md` on purpose: three of the components carry logic where a silent bug
would be genuinely harmful, and having the runner in place means they get written test-first rather than
retrofitted.

---

## Setup

- [X] `bun add -d vitest@^3`
  - [X] ⚠️ **Version 3, not 4.** `vitest@4` declares `peerDependencies.vite: "^6 || ^7 || ^8"`, but
        VitePress pins `vite ^5.4.14`; installing it would add a second vite to the tree. `vitest@3.2.7`
        accepts `^5.0.0 || ^6 || ^7`, and a dry-run confirmed it adds none.
        `Byloth/tuemplate` uses `^4`, which is right *there* — that project is on vite 8.
- [X] `vitest.config.ts` at the root. VitePress owns `docs/.vitepress/config.mts` and never reads this
      file, so the two cannot collide.
  - [X] `globals: false` — explicit `import { describe, it, expect } from "vitest"` in every file, as in
        `tuemplate/tests/main.test.ts`.
- [X] `tsconfig/test.json` as a third project, referenced from the root `tsconfig.json`, **so the tests
      are type-checked**.
  - [X] It must also `include` `../docs/.vitepress/data/**/*`: without that, importing across projects
        raises `TS6307`. A project reference would be the tidier answer but needs declaration emit, and
        `_base.json` sets `noEmit`.
  - [X] ⚠️ **A deliberate divergence from the reference repo**: `tuemplate` does not include `tests/` in
        any tsconfig project, so its tests are never type-checked. These import the data modules, and
        type drift there should fail the build rather than the test run.
- [X] Scripts `test` (`vitest run`) and `test:watch` (`vitest`).
- [X] `bun run test` added to `.husky/pre-commit`, between typecheck and build.

## What is tested

- [X] **`tests/data-invariants.test.ts`** — properties that must hold whatever the content is:
  - [X] no duplicate ids in any module
  - [X] every `sourceIds` entry across firmware / files / parts / failures resolves through `sourceById()`
  - [X] **every link that is not `alive` carries a warning** — the safety invariant
  - [X] every link records when it was last checked; every hijacked link offers a replacement
  - [X] hashes are well-formed (64-hex SHA256, 32-hex MD5) and sizes positive
  - [X] anything over VirusTotal's analysis cap is marked `too-large` rather than claiming to be clean
  - [X] every alternative firmware route states its confidence
  - [X] the four points of no return are present and ordered; exactly one community target
  - [X] every failure has at least one cause and one fix
  - [X] every price carries its observation date
  - [X] no glossary alias collides with another term
- [X] **`tests/sources.test.ts`** — `sourceById()`: canonical id, unpadded id, alias, unknown, and that
      every registered id resolves to itself.
- [X] **`tests/glossary.test.ts`** — `glossaryFor()`: exact, alias, case-insensitive, whitespace,
      unknown, and that a partial word (`CM`) does **not** match `CMU`.

**37 tests here; 75 in total once task 03 added the version parser, the route derivation and the digest.**

## What is deliberately NOT tested — do not "fix" this later

- [X] **Data values.** A test asserting
      `FIRMWARE.find(f => f.id === "70.00.100A").communityTarget === true` verifies nothing: it restates
      the datum in a second place, so every corrected fact would need correcting twice. This project
      exists *because* the facts change — link rot, new firmware, corrected hashes — and duplicating them
      into tests makes the expensive thing more expensive.
- [X] **Component markup snapshots.** The risk on these pages is content correctness, not DOM shape.
- [X] **Anything VitePress itself does.**

## Division of labour with `tools/verify-data.mjs`

- [X] Keep both. They check different things and barely overlap:
      the **script** checks the modules against files *outside* the module system
      (`downloads/CHECKSUMS.sha256`, the research documents), reading the TypeScript as text so it needs
      no module resolution and cannot be fooled by a module that fails to load; the **tests** check the
      modules against *each other*.

## Written test-first in task 03 — done

- [X] **The version-string parser** (`70.00.100A EU N` → structured). The most testable thing in the
      project: missing suffix, `JP M`, lower case, stray whitespace, malformed input.
- [X] **Route derivation** `(version, id7) → Route`. Safety-critical — pointing someone at the wrong
      route can send them down a path that bricks the unit. Table-driven across all 21 firmware versions
      × ID7 states.
- [X] **`HashVerifier`'s chunked digest** — that hashing in chunks yields the same digest as a one-shot
      for a known input, and that a multi-chunk file works. A bug here would quietly tell someone a good
      file is corrupt.

## Done when

- [X] `bun run test` green, and the invariant suite **provably fails when broken** — verified by
      stripping the warning off a hijacked link and confirming the failure named it.
- [X] `bun run typecheck` covers `tests/` — verified with a deliberate type error, which was caught.
- [X] `bun run lint` clean.
- [X] The husky hook runs lint → typecheck → test → build.
- [X] `bun pm ls` still shows a single `vite@5.4.21`.
