import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Feather, Layers, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About KHEOO | Engineered Streetwear Dhaka',
  description: 'Learn about KHEOO - Bangladesh premier drop shoulder streetwear brand crafting 240+ GSM heavyweight pop-culture apparel.',
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-16 md:py-24 bg-white text-black min-h-screen font-sans">
      <div className="w-[90%] mx-auto space-y-10 sm:space-y-16">
        {/* Header Hero */}
        <div className="border-b border-zinc-200 pb-6 sm:pb-10">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
            THE KHEOO ARCHIVE
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-black leading-tight">
            CRAFTED FOR THOSE WHO WEAR THEIR CULTURE.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 font-sans mt-3 sm:mt-4 max-w-2xl leading-relaxed">
            Born in Dhaka, Bangladesh, KHEOO exists to redefine casual streetwear through heavyweight fabric engineering, boxy drape aesthetics, and authentic anime & pop-culture graphic lore.
          </p>
        </div>

        {/* Brand Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-8 border border-zinc-200 bg-zinc-50 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white flex items-center justify-center font-mono font-black text-sm sm:text-base">
              240+
            </div>
            <h3 className="text-sm sm:text-base font-black uppercase text-black font-mono">GSM Heavy Cotton</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              100% combed ringspun cotton fabric specifically engineered to provide clean structured drape that never loses its boxy shape.
            </p>
          </div>

          <div className="p-5 sm:p-8 border border-zinc-200 bg-zinc-50 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white flex items-center justify-center">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-black uppercase text-black font-mono">Puff & HD Screen Print</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Custom-cured plastisol, metallic foil, and 3D puff inks engineered to withstand 50+ wash cycles without cracking or fading.
            </p>
          </div>

          <div className="p-5 sm:p-8 border border-zinc-200 bg-zinc-50 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-black uppercase text-black font-mono">Limited Edition Drops</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              We release curated, limited-quantity drops across Anime, Marvel, DC, and Cyberpunk themes to keep every design exclusive.
            </p>
          </div>
        </div>

        {/* Manufacturing & Craftsmanship Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-8 border-t border-b border-zinc-200">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              LOCAL MANUFACTURE • GLOBAL STANDARD
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
              Why We Refuse To Make Basic T-Shirts
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              Most commercial t-shirts use thin 140–160 GSM fabric that shrinks after one wash and clings awkwardly. At KHEOO, every single pattern is custom-developed from scratch: thick 1.2-inch ribbed crewnecks, lowered shoulder seams, and pre-shrunk cotton yarn.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              Whether you are rocking Gojo’s Unlimited Void or the Symbiote Spider-Man graphic, you feel the weight, durability, and craftsmanship the moment you put it on.
            </p>
          </div>

          <div className="bg-zinc-100 border border-zinc-200 p-8 font-mono space-y-4">
            <h3 className="text-xs font-black uppercase text-black">Our 5 Production Standards:</h3>
            <ul className="space-y-2.5 text-xs text-zinc-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black" /> 100% Combed Ringspun Organic Cotton
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black" /> Pre-shrunk Fabric (Guaranteed 0% shrinkage)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black" /> Double-needle Stitched Hem and Sleeves
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black" /> High-Density Puff & Screen Cured Inks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black" /> Tamper-evident Frosted Ziplock Packaging
              </li>
            </ul>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="p-8 bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
          <div>
            <h3 className="text-lg font-black uppercase">Ready To Upgrade Your Streetwear Wardrobe?</h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">Explore our latest limited-run oversized anime & pop-culture drops.</p>
          </div>
          <Link
            href="/shop"
            className="bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase px-6 py-3.5 transition-all shrink-0 flex items-center gap-2"
          >
            Explore All Drops <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
