'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/ecommerce';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-4 animate-pulse">
            <div className="w-full aspect-[3/4] bg-zinc-100 rounded-xl" />
            <div className="h-4 bg-zinc-100 rounded w-3/4" />
            <div className="h-3 bg-zinc-100 rounded w-1/2" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-zinc-100 rounded w-1/3" />
              <div className="h-8 bg-zinc-100 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white border border-zinc-200 rounded-2xl p-8 text-black">
        <h3 className="text-lg font-bold text-black uppercase font-mono">No products found</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto font-sans">
          Try clearing your filters or search criteria to discover our streetwear drops.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
