import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dimosthenis Gkontolias | Software Engineer, AI Builder & Creator",
  description:
    "AUEB Informatics student, Quar.gr founder, TrackSights data intern, and Demos Vibes creator building web apps, AI/data pipelines, and Greek AI content.",
  metadataBase: new URL("https://dimosthenisgkontolias.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Dimosthenis Gkontolias",
    "software engineer",
    "AI engineer",
    "data engineering",
    "React developer",
    "AUEB Informatics",
    "Quar.gr",
    "Demos Vibes",
  ],
  authors: [{ name: "Dimosthenis Gkontolias", url: "https://dimosthenisgkontolias.com" }],
  creator: "Dimosthenis Gkontolias",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Dimosthenis Gkontolias",
    description:
      "Software engineer behind Quar.gr, TrackSights data work, DataViz, and the Greek AI creator channel Demos Vibes.",
    url: "https://dimosthenisgkontolias.com",
    siteName: "Dimosthenis Gkontolias",
    images: ["/images/profile.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimosthenis Gkontolias | Software Engineer, AI Builder & Creator",
    description:
      "Portfolio of Dimosthenis Gkontolias: Quar.gr, TrackSights data work, DataViz, Demos Vibes, and selected AI/data projects.",
    creator: "@demosvibes",
    images: ["/images/profile.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/icon.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <body
        className="min-h-screen bg-background text-foreground antialiased"
      >
        <SmoothScroll />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

