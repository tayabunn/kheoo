import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | KHEOO Streetwear',
  description: 'Understand how KHEOO protects your personal data, payment encryption, and privacy rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8 sm:py-16 md:py-24 bg-white text-black min-h-screen">
      <div className="w-[90%] mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-4 sm:pb-8">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1 sm:mb-2">
            DATA SECURITY & PRIVACY
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Committed to protecting your personal information and transaction privacy.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm text-zinc-700 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 1. Information We Collect
            </h2>
            <p>
              When you purchase drops from KHEOO or subscribe to our drop alerts, we collect the following essential details:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 font-mono text-xs">
              <li>Full Name, Contact Mobile Number, and Delivery Shipping Address.</li>
              <li>Email address (for invoice dispatches, tracking numbers, and secret drop codes).</li>
              <li>Order history and size preferences to personalize future drops.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 2. Payment Security & Encryption
            </h2>
            <p>
              We do <strong>not</strong> store or log your credit card credentials, CVV codes, or mobile banking PINs on our servers. All digital transactions (bKash, Nagad, SSLCommerz, Visa, MasterCard) are routed directly through bank-grade 256-bit SSL encrypted payment gateways.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 3. How We Use Your Data
            </h2>
            <p>
              Your personal information is strictly utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 font-mono text-xs">
              <li>Process and fulfill your streetwear orders and arrange courier dispatch.</li>
              <li>Send real-time SMS and email tracking notifications.</li>
              <li>Prevent fraudulent transactions and protect our community.</li>
              <li>We never sell or rent customer data to third-party advertisers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black uppercase tracking-tight text-black font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" /> 4. Cookies & Analytics
            </h2>
            <p>
              We use minimal, high-performance cookies to preserve your cart items across sessions, remember size selections, and measure website speed. You can disable cookies in your browser settings at any time.
            </p>
          </section>
        </div>

        {/* Assistance Box */}
        <div className="p-6 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div>
            <p className="text-xs font-bold uppercase text-black">Questions regarding your personal data?</p>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">You can request data deletion or inquiry anytime.</p>
          </div>
          <Link
            href="/contact"
            className="bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase px-5 py-2.5 flex items-center gap-2 border border-black"
          >
            Contact Privacy Desk <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
