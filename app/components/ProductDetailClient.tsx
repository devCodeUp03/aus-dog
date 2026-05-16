"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { ChevronDown, Minus, Plus } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showDescription, setShowDescription] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* IMAGE SECTION */}
            <div className="p-4 sm:p-6">
              <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] lg:h-[560px] bg-gray-100 rounded-md overflow-hidden mb-4">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* thumbnails */}
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`border-2 rounded-md overflow-hidden ${
                      activeImage === img
                        ? "border-[#ff9167]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`product-angle-${i}`}
                      width={70}
                      height={70}
                      className="object-cover w-14 h-14 sm:w-16 sm:h-16"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                {product.name}
              </h1>

              <p className="text-2xl sm:text-3xl font-bold text-[#df6839]">
                AUD ${product.price.toFixed(2)}
              </p>

              {/* DESCRIPTION */}
              <div className="border-t border-b border-gray-200">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full flex items-center justify-between py-3 sm:py-4"
                >
                  <h2 className="font-semibold text-base sm:text-lg">
                    Description
                  </h2>
                  {showDescription ? <Minus size={18} /> : <ChevronDown size={18} />}
                </button>

                {showDescription && (
                  <div className="pb-4 text-sm sm:text-base text-gray-700">
                    {product.description}
                  </div>
                )}
              </div>

              {/* SIZE GUIDE */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="w-full flex items-center justify-between py-3 sm:py-4"
                >
                  <h2 className="font-semibold text-base sm:text-lg">
                    Size Guide
                  </h2>
                  {showSizeGuide ? <Minus size={18} /> : <ChevronDown size={18} />}
                </button>

                {showSizeGuide && (
                  <div className="pb-4 text-gray-700 space-y-2 text-xs sm:text-sm">
                    <p><span className="font-semibold">Small</span> — 270mm - 370mm neck, 38mm width</p>
                    <p><span className="font-semibold">Medium</span> — 330mm - 430mm neck, 50mm width</p>
                    <p><span className="font-semibold">Large</span> — 430mm - 530mm neck, 50mm width</p>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500">
                Exchange incurs an additional cost (Refund and Returns Policy).
              </p>

              {/* SIZE SELECTOR */}
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                  Select Collar Size
                </h3>

                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:border-[#ff9167]"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              {/* QUANTITY */}
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">
                  Quantity
                </h3>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="border border-gray-300 p-2 rounded-md hover:border-[#ff9167]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-8 sm:w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="border border-gray-300 p-2 rounded-md hover:border-[#ff9167]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="bg-gray-50 p-3 rounded-lg text-xs sm:text-sm">
                <p className="font-semibold mb-1">Selected Options:</p>

                <p>Color: <span className="font-medium">{product.color}</span></p>
                <p>Material: <span className="font-medium">{product.material}</span></p>
                <p>Size: <span className="font-medium">{selectedSize}</span></p>
                <p>Quantity: <span className="font-medium">{quantity}</span></p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    color: product.color,
                    material: product.material,
                    size: selectedSize,
                    quantity,
                    image: activeImage,
                  });

                  toast.success(
                    `${quantity} × ${product.name} (${selectedSize}) added to cart!`,
                    { duration: 1000 }
                  );
                }}
                className="w-full bg-[#ff9167] text-white py-3 rounded-lg hover:bg-[#df6839] font-semibold transition text-sm sm:text-base"
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}