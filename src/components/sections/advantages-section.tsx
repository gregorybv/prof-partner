"use client";

import { useState, type CSSProperties } from "react";
import {
  Award,
  BadgePercent,
  Building2,
  Clock3,
  FileCheck2,
  FolderKanban,
  Laptop,
  MapPinned,
  Tags,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { ADVANTAGES } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ADVANTAGE_ICONS: LucideIcon[] = [
  Award,
  BadgePercent,
  Tags,
  Laptop,
  Building2,
  FolderKanban,
  MapPinned,
  Truck,
  FileCheck2,
  Clock3,
];

/** Clockwise from top — matches original solar diagram rhythm */
const ORBIT_ANGLES = [-90, -54, -18, 18, 54, 90, 126, 162, -162, -126] as const;

type AdvantageItem = (typeof ADVANTAGES)[number];

function AdvantageCard({
  item,
  index,
  align,
  active,
  onActivate,
}: {
  item: AdvantageItem;
  index: number;
  align: "left" | "right";
  active: boolean;
  onActivate: (index: number | null) => void;
}) {
  const Icon = ADVANTAGE_ICONS[index] ?? Award;
  const isLeft = align === "left";

  return (
    <article
      className={cn(
        "group relative flex items-start gap-3 rounded-2xl border p-3.5 transition-all duration-300 md:p-4",
        isLeft ? "sm:flex-row-reverse sm:text-right" : "text-left",
        active
          ? "border-[rgba(59,111,212,0.28)] bg-white/95 shadow-[0_18px_40px_rgba(9,34,53,0.14)] -translate-y-0.5"
          : "border-[rgba(12,56,89,0.08)] bg-white/78 shadow-[0_10px_28px_rgba(9,34,53,0.06)] hover:-translate-y-0.5 hover:border-[rgba(59,111,212,0.2)] hover:bg-white/92 hover:shadow-[0_16px_36px_rgba(9,34,53,0.1)]",
      )}
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(index)}
      onBlur={() => onActivate(null)}
    >
      <div
        className={cn(
          "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-all duration-300",
          active
            ? "border-[rgba(59,111,212,0.28)] bg-[linear-gradient(160deg,rgba(59,111,212,0.18),rgba(255,255,255,0.96))] shadow-[0_10px_22px_rgba(59,111,212,0.18)] scale-105"
            : "border-[rgba(12,56,89,0.1)] bg-[linear-gradient(160deg,rgba(14,86,134,0.12),rgba(255,255,255,0.96))] shadow-[0_8px_18px_rgba(9,34,53,0.08)] group-hover:scale-105",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.75),transparent_55%)]"
          aria-hidden
        />
        <Icon
          className="relative h-5 w-5 text-(--brand-700)"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "flex items-baseline gap-2",
            isLeft && "sm:flex-row-reverse",
          )}
        >
          <span className="font-display text-lg leading-none text-(--brand-600)/45 transition-colors duration-300 group-hover:text-(--brand-600)/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-sm font-bold leading-snug text-(--brand-800) md:text-[15px]">
            {item.title}
          </h3>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-(--text-secondary) md:text-[13px]">
          {item.description}
        </p>
        <div
          className={cn(
            "mt-2.5 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--accent-500),transparent)] transition-all duration-300",
            isLeft && "sm:ml-auto sm:bg-[linear-gradient(270deg,var(--accent-500),transparent)]",
            active ? "w-16" : "w-8 group-hover:w-14",
          )}
          aria-hidden
        />
      </div>
    </article>
  );
}

