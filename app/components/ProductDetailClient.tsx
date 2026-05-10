"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { ChevronDown, Minus } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showDescription, setShowDescription] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);



  // Material options - since product has single material, we'll make it clickable for future flexibility
  // You can modify this array if you want multiple material options
  const materialOptions = [product.material];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-2 gap-8">
            {/* IMAGE SECTION */}
            <div className="p-6">
              <div className="relative w-full h-140 bg-gray-100 rounded-md overflow-hidden mb-4">
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
                    className={`border-2 rounded ${activeImage === img
                        ? "border-[#ff9167]"
                        : "border-transparent"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`product-angle-${i}`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-6">
              {/* <span className="bg-[#ff8800] text-black px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span> */}

              <h1 className="text-3xl font-extrabold">{product.name}</h1>

              <p className="text-3xl font-bold text-[#df6839]">
                AUD ${product.price.toFixed(2)}
              </p>

              {/* COLOR SELECTOR */}
              {/* <div>
                <h3 className="font-semibold mb-2">Colors</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveVariant(variant);
                        setActiveImageIndex(0);
                      }}
                      className={`px-3 py-1 border-0 rounded-md ${activeVariant.color === variant.color
                        ? "border-black  bg-[#ff9167]"
                        : "border-gray-300"
                        }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div> */}



              {/* DESCRIPTION */}
              <div className="border-t border-b border-gray-200">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full flex items-center justify-between py-4"
                >
                  <h2 className="font-semibold text-lg">Description</h2>

                  {showDescription ? (
                    <Minus size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {showDescription && (
                  <div className="pb-4">
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}
              </div>


              {/* SIZE GUIDE */}
              <div className="border-t border-b border-gray-200">
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="w-full flex items-center justify-between py-4"
                >
                  <h2 className="font-semibold text-lg">Size Guide</h2>

                  {showSizeGuide ? (
                    <Minus size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {showSizeGuide && (
                  <div className="pb-4 text-gray-700 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Small</span> — 270mm - 370mm neck, 38mm
                      width (Terriers & Whippets)
                    </p>

                    <p>
                      <span className="font-semibold">Medium</span> — 330mm - 430mm neck, 50mm
                      width (Staghounds & Light Breed Lurchers)
                    </p>

                    <p>
                      <span className="font-semibold">Large</span> — 430mm - 530mm neck, 50mm
                      width (Wolfhounds & Heavier Greyhound Cross Breeds)
                    </p>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-500">
                Please be sure to measure your dog prior to purchase. Exchange incurs an additional cost (Refund and Returns Policy).
              </div>
              {/* features */}
              {/* <div>
                <h2 className="font-semibold text-lg">Features</h2>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div> */}

              {/* SIZE SELECTOR */}
              <div>
                <h3 className="font-semibold mb-2">Select Collar Size</h3>

                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#ff9167]"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              {/* Selected Options Summary */}
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-semibold mb-1">Selected Options:</p>


  <p>
    Color: <span className="font-medium">{product.color}</span>
  </p>

                <p>
                  Material:{" "}
                  <span className="font-medium">{product.material}</span>
                </p>

                <p>
                  Size:{" "}
                  <span className="font-medium">{selectedSize}</span>
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    color: "N/A", // temporary fix
                    material: product.material,
                    size: selectedSize,
                    image: activeImage,
                  });

                  toast.success(
                    `${product.name} (${selectedSize}) added to cart!`
                  );
                }}
                className="w-full bg-[#ff9167] text-white py-3 rounded-lg hover:bg-[#df6839] font-semibold transition"
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
