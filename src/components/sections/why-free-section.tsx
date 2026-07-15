"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import {
  WHY_FREE_SUMMARY,
  WHY_FREE_WITHOUT_US,
  WHY_FREE_WITH_US,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

function PriceCard({
  amount,
  label,
  variant,
}: {
  amount: string;
  label: string;
  variant: "positive" | "negative";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all hover:-translate-y-0.5",
        variant === "positive"
          ? "border-(--success)/20 bg-(--success)/5"
          : "border-(--border-subtle) bg-(--surface-0)",
      )}
    >
      <p className="font-display text-xl text-(--text-primary) md:text-2xl">
        {amount}
      </p>
      <p className="mt-1 text-xs leading-snug text-(--text-secondary)">
        {label}
      </p>
    </div>
  );
}

export function WhyFreeSection() {
  return (
    <SectionShell
      id="price"
      background={{
        src: "/prof-p/background_zero.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-(--text-primary) md:text-5xl">
            Почему у нас бесплатно?
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto flex max-w-2xl items-center gap-6 rounded-3xl border border-(--border-subtle) bg-(--surface-0) p-8 shadow-(--shadow-sm)">
            <div className="font-display text-7xl text-(--brand-600) md:text-8xl">
              0
            </div>
            <div>
              <p className="font-semibold text-(--text-primary)">
                Стоимость наших услуг
              </p>
              <p className="mt-1 text-lg font-medium text-(--accent-500)">
                Для Вас мы работаем бесплатно!
              </p>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Вы платите банку напрямую по цене,
                <br />
                которую мы для Вас согласовали
              </p>
              <p className="mt-4 font-semibold text-(--text-primary)">
                Комиссия за оформление
              </p>
              <p className="text-sm text-(--text-secondary)">
                Оплата напрямую в банк
              </p>
              <p className="mt-1 text-sm text-(--text-muted)">
                Банк платит нам агентское вознаграждение
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-center text-sm font-bold uppercase tracking-wide text-(--success)">
            ВЫ ОФОРМЛЯЕТЕ В БАНКЕ ВМЕСТЕ С НАМИ:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_FREE_WITH_US.map((item) => (
              <PriceCard
                key={item.label}
                amount={item.amount}
                label={item.label}
                variant="positive"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-center text-sm font-bold uppercase tracking-wide text-(--error)">
            Вы оформляете самостоятельно в банке:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_FREE_WITHOUT_US.map((item) => (
              <PriceCard
                key={item.label}
                amount={item.amount}
                label={item.label}
                variant="negative"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-center text-sm text-(--text-muted)">
            {WHY_FREE_SUMMARY.example}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-(--success)/30 bg-(--success)/5 p-6">
              <p className="mb-3 font-semibold text-(--text-primary)">
                Если оформлять с нами:
              </p>
              <ul className="space-y-2 text-sm text-(--text-secondary)">
                {WHY_FREE_SUMMARY.withUs.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--success)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-(--border-subtle) bg-(--surface-0) p-6">
              <p className="mb-3 font-semibold text-(--text-primary)">
                Если оформлять без нас:
              </p>
              <ul className="space-y-2 text-sm text-(--text-secondary)">
                {WHY_FREE_SUMMARY.withoutUs.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--text-muted)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-(--text-muted)">
            {WHY_FREE_SUMMARY.footnote}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
