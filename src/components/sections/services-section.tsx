"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { SERVICES } from "@/lib/site-content";

export function ServicesSection() {
  return (
    <SectionShell muted>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Основные направления нашей деятельности"
            subtitle="ПОЛНЫЙ СПЕКТР ТЕНДЕРНЫХ УСЛУГ"
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6 transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <h3 className="font-display text-xl text-[var(--brand-600)]">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.description}
                </p>
                <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent-500)] transition-all duration-[var(--duration-base)] group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
