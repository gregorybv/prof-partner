"use client";

import { useCookieConsent } from "@/components/integrations/cookie-consent-provider";
import { CallTouch } from "@/components/integrations/calltouch";
import { JivoChat } from "@/components/integrations/jivo-chat";
import { YandexMetrika } from "@/components/integrations/yandex-metrika";

export function ConditionalIntegrations() {
  const { preferences } = useCookieConsent();

  if (!preferences) return null;

  return (
    <>
      {preferences.analytics && <YandexMetrika />}
      {preferences.marketing && (
        <>
          <CallTouch />
          <JivoChat />
        </>
      )}
    </>
  );
}
