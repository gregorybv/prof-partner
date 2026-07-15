import { Reveal } from "@/components/animations/reveal";
import { CalculatorForm } from "@/components/forms/calculator-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function CalculatorSection() {
  return (
    <SectionShell id="kalkulyator">
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="Онлайн-калькулятор Независимой Банковской Гарантии"
            subtitle="СРАВНИТЕ ТАРИФЫ ПО 54 БАНКАМ"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <CalculatorForm />
        </Reveal>
      </div>
    </SectionShell>
  );
}
