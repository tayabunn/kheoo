'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, User } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useSearchStore } from '../../store/useSearchStore';

export const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'anime' | 'marvel' | 'dc' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const wishlistItems = useWishlistStore((state) => state.items);
  const openSearch = useSearchStore((state) => state.openSearch);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-black">
      <AnnouncementBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left: Mobile Toggle & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center group">
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO Logo"
                width={64}
                height={64}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Middle: Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-black tracking-widest uppercase text-black">
            <Link href="/" className="hover:text-zinc-600 transition-colors py-2">
              HOME
            </Link>
            <Link href="/shop" className="hover:text-zinc-600 transition-colors py-2">
              SHOP ALL
            </Link>

            <div
              className="relative py-6"
              onMouseEnter={() => setActiveMenu('anime')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=anime"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                ANIME <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </Link>
              {activeMenu === 'anime' && <MegaMenu category="anime" onClose={() => setActiveMenu(null)} />}
            </div>

            <div
              className="relative py-6"
              onMouseEnter={() => setActiveMenu('marvel')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=marvel"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                MARVEL <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </Link>
              {activeMenu === 'marvel' && <MegaMenu category="marvel" onClose={() => setActiveMenu(null)} />}
            </div>

            <div
              className="relative py-6"
              onMouseEnter={() => setActiveMenu('dc')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=dc"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                DC COMICS <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </Link>
              {activeMenu === 'dc' && <MegaMenu category="dc" onClose={() => setActiveMenu(null)} />}
            </div>

            <Link href="/shop?isNew=true" className="hover:text-zinc-600 transition-colors py-2 font-black border-b-2 border-black">
              NEW DROPS
            </Link>
          </nav>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={openSearch}
              className="p-2 text-zinc-700 hover:text-black transition-colors rounded-lg hover:bg-zinc-100"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 text-zinc-700 hover:text-black transition-colors rounded-lg hover:bg-zinc-100"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center font-mono">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative p-2.5 bg-black text-white font-bold hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline-block text-xs font-black font-mono">
                {totalCartCount}
              </span>
            </button>

            <Link
              href="/login"
              className="hidden sm:flex p-2 text-zinc-700 hover:text-black transition-colors rounded-lg hover:bg-zinc-100"
              title="Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 font-mono text-xs uppercase text-black">
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block font-bold hover:text-zinc-600 py-1">
            Shop All Drops
          </Link>
          <Link href="/shop?category=anime" onClick={() => setMobileMenuOpen(false)} className="block font-bold hover:text-zinc-600 py-1">
            Anime Streetwear
          </Link>
          <Link href="/shop?category=marvel" onClick={() => setMobileMenuOpen(false)} className="block font-bold hover:text-zinc-600 py-1">
            Marvel Drop Shoulders
          </Link>
          <Link href="/shop?category=dc" onClick={() => setMobileMenuOpen(false)} className="block font-bold hover:text-zinc-600 py-1">
            DC Gothic Collection
          </Link>
          <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="block text-zinc-600 hover:text-black py-1">
            Track Order Status
          </Link>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-black font-black py-1">
            Login / Register
          </Link>
        </div>
      )}
    </header>
  );
};
