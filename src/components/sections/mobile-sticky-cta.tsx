"use client";

import Link from "next/link";
import { Phone, Calculator } from "lucide-react";
import { COMPANY } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { formatPhoneHref } from "@/lib/utils";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky-cta)] flex gap-2 border-t border-[var(--border-subtle)] bg-[var(--surface-glass)] p-3 backdrop-blur-xl md:hidden">
      <a
        href={formatPhoneHref(COMPANY.phoneTollFree)}
        onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
        className="cta-surface flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium"
      >
        <Phone className="h-4 w-4" />
        Позвонить
      </a>
      <Link
        href="#kalkulyator"
        onClick={() => reachGoal(METRIKA_GOALS.CALCULATOR_BTN)}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-0)] py-3 text-sm font-medium"
      >
        <Calculator className="h-4 w-4" />
        Калькулятор
      </Link>
    </div>
  );
}
