"use client";

import Image from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import {
  WHY_FREE_SUMMARY,
  WHY_FREE_WITHOUT_US,
  WHY_FREE_WITH_US,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

const FLOW_ICONS = [
  "/prof-p/money.png",
  "/prof-p/think.png",
  "/prof-p/bank.png",
  "/prof-p/hand.png",
  "/prof-p/money-hand.png",
] as const;

type PriceItem = {
  amount: string;
  label: string;
};

function FlowCard({
  item,
  iconSrc,
  tone,
  compact = false,
}: {
  item: PriceItem;
  iconSrc: string;
  tone: "positive" | "negative";
  compact?: boolean;
}) {
  const isPositive = tone === "positive";

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300",
        compact ? "items-center gap-3 px-3.5 py-3" : "flex-col p-4 md:p-5",
        isPositive
          ? "border-white/22 bg-white/14 shadow-[0_14px_36px_rgba(4,22,37,0.22)] hover:-translate-y-1 hover:border-[rgba(165,215,70,0.45)] hover:bg-white/18 hover:shadow-[0_20px_44px_rgba(4,22,37,0.3)]"
          : "border-white/14 bg-white/8 opacity-85 shadow-[0_10px_28px_rgba(4,22,37,0.16)] hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/12",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70",
          isPositive
            ? "bg-[radial-gradient(circle_at_12%_18%,rgba(165,215,70,0.18),transparent_42%),radial-gradient(circle_at_88%_0%,rgba(48,159,222,0.12),transparent_36%)]"
            : "bg-[radial-gradient(circle_at_20%_10%,rgba(251,83,82,0.1),transparent_40%)]",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-xl border border-white/18 bg-white/10 shadow-[0_8px_18px_rgba(4,22,37,0.18)] transition-transform duration-300 group-hover:scale-105",
          compact ? "h-9 w-9" : "mb-3 h-10 w-10",
        )}
      >
        <Image
          src={iconSrc}
          alt=""
          width={compact ? 20 : 24}
          height={compact ? 20 : 24}
          className="opacity-95"
        />
      </div>

      <div className="relative min-w-0 flex-1">
        <p
          className={cn(
            "font-display leading-none tracking-wide text-white",
            compact ? "text-2xl" : "text-3xl md:text-[2rem]",
            isPositive && "text-[rgba(210,235,140,0.98)]",
          )}
        >
          {item.amount}
        </p>
        <div
          className={cn(
            "mt-2 h-px w-12 bg-white/35 transition-all duration-300 group-hover:w-16",
            isPositive && "bg-[rgba(165,215,70,0.55)] group-hover:bg-[rgba(165,215,70,0.8)]",
          )}
          aria-hidden
        />
        <p
          className={cn(
            "mt-2 text-sm leading-snug text-white/78",
            compact && "mt-1.5 text-[13px]",
          )}
        >
          {item.label}
        </p>
      </div>
    </article>
  );
}

