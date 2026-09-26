'use client';

import React from 'react';
import Link from 'next/link';
import { ProductGrid } from '../product/ProductGrid';
import { Product } from '../../types/ecommerce';

interface NewArrivalsProps {
  products: Product[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white text-black">
      <div className="w-[90%] mx-auto">
        {/* Header Row: Title on Left, View all pill button on Right */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-black font-sans">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="bg-[#1c1c1e] hover:bg-black text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-1.5 rounded-xl sm:rounded-full flex items-center gap-1 transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span>View all</span>
            <span className="text-xs">›</span>
          </Link>
        </div>

        <ProductGrid products={products} />

        {/* View All Products Button */}
        <div className="mt-6 sm:mt-10 md:mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#1c1c1e] hover:bg-black text-white text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl transition-all shadow-sm active:scale-95 border border-black"
          >
            <span>VIEW ALL PRODUCTS</span>
            <span className="text-xs">›</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
