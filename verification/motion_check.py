"""Checks that animations run, respond to input, and degrade with prefers-reduced-motion.

Usage: python3 verification/motion_check.py <base_url> <out_dir>
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base = sys.argv[1].rstrip("/")
out = Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
results = []


def check(name, ok, detail=""):
    results.append(f"{'PASS' if ok else 'FAIL'}  {name} {detail}")


def canvas_hash(pg):
    return pg.evaluate("() => { const c = document.querySelector('[data-hero] canvas'); return c.toDataURL().length + ':' + c.toDataURL().slice(-80); }")


def thread_scale(pg):
    return pg.evaluate("() => { const el = document.querySelector('#experience ol > span.origin-top'); return getComputedStyle(el).transform; }")


with sync_playwright() as p:
    b = p.chromium.launch()

    # --- full motion ---
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    pg = ctx.new_page()
    pg.goto(base + "/", wait_until="domcontentloaded")
    pg.wait_for_timeout(250)
    pg.screenshot(path=str(out / "intro-250ms.png"))
    early = pg.evaluate("getComputedStyle(document.querySelector('.hero-line')).transform")
    pg.wait_for_timeout(450)
    pg.screenshot(path=str(out / "intro-700ms.png"))
    pg.wait_for_timeout(1300)
    pg.screenshot(path=str(out / "intro-2000ms.png"))
    late = pg.evaluate("getComputedStyle(document.querySelector('.hero-line')).transform")
    check("hero name rises", early != late and late in ("none", "matrix(1, 0, 0, 1, 0, 0)"), f"{early} -> {late}")

    h1 = canvas_hash(pg)
    pg.wait_for_timeout(700)
    h2 = canvas_hash(pg)
    check("canvas drifts over time", h1 != h2)

    pg.mouse.move(300, 650)
    pg.wait_for_timeout(900)
    pg.screenshot(path=str(out / "pointer-left.png"))
    pg.mouse.move(1200, 650)
    pg.wait_for_timeout(900)
    pg.screenshot(path=str(out / "pointer-right.png"))
    check("canvas follows pointer", canvas_hash(pg) != h2)

    bar_before = pg.evaluate("() => { const r = document.querySelector('.reveal-bar.delay'); return r ? getComputedStyle(r).transform : 'missing'; }")
    pg.evaluate("document.querySelector('[aria-labelledby=p-stem]').scrollIntoView({block: 'center'})")
    pg.wait_for_timeout(1700)
    bar_after = pg.evaluate("getComputedStyle(document.querySelector('.reveal-bar.delay')).transform")
    check("StemAgent bars grow in view", bar_before != bar_after, f"{bar_before} -> {bar_after}")

    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(400)
    # real wheel scrolling, as a user would
    target = pg.evaluate("document.querySelector('#experience ol').getBoundingClientRect().top + scrollY")
    pg.mouse.move(700, 400)
    while pg.evaluate("scrollY") < target - 700:
        pg.mouse.wheel(0, 300)
        pg.wait_for_timeout(50)
    pg.wait_for_timeout(600)
    s1 = thread_scale(pg)
    for _ in range(4):
        pg.mouse.wheel(0, 200)
        pg.wait_for_timeout(80)
    pg.wait_for_timeout(900)
    s2 = thread_scale(pg)
    check("experience thread fills on scroll", s1 != s2, f"{s1} -> {s2}")

    summary = pg.query_selector("[aria-labelledby=p-stem] summary")
    summary.click()
    pg.wait_for_timeout(600)
    opened = pg.evaluate("document.querySelector('[aria-labelledby=p-stem] details').open")
    pg.screenshot(path=str(out / "details-open.png"))
    check("project details expand", opened)

    theme_before = pg.evaluate("document.documentElement.dataset.theme")
    pg.click("button[aria-label*='tema'], button[aria-label*='theme']")
    pg.wait_for_timeout(300)
    theme_after = pg.evaluate("document.documentElement.dataset.theme")
    pg.reload(wait_until="domcontentloaded")
    theme_persist = pg.evaluate("document.documentElement.dataset.theme")
    check("theme toggles and persists", theme_before != theme_after == theme_persist, f"{theme_before} -> {theme_after} (reload: {theme_persist})")
    ctx.close()

    # --- reduced motion ---
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    pg = ctx.new_page()
    pg.goto(base + "/", wait_until="domcontentloaded")
    pg.wait_for_timeout(200)
    pg.screenshot(path=str(out / "reduced-200ms.png"))
    op = pg.evaluate("getComputedStyle(document.querySelector('.hero-copy')).opacity")
    check("reduced: hero copy visible immediately", op == "1", op)
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(500)
    h1 = canvas_hash(pg)
    pg.wait_for_timeout(800)
    h2 = canvas_hash(pg)
    check("reduced: canvas is static", h1 == h2)
    dur = pg.evaluate("getComputedStyle(document.querySelector('.hero-line')).animationDuration")
    check("reduced: hero animation neutralised", dur in ("1e-05s", "0.01ms", "0s"), dur)
    pg.mouse.move(300, 650)
    pg.wait_for_timeout(100)
    check("reduced: canvas still answers pointer", canvas_hash(pg) != h2)
    pg.evaluate("document.getElementById('experience').scrollIntoView()")
    pg.wait_for_timeout(300)
    check("reduced: thread shown full", thread_scale(pg) in ("none", "matrix(1, 0, 0, 1, 0, 0)"), thread_scale(pg))
    pg.evaluate("document.querySelector('[aria-labelledby=p-stem]').scrollIntoView({block: 'center'})")
    pg.wait_for_timeout(200)
    bar = pg.evaluate("getComputedStyle(document.querySelector('.reveal-bar.delay')).transform")
    check("reduced: bars visible without animation", bar == "none", bar)
    ctx.close()

    # --- no JS: content must be complete ---
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, java_script_enabled=False)
    pg = ctx.new_page()
    pg.goto(base + "/", wait_until="domcontentloaded")
    text = pg.inner_text("main")
    check("no-JS: projects and CV link present", "StemAgent" in text and pg.query_selector("a[download]") is not None)
    ctx.close()
    b.close()

print("\n".join(results))
