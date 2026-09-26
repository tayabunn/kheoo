'use client';

import React from 'react';
import { Truck, ShieldCheck, Zap } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white text-xs font-mono py-2.5 px-4 border-b border-zinc-200">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-4 text-white">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-white" /> FREE EXPRESS SHIPPING OVER $50
          </span>
          <span className="text-zinc-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white" /> 240+ GSM HEAVYWEIGHT COTTON
          </span>
        </div>

        <div className="flex-1 text-center md:flex-initial flex items-center justify-center gap-2 text-white font-semibold">
          <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>
            USE CODE <strong className="text-black bg-white px-2 py-0.5 rounded font-black uppercase">KHEOO10</strong> FOR 10% OFF YOUR FIRST DROP
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-white text-[11px]">
          <a href="/track-order" className="">TRACK ORDER</a>
          <span>•</span>
          <a href="/contact" className="">SUPPORT</a>
        </div>
      </div>
    </div>
  );
};
