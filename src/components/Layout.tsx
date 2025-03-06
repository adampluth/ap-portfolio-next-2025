"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SwirlBackground from "@/components/SwirlBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative h-full min-h-screen text-white">
      {/* Only show SwirlBackground on the front page */}
      {pathname === "/" && (
        <div className="fixed inset-0 -z-10 w-full h-full">
          <SwirlBackground />
        </div>
      )}
      
      <Header />
      
      {/* Ensure main does not block background */}
      <main className="relative p-10 bg-transparent" style={{ backfaceVisibility: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
