'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const items = Array.from({ length: 12 });

  return (
    <div className="relative w-full bg-black text-white overflow-hidden border-b border-zinc-800 py-2 sm:py-2.5 z-40 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {/* First track */}
        <div className="flex items-center shrink-0">
          {items.map((_, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-5 sm:gap-8 mx-3 sm:mx-5 shrink-0">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest uppercase text-white font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span>USE CODE</span>
                <span className="bg-white text-black font-black px-2 py-0.5 text-xs sm:text-sm tracking-wider">
                  KHEOO10
                </span>
                <span>FOR 10% OFF</span>
              </span>
              <span className="text-zinc-500 font-mono text-xs">✦</span>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {items.map((_, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-5 sm:gap-8 mx-3 sm:mx-5 shrink-0">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest uppercase text-white font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span>USE CODE</span>
                <span className="bg-white text-black font-black px-2 py-0.5 text-xs sm:text-sm tracking-wider">
                  KHEOO10
                </span>
                <span>FOR 10% OFF</span>
              </span>
              <span className="text-zinc-500 font-mono text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
};
