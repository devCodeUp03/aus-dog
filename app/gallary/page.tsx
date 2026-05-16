'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/images/products/p1.png",
  "/images/belts/f3.png",
  "/images/b4.png",
  "/images/bg2.png",
  "/images/products/p4.png",
  
  "/images/gallery/g1.JPG",
  "/images/gallery/g2.JPG",
  "/images/gallery/g3.JPG",
  "/images/gallery/g5.JPG",
  "/images/gallery/g6.JPG",
  "/images/gallery/g8.JPG",
  "/images/gallery/g10.jpg",
  "/images/gallery/g11.jpg",
  "/images/gallery/g14.jpeg",
  "/images/gallery/g15.jpeg",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Top Dog Gallery
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-lg max-w-xl mx-auto">
          A glimpse into our craftsmanship, premium products, and lifestyle moments.
        </p>
      </div>

      {/* MASONRY GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">

        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => openImage(i)}
            className="mb-5 break-inside-avoid cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-[22px] shadow-md bg-white">

              <Image
                src={img}
                alt={`gallery-${i}`}
                width={600}
                height={600}
                className={`
                  w-full object-cover transition-transform duration-500
                  group-hover:scale-110
                  ${i % 5 === 0 ? "h-90" : ""}
                  ${i % 5 === 1 ? "h-100" : ""}
                  ${i % 5 === 2 ? "h-120" : ""}
                  ${i % 5 === 3 ? "h-130" : ""}
                  ${i % 5 === 4 ? "h-140" : ""}
                `}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />

            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 px-4"
          onClick={closeImage}
        >

          {/* Close */}
          <button
            onClick={closeImage}
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <X size={26} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-10 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt="preview"
              fill
              className="object-contain rounded-xl"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-10 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <ChevronRight size={36} />
          </button>

        </div>
      )}
    </div>
  );
}