'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, User, ArrowRight } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-black">
      <AnnouncementBar />

      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-[76px]">
          {/* Left: Logo Only (Aligned Left) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO Logo"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Middle: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[13px] xl:text-sm font-black tracking-wider uppercase text-black">
            <Link href="/shop" className="hover:text-zinc-600 transition-colors py-2">
              SHOP ALL
            </Link>

            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMenu('anime')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=anime"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                <span>ANIME</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Link>
              {activeMenu === 'anime' && <MegaMenu category="anime" onClose={() => setActiveMenu(null)} />}
            </div>

            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMenu('marvel')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=marvel"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                <span>MARVEL</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Link>
              {activeMenu === 'marvel' && <MegaMenu category="marvel" onClose={() => setActiveMenu(null)} />}
            </div>

            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMenu('dc')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/shop?category=dc"
                className="flex items-center gap-1 hover:text-zinc-600 transition-colors"
              >
                <span>DC COMICS</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Link>
              {activeMenu === 'dc' && <MegaMenu category="dc" onClose={() => setActiveMenu(null)} />}
            </div>

            <Link href="/shop?isNew=true" className="hover:text-zinc-600 transition-colors py-2 flex items-center gap-1">
              <span>NEW DROPS</span>
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon (Visible everywhere) */}
            <button
              onClick={openSearch}
              className="h-10 w-10 flex items-center justify-center text-zinc-800 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
              title="Search Drops"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop-Only Wishlist Button */}
            <Link
              href="/wishlist"
              className="hidden lg:flex relative h-10 w-10 items-center justify-center text-zinc-800 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[10px] font-black flex items-center justify-center font-mono">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Desktop-Only Cart Button (Identical h-10 height) */}
            <button
              onClick={openCart}
              className="hidden lg:flex relative h-10 px-3.5 bg-black text-white font-bold hover:bg-zinc-800 rounded-none items-center justify-center gap-2 transition-all shadow-sm active:scale-95 border border-black"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs font-black font-mono">
                {totalCartCount}
              </span>
            </button>

            {/* Desktop User Account Button (Identical h-10 height) */}
            <div className="hidden lg:flex items-center">
              <UserAccountButton />
            </div>

            {/* Mobile-Only Hamburger Toggle on the RIGHT */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (with shifted Wishlist, Cart & navigation) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-5 py-5 space-y-5 font-mono text-xs text-black animate-in fade-in slide-in-from-top duration-200">
          {/* Quick Action Cards: Cart & Wishlist */}
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-200">
            {/* Cart Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="flex items-center justify-between p-3.5 bg-black text-white font-bold text-xs uppercase transition-all active:scale-98 shadow-sm border border-black"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Bag / Cart</span>
              </div>
              <span className="bg-white text-black px-2 py-0.5 text-[11px] font-black rounded-none">
                {totalCartCount}
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-xs uppercase transition-all active:scale-98 border border-zinc-300"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Saved</span>
              </div>
              <span className="bg-black text-white px-2 py-0.5 text-[11px] font-black rounded-none">
                {wishlistItems.length}
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 font-mono uppercase text-xs">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-black text-black border-b border-zinc-100"
            >
              <span>Shop All Drops</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/shop?category=anime"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-800 border-b border-zinc-100"
            >
              <span>Anime Streetwear</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/shop?category=marvel"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-800 border-b border-zinc-100"
            >
              <span>Marvel Collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/shop?category=dc"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-800 border-b border-zinc-100"
            >
              <span>DC Comics Series</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/shop?isNew=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-800 border-b border-zinc-100"
            >
              <span>🔥 New Drops</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-700 border-b border-zinc-100"
            >
              <span>Track Order Status</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-zinc-50 font-bold text-zinc-700 border-b border-zinc-100"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>

          {/* User Account / Auth Section */}
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Member Sign In / Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const UserAccountButton: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email?: string; avatar?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kheoo_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kheoo_user');
    setUser(null);
    setDropdownOpen(false);
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="h-10 w-10 flex items-center justify-center text-zinc-800 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
        title="Sign In / Register"
      >
        <User className="w-5 h-5" />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="h-10 px-3 flex items-center gap-2 border border-zinc-300 hover:border-black transition-colors rounded-none bg-zinc-50 shadow-sm active:scale-98"
        title={user.name || user.email}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-mono font-bold flex items-center justify-center uppercase">
            {(user.name || user.email || 'U')[0]}
          </div>
        )}
        <span className="text-xs font-mono font-bold uppercase max-w-[80px] truncate">
          {user.name ? user.name.split(' ')[0] : 'Account'}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-xl py-2 z-50 font-mono text-xs">
          <div className="px-4 py-2 border-b border-zinc-100">
            <p className="font-bold text-black truncate">{user.name || 'User'}</p>
            <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
          </div>
          <Link
            href="/admin/dashboard?tab=pos"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-emerald-600 hover:bg-emerald-50 uppercase font-black"
          >
            ⚡ POS Terminal
          </Link>
          <Link
            href="/admin/dashboard"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-zinc-700 hover:bg-zinc-100 uppercase font-bold"
          >
            Admin Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 uppercase font-bold border-t border-zinc-100 mt-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
