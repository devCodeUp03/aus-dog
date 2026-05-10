'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

  // first image for preview
  const previewImage = product.images?.[0] || "/placeholder.png";

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={previewImage}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">

          <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-4 pt-4 border-t flex items-center justify-start">
            <div className="font-semibold text-[#df6839]">
              AUD ${product.price.toFixed(2)}
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;