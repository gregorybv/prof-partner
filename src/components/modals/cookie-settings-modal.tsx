"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/integrations/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import {
  COOKIE_CATEGORIES,
  DEFAULT_COOKIE_PREFERENCES,
  type CookieCategory,
  type CookiePreferences,
} from "@/lib/cookie-preferences";
import { LEGAL_LINKS } from "@/lib/site-content";

export function CookieSettingsModal() {
  const {
    settingsOpen,
    closeSettings,
    preferences,
    acceptAll,
    acceptNecessaryOnly,
    savePreferences,
  } = useCookieConsent();
  const [draft, setDraft] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    if (!settingsOpen) return;
    setDraft(preferences ?? DEFAULT_COOKIE_PREFERENCES);
  }, [settingsOpen, preferences]);

  const toggleCategory = (category: CookieCategory, checked: boolean) => {
    setDraft((current) => ({ ...current, [category]: checked }));
  };

  return (
    <Dialog
      open={settingsOpen}
      onClose={closeSettings}
      title="Настройки cookie"
      className="max-w-2xl"
    >
      <p className="text-sm leading-relaxed text-(--text-secondary)">
        Мы используем cookie для корректной работы сайта, аналитики и маркетинговых инструментов.
      </p>

      <div className="mt-5 space-y-3">
        {COOKIE_CATEGORIES.map((category) => {
          const isRequired = category.required === true;
          const isChecked =
            isRequired || (category.id !== "necessary" && draft[category.id as CookieCategory]);

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-(--border-subtle) bg-(--surface-1) p-4"
            >
              <Checkbox
                checked={isChecked}
                disabled={isRequired}
                onChange={(event) => {
                  if (category.id === "necessary") return;
                  toggleCategory(category.id, event.target.checked);
                }}
                label={
                  <span>
                    <span className="block font-medium text-(--text-primary)">
                      {category.title}
                      {isRequired && (
                        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">
                          Всегда активны
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-(--text-secondary)">
                      {category.description}
                    </span>
                  </span>
                }
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button type="button" className="sm:flex-1" onClick={acceptAll}>
          Принять все
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="sm:flex-1"
          onClick={acceptNecessaryOnly}
        >
          Только обязательные
        </Button>
        <Button
          type="button"
          variant="outline"
          className="sm:flex-1"
          onClick={() => savePreferences(draft)}
        >
          Сохранить выбор
        </Button>
      </div>
    </Dialog>
  );
}
