"use client";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { GUARANTEE_TYPES } from "@/lib/site-content";

export function GuaranteeTypesSection() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Виды гарантий"
            subtitle="Поможем согласовать и получить гарантии по всем типам обеспечения"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {GUARANTEE_TYPES.map((type, index) => (
            <Reveal key={type.id} delay={index * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-xs)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <h3 className="font-display text-2xl text-[var(--brand-600)]">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  Гарантии на обеспечение:
                </p>
                <ul className="mt-3 flex flex-1 flex-col gap-2 text-sm text-[var(--text-secondary)]">
                  {type.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-500)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" type="button">
                  Оставить заявку
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
