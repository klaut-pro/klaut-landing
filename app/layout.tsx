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
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klaut.pro"),
  title: {
    default: "klaut.pro — Die Service-Schicht für autonome Agenten",
    template: "%s — klaut.pro",
  },
  description:
    "klaut.pro gibt Agenten Mail, Secrets, Books, Search, Database, Storage und Literature unter einer Identity. Early access Waitlist.",
  openGraph: {
    title: "klaut.pro — Die Service-Schicht für autonome Agenten",
    description:
      "Mail, Secrets, Books, Search, Database, Storage und Literature unter einer Identity. Gebaut für Schwärme in Produktion.",
    url: "https://klaut.pro",
    siteName: "klaut.pro",
    locale: "de_DE",
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
    <html lang="de">
      <body className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
