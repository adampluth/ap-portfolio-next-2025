"use client";

import "./globals.css";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-teal-500/10">
      <body className="h-full min-h-screen text-white">
        <PageTransition>
          <Layout>{children}</Layout>
        </PageTransition>
      </body>
    </html>
  );
}
