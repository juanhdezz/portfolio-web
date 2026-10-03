# PROGRESS.md

## Hecho

- [x] Fase 1: CV leído y estructurado en `CONTENT.md`; inventario de 35 repos de GitHub, selección de 4 proyectos con evidencia y enlaces comprobados.
- [x] Fase 1: referencias de diseño (Linear, Vercel/Geist, Stripe, Awwwards SOTD 2026) y plan en `DESIGN.md`.
- [x] Fase 2: dirección de arte y stack (Next.js 16 + TS + Tailwind v4 + Motion). Decisiones en `DECISIONS.md`.
- [x] Hito 1: migración de Astro a Next.js, esqueleto con todas las secciones y contenido real en ES y EN, CV en `public/`.
- [x] Hito 2: sistema de diseño (tokens de color, tipografía y espaciado; tema claro/oscuro con persistencia y sin parpadeo; layout responsive).
- [x] Hero con canvas de señal y previsión (interactivo con puntero y táctil, pausa fuera de pantalla, versión estática con `prefers-reduced-motion`).
- [x] Hilo de la trayectoria ligado al scroll (Motion `useScroll`).
- [x] Metadatos: SEO por idioma, `hreflang`, Open Graph con imagen generada, JSON-LD `Person`, favicon SVG, sitemap, robots, 404.

## Pendiente

- [x] Hito 3: motion por sección (revelado de diagramas al entrar en pantalla, scrollspy en la navegación, detalle expandible animado) y verificación automática en `verification/motion_check.py` (14 comprobaciones, incluidas reduced motion y sin JS).
- [ ] Hito 4: rendimiento y accesibilidad (Lighthouse 90+), README.
- [ ] Fase 5: verificación completa (build, lint, typecheck, capturas en 3 viewports, enlaces, descarga del CV, reduced motion, Lighthouse, veracidad).
