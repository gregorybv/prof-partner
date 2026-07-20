export const COOKIE_CONSENT_STORAGE_KEY = "prof-p-cookie-consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export type CookieCategory = "analytics" | "marketing";

export type CookiePreferences = Record<CookieCategory, boolean>;

export type CookieCategoryInfo = {
  id: CookieCategory | "necessary";
  title: string;
  description: string;
  required?: boolean;
};

export const COOKIE_CATEGORIES: CookieCategoryInfo[] = [
  {
    id: "necessary",
    title: "Обязательные",
    description:
      "Нужны для работы сайта: безопасность, формы, сохранение настроек и сессии. Не могут быть отключены.",
    required: true,
  },
  {
    id: "analytics",
    title: "Аналитические",
    description: "Яндекс.Метрика помогает понять, как посетители используют сайт, и улучшать сервис.",
  },
  {
    id: "marketing",
    title: "Маркетинговые",
    description: "CallTouch и Jivo используются для обратной связи и оценки эффективности рекламы.",
  },
];

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  analytics: false,
  marketing: false,
};

export const ALL_COOKIE_PREFERENCES: CookiePreferences = {
  analytics: true,
  marketing: true,
};

export function hasStoredConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== null;
}

export function loadCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (!raw) return null;

  if (raw === "accepted") return { ...ALL_COOKIE_PREFERENCES };
  if (raw === "declined") return { ...DEFAULT_COOKIE_PREFERENCES };

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: preferences }),
  );
}

export function subscribeCookiePreferences(
  onChange: (preferences: CookiePreferences | null) => void,
) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
      onChange(loadCookiePreferences());
    }
  };

  const handleConsent = (event: Event) => {
    onChange((event as CustomEvent<CookiePreferences>).detail);
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(COOKIE_CONSENT_EVENT, handleConsent);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsent);
  };
}
