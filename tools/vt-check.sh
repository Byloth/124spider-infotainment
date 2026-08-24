#!/usr/bin/env bash
# VirusTotal checks for this repo's collected binaries.
#
#   VT_API_KEY=<key> ./tools/vt-check.sh            # mode 1: hash lookup (default)
#   VT_API_KEY=<key> ./tools/vt-check.sh urls       # mode 2: submit direct URLs
#   VT_API_KEY=<key> ./tools/vt-check.sh upload     # mode 3: upload files VT has never seen
#
# Free key: https://www.virustotal.com/gui/my-apikey  (4 requests/min — the script paces itself)
#
# ---------------------------------------------------------------------------
# WHY HASH LOOKUP IS THE PRIMARY MODE
#
#   Mode 1 uploads NOTHING. It sends only the SHA256 and asks "have you seen
#   this exact file?". It therefore works at ANY file size — including our
#   ~950 MB firmware images — and never exposes the file to a third party.
#   Its one limitation: if nobody ever submitted that file to VT, the answer is
#   "not-in-VT", which is not a clean bill of health, just an absence of data.
#
#   Mode 2 (URL submission) makes VT fetch and analyse the file itself. It is
#   useful ONLY for URLs that serve the file directly. It does NOT help us for:
#     - the three big firmware images: VirusTotal's analysis size cap (~650 MB)
#       is below their 883-957 MB, so VT cannot process them by ANY method;
#     - MediaFire links: those are landing pages, so VT would scan the HTML,
#       not the ZIP behind it;
#     - the Google Drive zips: token+cookie gated, VT would get the interstitial.
#   It DOES work for the Mazda S3 CDN objects and GitHub release assets.
#
#   Caveat worth keeping in mind: for shell-script payloads (the Ameridan
#   packages are almost entirely .sh) antivirus engines are close to useless.
#   The substantive control there is the manual source review recorded in
#   research/PROCEDURE-DRAFT.md section 4b - not this script.
# ---------------------------------------------------------------------------

set -uo pipefail
: "${VT_API_KEY:?set VT_API_KEY (see header)}"
MODE="${1:-hashes}"
mkdir -p research

vt_get() { curl -s --max-time 40 -H "x-apikey: ${VT_API_KEY}" "$1"; }

parse_stats() {  # $1 = json -> "mal sus und"
  local j="$1"
  echo "$(sed -n 's/.*"malicious": *\([0-9]*\).*/\1/p' <<<"$j" | head -1) \
$(sed -n 's/.*"suspicious": *\([0-9]*\).*/\1/p' <<<"$j" | head -1) \
$(sed -n 's/.*"undetected": *\([0-9]*\).*/\1/p' <<<"$j" | head -1)"
}

verdict_of() { # $1=mal $2=sus
  if [ "${1:-0}" != "0" ] && [ -n "${1:-}" ]; then echo "MALICIOUS"
  elif [ "${2:-0}" != "0" ] && [ -n "${2:-}" ]; then echo "suspicious"
  else echo "clean"; fi
}

if [ "$MODE" = "hashes" ]; then
  OUT=research/VT-RESULTS-hashes.tsv
  printf 'sha256\tfile\tmalicious\tsuspicious\tundetected\tverdict\n' > "$OUT"
  while read -r hash name; do
    [ -z "${hash:-}" ] && continue
    echo "hash: $name"
    resp=$(vt_get "https://www.virustotal.com/api/v3/files/${hash}")
    if grep -q '"NotFoundError"' <<<"$resp"; then
      printf '%s\t%s\t-\t-\t-\tnot-in-VT\n' "$hash" "$name" >> "$OUT"
    else
      read -r mal sus und <<<"$(parse_stats "$resp")"
      printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$hash" "$name" "${mal:-?}" "${sus:-?}" "${und:-?}" "$(verdict_of "$mal" "$sus")" >> "$OUT"
    fi
    sleep 16
  done < downloads/CHECKSUMS.sha256
  echo "-> $OUT"

elif [ "$MODE" = "urls" ]; then
  # Direct-URL sources only (see header for why the rest are excluded).
  OUT=research/VT-RESULTS-urls.tsv
  printf 'url\tmalicious\tsuspicious\tundetected\tverdict\n' > "$OUT"
  CDN=https://s3.amazonaws.com/tsd.mazdausa.com/MAZDA_CONNECT
  URLS="
