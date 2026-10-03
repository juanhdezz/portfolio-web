"""Captures real screenshots of the public project demos used as project visuals.

Run from the repo root: python3 verification/capture_demos.py
"""
from PIL import Image
from playwright.sync_api import sync_playwright

OUT = "public/images/projects"

with sync_playwright() as p:
    b = p.chromium.launch()

    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("https://emergencias-platform.vercel.app", wait_until="networkidle", timeout=90000)
    pg.wait_for_timeout(9000)
    pg.screenshot(path=f"{OUT}/emergencias.jpg", type="jpeg", quality=88)

    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("https://unicaja-ai-assistant.vercel.app", wait_until="networkidle", timeout=90000)
    pg.fill("textarea, input[type=text]", "¿En qué categorías he gastado más este mes? Muéstramelo en un gráfico")
    pg.keyboard.press("Enter")
    pg.wait_for_selector("text=Ranking", timeout=120000)
    pg.wait_for_timeout(3000)
    pg.screenshot(path="/tmp/unicaja_full.png")
    Image.open("/tmp/unicaja_full.png").crop((470, 0, 1250, 600)).convert("RGB").save(f"{OUT}/unicaja.jpg", quality=88)

    b.close()
    print("ok")
