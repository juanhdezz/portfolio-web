"""Full-page and per-section screenshots across viewports and themes, plus console errors.

Usage: python3 verification/shots.py <base_url> <out_dir> [--reduced] [--sections]
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base = sys.argv[1].rstrip("/")
out = Path(sys.argv[2])
reduced = "--reduced" in sys.argv
per_section = "--sections" in sys.argv
out.mkdir(parents=True, exist_ok=True)

VIEWPORTS = {"mobile": (390, 844), "tablet": (820, 1180), "desktop": (1440, 900)}
SECTIONS = ["top", "about", "projects", "experience", "education", "stack", "cv", "contact"]
errors = []

with sync_playwright() as p:
    b = p.chromium.launch()
    for path, lang in (("/", "es"), ("/en", "en")):
        for vp, (w, h) in VIEWPORTS.items():
            for theme in ("light", "dark"):
                if lang == "en" and theme == "dark" and vp != "desktop":
                    continue
                ctx = b.new_context(
                    viewport={"width": w, "height": h},
                    color_scheme=theme,
                    reduced_motion="reduce" if reduced else "no-preference",
                    device_scale_factor=1,
                )
                pg = ctx.new_page()
                pg.on("console", lambda m, k=f"{lang}-{vp}-{theme}": m.type in ("error", "warning") and errors.append(f"[{k}] {m.type}: {m.text}"))
                pg.on("pageerror", lambda e, k=f"{lang}-{vp}-{theme}": errors.append(f"[{k}] pageerror: {e}"))
                pg.goto(base + path, wait_until="networkidle")
                pg.wait_for_timeout(1800)
                overflow = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                if overflow > 0:
                    errors.append(f"[{lang}-{vp}-{theme}] horizontal overflow {overflow}px")
                tag = f"{lang}-{vp}-{theme}"
                pg.screenshot(path=str(out / f"{tag}-fold.png"))
                # scroll through so scroll-linked elements settle, then full page
                pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                pg.wait_for_timeout(600)
                pg.evaluate("window.scrollTo(0, 0)")
                pg.wait_for_timeout(300)
                pg.screenshot(path=str(out / f"{tag}-full.png"), full_page=True)
                if per_section:
                    for s in SECTIONS:
                        el = pg.query_selector(f"#{s}")
                        if el:
                            el.scroll_into_view_if_needed()
                            pg.wait_for_timeout(500)
                            el.screenshot(path=str(out / f"{tag}-section-{s}.png"))
                ctx.close()
    b.close()

print("\n".join(errors) if errors else "no console errors, no horizontal overflow")
