"use client";

import Image from "next/image";
import {
  FileSearch,
  Gavel,
  MonitorSmartphone,
  FolderOpen,
  Scale,
  FileCheck2,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TENDER_PLATFORMS, TENDER_SUPPORT } from "@/lib/site-content";

const STEP_ICONS: LucideIcon[] = [
  FileSearch,
  MonitorSmartphone,
  Settings2,
  FolderOpen,
  Scale,
  FileCheck2,
  Gavel,
];

export function TenderSupportSection() {
  return (
    <SectionShell
      background={{
        src: "/prof-p/background-any-5.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title={TENDER_SUPPORT.title}
            subtitle={TENDER_SUPPORT.subtitle}
          />
        </Reveal>

        <div className="relative grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
          <Reveal direction="right">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(155deg,rgba(255,255,255,0.98)_0%,rgba(244,248,252,0.97)_48%,rgba(236,244,251,0.95)_100%)] p-6 shadow-[0_20px_48px_rgba(9,34,53,0.1)] md:p-7 lg:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(10,107,156,0.1),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(212,175,86,0.12),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(59,111,212,0.07),transparent_40%)]"
                aria-hidden
              />
              <div
                className="tender-panel-sheen pointer-events-none absolute inset-0 opacity-45"
                aria-hidden
              />

              <div className="relative flex flex-1 flex-col gap-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent-500)">
                  Полный цикл сопровождения
                </p>

                <p className="text-sm leading-relaxed text-(--text-secondary) md:text-[15px]">
                  {TENDER_SUPPORT.description}
                </p>
                <p className="text-sm leading-relaxed text-(--text-secondary) md:text-[15px]">
                  {TENDER_SUPPORT.description2}
                </p>

                <ul className="mt-1 grid gap-2.5 sm:grid-cols-2">
                  {TENDER_SUPPORT.steps.map((step, index) => {
                    const Icon = STEP_ICONS[index] ?? FileSearch;

                    return (
                      <li
                        key={step}
                        className="group flex items-start gap-3 rounded-2xl border border-[rgba(12,56,89,0.06)] bg-white/70 px-3.5 py-3 shadow-[0_6px_16px_rgba(9,34,53,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(59,111,212,0.2)] hover:shadow-[0_12px_24px_rgba(9,34,53,0.08)]"
                      >
                        <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[rgba(12,56,89,0.1)] bg-[linear-gradient(160deg,rgba(14,86,134,0.14),rgba(255,255,255,0.96))] shadow-[0_6px_14px_rgba(9,34,53,0.06)] transition-transform duration-300 group-hover:scale-105">
                          <span
                            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]"
                            aria-hidden
                          />
                          <Icon
                            className="relative h-4 w-4 text-(--brand-700)"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </span>
                        <span className="pt-1.5 text-sm font-medium leading-snug text-(--brand-800)">
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="relative mt-auto overflow-hidden rounded-[1.35rem] border border-[rgba(186,145,62,0.28)] bg-[linear-gradient(135deg,rgba(4,22,37,0.98)_0%,rgba(9,53,84,0.96)_52%,rgba(18,72,110,0.94)_100%)] px-5 py-5 text-white shadow-[0_16px_40px_rgba(4,22,37,0.22)] md:px-6">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,86,0.22),transparent_34%),radial-gradient(circle_at_90%_18%,rgba(48,159,222,0.18),transparent_32%)]"
                    aria-hidden
                  />
                  <div
                    className="tender-cta-sheen pointer-events-none absolute inset-0 opacity-55"
                    aria-hidden
                  />
                  <p className="relative whitespace-pre-line text-sm font-semibold leading-relaxed tracking-wide md:text-[15px]">
                    {TENDER_SUPPORT.cta}
                  </p>
                  <div className="relative mt-4 h-0.5 w-16 rounded-full bg-[linear-gradient(90deg,rgba(212,175,86,0.9),transparent)]" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} scale>
            <div className="relative flex h-full min-h-80 flex-col justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,111,212,0.18)_0%,rgba(10,107,156,0.08)_42%,transparent_70%)] blur-2xl"
                aria-hidden
              />

              <div className="tender-signpost relative z-10 mx-auto w-full max-w-lg">
                <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(12,56,89,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(244,248,252,0.55)_100%)] p-4 shadow-[0_28px_64px_rgba(9,34,53,0.14)] backdrop-blur-sm md:p-5">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.65),transparent_48%),radial-gradient(circle_at_80%_90%,rgba(212,175,86,0.1),transparent_36%)]"
                    aria-hidden
                  />
                  <Image
                    src="/prof-p/block_tender.png"
                    alt="Направления тендерного сопровождения: 44-ФЗ, 223-ФЗ, 615-ПП и другие"
                    width={600}
                    height={600}
                    className="relative h-auto w-full drop-shadow-[0_18px_36px_rgba(9,34,53,0.18)]"
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    priority={false}
                  />
                </div>
              </div>

              <div className="tender-book relative z-20 mx-auto -mt-10 w-[78%] max-w-sm md:-mt-12">
                <div className="overflow-hidden rounded-[1.35rem] border border-[rgba(12,56,89,0.1)] bg-white/90 p-2 shadow-[0_18px_40px_rgba(9,34,53,0.14)] backdrop-blur-sm">
                  <Image
                    src="/prof-p/block_kniga.png"
                    alt="Электронные торги"
                    width={600}
                    height={280}
                    className="h-auto w-full rounded-[1rem]"
                    sizes="(min-width: 1024px) 22rem, 70vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[rgba(12,56,89,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(244,248,252,0.96)_100%)] px-4 py-5 shadow-[0_14px_36px_rgba(9,34,53,0.08)] md:px-5 md:py-6">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,107,156,0.08),transparent_42%)]"
              aria-hidden
            />
            <p className="relative mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-muted)">
              Работаем на ведущих электронных площадках
            </p>
            <div className="tender-platforms relative overflow-hidden">
              <div className="tender-platforms-track flex w-max items-center gap-8 md:gap-10">
                {[...TENDER_PLATFORMS, ...TENDER_PLATFORMS].map(
                  (platform, index) => (
                    <div
                      key={`${platform.name}-${index}`}
                      aria-hidden={index >= TENDER_PLATFORMS.length}
                      className="flex h-14 w-28 shrink-0 items-center justify-center opacity-85 transition-opacity duration-300 hover:opacity-100 md:h-16 md:w-32"
                    >
                      <Image
                        src={platform.image}
                        alt={
                          index >= TENDER_PLATFORMS.length
                            ? ""
                            : platform.name
                        }
                        width={120}
                        height={80}
                        className="h-auto max-h-12 w-auto object-contain md:max-h-14"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
