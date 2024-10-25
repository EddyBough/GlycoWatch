"use client";

import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Footer />{" "}
      </body>
    </html>
  );
}
