import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

const APP_URL = process.env.APP_URL ?? "https://danana.com.np";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: "DANANA — World Cup Jerseys Nepal",
    template: "%s | DANANA",
  },
  description:
    "DANANA brings you the best World Cup jerseys in Nepal — official-style national team kits, replica football shirts, and fan wear. Shop online from Kathmandu with fast delivery across Nepal.",
  keywords: [
    "DANANA",
    "World Cup jersey Nepal",
    "buy World Cup jersey Nepal",
    "football jersey Nepal",
    "national team jersey Nepal",
    "replica football shirt Nepal",
    "FIFA World Cup kit Nepal",
    "football fan wear Nepal",
    "Kathmandu football jersey",
    "Nepal jersey shop",
    "England jersey Nepal",
    "football kit Nepal",
    "buy football shirt online Nepal",
    "World Cup 2026 jersey Nepal",
  ],
  authors: [{ name: "DANANA", url: APP_URL }],
  creator: "DANANA",
  publisher: "DANANA",
  category: "shopping",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_NP",
    url: APP_URL,
    siteName: "DANANA",
    title: "DANANA — World Cup Jerseys Nepal",
    description:
      "Shop World Cup jerseys, national team kits, and replica football shirts in Nepal. Fast delivery from Kathmandu. Official-style fan wear for every match day.",
    images: [
      {
        url: "/hero_banner.png",
        width: 1200,
        height: 630,
        alt: "DANANA — World Cup Jerseys Nepal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DANANA — World Cup Jerseys Nepal",
    description:
      "Shop World Cup jerseys, national team kits, and replica football shirts in Nepal. Fast delivery from Kathmandu. Official-style fan wear for every match day.",
    images: ["/hero_banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen text-black bg-white"
        suppressHydrationWarning
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
