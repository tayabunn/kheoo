'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FeaturedCategories: React.FC = () => {
  const featuredLarge = {
    name: 'Shirt & Denim Combo',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&auto=format&fit=crop&q=80',
    link: '/shop?category=streetwear',
  };

  const gridCategories = [
    {
      name: 'DC & Marvel T-shirts',
      image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=marvel',
    },
    {
      name: 'Denim and Trousers',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=denim',
    },
    {
      name: 'Premium Brand T-shirts',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=streetwear',
    },
    {
      name: 'China Micro Spandex Polo',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=polo',
    },
  ];

  return (
    <section className="py-6 sm:py-10 md:py-16 bg-white text-black w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[90%] lg:px-0 mx-auto">
        {/* Centered Heading */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-center text-black font-sans mb-4 sm:mb-8 md:mb-10 uppercase">
          Shop by category
        </h2>

        {/* Categories Layout: Left Large Card (1 col) + Right 2x2 Grid (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
          {/* Left: Large Featured Category */}
          <Link
            href={featuredLarge.link}
            className="group relative rounded-none overflow-hidden bg-zinc-100 aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[200px] sm:min-h-[360px] flex flex-col justify-end w-full"
          >
            <Image
              src={featuredLarge.image}
              alt={featuredLarge.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Bottom Gradient Overlay + Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4 sm:p-6 md:p-8 flex flex-col justify-end">
              <h3 className="text-base sm:text-2xl md:text-3xl font-black text-white text-left leading-tight drop-shadow-sm">
                {featuredLarge.name}
              </h3>
            </div>
          </Link>

          {/* Right: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
            {gridCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group relative rounded-none overflow-hidden bg-zinc-100 aspect-square flex flex-col justify-end w-full"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Bottom Gradient Overlay + Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2.5 sm:p-4 md:p-6 flex flex-col justify-end">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white text-left leading-tight drop-shadow-sm line-clamp-2">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Centered Button: VIEW ALL CATEGORIES */}
        <div className="mt-6 sm:mt-10 md:mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 bg-[#1c1c1e] hover:bg-black text-white text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl transition-all shadow-sm active:scale-95 border border-black"
          >
            <span>VIEW ALL CATEGORIES</span>
            <span className="text-xs">›</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
