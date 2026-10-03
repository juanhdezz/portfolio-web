#!/usr/bin/env bash
# Runs Lighthouse (mobile + desktop) for / and /en against a running production server.
# Usage: verification/lighthouse.sh http://localhost:3000
set -euo pipefail
BASE="${1:-http://localhost:3000}"
OUT="$(dirname "$0")/lighthouse"
mkdir -p "$OUT"
export CHROME_PATH="${CHROME_PATH:-/usr/bin/google-chrome}"

for path in "/" "/en"; do
  name=$([ "$path" = "/" ] && echo es || echo en)
  for form in mobile desktop; do
    preset=$([ "$form" = desktop ] && echo "--preset=desktop" || echo "")
    npx -y lighthouse@13.5.0 "$BASE$path" $preset --quiet \
      --chrome-flags="--headless=new --no-sandbox" \
      --output=json --output=html --output-path="$OUT/$name-$form" >/dev/null 2>&1
    python3 - "$OUT/$name-$form.report.json" "$name-$form" <<'EOF'
import json, sys
d = json.load(open(sys.argv[1]))
cats = {k: round(v["score"] * 100) for k, v in d["categories"].items()}
a = d["audits"]
print(f"{sys.argv[2]:<12} {cats}  LCP {a['largest-contentful-paint']['displayValue']}  TBT {a['total-blocking-time']['displayValue']}  CLS {a['cumulative-layout-shift']['displayValue']}")
for au in a.values():
    if au.get("score") is not None and au["score"] < 0.9 and au.get("scoreDisplayMode") == "binary":
        print("   failing:", au["id"])
EOF
  done
done
