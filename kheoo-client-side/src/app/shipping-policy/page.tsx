import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | KHEOO Streetwear',
  description: 'Fast delivery times, express courier rates, and stealth packaging information across Bangladesh.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-16 md:py-24 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-8">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
            LOGISTICS & FULFILLMENT
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            Shipping Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Dispatched in 24 hours in tamper-evident stealth ziplock packaging.
          </p>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-xs font-black uppercase text-black">Inside Dhaka</span>
            </div>
            <p className="text-xl font-black text-black">24 – 48 Hours</p>
            <p className="text-[11px] text-zinc-500 font-sans mt-1">Delivery Charge: 70 BDT (Free over 2000 BDT)</p>
          </div>

          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-black" />
              <span className="text-xs font-black uppercase text-black">Outside Dhaka</span>
            </div>
            <p className="text-xl font-black text-black">48 – 72 Hours</p>
            <p className="text-[11px] text-zinc-500 font-sans mt-1">Delivery Charge: 120 BDT Nationwide</p>
          </div>

          <div className="p-5 border border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span className="text-xs font-black uppercase text-black">Stealth Pack</span>
            </div>
            <p className="text-xl font-black text-black">Tamper Sealed</p>
            <p className="text-[11px] text-zinc-500 font-sans mt-1">Heavy-duty reusable frosted ziplock</p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-8 text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 1. Order Processing & Dispatch
            </h2>
            <p>
              Every order placed before 4:00 PM (GMT+6) is processed, quality-checked, and handed over to our delivery partners on the very same day. Orders placed on public holidays or weekends are dispatched on the next business day.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 2. Real-Time Order Tracking
            </h2>
            <p>
              Once your package leaves our fulfillment center in Dhaka, you will receive an automated SMS and email containing your consignment ID. You can track your parcel live anytime using our dedicated <Link href="/track-order" className="underline font-bold text-black">Track Order</Link> page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 3. Cash on Delivery (COD) Guidelines
            </h2>
            <p>
              For Cash on Delivery orders, please keep the exact invoice amount ready at the time of rider arrival. Riders are instructed not to leave parcels without collecting payment. If you need to inspect the parcel for size verification, please coordinate with our support hotline.
            </p>
          </section>
        </div>

        {/* Track Order CTA */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <p className="text-xs font-bold uppercase text-black">Already placed an order?</p>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">Check live rider status and estimated delivery time.</p>
          </div>
          <Link
            href="/track-order"
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase px-5 py-2.5 flex items-center gap-2 border border-black"
          >
            Track Parcel <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
