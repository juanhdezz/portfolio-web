import Image from "next/image";
import { projects, projectsSection, type Locale, type Project } from "@/content/site";
import { IconArrowUpRight, IconLock, IconPlus } from "./icons";
import { StemDiagram, TfmDiagram } from "./ProjectDiagrams";
import { Section } from "./Section";

function Visual({ project, locale }: { project: Project; locale: Locale }) {
  if (project.image) {
    return (
      <div className="overflow-hidden border border-rule bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt[locale]}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 680px, 100vw"
          className="h-auto w-full"
        />
      </div>
    );
  }
  return (
    <div className="border border-rule bg-surface p-[clamp(12px,2.5vw,28px)]">
      {project.id === "stem" ? <StemDiagram locale={locale} /> : <TfmDiagram locale={locale} />}
    </div>
  );
}

function ProjectRow({ project, locale, flip }: { project: Project; locale: Locale; flip: boolean }) {
  const L = projectsSection.labels;
  return (
    <article aria-labelledby={`p-${project.id}`} className="grid gap-8 border-t border-rule py-[clamp(40px,6vw,72px)] lg:grid-cols-12 lg:gap-10">
      <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <p className="text-sm text-muted">{project.context[locale]}</p>
        <h3 id={`p-${project.id}`} className="item-title mt-3 text-2xl md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 text-lg leading-snug">{project.tagline[locale]}</p>

        <dl className="mt-6 space-y-4 text-[0.98rem]">
          <div>
            <dt className="font-semibold">{L.problem[locale]}</dt>
            <dd className="mt-1 text-muted">{project.problem[locale]}</dd>
          </div>
          {project.result && (
            <div className="border-l-2 border-forecast pl-4">
              <dt className="font-semibold">{L.result[locale]}</dt>
              <dd className="mt-1">{project.result[locale]}</dd>
            </div>
          )}
        </dl>

        <ul className="tag-list mt-6" aria-label={L.stack[locale]}>
          {project.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-grow inline-flex min-h-11 items-center gap-1.5 font-semibold">
              {l.label[locale]}
              <IconArrowUpRight width={16} height={16} />
              <span className="sr-only">{locale === "es" ? "(se abre en una pestaña nueva)" : "(opens in a new tab)"}</span>
            </a>
          ))}
          {project.privateNote && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <IconLock width={15} height={15} />
              {project.privateNote[locale]}
            </span>
          )}
        </div>
      </div>

      <div className={`lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
        <Visual project={project} locale={locale} />
        <details className="disclosure mt-4 border-b border-rule">
          <summary className="flex min-h-12 items-center justify-between gap-4 font-semibold">
            <span>
              {L.approach[locale]} {locale === "es" ? "y mi parte" : "and my role"}
            </span>
            <IconPlus className="chev shrink-0" />
          </summary>
          <div className="pb-6">
            <ul className="space-y-3 text-muted">
              {project.approach.map((a) => (
                <li key={a.es} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-signal">
                  {a[locale]}
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <span className="font-semibold">{L.contribution[locale]}: </span>
              {project.contribution[locale]}
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}

export function Projects({ locale }: { locale: Locale }) {
  return (
    <Section id="projects" title={projectsSection.title[locale]} intro={projectsSection.intro[locale]}>
      <div className="border-b border-rule">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} locale={locale} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
