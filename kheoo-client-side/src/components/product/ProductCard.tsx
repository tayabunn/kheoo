'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const wishlisted = isInWishlist(product.id);

  // Calculate discount percentage
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.isNew
    ? 20
    : 15;

  // Convert or format price to BDT style as shown in reference
  const bdtPrice = product.price < 100 ? Math.round(product.price * 50) : Math.round(product.price);
  const bdtOldPrice = product.oldPrice
    ? product.oldPrice < 100
      ? Math.round(product.oldPrice * 50)
      : Math.round(product.oldPrice)
    : Math.round(bdtPrice * 1.25);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, 'Obsidian Black', 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, 'Obsidian Black', 1);
    router.push('/checkout');
  };

  return (
    <div className="group relative bg-white text-black flex flex-col justify-between transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Coral/Pink Discount Badge (Save X%) */}
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="bg-[#ff5b5b] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full">
              Save {discount}%
            </span>
          </div>
        )}

        {/* Wishlist Heart Icon at top right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-black text-white'
              : 'bg-white/85 text-zinc-700 hover:bg-white hover:text-black border border-zinc-200'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="pt-2.5 pb-1 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <Link href={`/products/${product.slug}`} className="block group-hover:text-zinc-600 transition-colors">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-1.5 font-sans">
            <span className="text-xs sm:text-sm font-bold text-black">
              BDT {bdtPrice}
            </span>
            {bdtOldPrice && (
              <span className="text-[10px] sm:text-xs text-zinc-400 line-through">
                BDT {bdtOldPrice}
              </span>
            )}
          </div>
        </div>

        {/* Two Stacked Action Buttons matching Reference */}
        <div className="space-y-1.5 pt-1">
          {/* ADD TO CART Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2 sm:py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 active:scale-98 text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">ADDED</span>
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>

          {/* BUY NOW Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full py-2 sm:py-2.5 rounded-xl bg-[#1c1c1e] hover:bg-black active:scale-98 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};
