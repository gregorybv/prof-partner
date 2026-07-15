"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { LEGAL_LINKS } from "@/lib/site-content";

const STORAGE_KEY = "prof-p-cookie-consent";

function subscribe() {
  return () => {};
}

function getStoredConsent() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerConsent() {
  return "ssr";
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getStoredConsent, getServerConsent);
  const [dismissed, setDismissed] = useState(false);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setDismissed(true);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setDismissed(true);
  };

  if (stored === "ssr" || stored !== null || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[var(--z-sticky-cta)] mx-auto max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-4 shadow-[var(--shadow-lg)] md:bottom-6 md:left-6 md:right-auto">
      <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
        Сайт собирает cookies. Продолжая его использование, Вы принимаете{" "}
        <a href={LEGAL_LINKS.privacy} className="text-[var(--accent-500)] hover:underline">
          политику конфиденциальности
        </a>{" "}
        сайта.
      </p>
      <div className="mt-3 flex gap-2">
        <Button type="button" size="sm" onClick={accept}>
          Принять
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={decline}>
          Отклонить
        </Button>
      </div>
    </div>
  );
}
