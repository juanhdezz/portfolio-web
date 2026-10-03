# DESIGN.md — dirección de arte

## Referencias estudiadas y qué se adopta

| Referencia | Qué hace bien | Qué adopto | Qué descarto |
|---|---|---|---|
| **Linear** (linear.app) | Página guiada por tipografía: un titular enorme, paleta casi monocroma, un único acento reservado a estados; jerarquía con bordes de 1px y saltos de superficie en vez de sombras; transiciones de hover de ~150 ms; la UI real del producto convence en lugar del marketing. | Escala de superficies + hairlines en vez de sombras; un acento con significado (la señal), no decorativo; hovers cortos; **evidencia real** (diagramas de la arquitectura de cada proyecto y capturas de las demos) en lugar de adjetivos. | El negro casi puro con un solo acento lavanda: es exactamente el default "near-black + 1 acento" que quiero evitar. |
| **Vercel / Geist** | La retícula visible como parte de la estética (guías decorativas `aria-hidden`); estilos de texto Label/Copy/Heading con tamaños y tracking definidos; cifras tabulares para números. | Una retícula de fondo muy tenue que funciona como papel milimetrado del gráfico del hero; tokens tipográficos con nombre; `tabular-nums` para fechas. | Geist como tipografía (demasiado asociada a Vercel). |
| **Stripe** | Su blog técnico insiste en elegir la herramienta más ligera (CSS antes que bitmap, Canvas/WebGL solo cuando hay trabajo real de GPU) y en medir rendimiento y accesibilidad. El degradado WebGL de su home se anima en GPU con ruido. | Hero en **Canvas 2D** (no WebGL ni Three.js): una sola curva y una banda de predicción no justifican una GPU pipeline ni 150 KB de librería. Pausar el render fuera de pantalla y con la pestaña oculta. | El degradado de malla: es decoración sin relación con mi perfil. |
| **Awwwards SOTD 2026** (Dylan Brouwer, Michael Gatt, Minh Pham, Trionn) | Un único momento orquestado de carga, transiciones de página cuidadas, microinteracciones; el jurado puntúa también semántica, SEO, accesibilidad y WPO. | Un solo momento de motion orquestado (la carga del hero) y microinteracciones que responden a acciones; HTML semántico y Lighthouse 90+ como requisito, no como extra. | Scroll secuestrado y transiciones largas: perjudican accesibilidad y rendimiento en un portfolio que se lee, no se "experimenta". |
| **Bricolage Grotesque** (Atelier Triay) | Variable con ejes `opsz` 12–96, `wdth` 75–100 y `wght` 200–800; los anchos comprimidos tienen tono "Grotesque Nº9", con ink traps exagerados. | Display del sitio. El eje de anchura se usa como recurso activo: nombre comprimido y muy grande en el hero. | — |

## Idea central: "lo que viene después"

Mi trabajo, en el CV y en los repos, es predecir y decidir: modelado predictivo sobre datos ferroviarios, un TFM que predice glucosa con LSTM, agentes que razonan antes de actuar. El concepto visual es **una serie temporal con su previsión**:

- **Hero:** una curva de serie temporal en Canvas recorre la pantalla. A la izquierda de la línea "ahora" el trazo es sólido (observado); a la derecha se abre un **cono de incertidumbre** (previsto) en el color de previsión. El puntero (o el dedo, o el foco en móvil) mueve el "ahora": el visitante decide hasta dónde se ha observado y el modelo prolonga la señal. Es una metáfora, no datos: no lleva cifras ni ejes con valores.
- **El hilo:** la misma señal se convierte en un trazo vertical fino a la izquierda que avanza con el scroll y hace de columna vertebral de la **trayectoria profesional** (que sí es una secuencia: aquí sí hay hitos ordenados).
- **Evidencia:** cada proyecto lleva un diagrama propio con su arquitectura real (el grafo de StemAgent, el pipeline de voz, las bandas glucémicas del TFM, la sala de mando) y capturas reales de las demos que funcionan.

## Tokens

### Color

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#EEF1F5` papel frío | `#0A1122` tinta azul | Fondo |
| `--surface` | `#F8F9FB` | `#111A31` | Paneles, un escalón |
| `--ink` | `#0C1424` | `#E6EAF2` | Texto principal |
| `--muted` | `#4F5B70` | `#9AA6BC` | Texto secundario (≥ 4.5:1 en ambos temas) |
| `--rule` | `#D3D9E3` | `#1F2A44` | Hairlines, retícula |
| `--signal` | `#2741D6` cobalto | `#8EA0FF` | La serie observada, enlaces, foco |
| `--forecast` | `#9A5B00` ámbar oscuro | `#FFB547` ámbar | Previsión, "actualidad", logros |

Azul + ámbar es la convención de gráfico de serie observada frente a predicción; por eso es la paleta, no por moda. El oscuro es un azul tinta, no un negro neutro tintado.