function PriceFlow({
  title,
  items,
  tone,
  delay = 0,
}: {
  title: string;
  items: readonly PriceItem[];
  tone: "positive" | "negative";
  delay?: number;
}) {
  const steps = items.slice(0, 3);
  const outcomes = items.slice(3);

  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-4">
        <p
          className={cn(
            "text-center text-xs font-bold uppercase tracking-[0.16em] md:text-left",
            tone === "positive"
              ? "text-[rgba(178,211,70,0.95)]"
              : "text-[rgba(251,120,118,0.95)]",
          )}
        >
          {title}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {steps.map((item, index) => (
            <Reveal
              key={item.label}
              delay={delay + 0.04 + index * 0.05}
              className="relative h-full"
            >
              <FlowCard
                item={item}
                iconSrc={FLOW_ICONS[index] ?? FLOW_ICONS[0]}
                tone={tone}
              />
              <ChevronRight
                className={cn(
                  "pointer-events-none absolute top-1/2 left-[calc(100%+0.5rem)] z-10 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 xl:block",
                  tone === "positive"
                    ? "text-[rgba(165,215,70,0.75)]"
                    : "text-white/35",
                )}
                strokeWidth={2.25}
                aria-hidden
              />
            </Reveal>
          ))}

          <Reveal
            delay={delay + 0.18}
            className="relative h-full sm:col-span-2 xl:col-span-1"
          >
            <div
              className={cn(
                "flex h-full flex-col gap-2.5 rounded-2xl border p-2.5 backdrop-blur-md",
                tone === "positive"
                  ? "border-[rgba(165,215,70,0.28)] bg-[linear-gradient(160deg,rgba(94,131,27,0.28)_0%,rgba(255,255,255,0.1)_100%)]"
                  : "border-white/14 bg-white/6",
              )}
            >
              {outcomes.map((item, index) => (
                <FlowCard
                  key={item.label}
                  item={item}
                  iconSrc={FLOW_ICONS[3 + index] ?? FLOW_ICONS[3]}
                  tone={tone}
                  compact
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}

function SummaryStar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="5.84082"
        width="2.2161"
        height="12"
        rx="1.10805"
        fill="currentColor"
      />
      <rect
        width="2.24022"
        height="12.3908"
        rx="1.12011"
        transform="matrix(0.532812 0.846233 -0.86597 0.500096 11.71 2.04492)"
        fill="currentColor"
      />
      <rect
        width="2.24029"
        height="12.3919"
        rx="1.12015"
        transform="matrix(-0.530821 0.847484 -0.867097 -0.49814 12.8379 8.16016)"
        fill="currentColor"
      />
    </svg>
  );
}

function SummaryColumn({
  title,
  rows,
  tone,
}: {
  title: string;
  rows: readonly {
    label: string;
    amount: string;
    accent?: "success" | "error";
    starred?: boolean;
  }[];
  tone: "positive" | "negative";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] border p-5 md:p-6",
        tone === "positive"
          ? "border-[rgba(165,215,70,0.28)] bg-[linear-gradient(160deg,rgba(94,131,27,0.22)_0%,rgba(255,255,255,0.08)_100%)]"
          : "border-white/14 bg-white/6 opacity-90",
      )}
    >
      <p
        className={cn(
          "mb-4 text-sm font-bold uppercase tracking-[0.12em]",
          tone === "positive"
            ? "text-[rgba(178,211,70,0.95)]"
            : "text-[rgba(251,120,118,0.95)]",
        )}
      >
        {title}
      </p>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-white/75">{row.label}:</span>
            <span
              className={cn(
                "relative font-display text-2xl leading-none tracking-wide text-white md:text-[1.75rem]",
                row.accent === "success" && "text-[rgba(178,211,70,0.98)]",
                row.accent === "error" && "text-[rgba(251,120,118,0.98)]",
              )}
            >
              {row.starred && (
                <SummaryStar className="absolute -right-3 -top-2 text-[#FFD600]" />
              )}
              {row.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhyFreeSection() {
  return (
    <SectionShell
      id="price"
      background={{
        src: "/prof-p/background_zero.jpg",
        overlay: "navy",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.08] tracking-[0.02em] text-white">
            Почему у нас бесплатно?
          </h2>
        </Reveal>

        <Reveal delay={0.06} scale>
          <div className="relative mx-auto flex w-fit max-w-full flex-col items-center gap-6 overflow-hidden rounded-[1.75rem] border border-white/14 bg-[linear-gradient(145deg,rgba(4,22,37,0.55)_0%,rgba(9,53,84,0.42)_52%,rgba(18,72,110,0.38)_100%)] px-6 py-8 shadow-[0_28px_64px_rgba(4,22,37,0.35)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-8 md:gap-12 md:px-9">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(165,215,70,0.22),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(48,159,222,0.16),transparent_30%),radial-gradient(circle_at_70%_100%,rgba(212,175,86,0.1),transparent_40%)]"
              aria-hidden
            />
            <div
              className="why-free-hero-sheen pointer-events-none absolute inset-0 opacity-50"
              aria-hidden
            />

            <div className="relative shrink-0 pr-12 sm:pr-14 md:pr-16">
              <div className="why-free-zero relative font-display text-[clamp(7.5rem,22vw,12.5rem)] leading-[0.82] tracking-tight text-[rgba(178,211,70,0.96)] drop-shadow-[0_18px_40px_rgba(94,131,27,0.35)]">
                0
                <div
                  className="absolute top-3 bottom-4 -right-14 flex flex-col justify-between sm:-right-16"
                  aria-hidden
                >
                  <span className="why-free-mark font-body text-[clamp(2.75rem,7vw,4.5rem)] font-light leading-none text-[rgba(178,211,70,0.9)]">
                    ₽
                  </span>
                  <span className="why-free-mark why-free-mark-delayed font-body text-[clamp(2.75rem,7vw,4.5rem)] font-light leading-none text-[rgba(178,211,70,0.9)]">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 min-w-0 max-w-md text-center sm:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(165,215,70,0.28)] bg-[rgba(165,215,70,0.12)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[rgba(210,235,140,0.95)]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Без комиссии брокера
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[rgba(178,211,70,0.95)] md:text-base">
                Стоимость наших услуг
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                Для Вас мы работаем бесплатно!
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/72 md:text-[15px]">
                Вы платите банку напрямую по цене,
                <br className="hidden sm:block" /> которую мы для Вас согласовали
              </p>

              <div className="my-5 h-px w-full max-w-sm bg-gradient-to-r from-white/35 via-white/15 to-transparent sm:mx-0 mx-auto" />

              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[rgba(178,211,70,0.95)] md:text-base">
                Комиссия за оформление
              </p>
              <p className="mt-2 text-lg font-semibold text-white md:text-xl">
                Оплата напрямую в банк
              </p>
              <p className="mt-1 text-sm italic leading-relaxed text-white/68">
                Банк платит нам агентское вознаграждение
              </p>
            </div>
          </div>
        </Reveal>

        <PriceFlow
          title="Вы оформляете в банке вместе с нами:"
          items={WHY_FREE_WITH_US}
          tone="positive"
          delay={0.1}
        />

        <PriceFlow
          title="Вы оформляете самостоятельно в банке:"
          items={WHY_FREE_WITHOUT_US}
          tone="negative"
          delay={0.14}
        />

        <Reveal delay={0.18}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/16 bg-[linear-gradient(160deg,rgba(4,22,37,0.62)_0%,rgba(9,53,84,0.48)_100%)] p-5 shadow-[0_24px_56px_rgba(4,22,37,0.28)] backdrop-blur-md md:p-7">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(165,215,70,0.12),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(251,83,82,0.1),transparent_28%)]"
              aria-hidden
            />

            <p className="relative mb-6 text-center text-sm leading-relaxed text-white/80 md:text-base">
              {WHY_FREE_SUMMARY.example}
            </p>

            <div className="relative grid gap-4 md:grid-cols-2 md:gap-5">
              <SummaryColumn
                title="Если оформлять с нами:"
                rows={WHY_FREE_SUMMARY.withUs}
                tone="positive"
              />
              <SummaryColumn
                title="Если оформлять без нас:"
                rows={WHY_FREE_SUMMARY.withoutUs}
                tone="negative"
              />
            </div>

            <p className="relative mt-6 flex gap-2 text-xs leading-relaxed text-white/55 md:text-[13px]">
              <SummaryStar className="mt-0.5 shrink-0 text-[#F8CE0A]" />
              <span>{WHY_FREE_SUMMARY.footnote}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
