"use client";

import "./globals.css";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-teal-500/50">
      <Head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/favicon-23x32.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </Head>
      <body className="h-full text-white">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
