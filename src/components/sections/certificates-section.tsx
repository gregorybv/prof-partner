"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { CertificateCard, Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { CERTIFICATES } from "@/lib/site-content";

const INITIAL_VISIBLE = 9;

export function CertificatesSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const visibleCerts = CERTIFICATES.slice(0, visibleCount);
  const hasMore = visibleCount < CERTIFICATES.length;

  return (
    <SectionShell id="sertifikaty">
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Сертификаты и Дипломы"
            subtitle="ОТ наших банков-Партнёров"
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleCerts.map((cert, index) => (
            <Reveal key={`${cert.bank}-${index}`} delay={index * 0.04}>
              <CertificateCard
                bank={cert.bank}
                thumb={cert.thumb}
                full={cert.full}
                onOpen={() =>
                  setLightbox({ src: cert.full, alt: cert.bank, caption: cert.bank })
                }
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
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </SectionShell>
  );
}
