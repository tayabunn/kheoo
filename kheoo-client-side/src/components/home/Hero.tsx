'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/assets/images/0772822c051fae80f9b7e963f2332705.jpg',
    alt: 'KHEOO Banner 1',
  },
  {
    id: 2,
    image: '/assets/images/Screenshot 2026-07-26 191812.jpg',
    alt: 'KHEOO Banner 2',
  },
  {
    id: 3,
    image: '/assets/images/bc309d0db2c8ef61ef131ac056217cf4.jpg',
    alt: 'KHEOO Banner 3',
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Hero: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = ((page % SLIDES.length) + SLIDES.length) % SLIDES.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      paginate(1);
    }, 5000);
  }, [paginate]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleNext = () => {
    paginate(1);
    resetTimer();
  };

  const handlePrev = () => {
    paginate(-1);
    resetTimer();
  };

  const handleDotClick = (idx: number) => {
    const dir = idx > currentSlide ? 1 : -1;
    setPage([idx, dir]);
    resetTimer();
  };

  const current = SLIDES[currentSlide];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-black text-white overflow-hidden select-none border-b border-zinc-800">
      <div className="relative w-full h-[350px] sm:h-[480px] md:h-[580px] lg:h-[650px] flex items-center overflow-hidden touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }: PanInfo) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
                paginate(1);
                resetTimer();
              } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
                paginate(-1);
                resetTimer();
              }
            }}
            className="absolute inset-0 w-full h-full flex items-center cursor-grab active:cursor-grabbing"
          >
            {/* Pure Banner Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-none bg-black/70 hover:bg-black border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer pointer-events-auto"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-none bg-black/70 hover:bg-black border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer pointer-events-auto"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-none pointer-events-auto">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleDotClick(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 h-2.5 bg-red-600 rounded-none shadow-md shadow-red-600/50'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80 rounded-none'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


