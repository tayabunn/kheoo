'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, ShieldCheck, Printer, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);

  return (
    <div className="py-20 bg-white text-black min-h-screen font-mono">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          ORDER CONFIRMED
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mt-1 mb-2">
          THANK YOU FOR YOUR ORDER!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mb-8 font-sans">
          Your order <strong className="text-black font-mono">{orderId}</strong> has been received and is being prepared for dispatch.
        </p>

        <div className="bg-white p-6 sm:p-8 rounded-lg border border-zinc-200 shadow-sm text-left space-y-6 mb-8 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase">Order ID</span>
              <h4 className="text-sm font-bold text-black">{orderId}</h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-500 uppercase">Estimated Delivery</span>
              <h4 className="text-sm font-bold text-black">2–4 Business Days</h4>
            </div>
          </div>

          <div className="space-y-3 text-xs text-zinc-600">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-black shrink-0" />
              <span>Status: <strong className="text-black uppercase">Processing & Quality Audit</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-black shrink-0" />
              <span>Packaging: Stealth Matte Packaging Satchel</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>7-Day Return Guarantee Included</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-xl"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-lg border border-zinc-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Invoice Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
