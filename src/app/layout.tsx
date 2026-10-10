import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-alpha-sage-21.vercel.app"),
  title: "Krishna Kumar Jha — AI, ML & Full-Stack Engineer",
  description:
    "I build AI and machine-learning systems, and the backends that put them in production. RAG, computer vision, ML pipelines and full-stack services.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "RAG",
    "Full-Stack Developer",
    "Computer Vision",
    "Backend Developer",
    "YOLOv8",
    "Spring Boot",
    "Python",
  ],
  authors: [{ name: "Krishna Kumar Jha" }],
  openGraph: {
    title: "Krishna Kumar Jha — AI, ML & Full-Stack Engineer",
    description:
      "I build AI and machine-learning systems, and the backends that put them in production.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Krishna Kumar Jha — AI, ML & Full-Stack Engineer",
    description:
      "I build AI and machine-learning systems, and the backends that put them in production.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#131210" },
  ],
};

// Applies a saved theme before first paint so there's no light/dark flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