$CDN/cmu150_NA_70.00.100A_failsafe.up
$CDN/cmu150_NA_59.00.502A_failsafe.up
$CDN/cmu150_NA_59.00.545A_failsafe.up
$CDN/cmu150_NA_70.00.021B_failsafe.up
https://github.com/Trevelopment/cmu-autorun/releases/download/1/XX.zip
https://github.com/mzd-evo/mzd-connect-1-root/archive/refs/heads/main.zip
https://github.com/Trevelopment/MZD-AIO/releases/download/v2.8.6/MZD-AIO-TI_Setup_2.8.6.exe
"
  for u in $URLS; do
    [ -z "$u" ] && continue
    echo "url: $u"
    curl -s --max-time 40 -H "x-apikey: ${VT_API_KEY}" \
         --data-urlencode "url=$u" "https://www.virustotal.com/api/v3/urls" > /dev/null
    sleep 16
    id=$(printf '%s' "$u" | base64 -w0 | tr -d '=' | tr '+/' '-_')
    resp=$(vt_get "https://www.virustotal.com/api/v3/urls/${id}")
    read -r mal sus und <<<"$(parse_stats "$resp")"
    printf '%s\t%s\t%s\t%s\t%s\n' "$u" "${mal:-?}" "${sus:-?}" "${und:-?}" "$(verdict_of "$mal" "$sus")" >> "$OUT"
    sleep 16
  done
  echo "-> $OUT"
fi

# ---------------------------------------------------------------------------
# MODE 3 — upload. Only for files that came back "not-in-VT" in mode 1 and that
# fit VirusTotal's limits: 32 MB via the plain endpoint, ~650 MB via an upload_url.
# NOTE this PUBLISHES the file to a third party. Fine for community freeware;
# a deliberate choice for proprietary firmware.
# ---------------------------------------------------------------------------
if [ "$MODE" = "upload" ]; then
  OUT=research/VT-RESULTS-uploads.tsv
  SIMPLE_MAX=$((32*1024*1024))
  BIG_MAX=$((650*1024*1024))
  printf 'file\tbytes\tmalicious\tsuspicious\tundetected\tverdict\n' > "$OUT"

  awk -F'\t' 'NR>1 && $6=="not-in-VT" {print $2}' research/VT-RESULTS-hashes.tsv | while read -r rel; do
    f="downloads/$rel"
    [ -f "$f" ] || continue
    sz=$(stat -c%s "$f")
    if [ "$sz" -gt "$BIG_MAX" ]; then
      printf '%s\t%s\t-\t-\t-\ttoo-large-for-VT\n' "$rel" "$sz" >> "$OUT"
      echo "skip (too large): $rel"; continue
    fi

    echo "upload: $rel ($sz bytes)"
    if [ "$sz" -le "$SIMPLE_MAX" ]; then
      ep="https://www.virustotal.com/api/v3/files"
    else
      ep=$(vt_get "https://www.virustotal.com/api/v3/files/upload_url" \
           | sed -n 's/.*"data": *"\([^"]*\)".*/\1/p')
      sleep 16
      [ -z "$ep" ] && { echo "  no upload_url"; printf '%s\t%s\t-\t-\t-\tupload-url-failed\n' "$rel" "$sz" >> "$OUT"; continue; }
    fi

    resp=$(curl -s --max-time 900 -H "x-apikey: ${VT_API_KEY}" -F "file=@${f}" "$ep")
    aid=$(sed -n 's/.*"id": *"\([^"]*\)".*/\1/p' <<<"$resp" | head -1)
    if [ -z "$aid" ]; then
      echo "  upload failed"; printf '%s\t%s\t-\t-\t-\tupload-failed\n' "$rel" "$sz" >> "$OUT"; sleep 16; continue
    fi

    # poll the analysis until it completes (queued files can take minutes)
    status=""; mal=""; sus=""; und=""
    for _ in $(seq 1 40); do
      sleep 16
      a=$(vt_get "https://www.virustotal.com/api/v3/analyses/${aid}")
      status=$(sed -n 's/.*"status": *"\([^"]*\)".*/\1/p' <<<"$a" | head -1)
      [ "$status" = "completed" ] && { read -r mal sus und <<<"$(parse_stats "$a")"; break; }
    done

    if [ "$status" != "completed" ]; then
      printf '%s\t%s\t-\t-\t-\tstill-queued\n' "$rel" "$sz" >> "$OUT"
      echo "  still queued after ~10 min"
    else
      printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$rel" "$sz" "${mal:-?}" "${sus:-?}" "${und:-?}" "$(verdict_of "$mal" "$sus")" >> "$OUT"
      echo "  -> $(verdict_of "$mal" "$sus") (mal=${mal:-?} sus=${sus:-?})"
    fi
  done
  echo "-> $OUT"
fi
