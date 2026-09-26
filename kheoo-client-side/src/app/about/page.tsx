import React from 'react';

export default function AboutPage() {
  return (
    <div className="py-16 bg-white text-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            OUR STORY
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mt-1">
            ABOUT KHEOO
          </h1>
        </div>

        <div className="space-y-6 text-sm text-zinc-700 leading-relaxed font-sans border-t border-zinc-200 pt-8">
          <p>
            KHEOO is a premium streetwear brand based in Dhaka, Bangladesh, established with a singular mission: engineering high-end drop shoulder T-shirts that combine heavy fabric weight (240+ GSM), impeccable boxy silhouettes, and high-density artwork inspired by global pop culture, anime sagas, and graphic lore.
          </p>
          <p>
            Every piece in our drops is crafted from 100% combed ringspun cotton, pre-shrunk to guarantee zero shrinkage, and printed with puff & screen ink technology designed to withstand endless wash cycles.
          </p>
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-lg font-mono text-xs text-black">
            &quot;We don&apos;t make mass clothing. We craft limited drop streetwear for individuals who wear their culture.&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
