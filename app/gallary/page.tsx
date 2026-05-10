'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/images/products/p1.png",
  "/images/belts/f1.png",
  "/images/belts/f2.png",
  "/images/belts/f3.png",
  "/images/b4.png",
  "/images/bg2.png",
  "/images/half.png",
  "/images/products/p4.png",
  "/images/products/p5.png",
  "/images/products/p6.png",
  "/images/products/p7.png",
  "/images/products/p1.png",
];

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : (prev ?? 0) - 1
    );
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => openImage(i)}
            className="cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <Image
              src={img}
              alt={`gallery-${i}`}
              width={500}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          {/* Close button */}
          <button
            onClick={closeImage}
            className="absolute top-5 right-5 text-white"
          >
            <X size={30} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt="preview"
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-5 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}