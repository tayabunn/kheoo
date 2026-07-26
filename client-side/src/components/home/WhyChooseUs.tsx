'use client';

import React from 'react';
import { Feather, Layers, Zap, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Feather,
      title: '240+ GSM Heavy Cotton',
      description: 'Crafted from ultra-soft combed organic cotton with superior drape and durability.',
    },
    {
      icon: Layers,
      title: 'High-Density Screen Printing',
      description: 'Puff and screen prints that never crack or fade even after 50+ wash cycles.',
    },
    {
      icon: Zap,
      title: 'Engineered Drop Fit',
      description: 'Custom relaxed shoulders and ribbed thick crewneck for authentic streetwear silhouette.',
    },
    {
      icon: Truck,
      title: 'Lightning Express Shipping',
      description: 'Dispatched within 24 hours in stealth premium packaging.',
    },
  ];

  return (
    <section className="py-20 bg-white text-black border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 font-mono">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            THE KHEOO STANDARD
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
            WHY WE ARE DIFFERENT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-50 p-8 rounded-lg border border-zinc-200 hover:border-black transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-black mb-2 uppercase">{feat.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
