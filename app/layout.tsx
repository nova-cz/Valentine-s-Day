import React from "react"
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora } from "next/font/google";

import "./globals.css";

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const _lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A special question for a special someone",
};

export const viewport: Viewport = {
  themeColor: "#c4534e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
