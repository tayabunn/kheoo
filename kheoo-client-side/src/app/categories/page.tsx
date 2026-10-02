import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Categories — KHEOO Heavyweight Streetwear',
  description: 'Explore all streetwear categories: Anime, Marvel, DC Comics, Polo, Acid Wash, and Oversized Heavy Cotton Drops.',
};

interface CategoryCard {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
  link: string;
  itemCount?: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'anime',
    name: 'Anime Streetwear',
    subtitle: 'Naruto, Gojo, AOT & Gear 5',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=anime',
    itemCount: '6 Drops',
  },
  {
    id: 'marvel',
    name: 'Marvel Collection',
    subtitle: 'Spider-Man, Deadpool, Venom',
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=marvel',
    itemCount: '5 Drops',
  },
  {
    id: 'dc',
    name: 'DC Comics Gothic',
    subtitle: 'Batman Tactical & Joker Acid',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=dc',
    itemCount: '4 Drops',
  },
  {
    id: 'polo',
    name: 'China Micro Spandex Polo',
    subtitle: 'Premium Stretch & Collar',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=polo',
    itemCount: 'Featured',
  },
  {
    id: 'oversized',
    name: 'Oversized Heavy Tees',
    subtitle: '240+ GSM Combed Cotton',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    link: '/shop',
    itemCount: 'All Tees',
  },
  {
    id: 'new-drops',
    name: 'New Drops & Arrivals',
    subtitle: 'Latest Streetwear Releases',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    link: '/shop?isNew=true',
    itemCount: 'New',
  },
  {
    id: 'denim-combo',
    name: 'Shirt & Denim Combo',
    subtitle: 'Heavy Washed & Streetwear Fits',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=streetwear',
    itemCount: 'Trending',
  },
  {
    id: 'islamic',
    name: 'Islamic Arabic Calligraphy',
    subtitle: 'Minimalist Gold & Screen',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    link: '/shop?category=islamic',
    itemCount: 'Capsule',
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white text-black py-6 sm:py-10 pb-20">
      <div className="w-[90%] mx-auto">
        {/* Breadcrumbs (Matching Image 1: Home > Categories) */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-1.5 text-xs sm:text-sm font-sans text-zinc-500">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </li>
            <li className="text-black font-semibold" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>

        {/* Category Cards Grid (2 columns on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 md:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative block overflow-hidden bg-zinc-100 aspect-[4/5] transition-all duration-300 shadow-sm hover:shadow-xl rounded-none"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                priority={idx < 4}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Top Right Corner Badge */}
              {cat.itemCount && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                  <span className="bg-black/80 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 uppercase tracking-wider">
                    {cat.itemCount}
                  </span>
                </div>
              )}

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-3 sm:p-5 md:p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-1 sm:gap-2">
                  <h2 className="text-xs sm:text-base md:text-xl lg:text-2xl font-black text-white leading-tight font-sans drop-shadow-sm group-hover:text-amber-300 transition-colors line-clamp-2">
                    {cat.name}
                  </h2>
                  <div className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition-all">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                {cat.subtitle && (
                  <p className="text-[9px] sm:text-xs text-zinc-300 font-mono mt-0.5 sm:mt-1 opacity-90 line-clamp-1">
                    {cat.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
