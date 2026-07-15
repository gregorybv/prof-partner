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

const COLLAGE_LAYOUT = [
  { x: "16%", y: "14%", width: "15%", rotate: "-4deg" },
  { x: "27%", y: "25%", width: "10%", rotate: "3deg" },
  { x: "38%", y: "16%", width: "14%", rotate: "-2deg" },
  { x: "51%", y: "23%", width: "13%", rotate: "4deg" },
  { x: "64%", y: "17%", width: "14%", rotate: "-3deg" },
  { x: "78%", y: "24%", width: "12%", rotate: "2deg" },
  { x: "22%", y: "40%", width: "13%", rotate: "2deg" },
  { x: "36%", y: "46%", width: "16%", rotate: "-3deg" },
  { x: "50%", y: "42%", width: "12%", rotate: "1deg" },
  { x: "64%", y: "47%", width: "14%", rotate: "-4deg" },
  { x: "79%", y: "40%", width: "15%", rotate: "3deg" },
  { x: "20%", y: "66%", width: "12%", rotate: "-2deg" },
  { x: "32%", y: "71%", width: "11%", rotate: "4deg" },
  { x: "45%", y: "66%", width: "15%", rotate: "-3deg" },
  { x: "60%", y: "72%", width: "12%", rotate: "3deg" },
  { x: "73%", y: "67%", width: "14%", rotate: "-2deg" },
  { x: "86%", y: "73%", width: "11%", rotate: "2deg" },
] as const;

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getHoverShiftY = (y: string) => {
    const yValue = Number.parseInt(y, 10);
    if (yValue <= 28) return "24%";
    if (yValue <= 48) return "10%";
    return "0%";
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <SectionShell
      id="otzyvy"
      background={{
        src: "/prof-p/testimonials-bg-unsplash.jpg",
        overlay: "medium",
        className:
          "before:absolute before:inset-x-0 before:top-0 before:h-20 before:bg-gradient-to-b before:from-[var(--surface-0)] before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-gradient-to-t after:from-[var(--surface-0)] after:to-transparent",
      }}
    >
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Отзывы и благодарности"
            subtitle='клиентов компании «Профессиональный Партнёр»'
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative md:hidden">
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
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === selectedIndex
                      ? "w-6 bg-cta-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                      : "w-1.5 bg-[var(--border-strong)]",
                  )}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative hidden min-h-[620px] md:block">
            <div className="relative mx-auto h-[560px] w-full max-w-[1120px]">
              {TESTIMONIALS.slice(0, COLLAGE_LAYOUT.length).map((item, index) => {
                const layout = COLLAGE_LAYOUT[index];
                const isHovered = hoveredIndex === index;
                const hoverShiftY = isHovered ? getHoverShiftY(layout.y) : "0%";
                return (
                  <button
                    key={`${item.full}-${index}`}
                    type="button"
                    onClick={() => setLightbox({ src: item.full, alt: item.alt })}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                    className="absolute overflow-hidden rounded-sm border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      top: layout.y,
                      left: layout.x,
                      width: layout.width,
                      zIndex: isHovered ? 30 : 1,
                      transform: `translate(-50%, -50%) translateY(${hoverShiftY}) rotate(${layout.rotate}) scale(${isHovered ? 2.1 : 1})`,
                    }}
                  >
                    <div className="relative aspect-[210/297] w-full">
                      <Image
                        src={item.full}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 70vw, (max-width: 1280px) 38vw, 32vw"
                        quality={100}
                      />
                    </div>
                  </button>
                );
              })}
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
