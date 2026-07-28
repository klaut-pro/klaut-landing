import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
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
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