function SolarHub({
  activeIndex,
  onActivate,
}: {
  activeIndex: number | null;
  onActivate: (index: number | null) => void;
}) {
  return (
    <div className="advantages-solar relative mx-auto flex h-[min(420px,70vw)] w-[min(420px,70vw)] items-center justify-center">
      <div className="advantages-solar-ring advantages-solar-ring--outer absolute inset-[4%] rounded-full" />
      <div className="advantages-solar-ring advantages-solar-ring--mid absolute inset-[14%] rounded-full" />
      <div className="advantages-solar-ring advantages-solar-ring--inner absolute inset-[26%] rounded-full" />

      <div className="advantages-solar-core relative z-10 flex h-[42%] w-[42%] flex-col items-center justify-center rounded-full border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(236,244,251,0.94))] shadow-[0_20px_50px_rgba(9,34,53,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(59,111,212,0.12),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(165,215,70,0.1),transparent_50%)]"
          aria-hidden
        />
        <p className="font-display relative text-[clamp(3.5rem,8vw,5.25rem)] leading-none font-extrabold tracking-wide text-(--brand-800)">
          10
        </p>
        <p className="relative mt-1 max-w-28 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-(--text-secondary) md:text-[11px]">
          наших
          <br />
          преимуществ
        </p>
      </div>

      {ADVANTAGES.map((item, index) => {
        const Icon = ADVANTAGE_ICONS[index] ?? Award;
        const angle = ORBIT_ANGLES[index] ?? -90;
        const active = activeIndex === index;

        return (
          <div
            key={item.title}
            className="advantages-orbit-node absolute top-1/2 left-1/2 z-20"
            style={
              {
                "--orbit-angle": `${angle}deg`,
                "--orbit-delay": `${index * 0.18}s`,
              } as CSSProperties
            }
          >
            <div className="advantages-orbit-float">
              <button
                type="button"
                aria-label={item.title}
                className={cn(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 md:h-11 md:w-11",
                  active
                    ? "scale-110 border-[rgba(59,111,212,0.35)] bg-white shadow-[0_12px_28px_rgba(59,111,212,0.22)]"
                    : "border-white/70 bg-white/88 shadow-[0_8px_20px_rgba(9,34,53,0.1)] hover:scale-105",
                )}
                onMouseEnter={() => onActivate(index)}
                onMouseLeave={() => onActivate(null)}
                onFocus={() => onActivate(index)}
                onBlur={() => onActivate(null)}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-300 md:h-[18px] md:w-[18px]",
                    active ? "text-(--accent-500)" : "text-(--brand-700)",
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AdvantagesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const left = ADVANTAGES.slice(0, 5);
  const right = ADVANTAGES.slice(5);

  return (
    <SectionShell
      id="preimushestva"
      background={{
        src: "/prof-p/background-fourth-screen-new.jpg",
        overlay: "light",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Почему выбирают нас?"
            subtitle="10 наших преимуществ"
            className="[&>p]:xl:hidden"
          />
        </Reveal>

        {/* Mobile / tablet: stacked cards */}
        <div className="grid gap-3 sm:grid-cols-2 xl:hidden">
          {ADVANTAGES.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <AdvantageCard
                item={item}
                index={index}
                align="right"
                active={activeIndex === index}
                onActivate={setActiveIndex}
              />
            </Reveal>
          ))}
        </div>

        {/* Desktop: solar composition */}
        <div className="relative hidden xl:grid xl:grid-cols-[1fr_minmax(280px,420px)_1fr] xl:items-center xl:gap-6 2xl:gap-10">
          <div className="flex flex-col gap-3">
            {left.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} direction="left">
                <AdvantageCard
                  item={item}
                  index={index}
                  align="left"
                  active={activeIndex === index}
                  onActivate={setActiveIndex}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} scale className="relative z-10">
            <div className="advantages-solar-sheen pointer-events-none absolute inset-[-8%] rounded-full opacity-70" />
            <SolarHub activeIndex={activeIndex} onActivate={setActiveIndex} />
          </Reveal>

          <div className="flex flex-col gap-3">
            {right.map((item, index) => {
              const realIndex = index + 5;
              return (
                <Reveal key={item.title} delay={index * 0.05} direction="right">
                  <AdvantageCard
                    item={item}
                    index={realIndex}
                    align="right"
                    active={activeIndex === realIndex}
                    onActivate={setActiveIndex}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
