'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import { Product } from '../../types/ecommerce';

export const SearchDrawer: React.FC = () => {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const popularTags = ['Naruto', 'Spider-Man', 'Gojo', 'Batman', 'Drop Shoulder', 'Heavyweight', '240 GSM'];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={closeSearch}
      />

      <div className="relative max-w-4xl mx-auto mt-12 bg-white border border-zinc-200 rounded-lg shadow-2xl text-black overflow-hidden p-6 z-10">
        <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
          <Search className="w-6 h-6 text-black shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search anime, superhero, drop shoulder tees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg md:text-xl font-medium text-black placeholder-zinc-400 focus:outline-none uppercase"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 hover:text-black"
          >
            ESC
          </button>
        </div>

        {!query && (
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <TrendingUp className="w-4 h-4 text-black" />
              <span>Popular Streetwear Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(tag)}
                  className="bg-zinc-50 border border-zinc-200 hover:border-black text-xs text-zinc-700 hover:text-black px-3.5 py-1.5 rounded-md transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="py-4 max-h-[60vh] overflow-y-auto space-y-3">
            {loading ? (
              <p className="text-xs text-zinc-500 py-6 text-center">Searching KHEOO collection...</p>
            ) : results.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">
                No matching streetwear drops found for &quot;{query}&quot;.
              </p>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-zinc-100 transition-colors group"
                >
                  <div className="relative w-14 h-16 bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-black group-hover:text-zinc-700 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">${product.price.toFixed(2)}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black -translate-x-1 group-hover:translate-x-0 transition-all" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
