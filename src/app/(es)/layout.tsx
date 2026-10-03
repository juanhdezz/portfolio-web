import type { ReactNode } from "react";
import { RootDocument } from "@/components/RootDocument";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("es");
export { viewport } from "@/lib/metadata";

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
