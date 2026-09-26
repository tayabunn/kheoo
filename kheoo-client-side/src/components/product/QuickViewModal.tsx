'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check } from 'lucide-react';
import { useQuickViewStore } from '../../store/useQuickViewStore';
import { useCartStore } from '../../store/useCartStore';

export const QuickViewModal: React.FC = () => {
  const { isOpen, selectedProduct, closeQuickView } = useQuickViewStore();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState('L');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!isOpen || !selectedProduct) return null;

  const handleAddToCart = () => {
    addItem(selectedProduct, selectedSize, 'Obsidian Black', 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 font-mono">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={closeQuickView}
      />

      <div className="relative bg-white border border-zinc-200 rounded-3xl max-w-3xl w-full text-black shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-white hover:bg-zinc-100 text-black rounded-full transition-colors border border-zinc-200 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative bg-zinc-100 aspect-[3/4] md:aspect-auto">
          <Image
            src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
            alt={selectedProduct.name}
            fill
            className="object-cover"
          />
          {selectedProduct.images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-14 relative rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-2">
              <span className="uppercase font-bold text-black">{selectedProduct.category?.name || 'Streetwear'}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-black">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{selectedProduct.rating}</span>
                <span className="text-zinc-500">({selectedProduct.reviewCount})</span>
              </div>
            </div>

            <h2 className="text-xl font-black text-black leading-tight mb-3 uppercase">
              {selectedProduct.name}
            </h2>

            <div className="flex items-baseline gap-3 font-mono mb-4">
              <span className="text-2xl font-black text-black">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.oldPrice && (
                <span className="text-sm text-zinc-400 line-through">
                  ${selectedProduct.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-sans">
              {selectedProduct.description}
            </p>

            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs text-zinc-700 space-y-1 font-mono">
              <p>📍 <strong>Material:</strong> {selectedProduct.material}</p>
              <p>📍 <strong>Print:</strong> {selectedProduct.printQuality}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-800 uppercase tracking-wider">Select Size</span>
              <span className="text-zinc-500">Oversized Drop Fit</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                    selectedSize === sz
                      ? 'bg-black text-white border-black font-black shadow-lg'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                added
                  ? 'bg-zinc-800 text-white'
                  : 'bg-black hover:bg-zinc-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart — ${selectedProduct.price.toFixed(2)}
                </>
              )}
            </button>

            <Link
              href={`/products/${selectedProduct.slug}`}
              onClick={closeQuickView}
              className="block text-center text-xs text-zinc-500 hover:text-black underline py-1"
            >
              View Full Product Specifications
            </Link>
          </div>

          <div className="flex items-center justify-around text-[10px] text-zinc-500 pt-2 border-t border-zinc-200">
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-black" /> Free Shipping &gt;$50</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-black" /> 7-Day Return</span>
          </div>
        </div>
      </div>
    </div>
  );
};
