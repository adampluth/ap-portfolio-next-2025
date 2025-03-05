"use client";
import { useState } from "react";
import Image from "next/image";
import CyberpunkButton from "./CyberpunkButton";

export type GalleryItem = {
  pathThumb: string;
  pathLarge: string;
  alt: string;
};

export type GalleryProps = {
  projNumber: number;
  projTitle: string;
  projType: string;
  projRole: string;
  projSkills: string;
  projItems: GalleryItem[];
};

export default function Gallery({
  projNumber,
  projTitle,
  projType,
  projRole,
  projSkills,
  projItems,
}: GalleryProps) {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen snap-start flex flex-col md:flex-row">
      {/* LEFT COLUMN (1/4 width) */}
      <div className="left-column flex flex-col w-full md:w-1/4 p-2">
        {/* ====== Top Angled Shape (Fixed Height) ====== */}
        <div className="top-shape relative h-32">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff00ff" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00ffff" floodOpacity="1" />
              </filter>
            </defs>
            {/* Polygon angled at the top and right; bottom is straight */}
            <polygon
              points="0,0 85,0 100,15 100,100 0,100"
              fill="rgba(0, 0, 0, 0.8)"
              stroke="#ff00ff"
              strokeWidth="2"
              filter="url(#neonGlow)"
            />
          </svg>
          {/* Overlay your top content */}
          <div className="absolute inset-0 p-4 text-white flex flex-col justify-center">
            <span className="text-2xl font-bold">#{projNumber}</span>
            <h3 className="text-4xl font-bold mt-2">{projTitle}</h3>
            <p className="mt-2">
              <span className="font-bold">Project Type:</span> {projType}
            </p>
          </div>
        </div>

        {/* ====== Middle Flexible Section ====== */}
        <div className="middle-shape flex-grow bg-black bg-opacity-80 border-x-2 border-neon p-4 text-white">
          <p className="mt-2">
            <span className="font-bold">Role:</span> {projRole}
          </p>
          <p className="mt-2">
            <span className="font-bold">Skills Used:</span> {projSkills}
          </p>
        </div>

        {/* ====== Bottom Angled Shape (Fixed Height) ====== */}
        <div className="bottom-shape relative h-32">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {/* Reuse the same filter if you want consistent glow */}
            <polygon
              points="0,0 100,0 100,85 85,100 0,100"
              fill="rgba(0, 0, 0, 0.8)"
              stroke="#ff00ff"
              strokeWidth="2"
              filter="url(#neonGlow)"
            />
          </svg>
          {/* Overlay your bottom content (if any) */}
          <div className="absolute inset-0 p-4 text-white flex flex-col justify-center">
            {/* If you don't need bottom text, you can remove this. */}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: your existing images & modal */}
      <div className="w-full md:w-3/4 p-4 flex flex-col justify-center m-2 border border-gray-700 cyberpunk-border">
        <div className="grid grid-cols-2 gap-4">
          {projItems.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImg(item)}
            >
              <Image
                src={item.pathThumb}
                alt={item.alt}
                width={500}
                height={300}
                className="rounded-lg"
              />
              {/* Overlay button on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <CyberpunkButton label="View" className="btn-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for large image */}
        {selectedImg && (
          <div className="modal modal-open">
            <div className="modal-box relative bg-black border border-pink-500 cyberpunk-border">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setSelectedImg(null)}
              >
                ✕
              </button>
              <Image
                src={selectedImg.pathLarge}
                alt={selectedImg.alt}
                width={800}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
