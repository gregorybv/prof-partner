"use client";

import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modal-provider";
import { resolveEmailVariant, type EmailCalcSession } from "@/lib/email-calc";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

type MaskedResultsBannerProps = {
  payload: Record<string, string>;
  source: EmailCalcSession["source"];
  onClear?: () => void;
};

export function MaskedResultsBanner({ payload, source, onClear }: MaskedResultsBannerProps) {
  const { openEmailCalc, openInfo } = useModals();

  return (
    <div className="rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-4 text-sm text-[var(--text-secondary)]">
      <p>
        Тарифы банков скрыты до прохождения проверки.{" "}
        <button
          type="button"
          className="font-medium text-[var(--accent-500)] hover:underline"
          onClick={() => {
            reachGoal(METRIKA_GOALS.EMAIL_CALC);
            openEmailCalc({
              variant: resolveEmailVariant(payload),
              source,
              payload,
            });
          }}
        >
          Получить расчёт на электронную почту
        </button>{" "}
        или{" "}
        <button
          type="button"
          className="font-medium text-[var(--accent-500)] hover:underline"
          onClick={() => {
            reachGoal(METRIKA_GOALS.INFO_MODAL);
            openInfo();
          }}
        >
          узнать подробнее
        </button>
        .
      </p>
      {onClear && (
        <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={onClear}>
          Скрыть таблицу
        </Button>
      )}
    </div>
  );
}
