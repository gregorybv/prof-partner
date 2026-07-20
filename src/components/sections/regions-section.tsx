"use client";

import { useState, type CSSProperties } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { REGIONS } from "@/lib/site-content";
import { cn, formatNumber } from "@/lib/utils";

/**
 * Marker columns over background_map.jpg (full-bleed, zoomed).
 * Percents are relative to the chart stage (right portion of the section).
 */
const REGION_LAYOUT = [
  { cityTop: "-2%", barLeft: "1%", barWidth: "12.5%" },
  { cityTop: "5%", barLeft: "16%", barWidth: "13.5%" },
  { cityTop: "0%", barLeft: "33%", barWidth: "10.5%" },
  { cityTop: "5%", barLeft: "46%", barWidth: "10.5%" },
  { cityTop: "-2%", barLeft: "59%", barWidth: "11.5%" },
  { cityTop: "5%", barLeft: "73%", barWidth: "11.5%" },
  { cityTop: "1%", barLeft: "87%", barWidth: "12.5%" },
] as const;

const MAX_COUNT = Math.max(...REGIONS.map((r) => r.count));

export function RegionsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionShell
      className="regions-section min-h-[clamp(560px,72vh,700px)] overflow-hidden"
      background={{
        src: "/prof-p/background_map.jpg",
        overlay: "none",
        size: "cover",
        position: "center",
        imageClassName: "object-[70%_50%] scale-[1.42] origin-[70%_50%]",
      }}
      wide
      containerClassName="relative flex min-h-[inherit] items-center"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,249,252,0.88)_0%,rgba(247,249,252,0.55)_14%,rgba(247,249,252,0.18)_28%,transparent_42%)]"
        aria-hidden
      />

      <div ref={ref} className="relative w-full">
        {/* Mobile / tablet */}
        <div className="flex flex-col gap-(--space-section-gap) xl:hidden">
          <Reveal>
            <div className="max-w-md">
              <h2 className="font-display text-[clamp(1.85rem,5vw,2.75rem)] font-extrabold uppercase leading-[1.08] tracking-[0.015em] text-(--brand-900)">
                Работаем
                <br />
                со всеми регионами
              </h2>
              <p className="mt-3 text-sm font-semibold uppercase leading-snug tracking-[0.12em] text-(--text-secondary)">
                Количество согласованных нами гарантий за{" "}
                <span className="text-(--brand-800)">2025</span> год
              </p>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-3">
            {REGIONS.map((region, index) => {
              const active = activeIndex === index;
              const widthPct = Math.max(18, (region.count / MAX_COUNT) * 100);

              return (
                <Reveal key={region.city} delay={index * 0.05}>
                  <li>
                    <article
                      className={cn(
                        "group relative w-full overflow-hidden rounded-2xl border px-4 py-3.5 transition-all duration-300",
                        active
                          ? "border-[rgba(59,111,212,0.28)] bg-white/92 shadow-[0_16px_36px_rgba(9,34,53,0.12)]"
                          : "border-[rgba(12,56,89,0.08)] bg-white/78 shadow-[0_8px_22px_rgba(9,34,53,0.06)] hover:border-[rgba(59,111,212,0.2)] hover:bg-white/90",
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(null)}
                      tabIndex={0}
                    >
                      <div
                        className="pointer-events-none absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(59,111,212,0.14),rgba(59,111,212,0.03))] transition-[width] duration-500 ease-out"
                        style={{ width: `${widthPct}%` }}
                        aria-hidden
                      />
                      <div className="relative flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-(--brand-800)">
                            {region.city}
                          </p>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-(--text-muted)">
                            Выдано более
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-[1.75rem] leading-none tracking-wide text-(--brand-700) transition-transform duration-300 group-hover:scale-[1.04]">
                            {inView ? (
                              <CountUp
                                end={region.count}
                                duration={1.8}
                                delay={index * 0.08}
                                separator=" "
                                formattingFn={formatNumber}
                              />
                            ) : (
                              "0"
                            )}
                          </p>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-(--text-muted)">
                            гарантий
                          </p>
                        </div>
                      </div>
                    </article>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Desktop: full-bleed chart with overlays */}
        <div className="relative hidden min-h-[clamp(420px,52vh,520px)] xl:block">
          <Reveal direction="left" className="relative z-20 w-[min(270px,22%)] pt-[clamp(1.5rem,4vh,3.5rem)]">
            <h2 className="font-display text-[clamp(2.1rem,3.2vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-(--brand-900)">
              Работаем
              <br />
              со всеми регионами
            </h2>
            <p className="mt-4 max-w-[15rem] text-sm font-semibold uppercase leading-[1.45] tracking-[0.14em] text-(--text-secondary)">
              Количество
              <br />
              согласованных
              <br />
              нами гарантий
              <br />
              за <span className="font-extrabold text-(--brand-800)">2025</span> год
            </p>
          </Reveal>

          <div className="regions-chart absolute inset-y-[6%] right-0 left-[min(250px,18%)]">
            {REGIONS.map((region, index) => {
              const layout = REGION_LAYOUT[index];
              const active = activeIndex === index;
              const dimmed = activeIndex !== null && !active;

              return (
                <div
                  key={region.city}
                  className="regions-marker absolute inset-y-0 z-10"
                  style={
                    {
                      left: layout.barLeft,
                      width: layout.barWidth,
                      "--marker-delay": `${0.12 + index * 0.07}s`,
                    } as CSSProperties
                  }
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className={cn(
                      "regions-marker-glow pointer-events-none absolute inset-x-[12%] top-[8%] bottom-[10%] transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />

                  <p
                    className={cn(
                      "absolute left-1/2 z-20 w-max max-w-[9rem] -translate-x-1/2 rounded-full border px-3 py-1.5 text-center text-[13px] font-semibold leading-none tracking-[0.01em] shadow-[0_10px_24px_rgba(9,34,53,0.12)] backdrop-blur-md transition-all duration-300",
                      active
                        ? "border-[rgba(59,111,212,0.24)] bg-white/92 text-(--accent-600)"
                        : "border-white/72 bg-white/82 text-(--brand-900)",
                      dimmed && "opacity-45",
                      active && "-translate-y-0.5 shadow-[0_16px_34px_rgba(59,111,212,0.18)]",
                    )}
                    style={{ top: layout.cityTop }}
                  >
                    {region.city}
                  </p>

                  <div
                    className={cn(
                      "absolute bottom-0 left-1/2 z-20 min-w-[7.75rem] -translate-x-1/2 rounded-2xl border px-3 py-2.5 text-center shadow-[0_12px_28px_rgba(9,34,53,0.12)] backdrop-blur-md transition-all duration-300",
                      active
                        ? "border-[rgba(59,111,212,0.26)] bg-white/94"
                        : "border-white/72 bg-white/84",
                      dimmed && "opacity-45",
                      active && "-translate-y-1 shadow-[0_18px_38px_rgba(59,111,212,0.18)]",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[11px] leading-none",
                        active ? "text-(--accent-600)/80" : "text-(--text-muted)",
                      )}
                    >
                      Выдано более
                    </p>
                    <p
                      className={cn(
                        "font-display mt-1 text-[clamp(1.4rem,1.85vw,1.85rem)] leading-none tracking-wide text-(--brand-800) transition-colors duration-300",
                        active && "text-(--accent-600)",
                      )}
                    >
                      {inView ? (
                        <CountUp
                          end={region.count}
                          duration={2}
                          delay={index * 0.1}
                          separator=" "
                          formattingFn={formatNumber}
                        />
                      ) : (
                        "0"
                      )}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[11px] leading-none",
                        active ? "text-(--accent-600)/80" : "text-(--text-muted)",
                      )}
                    >
                      гарантий
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
