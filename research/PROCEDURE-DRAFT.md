# PROCEDURE — first reconstruction (DRAFT)

End-to-end procedure to bring a Fiat/Abarth 124 Spider (7" display) from factory firmware to Mazda v70
with working CarPlay / Android Auto, Fiat branding and factory navigation. Consolidated 2026-08-23 from
`research/raw/*`. Source ids → `SOURCES.md`.

> ⚠️ **Nothing here has been tested on a car by this project.** Every step is a synthesis of community
> reports and Mazda's own documents. Items marked ⚠️ rest on a single report; ❓ marks contradictions.
> This is the input for the site's guide, not yet the guide itself.

---

## 0. Decide your route first

Look up your current version (**HOME → SETTINGS → SYSTEM → ABOUT → VERSION INFORMATION**) and read the row
in `FIRMWARE-MATRIX.md`. Four starting points:

| You are on | Route |
|---|---|
| **56.00.521 / 56.00.530** (MY2017, early 2018) | **The easy path.** Install ID7 from USB *first*, then flash, then run the Fiat tweak from USB. |
| **59.00.524 / 562 / 563** (late-2018 → 2020) | USB side-loading is already dead. Either (a) serial console to install ID7 before flashing, or (b) flash first, then use the **mp3 method** to run the Fiat tweak. (b) is the 2025+ community answer. |
| **70.00.335 / 352** | ID7 is gone. Serial-during-flash (ID7v2) or mp3 method (⚠️ one 124 failure on .335). |
| **70.00.367 / 74.x** | Serial is dead. mp3 method (✅ confirmed on 74.00.324; ⚠️ single report on .367), or downgrade to 352 and use serial. |

> 🔴 **Do not follow `mazdatweaks.com` links from the old guides.** 68wooley's Part 1 and many forum
> posts send firmware-59 owners to `mazdatweaks.com/serial/`. As of 2026-08-24 that page serves a
> gambling/scam site, while the site's front page still looks legitimate. `/id7/` is gone (404). The only
> surviving copy of that material is the GitHub mirror `Trevelopment/mazdatweaks`.

**Before anything else:** do **not** let a dealer touch the CMU. Mazda dealers flash the newest firmware
they have (today 74.00.324); Fiat dealers have flashed Mazda firmware onto 124s by mistake. Multiple owners
lost their branding and nav this way. [B-01, A-01]

---

## 1. Prerequisites

**Car**
- 7" display (3" Classica not compatible) [A-01]
- Battery in good health; a charger/tender is Mazda's own requirement (TSB 09-024/16: "charge current
  maintained about 7 A") [F-50]

**Parts** (fit them *after* the firmware — §5)
- Hub `TK78-66-9U0C` (or 9U0D/9U0E) + region cable set (EU: `C830-V6-60Z`) — see INVENTORY §3

**Files** (region-matched — EU car → `EU N` files)
- `cmu150_EU_70.00.100A_failsafe.up` **and** `cmu150_EU_70.00.100A_reinstall.up` — **held**, both
  matching their community MD5s (`cc485f4f…` / `d5c04258…`). The ADR pair is held too. See
  INVENTORY §1 for provenance and the caveat on how independent those MD5 reports really are.
- `MazdaToFiatV70AIO.zip` (held) — Fiat/Abarth branding + nav restore
- One of: `autorun_copy_to_usb.zip` (ID7 v1, only if you are on 56.x) · `ID7_Recovery_XX.zip` (v2, serial
  route) · `mzd-connect-1-root` payload + a USB keyboard (mp3 route) — all held
- Optional: MZD-AIO 2.8.6 for further tweaks
- Mazda's own procedure PDF (held) — print it

**USB stick**
- **FAT32, 4–16 GB, USB 2.0 preferred, one partition, formatted on Windows.** Mac-formatted sticks add
  hidden files and are rejected. Sticks >32 GB default to exFAT and are not seen. A failing stick is the
  single most common cause of a failed flash — and a failed flash can brick the CMU.
