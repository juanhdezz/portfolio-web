import { CV_FILENAME, CV_PATH, hero, person, type Locale } from "@/content/site";
import { IconArrowDown, IconDownload } from "./icons";
import { SignalCanvas } from "./SignalCanvas";

export function Hero({ locale }: { locale: Locale }) {
  const [first, ...rest] = person.nameLines;
  const lines = [`${first} ${rest[0]}`, rest[1]];

  return (
    <section id="top" data-hero className="relative flex min-h-svh flex-col pt-(--header-h)">
      <div className="container-x pt-[clamp(16px,4vh,48px)]">
        <h1 className="display-name hero-name" aria-label={person.name}>
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <span className="hero-line block" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className="relative my-[clamp(12px,3vh,32px)] h-[clamp(160px,25vh,280px)] w-full">
        <SignalCanvas observed={hero.legendObserved[locale]} forecast={hero.legendForecast[locale]} />
      </div>

      <div className="container-x hero-copy grid gap-6 pb-12 md:grid-cols-12 md:gap-8">
        <p className="item-title text-xl md:col-span-5 md:text-2xl">{hero.role[locale]}</p>
        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <p className="max-w-[56ch] text-lg leading-relaxed text-ink">{hero.pitch[locale]}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <span className="inline-block size-2 shrink-0 rounded-full bg-forecast" aria-hidden="true" />
            {hero.now[locale]}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              {hero.ctaProjects[locale]}
              <IconArrowDown width={16} height={16} />
            </a>
            <a href={CV_PATH} download={CV_FILENAME} className="btn btn-ghost">
              <IconDownload width={16} height={16} />
              {hero.ctaCv[locale]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
