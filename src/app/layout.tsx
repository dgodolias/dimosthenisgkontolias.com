import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
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
  title: "Dimosthenis Gkontolias | AI Software Engineer",
  description:
    "AI Software Engineer and AUEB valedictorian building RAG products, production software, and cloud data systems. Explore TalkToGreekData.gr, Quar.gr, and selected work.",
  metadataBase: new URL("https://dimosthenisgkontolias.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  keywords: [
    "Dimosthenis Gkontolias",
    "AI Software Engineer",
    "AI engineer Greece",
    "software engineer Greece",
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
    title: "Dimosthenis Gkontolias | AI Software Engineer",
    description:
      "AI Software Engineer behind TalkToGreekData.gr, Quar.gr, TrackSights data work, and Demos Vibes.",
    url: "https://dimosthenisgkontolias.com",
    siteName: "Dimosthenis Gkontolias",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Dimosthenis Gkontolias portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimosthenis Gkontolias | AI Software Engineer",
    description:
      "RAG products, production software, cloud data systems, and selected work by Dimosthenis Gkontolias.",
    creator: "@demosvibes",
    images: ["/images/og-card.png"],
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
