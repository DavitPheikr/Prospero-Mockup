import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Prospero Mockup",
  description: "Module 2",
};

// app/layout.tsx (if using App Router)
// or pages/_app.tsx (if using Pages Router)

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// to reference fonts in scss example
//body {
//  font-family: var(--font-inter), sans-serif;
//}
