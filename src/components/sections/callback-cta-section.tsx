import { Reveal } from "@/components/animations/reveal";
import { CallbackLeadForm } from "@/components/forms/callback-lead-form";
import { SectionShell } from "@/components/ui/section-shell";

type CallbackCtaSectionProps = {
  formName?: "ВРЕМЯ" | "РАСЧЕТ" | "КОМПАНИЯ";
  muted?: boolean;
};

export function CallbackCtaSection({
  formName = "ВРЕМЯ",
  muted = true,
}: CallbackCtaSectionProps) {
  return (
    <SectionShell muted={muted}>
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-800)] p-8 text-white shadow-[var(--shadow-lg)] md:p-10">
          <h3 className="font-display text-2xl md:text-3xl">Нет времени Разбираться?</h3>
          <p className="mt-2 text-sm uppercase tracking-wide text-white/80">
            ОБЪЯСНИМ, СОГЛАСУЕМ СКИДКУ И БЫСТРО ОФОРМИМ
          </p>
          <div className="mt-6 rounded-2xl bg-[var(--surface-0)] p-6 text-[var(--text-primary)]">
            <CallbackLeadForm formName={formName} />
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
