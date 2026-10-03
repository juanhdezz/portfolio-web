# DECISIONS.md

Decisiones tomadas sin consultar, con su motivo. Ordenadas por fase.

## Contenido y veracidad

1. **Selección de 4 proyectos** (emergencIAs, asistente bancario por voz, StemAgent, TFM). El resto de repos son prácticas de asignaturas, proyectos de más de 12 meses, scaffolds vacíos (ai-hackathon-manager) o temas típicos (fraud detection). Inventario completo y motivo de cada descarte en `CONTENT.md`.
2. **Repos privados incluidos.** emergencias-platform, unicaja-ai-assistant y voice-ai-bank-assistant son privados (404 para el público). Son los proyectos más ambiciosos y recientes, y están respaldados por repos reales. Se muestran con la etiqueta "Repositorio privado", sin enlace al repo, y con enlace a la demo pública cuando existe y responde (200).
3. **voice-ai-bank-assistant no tiene README**, pero sí spec de diseño, planes, ~130 commits, tests y docs de evaluación. El criterio "sin README" del brief busca descartar repos triviales; este no lo es. Se describe a partir del spec, el código y los commits.
4. **Fusión de los dos asistentes bancarios en un solo proyecto** ("Habla con tu dinero") con dos iteraciones: ambos responden al mismo reto (Cátedra IA Responsable en Finanzas, Unicaja + UGR). Mostrarlos por separado sería redundante.
5. **Sin cifras del asistente de voz**: `docs/memoria/evals.md` contiene dos ejecuciones contradictorias (85 % y 0 %). Solo se cita el tamaño del set de evaluación (50 preguntas, contadas en `cases.yaml`).
6. **Cifras de StemAgent sí se citan** (F1 0,180 → 0,743; precisión 0,108 → 0,788) porque aparecen explícitamente en `report/report.md` y `data/outputs/baseline_results.json`. Se atribuyen al informe del repositorio. La estimación "baseline F1 ~0,35-0,45" del README es una estimación previa y no se usa.
7. **Aportación en el asistente de voz:** el spec indica "All code written by Devin". Se describe como "definición, arquitectura, evaluación y desarrollo apoyado en agentes de código" para ser veraz.
8. **TFM:** el README no menciona LSTM, pero el código (`src/3-train.py`, Keras `LSTM`) y el resumen de la memoria sí. Los hallazgos se resumen desde `05_Conclusiones.tex`, incluido el resultado negativo (el balanceo no mejora de forma generalizable): es honesto y además es el hallazgo real.
9. **Teléfono y edad no se publican** en el HTML (están en el CV): reduce spam y no aporta. En la miniatura del CV se difuminan esas dos líneas. El PDF descargable es el original sin modificar.
10. **El CV está en inglés**; la sección de descarga lo indica en la versión española.
11. **Hero:** la señal del canvas es una metáfora visual (serie sintética), no datos. No lleva ejes ni valores para no sugerir una métrica.
12. **Esquema del TFM:** la curva de glucosa del diagrama es ilustrativa y su `aria-label` lo dice; no representa resultados.
13. **URL canónica:** se usa la URL del CV (`https://portfolio-web-juanhdezzs-projects.vercel.app`). Si el dominio de producción cambia, basta con editar `SITE_URL` en `src/content/site.ts`.
14. "Google Cloud Certified GenAI Leader" del CV se muestra con su nombre oficial "Generative AI Leader".

## Stack

15. **Migración de Astro 4 a Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion.** El brief lo recomienda, Vercel lo despliega sin configuración y permite OG dinámico, sitemap y robots por convención de archivos. Se elimina todo el código Astro, `dist/` y `node_modules/` que estaban versionados.
16. **Versiones fijadas con más de 7 días publicadas:** next 16.3.6 y eslint-config-next 16.3.6 (16.3.8 tenía 3 días), motion 13.4.4 (14.0.0 tenía 1 día), TypeScript 5.9.3 (TS 7 es el port nativo y no está claro su soporte en el plugin de Next), eslint 9.
17. **Sin GSAP, Lenis ni Three.js.** El único efecto que necesita render continuo es una curva 2D: Canvas 2D basta y pesa 0 KB extra. Lenis secuestra el scroll y perjudica accesibilidad; se usa scroll nativo con `scroll-behavior: smooth` solo si no hay `prefers-reduced-motion`.
18. **i18n con dos root layouts** (`app/(es)` en `/` y `app/(en)/en` en `/en`) en vez de middleware: HTML estático por idioma, `lang` correcto en `<html>`, `hreflang` y canónicas. El cambio de idioma recarga la página (aceptable).
19. **404 con `global-not-found`** (flag experimental de Next 16) porque con varios root layouts no hay uno común para componer `not-found`.
20. **Expandir el detalle de proyectos con `<details>` nativo** y `::details-content` + `interpolate-size` para animar la altura: accesible, sin JS; en navegadores sin soporte se abre sin animación.
21. **Scripts de tema y JSON-LD al inicio de `<body>`** en lugar de `<head>` manual (la regla `no-head-element` de Next lo desaconseja). El script inline bloqueante se ejecuta antes de pintar el contenido, así que no hay parpadeo de tema.
22. **Vulnerabilidad `braces` en `npm audit`**: viene de `eslint-config-next` (solo dev, lint local). La "solución" de npm es bajar a eslint-config-next 14 (rompe). Se deja y se documenta.

## Diseño

23. Concepto "lo que viene después" (serie observada + cono de previsión), paleta azul/ámbar, Bricolage Grotesque + Instrument Sans. Justificación y descartes en `DESIGN.md`.
24. Sin cursor personalizado ni fade-up por sección: un único momento orquestado (carga del hero) y motion solo en respuesta a acciones o scroll de la trayectoria.
25. Visuales de proyecto: capturas reales de las demos públicas (generadas con `verification/capture_demos.py`) y diagramas SVG propios para los proyectos sin demo.
