"use client";

import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { COMPLEX_CASES } from "@/lib/site-content";

export function ComplexCasesSection() {
  return (
    <SectionShell
      background={{
        src: "/prof-p/background-screen-any2.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Разрешим любые сложные вопросы"
            subtitle="Поможем, даже если:"
          />
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLEX_CASES.map((item, index) => {
            const isLast = index === COMPLEX_CASES.length - 1;

            return (
              <Reveal
                key={item}
                delay={index * 0.04}
                className={isLast ? "lg:col-start-2" : undefined}
              >
                <div className="flex items-start gap-3 rounded-2xl border border-(--border-subtle) bg-(--surface-0) p-4 transition-colors hover:border-(--cta-500)/30">
                  <CheckCircle2 className="text-cta mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm text-(--text-secondary)">{item}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
