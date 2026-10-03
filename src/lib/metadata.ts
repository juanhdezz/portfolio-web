import type { Metadata, Viewport } from "next";
import { meta, person, SITE_URL, type Locale } from "@/content/site";

export function buildMetadata(locale: Locale): Metadata {
  const path = locale === "es" ? "/" : "/en";
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title[locale],
    description: meta.description[locale],
    authors: [{ name: person.name, url: person.linkedin }],
    creator: person.name,
    alternates: {
      canonical: path,
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: person.name,
      title: meta.title[locale],
      description: meta.description[locale],
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_ES"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title[locale],
      description: meta.description[locale],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1122" },
  ],
  colorScheme: "light dark",
};
