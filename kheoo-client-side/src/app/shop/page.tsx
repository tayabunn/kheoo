'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ALL_PRODUCTS } from '../../data/products';
import { Product } from '../../types/ecommerce';
import { Filter, ArrowUpDown, X, Sparkles, Flame, Tag } from 'lucide-react';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryCategory = searchParams.get('category') || 'all';
  const querySearch = searchParams.get('search') || '';
  const queryIsNew = searchParams.get('isNew') === 'true';

  const [categoryFilter, setCategoryFilter] = useState(queryCategory);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [onlyNewDrops, setOnlyNewDrops] = useState(queryIsNew);
  const [sortOption, setSortOption] = useState('newest');
  const [loading, setLoading] = useState(false);

  // Sync state when URL searchParams change
  useEffect(() => {
    setCategoryFilter(queryCategory);
    setSearchTerm(querySearch);
    setOnlyNewDrops(queryIsNew);
  }, [queryCategory, querySearch, queryIsNew]);

  // Filter products based on active criteria
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    // 1. Category match
    const matchesCategory =
      categoryFilter === 'all' ||
      product.categoryId.toLowerCase() === categoryFilter.toLowerCase();

    // 2. New drops match
    const matchesNew = !onlyNewDrops || product.isNew;

    // 3. Search query match
    const matchesSearch =
      !searchTerm.trim() ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesNew && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // Default order
  });

  // Update URL filter
  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setSearchTerm('');
    if (cat === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${cat}`);
    }
  };

  const handleSubcategoryClick = (keyword: string, cat: string) => {
    setCategoryFilter(cat);
    setSearchTerm(keyword);
    router.push(`/shop?category=${cat}&search=${encodeURIComponent(keyword)}`);
  };

  const clearAllFilters = () => {
    setCategoryFilter('all');
    setSearchTerm('');
    setOnlyNewDrops(false);
    router.push('/shop');
  };

  // Dynamic Header title
  const getHeaderTitle = () => {
    if (searchTerm) return `SEARCH: "${searchTerm.toUpperCase()}"`;
    if (onlyNewDrops) return 'NEW ARRIVALS & EXCLUSIVE DROPS';
    if (categoryFilter === 'anime') return 'ANIME STREETWEAR COLLECTION';
    if (categoryFilter === 'marvel') return 'MARVEL DROP SHOULDER COLLECTION';
    if (categoryFilter === 'dc') return 'DC COMICS GOTHIC TACTICAL';
    if (categoryFilter === 'polo') return 'CHINA MICRO SPANDEX POLO';
    return 'ALL DROP SHOULDER TEES';
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto">
        {/* Header Title Section */}
        <div className="mb-3 sm:mb-4 border-b border-zinc-200 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
            <span>KHEOO STORE</span>
            <span>/</span>
            <span className="text-black font-extrabold">{categoryFilter.toUpperCase()}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
                {getHeaderTitle()}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-mono">
                Showing {sortedProducts.length} heavyweight 240+ GSM streetwear items
              </p>
            </div>

            {/* Active search or filter pill */}
            {(searchTerm || onlyNewDrops || categoryFilter !== 'all') && (
              <button
                onClick={clearAllFilters}
                className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-mono font-bold rounded-lg border border-zinc-300 transition-colors cursor-pointer"
              >
                <span>Reset Filters</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Franchise Tag Badges - Larger font size & sleek padding */}
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="text-xs font-mono font-black text-zinc-900 uppercase tracking-wider mr-1 hidden sm:inline">
            POPULAR:
          </span>
          {[
            { label: 'Naruto', cat: 'anime', kw: 'Naruto' },
            { label: 'Jujutsu Kaisen', cat: 'anime', kw: 'Gojo' },
            { label: 'Attack on Titan', cat: 'anime', kw: 'Titan' },
            { label: 'One Piece', cat: 'anime', kw: 'One Piece' },
            { label: 'Spider-Man', cat: 'marvel', kw: 'Spider-Man' },
            { label: 'Deadpool', cat: 'marvel', kw: 'Deadpool' },
            { label: 'Venom', cat: 'marvel', kw: 'Venom' },
            { label: 'Batman', cat: 'dc', kw: 'Batman' },
            { label: 'Joker', cat: 'dc', kw: 'Joker' },
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleSubcategoryClick(tag.kw, tag.cat)}
              className={`text-xs sm:text-[13px] font-mono font-bold px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl sm:rounded-full border transition-all cursor-pointer ${
                searchTerm.toLowerCase() === tag.kw.toLowerCase()
                  ? 'bg-black text-white border-black font-extrabold'
                  : 'bg-white text-zinc-800 border-zinc-300 hover:border-black hover:text-black hover:bg-zinc-50'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-zinc-50 p-3 sm:p-4 rounded-xl border border-zinc-200 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 font-mono">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-black" /> Universe:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'anime', label: 'Anime' },
              { id: 'marvel', label: 'Marvel' },
              { id: 'dc', label: 'DC Comics' },
              { id: 'polo', label: 'Polo' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs font-bold px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  categoryFilter === cat.id && !searchTerm
                    ? 'bg-black text-white'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* New Drops Toggle */}
            <button
              onClick={() => {
                setOnlyNewDrops(!onlyNewDrops);
                router.push(onlyNewDrops ? '/shop' : '/shop?isNew=true');
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                onlyNewDrops
                  ? 'bg-amber-500 text-black font-black'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>New Drops</span>
            </button>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-zinc-200">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-black" /> Sort:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-zinc-300 text-xs text-black px-3 py-1.5 rounded-lg focus:outline-none focus:border-black font-mono font-semibold cursor-pointer"
            >
              <option value="newest">Newest Drops First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={sortedProducts} loading={loading} />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-zinc-500">Loading Streetwear Drops...</div>}>
      <ShopContent />
    </Suspense>
  );
}
