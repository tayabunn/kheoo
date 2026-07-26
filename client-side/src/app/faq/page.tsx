import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'What is the fabric weight and GSM of KHEOO T-shirts?',
      a: 'All KHEOO drop shoulder tees are crafted from 240+ GSM 100% combed ringspun cotton, offering maximum structure, softness, and drop fit.',
    },
    {
      q: 'How does the sizing fit?',
      a: 'Our tees are intentionally cut with an oversized drop shoulder fit. We recommend ordering your true size for an authentic streetwear look.',
    },
    {
      q: 'Will the print fade or crack after washing?',
      a: 'No. We use high-density screen printing and puff ink technology cured at high temperatures for long-lasting vibrant prints.',
    },
    {
      q: 'What is your delivery timeframe?',
      a: 'Orders are processed within 24 hours. Express shipping delivers within 2–4 business days nationwide.',
    },
  ];

  return (
    <div className="py-16 bg-white text-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            HELP CENTER
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mt-1">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-black uppercase font-mono">{item.q}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
