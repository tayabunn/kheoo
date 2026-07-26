'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      name: 'Anime Streetwear',
      subtitle: 'Naruto, Gojo, Titan & Demon Slayer Prints',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=anime',
      colSpan: 'md:col-span-8',
    },
    {
      name: 'Marvel Drop Shoulders',
      subtitle: 'Spider-Man Symbiote & Venom Editions',
      image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=marvel',
      colSpan: 'md:col-span-4',
    },
    {
      name: 'DC Gothic Tactical',
      subtitle: 'Batman & Joker Dark Graphic Tees',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=dc',
      colSpan: 'md:col-span-4',
    },
    {
      name: 'Limited Edition Drops',
      subtitle: 'Numbered Oversized Collectibles',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      link: '/shop?isNew=true',
      colSpan: 'md:col-span-8',
    },
  ];

  return (
    <section className="py-20 bg-white text-black border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
              CURATED COLLECTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
              EXPLORE CATEGORIES
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 text-xs font-mono font-bold text-zinc-600 hover:text-black uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            VIEW ALL CATEGORIES <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className={`group relative rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 aspect-[16/9] ${cat.colSpan}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase group-hover:text-zinc-200 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-200 mt-1 font-mono">{cat.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-md bg-white text-black flex items-center justify-center group-hover:bg-zinc-200 transition-all shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
