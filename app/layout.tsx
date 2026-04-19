import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AnimatedBackground } from "./components/animated-bg";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FakeGuard — Misleading News Detection",
  description:
    "Paste a news headline or article and see whether an NLP classifier flags it as likely misleading. Built by Vincent Nathanael as a live companion to a Coventry University dissertation on misleading-news detection.",
  authors: [{ name: "Vincent Nathanael" }],
  keywords: [
    "Fake News Detection",
    "Misleading News",
    "NLP",
    "BERT",
    "RoBERTa",
    "Machine Learning Demo",
    "Vincent Nathanael",
  ],
  openGraph: {
    title: "FakeGuard — Misleading News Detection",
    description:
      "Live NLP classifier that flags likely-misleading news text. Companion demo to a CS dissertation.",
    siteName: "FakeGuard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-ink">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
