import "./globals.css";
import Layout from "@/components/Layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-teal-500/10">
      <body className="h-full min-h-screen text-white">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
