'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-16 bg-white text-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mt-1">
            CONTACT KHEOO SUPPORT
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm space-y-6 font-mono text-xs text-zinc-700">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-black shrink-0" />
              <div>
                <h4 className="font-bold text-black uppercase mb-0.5">Email Support</h4>
                <p className="text-zinc-500">hello@kheoo.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-black shrink-0" />
              <div>
                <h4 className="font-bold text-black uppercase mb-0.5">Phone Hotline</h4>
                <p className="text-zinc-500">+880 1700-000000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-black shrink-0" />
              <div>
                <h4 className="font-bold text-black uppercase mb-0.5">Headquarters</h4>
                <p className="text-zinc-500">Banani C/A, Dhaka-1213, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm font-mono">
            {sent ? (
              <div className="text-center py-8 text-black space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-black" />
                <h4 className="font-bold text-sm">Message Received!</h4>
                <p className="text-xs text-zinc-500">Our customer team will reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
