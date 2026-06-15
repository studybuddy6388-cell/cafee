import React from "react";
import { Star, ArrowRight, Award, Sparkles, Flame } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOrderNowClick: () => void;
  onQuickAdd: (itemId: string) => void;
}

export default function Hero({ onOrderNowClick, onQuickAdd }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0A0F0D] flex items-center pt-24 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#006241]/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-950/20 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Floating Coffee Beans Simulation (CSS Animated) */}
      <div className="absolute inset-0 pointer-events-none z-10 select-none">
        {/* Bean 1 */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[18%] left-[8%] w-8 h-10 opacity-30 sm:opacity-50"
        >
          <span className="text-3xl">🫘</span>
        </motion.div>

        {/* Bean 2 */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [20, -15, 20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[20%] left-[25%] w-10 h-12 opacity-20 sm:opacity-40"
        >
          <span className="text-4xl">🫘</span>
        </motion.div>

        {/* Bean 3 */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[12%] right-[15%] w-12 h-14 opacity-30"
        >
          <span className="text-5xl">🫘</span>
        </motion.div>

        {/* Bean 4 */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [-10, 20, -10],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-[15%] right-[40%] w-7 h-9 opacity-40"
        >
          <span className="text-2xl">🫘</span>
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Tag / Quality Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#006241]/15 border border-[#006241]/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase shadow-inner"
            >
              <Award className="w-3.5 h-3.5" />
              THE ARTI ROASTERS RESERVE • 100% SINGLE ORIGIN
            </motion.div>

            {/* Title / Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight text-white leading-tight">
                Every Cup Tells <br className="hidden sm:inline" />
                A Story. <span className="text-[#006241] bg-gradient-to-r from-emerald-400 to-[#006241] bg-clip-text text-transparent">What's Yours?</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              Step into Brew Haven, where we roast single-origin heirloom beans to
              extract pure, uncompromised emotion. Crafted by certified master baristas
              and served in an atmosphere designed to touch your soul.
            </motion.p>

            {/* Price Indicator Widget for Geisha Cold Brew */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm rounded-2xl p-3 pr-5">
                <div className="w-12 h-12 bg-[#006241] rounded-xl flex items-center justify-center font-bold text-white shadow-md">
                  $5.25
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                    featured brew
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Geisha Cold Brew
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ml-2 text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-semibold text-zinc-300 ml-1">5.0</span>
                </div>
              </div>
            </motion.div>

            {/* Active Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onOrderNowClick}
                className="group flex items-center gap-2 bg-gradient-to-r from-[#006241] to-emerald-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-[#006241]/20 hover:shadow-[#006241]/40 transition-all hover:opacity-95 cursor-pointer"
              >
                ORDER ONLINE NOW
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => onQuickAdd("m-5")}
                className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white font-medium py-4 px-7 rounded-full hover:bg-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                GET THE CELEBRATED COLD BREW
              </button>
            </motion.div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden"
            >
              {/* Glassmorphic Rim behind image */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#006241] to-emerald-400 rounded-3xl opacity-30 blur-sm animate-pulse pointer-events-none" />
              
              {/* Main Image */}
              <div className="absolute inset-0 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=700"
                  alt="Brew Haven Artisan Coffee"
                  className="w-full h-full object-cover select-none scale-105 hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Micro Tag inside Image */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-sm font-semibold tracking-wide">
                      Barista Espresso Pour
                    </h4>
                    <p className="text-[10px] text-zinc-400">
                      Signature House Roast extracted at 93.4°C
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded-full">
                    <Flame className="w-3 h-3 text-emerald-400" />
                    HOT EXTRACTION
                  </span>
                </div>
              </div>

              {/* 3D Rotating Coffee Cup Badge (Optional interactive detail) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-xl shadow-black/80 cursor-pointer hidden md:flex"
                onClick={() => onQuickAdd("m-1")}
              >
                <div className="absolute text-[8px] font-bold text-emerald-400 tracking-widest text-center uppercase">
                  ☕ • BREW HAVEN • RESERVE •
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
