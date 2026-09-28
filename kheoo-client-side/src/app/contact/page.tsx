'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Copy,
  Check,
  Clock,
  Truck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Order & Delivery',
    orderId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const subjectOptions = [
    'Order & Delivery',
    'Sizing & Fit Advice',
    'Return & Exchange',
    'Collab & Wholesale',
    'General Inquiry',
  ];

  const quickFaqs = [
    {
      q: 'How fast will my order arrive?',
      a: 'Inside Dhaka orders are delivered within 24–48 hours. Deliveries outside Dhaka across Bangladesh take 2–3 business days via our premium courier partners.',
    },
    {
      q: 'How do I exchange an item if the size doesn’t fit?',
      a: 'We offer an easy 7-day exchange window! Simply message us on WhatsApp or submit this contact form with your Order ID, and our team will coordinate the exchange pickup.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD), bKash, Nagad, Rocket, and all major Debit/Credit cards with 100% secure encrypted checkout.',
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen font-sans py-8 sm:py-12 md:py-16 selection:bg-black selection:text-white">
      <div className="w-[90%] mx-auto space-y-8 md:space-y-12">
        {/* Top 3 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* 1. Email Card */}
          <div className="bg-[#f4f4f6] rounded-2xl md:rounded-[22px] p-6 sm:p-7 flex flex-col items-center justify-center text-center border border-zinc-200/60 hover:border-zinc-300 transition-all relative group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3.5 text-zinc-900 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 stroke-[1.75]" />
            </div>
            <a
              href="mailto:hello@kheoo.com"
              className="text-base sm:text-lg font-bold text-zinc-900 hover:text-black transition-colors"
            >
              hello@kheoo.com
            </a>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xs sm:text-sm text-zinc-500 font-medium">Email Address</span>
              <button
                type="button"
                onClick={() => handleCopy('hello@kheoo.com', 'email')}
                className="text-zinc-400 hover:text-black transition-colors p-0.5"
                title="Copy email"
              >
                {copiedType === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Phone / WhatsApp Card */}
          <div className="bg-[#f4f4f6] rounded-2xl md:rounded-[22px] p-6 sm:p-7 flex flex-col items-center justify-center text-center border border-zinc-200/60 hover:border-zinc-300 transition-all relative group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3.5 text-zinc-900 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 stroke-[1.75]" />
            </div>
            <a
              href="tel:+8801234567891"
              className="text-base sm:text-lg font-bold text-zinc-900 hover:text-black transition-colors"
            >
              +880 1234 567 891
            </a>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xs sm:text-sm text-zinc-500 font-medium">Phone Number</span>
              <button
                type="button"
                onClick={() => handleCopy('+8801234567891', 'phone')}
                className="text-zinc-400 hover:text-black transition-colors p-0.5"
                title="Copy phone number"
              >
                {copiedType === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 3. Location Card */}
          <div className="bg-[#f4f4f6] rounded-2xl md:rounded-[22px] p-6 sm:p-7 flex flex-col items-center justify-center text-center border border-zinc-200/60 hover:border-zinc-300 transition-all relative group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3.5 text-zinc-900 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 stroke-[1.75]" />
            </div>
            <span className="text-base sm:text-lg font-bold text-zinc-900">
              Banani, Dhaka-1213
            </span>
            <span className="text-xs sm:text-sm text-zinc-500 mt-1.5 font-medium">Location</span>
          </div>
        </div>

        {/* Bento Grid Split Section: Equal Height Left & Right Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left: Streetwear Editorial Model Showcase (5 cols - Bento Div) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="w-full h-full relative min-h-[460px] sm:min-h-[520px] rounded-2xl md:rounded-[24px] overflow-hidden bg-zinc-900 border border-zinc-200/60 group flex flex-col justify-between">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80"
                alt="KHEOO Streetwear Editorial"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Floating Studio Badge */}
              <div className="relative z-10 p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-wider font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  KHEOO STUDIO DHAKA
                </div>
              </div>

              {/* Bottom Content & Instant WhatsApp Action */}
              <div className="relative z-10 p-5 sm:p-6 md:p-8 text-white space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                    240+ GSM HEAVYWEIGHT DROPS
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug">
                    Wear Your Culture.
                  </h3>
                </div>

                <a
                  href="https://wa.me/8801234567891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Directly
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols - Bento Div matching height) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-[#f4f4f6] border border-zinc-200/80 rounded-2xl md:rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full">
              {submitted ? (
                <div className="my-auto text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 font-mono">
                    Message Dispatched!
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting KHEOO. We have received your message and our team will respond to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          subject: 'Order & Delivery',
                          orderId: '',
                          message: '',
                        });
                      }}
                      className="bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold uppercase px-7 py-3.5 rounded-full transition-colors font-mono"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href="/shop"
                      className="bg-white hover:bg-zinc-100 text-black border border-zinc-300 text-xs sm:text-sm font-bold uppercase px-7 py-3.5 rounded-full transition-colors font-mono text-center"
                    >
                      Back to Shop
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-4 sm:space-y-5">
                  <div className="space-y-4 sm:space-y-5">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Nasir"
                          className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Nawaz"
                          className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone No */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="test@gmail.com"
                          className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                          Phone No
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 17XXXXXXXX"
                          className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject / Topic Quick Selector with Custom Adjusted Arrow */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                        Subject / Inquiry Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 pr-12 appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer"
                          >
                            {subjectOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        <input
                          type="text"
                          value={formData.orderId}
                          onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                          placeholder="Order ID (e.g. #KHEOO-1234)"
                          className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Textarea with Vertical Resize capability */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Enter message here..."
                        className="w-full bg-white border border-zinc-200/90 text-sm sm:text-base text-zinc-900 rounded-xl p-3.5 sm:p-4 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-y min-h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Full-width Rounded Send Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black hover:bg-zinc-800 disabled:bg-zinc-500 text-white font-semibold text-sm sm:text-base py-4 rounded-full transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Transmission...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Self-Service Order Tracking + FAQs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Instant Order Tracking Callout (5 cols) */}
          <div className="lg:col-span-5 bg-black text-white rounded-[24px] p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                SELF-SERVICE ORDER TRACKER
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Looking for your drop?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Track live courier shipment status across all 64 districts in Bangladesh with your Phone Number or Order ID in real time.
              </p>
              <div className="pt-2">
                <Link
                  href="/track-order"
                  className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-black text-xs font-extrabold uppercase px-6 py-3.5 rounded-full transition-colors"
                >
                  <Truck className="w-4 h-4" /> Track My Parcel <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Quick FAQs Accordion (7 cols) */}
          <div className="lg:col-span-7 bg-[#f4f4f6] border border-zinc-200/80 rounded-[24px] p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-black" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-black font-mono">
                  Frequently Asked Questions
                </h3>
              </div>
              <Link
                href="/faq"
                className="text-xs font-semibold text-zinc-500 hover:text-black transition-colors"
              >
                View all FAQs &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {quickFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-zinc-200/80 rounded-xl overflow-hidden bg-white transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 bg-zinc-50/50 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Studio Assurance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-5 border border-zinc-200 bg-[#fbfbfb] rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-black uppercase">100% Authentic</p>
              <p className="text-[11px] text-zinc-500 font-sans">240+ GSM combed heavyweight cotton.</p>
            </div>
          </div>

          <div className="p-5 border border-zinc-200 bg-[#fbfbfb] rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="font-bold text-black uppercase">7-Day Easy Exchange</p>
              <p className="text-[11px] text-zinc-500 font-sans">Hassle-free size and fit exchanges.</p>
            </div>
          </div>

          <div className="p-5 border border-zinc-200 bg-[#fbfbfb] rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <p className="font-bold text-black uppercase">Fast Turnaround</p>
              <p className="text-[11px] text-zinc-500 font-sans">Support responses under 2 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
