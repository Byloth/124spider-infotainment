# 04 · Diagrams

Original SVGs only. No third-party images are republished — the archive holds Mazda TSB pages, workshop
manual scans and forum photos, all under someone else's copyright.

**Requirements for every diagram:**

- [ ] Hand-authored SVG, committed as a file under `docs/public/diagrams/` (or inlined in a component
      where it needs to react to the profile).
- [ ] Uses `currentColor` and `var(--vp-c-*)` tokens for strokes, fills and text — so it flips with dark
      mode for free and needs no second asset.
- [ ] Readable at 375 px wide; text stays real `<text>` (selectable, translatable, searchable), never
      outlined paths.
- [ ] `role="img"` with a `<title>` and `<desc>`, plus a prose description in the page for anyone who
      cannot see it. These diagrams carry safety information; they cannot be the only channel.

---

## The set

- [ ] **Version timeline with the points of no return** — `/guide/risks`, `/firmware/points-of-no-return`.
  Horizontal timeline 55.x → 74.00.331. Marks the four thresholds (59.00.502, 70.00.335, 70.00.367,
  74.00.310), what each closes, and where 70.00.100A sits as the community target. Must visually separate
  "confirmed" from the 2025 mp3-method nuance rather than presenting one flat truth.
  Source: `research/FIRMWARE-MATRIX.md` §1 and §4.

- [ ] **Two-file flash sequence** — `/procedure/flash`.
  `failsafe.up` → reboot into the failsafe updater → `reinstall.up` → complete. Annotate where power loss
  bricks the unit and where the 20-minute pedal press falls. Shows why the order is not interchangeable.
  Source: `research/raw/F-rollback-failures.md` §2 (SPI-NOR/boot-select mechanism).

- [ ] **Downgrade walls** — `/recovery/downgrade`.
  Two bands (`≥59.00.502` and `≥74.00.310`) with USB arrows inside each band and the SPI-NOR-only
  crossings between them. Makes "you cannot go back" concrete.
  Source: `research/FIRMWARE-MATRIX.md` §3.

- [ ] **SPI-NOR layout and boot-select** — `/recovery/brick`.
  The 8 MB flash map (bootstrap · boot-select `0x010000` · ibc1 · ibc2 · config · failsafe), showing which
  byte is rewritten to force the failsafe boot and why that revives a black-screen unit.
  Source: `research/raw/F-rollback-failures.md` §2.

- [ ] **ID7 mechanism** — `/security/`.
  The project's original finding, drawn: a genuine JCI-signed diagnostic package whose
  `dataRetrieval_config.txt` carries `CMD_LINE=sh /mnt/sd*/tweaks.sh`, so the CMU executes an arbitrary
  script *because* the signature is valid. Then what is left behind: three UID-0 accounts, a second sshd,
  the firewall opened on all interfaces.
  Source: `research/PROCEDURE-DRAFT.md` §4b.

- [ ] **Route comparison** — `/security/`, `/procedure/index`.
  The three tweak routes (ID7 · serial · mp3) side by side against what each requires and what each leaves
  installed permanently. This is the diagram that shows mp3 is the least invasive, which inverts the usual
  framing.

- [ ] **Hub and cable schematic** — `/hardware/`.
  Old hub (USB1 + USB2 + SD + AUX, one cable to the CMU) vs new hub (phone-marked USB3 port, two cables).
  Explains why the retrofit needs the harness and why Android Auto is gated by hub detection too.
  Source: `research/raw/E-hardware-retrofit-kit.md` §2.1.

- [ ] **Trim removal order** — `/procedure/hardware`.
  Numbered exploded view of the 124's centre console sequence. Marks the GPS connector everyone forgets
  to re-seat.
  ⚠️ Draw from the written step list, **not** by tracing the workshop-manual scans.
  Source: `research/PROCEDURE-DRAFT.md` §5.

## Done when

- [ ] Every diagram renders correctly in light and dark without a second asset.
- [ ] Each has a text equivalent in its page.
- [ ] Total weight is sane (these are line drawings; if one exceeds ~30 KB it has been over-detailed).
