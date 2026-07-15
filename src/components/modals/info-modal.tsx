"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modal-provider";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

export function InfoModal() {
  const { infoOpen, closeInfo } = useModals();

  const onClose = () => {
    reachGoal(METRIKA_GOALS.INFO_MODAL);
    closeInfo();
  };

  return (
    <Dialog open={infoOpen} onClose={onClose} title="ВНИМАНИЕ!">
      <div className="space-y-4 text-sm leading-relaxed text-(--text-secondary)">
        <p>
          Более низкая цена / ставка за гарантию, при оформлении в банке с нашей помощью не будет
          доступна при прямом обращении в банк, так как Вы не являетесь агентом.{" "}
          <strong>
            Специальные цены предоставляются банками только для своих партнёров — агентов (брокеров)
          </strong>
          , как и агентское вознаграждение, благодаря которому{" "}
          <strong>все наши услуги для Вас бесплатны</strong>.
        </p>
        <p>
          Наша компания <strong>помогает согласовывать гарантии на выгодных для наших клиентов условиях</strong>{" "}
          уже более 20 лет. Мы согласовали получение{" "}
          <strong>свыше 380 000 гарантий</strong> по всей России для более{" "}
          <strong>52 000 клиентов</strong>.
        </p>
        <p className="text-(--success)">
          СОГЛАСУЕМ И ОФОРМИМ ДЛЯ ВАС ГАРАНТИЮ ПОЛНОСТЬЮ ДИСТАНЦИОННО, БЕЗ ВАШЕГО ПОСЕЩЕНИЯ БАНКА И
          НАШЕГО ОФИСА. ОРИГИНАЛ ГАРАНТИИ ВЫШЛЕМ ЭКСПРЕСС-КУРЬЕРОМ В ЛЮБОЙ РЕГИОН.
        </p>
      </div>
      <Button type="button" className="mt-6 w-full" onClick={onClose}>
        МНЕ ВСЁ ПОНЯТНО
      </Button>
    </Dialog>
  );
}
