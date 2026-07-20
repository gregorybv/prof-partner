"use client";

import { useReducedMotion } from "motion/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { YEARLY_STATS } from "@/lib/site-content";
import { formatNumber } from "@/lib/utils";

type StatBlockProps = {
  year: number;
  count: number;
  inView: boolean;
  delay?: number;
  align: "left" | "right";
  reduceMotion: boolean;
};

function YearLabel({ year }: { year: number }) {
  return (
    <div className="flex items-baseline justify-center gap-x-1.5 text-[#63850b]">
      <span className="text-sm font-semibold uppercase tracking-wide md:text-base">
        за
      </span>
      <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold uppercase leading-none tracking-normal">
        {year}
      </span>
      <span className="text-sm font-semibold uppercase tracking-wide md:text-base">
        год
      </span>
    </div>
  );
}

function StatBlock({ year, count, inView, delay = 0, align, reduceMotion }: StatBlockProps) {
  return (
    <div
      className={
        align === "left"
          ? "flex flex-col items-center md:pr-6 lg:pr-10"
          : "flex flex-col items-center md:pl-6 lg:pl-10"
      }
    >
      <YearLabel year={year} />
      <p className="clients-trust-stat mt-4 text-center">
        {reduceMotion ? (
          formatNumber(count)
        ) : inView ? (
          <CountUp
            end={count}
            duration={2}
            delay={delay}
            separator=" "
            formattingFn={formatNumber}
          />
        ) : (
          "0"
        )}
      </p>
      <p className="mt-4 max-w-xs text-center text-sm font-semibold uppercase tracking-wide text-(--text-secondary) md:text-base">
        Независимых/банковских гарантий
      </p>
    </div>
  );
}

export function ClientsTrustSection() {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const latest = YEARLY_STATS[YEARLY_STATS.length - 1];
  const previous = YEARLY_STATS[YEARLY_STATS.length - 2];
  const historical = YEARLY_STATS.slice(0, -2);

  return (
    <SectionShell className="min-h-[clamp(520px,80vh,700px)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-size-[30%] bg-position-[center_47%] bg-no-repeat"
        style={{ backgroundImage: "url(/prof-p/map.png)" }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Наши клиенты нам доверяют"
            subtitle="И возвращаются снова, поэтому мы выпустили:"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-0"
          >
            <div className="clients-trust-slash relative">
              <StatBlock
                year={previous.year}
                count={previous.count}
                inView={inView}
                align="left"
                reduceMotion={!!prefersReducedMotion}
              />
            </div>
            <StatBlock
              year={latest.year}
              count={latest.count}
              inView={inView}
              delay={0.2}
              align="right"
              reduceMotion={!!prefersReducedMotion}
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg bg-[#dee6ec] md:grid-cols-3 lg:grid-cols-6">
            {historical.map((stat, index) => (
              <div
                key={stat.year}
                className="flex flex-col items-center gap-y-2.5 bg-[#f0f4f8] px-2 py-4 text-center"
              >
                <p className="font-display text-[1.375rem] font-bold text-[#63850b]">
                  за {stat.year} год
                </p>
                <p className="font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold tracking-tight text-[#294773]">
                  {prefersReducedMotion ? (
                    formatNumber(stat.count)
                  ) : inView ? (
                    <CountUp
                      end={stat.count}
                      duration={1.5}
                      delay={index * 0.05}
                      separator=" "
                      formattingFn={formatNumber}
                    />
                  ) : (
                    "0"
                  )}
                  <span className="relative -top-1 ml-1 text-sm font-normal tracking-wide">
                    гарантий
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
