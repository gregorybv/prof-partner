"use client";

import { useLayoutEffect, useRef } from "react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { SERVICES } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const CARD_WIDTH =
  "w-full md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]";

export function ServicesSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const syncHeights = () => {
      const articles = container.querySelectorAll<HTMLElement>(
        "[data-service-card]",
      );
      if (articles.length === 0) return;

      articles.forEach((article) => {
        article.style.minHeight = "";
      });

      const maxHeight = Math.max(
        ...Array.from(articles).map(
          (article) => article.getBoundingClientRect().height,
        ),
      );

      articles.forEach((article) => {
        article.style.minHeight = `${maxHeight}px`;
      });
    };

    syncHeights();

    const observer = new ResizeObserver(syncHeights);
    observer.observe(container);
    container
      .querySelectorAll<HTMLElement>("[data-service-card]")
      .forEach((article) => observer.observe(article));

    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell
      background={{
        src: "/prof-p/background-any1.jpg",
        overlay: "medium",
      }}
    >
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Основные направления нашей деятельности"
            subtitle="ПОЛНЫЙ СПЕКТР ТЕНДЕРНЫХ УСЛУГ"
          />
        </Reveal>

        <div
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-4"
        >
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.06}
              className={cn(CARD_WIDTH, "h-full")}
            >
              <article
                data-service-card
                className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6 transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
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
