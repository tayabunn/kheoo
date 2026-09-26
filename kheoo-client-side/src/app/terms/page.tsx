import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | KHEOO Streetwear',
  description: 'Read the terms and conditions for purchasing and using KHEOO streetwear apparel.',
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-8">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Last Updated: September 2026 • KHEOO Streetwear Bangladesh
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 1. Introduction & Acceptance
            </h2>
            <p>
              Welcome to KHEOO (accessible via kheoo.com). By visiting our website, creating an account, or placing an order for our limited-drop streetwear apparel, you agree to be bound by the following Terms & Conditions. If you do not agree with any part of these terms, you must refrain from using our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 2. Products, Drops & Availability
            </h2>
            <p>
              All KHEOO streetwear items—including anime oversized tees, pop-culture graphics, and heavyweight drop shoulder garments—are produced in curated batches. We make every effort to display the colors, fabrics (240+ GSM), and print textures accurately. However, variations in monitor displays may occur. We reserve the right to limit the sales of our drops to any person or geographic region.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 3. Pricing & Payment Terms
            </h2>
            <p>
              All prices listed on the storefront and POS registers are in Bangladeshi Taka (BDT) or US Dollars (USD) and include applicable taxes unless specified otherwise. We accept bKash, Nagad, Rocket, Visa, MasterCard, and Cash on Delivery (COD). We reserve the right to cancel any order in the event of pricing errors or fraudulent transactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 4. Shipping & Delivery
            </h2>
            <p>
              Orders within Dhaka metropolitan area are typically dispatched and delivered within 24 to 48 hours. Orders across all other districts in Bangladesh are delivered within 48 to 72 hours via our logistics partners. Risk of loss and title for items pass to you upon delivery to the carrier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 5. Intellectual Property
            </h2>
            <p>
              All brand elements, artwork, puff-print typography, graphics, and logo assets featured on this website are the intellectual property of KHEOO. Unauthorized duplication, modification, or commercial exploitation is strictly prohibited under international copyright laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 6. Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any dispute arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
            </p>
          </section>
        </div>

        {/* Contact Assistance Box */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <p className="text-xs font-bold uppercase text-black">Have questions about our terms?</p>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">Reach out directly to our legal and customer compliance desk.</p>
          </div>
          <Link
            href="/contact"
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase px-5 py-2.5 flex items-center gap-2 border border-black"
          >
            Contact Support <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
