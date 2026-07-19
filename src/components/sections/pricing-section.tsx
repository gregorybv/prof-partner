"use client";

import {
  BadgePercent,
  Banknote,
  ChartColumnIncreasing,
  FilePenLine,
  Handshake,
  MessagesSquare,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { PRICING_TABLE } from "@/lib/site-content";

const PRICING_ICONS: LucideIcon[] = [
  MessagesSquare,
  ChartColumnIncreasing,
  BadgePercent,
  Send,
  FilePenLine,
  Banknote,
  Handshake,
];

function FreeBadge({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="pricing-free-badge inline-flex items-center justify-center rounded-full border border-[rgba(94,131,27,0.22)] bg-[linear-gradient(180deg,rgba(165,215,70,0.22)_0%,rgba(120,163,37,0.12)_100%)] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-(--cta-700) shadow-[0_8px_18px_rgba(94,131,27,0.12)]"
      style={{ animationDelay: `${delay}s` }}
    >
      БЕСПЛАТНО
    </span>
  );
}

export function PricingSection() {
  return (
    <SectionShell
      background={{
        src: "/prof-p/background-third-screen.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Стоимость наших услуг"
            subtitle="Наша ценовая политика"
          />
        </Reveal>

        <Reveal delay={0.08} scale>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(135deg,rgba(4,22,37,0.98)_0%,rgba(9,53,84,0.95)_48%,rgba(18,72,110,0.94)_100%)] px-5 py-5 text-white shadow-[0_24px_56px_rgba(4,22,37,0.22)] md:px-7 md:py-6">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,86,0.2),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(165,215,70,0.16),transparent_30%),radial-gradient(circle_at_70%_100%,rgba(48,159,222,0.14),transparent_40%)]"
              aria-hidden
            />
            <div
              className="pricing-banner-sheen pointer-events-none absolute inset-0 opacity-45"
              aria-hidden
            />

            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/18 bg-white/10 font-display text-4xl leading-none text-[rgba(165,215,70,0.95)] shadow-[0_12px_28px_rgba(4,22,37,0.28)] md:h-[4.5rem] md:w-[4.5rem] md:text-5xl">
                  0
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    Комиссия брокера
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-white md:text-xl">
                    Все наши услуги — бесплатно
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/72">
                    Вы платите банку напрямую по цене, которую мы для Вас согласовали
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/14 bg-white/8 px-4 py-3 text-sm text-white/80 backdrop-blur-sm">
                <p className="font-semibold text-white">7 услуг в одном пакете</p>
                <p className="mt-0.5 text-xs text-white/65">
                  от консультации до выдачи гарантии
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98)_0%,rgba(244,248,252,0.97)_48%,rgba(236,244,251,0.95)_100%)] p-3 shadow-[0_20px_48px_rgba(9,34,53,0.1)] sm:p-4 md:p-5">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(10,107,156,0.08),transparent_32%),radial-gradient(circle_at_90%_6%,rgba(165,215,70,0.1),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(59,111,212,0.06),transparent_40%)]"
              aria-hidden
            />

            <div className="relative mb-3 hidden items-center justify-between gap-4 px-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-muted) md:flex">
              <span>Перечень услуг по банковским гарантиям</span>
              <span className="w-44 text-center lg:w-52">Стоимость услуг</span>
            </div>

            <ul className="relative flex flex-col gap-2.5">
              {PRICING_TABLE.map((row, index) => {
                const Icon = PRICING_ICONS[index] ?? MessagesSquare;
                const hasNote = "note" in row && Boolean(row.note);

                return (
                  <li key={row.title}>
                    <Reveal delay={0.14 + index * 0.04}>
                      <article className="group relative grid overflow-hidden rounded-[1.35rem] border border-[rgba(12,56,89,0.08)] bg-white/80 shadow-[0_10px_24px_rgba(9,34,53,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(120,163,37,0.28)] hover:shadow-[0_18px_36px_rgba(9,34,53,0.1)] md:grid-cols-[minmax(0,1fr)_11.5rem] lg:grid-cols-[minmax(0,1fr)_13rem]">
                        <div className="relative flex gap-3.5 p-4 md:gap-4 md:p-5">
                          <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(160deg,rgba(14,86,134,0.14),rgba(255,255,255,0.96))] shadow-[0_8px_18px_rgba(9,34,53,0.07)] transition-transform duration-300 group-hover:scale-105">
                            <span
                              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]"
                              aria-hidden
                            />
                            <Icon
                              className="relative h-5 w-5 text-(--brand-700)"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2 md:hidden">
                              <FreeBadge delay={index * 0.12} />
                            </div>
                            <h3 className="text-[15px] font-bold leading-snug text-(--brand-800) md:text-base">
                              {row.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-(--text-secondary)">
                              {row.description}
                            </p>
                            {hasNote && (
                              <p className="mt-2 text-sm leading-relaxed text-(--text-secondary) md:hidden">
                                {row.note}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative hidden flex-col items-center justify-center gap-2 border-l border-[rgba(120,163,37,0.14)] bg-[linear-gradient(180deg,rgba(215,232,199,0.55)_0%,rgba(241,245,236,0.72)_100%)] px-4 py-4 text-center transition-colors duration-300 group-hover:bg-[linear-gradient(180deg,rgba(215,232,199,0.78)_0%,rgba(241,245,236,0.9)_100%)] md:flex">
                          <div
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(165,215,70,0.22),transparent_55%)] opacity-70"
                            aria-hidden
                          />
                          <FreeBadge delay={index * 0.12} />
                          {hasNote && (
                            <p className="relative max-w-40 text-[11px] leading-snug text-(--text-secondary)">
                              {row.note}
                            </p>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
