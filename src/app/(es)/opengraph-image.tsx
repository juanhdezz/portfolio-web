import { meta } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = meta.title.es;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("es");
}