- Known-good in reports: SanDisk Ultra, Cruzer Blade 16 GB, Verbatim 8 GB, Transcend 8 GB, Toshiba, cheap
  2–8 GB no-names. Known-bad: assorted no-name 32 GB, "some USB 3.0".
- Download the `.up` files **individually** — a zip of the whole folder has corrupted them. **Verify the
  hash of every file before copying.**

---

## 2. Preparation (before you flash)

1. **Record what you will lose**: radio favourites, sound settings, all personalisation. Any re-flash
   resets them. [F-50]
2. **Un-pair every phone** — in the car *and* on the phone. After the flash the car's Bluetooth identity
   becomes "Mazda" and the old pairings are invalid; you cannot clean them up afterwards. [B-01]
3. **Remove the navigation SD card** and every other USB/AUX device. [D-04]
4. **Uninstall existing tweaks.** Two bricks were attributed to AIO tweaks left in place during a flash;
   ❓ the AIO FAQ says updating with tweaks installed is safe — the failure reports outweigh it. Speedometer
   and the community Android-Auto tweak in particular must go.
5. **Clear DTCs** in the diagnostic screen (Music + Favorites + Mute → 3 → ENTER/CLEAR, 2 → ENTER). [F-49]
6. If your car is on **56.x**: install **ID7 now**, from USB — this is the single most important step, and
   it is impossible later.
   - Copy the *contents* of `autorun_copy_to_usb.zip` to the stick root (not the folder).
   - Turn Bluetooth off on paired phones; unplug USB; remove the SD card.
   - Press START once (no pedal) → ACC. Set audio source to **FM**.
   - Wait 5–10 min → dialog "Tweaks Selection for AUTORUN" → **Install** → confirm → **Reboot now**.
   - Remove the stick when the screen goes black. ⚠️ There is no reliable confirmation that ID7 took —
     several owners discovered it had failed only after the v70 flash. Double-check the files copied.

---

## 3. Flash the firmware (70.00.100A, region-matched)

Follow **Mazda's own 30-step procedure PDF** (held locally); the community steps below are the practical
gloss on it.

1. Stick contains **only the two `.up` files**. Old hub fitted. Nav SD out. Battery charger on if you have
   one; all electrical loads off.
2. Park, engine **off**, press START once → **ACC**. Stay in the car with the key.
3. Diagnostic screen: **Music + Mute + Favorites** held together → keypad → software-update entry.
4. **Install the `_failsafe.up` FIRST**, alone. ~8 min. [D-04]
5. Then the `_reinstall.up`. ~27–40 min.
6. **Press and release the clutch (MT) / brake (AT) right after the failsafe finishes and again roughly
   every 20 minutes** — ACC times out at 25 min and a mid-flash power loss is the classic brick. **Never
   switch the ignition off during the process.** [F-49]
7. When it completes: IG OFF, wait for the black screen, remove the stick. Do not start the engine
   immediately.
8. Verify: ABOUT → VERSION should read `70.00.100 EU N` (or your region). The boot animation is now Mazda,
   the Bluetooth name is "Mazda", and **navigation shows only a compass** — all expected at this stage.

