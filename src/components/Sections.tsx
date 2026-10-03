import Image from "next/image";
import {
  achievements,
  certifications,
  contactSection,
  CV_FILENAME,
  CV_PATH,
  cvSection,
  education,
  educationSection,
  experienceSection,
  footer,
  person,
  projectTools,
  skills,
  skillsSection,
  type Locale,
} from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { ExperienceTimeline } from "./Experience";
import { IconArrowUpRight, IconDownload, IconGithub, IconLinkedin, IconPin } from "./icons";
import { Section } from "./Section";

const str = (v: string | { es: string; en: string }, locale: Locale) => (typeof v === "string" ? v : v[locale]);

export function Experience({ locale }: { locale: Locale }) {
  return (
    <Section id="experience" title={experienceSection.title[locale]}>
      <ExperienceTimeline locale={locale} />
    </Section>
  );
}

export function Education({ locale }: { locale: Locale }) {
  const S = educationSection;
  return (
    <Section id="education" title={S.title[locale]}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 className="item-title text-lg text-muted">{S.achievements[locale]}</h3>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {achievements.map((a) => (
              <li key={a.title} className="grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                <h4 className="item-title text-2xl">{a.title}</h4>
                <p className="self-start rounded-full border border-forecast px-3 py-1 text-sm font-semibold text-forecast sm:row-span-1 sm:justify-self-end">
                  {a.badge[locale]}
                </p>
                <p className="text-sm text-muted sm:col-span-2">{a.meta[locale]}</p>
                <p className="max-w-[60ch] sm:col-span-2">{a.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12 lg:col-span-4 lg:col-start-9">
          <div>
            <h3 className="item-title text-lg text-muted">{S.education[locale]}</h3>
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {education.map((e) => (
                <li key={e.title.es} className="py-4">
                  <p className="font-semibold">{e.title[locale]}</p>
                  {e.detail && <p className="text-sm text-muted">{e.detail[locale]}</p>}
                  <p className="mt-1 text-sm text-muted tabular-nums">
                    {e.org}, {e.years}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="item-title text-lg text-muted">{S.certifications[locale]}</h3>
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {certifications.map((c) => (
                <li key={c.name} className="flex flex-col py-3">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-muted">{str(c.org, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Skills({ locale }: { locale: Locale }) {
  return (
    <Section id="stack" title={skillsSection.title[locale]} intro={skillsSection.intro[locale]}>
      <dl className="divide-y divide-rule border-y border-rule">
        {skills.map((g) => (
          <div key={g.group.es} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
            <dt className="item-title text-lg md:col-span-4">{g.group[locale]}</dt>
            <dd className="text-lg md:col-span-8">{g.items.join(", ")}</dd>
          </div>
        ))}
        <div className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
          <dt className="item-title text-lg text-muted md:col-span-4">{skillsSection.projectsLabel[locale]}</dt>
          <dd className="text-lg text-muted md:col-span-8">{projectTools.join(", ")}</dd>
        </div>
      </dl>
    </Section>
  );
}

export function CvDownload({ locale }: { locale: Locale }) {
  return (
    <section id="cv" aria-labelledby="cv-title" className="border-t border-rule bg-surface py-[clamp(64px,10vw,128px)]">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 id="cv-title" className="section-title">
            {cvSection.title[locale]}
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-muted">{cvSection.text[locale]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={CV_PATH} download={CV_FILENAME} className="btn btn-primary min-h-14 px-7 text-base">
              <IconDownload />
              {cvSection.button[locale]}
            </a>
            <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="link-grow inline-flex min-h-11 items-center gap-1.5 font-semibold">
              {cvSection.open[locale]}
              <IconArrowUpRight width={16} height={16} />
            </a>
          </div>
        </div>
        <a
          href={CV_PATH}
          download={CV_FILENAME}
          tabIndex={-1}
          aria-hidden="true"
          className="group relative mx-auto block w-[calc(100%-16px)] max-w-[280px] md:col-span-4 md:col-start-9"
        >
          <span className="absolute inset-0 translate-x-3 translate-y-3 border border-rule-strong bg-paper transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
          <Image
            src="/images/cv-preview.jpg"
            alt=""
            width={720}
            height={1018}
            sizes="300px"
            className="relative h-auto w-full border border-rule-strong shadow-[0_1px_0_var(--rule)] transition-transform duration-300 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </section>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  const rows = [
    { label: "LinkedIn", value: "in/juan-hernandez-sag", href: person.linkedin, icon: <IconLinkedin /> },
    { label: "GitHub", value: "juanhdezz", href: person.github, icon: <IconGithub /> },
  ];
  return (
    <Section id="contact" title={contactSection.title[locale]} intro={contactSection.text[locale]}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <a
            href={`mailto:${person.email}`}
            className="item-title link-grow block break-all text-[clamp(1.35rem,4.2vw,3rem)] leading-tight sm:break-normal"
          >
            {person.email}
          </a>
          <div className="mt-5">
            <CopyEmail email={person.email} label={contactSection.copy[locale]} done={contactSection.copied[locale]} />
          </div>
        </div>
        <ul className="divide-y divide-rule border-y border-rule lg:col-span-4">
          {rows.map((r) => (
            <li key={r.label}>
              <a href={r.href} target="_blank" rel="noopener noreferrer me" className="group flex min-h-16 items-center gap-4 py-3">
                <span className="text-muted transition-colors group-hover:text-signal">{r.icon}</span>
                <span className="flex flex-col">
                  <span className="font-semibold">{r.label}</span>
                  <span className="text-sm text-muted">{r.value}</span>
                </span>
                <IconArrowUpRight className="ml-auto text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
              </a>
            </li>
          ))}
          <li className="flex min-h-16 items-center gap-4 py-3 text-muted">
            <IconPin />
            {person.location[locale]}
          </li>
        </ul>
      </div>
    </Section>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-rule py-10">
      <div className="container-x flex flex-col gap-6 text-sm text-muted md:flex-row md:items-end md:justify-between">
        <div>
          <p className="item-title text-lg text-ink">{person.name}</p>
          <p className="mt-2 max-w-[60ch]">{footer.built[locale]}</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="tabular-nums">© 2026</span>
          <a href="#top" className="link-grow inline-flex min-h-11 items-center">
            {footer.top[locale]}
          </a>
        </div>
      </div>
    </footer>
  );
}
