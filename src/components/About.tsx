import React from "react";
import { ShieldCheck, Heart, Coffee, Star, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const checkmarks = [
    {
      title: "100% Highland Hand-Picked Arabica Beans",
      desc: "Our farmers operate at altitudes exceeding 1,800m primarily in volcanic soil zones to give coffee cherries deep density."
    },
    {
      title: "In-House Micro-Batch Roasting",
      desc: "Every Monday we roast micro-lots in our vintage Probat gas-roasters. Controlled with spatial temperature metrics."
    },
    {
      title: "Sovereign Barista Training Protocols",
      desc: "Every pour is extracted precisely at 93.4°C and styled manually by our resident sensory curators."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0F0D] border-t border-zinc-900 relative overflow-hidden">
      
      {/* Immersive glow orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-[#006241]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Gallery of Beans & Atmosphere */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Back glowing card outline */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#006241] to-zinc-950 opacity-40 rounded-3.5xl blur-md" />
              
              <div className="absolute inset-0 bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=700"
                  alt="Brew Haven Cafe Premium Roasting process"
                  className="w-full h-full object-cover select-none scale-102 hover:scale-108 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Shade Filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Overlaid stat metrics widget */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4 divide-x divide-zinc-800">
                    <div className="text-center">
                      <p className="text-2xl font-black text-emerald-400">100%</p>
                      <p className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">Single Origin</p>
                    </div>
                    <div className="text-center pl-4">
                      <p className="text-2xl font-black text-[#006241]">1,800m</p>
                      <p className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">Elevation Roasts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="w-8 h-px bg-emerald-500"></span>
              OUR SANCTUARY HERITAGE
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Where Chemistry Meets <br className="hidden sm:inline" />
              <span className="text-[#006241] italic">Raw Soul Expression</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Brew Haven was established in the Historic Quarter with a singular, uncompromising mandate: to rescue the sacred tradition of slow-brewed coffee from the noisy gears of automated fast-food culture.
            </p>

            <p className="text-zinc-500 text-sm leading-relaxed">
              We sourcing direct micro-lots from fair-trade cooperatives in Ethiopia, El Salvador, and Sumatra. Our beans undergo continuous sensory checking before they are packaged in linen sacks, maintaining the delicate sugars of the coffee cherry crop.
            </p>

            {/* Checklist with beautiful micro animations */}
            <div className="space-y-4 pt-4 border-t border-zinc-900/60">
              {checkmarks.map((chk, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-emerald-950/40 border border-[#006241]/40 flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-wide">
                      {chk.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      {chk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inner quote card */}
            <div className="pt-6 relative">
              <div className="p-5 bg-white/2 backdrop-blur-sm border border-white/5 rounded-2xl flex items-center gap-4">
                <div className="text-3xl text-[#006241] font-serif select-none">“</div>
                <p className="text-xs italic text-zinc-400 leading-relaxed font-serif">
                  We don't sell caffeine; we package raw morning serenity and liquid afternoon courage of the highest possible grade.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
