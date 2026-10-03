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
- [x] Hito 4: rendimiento y accesibilidad. Fuente display instanciada y subconjunto (131 KB a 54 KB), nombres accesibles que contienen el texto visible, README con ejecución, verificación y despliegue. Lighthouse 95–100 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.
- [x] Fase 5: verificación completa sobre el build de producción (Node 24):
  - `npm run check`: ESLint, `tsc` y `next build` sin errores ni warnings; las 8 rutas son estáticas.
  - `shots.py`: capturas en móvil (390), tablet (820) y escritorio (1440), tema claro y oscuro, ES y EN, también con `prefers-reduced-motion`: 0 errores de consola, 0 overflow horizontal.
  - `motion_check.py`: 14/14 (intro del hero, deriva y seguimiento del puntero, barras al entrar en pantalla, hilo de scroll, detalle expandible, tema persistente; con reduced motion: estático e inmediato; sin JS: contenido completo).
  - `check_links.py`: todos los anclas, enlaces internos, demos, GitHub y mailto responden; LinkedIn devuelve 999 a navegadores automatizados (anti-bot), la URL coincide con el CV y el perfil está indexado. La descarga del CV desde la navegación es un PDF válido idéntico byte a byte a `cv.pdf`.
  - `truth_check.py`: los 29 números que aparecen en la web están en `CONTENT.md` o en el CV.
  - Lighthouse (ES/EN): rendimiento 94–97 móvil y 100 escritorio; accesibilidad, buenas prácticas y SEO 100. CLS 0, TBT ≤ 40 ms.
  - 404 global (código 404), robots, sitemap con `hreflang`, canónicas, OG por idioma y favicon comprobados.

## Pendiente (fuera del alcance de esta rama)

- Cambiar el Framework Preset del proyecto de Vercel de Astro a Next.js (ver README).
- Probar el preview de la rama `redesign` en Vercel y, si está bien, fusionar en `main` (despliegue automático a producción).
- Desactivar GitHub Pages del repo: sigue configurado sobre `main` y ya no sirve nada (la URL devuelve 404).
