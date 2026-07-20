import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import { ConditionalIntegrations } from "@/components/integrations/conditional-integrations";
import { CookieConsent } from "@/components/integrations/cookie-consent";
import { CookieConsentProvider } from "@/components/integrations/cookie-consent-provider";
import { SeoJsonLd } from "@/components/integrations/seo-json-ld";
import { AntibotCancelModal } from "@/components/modals/antibot-cancel-modal";
import { AntibotModal } from "@/components/modals/antibot-modal";
import { BankTableRequestModal } from "@/components/modals/bank-table-request-modal";
import { CookieSettingsModal } from "@/components/modals/cookie-settings-modal";
import { EmailCalcModal } from "@/components/modals/email-calc-modal";
import { GuaranteeRequestModal } from "@/components/modals/guarantee-request-modal";
import { InfoModal } from "@/components/modals/info-modal";
import { LimitModal } from "@/components/modals/limit-modal";
import { ModalProvider } from "@/components/modals/modal-provider";
import { SuccessModal } from "@/components/modals/success-modal";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { SITE_METADATA } from "@/lib/seo";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = SITE_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${roboto.variable} ${bebasNeue.variable} h-full`}>
      <head>
        <SeoJsonLd />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <CookieConsentProvider>
          <ModalProvider>
            <ScrollProgress />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
            <GuaranteeRequestModal />
            <LimitModal />
            <AntibotModal />
            <AntibotCancelModal />
            <InfoModal />
            <EmailCalcModal />
            <BankTableRequestModal />
            <SuccessModal />
            <MobileStickyCta />
          </ModalProvider>
          <CookieConsent />
          <CookieSettingsModal />
          <ConditionalIntegrations />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
