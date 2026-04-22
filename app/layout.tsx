import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
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

// Instrument Serif isn't a variable font — a single 400 weight is enough for
// the display headline and wordmark.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
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

// Runs synchronously in <head> before any paint — prevents flash-of-wrong-theme
// when a returning user has toggled to light mode. Dark is always the default.
const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
