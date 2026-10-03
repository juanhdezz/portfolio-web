import { ui, type Locale } from "@/content/site";
import { About } from "./About";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Contact, CvDownload, Education, Experience, Footer, Skills } from "./Sections";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-on-signal focus:translate-y-0"
      >
        {ui.skip[locale]}
      </a>
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <About locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Education locale={locale} />
        <Skills locale={locale} />
        <CvDownload locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
