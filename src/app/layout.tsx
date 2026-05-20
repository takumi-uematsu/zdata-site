import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { dmSans, notoJp, syne, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://z-data.io";

const SITE_NAME = "Z-Data";
const TITLE_DEFAULT = "Z-Data — ビジネスの脈動は、顧客の声から始まる";
const DESCRIPTION =
  "Zero Party Data Platform。顧客の声を波形として捉え、構造化データ＆AI生成アセットへ。BtoB企業のためのZPD × AI統合プラットフォーム。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Z-Data",
  },
  description: DESCRIPTION,
  keywords: [
    "Z-Data",
    "ゼットデータ",
    "Zero Party Data",
    "ゼロパーティデータ",
    "ZPD",
    "B2B SaaS",
    "BtoBマーケティング",
    "営業支援",
    "AI",
    "Genova",
  ],
  authors: [{ name: "Genova Inc." }],
  creator: "Genova Inc.",
  publisher: "Genova Inc.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: "顧客一人ひとりの声を、波形として捉える。",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Z-Data — Zero Party Data Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: "顧客の声を、波形として捉える。",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A1547" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1547" },
  ],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Z-Data",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Zero Party Data Platform for B2B",
  provider: {
    "@type": "Organization",
    name: "Genova Inc.",
    url: "https://genova.inc",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
    description: "PoCトライアル無料",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${dmSans.variable} ${notoJp.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans bg-deepNight text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-sm focus:bg-sunsetPink focus:px-3 focus:py-2 focus:text-deepNight"
        >
          メインコンテンツへスキップ
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <Analytics />
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
