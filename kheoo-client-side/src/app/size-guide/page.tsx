'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Ruler, Sparkles, ArrowRight } from 'lucide-react';

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const sizeChart = [
    {
      size: 'S',
      chestIn: '40 – 42',
      lengthIn: '28',
      shoulderIn: '20',
      sleeveIn: '8.5',
      chestCm: '102 – 107',
      lengthCm: '71',
      shoulderCm: '51',
      sleeveCm: '21.5',
      recommendedFit: 'Height 5’3” – 5’6” • Lean to athletic build',
    },
    {
      size: 'M',
      chestIn: '42 – 44',
      lengthIn: '29',
      shoulderIn: '21',
      sleeveIn: '9.0',
      chestCm: '107 – 112',
      lengthCm: '74',
      shoulderCm: '53.5',
      sleeveCm: '23',
      recommendedFit: 'Height 5’6” – 5’9” • Regular relaxed drop fit',
    },
    {
      size: 'L',
      chestIn: '44 – 46',
      lengthIn: '30',
      shoulderIn: '22',
      sleeveIn: '9.5',
      chestCm: '112 – 117',
      lengthCm: '76',
      shoulderCm: '56',
      sleeveCm: '24',
      recommendedFit: 'Height 5’9” – 6’0” • Authentic boxy streetwear fit (Most Popular)',
    },
    {
      size: 'XL',
      chestIn: '46 – 48',
      lengthIn: '31',
      shoulderIn: '23',
      sleeveIn: '10.0',
      chestCm: '117 – 122',
      lengthCm: '79',
      shoulderCm: '58.5',
      sleeveCm: '25.5',
      recommendedFit: 'Height 6’0”+ or Heavyweight oversized drape',
    },
    {
      size: 'XXL',
      chestIn: '48 – 50',
      lengthIn: '32',
      shoulderIn: '24',
      sleeveIn: '10.5',
      chestCm: '122 – 127',
      lengthCm: '81',
      shoulderCm: '61',
      sleeveCm: '26.5',
      recommendedFit: 'Maximalist baggy silhouette',
    },
  ];

  return (
    <div className="py-8 sm:py-16 md:py-24 bg-white text-black min-h-screen font-sans">
      <div className="w-[90%] mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-4 sm:pb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1 sm:mb-2">
                FIT & MEASUREMENT MATRIX
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
                Streetwear Size Guide
              </h1>
              <p className="text-xs font-mono text-zinc-500 mt-1 sm:mt-2">
                Engineered with 240+ GSM heavyweight drop shoulders & relaxed boxy cuts.
              </p>
            </div>

            {/* Unit Toggle */}
            <div className="inline-flex p-1 bg-zinc-100 border border-zinc-300 font-mono text-xs">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1.5 font-bold uppercase transition-all ${
                  unit === 'inches' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Inches (IN)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1.5 font-bold uppercase transition-all ${
                  unit === 'cm' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Centimeters (CM)
              </button>
            </div>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="bg-white border border-zinc-200 overflow-hidden font-mono">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                <tr>
                  <th className="py-3.5 px-4">Size</th>
                  <th className="py-3.5 px-4">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3.5 px-4">Length ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3.5 px-4">Shoulder ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3.5 px-4">Sleeve ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3.5 px-4">Recommended Body Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-mono">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-4 font-black text-sm text-black">
                      <span className="w-8 h-8 bg-zinc-100 border border-zinc-300 inline-flex items-center justify-center">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-black">
                      {unit === 'inches' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-4 px-4 text-zinc-700">
                      {unit === 'inches' ? row.lengthIn : row.lengthCm}
                    </td>
                    <td className="py-4 px-4 text-zinc-700">
                      {unit === 'inches' ? row.shoulderIn : row.shoulderCm}
                    </td>
                    <td className="py-4 px-4 text-zinc-700">
                      {unit === 'inches' ? row.sleeveIn : row.sleeveCm}
                    </td>
                    <td className="py-4 px-4 font-sans text-xs text-zinc-600">
                      {row.recommendedFit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 border border-zinc-200 bg-zinc-50 space-y-2">
            <span className="font-black text-black uppercase">01. Chest Width</span>
            <p className="text-zinc-600 font-sans leading-relaxed">
              Measure horizontally from armpit to armpit across the fullest part of the chest with the garment laid flat.
            </p>
          </div>
          <div className="p-5 border border-zinc-200 bg-zinc-50 space-y-2">
            <span className="font-black text-black uppercase">02. Body Length</span>
            <p className="text-zinc-600 font-sans leading-relaxed">
              Measure vertically from the highest point of the ribbed collar down to the bottom hemline.
            </p>
          </div>
          <div className="p-5 border border-zinc-200 bg-zinc-50 space-y-2">
            <span className="font-black text-black uppercase">03. Drop Shoulder</span>
            <p className="text-zinc-600 font-sans leading-relaxed">
              Measured from shoulder seam to seam. Our relaxed seams are engineered to sit stylishly below the natural shoulder bone.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <p className="text-xs font-bold uppercase text-black">Still unsure about your exact size?</p>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">Contact us on WhatsApp or Messenger with your height & weight.</p>
          </div>
          <Link
            href="/contact"
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase px-5 py-2.5 flex items-center gap-2 border border-black"
          >
            Ask Fit Specialist <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
