"use client";

import Image from "next/image";
import {
  Banknote,
  Briefcase,
  Gavel,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { useModals } from "@/components/modals/modal-provider";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { GUARANTEE_TYPES } from "@/lib/site-content";

const GUARANTEE_ITEM_ICONS: Record<string, LucideIcon> = {
  "участия в тендере": Gavel,
  "исполнения контракта": Briefcase,
  "гарантийных обязательств": Handshake,
  "возврата аванса": Banknote,
};

export function GuaranteeTypesSection() {
  const { openGuarantee } = useModals();

  return (
    <SectionShell>
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Виды гарантий"
            subtitle="Поможем согласовать и получить гарантии по всем типам обеспечения"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {GUARANTEE_TYPES.map((type, index) => (
            <Reveal key={type.id} delay={index * 0.08}>
              <article className="group relative flex min-h-99 flex-col bg-size-[100%_100%] bg-center bg-no-repeat px-7.5 pb-6 pt-10 transition-transform duration-(--duration-base) hover:-translate-y-1 bg-[url('/prof-p/background-type.png')]">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide text-(--brand-900)">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm text-(--text-primary)">
                  Гарантии на обеспечение:
                </p>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5 pb-24 text-sm text-(--text-primary)">
                  {type.items.map((item) => {
                    const Icon = GUARANTEE_ITEM_ICONS[item];
                    return (
                      <li key={item} className="flex items-start gap-2.5">
                        {Icon ? (
                          <Icon className="text-cta mt-0.5 h-5 w-5 shrink-0" />
                        ) : null}
                        {item}
                      </li>
                    );
                  })}
                </ul>
                <div className="absolute bottom-7.25 left-7.5 right-7.5 flex items-end justify-between gap-4">
                  <Button
                    className="z-10 shrink px-4"
                    size="sm"
                    type="button"
                    onClick={() =>
                      openGuarantee({
                        fz: type.title,
                        fzLabel: `ЗАЯВКА НА ВЫПУСК ГАРАНТИИ по ${type.title}`,
                      })
                    }
                  >
                    Оставить заявку
                  </Button>
                  <Image
                    src="/prof-p/guarantee-stamp.png"
                    alt=""
                    width={70}
                    height={70}
                    className="pointer-events-none z-0 h-15 w-15 shrink-0 object-contain sm:h-17.5 sm:w-17.5"
                    aria-hidden
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
