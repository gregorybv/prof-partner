"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { PRICING_TABLE } from "@/lib/site-content";

function PriceCell({ value }: { value: string }) {
  const parts = value.split(/(БЕСПЛАТНО)/);

  return (
    <span className="text-sm leading-relaxed">
      {parts.map((part, index) =>
        part === "БЕСПЛАТНО" ? (
          <strong
            key={index}
            className="font-extrabold uppercase tracking-wide text-[var(--cta-700)]"
          >
            {part}
          </strong>
        ) : (
          <span key={index} className="font-semibold text-[var(--text-primary)]">
            {part}
          </span>
        ),
      )}
    </span>
  );
}

export function PricingSection() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading
            title="Стоимость наших услуг"
            subtitle="Наша ценовая политика"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] shadow-[var(--shadow-sm)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-2)]">
                    <th className="px-5 py-4 font-semibold text-[var(--text-primary)]">
                      Перечень услуг по банковским гарантиям
                    </th>
                    <th className="px-5 py-4 font-semibold text-[var(--text-primary)]">
                      Стоимость услуг
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-[var(--border-subtle)] transition-colors last:border-0 hover:bg-[var(--surface-2)]/50"
                    >
                      <td className="px-5 py-4 leading-relaxed text-[var(--text-secondary)]">
                        {row.service}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <PriceCell value={row.price} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
