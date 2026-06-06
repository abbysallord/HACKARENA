import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import DockNav from "@/components/ui/DockNav";
import SmoothScroll from "@/components/ui/SmoothScroll";

import Footer from "@/components/sections/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "HackArena | Premium Web Agency",
  description: "High-performance, mobile-first web agency landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScroll>
          <NoiseOverlay />
          {children}
          <Footer />
          <DockNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
