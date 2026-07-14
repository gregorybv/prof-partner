import type { Metadata } from "next";
import { COMPANY, SITE_URL } from "./site-content";

const APPLE_TOUCH_ICONS = [
  { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
  { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
  { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
  { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
  { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
  { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
  { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
  { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
  { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
] as const;

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Профессиональный Партнёр: независимая банковская гарантия",
  description:
    "Независимая банковская гарантия от компании «Профессиональный Партнёр»",
  keywords: [
    "банковская гарантия",
    "независимая гарантия",
    "44-ФЗ",
    "223-ФЗ",
    "тендерное сопровождение",
    COMPANY.name,
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    locale: "ru_RU",
    url: SITE_URL,
    type: "website",
    title:
      "Независимая банковская гарантия от компании «Профессиональный Партнёр»",
    description:
      "Независимая банковская гарантия от компании «Профессиональный Партнёр»",
    images: [
      {
        url: `${SITE_URL}/img/logo_main.png`,
        width: 1200,
        height: 630,
        alt: COMPANY.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Независимая банковская гарантия от компании «Профессиональный Партнёр»",
    description:
      "Независимая банковская гарантия от компании «Профессиональный Партнёр»",
    images: [`${SITE_URL}/img/logo_main.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [...APPLE_TOUCH_ICONS],
    other: [
      {
        rel: "manifest",
        url: "/favicon/manifest.json",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Проф-П",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#315379",
    "msapplication-TileImage": "/favicon/ms-icon-144x144.png",
    "theme-color": "#315379",
  },
};

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo.png`,
    email: COMPANY.email,
    telephone: COMPANY.phoneTollFree,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Малая Ордынка 12, строение 3, офис 5",
      addressLocality: "Москва",
      postalCode: "119017",
      addressCountry: "RU",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "252",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
  };
}
