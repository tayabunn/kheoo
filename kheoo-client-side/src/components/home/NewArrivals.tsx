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
    <section className="py-20 bg-white text-black">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            FRESH DROP
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
            FEATURED PRODUCTS
          </h2>
        </div>

        <ProductGrid products={products} />

        {/* View All Products Button */}
        <div className="mt-12 md:mt-14 text-center">
          <Link
            href="/shop"
            className="inline-block bg-[#1a1a1a] hover:bg-black text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase px-10 py-4 transition-all shadow-md hover:scale-105 active:scale-95 border border-black"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};
