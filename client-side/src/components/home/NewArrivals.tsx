'use client';

import React from 'react';
import Link from 'next/link';
import { ProductGrid } from '../product/ProductGrid';
import { Product } from '../../types/ecommerce';
import { ArrowRight } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <section className="py-20 bg-white text-black border-b border-zinc-200">
      <div className="w-[85%] mx-auto px-4 sm:px-0 lg:px-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
              FRESH DROP 01
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop?isNew=true"
            className="mt-4 md:mt-0 text-xs font-mono font-bold text-zinc-600 hover:text-black uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            EXPLORE NEW DROPS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
};
