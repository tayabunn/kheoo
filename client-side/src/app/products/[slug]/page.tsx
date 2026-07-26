'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../../../types/ecommerce';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch {
        setProduct({
          id: 'p1',
          name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
          slug: 'naruto-sage-mode-drop-shoulder-tshirt',
          description: 'Sleek dark oversized fit tee with high-density puff print of Naruto in Six Paths Sage Mode on the back and subtle Konoha emblem on the chest.',
          details: 'Fabric: 100% Combed Heavyweight Cotton (240 GSM)\nFit: Oversized Drop Shoulder\nPrint: Screen & Puff Print\nNeckline: Thick Ribbed Crewneck\nPre-shrunk fabric.',
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
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
          ],
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 bg-white min-h-screen text-center font-mono text-zinc-500">
        Loading streetwear drop specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 bg-white min-h-screen text-center font-mono text-zinc-500">
        Product not found. <Link href="/shop" className="text-black underline">Return to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, 'Obsidian Black', quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shadow-xl">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-24 h-28 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === i ? 'border-black' : 'border-zinc-200 opacity-60'
                    }`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono mb-2">
                <span className="bg-black text-white px-2.5 py-0.5 font-black uppercase rounded">
                  {product.category?.name || 'Anime'}
                </span>
                <span className="text-zinc-400">•</span>
                <div className="flex items-center gap-1 text-black">
                  <Star className="w-4 h-4 fill-current text-black" />
                  <span className="font-bold text-black">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-snug">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-3 font-mono">
                <span className="text-3xl font-black text-black">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-base text-zinc-400 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-xs text-black font-bold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                  In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans border-t border-b border-zinc-200 py-4">
              {product.description}
            </p>

            <div className="space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-black uppercase tracking-wider">Select Size (Oversized Fit)</span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-black underline text-[11px]"
                >
                  Size Guide Specs
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-lg text-xs font-bold transition-all border ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black font-black shadow-lg'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {showSizeGuide && (
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-xs space-y-2 font-mono">
                  <h4 className="font-bold text-black uppercase">Streetwear Size Specs (Inches)</h4>
                  <table className="w-full text-left text-zinc-700">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500">
                        <th>Size</th>
                        <th>Chest</th>
                        <th>Length</th>
                        <th>Shoulder Drop</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr><td>S</td><td>42&quot;</td><td>28&quot;</td><td>20.5&quot;</td></tr>
                      <tr><td>M</td><td>44&quot;</td><td>29&quot;</td><td>21.5&quot;</td></tr>
                      <tr><td>L</td><td>46&quot;</td><td>30&quot;</td><td>22.5&quot;</td></tr>
                      <tr><td>XL</td><td>48&quot;</td><td>31&quot;</td><td>23.5&quot;</td></tr>
                      <tr><td>XXL</td><td>50&quot;</td><td>32&quot;</td><td>24.5&quot;</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl font-mono ${
                  added ? 'bg-zinc-800 text-white' : 'bg-black hover:bg-zinc-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-lg border transition-all ${
                  wishlisted ? 'bg-black text-white border-black' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-3 text-xs text-zinc-600 font-mono">
              <div className="flex items-center gap-2 text-black font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-black" /> Material & Print Quality
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-600">
                <li>240+ GSM Heavyweight 100% Combed Cotton</li>
                <li>High-Density Screen Print / Puff Ink technology</li>
                <li>Pre-shrunk fabric, zero color bleeding</li>
                <li>Thick 1.25&quot; Ribbed Crewneck Collar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
