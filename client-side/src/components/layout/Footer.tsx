'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw, Award, Share2, Globe, MessageCircle, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-zinc-600 border-t border-zinc-200 pt-16 pb-12">
      {/* Brand Value Propositions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-none bg-zinc-50 border border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-black text-white flex items-center justify-center shrink-0 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-black uppercase tracking-wider">Fast Express Delivery</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Free shipping across Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-black text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-black uppercase tracking-wider">240+ GSM Heavy Cotton</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Pre-shrunk premium fabric</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-black text-white flex items-center justify-center shrink-0 shadow-md">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-black uppercase tracking-wider">7-Day Easy Returns</h5>
              <p className="text-xs text-zinc-500 mt-0.5">Hassle-free size replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-black text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-black uppercase tracking-wider">Secure Payment</h5>
              <p className="text-xs text-zinc-500 mt-0.5">bKash, Nagad & SSLCommerz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-200 font-mono">
        {/* Column 1: Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo/Kheoo-logo.png"
              alt="KHEOO Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-black text-black tracking-widest uppercase">
              KHEOO
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-zinc-600 max-w-sm font-sans">
            KHEOO is a premium streetwear brand based in Dhaka, Bangladesh, specializing in drop shoulder and oversized graphic tees crafted from 240+ GSM heavyweight combed cotton.
          </p>
          <p className="text-xs font-mono text-zinc-700 font-bold">
            Contact: <a href="mailto:hello@kheoo.com" className="underline hover:text-black">hello@kheoo.com</a>
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-9 h-9 rounded-none bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black hover:border-black transition-colors" title="Instagram">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-none bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black hover:border-black transition-colors" title="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-none bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black hover:border-black transition-colors" title="Community">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-none bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black hover:border-black transition-colors" title="Drops">
              <Sparkles className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div>
          <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Collections</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/shop?category=anime" className="hover:text-black transition-colors">Anime Streetwear</Link></li>
            <li><Link href="/shop?category=marvel" className="hover:text-black transition-colors">Marvel Drop Shoulders</Link></li>
            <li><Link href="/shop?category=dc" className="hover:text-black transition-colors">DC Gothic Tees</Link></li>
            <li><Link href="/shop?isNew=true" className="hover:text-black transition-colors">New Drop 01</Link></li>
            <li><Link href="/shop?isBestSeller=true" className="hover:text-black transition-colors">Best Sellers</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/track-order" className="hover:text-black transition-colors">Track Order</Link></li>
            <li><Link href="/faq" className="hover:text-black transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">Contact Support</Link></li>
            <li><Link href="/about" className="hover:text-black transition-colors">About KHEOO</Link></li>
            <li><Link href="/dashboard" className="hover:text-black transition-colors">My Account</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Policies */}
        <div>
          <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Policies</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-black transition-colors">Shipping Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-black transition-colors">Refund & Return Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <p className="text-zinc-500">
          © {new Date().getFullYear()} KHEOO. All rights reserved. Premium Streetwear Apparel — Dhaka, Bangladesh.
        </p>

        <div className="flex items-center gap-2 text-zinc-700 text-[10px]">
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">bKash</span>
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">Nagad</span>
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">Rocket</span>
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">SSLCommerz</span>
          <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
