"use client";

import "./globals.scss";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          type="image/x-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        {/* Meta tags SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="GlycoWatch est une application innovante qui aide les personnes atteintes de diabète à suivre leur glycémie et leur insuline. Visualisez vos données, générez des rapports PDF et profitez d'une interface intuitive pour une gestion simplifiée."
        />
        <meta
          name="keywords"
          content="suivi diabète, glycémie, insuline, application santé, gestion glycémie, application PWA, rapport glycémie, outils diabétiques"
        />
        <meta name="author" content="GlycoWatch Team" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="GlycoWatch - Suivi de glycémie et d'insuline"
        />
        <meta
          property="og:description"
          content="Découvrez GlycoWatch, l'application qui facilite la gestion quotidienne du diabète grâce à un suivi précis de votre glycémie et de vos doses d'insuline."
        />
        <meta
          property="og:image"
          content="https://www.glycowatch.fr/android-chrome-512x512.png"
        />
        <meta property="og:url" content="https://www.glycowatch.fr/" />
        <meta property="og:site_name" content="GlycoWatch" />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="GlycoWatch - Suivi de glycémie et d'insuline"
        />
        <meta
          name="twitter:description"
          content="L'application GlycoWatch est là pour simplifier la gestion du diabète. Suivez vos données, générez des rapports et profitez d'une interface optimisée."
        />
        <meta
          name="twitter:image"
          content="https://www.glycowatch.fr/android-chrome-512x512.png"
        />
        <meta name="twitter:site" content="@GlycoWatch" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.glycowatch.fr/" />

        <title>GlycoWatch - Suivi de glycémie et d&apos;insuline</title>
      </head>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Footer />{" "}
      </body>
    </html>
  );
}
