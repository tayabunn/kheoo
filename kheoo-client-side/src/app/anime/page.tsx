'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ALL_PRODUCTS } from '../../data/products';
import { Sparkles, ArrowUpDown, Filter } from 'lucide-react';

export default function AnimePage() {
  const [selectedFranchise, setSelectedFranchise] = useState<string>('all');
  const [sortOption, setSortOption] = useState('newest');

  const animeProducts = ALL_PRODUCTS.filter((p) => p.categoryId === 'anime');

  const filtered = animeProducts.filter((p) => {
    if (selectedFranchise === 'all') return true;
    return (
      p.name.toLowerCase().includes(selectedFranchise.toLowerCase()) ||
      p.description.toLowerCase().includes(selectedFranchise.toLowerCase()) ||
      p.slug.toLowerCase().includes(selectedFranchise.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 border-b border-zinc-200 pb-6">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            COLLECTION / ANIME
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
            ANIME STREETWEAR COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-mono">
            Heavyweight 240+ GSM drop shoulder tees featuring authentic Japanese anime lore, puff ink and screen prints.
          </p>
        </div>

        {/* Subfranchise Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-200 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-black" /> Franchise:
            </span>
            {[
              { id: 'all', label: 'All Anime' },
              { id: 'naruto', label: 'Naruto Shippuden' },
              { id: 'gojo', label: 'Jujutsu Kaisen' },
              { id: 'titan', label: 'Attack on Titan' },
              { id: 'tanjiro', label: 'Demon Slayer' },
              { id: 'piece', label: 'One Piece' },
              { id: 'bleach', label: 'Bleach TYBW' },
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedFranchise(tag.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedFranchise === tag.id
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
              <option value="newest">Newest Drops</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <ProductGrid products={sorted} />
      </div>
    </div>
  );
}
