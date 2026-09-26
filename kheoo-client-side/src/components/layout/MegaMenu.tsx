'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface SubCategoryItem {
  name: string;
  slug: string;
  image: string;
  badge: string;
  title: string;
  link: string;
}

interface MegaMenuProps {
  category: 'anime' | 'marvel' | 'dc';
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const menuData: Record<
    'anime' | 'marvel' | 'dc',
    {
      title: string;
      subcategories: SubCategoryItem[];
    }
  > = {
    anime: {
      title: 'Anime Streetwear Collection',
      subcategories: [
        {
          name: 'Naruto Shippuden',
          slug: '/shop?category=anime&search=Naruto',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          badge: 'SAGE MODE DROP',
          title: 'NARUTO SAGE MODE HEAVY TEE',
          link: '/products/naruto-sage-mode-drop-shoulder-tshirt',
        },
        {
          name: 'Jujutsu Kaisen',
          slug: '/shop?category=anime&search=Jujutsu',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          badge: 'DOMAIN EXPANSION',
          title: 'GOJO UNLIMITED VOID DROP',
          link: '/products/gojo-unlimited-void-oversized-tee',
        },
        {
          name: 'Attack on Titan',
          slug: '/shop?category=anime&search=Titan',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
          badge: 'WINGS OF FREEDOM',
          title: 'SURVEY CORPS HEAVYWEIGHT TEE',
          link: '/products/attack-on-titan-survey-corps-tee',
        },
        {
          name: 'Demon Slayer',
          slug: '/shop?category=anime&search=Demon',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
          badge: 'HINOKAMI KAGURA',
          title: 'TANJIRO FLAME BREATHING TEE',
          link: '/products/tanjiro-hinokami-kagura-tee',
        },
        {
          name: 'One Piece',
          slug: '/shop?category=anime&search=Piece',
          image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
          badge: 'GEAR 5 NIKA',
          title: 'LUFFY SUN GOD NIKA GRAPHIC TEE',
          link: '/products/one-piece-gear-5-nika-tee',
        },
        {
          name: 'Bleach TYBW',
          slug: '/shop?category=anime&search=Bleach',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
          badge: 'BANKAI SPECIAL',
          title: 'ICHIGO THOUSAND-YEAR BLOOD WAR',
          link: '/products/bleach-tybw-ichigo-bankai-tee',
        },
      ],
    },
    marvel: {
      title: 'Marvel Drop Shoulder Collection',
      subcategories: [
        {
          name: 'Spider-Man Symbiote',
          slug: '/shop?category=marvel&search=Spider',
          image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
          badge: 'LIMITED EDITION',
          title: 'SPIDER-MAN SYMBIOTE DROP',
          link: '/products/spider-man-symbiote-vintage-tee',
        },
        {
          name: 'Deadpool & Wolverine',
          slug: '/shop?category=marvel&search=Deadpool',
          image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=600&auto=format&fit=crop&q=80',
          badge: 'CHAOS DUO',
          title: 'DEADPOOL & WOLVERINE TEE',
          link: '/products/deadpool-wolverine-chaos-duo-tee',
        },
        {
          name: 'Venom Dark Edition',
          slug: '/shop?category=marvel&search=Venom',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
          badge: 'LETHAL PROTECTOR',
          title: 'VENOM DARK EDITION GRAPHIC TEE',
          link: '/products/venom-lethal-protector-dark-tee',
        },
        {
          name: 'Iron Man Armor Tech',
          slug: '/shop?category=marvel&search=Iron',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          badge: 'ARC REACTOR',
          title: 'IRON MAN BLUEPRINT TEE',
          link: '/products/iron-man-arc-reactor-blueprint-tee',
        },
        {
          name: 'Captain America Vintage',
          slug: '/shop?category=marvel&search=Captain',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          badge: 'STEALTH SHIELD',
          title: 'CAPTAIN AMERICA VINTAGE TEE',
          link: '/products/captain-america-stealth-shield-tee',
        },
      ],
    },
    dc: {
      title: 'DC Gothic Tactical Streetwear',
      subcategories: [
        {
          name: 'Batman Dark Knight',
          slug: '/shop?category=dc&search=Batman',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
          badge: 'HOT SELLER',
          title: 'BATMAN DARK KNIGHT TACTICAL',
          link: '/products/batman-dark-knight-tactical-tee',
        },
        {
          name: 'Joker Why So Serious',
          slug: '/shop?category=dc&search=Joker',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
          badge: 'GOTHIC GRAFFITI',
          title: 'JOKER WHY SO SERIOUS TEE',
          link: '/products/joker-why-so-serious-gothic-tee',
        },
        {
          name: 'Superman Tactical',
          slug: '/shop?category=dc&search=Superman',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          badge: 'HOUSE OF EL',
          title: 'SUPERMAN KRYPTONIAN TACTICAL',
          link: '/products/superman-house-of-el-tactical-tee',
        },
        {
          name: 'Nightwing & Robin',
          slug: '/shop?category=dc&search=Nightwing',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          badge: 'BLUDHAVEN DROP',
          title: 'NIGHTWING ACROBATICS DROP TEE',
          link: '/products/nightwing-bludhaven-acrobatics-tee',
        },
      ],
    },
  };

  const currentCategoryData = menuData[category];
  const activeSubcategory =
    currentCategoryData.subcategories[hoveredIndex] || currentCategoryData.subcategories[0];

  return (
    <div className="absolute top-full left-0 mt-2 w-[600px] sm:w-[660px] bg-white border border-zinc-200 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-black">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Left Subcategories List with Interactive Hover State */}
        <div className="col-span-6 border-r border-zinc-100 pr-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-900 font-mono">
              {currentCategoryData.title}
            </h4>
          </div>

          <div className="space-y-1">
            {currentCategoryData.subcategories.map((sub, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <Link
                  key={i}
                  href={sub.slug}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isHovered
                      ? 'bg-black text-white shadow-sm translate-x-1'
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isHovered && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    <span>{sub.name}</span>
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-all ${
                      isHovered ? 'text-white translate-x-0.5' : 'text-zinc-400 group-hover:text-black'
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Dynamic Featured Drop Card based on Hovered Item */}
        <div className="col-span-6 pl-2">
          <Link
            href={activeSubcategory.link}
            onClick={onClose}
            className="group relative block overflow-hidden rounded-xl bg-zinc-950 border border-zinc-200 aspect-[4/3] shadow-md transition-all duration-300"
          >
            {/* Background Image that smoothly changes on hover */}
            <Image
              key={activeSubcategory.image}
              src={activeSubcategory.image}
              alt={activeSubcategory.title}
              fill
              sizes="320px"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 animate-in fade-in duration-300"
            />

            {/* Gradient Overlay & Dynamic Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="inline-block self-start text-[9px] font-mono font-black tracking-widest uppercase bg-amber-400 text-black px-2 py-0.5 rounded mb-1.5 shadow">
                {activeSubcategory.badge}
              </span>
              <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-tight font-mono line-clamp-2">
                {activeSubcategory.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-300 mt-1.5 flex items-center gap-1 font-mono font-bold">
                <span>SHOP EXCLUSIVE DROP</span>
                <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
