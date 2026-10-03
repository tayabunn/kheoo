'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-10 border-t border-zinc-900 font-sans">
      <div className="w-[90%] mx-auto">
        {/* Top Section: Newsletter Subscription */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between items-center text-center lg:text-left gap-6 sm:gap-10 pb-8 sm:pb-14 md:pb-20 border-b border-zinc-800">
          <div className="max-w-xl mx-auto lg:mx-0">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1.5 sm:mb-2">
              JOIN THE INNER CIRCLE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-black text-white tracking-tight leading-snug sm:leading-[1.15]">
              Subscribe to our newsletter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 sm:mt-3 font-sans leading-relaxed">
              Get secret drop alerts, exclusive 10% discount code & early access to upcoming streetwear collections.
            </p>
          </div>

          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            {subscribed ? (
              <div className="flex items-center gap-2.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-700 text-white px-5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-full font-mono">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <span>You&apos;re in! Check your inbox for code <strong>KHEOO10</strong>.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-zinc-500 rounded-xl sm:rounded-full p-1 sm:p-1.5 transition-all w-full max-w-lg mx-auto lg:mx-0"
              >
                <div className="flex items-center flex-1 px-3 sm:px-4 py-2 sm:py-0">
                  <Mail className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5 sm:mr-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    autoComplete="email"
                    className="w-full bg-transparent text-white placeholder:text-zinc-500 text-xs sm:text-sm focus:outline-none font-mono selection:bg-zinc-700 selection:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-black font-extrabold text-xs uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-full transition-all shrink-0 active:scale-95 text-center mt-1 sm:mt-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Main Content Grid (2 columns on mobile, 5 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-10 py-8 sm:py-14 md:py-20 border-b border-zinc-800">
          {/* Column 1: Brand Info (Spans 2 columns on mobile for clean intro) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO Logo"
                width={80}
                height={80}
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
              A sophisticated e-commerce apparel brand designed for modern and minimalist streetwear enthusiasts in Bangladesh, specializing in 240+ GSM drop shoulder heavy cotton tees.
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full transition-all active:scale-95 shadow-sm"
              >
                <span>Contact Kheoo</span>
                <span className="text-xs">›</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (Side by Side on mobile) */}
          <div className="col-span-1 space-y-3 sm:space-y-4">
            <h4 className="text-[11px] sm:text-sm font-black text-white tracking-widest uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Shop All Drops
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Reviews & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies & Support (Side by Side on mobile) */}
          <div className="col-span-1 space-y-3 sm:space-y-4">
            <h4 className="text-[11px] sm:text-sm font-black text-white tracking-widest uppercase font-mono">
              Policies
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors block py-0.5 sm:py-0">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Contact Details (Spans 2 cols on mobile with modern card styling) */}
          <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-5 pt-4 sm:pt-0 border-t border-zinc-900 lg:border-t-0 bg-zinc-950/70 lg:bg-transparent p-4 sm:p-5 lg:p-0 rounded-2xl lg:rounded-none border lg:border-0 border-zinc-800/80">
            <div>
              <h4 className="text-[11px] sm:text-sm font-black text-white tracking-widest uppercase font-mono mb-2.5 sm:mb-3.5">
                Get in touch
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-zinc-400">
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <a href="mailto:kheoobd@gmail.com" className="hover:text-white transition-colors truncate" title="Send direct email to kheoobd@gmail.com">
                    kheoobd@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <a href="tel:+8801711223344" className="hover:text-white transition-colors">
                    +880 1867-263017
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-zinc-900 lg:border-t-0">
              <h4 className="text-[10px] sm:text-xs font-black text-zinc-400 uppercase tracking-widest mb-2.5 font-mono">
                Connect with us
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://www.instagram.com/kheoobd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-300 hover:text-white transition-all active:scale-95 group"
                  title="Follow us on Instagram (@kheoobd)"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span className="truncate">Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594589775479"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-300 hover:text-white transition-all active:scale-95 group"
                  title="Follow us on Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span className="truncate">Facebook</span>
                </a>
                <a
                  href="mailto:kheoobd@gmail.com"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-300 hover:text-white transition-all active:scale-95 group"
                  title="Send Direct Email (kheoobd@gmail.com)"
                  aria-label="Email Us"
                >
                  <Mail className="w-3.5 h-3.5 transition-transform group-hover:scale-110 shrink-0" />
                  <span className="truncate">Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer: Clean Copyright & Payment Badges */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-zinc-500 font-mono text-center md:text-left">
          <p>© {new Date().getFullYear()} KHEOO. All rights reserved. Dhaka, Bangladesh</p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg font-bold">
              bKash
            </span>
            <span className="bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg font-bold">
              Nagad
            </span>
            <span className="bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg font-bold">
              Rocket
            </span>
            <span className="bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg font-bold">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
