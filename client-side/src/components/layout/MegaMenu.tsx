'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap } from 'lucide-react';

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
    <div className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-zinc-200 shadow-2xl p-8 z-50 animate-in fade-in duration-200 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-5 border-r border-zinc-200 pr-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-black" />
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-black">
              {content.title}
            </h4>
          </div>
          <ul className="space-y-2.5">
            {content.subcategories.map((sub, i) => (
              <li key={i}>
                <Link
                  href={sub.slug}
                  onClick={onClose}
                  className="group flex items-center justify-between text-zinc-600 hover:text-black text-xs font-mono transition-colors py-1"
                >
                  <span>{sub.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-black" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-7 pl-4">
          <Link
            href={content.featured.link}
            onClick={onClose}
            className="group relative block overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200 aspect-[16/7]"
          >
            <Image
              src={content.featured.image}
              alt={content.featured.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="inline-block self-start text-[9px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1 rounded-md mb-2">
                {content.featured.badge}
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-zinc-200 transition-colors uppercase">
                {content.featured.title}
              </h3>
              <p className="text-xs text-zinc-200 mt-1 flex items-center gap-1 font-mono">
                SHOP EXCLUSIVE DROP <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
