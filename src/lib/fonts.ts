import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";

// Bricolage Grotesque (OFL), instanced to opsz 96, wdth 75–100, wght 600–700 and
// subset to Latin + Spanish punctuation: 54 KB instead of 131 KB for the full variable font.
export const bricolage = localFont({
  src: "../assets/BricolageGrotesque-display-subset.woff2",
  weight: "600 700",
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
