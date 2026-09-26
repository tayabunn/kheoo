'use client';

import React from 'react';
import { Truck, ShieldCheck, Zap } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white font-mono py-2 px-3 sm:px-4 border-b border-zinc-800">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        {/* Left perks (desktop) */}
        <div className="hidden md:flex items-center gap-4 text-white text-xs">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-white" /> FREE EXPRESS SHIPPING OVER $50
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white" /> 240+ GSM HEAVYWEIGHT COTTON
          </span>
        </div>

        {/* Center promo code (mobile & desktop responsive) */}
        <div className="w-full md:w-auto text-center flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white font-semibold">
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span className="truncate">
            USE CODE <span className="text-black bg-white px-1.5 py-0.5 rounded-none font-black uppercase text-[9px] sm:text-[10px] mx-1">KHEOO10</span> FOR 10% OFF
          </span>
        </div>

        {/* Right quick links (desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-white text-[11px]">
          <a href="/track-order" className="hover:text-zinc-300 transition-colors">TRACK ORDER</a>
          <span>•</span>
          <a href="/contact" className="hover:text-zinc-300 transition-colors">SUPPORT</a>
        </div>
      </div>
    </div>
  );
};
