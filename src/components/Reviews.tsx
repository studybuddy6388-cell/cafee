import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = TESTIMONIALS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-[#0A0F0D] border-t border-zinc-900 relative overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-[#006241]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <span className="text-emerald-400 font-mono text-xs tracking-[0.25em] uppercase">
            CERTIFIED SENSORY VERDICT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Praise From The <span className="text-[#006241] italic">Connoisseurs</span>
          </h2>
        </div>

        {/* Testimonial Active Display Card with Framer motion */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#121815]/40 backdrop-blur-md border border-zinc-900 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative"
            >
              
              {/* Giant quote mark behind content */}
              <div className="absolute -top-4 left-6 text-[#006241]/10 text-8xl font-serif pointer-events-none">
                “
              </div>

              {/* Stars rendering */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-serif italic leading-relaxed max-w-3xl mx-auto">
                "{activeReview.comment}"
              </blockquote>

              {/* Reviewer Details */}
              <div className="flex flex-col items-center gap-3 mt-6">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#006241]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{activeReview.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{activeReview.role}</p>
                </div>
              </div>

              <div className="text-[10px] text-zinc-600 font-mono mt-2">
                VERIFIED LOG ENTRY • {activeReview.date}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel manual selectors */}
        <div className="flex justify-between items-center max-w-xs mx-auto mt-8">
          <button
            onClick={prevReview}
            className="p-3 bg-zinc-950 text-white rounded-full border border-zinc-900 hover:border-[#006241] hover:bg-[#121815] transition-colors cursor-pointer"
            title="Backward"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === index ? "bg-[#006241] w-6" : "bg-zinc-800 hover:bg-zinc-700"
                }`}
                title={`Story Index ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="p-3 bg-zinc-950 text-white rounded-full border border-zinc-900 hover:border-[#006241] hover:bg-[#121815] transition-colors cursor-pointer"
            title="Forward"
          >
            <ChevronRight className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
