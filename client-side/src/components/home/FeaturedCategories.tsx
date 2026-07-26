'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FeaturedCategories: React.FC = () => {
  const rightCategories = [
    {
      name: 'DC & Marvel T-shirts',
      image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=marvel',
    },
    {
      name: 'Automobile T-shirts',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=anime',
    },
    {
      name: 'GTR Nismo T-shirts',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=dc',
    },
    {
      name: 'Islamic T-shirts',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      link: '/shop?category=islamic',
    },
  ];

  return (
    <section className="py-16 md:py-24 text-black border-b border-zinc-200">
      <div className="w-[85%] mx-auto px-4 sm:px-0 lg:px-2">
        {/* Centered Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-black mb-10 md:mb-12 font-sans">
          Shop by category
        </h2>

        {/* Category Grid: Left Large Feature + Right 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Large Feature Card */}
          <Link
            href="/shop?category=polo"
            className="group relative rounded-none overflow-hidden bg-zinc-100 border border-zinc-200 lg:col-span-6 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex flex-col justify-end"
          >
            <Image
              src="/assets/images/t-shirts/don-delfin-almonte-ebTNU_YTWgc-unsplash.jpg"
              alt="China Micro Spandex Polo"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                China Micro Spandex Polo
              </h3>
            </div>
          </Link>

          {/* Right 2x2 Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {rightCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group relative rounded-none overflow-hidden bg-zinc-100 border border-zinc-200 aspect-square flex flex-col justify-end"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 sm:p-5 flex flex-col justify-end">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Centered Button */}
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block bg-zinc-900 hover:bg-black text-white text-xs font-bold font-mono tracking-widest uppercase px-8 py-4 transition-all shadow-md hover:scale-105 active:scale-95 border border-zinc-800"
          >
            VIEW ALL CATEGORIES
          </Link>
        </div>
      </div>
    </section>
  );
};

