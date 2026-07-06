"use client";

import { TrendingDown, Zap, Target } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { VALUE_PROPS } from "@/lib/site-content";

const ICONS = [TrendingDown, Zap, Target] as const;

export function ValueSection() {
  return (
    <SectionShell muted>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Обращение в банк через нас"
            subtitle="Дешевле, быстрее и результативнее"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((prop, index) => {
            const Icon = ICONS[index] ?? Target;
            return (
              <Reveal key={prop.title} delay={index * 0.1}>
                <article className="group relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-8 shadow-[var(--shadow-xs)] transition-all duration-[var(--duration-slow)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--accent-500)]/5 transition-transform duration-[var(--duration-slow)] group-hover:scale-150" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-700)] text-white shadow-[var(--shadow-sm)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-2xl text-[var(--brand-600)]">
                      {prop.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {prop.description}
                    </p>
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
