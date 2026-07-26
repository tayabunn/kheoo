'use client';

import React from 'react';
import { Truck, ShieldCheck, Zap } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-zinc-100 text-black text-xs font-mono py-2.5 px-4 border-b border-zinc-200">
      <div className="w-[85%] mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-4 text-zinc-600">
          <span className="flex items-center gap-1.5 hover:text-black transition-colors">
            <Truck className="w-3.5 h-3.5 text-black" /> FREE EXPRESS SHIPPING OVER $50
          </span>
          <span className="text-zinc-300">•</span>
          <span className="flex items-center gap-1.5 hover:text-black transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-black" /> 240+ GSM HEAVYWEIGHT COTTON
          </span>
        </div>

        <div className="flex-1 text-center md:flex-initial flex items-center justify-center gap-2 text-black font-semibold">
          <Zap className="w-3.5 h-3.5 text-black animate-pulse" />
          <span>
            USE CODE <strong className="text-white bg-black px-2 py-0.5 rounded font-black uppercase">KHEOO10</strong> FOR 10% OFF YOUR FIRST DROP
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-zinc-600 text-[11px]">
          <a href="/track-order" className="hover:text-black transition-colors">TRACK ORDER</a>
          <span>•</span>
          <a href="/contact" className="hover:text-black transition-colors">SUPPORT</a>
        </div>
      </div>
    </div>
  );
};
