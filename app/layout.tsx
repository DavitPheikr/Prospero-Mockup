import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Lato } from "next/font/google";

export const metadata: Metadata = {
  title: "Prospero Mockup",
  description: "Module 2",
};

// app/layout.tsx (if using App Router)
// or pages/_app.tsx (if using Pages Router)

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${lato.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

// to reference fonts in scss example
//body {
//  font-family: var(--font-roboto), var(--font-lato), sans-serif;
//}
