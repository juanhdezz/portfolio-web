"use client";

import { useEffect, useRef } from "react";

// Decorative time series: solid "observed" line up to a movable "now",
// a widening forecast cone after it and, faintly, what actually happened.
// It is a visual metaphor, not data: no axes, no values.

const SPAN = 12;
const DRIFT = 0.07;
const INTRO_MS = 1300;

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const noise = (x: number) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
};
const trend = (t: number) => 0.5 * Math.sin(t * 0.55) + 0.28 * Math.sin(t * 1.37 + 1.1);
const signal = (t: number) =>
  trend(t) + 0.15 * Math.sin(t * 3.1 + 0.4) + 0.24 * (noise(t * 2.2) - 0.5) + 0.09 * (noise(t * 7.5) - 0.5);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 4);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Palette = Record<"signal" | "forecast" | "forecastFill" | "rule" | "ink" | "muted" | "paper" | "font", string>;

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string) => cs.getPropertyValue(n).trim();
  return {
    signal: v("--signal"),
    forecast: v("--forecast"),
    forecastFill: v("--forecast-fill"),
    rule: v("--rule"),
    ink: v("--ink"),
    muted: v("--muted"),
    paper: v("--paper"),
    font: getComputedStyle(document.body).fontFamily,
  };
}

export function SignalCanvas({ observed, forecast }: { observed: string; forecast: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = (canvas.closest("[data-hero]") as HTMLElement | null) ?? canvas;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readPalette();
    let W = 0;
    let H = 0;
    let dpr = 1;
    let offset = 3.2;
    let nowX = -1;
    let targetX = -1;
    let start = performance.now();
    let last = start;
    let raf = 0;
    let visible = true;
    let pointerInside = false;

    const defaultNow = () => W * (W < 640 ? 0.58 : 0.64);
    const tAt = (x: number) => (x / W) * SPAN + offset;
    const yAt = (v: number) => H * 0.52 - v * H * 0.34;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!pointerInside || targetX < 0) targetX = defaultNow();
      if (nowX < 0 || reduce.matches) nowX = targetX;
      draw(performance.now());
    };

    const draw = (time: number) => {
      if (!W || !H) return;
      const elapsed = reduce.matches ? Infinity : time - start;
      const p = easeOut(clamp(elapsed / INTRO_MS, 0, 1));
      const cone = easeOut(clamp((elapsed - INTRO_MS * 0.7) / 600, 0, 1));
      const tNow = tAt(nowX);
      const vNow = signal(tNow);
      const drawTo = nowX * p;

      ctx.clearRect(0, 0, W, H);

      // graph-paper grid that travels with the data
      const step = W < 640 ? 48 : 72;
      const pxPerT = W / SPAN;
      const shift = ((offset * pxPerT) % step + step) % step;
      ctx.strokeStyle = palette.rule;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -shift; x < W; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, H);
      }
      for (const fy of [0.18, 0.52, 0.86]) {
        ctx.moveTo(0, Math.round(H * fy) + 0.5);
        ctx.lineTo(W, Math.round(H * fy) + 0.5);
      }
      ctx.stroke();

      // forecast cone
      if (cone > 0) {
        const upper: [number, number][] = [];
        const lower: [number, number][] = [];
        const mean: [number, number][] = [];
        const resid = vNow - trend(tNow);
        for (let x = nowX; x <= W + 4; x += 4) {
          const dt = tAt(x) - tNow;
          const m = trend(tAt(x)) + resid * Math.exp(-dt / 0.9);
          const hw = (0.04 + 0.42 * Math.sqrt(dt / 3)) * cone;
          mean.push([x, yAt(m)]);
          upper.push([x, yAt(m + hw)]);
          lower.push([x, yAt(m - hw)]);
        }
        ctx.fillStyle = palette.forecastFill;
        ctx.beginPath();
        upper.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        for (let i = lower.length - 1; i >= 0; i--) ctx.lineTo(lower[i][0], lower[i][1]);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 0.55 * cone;
        ctx.strokeStyle = palette.forecast;
        ctx.lineWidth = 1;
        for (const edge of [upper, lower]) {
          ctx.beginPath();
          edge.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.stroke();
        }

        // what actually happened, faintly
        ctx.globalAlpha = 0.5 * cone;
        ctx.strokeStyle = palette.muted;
        ctx.beginPath();
        for (let x = nowX; x <= W + 3; x += 3) {
          const y = yAt(signal(tAt(x)));
          if (x === nowX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.globalAlpha = cone;
        ctx.setLineDash([6, 5]);
        ctx.lineWidth = 1.75;
        ctx.strokeStyle = palette.forecast;
        ctx.beginPath();
        mean.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // observed series
      ctx.strokeStyle = palette.signal;
      ctx.lineWidth = 2.25;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= drawTo; x += 3) {
        const y = yAt(signal(tAt(x)));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(drawTo, yAt(signal(tAt(drawTo))));
      ctx.stroke();

      // sample marks on the observed part
      ctx.fillStyle = palette.signal;
      ctx.globalAlpha = 0.45;
      const sampleStep = 24;
      const sShift = ((offset * pxPerT) % sampleStep + sampleStep) % sampleStep;
      for (let x = sampleStep - sShift; x < drawTo - 6; x += sampleStep) {
        ctx.beginPath();
        ctx.arc(x, yAt(signal(tAt(x))), 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (p >= 1) {
        // the "now" marker
        ctx.strokeStyle = palette.ink;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.round(nowX) + 0.5, H * 0.08);
        ctx.lineTo(Math.round(nowX) + 0.5, H * 0.96);
        ctx.stroke();
        ctx.globalAlpha = 1;

        const yNow = yAt(vNow);
        ctx.fillStyle = palette.paper;
        ctx.strokeStyle = palette.signal;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nowX, yNow, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = `500 13px ${palette.font}`;
        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillStyle = palette.signal;
        ctx.fillText(observed, nowX - 10, H * 0.08);
        ctx.textAlign = "left";
        ctx.globalAlpha = cone;
        ctx.fillStyle = palette.forecast;
        ctx.fillText(forecast, nowX + 10, H * 0.08);
        ctx.globalAlpha = 1;
      }
    };

    const frame = (time: number) => {
      const dt = Math.min(64, time - last) / 1000;
      last = time;
      offset += DRIFT * dt;
      nowX += (targetX - nowX) * (1 - Math.exp(-dt * 7));
      draw(time);
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };

    const play = () => {
      if (reduce.matches || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const setTarget = (clientX: number) => {
      const r = canvas.getBoundingClientRect();
      targetX = clamp(clientX - r.left, W * 0.16, W * 0.88);
      if (reduce.matches) {
        nowX = targetX;
        draw(performance.now());
      }
    };

    const onMove = (e: PointerEvent) => {
      pointerInside = true;
      setTarget(e.clientX);
    };
    const onLeave = () => {
      pointerInside = false;
      targetX = defaultNow();
      if (reduce.matches) {
        nowX = targetX;
        draw(performance.now());
      }
    };
    const onTheme = () => {
      palette = readPalette();
      draw(performance.now());
    };
    const onVisibility = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : play());
    const onReduce = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      start = performance.now() - (reduce.matches ? INTRO_MS * 2 : 0);
      nowX = targetX;
      draw(performance.now());
      play();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    io.observe(canvas);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.fonts?.ready.then(onTheme);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onReduce);

    resize();
    play();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduce);
    };
  }, [observed, forecast]);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full touch-pan-y" />;
}
