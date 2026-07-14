"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modal-provider";
import { resolveEmailVariant, type EmailCalcSession } from "@/lib/email-calc";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

export function AntibotCancelModal() {
  const {
    antibotCancelOpen,
    antibotSession,
    closeAntibotCancel,
    confirmAntibotClose,
    openEmailCalc,
  } = useModals();

  const openEmailFlow = () => {
    if (!antibotSession) return;
    reachGoal(METRIKA_GOALS.EMAIL_CALC_BTN);
    const session: EmailCalcSession = {
      variant: resolveEmailVariant(antibotSession.payload),
      source: antibotSession.context === "commerce" ? "commerce" : antibotSession.context,
      payload: antibotSession.payload,
    };
    closeAntibotCancel();
    confirmAntibotClose();
    openEmailCalc(session);
  };

  return (
    <Dialog
      open={antibotCancelOpen}
      onClose={closeAntibotCancel}
      title="ВНИМАНИЕ!"
      className="max-w-md"
    >
      <p className="text-center text-sm text-[var(--text-secondary)]">
        Вы уверены, что не хотите проходить проверку?
      </p>
      <p className="mt-3 text-center text-sm font-bold text-[var(--error)]">
        После закрытия формы, без прохождения проверки, таблица со всеми тарифами банков будет
        удалена!
      </p>
      <p className="mt-3 text-center text-sm text-[var(--success)]">
        ВЫ МОЖЕТЕ ТАКЖЕ ПОЛУЧИТЬ ТЕКУЩИЙ РАСЧЁТ НА СВОЮ ЭЛЕКТРОННУЮ ПОЧТУ БЕЗ КАКИХ-ЛИБО
        ПРОВЕРОК НА РОБОТА
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="secondary" className="flex-1" onClick={() => {
          reachGoal(METRIKA_GOALS.ANTIBOT_CANCEL);
          confirmAntibotClose();
        }}>
          Да, закрыть
        </Button>
        <Button type="button" className="flex-1" onClick={openEmailFlow}>
          Получить расчёт на почту
        </Button>
      </div>
    </Dialog>
  );
}
