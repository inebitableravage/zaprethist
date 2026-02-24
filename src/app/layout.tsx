import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const instrumentSerif = Instrument_Serif({ weight: ["400"], style: ["italic"], subsets: ["latin"], variable: "--font-instrument-serif" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin", "cyrillic"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "ЗАПРЕТНАЯ ИСТОРИЯ | ИИ-Анимация",
  description: "Мастер-класс по созданию ИИ-анимационных видео, которые набирают сотни тысяч и миллионы просмотров.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${inter.variable} ${firaCode.variable}`}>
      <body className="antialiased min-h-screen relative font-sans text-ghost bg-deep-void">
        {/* Global Noise Overlay */}
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04]">
          <svg className="absolute inset-0 w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" fill="transparent" />
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {children}
      </body>
    </html>
  );
}
