import { Reveal } from "@/components/animations/reveal";
import { AutoSelectionForm } from "@/components/forms/auto-selection-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function AutoSelectionSection() {
  return (
    <SectionShell id="avto-podbor" muted atmosphere="tech">
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal variant="blur">
          <SectionHeading
            title="ОНЛАЙН-АВТОПОДБОР БАНКА"
            subtitle="ПОДБОР БАНКА ПОД КОНТРАКТ С УЧЁТОМ СОСТОЯНИЯ ВАШЕЙ КОМПАНИИ"
          />
        </Reveal>
        <Reveal delay={0.1} variant="scale">
          <AutoSelectionForm />
        </Reveal>
      </div>
    </SectionShell>
  );
}
