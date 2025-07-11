import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prospero Mockup",
  description: "Module 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
