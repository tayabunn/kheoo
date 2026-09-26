'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ALL_PRODUCTS } from '../../data/products';
import { NextDropCountdown } from '../../components/home/NextDropCountdown';
import { Flame, ArrowUpDown, Filter } from 'lucide-react';

export default function NewDropsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState('newest');

  const newProducts = ALL_PRODUCTS.filter((p) => p.isNew);

  const filtered = newProducts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.categoryId === selectedCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Featured Next Drop Countdown Hero Banner */}
      <NextDropCountdown
        dropName="HIGH VOLTAGE — AUTUMN STREETWEAR & HEAVYWEIGHT CAPSULE"
        dropCode="DROP 002 INCOMING"
      />

      <div className="py-8 sm:py-12 md:py-16">
        <div className="w-[90%] mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 border-b border-zinc-200 pb-6">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
              <span>LIVE RELEASES IN STOCK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
              CURRENT NEW DROPS
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-mono">
              Limited-run oversized streetwear garments engineered with 240+ GSM combed heavyweight cotton.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-200 font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-black" /> Category:
              </span>
              {[
                { id: 'all', label: 'All New Drops' },
                { id: 'anime', label: 'Anime Releases' },
                { id: 'marvel', label: 'Marvel Drops' },
                { id: 'dc', label: 'DC Tactical' },
                { id: 'polo', label: 'Polo' },
              ].map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedCategory(tag.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === tag.id
                      ? 'bg-black text-white'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-black" /> Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-zinc-300 text-xs text-black px-3 py-1.5 rounded-lg focus:outline-none focus:border-black font-mono font-semibold cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <ProductGrid products={sorted} />
        </div>
      </div>
    </div>
  );
}
