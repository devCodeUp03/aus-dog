'use client'
import { useEffect, useRef, useState } from "react";
import { Raleway } from "next/font/google";
import { Pacifico } from "next/font/google";
import Link from "next/link";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const BestProduct = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#000000", "#ee6d49", "#6b7280"];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto py-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
          }`}
        >
          <img
            src="/images/products/f13.png"
            alt="Working Dog"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          }`}
        >

          {/* HEADER (inside right column) */}
          <div className="mb-8">
            <h1 className={`${pacifico.className} text-2xl italic mb-2`}>
              Best Product
            </h1>
            <h4 className="font-bold text-4xl text-gray-900">
              Deal Of The Week
            </h4>
          </div>

          {/* PRODUCT TITLE */}
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Working Dog
          </h2>

          {/* PRICE */}
          <p className="text-2xl text-[#7e4c4f] font-medium mb-4">
            AUD 40.00
          </p>

          {/* DESCRIPTION */}
          <p className={`${raleway.className} text-sm text-gray-700 mb-8 leading-relaxed`}>
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
          </p>

          {/* SIZE SELECTOR */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-3">Size</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <div
                  key={size}
                  className="w-11 h-11 border border-gray-300 rounded-md flex items-center justify-center text-sm cursor-pointer hover:bg-black hover:text-white transition"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* COLOR SELECTOR */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-600 mb-3">Color</p>
            <div className="flex gap-3">
              {colors.map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border cursor-pointer hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* BUTTON */}
   <Link href="/products">
  <div className="bg-[#ee6d49] hover:bg-[#c93f19] text-white font-bold text-sm tracking-widest px-10 py-4 rounded-full transition-all duration-200 inline-block cursor-pointer">
    SHOP NOW
  </div>
</Link>
        </div>
      </div>
    </div>
  );
};

export default BestProduct;