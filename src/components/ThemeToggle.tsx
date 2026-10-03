"use client";

import { IconMoon, IconSun } from "./icons";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-transition"), 250);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-signal-soft"
    >
      <IconSun className="hidden dark:block" />
      <IconMoon className="dark:hidden" />
    </button>
  );
}
