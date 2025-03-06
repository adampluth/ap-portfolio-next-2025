"use client";
import Header from "@/components/Header";
import SwirlBackground from "@/components/SwirlBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full min-h-screen text-white">
      {/* Ensure SwirlBackground is full-page and behind everything */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <SwirlBackground />
      </div>
      
      <Header />
      
      {/* Ensure main does not block background */}
      <main className="relative p-10 bg-transparent" style={{ backfaceVisibility: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
