'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryItem {
  src: string;
  label: string;
}

const galleryData: GalleryItem[] = [
  { src: '/images/image1.jpg', label: 'Cyberpunk City' },
  { src: '/images/image2.jpg', label: 'Neon Streets' },
  { src: '/images/image3.jpg', label: 'Tech Haven' },
  { src: '/images/image4.jpg', label: 'AI Core' },
  { src: '/images/image5.jpg', label: 'Hacker Hub' },
  { src: '/images/image6.jpg', label: 'Futuristic Market' },
];

const ThumbGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto p-4"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {galleryData.map((item, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden hover:scale-105 transition-transform ${
            hoveredIndex !== null && hoveredIndex !== index ? 'opacity-50' : 'opacity-100'
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
        >
          {/* Outer border shape */}
          <div className="absolute inset-0 bg-yellow-300 clip-path-cyberpunk"></div>

          {/* Inner border shape (Offset) */}
          <div className="relative clip-path-cyberpunk-offset bg-black">
            <Image
              src={item.src}
              alt={item.label}
              width={300}
              height={200}
              className="w-full h-auto relative rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center text-white py-2 text-sm font-bold">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbGallery;
