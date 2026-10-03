import type { ReactNode } from "react";

export function Section({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-rule py-[clamp(64px,11vw,144px)] ${className}`}>
      <div className="container-x">
        <header className="mb-[clamp(36px,6vw,72px)] grid gap-5 lg:grid-cols-12">
          <h2 id={`${id}-title`} className="section-title lg:col-span-7">
            {title}
          </h2>
          {intro && <p className="max-w-[60ch] text-muted lg:col-span-5 lg:self-end">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
