'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useQuickViewStore } from '../../store/useQuickViewStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [isHovered, setIsHovered] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const wishlisted = isInWishlist(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, selectedSize, 'Obsidian Black', 1);
  };

  return (
    <div
      className="group relative bg-white text-black rounded-none border border-zinc-200 overflow-hidden flex flex-col transition-all duration-300 hover:border-black hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full bg-zinc-100 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none font-mono">
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-none shadow-md">
              NEW DROP
            </span>
          )}
          {discount > 0 && (
            <span className="bg-zinc-200 text-black border border-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-none border backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-black text-white border-black'
                : 'bg-white/80 text-black border-zinc-300 hover:bg-white hover:border-black'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => openQuickView(product)}
            className="p-2.5 bg-white/80 hover:bg-white text-black border border-zinc-300 hover:border-black rounded-none backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Size Selector Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/95 backdrop-blur-md border border-zinc-200 p-2 rounded-none flex items-center justify-between gap-1 font-mono shadow-md">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest pl-1">Size:</span>
            <div className="flex gap-1">
              {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[10px] px-2 py-1 rounded-none transition-all ${
                    selectedSize === sz
                      ? 'bg-black text-white font-extrabold shadow'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
            <span className="uppercase tracking-widest text-black font-extrabold">
              {product.category?.name || 'Streetwear'}
            </span>
            <div className="flex items-center gap-1 text-black">
              <Star className="w-3.5 h-3.5 fill-current text-black" />
              <span className="font-bold">{product.rating}</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`} className="block group-hover:text-zinc-600 transition-colors">
            <h3 className="text-sm font-bold text-black line-clamp-1 leading-snug tracking-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-zinc-500 line-clamp-1 mt-1 font-sans">
            {product.material}
          </p>
        </div>

        {/* Price & Add */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 font-mono">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-black">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs text-zinc-400 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black px-3.5 py-2 rounded-none flex items-center gap-1.5 transition-all shadow-md active:scale-95 border border-black"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
