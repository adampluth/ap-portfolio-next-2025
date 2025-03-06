"use client"; // ✅ Must be a Client Component to use useState

import { useState } from "react";
import NextImage from "next/image";
import Dialog from "@/components/Dialog";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Main Featured Image */}
      {images.length > 0 && (
        <div
          className="mb-6 max-h-[800px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() => {
            setSelectedImage(images[0]);
            setIsDialogOpen(true);
          }}
        >
          <NextImage 
            src={images[0]} 
            alt={title} 
            width={800} 
            height={500} 
            className="w-full"
          />
        </div>
      )}

      {/* Additional Images */}
      <div className="masonry sm:masonry-sm md:masonry-md gap-y-2">
        {images.slice(1).map((img, index) => (
          <div key={index} className="cursor-pointer mb-6" onClick={() => {
            setSelectedImage(img);
            setIsDialogOpen(true);
          }}>
            <NextImage
              src={img}
              alt={`${title} screenshot ${index + 1}`}
              width={300}
              height={200}
              className="w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Image Dialog */}
      <Dialog 
        title={title} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      >
        {selectedImage && (
          <NextImage 
            src={selectedImage} 
            alt="Expanded view" 
            width={800} 
            height={500} 
            className="w-full rounded-lg shadow-lg"
          />
        )}
      </Dialog>
    </>
  );
}
