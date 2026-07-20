"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ALL_COOKIE_PREFERENCES,
  COOKIE_CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  loadCookiePreferences,
  saveCookiePreferences,
  subscribeCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookie-preferences";

type CookieConsentContextValue = {
  preferences: CookiePreferences | null;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);
let lastRawSnapshot: string | null | undefined;
let lastPreferencesSnapshot: CookiePreferences | null = null;

function getCookiePreferencesSnapshot(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (lastRawSnapshot !== undefined && raw === lastRawSnapshot) {
    return lastPreferencesSnapshot;
  }

  lastRawSnapshot = raw;
  lastPreferencesSnapshot = loadCookiePreferences();
  return lastPreferencesSnapshot;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const preferences = useSyncExternalStore(
    (onStoreChange) => subscribeCookiePreferences(() => onStoreChange()),
    getCookiePreferencesSnapshot,
    () => null,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const persist = useCallback((next: CookiePreferences) => {
    saveCookiePreferences(next);
    setSettingsOpen(false);
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const acceptAll = useCallback(() => persist({ ...ALL_COOKIE_PREFERENCES }), [persist]);
  const acceptNecessaryOnly = useCallback(
    () => persist({ ...DEFAULT_COOKIE_PREFERENCES }),
    [persist],
  );
  const savePreferences = useCallback(
    (next: CookiePreferences) => persist(next),
    [persist],
  );

  const value = useMemo(
    () => ({
      preferences,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessaryOnly,
      savePreferences,
    }),
    [
      preferences,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessaryOnly,
      savePreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
