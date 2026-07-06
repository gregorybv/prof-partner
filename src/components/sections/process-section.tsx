"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import {
  PROCESS_FOOTNOTE,
  PROCESS_STEPS,
} from "@/lib/site-content";

export function ProcessSection() {
  return (
    <SectionShell muted>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Схема работы"
            subtitle="Как мы работаем на каждом этапе"
          />
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--brand-600)] via-[var(--accent-500)] to-transparent md:left-1/2 md:block md:-translate-x-px" />

          <div className="flex flex-col gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08}>
                <motion.div
                  className="relative grid items-center gap-4 md:grid-cols-2 md:gap-8"
                  initial={false}
                >
                  <div
                    className={`flex ${index % 2 === 0 ? "md:justify-end md:pr-12" : "md:col-start-2 md:pl-12"}`}
                  >
                    <article className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-xs)] transition-shadow hover:shadow-[var(--shadow-md)]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-700)] text-sm font-bold text-white">
                          {step.step}
                        </span>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">
                            {step.title}
                          </p>
                          <p className="text-xs text-[var(--accent-500)]">
                            {step.duration}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div
                    className={`hidden md:block ${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}
                  />

                  <div className="absolute left-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--surface-0)] bg-[var(--accent-500)] shadow-[var(--shadow-glow)] md:left-1/2 md:block" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="text-center text-sm leading-relaxed text-[var(--text-muted)]">
            {PROCESS_FOOTNOTE}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-start gap-4 rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-5">
            <Image
              src="/prof-p/warning.png"
              alt="warning"
              width={40}
              height={40}
              className="shrink-0"
            />
            <p className="text-sm text-[var(--text-secondary)]">
              Выдадим гарантию за{" "}
              <strong className="text-[var(--text-primary)]">45 минут</strong>{" "}
              при соблюдении всех условий и требований.
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
