"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ALL_COOKIE_PREFERENCES,
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

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPreferences(loadCookiePreferences());
    setHydrated(true);
    return subscribeCookiePreferences(setPreferences);
  }, []);

  const persist = useCallback((next: CookiePreferences) => {
    saveCookiePreferences(next);
    setPreferences(next);
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
      preferences: hydrated ? preferences : null,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessaryOnly,
      savePreferences,
    }),
    [
      hydrated,
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
