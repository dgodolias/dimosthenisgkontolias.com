import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dimosthenis Gkontolias | Software Engineer",
  description: "Portfolio of Dimosthenis Gkontolias, a Software Engineer and Informatics student based in Athens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased bg-obsidian text-slate`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

