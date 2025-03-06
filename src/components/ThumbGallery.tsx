'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryItem {
  src: string;
  label: string;
}

const galleryData: GalleryItem[] = [
  { src: '/images/image4.jpg', label: 'Solvent Extraction Experiment Digital Twin' },
  { src: '/img/inl-magnet-dt/MAGNET_LDRD_Prototype_01_UI_t.png', label: 'MAGNET Autonomous Heat Pipe Control Digital Twin' },
  { src: '/img/inl-nnsa-dt/NNSA-digitaltwin-1-t.png', label: 'Nuclear Reactor Non-proliferation Digital Twin' },
  { src: '/images/image2.jpg', label: 'SANS New Website' },
  { src: '/img/sans-cybertalent/SANS_CyberTalentRedesign_t.png', label: 'SANS CyberTalent' },
  { src: '/img/rah-web/RAH_WebsiteRefresh_01_Home_t.jpg', label: 'Richmond American Homes Website' },
  { src: '/img/rah-ts/RAH_TS3_00_MainDash_t.jpg', label: 'Sales Center Touchscreen Kiosks' },
  { src: '/img/auxsable/AuxSable_01_Main_t.jpg', label: 'Aux Sable Creek Farms' },
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

          {/* Inner border shape (Offset) */}
          <div className="card bg-black">
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
