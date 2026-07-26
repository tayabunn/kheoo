'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-white text-black border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-14 h-14 rounded-none bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-md">
          <Mail className="w-7 h-7" />
        </div>

        <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
          JOIN THE KHEOO CLUB
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mt-2 mb-4">
          GET 10% OFF YOUR FIRST DROP
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto mb-8 font-sans">
          Subscribe to get secret drop codes, early access to Anime & Marvel collections, and exclusive streetwear giveaways.
        </p>

        {submitted ? (
          <div className="bg-zinc-100 border border-zinc-200 text-black p-4 rounded-none max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>You&apos;re in! Check your inbox for code <strong>KHEOO10</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto font-mono">
            <input
              type="email"
              required
              placeholder="ENTER YOUR EMAIL ADDRESS..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-zinc-50 border border-zinc-200 text-xs text-black px-4 py-3.5 rounded-none focus:outline-none focus:border-black uppercase placeholder-zinc-400"
            />
            <button
              type="submit"
              className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-none flex items-center justify-center gap-2 transition-all shrink-0 shadow-md border border-black"
            >
              CLAIM 10% OFF <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
