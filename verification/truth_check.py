"""Every number shown on the site must appear in CONTENT.md or in the CV text.

Usage: python3 verification/truth_check.py <base_url>
"""
import re
import subprocess
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
sources = (root / "CONTENT.md").read_text()
sources += subprocess.run(["pdftotext", "-layout", str(root / "cv.pdf"), "-"], capture_output=True, text=True).stdout
norm = lambda s: s.replace(",", ".").replace("\u00a0", " ")
haystack = norm(sources)

with sync_playwright() as p:
    b = p.chromium.launch()
    text = ""
    for path in ("/", "/en"):
        pg = b.new_page()
        pg.goto(sys.argv[1].rstrip("/") + path, wait_until="networkidle")
        text += pg.inner_text("body") + "\n"
        # SVG text (diagrams) is not in innerText of body in all engines; add it explicitly
        text += "\n".join(pg.eval_on_selector_all("svg text", "els => els.map(e => e.textContent)")) + "\n"
        pg.close()
    b.close()

numbers = sorted(set(re.findall(r"\d+(?:[.,]\d+)*", text)))
missing = []
for n in numbers:
    candidates = {norm(n), n, n.replace(".", ""), n.replace(",", "")}
    if not any(c in haystack for c in candidates):
        missing.append(n)

print(f"{len(numbers)} distinct numbers on the site")
print("all numbers are backed by CONTENT.md or the CV" if not missing else f"NOT FOUND in sources: {missing}")
sys.exit(1 if missing else 0)
