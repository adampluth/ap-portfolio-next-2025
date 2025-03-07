"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SwirlBackground from "@/components/SwirlBackground";
import PageTransition from "./PageTransition";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative h-full min-h-screen text-white overflow-hidden">
      {/* Only show SwirlBackground on the front page */}
      {pathname === "/" && (
        <div className="fixed inset-0 -z-10 w-full h-full">
          <SwirlBackground />
        </div>
      )}

      <Header />

      <main className="relative flex flex-col p-10 bg-transparent z-20">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
