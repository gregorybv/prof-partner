"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { CertificateCard, Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { CERTIFICATES } from "@/lib/site-content";

const INITIAL_VISIBLE = 10;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

export function CertificatesSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const visibleCerts = CERTIFICATES.slice(0, visibleCount);
  const hasMore = visibleCount < CERTIFICATES.length;

  const handleOpen = async (
    cert: (typeof CERTIFICATES)[number],
    index: number,
  ) => {
    setLoadingIndex(index);
    try {
      await preloadImage(cert.full);
      setLightbox({ src: cert.full, alt: cert.bank });
    } catch {
      setLightbox({ src: cert.full, alt: cert.bank });
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <SectionShell
      id="sertifikaty"
      background={{
        src: "/prof-p/modern-business-building-with-glass-wall-from-empty-floor.jpg",
        overlay: "medium",
        position: "bottom",
      }}
    >
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Сертификаты и Дипломы"
            subtitle="ОТ наших банков-Партнёров"
          />
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4">
          {visibleCerts.map((cert, index) => (
            <Reveal
              key={`${cert.bank}-${index}`}
              delay={index * 0.04}
              className="h-full w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)]"
            >
              <CertificateCard
                bank={cert.bank}
                thumb={cert.thumb}
                full={cert.full}
                loading={loadingIndex === index}
                onOpen={() => handleOpen(cert, index)}
              />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal className="flex justify-center">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setVisibleCount(CERTIFICATES.length)}
            >
              Показать ещё
            </Button>
          </Reveal>
        )}
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
