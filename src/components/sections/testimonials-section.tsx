"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TESTIMONIALS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <SectionShell id="otzyvy">
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Отзывы и благодарности"
            subtitle='клиентов компании «Профессиональный Партнёр»'
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="mb-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] hover:bg-[var(--surface-2)]"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] hover:bg-[var(--surface-2)]"
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {TESTIMONIALS.map((item, index) => (
                  <button
                    key={`${item.full}-${index}`}
                    type="button"
                    onClick={() => setLightbox({ src: item.full, alt: item.alt })}
                    className="min-w-0 flex-[0_0_70%] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] shadow-[var(--shadow-xs)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.thumb}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 70vw, 30vw"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === selectedIndex
                      ? "w-6 bg-[var(--brand-600)]"
                      : "w-1.5 bg-[var(--border-strong)]",
                  )}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {lightbox && (
        <Lightbox
          open
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </SectionShell>
  );
}
