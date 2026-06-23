import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna Kumar Jha | Machine Learning Engineer & Backend Developer",
  description:
    "Building production-ready AI systems, computer vision solutions, and scalable backend platforms. Machine Learning Engineer, Computer Vision Engineer, and Backend Developer.",
  keywords: [
    "Machine Learning Engineer",
    "Computer Vision",
    "Backend Developer",
    "Python",
    "Spring Boot",
    "YOLOv8",
    "AI Engineer",
    "Software Engineer",
  ],
  authors: [{ name: "Krishna Kumar Jha" }],
  openGraph: {
    title: "Krishna Kumar Jha | ML Engineer & Backend Developer",
    description:
      "Building production-ready AI systems, computer vision solutions, and scalable backend platforms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Kumar Jha | ML Engineer",
    description:
      "Building production-ready AI systems and scalable backend platforms.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
