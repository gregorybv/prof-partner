"use client";

import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { useModals } from "@/components/modals/modal-provider";
import { COMPANY } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { formatPhoneHref } from "@/lib/utils";

export function MobileStickyCta() {
  const { openGuarantee } = useModals();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-(--z-sticky-cta) flex gap-2 border-t border-(--border-subtle) bg-(--surface-glass) p-3 backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() =>
          openGuarantee({
            fz: "",
            fzLabel: "ЗАЯВКА НА ВЫПУСК ГАРАНТИИ",
          })
        }
        className="cta-surface flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wide"
      >
        <FileText className="h-4 w-4" />
        Заявка
      </button>
      <a
        href={formatPhoneHref(COMPANY.phoneTollFree)}
        onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-(--border-default) bg-(--surface-0) py-3 text-sm font-semibold"
      >
        <Phone className="h-4 w-4" />
        Позвонить
      </a>
      <Link
        href="#avto-podbor"
        onClick={() => reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN)}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-(--cta-500)/30 bg-(--cta-500)/10 py-3 text-sm font-semibold text-(--cta-700)"
      >
        Подбор
      </Link>
    </div>
  );
}
