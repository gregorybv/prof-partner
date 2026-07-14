"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { YEARLY_STATS } from "@/lib/site-content";
import { formatNumber } from "@/lib/utils";

export function ClientsTrustSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const latest = YEARLY_STATS[YEARLY_STATS.length - 1];
  const previous = YEARLY_STATS[YEARLY_STATS.length - 2];

  return (
    <SectionShell className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[length:30%] bg-[position:center_47%] bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/prof-p/map.png)" }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Наши клиенты нам доверяют"
            subtitle="И возвращаются снова, поэтому мы выпустили:"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-800)] p-8 text-white">
              <p className="text-sm text-white/70">за {previous.year} год</p>
              <p className="font-display mt-2 text-5xl">
                {inView ? <CountUp end={previous.count} duration={2} separator=" " formattingFn={formatNumber} /> : "0"}
              </p>
              <p className="mt-2 text-sm text-white/80">Независимых/банковских гарантий</p>
            </div>
            <div className="rounded-3xl border border-[var(--accent-500)]/30 bg-[var(--surface-0)] p-8 shadow-[var(--shadow-card)]">
              <p className="text-sm text-[var(--text-muted)]">за {latest.year} год</p>
              <p className="font-display mt-2 text-5xl text-[var(--brand-600)]">
                {inView ? <CountUp end={latest.count} duration={2} delay={0.2} separator=" " formattingFn={formatNumber} /> : "0"}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Независимых/банковских гарантий</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {YEARLY_STATS.slice(0, -2).map((stat, index) => (
              <div
                key={stat.year}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] p-4 text-center"
              >
                <p className="text-xs text-[var(--text-muted)]">за {stat.year} год</p>
                <p className="mt-1 font-display text-lg text-[var(--brand-600)]">
                  {inView ? (
                    <CountUp end={stat.count} duration={1.5} delay={index * 0.05} separator=" " formattingFn={formatNumber} />
                  ) : (
                    "0"
                  )}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">гарантий</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
