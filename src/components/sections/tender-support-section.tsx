"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TENDER_PLATFORMS, TENDER_SUPPORT } from "@/lib/site-content";

export function TenderSupportSection() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title={TENDER_SUPPORT.title}
            subtitle={TENDER_SUPPORT.subtitle}
          />
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              <p>{TENDER_SUPPORT.description}</p>
              <p>{TENDER_SUPPORT.description2}</p>
              <div className="relative mt-2 overflow-hidden rounded-2xl">
                <Image
                  src="/prof-p/block_kniga.png"
                  alt=""
                  width={600}
                  height={200}
                  className="h-auto w-full"
                />
              </div>
              <p className="whitespace-pre-line font-medium text-[var(--text-primary)]">
                {TENDER_SUPPORT.cta}
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
              <Image
                src="/prof-p/block_tender.png"
                alt="Изображение"
                width={600}
                height={400}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6">
            {TENDER_PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="flex h-16 w-28 items-center justify-center grayscale transition-all hover:grayscale-0"
              >
                <Image
                  src={platform.image}
                  alt={platform.name}
                  width={120}
                  height={80}
                  className="h-auto max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
