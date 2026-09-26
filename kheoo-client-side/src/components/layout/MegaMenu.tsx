'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  category: 'anime' | 'marvel' | 'dc';
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const content = {
    anime: {
      title: 'Anime Streetwear Collection',
      subcategories: [
        { name: 'Naruto Shippuden', slug: '/shop?category=anime&search=Naruto' },
        { name: 'Jujutsu Kaisen', slug: '/shop?category=anime&search=Gojo' },
        { name: 'Attack on Titan', slug: '/shop?category=anime&search=Titan' },
        { name: 'Demon Slayer', slug: '/shop?category=anime' },
        { name: 'One Piece', slug: '/shop?category=anime' },
        { name: 'Bleach TYBW', slug: '/shop?category=anime' },
      ],
      featured: {
        title: 'GOJO UNLIMITED VOID DROP',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
        badge: 'NEW DROP 01',
        link: '/products/gojo-unlimited-void-oversized-tee',
      },
    },
    marvel: {
      title: 'Marvel Drop Shoulder Collection',
      subcategories: [
        { name: 'Spider-Man Symbiote', slug: '/shop?category=marvel&search=Spider-Man' },
        { name: 'Deadpool & Wolverine', slug: '/shop?category=marvel' },
        { name: 'Venom Dark Edition', slug: '/shop?category=marvel' },
        { name: 'Iron Man Armor Tech', slug: '/shop?category=marvel' },
        { name: 'Captain America Vintage', slug: '/shop?category=marvel' },
      ],
      featured: {
        title: 'SPIDER-MAN SYMBIOTE DROP',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
        badge: 'LIMITED EDITION',
        link: '/products/spider-man-symbiote-vintage-tee',
      },
    },
    dc: {
      title: 'DC Gothic Tactical Streetwear',
      subcategories: [
        { name: 'Batman Dark Knight', slug: '/shop?category=dc&search=Batman' },
        { name: 'Joker Why So Serious', slug: '/shop?category=dc&search=Joker' },
        { name: 'Superman Tactical', slug: '/shop?category=dc' },
        { name: 'Nightwing & Robin', slug: '/shop?category=dc' },
      ],
      featured: {
        title: 'BATMAN DARK KNIGHT TACTICAL',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
        badge: 'HOT SELLER',
        link: '/products/batman-dark-knight-tactical-tee',
      },
    },
  }[category];

  return (
    <div className="absolute top-full left-0 mt-2 w-[600px] sm:w-[640px] bg-white border border-zinc-200 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-black">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left Subcategories List */}
        <div className="col-span-6 border-r border-zinc-100 pr-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-900 font-mono">
              {content.title}
            </h4>
          </div>

          <div className="space-y-1">
            {content.subcategories.map((sub, i) => (
              <Link
                key={i}
                href={sub.slug}
                onClick={onClose}
                className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium text-zinc-700 hover:text-black hover:bg-zinc-100 transition-all"
              >
                <span>{sub.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Featured Drop Card */}
        <div className="col-span-6 pl-2">
          <Link
            href={content.featured.link}
            onClick={onClose}
            className="group relative block overflow-hidden rounded-xl bg-zinc-950 border border-zinc-200 aspect-[4/3] shadow-md"
          >
            <Image
              src={content.featured.image}
              alt={content.featured.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="inline-block self-start text-[9px] font-mono font-black tracking-widest uppercase bg-amber-400 text-black px-2 py-0.5 rounded mb-1.5 shadow">
                {content.featured.badge}
              </span>
              <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-tight font-mono">
                {content.featured.title}
              </h3>
              <p className="text-[11px] text-zinc-300 mt-1.5 flex items-center gap-1 font-mono font-bold">
                SHOP EXCLUSIVE DROP <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

