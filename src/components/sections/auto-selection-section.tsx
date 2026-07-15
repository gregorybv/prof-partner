import { Reveal } from "@/components/animations/reveal";
import { AutoSelectionForm } from "@/components/forms/auto-selection-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function AutoSelectionSection() {
  return (
    <SectionShell id="avto-podbor" muted>
      <div className="flex flex-col gap-(--space-section-gap)">
        <Reveal>
          <SectionHeading
            title="ОНЛАЙН-АВТОПОДБОР БАНКА"
            subtitle="ПОДБОР БАНКА ПОД КОНТРАКТ С УЧЁТОМ СОСТОЯНИЯ ВАШЕЙ КОМПАНИИ"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <AutoSelectionForm />
        </Reveal>
      </div>
    </SectionShell>
  );
}
