import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klaut.pro"),
  title: {
    default: "klaut.pro — The service layer for autonomous agents",
    template: "%s — klaut.pro",
  },
  description:
    "klaut.pro gives agents Mail, Secrets, Books, Search, Database, Storage, and Literature under one identity. Early access waitlist.",
  openGraph: {
    title: "klaut.pro — The service layer for autonomous agents",
    description:
      "Mail, Secrets, Books, Search, Database, Storage, and Literature under one identity. Built for swarms in production.",
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
      <body className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
