import Image from "next/image";
import { about, type Locale } from "@/content/site";
import { Section } from "./Section";

export function About({ locale }: { locale: Locale }) {
  return (
    <Section id="about" title={about.title[locale]}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-1">
          {about.paragraphs.map((p) => (
            <p key={p.es} className="max-w-[62ch]">
              {p[locale]}
            </p>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <figure className="relative w-full max-w-[300px]">
            <Image
              src="/images/perfil.jpeg"
              alt={about.photoAlt[locale]}
              width={855}
              height={1140}
              sizes="(min-width: 768px) 300px, 70vw"
              className="aspect-[4/5] w-full border border-rule object-cover object-top grayscale-[35%]"
            />
            <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-12 w-12 border-b-2 border-l-2 border-signal" />
          </figure>
          <dl className="mt-8 divide-y divide-rule border-y border-rule text-sm">
            {about.facts.map((f) => (
              <div key={f.v.es} className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{f.k[locale]}</dt>
                <dd className="text-right font-medium">{f.v[locale]}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
