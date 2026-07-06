"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TEAM_MEMBERS, TEAM_STATS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function TeamSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const featured = TEAM_MEMBERS[0];
  const rest = TEAM_MEMBERS.slice(1);

  return (
    <SectionShell id="ourTeam">
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading title="Наша команда" subtitle="лучшие специалисты" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            <div className="flex shrink-0 flex-col items-center text-center">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-[var(--surface-0)] shadow-[var(--shadow-card)] ring-2 ring-[var(--brand-200)]">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                  sizes="176px"
                  priority
                />
              </div>
              <p className="mt-4 font-semibold text-[var(--text-primary)]">
                {featured.name}
              </p>
              <p className="mt-1 max-w-[200px] text-sm text-[var(--text-secondary)]">
                {featured.role}
              </p>
            </div>

            <div className="w-full min-w-0 flex-1">
              <div className="mb-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canPrev}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] transition-colors",
                    canPrev
                      ? "hover:bg-[var(--surface-2)]"
                      : "cursor-not-allowed opacity-40",
                  )}
                  aria-label="Предыдущий"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canNext}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] transition-colors",
                    canNext
                      ? "hover:bg-[var(--surface-2)]"
                      : "cursor-not-allowed opacity-40",
                  )}
                  aria-label="Следующий"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {rest.map((member) => (
                    <div
                      key={member.name}
                      className="min-w-0 flex-[0_0_75%] rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-xs)] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
                    >
                      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <p className="mt-3 text-center font-medium text-[var(--text-primary)]">
                        {member.name}
                      </p>
                      <p className="mt-1 text-center text-xs leading-snug text-[var(--text-secondary)]">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] p-6 text-white md:p-8"
          >
            {TEAM_STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  {stat.prefix}
                </p>
                <p className="font-display mt-1 text-3xl md:text-4xl">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2} delay={i * 0.15} />
                  ) : (
                    "0"
                  )}
                </p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
