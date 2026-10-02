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
    if (categoryFilter === 'islamic') return 'ISLAMIC ARABIC CALLIGRAPHY';
    if (categoryFilter === 'streetwear') return 'STREETWEAR & DENIM DROPS';
    return 'ALL PRODUCTS & DROPS';
  };

  return (
    <div className="py-6 sm:py-10 md:py-12 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto">
        {/* Breadcrumb matching Image 1 format */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center gap-1.5 text-xs sm:text-sm font-sans text-zinc-500">
            <li>
              <button onClick={() => router.push('/')} className="hover:text-black transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li>
              <span className="text-zinc-400">&gt;</span>
            </li>
            <li>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`transition-colors cursor-pointer ${
                  categoryFilter === 'all' && !searchTerm ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                Products
              </button>
            </li>
            {categoryFilter !== 'all' && (
              <>
                <li>
                  <span className="text-zinc-400">&gt;</span>
                </li>
                <li className="text-black font-bold capitalize">
                  {categoryFilter}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Header Title Section */}
        <div className="mb-4 sm:mb-6 border-b border-zinc-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black">
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

        {/* Quick Franchise Tag Badges */}
        <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 sm:flex-wrap">
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
              className={`text-xs sm:text-[13px] font-mono font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border transition-all cursor-pointer shrink-0 sm:shrink ${
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
        <div className="bg-zinc-50 p-3 sm:p-4 rounded-xl border border-zinc-200 mb-6 sm:mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 font-mono">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-black" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Products' },
              { id: 'anime', label: 'Anime' },
              { id: 'marvel', label: 'Marvel' },
              { id: 'dc', label: 'DC Comics' },
              { id: 'polo', label: 'Polo' },
              { id: 'islamic', label: 'Islamic' },
              { id: 'streetwear', label: 'Denim & Streetwear' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs font-bold px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 sm:shrink ${
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
                  ? 'bg-black text-white font-black'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
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
