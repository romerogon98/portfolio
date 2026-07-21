import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import SiteCursor from "@/components/SiteCursor";
import Noise from "@/components/Noise";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gonzalo Romero — UX/UI Designer & No-Code Developer",
  description:
    "Portfolio of Gonzalo Romero, UX/UI Designer and No-Code Developer based in Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        <SiteCursor />
        <Noise />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
