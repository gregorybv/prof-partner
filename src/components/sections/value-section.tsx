"use client";

import { TrendingDown, Zap, Target } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { VALUE_PROPS } from "@/lib/site-content";

const ICONS = [TrendingDown, Zap, Target] as const;

export function ValueSection() {
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
            title="Обращение в банк через нас"
            subtitle="Дешевле, быстрее и результативнее"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((prop, index) => {
            const Icon = ICONS[index] ?? Target;
            return (
              <Reveal key={prop.title} delay={index * 0.1}>
                <article className="group relative overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--surface-0) p-8 shadow-(--shadow-xs) transition-all duration-(--duration-slow) hover:-translate-y-1 hover:shadow-(--shadow-card)">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-(--cta-300)/10 transition-transform duration-(--duration-slow) group-hover:scale-150" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-cta-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide text-(--cta-700)">
                        {prop.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-(--text-secondary)">
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
