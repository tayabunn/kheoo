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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-black">
      <AnnouncementBar />

      <div className="w-[90%] mx-auto">
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
              className="p-2 text-zinc-700 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 text-zinc-700 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-black rounded-none flex items-center justify-center font-mono">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative p-2.5 bg-black text-white font-bold hover:bg-zinc-800 rounded-none flex items-center gap-2 transition-all shadow-md active:scale-95 border border-black"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline-block text-xs font-black font-mono">
                {totalCartCount}
              </span>
            </button>

            {/* Account Icon / Dropdown */}
            <UserAccountButton />
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
        className="hidden sm:flex p-2 text-zinc-700 hover:text-black transition-colors rounded-none hover:bg-zinc-100"
        title="Sign In / Register"
      >
        <User className="w-5 h-5" />
      </Link>
    );
  }

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1.5 border border-zinc-300 hover:border-black transition-colors rounded-none bg-zinc-50"
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
            href="/track-order"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-zinc-700 hover:bg-zinc-100 uppercase"
          >
            My Orders
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-zinc-700 hover:bg-zinc-100 uppercase"
          >
            Wishlist
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
