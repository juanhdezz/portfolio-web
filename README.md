# Juan Hernández Sánchez-Agesta — portfolio

Portfolio personal de Juan Hernández Sánchez-Agesta, Data Scientist y AI Engineer en Granada. Español en `/` e inglés en `/en`.

La idea visual es una serie temporal con su previsión: en el hero, una curva "observada" llega hasta un "ahora" que mueve el puntero y, a partir de ahí, se abre un cono de previsión. Detalles en [`DESIGN.md`](DESIGN.md).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, todo prerenderizado como estático) y TypeScript
- Tailwind CSS v4 con tokens de diseño en variables CSS (tema claro y oscuro)
- [Motion](https://motion.dev) para el hilo de la trayectoria ligado al scroll; Canvas 2D para el hero
- Bricolage Grotesque (auto-hospedada, subconjunto) e Instrument Sans (`next/font`)
- Open Graph generado con `next/og`, sitemap, robots, JSON-LD y 404 global

## Requisitos

Node.js 20.9 o superior (recomendado 22 o 24) y npm.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
```

Calidad:

```bash
npm run lint         # ESLint (eslint-config-next, core-web-vitals + TypeScript)
npm run typecheck    # tsc --noEmit
npm run build        # build de producción
npm run check        # las tres cosas
```

## Contenido

Todo el texto vive en [`src/content/site.ts`](src/content/site.ts), con ES y EN en el mismo objeto. La fuente de verdad es [`CONTENT.md`](CONTENT.md), extraído del CV y de los repositorios de GitHub: si un dato no está ahí, no va en la web.

- CV descargable: `public/cv-juan-hernandez-sanchez-agesta.pdf` (copia exacta del `cv.pdf` de la raíz). Para actualizarlo, sustituye ese archivo y regenera la miniatura `public/images/cv-preview.jpg`.
- Capturas de las demos: `python3 verification/capture_demos.py` (requiere Playwright para Python).
- Dominio: la URL canónica, el sitemap y Open Graph usan `SITE_URL` en `src/content/site.ts`. Cámbiala si despliegas en otro dominio.

## Verificación

Con un servidor arrancado (`npm run build && npm run start`):

```bash
python3 verification/shots.py http://localhost:3000 verification/screenshots/run --sections   # 3 viewports, 2 temas, errores de consola, overflow
python3 verification/motion_check.py http://localhost:3000 verification/screenshots/motion     # animaciones, reduced motion y sin JS
python3 verification/check_links.py http://localhost:3000                                     # enlaces y descarga del CV
verification/lighthouse.sh http://localhost:3000                                              # Lighthouse móvil y escritorio, ES y EN
```

Los scripts de Python usan `playwright` (`pip install playwright && playwright install chromium`).

## Despliegue en Vercel

El proyecto de Vercel ya existe (el mismo que servía la versión en Astro) y está conectado a GitHub:

- Push a `main`: despliegue de producción.
- Push a cualquier otra rama (por ejemplo `redesign`): despliegue de preview con su propia URL.

Como el proyecto venía de Astro, antes del primer despliegue de esta versión revisa en Vercel, **Settings → Build and Deployment**:

1. **Framework Preset:** `Next.js` (si sigue en `Astro`, Vercel buscará la carpeta `dist` y el build fallará).
2. **Build Command**, **Output Directory** e **Install Command:** sin override (valores por defecto).
3. **Node.js Version:** 22.x o 24.x.

No hacen falta variables de entorno. Si el dominio de producción no es `https://portfolio-web-juanhdezzs-projects.vercel.app`, actualiza `SITE_URL` en `src/content/site.ts`.

## Estructura

```text
src/
  app/
    (es)/            layout + página en español (/) y su imagen OG
    (en)/en/         layout + página en inglés (/en) y su imagen OG
    global-not-found.tsx, sitemap.ts, robots.ts, icon.svg, globals.css
  components/        secciones (Hero, Projects, Experience...), SignalCanvas, Header
  content/site.ts    todo el contenido ES/EN
  lib/               fuentes, metadatos, generador de OG
  assets/            fuentes para OG y la display auto-hospedada
public/              CV, foto, capturas de proyectos
verification/        scripts de comprobación
```

Documentación del rediseño: [`CONTENT.md`](CONTENT.md), [`DESIGN.md`](DESIGN.md), [`DECISIONS.md`](DECISIONS.md), [`PROGRESS.md`](PROGRESS.md).
