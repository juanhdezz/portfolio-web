import type { Locale } from "@/content/site";

const num = (v: number, locale: Locale) => v.toFixed(3).replace(".", locale === "es" ? "," : ".");
const svgText = { fontFamily: "var(--font-sans)" } as const;

const copy = {
  stemLabel: {
    es: "Grafo de StemAgent: Discovery, Design y Validation en bucle hasta superar F1 0,70, después Crystallization. Debajo, F1 en el benchmark: 0,180 el agente genérico frente a 0,743 el especializado.",
    en: "StemAgent graph: Discovery, Design and Validation loop until F1 clears 0.70, then Crystallization. Below, benchmark F1: 0.180 for the generic agent versus 0.743 for the specialised one.",
  },
  benchmark: { es: "F1 en el benchmark de code review", en: "F1 on the code review benchmark" },
  generic: { es: "Agente genérico", en: "Generic agent" },
  specialised: { es: "StemAgent especializado", en: "Specialised StemAgent" },
  threshold: { es: "umbral 0,70", en: "0.70 threshold" },
  retry: { es: "F1 < 0,70: rediseña", en: "F1 < 0.70: redesign" },
  tfmLabel: {
    es: "Esquema ilustrativo del TFM: una serie de glucosa sobre las bandas de hiperglucemia, rango objetivo e hipoglucemia, con el tramo final previsto por el LSTM. Tres datasets: T1DiabetesGranada, REPLACE-BG y DiaTrend.",
    en: "Illustrative thesis diagram: a glucose series over the hyperglycaemia, target range and hypoglycaemia bands, with the final stretch forecast by the LSTM. Three datasets: T1DiabetesGranada, REPLACE-BG and DiaTrend.",
  },
  hyper: { es: "hiperglucemia", en: "hyperglycaemia" },
  range: { es: "en rango", en: "in range" },
  hypo: { es: "hipoglucemia", en: "hypoglycaemia" },
  observed: { es: "CGM observada", en: "observed CGM" },
  predicted: { es: "previsión LSTM", en: "LSTM forecast" },
};

function Node({ x, label, accent = false, w = 128 }: { x: number; label: string; accent?: boolean; w?: number }) {
  return (
    <g>
      <rect x={x} y={40} width={w} height={52} rx={8} fill="var(--surface)" stroke={accent ? "var(--signal)" : "var(--rule-strong)"} strokeWidth={accent ? 2 : 1} />
      <text x={x + w / 2} y={71} textAnchor="middle" fontSize={15} fontWeight={600} fill="var(--ink)" style={svgText}>
        {label}
      </text>
    </g>
  );
}

export function StemDiagram({ locale }: { locale: Locale }) {
  const bar = (v: number) => v * 560;
  return (
    <svg viewBox="0 0 640 380" role="img" aria-label={copy.stemLabel[locale]} className="h-auto w-full">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="var(--muted)" />
        </marker>
      </defs>
      <Node x={4} label="Discovery" w={120} />
      <Node x={156} label="Design" w={110} />
      <Node x={298} label="Validation" w={120} />
      <Node x={482} label="Crystallization" accent w={150} />
      <g stroke="var(--muted)" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)">
        <path d="M126 66h26" />
        <path d="M268 66h26" />
        <path d="M420 66h58" />
        <path d="M358 94c0 46-147 46-147 0" />
      </g>
      <text x={284} y={150} textAnchor="middle" fontSize={13} fill="var(--muted)" style={svgText}>
        {copy.retry[locale]}
      </text>

      <text x={20} y={212} fontSize={13} fill="var(--muted)" style={svgText}>
        {copy.benchmark[locale]}
      </text>
      <text x={20} y={244} fontSize={14} fill="var(--ink)" style={svgText}>
        {copy.generic[locale]}
      </text>
      <rect className="reveal-bar" x={20} y={252} width={bar(0.18)} height={22} rx={3} fill="var(--muted)" opacity={0.45} />
      <text x={28 + bar(0.18)} y={268} fontSize={14} fontWeight={600} fill="var(--ink)" style={{ ...svgText, fontVariantNumeric: "tabular-nums" }}>
        {num(0.18, locale)}
      </text>
      <text x={20} y={304} fontSize={14} fill="var(--ink)" style={svgText}>
        {copy.specialised[locale]}
      </text>
      <rect className="reveal-bar delay" x={20} y={312} width={bar(0.743)} height={22} rx={3} fill="var(--signal)" />
      <text x={28 + bar(0.743)} y={328} fontSize={14} fontWeight={600} fill="var(--ink)" style={{ ...svgText, fontVariantNumeric: "tabular-nums" }}>
        {num(0.743, locale)}
      </text>
      <path d={`M${20 + bar(0.7)} 228V346`} stroke="var(--forecast)" strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={20 + bar(0.7)} y={366} textAnchor="middle" fontSize={12} fill="var(--forecast)" style={svgText}>
        {copy.threshold[locale]}
      </text>
    </svg>
  );
}

function glucosePath(from: number, to: number) {
  const pts: string[] = [];
  for (let x = from; x <= to; x += 4) {
    const t = x / 600;
    const y =
      190 -
      70 * Math.sin(t * 9.5 + 0.6) -
      34 * Math.sin(t * 23 + 1.2) -
      18 * Math.sin(t * 51) +
      (t > 0.55 && t < 0.68 ? 95 * Math.sin(((t - 0.55) / 0.13) * Math.PI) : 0);
    pts.push(`${x.toFixed(0)} ${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}

export function TfmDiagram({ locale }: { locale: Locale }) {
  return (
    <svg viewBox="0 0 640 380" role="img" aria-label={copy.tfmLabel[locale]} className="h-auto w-full">
      <rect x={20} y={20} width={600} height={90} fill="var(--forecast-fill)" opacity={0.5} />
      <rect x={20} y={110} width={600} height={150} fill="var(--signal-soft)" />
      <rect x={20} y={260} width={600} height={60} fill="var(--forecast-fill)" />
      <g fontSize={12} fill="var(--muted)" style={svgText} textAnchor="end">
        <text x={612} y={38}>{copy.hyper[locale]}</text>
        <text x={612} y={128}>{copy.range[locale]}</text>
        <text x={612} y={312}>{copy.hypo[locale]}</text>
      </g>
      <path d="M20 110.5H620M20 260.5H620" stroke="var(--rule-strong)" strokeDasharray="3 4" />
      <path className="reveal-draw" pathLength={1} d={glucosePath(20, 500)} fill="none" stroke="var(--signal)" strokeWidth={2.25} strokeLinejoin="round" />
      <path className="reveal-fade" d={glucosePath(500, 620)} fill="none" stroke="var(--forecast)" strokeWidth={2} strokeDasharray="6 5" />
      <path d="M500.5 20V320" stroke="var(--ink)" strokeOpacity={0.3} />
      <g fontSize={12} style={svgText}>
        <text x={492} y={338} textAnchor="end" fill="var(--signal)">{copy.observed[locale]}</text>
        <text x={508} y={338} fill="var(--forecast)">{copy.predicted[locale]}</text>
      </g>
      <g fontSize={13} fontWeight={600} fill="var(--ink)" style={svgText}>
        {["T1DiabetesGranada", "REPLACE-BG", "DiaTrend"].map((d, i) => (
          <text key={d} x={20 + i * 168} y={368}>
            {d}
          </text>
        ))}
      </g>
    </svg>
  );
}