### Tipografía

- **Display:** Bricolage Grotesque (variable: `opsz`, `wdth`, `wght`). Nombre del hero a `wdth` 75, peso 700, cuerpo fluido `clamp(3.5rem, 13vw, 12rem)`, interlineado 0.86, tracking −0.02em. Titulares de sección a `wdth` 85, 600.
- **Texto:** Instrument Sans (400/500/600), 17–18px, interlineado 1.6, línea ≤ 68ch. `font-variant-numeric: tabular-nums` en fechas.
- Escala (ratio ~1.25): 0.8125 / 0.9375 / 1.0625 / 1.3125 / 1.625 / 2.25 / 3.25 / hero fluido.
- Sin monoespaciada para etiquetas, sin mayúsculas sostenidas, sin eyebrows sobre cada título.

### Espaciado y forma

- Base 4px; escala 4·8·12·16·24·32·48·64·96·144.
- Radio: 0 en la retícula y los bloques de sección; 999px solo en botones-píldora (descarga de CV, idioma, tema). La jerarquía la dan los hairlines, no las tarjetas.
- Contenedor `min(1240px, 100% − 2·gutter)`; gutter `clamp(20px, 4vw, 48px)`.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ JH        Proyectos  Trayectoria  Formación  Contacto  [CV↓] ES/EN ◐ │
│                                                              │
│ Juan                                                         │
│ Hernández                       (nombre comprimido, enorme)  │
│ Sánchez-Agesta                                               │
│ ────────────── señal observada ──────│ ░░░ cono previsto ░░░ │
│ Data Scientist y AI Engineer en Granada.                     │
│ Propuesta de valor (CV)                  [Descargar CV] [Ver proyectos] │
├──────────────────────────────────────────────────────────────┤
│ Sobre mí      │ texto ≤ 68ch     │ hechos: 2 grados + máster │
├──────────────────────────────────────────────────────────────┤
│ Proyectos     │ diagrama propio  │ problema / enfoque / stack│
│ (fila ancha por proyecto, alternando lado del diagrama)      │
├──────────────────────────────────────────────────────────────┤
│ ┃ Trayectoria  — el hilo vertical con 3 hitos                │
├──────────────────────────────────────────────────────────────┤
│ Formación · Certificaciones · Logros (3 columnas → 1)        │
│ Stack (grupos del CV, sin niveles)                           │
│ CV (bloque grande con descarga) · Contacto · Footer          │
└──────────────────────────────────────────────────────────────┘
```

Alineación a la izquierda en todo el sitio; asimetría 4/8 columnas en escritorio, una columna en móvil.

## Motion y microinteracciones

1. **Un único momento orquestado:** al cargar, el nombre aparece por máscara línea a línea, la curva se dibuja de izquierda a derecha hasta el "ahora" y el cono de previsión se abre (≈1.4 s en total).
2. **Interacción del hero:** el puntero mueve el "ahora" con amortiguación; en táctil, arrastre; con teclado, el canvas no es interactivo (es decorativo, `aria-hidden`) y el contenido no depende de él.
3. **Hilo de scroll:** el trazo vertical de la trayectoria se rellena con el progreso (Motion `useScroll`), y cada hito se ilumina al cruzarlo.
4. **Acciones del usuario:** expandir el detalle de un proyecto (altura animada), cambiar tema (transición de color de 200 ms), subrayado de enlaces que crece desde la izquierda, botón de CV con flecha que baja al hover.
5. **Nada** de fade-up en cada sección, ni cursor personalizado, ni smooth-scroll secuestrado.
6. `prefers-reduced-motion: reduce`: la curva se pinta estática con el "ahora" fijo, sin dibujado ni seguimiento; el nombre aparece sin máscara; el hilo se muestra lleno; las transiciones de color quedan, las de movimiento no.

## Revisión del plan frente a los defaults

- *Primera idea:* fondo casi negro + acento verde ácido + terminal estilizado de "agente". → **Descartado**: es el default nº 2 y el terminal es el cliché del perfil IA. Cambiado por tinta azul + par azul/ámbar justificado por la convención observado/previsto.
- *Primera idea:* serif display de alto contraste para el nombre. → **Descartado** (default nº 1). Cambiado por grotesca comprimida variable.
- *Primera idea:* proyectos en rejilla de tarjetas iguales con sombra. → **Descartado** (default nº 4). Filas anchas con diagrama propio por proyecto, separadas por hairlines.
- *Primera idea:* "01 / 02 / 03" en proyectos. → **Descartado**: los proyectos no son una secuencia. La numeración solo existe implícita en la trayectoria (fechas).
- *Primera idea:* etiquetas en monoespaciada y meta separada por "·". → **Descartado** (default nº 5). Stack como lista con comas en Instrument Sans.
- *Lo memorable* es una sola cosa: la señal con su previsión. Todo lo demás es silencioso.
