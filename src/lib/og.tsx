import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, person, type Locale } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/assets");

const yAt = (x: number) => {
  const t = x / 90 + 3.2;
  return 110 - 48 * Math.sin(t * 0.55) - 26 * Math.sin(t * 1.37 + 1.1) - 12 * Math.sin(t * 3.1 + 0.4);
};

function signalPath() {
  const pts: string[] = [];
  for (let x = 0; x <= 760; x += 8) pts.push(`${x} ${yAt(x).toFixed(1)}`);
  return `M${pts.join("L")}`;
}

export async function renderOg(locale: Locale) {
  const [display, text] = await Promise.all([
    readFile(join(fontDir, "bricolage-grotesque-latin-700-normal.woff")),
    readFile(join(fontDir, "instrument-sans-latin-400-normal.woff")),
  ]);
  const e = Math.round(yAt(760));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a1122", color: "#e6eaf2", padding: "64px 72px", fontFamily: "Instrument" }}>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>{`${person.nameLines[0]} ${person.nameLines[1]}`}</span>
          <span>{person.nameLines[2]}</span>
        </div>
        <svg width="1056" height="200" viewBox="0 0 1056 200" style={{ display: "flex" }}>
          <path d={signalPath()} fill="none" stroke="#8ea0ff" strokeWidth="5" strokeLinejoin="round" />
          <path d={`M760 ${e - 4} C860 ${e - 20} 940 ${e - 80} 1056 ${e - 90} L1056 ${e + 40} C940 ${e + 30} 860 ${e + 16} 760 ${e + 4} Z`} fill="rgba(255,181,71,0.18)" />
          <path d={`M760 ${e} C860 ${e - 4} 940 ${e - 30} 1056 ${e - 25}`} fill="none" stroke="#ffb547" strokeWidth="4" strokeDasharray="12 10" />
          <circle cx="760" cy={e} r="9" fill="#0a1122" stroke="#8ea0ff" strokeWidth="4" />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <span>{hero.role[locale]}</span>
          <span style={{ color: "#9aa6bc", fontSize: 26 }}>github.com/juanhdezz</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 700, style: "normal" },
        { name: "Instrument", data: text, weight: 400, style: "normal" },
      ],
    },
  );
}
