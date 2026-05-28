'use client';
import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '@/data/products';
import type { Product } from '@/data/products';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 text-center">
          Dog Collars Collection
        </h1>

        {/* SEARCH */}
        <div className="mb-10 sm:mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search dog collars..."
            className="
              w-full
              max-w-md
              sm:max-w-lg
              px-4 sm:px-6
              py-3 sm:py-4
              border-2 border-gray-200
              rounded-xl
              shadow-md sm:shadow-lg
              focus:outline-none
              focus:border-[#ff9167]
              focus:ring-4 focus:ring-orange-100
              transition-all
              text-sm sm:text-base
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className="
          grid
         grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
         gap-3 sm:gap-5 lg:gap-8
        ">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} originalPrice={50}  />
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <p className="text-base sm:text-lg lg:text-xl text-gray-500">
              No dog collars found matching <span className="font-semibold text-gray-700">{searchTerm}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;