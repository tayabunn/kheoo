'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  subtitle: string;
  titleTop: string;
  titleMain: string;
  description: string;
  priceTag: string;
  priceSub: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  image: string;
  tags: string[];
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: '🔥 SPECIAL OFFER • LIMITED TIME',
    subtitle: 'Comfortable, Stylish & Trendy',
    titleTop: 'PREMIUM QUALITY',
    titleMain: 'T-SHIRT',
    description: 'Crafted from 240+ GSM heavyweight 100% combed cotton. Engineered with custom relaxed drop shoulders & high-density puff print.',
    priceTag: '450.00 TK',
    priceSub: 'REGULAR PRICE 650 TK',
    ctaText: 'ORDER NOW',
    ctaLink: '/shop',
    bgGradient: 'from-zinc-900 via-black to-zinc-950',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=80',
    tags: ['240+ GSM', '100% Cotton', 'Pre-Shrunk'],
  },
  {
    id: 2,
    badge: '⚡ BUNDLE DEAL • BUY ANY 2 @ 999 TK',
    subtitle: 'Official Graphic Sagas',
    titleTop: 'MARVEL & DC',
    titleMain: 'COLLECTION',
    description: 'Exclusive Venom, Spider-Man & Batman oversized streetwear drop shoulder tees with scratch-resistant screen print artwork.',
    priceTag: '999.00 TK',
    priceSub: 'BUY 2 SAVE 300 TK',
    ctaText: 'EXPLORE MARVEL',
    ctaLink: '/shop?category=marvel',
    bgGradient: 'from-red-950 via-zinc-950 to-black',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=80',
    tags: ['Buy 2 Get Discount', 'Puff Print', 'Free Delivery'],
  },
  {
    id: 3,
    badge: '✨ NEW DROP 01 • LIVE NOW',
    subtitle: 'Authentic Street Culture',
    titleTop: 'ANIME OVERSIZED',
    titleMain: 'DROP SHOULDER',
    description: 'Jujutsu Kaisen, Attack on Titan & Akatsuki limited edition streetwear. Designed for extreme durability & breathable comfort.',
    priceTag: '499.00 TK',
    priceSub: 'EXCLUSIVE DROP',
    ctaText: 'SHOP ANIME DROPS',
    ctaLink: '/shop?category=anime',
    bgGradient: 'from-zinc-900 via-zinc-950 to-neutral-900',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&auto=format&fit=crop&q=80',
    tags: ['Anime Collab', 'Oversized Fit', 'Heavy Cotton'],
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto-slide every 4 seconds continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Mobile touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <section className="relative bg-black text-white overflow-hidden select-none border-b border-zinc-800">
      <div
        className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[600px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Track */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative min-h-[500px] sm:min-h-[540px] md:min-h-[600px] flex items-center"
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.titleMain}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center brightness-45"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
              </div>

              {/* Content Container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Content */}
                  <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-md text-xs font-mono text-white/90 shadow-lg">
                      <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse shrink-0" />
                      <span className="tracking-wide font-bold">{slide.badge}</span>
                    </div>

                    <p className="text-amber-400 font-serif italic text-lg sm:text-2xl tracking-wide font-medium">
                      ~ {slide.subtitle} ~
                    </p>

                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white/80 font-mono">
                        {slide.titleTop}
                      </h2>
                      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400 leading-none">
                        {slide.titleMain}
                      </h1>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-[11px]">
                      {slide.tags.map((tag, i) => (
                        <span key={i} className="bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 px-3 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <Link
                        href={slide.ctaLink}
                        className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-lg shadow-2xl flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 group font-mono"
                      >
                        <ShoppingBag className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </Link>

                      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-3 rounded-lg">
                        <div className="text-left">
                          <span className="text-xs font-mono text-zinc-400 block -mb-0.5">{slide.priceSub}</span>
                          <span className="text-xl font-black text-amber-400 font-mono tracking-tight">{slide.priceTag}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Feature Card Visual */}
                  <div className="lg:col-span-4 hidden lg:flex justify-end">
                    <div className="relative w-72 h-80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                      <Image
                        src={slide.image}
                        alt={slide.titleMain}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase">FEATURED DROP</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <h4 className="text-sm font-black text-white uppercase mt-0.5">{slide.titleMain}</h4>
                        <p className="text-xs font-bold text-amber-400 mt-1">{slide.priceTag}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-lg bg-black/70 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-lg bg-black/70 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 h-2.5 bg-amber-400 rounded-full shadow-md'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80 rounded-full'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
