"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { experience, experienceSection, type Locale } from "@/content/site";

export function ExperienceTimeline({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const thread = "absolute top-2 bottom-2 left-[5px] w-px md:left-[calc(25%-0.5px)]";

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className={`${thread} bg-rule`} />
      <motion.span aria-hidden="true" className={`${thread} origin-top bg-signal`} style={{ scaleY: reduce ? 1 : fill }} />
      {experience.map((job) => (
        <li key={job.company} className="relative grid pb-16 pl-10 last:pb-0 md:grid-cols-12 md:pl-0">
          <p className="text-sm text-muted tabular-nums md:col-span-3 md:pt-1 md:pr-10 md:text-right md:text-base">
            {job.start[locale]} – {job.end ? job.end[locale] : <span className="font-semibold text-forecast">{experienceSection.now[locale]}</span>}
          </p>
          <span
            aria-hidden="true"
            className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 md:top-2.5 md:left-[calc(25%-5.5px)] ${
              job.end ? "border-signal bg-paper" : "border-forecast bg-forecast"
            }`}
          />
          <div className="mt-2 md:col-span-9 md:mt-0 md:pl-12">
            <h3 className="item-title text-xl md:text-2xl">{job.role[locale]}</h3>
            <p className="mt-1 font-semibold text-signal">{job.company}</p>
            <p className="mt-4 max-w-[64ch] text-muted">{job.summary[locale]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
