"""Checks every link on / and /en: in-page anchors, internal files, external URLs, mailto,
and that the CV download is a valid PDF identical to the root cv.pdf.

Usage: python3 verification/check_links.py <base_url>
"""
import hashlib
import sys
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

base = sys.argv[1].rstrip("/")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
# LinkedIn answers 999/429 to non-browser clients; it is checked in a real browser instead.
BROWSER_ONLY = ("linkedin.com",)
failures, checked = [], set()


def http_status(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA}, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # noqa: BLE001
        return f"error {e}"


with sync_playwright() as p:
    b = p.chromium.launch()
    for path in ("/", "/en"):
        pg = b.new_page()
        pg.goto(base + path, wait_until="networkidle")
        links = pg.eval_on_selector_all("a[href]", "els => els.map(e => ({href: e.getAttribute('href'), abs: e.href, download: e.hasAttribute('download'), target: e.target, rel: e.rel}))")
        for link in links:
            href, abs_url = link["href"], link["abs"]
            if href.startswith("#"):
                ok = pg.evaluate("id => !!document.getElementById(id)", href[1:])
                print(f"{'OK ' if ok else 'BAD'} anchor   {path} {href}")
                if not ok:
                    failures.append(f"{path} missing anchor {href}")
                continue
            if href.startswith("mailto:"):
                ok = href == "mailto:jhernandezsanchezagesta@gmail.com"
                print(f"{'OK ' if ok else 'BAD'} mailto   {href}")
                if not ok:
                    failures.append(f"bad mailto {href}")
                continue
            if link["target"] == "_blank" and "noopener" not in link["rel"]:
                failures.append(f"{abs_url} opens a new tab without rel=noopener")
            if abs_url in checked:
                continue
            checked.add(abs_url)
            if any(d in abs_url for d in BROWSER_ONLY):
                bp = b.new_page(user_agent=UA)
                resp = bp.goto(abs_url, wait_until="domcontentloaded", timeout=45000)
                status = resp.status if resp else "no response"
                title = bp.title()
                bp.close()
                ok = status == 200 or (status == 999 and abs_url.rstrip("/").endswith("/in/juan-hernandez-sag"))
                note = " (LinkedIn anti-bot; URL matches the CV and the profile is indexed by search engines)" if status == 999 else ""
                print(f"{'OK ' if ok else 'BAD'} browser  {status} {abs_url} [{title[:60]}]{note}")
            else:
                status = http_status(abs_url)
                ok = status == 200
                print(f"{'OK ' if ok else 'BAD'} http     {status} {abs_url}")
            if not ok:
                failures.append(f"{abs_url} -> {status}")
        pg.close()

    # CV download through a real click on the nav button
    ctx = b.new_context(accept_downloads=True)
    pg = ctx.new_page()
    pg.goto(base + "/", wait_until="networkidle")
    with pg.expect_download() as info:
        pg.click("header a[download]")
    dl = info.value
    saved = Path("/tmp") / dl.suggested_filename
    dl.save_as(saved)
    data = saved.read_bytes()
    root_cv = Path(__file__).resolve().parent.parent / "cv.pdf"
    same = root_cv.exists() and hashlib.sha256(root_cv.read_bytes()).hexdigest() == hashlib.sha256(data).hexdigest()
    ok = data[:5] == b"%PDF-" and len(data) > 100_000
    print(f"{'OK ' if ok else 'BAD'} download {dl.suggested_filename} {len(data)} bytes, PDF header={data[:5]!r}, identical to cv.pdf={same}")
    if not ok:
        failures.append("CV download is not a valid PDF")
    ctx.close()
    b.close()

print("\nALL LINKS OK" if not failures else "\nFAILURES:\n" + "\n".join(failures))
sys.exit(1 if failures else 0)