**If it fails** (Mazda's own recovery): IG OFF → wait for black screen → remove stick → pull the **ROOM
fuse for 1 minute** → refit → ACC → the update screen reappears → re-insert the stick. [F-49]

---

## 4. Restore Fiat branding and navigation

Requires tweak access. Pick the route from §0.

**Route A — ID7 is installed (you were on 56.x and did §2.6):** plain USB.
1. Copy the contents of `MazdaToFiatV70AIO.zip` to a clean FAT32 stick root.
2. Nav SD out, phones un-paired, ACC, source = FM, stick in the **upper** USB port.
3. Wait for the dialog and answer the prompts:
   1. branding **Fiat** or **Abarth**
   2. replace boot/shutdown animations (a Mazda logo may still flash briefly on a hard reboot)
   3. replace the word "Mazda" in the UI (de, en_AU/UK/US, es, fr, fr_CN, it, nl)
   4. replace the Mazda icon in CarPlay with the Fiat/Abarth badge
   5. **restore OEM navigation** — takes several minutes; tap the pedal to keep the CMU awake
   6. change the Bluetooth name to "124 Spider"
   7. full backup to USB (optional, up to 30 min — normally decline)
4. Reboot, remove the stick, re-insert the nav SD, re-pair phones, re-apply Gracenote if you care.
5. The installer is safe to re-run to pick up options you skipped.

**Route B — no ID7, firmware 70.00.100 (mp3 method, 2025+):** ✅ confirmed on 124s.
1. Stick = contents of `mzd-connect-1-root` **plus** contents of `MazdaToFiatV70AIO.zip`, both at the root.
2. Nav SD out. Stick in the top slot, **USB keyboard** in the other. ⚠️ It is unclear whether the *old*
   hub's ports drive a keyboard — one owner with the *new* hub found USB1/USB2 greyed out (unresolved).
3. Audio source → USB1: the fake MP3 "plays" → white screen → black popup → Next → **Terminal**.
4. Type: `cd /mnt` · `cd sdb1` (use `ls` to find the right mount) · `./tweaks.sh` → the same prompts as
   Route A. Error spam about missing directories at the start is normal.
5. For MZD-AIO tweaks afterwards: build the stick with *Install Options → Build run.sh* and run `./run.sh`.

**Route C — serial console** (59.x without ID7, or 70.00.335/352): CP2102 USB-TTL adapter on the CMU's
serial pins, ID7/ID7v2 pasted before the first reboot of the flash. This is the pre-2025 method, is
considerably more involved (CMU out of the dash), the canonical write-up (`mazdatweaks.com/serial`) is
**dead**, and one owner destroyed his adapter and his CMU's serial port with a bare wire. Treat as the
fallback, not the recommendation.

**On 70.00.335/352/74.x** the MazdaToFiat script also needs its version gate edited:
- 335/352: build the stick from MZD-AIO 2.8.6, swap in MazdaToFiat's `config/` + `tweaks.sh`, set
  `AIO_VER=2.8.6`, and change `tweaks.sh` line ~161 `if [ $_VER_EXT -le 100 ]` → `-le 360`
- 74.00.324: `tweaks.sh` line 159 `-eq 70` → `74`, line 161 `-le 100` → `-le 324`, line 653 `-ne 70` →
  `-ne 74`; plus MZD-AIO `run.sh` line 184 `-eq 70` → `-eq 74`

---

## 4b. Security implications of the three routes (read before choosing)

**This section is original analysis** — the tweak scripts were read line by line on 2026-08-23. No
community guide documents any of this. Nothing here says the tools are malicious: they do exactly what
they claim. It is about what they *leave behind*.

**How the ID7 install mechanism actually works** (not documented anywhere we found). The package ships
`cmu_dataretrieval.up` — a **genuine Johnson Controls diagnostic data-retrieval package**, dated 2014-11-20
and carrying JCI's own `publisher_cert.pem` and `jci_subord_cert.pem` (2013). Alongside it sits
`dataRetrieval_config.txt`, in which every real diagnostic option (`SCREENSHOT`, `MEMINFO`, `NVRAM_DATA`,
`FLASHINFO`, …) is set to `no`, and one line does the work:

```
CMD_LINE=sh /mnt/sd*/tweaks.sh
```

So ID7 is not an exploit against the firmware: it is **command injection into Mazda's own signed
diagnostic tool**, which the CMU accepts precisely *because* the signature is valid. That explains two
things the guides state without explaining: why it still works on firmware where plain USB autorun was
removed, and why Mazda needed several firmware releases (`neutralizeid7`, `passwdupdate`) to shut it down
rather than simply revoking a key. The identical `cmu_dataretrieval.up` and config ship inside
`MazdaToFiatV70AIO.zip` too (byte-identical — verified). `jci-autoupdate` is a 1-byte marker file.

**What ID7 (v1 and v2) actually installs.** Both versions install a **byte-identical `/etc/passwd`**
containing three UID-0 (root) accounts — `cmu`, `jci` and `user` — whose password hashes are published in
every copy of the package (the `jci` one is a 1970s-era DES hash, trivially reversible). They then start a
**second SSH daemon** with:

- `PermitRootLogin yes`
- `PasswordAuthentication yes`
- **`PermitEmptyPasswords yes`**
- `ListenAddress 0.0.0.0` · `StrictModes no` · `UsePrivilegeSeparation no`

and run a firewall script that opens the ports on **every interface, wlan0 included** — the rule that
would have blocked SSH over WiFi is present but commented out. The script deliberately re-opens the ports
a second time 90 seconds later, because the CMU's own firewall closes them at boot.

ID7 **v2 is broader than v1**: it listens on ports **22, 24000 *and* 36000** (v1 used only 24000).

**Why this matters specifically for an EU car:** the CMU's WiFi is **disabled on NA units but enabled on
EU/JP ones**. On an EU 124, ID7 therefore means a root-login SSH server with publicly-known credentials,
reachable over the car's own wireless interface, permanently — it lives in `data_persist` and survives
firmware updates by design. That is the entire point of the tool, and it is why Mazda spent three firmware
releases trying to remove it.

**The mp3 method installs none of this.** The `mzd-connect-1-root` payload is four fake MP3 files, one
HTML page, one CSS file and a 5 KB JavaScript — **no `/etc/passwd`, no sshd, no iptables, no persistence
at all**. It opens a terminal for one session and leaves nothing behind.

⚠️ **One unexplained artifact:** ID7 v2 ships a 220 KB stripped ARM binary named `adb` in
`44-recovery-recovery/`, installed persistently. Nobody in any source we captured has analysed it. Its
name suggests Android Debug Bridge, its purpose in this package is undocumented. Treat as unknown.

**Practical consequence for route choice.** Where both work, the mp3 method is the *less* invasive option,
not merely the more convenient one — which inverts the usual framing ("ID7 is the easy way, mp3 is the
fallback"). If you do install ID7, know that you are choosing a permanent remote-access backdoor on the
car, and prefer it on a car whose CMU WiFi is off.

---

## 5. Install the hardware (~2.5 h)

Only now. Mazda: *"once the CMU has been attached to the CarPlay/AA-compatible USB hub, the software cannot
be updated."* [E-08]

Tools: 10 mm socket + 200 mm extension, Phillips + flat screwdrivers (taped), trim tools, scissors, ties.

1. Disconnect the battery negative (10 mm).
2. Passenger scuff plate → passenger front side trim (pop clip + seaming strip).
3. Shift knob: MT unscrews. **AT: prefer not to remove it** — the white lock rod is easy to misplace;
   select N and rotate the boot surround instead.
4. Shift panel + console panel + upper panel come out **as one piece** on the 124 (Mazda's sheet splits
   them); two connectors under the commander.
5. Parking-brake boot (2 clips) → passenger A-pillar trim (tweeter attached — lay it on the dash) →
   passenger lower trim (1× 10 mm bolt).
6. Rear console (cup holders out, 2 Phillips) → front console + front console panel **as one unit** (this
   holds the old hub; 3 connectors — the foam-wrapped small black plug is the old USB cable, to be retired).
7. Centre panel No. 2 (hazard switch) → meter hood (move aside) → CMU (1× 10 mm bolt, 5 connectors; the
   black+green plug is the one replaced). **The blue GPS antenna connector is the one everyone forgets to
   re-seat** — symptom: wrong location/clock, greyed-out CP/AA. Watch for the anti-rattle isolator falling
   off the CMU's rear tab.
8. Swap the hub: press the 4 tabs and slide it **forward/out**.
9. Prepare the cables to Mazda's diagram (the measurements suit the 124), foam-wrap the excess and the
   retired connector, route from the top of the dash down, tie to the existing harness, pass the harness
   *under* the CMU before refitting it.
10. Reconnect (grey/blue→brown, grey/green→black), reconnect the battery, ACC, plug a phone into the port
    with the phone icon → CarPlay/AA should start. Then shut down and reassemble.

RHD is identical (the "passenger side" trim is simply on the other side).

**Post-install oddities that are not faults:** USB1/USB2 may need 15–30 min or a full shutdown before they
are recognised; "no device recognized" often clears after locking the car and walking away for a few
minutes (the CMU sleep cycle); flaky CP/AA is usually the cable.

---

## 6. Verification

- ABOUT → VERSION: `70.00.100 <REGION> N`
- Fiat/Abarth boot animation; UI says Fiat/124 Spider, not Mazda
- Navigation shows maps (not the compass) with the SD card in
- Bluetooth device name "124 Spider"
- Phone on the icon-marked port → CarPlay or Android Auto launches
- Known and unfixable: the Mazda logo on the Android Auto **exit** icon; no touchscreen inside Android Auto

---

## 7. Troubleshooting (symptom → cause → fix)

| Symptom | Cause | Fix |
|---|---|---|
| **Black screen, radio still plays, knob/touch dead** (after the failsafe) | Power lost between failsafe and reinstall | The classic brick. Not recoverable from the seat: SPI-NOR programmer (CH341A + SOIC16 clip, **3.3 V**, or RPi + flashrom), write `0x00` at offset `0x010000` → CMU boots failsafe → feed it the reinstall `.up`. Kit < €50. Dealers only replace the CMU (~€1000–1500 new, €190–600 used). |
| "Install Not Successful: System Failure" loop at ~2 % | Reinstall attempted before the failsafe; or corrupt file; or bad stick; or tweaks still installed | ROOM-fuse retry (§3); another/smaller/older stick; verify hashes; remove the nav SD |
| "Failed to validate package certificate" | Antivirus altered the download, partial file, bad stick, or **the new hub fitted before the update** | Re-download with AV off, verify hash, refit the old hub |
| Stuck at 19–21 % | Unreliable stick | Branded FAT32 stick |
| Stick not listed / not recognised | exFAT/NTFS/Mac format, USB 3.0, >16 GB, faulty car USB port — or you are ≥59.00.502 looking for older versions (hidden by design) | Re-format on Windows; try an old 2 GB USB 2.0 |
| Boot loop / stuck on logo **after tweaking** | v56-era tweaks (AIO 1.51, Speedometer) run on v70 | Remove tweaks a few at a time; re-run MazdaToFiatV70AIO; worst case re-flash. Two 124s ended up needing a used CMU. |
| Nav shows only a compass | Expected on Mazda firmware | The NNG restore (§4) |
| Rebranding dialog never appears | ID7 was skipped or silently failed | Serial or mp3 route |
| No sound at all after the hardware install | A speaker connector not fully seated | Re-seat |
| Android Auto has no sound | The "touchscreen while moving" tweak is installed | Remove that tweak |

---

## 8. Rollback

- **You can downgrade by USB** with the same procedure, but only within your band: not below **59.00.502**,
  and not below **74.00.310** if you are on 74.x. Crossing those walls needs an SPI programmer.
- ❓ File order for a downgrade is disputed (failsafe-first vs reinstall-first). Both have worked; one owner
  ended with a mismatched pair (OS 59.00.502 + Fail-Safe 70.00.100A) that ran but is an undefined state.
- **Downgrading does not restore tweak access** after 70.00.335+ — the credentials are gone regardless.
- There is **no way back to Fiat firmware** (none above 59 exists, and Fiat packages do not circulate).
- The **hardware** is fully reversible: refit the original hub and everything works except CP/AA.
- Last resort: any MZD-1 CMU from any Mazda model is plug-and-play (not VIN-locked). The forum's answer for
  permanently locked 2018.5+ cars is to fit a used **v56** CMU and run the easy path on that unit.
