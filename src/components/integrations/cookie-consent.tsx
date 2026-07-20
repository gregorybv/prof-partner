"use client";

import { useCookieConsent } from "@/components/integrations/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { LEGAL_LINKS } from "@/lib/site-content";

export function CookieConsent() {
  const { preferences, acceptAll, acceptNecessaryOnly, openSettings } = useCookieConsent();
  const visible = preferences === null;

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className="fixed bottom-20 left-4 right-4 z-(--z-cookie-consent) mx-auto max-w-xl rounded-2xl border border-(--border-subtle) bg-(--surface-0) p-4 shadow-(--shadow-lg) md:bottom-6 md:left-6 md:right-auto"
    >
      <p className="text-xs leading-relaxed text-(--text-secondary)">
        Сайт собирает cookies. Продолжая его использование, Вы принимаете{" "}
        <a href={LEGAL_LINKS.privacy} className="text-(--accent-500) hover:underline">
          политику конфиденциальности
        </a>{" "}
        сайта.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={acceptAll}>
          Принять все
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={acceptNecessaryOnly}>
          Только обязательные
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={openSettings}>
          Настроить
        </Button>
      </div>
    </div>
  );
}
