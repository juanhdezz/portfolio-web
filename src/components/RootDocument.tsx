import type { ReactNode } from "react";
import { bricolage, instrument } from "@/lib/fonts";
import { person, SITE_URL, type Locale } from "@/content/site";
import "@/app/globals.css";

const themeScript = `(function(){document.documentElement.dataset.js='';try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Data Scientist",
  url: SITE_URL,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Granada", addressCountry: "ES" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Granada" },
  worksFor: { "@type": "Organization", name: "WhiteBox" },
  sameAs: [person.linkedin, person.github],
};

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${bricolage.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
