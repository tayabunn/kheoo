'use client';

import React from 'react';
import { Feather, Layers, Zap, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Feather,
      title: '240+ GSM Heavy Cotton',
      description: 'Ultra-soft combed organic cotton with superior drape and shape retention.',
    },
    {
      icon: Layers,
      title: 'High-Density Screen Print',
      description: 'Cured 3D puff and screen prints that never crack or fade across 50+ washes.',
    },
    {
      icon: Zap,
      title: 'Engineered Drop Fit',
      description: 'Relaxed shoulders and thick ribbed crewneck for authentic streetwear drape.',
    },
    {
      icon: Truck,
      title: 'Lightning Shipping',
      description: 'Dispatched within 24 hours in stealth premium ziplock packaging.',
    },
  ];

  return (
    <section className="py-8 sm:py-14 md:py-20 bg-white text-black border-b border-zinc-200">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[90%] lg:px-0 mx-auto">
        <div className="text-center mb-6 sm:mb-10 md:mb-12 font-mono">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">
            WHY WE ARE DIFFERENT
          </h2>
        </div>

        {/* 2x2 Grid on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-50 p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-zinc-200 hover:border-black transition-all group flex flex-col justify-start"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-black text-white flex items-center justify-center mb-2.5 sm:mb-4 group-hover:scale-105 transition-transform shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-black text-black mb-1 uppercase leading-snug">
                  {feat.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-zinc-600 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
