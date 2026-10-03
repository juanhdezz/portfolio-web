"use client";

import { useEffect, useState } from "react";
import { CV_FILENAME, CV_PATH, ui, type Locale } from "@/content/site";
import { IconClose, IconDownload, IconMenu } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const sections = ["about", "projects", "experience", "education", "contact"] as const;

export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const otherHref = locale === "es" ? "/en" : "/";
  const otherLang = locale === "es" ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200 ${
        scrolled || open ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-(--header-h) items-center gap-4">
        <a href="#top" className="item-title mr-auto text-lg tracking-tight">
          JH
          <span className="text-signal" aria-hidden="true">
            .
          </span>
          <span className="sr-only">{locale === "es" ? ", Juan Hernández: volver al inicio" : ", Juan Hernández: back to top"}</span>
        </a>

        <nav aria-label={locale === "es" ? "Secciones" : "Sections"} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  aria-current={active === s ? "location" : undefined}
                  className="link-grow py-1 text-muted hover:text-signal"
                >
                  {ui.nav[s][locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={CV_PATH} download={CV_FILENAME} className="btn btn-primary" aria-label={ui.cvNavLabel[locale]}>
            <IconDownload width={16} height={16} />
            {ui.cvShort[locale]}
          </a>
          <a
            href={otherHref}
            hrefLang={otherLang}
            lang={otherLang}
            title={ui.langSwitchLabel[locale]}
            className="hidden min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-ink sm:inline-flex"
          >
            {otherLang.toUpperCase()}
            <span className="sr-only">, {ui.langSwitch[locale]}</span>
          </a>
          <ThemeToggle label={ui.themeLabel[locale]} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.close[locale] : ui.menu[locale]}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={locale === "es" ? "Secciones" : "Sections"}
        hidden={!open}
        className="border-t border-rule lg:hidden"
      >
        <ul className="container-x flex flex-col py-3">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="item-title flex min-h-12 items-center border-b border-rule text-xl last:border-0"
              >
                {ui.nav[s][locale]}
              </a>
            </li>
          ))}
          <li>
            <a href={otherHref} hrefLang={otherLang} lang={otherLang} className="flex min-h-12 items-center text-muted">
              {ui.langSwitch[locale]}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
