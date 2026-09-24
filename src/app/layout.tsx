import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import SiteCursor from "@/components/SiteCursor";
import Noise from "@/components/Noise";
import SoundProvider from "@/components/SoundProvider";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gonzalo Romero — UX/UI Designer & No-Code Developer",
  description:
    "Portfolio of Gonzalo Romero, UX/UI Designer and No-Code Developer based in Germany.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider>
          <SmoothScroll />
          <SiteCursor />
          <Noise />
          <PageTransition />
          <SoundProvider>{children}</SoundProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
