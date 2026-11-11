import type { Metadata, Viewport } from "next";
import { Sofia_Sans_Extra_Condensed, Inter } from "next/font/google";
import "./globals.css";

const sofia = Sofia_Sans_Extra_Condensed({ subsets: ["latin", "cyrillic"], weight: ["700", "800"], variable: "--font-sofia" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

const title = "ЗАПРЕТНАЯ ИСТОРИЯ | ИИ-Анимация";
const description = "Курс «ИИ-режиссёр»: как в одиночку делать анимационные ИИ-ролики, от стиля и кадров до монтажа.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zaprethistory.ru"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Запретная История",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Запретная История: курс по ИИ-анимации" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0B0A0E" };

import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${sofia.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans text-text bg-bg">
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
