import type { Metadata } from "next";
import { Syne, Outfit, Newsreader } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klaut.pro"),
  title: {
    default: "klaut.pro - One MCP. One bill for every agent tool.",
    template: "%s - klaut.pro",
  },
  description:
    "Connect agents to Secrets, Mail, Search, Database, Storage, Literature, and Writing through one MCP endpoint. One token balance for usage.",
  openGraph: {
    title: "klaut.pro - One MCP. One bill for every agent tool.",
    description:
      "One MCP endpoint for agent tools. Manage tools in one place. Pay from one token balance.",
    url: "https://klaut.pro",
    siteName: "klaut.pro",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://klaut.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${outfit.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  );
}
