import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import { JivoChat } from "@/components/integrations/jivo-chat";
import { SeoJsonLd } from "@/components/integrations/seo-json-ld";
import { YandexMetrika } from "@/components/integrations/yandex-metrika";
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <YandexMetrika />
        <JivoChat />
      </body>
    </html>
  );
}
