"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  FileStack,
  HandCoins,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { SERVICES } from "@/lib/site-content";

const SERVICE_ICONS: Record<(typeof SERVICES)[number]["title"], LucideIcon> = {
  "Независимая гарантия": ShieldCheck,
  "Тендерное сопровождение": FileStack,
  "Тендерный займ на обеспечение заявки": HandCoins,
  "Гарантийное обязательство": BadgeCheck,
  "Кредит на исполнение контракта": BriefcaseBusiness,
};

function ServiceIcon({
  icon: Icon,
  size = "md",
}: {
  icon: LucideIcon;
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-xl";
  const glyph = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-visible border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(160deg,rgba(14,86,134,0.14),rgba(255,255,255,0.96))] shadow-[0_8px_20px_rgba(9,34,53,0.08)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${box}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]"
        aria-hidden
      />
      <Icon
        className={`relative text-(--brand-700) ${glyph}`}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

export function ServicesSection() {
  const [featured, ...rest] = SERVICES;
  const FeaturedIcon = SERVICE_ICONS[featured.title];

  return (
    <SectionShell
      background={{
        src: "/prof-p/background-any1.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <Reveal>
            <SectionHeading
              align="left"
              title="Основные направления нашей деятельности"
              subtitle="ПОЛНЫЙ СПЕКТР ТЕНДЕРНЫХ УСЛУГ"
            />
          </Reveal>

          <Reveal delay={0.1} scale>
            <article className="services-featured group relative overflow-hidden rounded-[1.75rem] border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(145deg,rgba(255,255,255,1)_0%,rgba(244,248,252,0.98)_48%,rgba(236,244,251,0.96)_100%)] p-6 shadow-[0_20px_48px_rgba(9,34,53,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(9,34,53,0.16)] md:p-7">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(10,107,156,0.12),transparent_36%),radial-gradient(circle_at_88%_12%,rgba(212,175,86,0.14),transparent_30%),radial-gradient(circle_at_70%_100%,rgba(59,111,212,0.08),transparent_40%)]"
                aria-hidden
              />
              <div
                className="services-featured-sheen pointer-events-none absolute inset-0 opacity-50"
                aria-hidden
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <ServiceIcon icon={FeaturedIcon} size="lg" />

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent-500)">
                    Ключевое направление
                  </p>
                  <h3 className="mt-2 font-display text-xl font-extrabold tracking-wide text-(--brand-800) md:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--text-secondary) md:text-[15px]">
                    {featured.description}
                  </p>
                  <div className="mt-5 h-0.5 w-14 rounded-full bg-[linear-gradient(90deg,var(--accent-500),transparent)] transition-all duration-300 group-hover:w-28" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rest.map((service, index) => {
            const Icon = SERVICE_ICONS[service.title];

            return (
              <Reveal key={service.title} delay={0.12 + index * 0.06}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[rgba(12,56,89,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,253,0.98)_55%,rgba(241,246,252,0.96)_100%)] p-5 shadow-[0_14px_32px_rgba(9,34,53,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(59,111,212,0.22)] hover:shadow-[0_22px_44px_rgba(9,34,53,0.14)] md:p-6">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,111,212,0.1),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(212,175,86,0.08),transparent_40%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-muted)"></span>
                      <ServiceIcon icon={Icon} />
                    </div>

                    <h3 className="text-base font-bold leading-snug text-(--brand-800) md:text-[17px]">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-(--text-secondary)">
                      {service.description}
                    </p>
                    <div className="mt-5 h-0.5 w-10 rounded-full bg-[linear-gradient(90deg,var(--accent-500),transparent)] transition-all duration-300 group-hover:w-full" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
