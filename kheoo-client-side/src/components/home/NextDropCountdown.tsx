'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Bell, Check, Sparkles } from 'lucide-react';

interface NextDropCountdownProps {
  dropName?: string;
  dropCode?: string;
}

export const NextDropCountdown: React.FC<NextDropCountdownProps> = ({
  dropName = 'HEAVYWEIGHT STREETWEAR & OVERSIZED CAPSULE',
  dropCode = 'DROP 002 INCOMING',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '04',
    hours: '18',
    mins: '45',
    secs: '20',
  });

  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(target.getHours() + 18);
    target.setMinutes(target.getMinutes() + 45);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d < 10 ? `0${d}` : `${d}`,
          hours: h < 10 ? `0${h}` : `${h}`,
          mins: m < 10 ? `0${m}` : `${m}`,
          secs: s < 10 ? `0${s}` : `${s}`,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setShowInput(false);
        setIsSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-black text-white relative overflow-hidden border-y border-zinc-800">
      {/* Subtle Ambient Monochrome Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-[90%] mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Drop Badge - Monochrome */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b] border border-zinc-700 text-zinc-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-5 sm:mb-7">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{dropCode}</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans mb-8 sm:mb-12">
          NEXT DROP IN
        </h2>

        {/* Flip-Clock / Box Countdown */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 mb-8 sm:mb-10 max-w-full">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 bg-[#141416] border border-zinc-800 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight select-none">
                {isClient ? timeLeft.days : '04'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase font-mono mt-2.5 sm:mt-3">
              DAYS
            </span>
          </div>

          {/* Colon */}
          <span className="text-xl sm:text-3xl md:text-5xl font-black text-zinc-600 mb-6 select-none">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 bg-[#141416] border border-zinc-800 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight select-none">
                {isClient ? timeLeft.hours : '18'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase font-mono mt-2.5 sm:mt-3">
              HOURS
            </span>
          </div>

          {/* Colon */}
          <span className="text-xl sm:text-3xl md:text-5xl font-black text-zinc-600 mb-6 select-none">:</span>

          {/* Mins */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 bg-[#141416] border border-zinc-800 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight select-none">
                {isClient ? timeLeft.mins : '45'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase font-mono mt-2.5 sm:mt-3">
              MINS
            </span>
          </div>

          {/* Colon */}
          <span className="text-xl sm:text-3xl md:text-5xl font-black text-zinc-600 mb-6 select-none">:</span>

          {/* Secs */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 bg-[#141416] border border-zinc-800 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight select-none">
                {isClient ? timeLeft.secs : '20'}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase font-mono mt-2.5 sm:mt-3">
              SECS
            </span>
          </div>
        </div>

        {/* Subtitle / Drop Info */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono uppercase tracking-widest mb-6 sm:mb-8 max-w-xl">
          {dropName}
        </p>

        {/* Notify Me Action - Monochrome Palette (White button on dark) */}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-3.5 sm:px-10 sm:py-4 rounded-none transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-2.5 shadow-none"
          >
            <span>NOTIFY ME</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 bg-[#18181b] p-1.5 border border-zinc-700 transition-all"
          >
            <div className="flex items-center gap-2 px-4 py-2 w-full">
              <Bell className="w-4 h-4 text-white shrink-0" />
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL FOR VIP ACCESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white text-xs focus:outline-none w-full font-mono placeholder:text-zinc-500 uppercase"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-none inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  <span>REGISTERED</span>
                </>
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
          </form>
        )}

        {isSubscribed && (
          <p className="text-xs text-zinc-300 font-mono mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            You&apos;re on the VIP list! We will notify you before the drop goes live.
          </p>
        )}
      </div>
    </section>
  );
};
