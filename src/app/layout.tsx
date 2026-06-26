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
    "Software engineer and final-year AUEB Informatics student building production web apps, AI/data systems, and Greek AI education content.",
  metadataBase: new URL("https://dimosthenisgkontolias.com"),
  openGraph: {
    title: "Dimosthenis Gkontolias",
    description:
      "Production-minded software engineer, AI builder, founder of Quar.gr, and creator behind Demos Vibes.",
    url: "https://dimosthenisgkontolias.com",
    siteName: "Dimosthenis Gkontolias",
    images: ["/images/profile.png"],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
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

