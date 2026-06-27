'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useInventory } from '@/hooks/useInventory';

interface ProductCardProps {
  product: Product;
  originalPrice?: number;
}

const ProductCard = ({ product, originalPrice }: ProductCardProps) => {
  const previewImage = product.images?.[0] || "/placeholder.png";
  const hasDiscount = originalPrice !== undefined && originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice! - product.price) / originalPrice!) * 100)
    : null;

  const { isProductOutOfStock, getLowestStock } = useInventory();
  const isOutOfStock = isProductOutOfStock(product.id);
  const lowestStock = getLowestStock(product.id);
  const isLowStock = !isOutOfStock && lowestStock !== null && lowestStock > 0 && lowestStock <= 5;

  return (
    <Link href={isOutOfStock ? "#" : `/products/${product.id}`} className="block" onClick={(e) => { if (isOutOfStock) e.preventDefault(); }}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={previewImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-red-600 font-bold text-sm px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
          {isLowStock && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Only {lowestStock} left!
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 mt-1 line-clamp-2">
            {product.name}
          </h3>

          {hasDiscount && (
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                {discountPercent}% off
              </span>
              <span className="text-red-600 text-xs font-semibold">
                Limited time deal
              </span>
            </div>
          )}

          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-bold text-gray-900 text-base sm:text-lg">
              <span className="text-sm align-super">$</span>
              {Math.floor(product.price)}
              <span className="">
                {(product.price % 1).toFixed(2).slice(1)}
              </span>
            </span>
            {hasDiscount && (
              <span className="text-gray-500 line-through text-sm">
                A${originalPrice!.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;