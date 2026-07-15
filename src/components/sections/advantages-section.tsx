"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { ADVANTAGES } from "@/lib/site-content";

export function AdvantagesSection() {
  return (
    <SectionShell
      background={{
        src: "/prof-p/background-fourth-screen-new.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading title="Почему выбирают нас?" subtitle="10 наших преимуществ" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADVANTAGES.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="flex h-full flex-col rounded-2xl border border-(--border-subtle) bg-(--surface-0) p-5 transition-all hover:-translate-y-1 hover:shadow-(--shadow-card)">
                <span className="font-display text-3xl text-(--brand-600)">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-(--text-primary)">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-(--text-secondary)">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
