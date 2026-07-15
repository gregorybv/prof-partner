"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { REGIONS } from "@/lib/site-content";
import { formatNumber } from "@/lib/utils";

export function RegionsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionShell
      background={{
        src: "/prof-p/background_map.jpg",
        overlay: "light",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Работаем со всеми регионами"
            subtitle="Количество согласованных нами гарантий за 2025 год"
          />
        </Reveal>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {REGIONS.map((region, index) => (
            <Reveal key={region.city} delay={index * 0.05}>
              <article className="rounded-2xl border border-(--border-subtle) bg-(--surface-0) p-6 text-center shadow-(--shadow-xs)">
                <h3 className="font-semibold text-(--text-primary)">{region.city}</h3>
                <p className="mt-3 text-xs text-(--text-muted)">Выдано более</p>
                <p className="font-display text-3xl text-(--brand-600)">
                  {inView ? (
                    <CountUp end={region.count} duration={2} delay={index * 0.1} separator=" " formattingFn={formatNumber} />
                  ) : (
                    "0"
                  )}
                </p>
                <p className="text-xs text-(--text-muted)">гарантий</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
