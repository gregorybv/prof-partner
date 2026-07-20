import { Reveal } from "@/components/animations/reveal";
import { CallbackLeadForm } from "@/components/forms/callback-lead-form";
import { SectionBackground } from "@/components/ui/section-background";
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
    <SectionShell
      muted={muted}
      background={{
        src: "/prof-p/callback-cta-section-bg-unsplash.jpg",
        overlay: "medium",
      }}
    >
      <Reveal variant="tilt">
        <div className="callback-cta-card group relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/20 p-8 text-white shadow-(--shadow-lg) transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-premium) hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.22)] md:p-10">
          <SectionBackground
            src="/prof-p/callback-cta-bg.jpg"
            overlay="brand"
            className="rounded-3xl"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="relative">
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide md:text-3xl">
              Нет времени Разбираться?
            </h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-(--cta-300)">
              ОБЪЯСНИМ, СОГЛАСУЕМ СКИДКУ И БЫСТРО ОФОРМИМ
            </p>
            <div className="mt-6 rounded-2xl bg-(--surface-0) p-6 text-(--text-primary)">
              <CallbackLeadForm formName={formName} />
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
