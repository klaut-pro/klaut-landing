import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
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
    <html lang="en" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
