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
    <section className="py-8 sm:py-12 md:py-16 bg-white text-black">
      <div className="w-[90%] mx-auto">
        {/* Centered Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-center text-black font-sans mb-6 sm:mb-8 md:mb-10">
          Shop by category
        </h2>

        {/* Categories Layout: Left Large Card (1 col) + Right 2x2 Grid (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {/* Left: Large Featured Category */}
          <Link
            href={featuredLarge.link}
            className="group relative rounded-none overflow-hidden bg-zinc-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-[420px] flex flex-col justify-end"
          >
            <Image
              src={featuredLarge.image}
              alt={featuredLarge.name}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Bottom Gradient Overlay + Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 sm:p-7 md:p-8 flex flex-col justify-end">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-left leading-tight drop-shadow-sm">
                {featuredLarge.name}
              </h3>
            </div>
          </Link>

          {/* Right: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {gridCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group relative rounded-none overflow-hidden bg-zinc-100 aspect-square flex flex-col justify-end"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={idx < 2}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Bottom Gradient Overlay + Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3.5 sm:p-5 md:p-6 flex flex-col justify-end">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white text-left leading-snug drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Centered Button: VIEW ALL CATEGORIES */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/shop"
            className="bg-[#181818] hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 sm:px-10 sm:py-4 transition-all duration-300 active:scale-95 text-center shadow-none inline-block"
          >
            VIEW ALL CATEGORIES
          </Link>
        </div>
      </div>
    </section>
  );
};
