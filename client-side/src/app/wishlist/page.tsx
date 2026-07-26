'use client';

import React from 'react';
import Link from 'next/link';
import { ProductGrid } from '../../components/product/ProductGrid';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="py-12 bg-white text-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-zinc-200 pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              SAVED DROPS
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
              YOUR WISHLIST
            </h1>
          </div>
          <span className="text-xs text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full">
            {items.length} Saved
          </span>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center bg-white border border-zinc-200 rounded-lg p-8 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-base font-bold text-black mb-1 uppercase">Your wishlist is empty</h3>
            <p className="text-xs text-zinc-500 mb-6 font-sans">
              Save your favorite oversized drop shoulder tees for later.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white font-black text-xs uppercase px-6 py-3.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Discover Drops
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
