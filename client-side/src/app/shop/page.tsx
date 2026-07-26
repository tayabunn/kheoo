'use client';

import React, { useState, useEffect } from 'react';
import { ProductGrid } from '../../components/product/ProductGrid';
import { Product } from '../../types/ecommerce';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/v1/products?';
        if (categoryFilter !== 'all') url += `category=${categoryFilter}&`;
        if (sizeFilter !== 'all') url += `size=${sizeFilter}&`;
        if (sortOption === 'price_asc') url += `sort=price_asc&`;
        if (sortOption === 'price_desc') url += `sort=price_desc&`;
        if (sortOption === 'rating') url += `sort=rating&`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch {
        setProducts([
          {
            id: 'p1',
            name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
            slug: 'naruto-sage-mode-drop-shoulder-tshirt',
            description: 'Sleek dark oversized fit tee with high-density puff print.',
            price: 34.99,
            oldPrice: 44.99,
            isNew: true,
            isBestSeller: true,
            isTrending: true,
            categoryId: 'anime',
            stock: 65,
            material: '100% Combed Heavyweight Cotton (240 GSM)',
            printQuality: 'Screen & Puff Print',
            rating: 4.9,
            reviewCount: 28,
            images: [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
            ],
          },
          {
            id: 'p2',
            name: 'Gojo Unlimited Void Oversized Drop Shoulder Tee',
            slug: 'gojo-unlimited-void-oversized-tee',
            description: 'Jujutsu Kaisen special edition tee featuring Gojo Domain Expansion.',
            price: 38.99,
            oldPrice: 49.99,
            isNew: true,
            isBestSeller: true,
            isTrending: true,
            categoryId: 'anime',
            stock: 40,
            material: '240 GSM Luxury Heavy Cotton',
            printQuality: 'High-Density Puff Print',
            rating: 5.0,
            reviewCount: 42,
            images: [
              'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
            ],
          },
          {
            id: 'p3',
            name: 'Spider-Man Symbiote Vintage Drop Shoulder Tee',
            slug: 'spider-man-symbiote-vintage-tee',
            description: 'Dark symbiote venom web graphic print over washed charcoal heavyweight cotton.',
            price: 36.99,
            oldPrice: 45.99,
            isNew: false,
            isBestSeller: true,
            isTrending: true,
            categoryId: 'marvel',
            stock: 50,
            material: '240 GSM Heavyweight Cotton',
            printQuality: 'Vintage Acid Wash Screen Print',
            rating: 4.8,
            reviewCount: 19,
            images: [
              'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
            ],
          },
          {
            id: 'p4',
            name: 'Batman Dark Knight Tactical Oversized Tee',
            slug: 'batman-dark-knight-tactical-tee',
            description: 'Gotham City silhouette with tactical bat logo stencil print.',
            price: 32.99,
            oldPrice: 42.99,
            isNew: true,
            isBestSeller: false,
            isTrending: true,
            categoryId: 'dc',
            stock: 30,
            material: '240 GSM 100% Ringspun Cotton',
            printQuality: 'Tactical Stencil Print',
            rating: 4.7,
            reviewCount: 15,
            images: [
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryFilter, sizeFilter, sortOption]);

  return (
    <div className="py-12 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-zinc-200 pb-6">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            STREETWEAR CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mt-1">
            ALL DROP SHOULDER TEES
          </h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">
            Showing {products.length} heavy cotton oversized tees
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-black" /> Category:
            </span>
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'anime', label: 'Anime' },
              { id: 'marvel', label: 'Marvel' },
              { id: 'dc', label: 'DC Comics' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-black text-white font-black shadow'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-black" /> Sort:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-zinc-200 text-xs text-black px-3.5 py-2 rounded-lg focus:outline-none focus:border-black font-mono"
            >
              <option value="newest">Newest Drops First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
}
