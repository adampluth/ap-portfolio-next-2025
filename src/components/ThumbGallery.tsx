'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryItem {
  src: string;
  company: string;
  label: string;
}

const galleryData: GalleryItem[] = [
  { 
    src: '/img/inl-bctc-dt/BCTC-LBL_t.png', 
    company:'Idaho National Laboratory', 
    label: 'Solvent Extraction Experiment Digital Twin'
  },
  { 
    src: '/img/inl-magnet-dt/MAGNET_LDRD_Prototype_01_UI_t.png',
    company:'Idaho National Laboratory', 
    label: 'MAGNET Autonomous Heat Pipe Control Digital Twin'
  },
  { 
    src: '/img/inl-nnsa-dt/NNSA-digitaltwin-1-t.png',
    company:'Idaho National Laboratory',
    label: 'Nuclear Reactor Non-proliferation Digital Twin'
  },
  {
    src: '/img/sans-website/SANS-website-1.png',
    company:'Sans Institute',
    label: 'Corporate Website'
  },
  {
    src: '/img/sans-cybertalent/SANS_CyberTalentRedesign_t.png',
    company:'Sans Institute',
    label: 'CyberTalent (old site)'
  },
  {
    src: '/img/rah-web/RAH_WebsiteRefresh_01_Home_t.jpg',
    company: 'Richmond American Homes',
    label: 'Corporate Website'
  },
  {
    src: '/img/rah-ts/RAH_TS3_00_MainDash_t.jpg',
    company: 'Richmond American Homes',
    label: 'Sales Center Touchscreen Kiosks'
  },
  { 
    src: '/img/auxsable/AuxSable_01_Main_t.jpg',
    company: 'Aux Sable Creeks Farms',
    label: 'Company Website' },
];

const ThumbGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1300px] mx-auto p-4"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {galleryData.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden transition-opacity"
          onMouseEnter={() => setHoveredIndex(index)}
        >
          {/* Inner container for the image and label */}
          <div className="relative bg-black rounded-xl overflow-hidden">
             <Image
              src={item.src}
              alt={item.label}
              width={300}
              height={200}
              className={`w-full h-auto transition-transform duration-300 ${
                hoveredIndex === index ? 'scale-110 opacity-40' : 'scale-100 opacity-100'
              }`}
            />
            <div
              className={`absolute p-2 bottom-0 left-0 right-0 text-center text-white py-2 text-sm font-bold transition-opacity ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-sm mb-3 block">{item.company}</span>
              <span className="text-base mb-3 block">{item.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbGallery;
