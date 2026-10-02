'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Phone, Mail } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Fabric & Quality',
      q: 'What makes KHEOO 240+ GSM fabric different from standard t-shirts?',
      a: 'Standard commercial t-shirts are usually made of lightweight 140–160 GSM fabric which loses its shape and shrinks easily. KHEOO uses 240+ GSM 100% combed organic ringspun cotton, custom-knit to give a structured, heavy boxy silhouette with superior drape and zero transparency.',
    },
    {
      category: 'Fabric & Quality',
      q: 'Will the puff print crack or peel in the wash?',
      a: 'No. Our high-density screen prints and puff ink graphics are oven-cured at industrial high temperatures. To keep the garment in mint condition, we recommend machine washing inside out with cold water and avoiding direct iron on the artwork.',
    },
    {
      category: 'Sizing & Fit',
      q: 'How do KHEOO sizes fit? Should I size up or down?',
      a: 'All our drops feature an authentic oversized drop shoulder fit with lowered shoulder seams and roomy sleeves. We recommend choosing your normal size for an authentic streetwear look. If you prefer an extreme baggy fit, size up one size. Check our interactive Size Guide for exact chest measurements.',
    },
    {
      category: 'Shipping & Delivery',
      q: 'How fast will I receive my order?',
      a: 'Orders inside Dhaka metropolitan area are delivered within 24 to 48 hours. Orders outside Dhaka across Bangladesh arrive within 48 to 72 hours via our express logistics network. You will receive live SMS updates with your consignment tracking number.',
    },
    {
      category: 'Payments',
      q: 'Which payment methods are accepted?',
      a: 'We support Cash on Delivery (COD) across Bangladesh, as well as digital payments via bKash, Nagad, Rocket, and Visa/Mastercard credit/debit cards.',
    },
    {
      category: 'Returns & Exchanges',
      q: 'What if the size does not fit me?',
      a: 'We offer a 7-day hassle-free size replacement guarantee. Contact our team via WhatsApp or email with your Order ID, and our courier will swap the size at your doorstep.',
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-white text-black min-h-screen font-sans">
      <div className="w-[90%] mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-8 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            KHEOO Help Center & FAQ
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Everything you need to know about our drops, sizing, and doorstep delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 font-mono">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border transition-all ${
                  isOpen ? 'border-black bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs uppercase text-black"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] text-zinc-400 font-normal">[{item.category}]</span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-black transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-600 font-sans leading-relaxed border-t border-zinc-200/60 mt-1">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Help Desk Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-6">
          <div className="p-6 border border-zinc-200 bg-zinc-50 space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <Phone className="w-4 h-4" /> Phone & WhatsApp Support
            </div>
            <p className="text-zinc-600 font-sans">
              Our concierge desk is available 10 AM to 10 PM daily.
            </p>
            <a href="tel:+8801711223344" className="font-bold text-black underline block pt-1">
              +880 1711-223344
            </a>
          </div>

          <div className="p-6 border border-zinc-200 bg-zinc-50 space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <Mail className="w-4 h-4" /> Email Drop Desk
            </div>
            <p className="text-zinc-600 font-sans">
              Send your order inquiries or bulk drop collaboration requests.
            </p>
            <a href="mailto:kheoobd@gmail.com" className="font-bold text-black underline block pt-1" title="Send direct email to kheoobd@gmail.com">
              kheoobd@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
