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
  metadataBase: new URL("https://hackarena.netlify.app"),
  title: {
    default: "HackArena | Premium Digital Product Agency",
    template: "%s | HackArena",
  },
  description: "Engineering cinematic digital platforms and immersive WebGL experiences for elite brands. We don't just build websites; we architect brutalist digital reality.",
  keywords: ["Web Design", "Digital Agency", "WebGL", "Next.js Portfolio", "Creative Engineering", "Frontend Development", "Brutalist Design", "HackArena", "web solutions for startups", "web solutions", "web development"],
  authors: [{ name: "HackArena Core Team" }],
  creator: "HackArena",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "HackArena | Engineering Cinematic Digital Platforms",
    description: "High-performance, mobile-first web agency platforms. Experience brutalist digital architecture.",
    siteName: "HackArena",
    images: [
      {
        url: "/projects/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "HackArena - Digital Product Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackArena | Digital Product Agency",
    description: "Engineering cinematic digital platforms for elite brands.",
    images: ["/projects/og-image.jpeg"],
  },
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
