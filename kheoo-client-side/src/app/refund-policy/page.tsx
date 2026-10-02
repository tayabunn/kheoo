import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Return & Exchange Policy | KHEOO Streetwear',
  description: 'Learn about KHEOO 7-day hassle-free returns, size replacements, and refund processes.',
};

export default function RefundPolicyPage() {
  return (
    <div className="py-8 sm:py-16 md:py-24 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-4 sm:pb-8">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1 sm:mb-2">
            HASSLE-FREE ASSURANCE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            Return & Refund Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            7-Day Replacement Guarantee • Customer First Policy
          </p>
        </div>

        {/* 3 Steps Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black mb-3">
              01
            </div>
            <h3 className="text-xs font-black uppercase text-black">Report within 7 Days</h3>
            <p className="text-xs text-zinc-600 font-sans mt-1">
              Contact support within 7 days of receiving your drop package if size or defect issues occur.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black mb-3">
              02
            </div>
            <h3 className="text-xs font-black uppercase text-black">Keep Tags & Packaging</h3>
            <p className="text-xs text-zinc-600 font-sans mt-1">
              Items must be unworn, unwashed, and in their original stealth ziplock bag with hangtags intact.
            </p>
          </div>

          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black mb-3">
              03
            </div>
            <h3 className="text-xs font-black uppercase text-black">Doorstep Replacement</h3>
            <p className="text-xs text-zinc-600 font-sans mt-1">
              Our rider delivers your replacement size and collects the return at your doorstep.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="space-y-8 text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 1. Eligibility for Returns & Exchanges
            </h2>
            <p>
              At KHEOO, we want you to be 100% satisfied with your oversized streetwear drops. We accept returns and size exchanges under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 font-mono text-xs">
              <li>Size misfit (e.g. want to switch from M to L for a more relaxed boxy look).</li>
              <li>Manufacturing defects (e.g. stitching anomaly, puff print imperfection).</li>
              <li>Incorrect item received compared to invoice.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 2. Items Non-Eligible for Return
            </h2>
            <p>
              To maintain hygiene and product authenticity for our community, the following cannot be returned:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 font-mono text-xs">
              <li>Items washed, ironed, perfumed, or worn outside.</li>
              <li>Items damaged due to customer mishandling or improper wash cycle.</li>
              <li>Special clearance or mystery drop items explicitly marked &quot;Final Sale&quot;.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 3. Refund Timelines
            </h2>
            <p>
              If a replacement size is unavailable or you request a monetary refund, we initiate the refund immediately upon receipt and inspection of the returned garment:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 font-mono text-xs">
              <li><strong>bKash / Nagad / Rocket:</strong> Credited within 24 to 48 business hours.</li>
              <li><strong>Credit / Debit Card:</strong> Processed in 3 to 7 banking days depending on your bank.</li>
            </ul>
          </section>
        </div>

        {/* Action CTA */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <p className="text-xs font-bold uppercase text-black">Need to exchange a size or report an issue?</p>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">Reach out via email or WhatsApp with your Order ID.</p>
          </div>
          <Link
            href="/contact"
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase px-5 py-2.5 flex items-center gap-2 border border-black"
          >
            Initiate Exchange <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
