import React, { useState } from "react";
import { BRANCHES } from "../data";
import { Branch } from "../types";
import { MapPin, Phone, Clock, Compass, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface LocationsProps {
  onReserveClick: (locationName: string) => void;
}

export default function Locations({ onReserveClick }: LocationsProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>("b-1");

  const selectedBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  return (
    <section id="locations" className="py-24 bg-[#0A0F0D] border-t border-zinc-900 relative overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-[#006241]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-emerald-950/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-emerald-400 font-mono text-xs tracking-[0.25em] uppercase">
            GEOGRAPHIC INTEGRITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Architectural <span className="text-[#006241] italic">Sanctuaries</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Each branch location is designed individually to pay homage to the local materials and community vibe. Use the simulator map to explore.
          </p>
        </div>

        {/* Master Grid: Left lists & details, Right Map Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Branch Buttons List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-mono tracking-widest text-[#006241] uppercase text-left font-bold">
              Select a Sanctuary Location
            </span>
            <div className="space-y-3 flex-1">
              {BRANCHES.map((branch) => {
                const isActive = branch.id === selectedBranchId;
                return (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                      isActive
                        ? "bg-[#121815] border-[#006241] shadow-lg shadow-[#006241]/5"
                        : "bg-zinc-950/40 border-zinc-900/60 hover:bg-zinc-900/40 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                          {branch.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{branch.address}</p>
                      </div>
                      <span className={`text-[9px] font-mono tracking-wider font-bold uppercase px-2 py-0.5 rounded-md ${
                        isActive ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/40" : "bg-zinc-900 text-zinc-600"
                      }`}>
                        {isActive ? "Viewing" : "Reserve"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-900/50 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-600" />
                        {branch.hours.replace(" Daily", "")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Map Simulator Area & Fine Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Map Simulator Canvas */}
            <div className="relative bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-900 p-1 min-h-[280px] flex-1 flex flex-col shadow-2xl">
              
              {/* Fake Interactive Map Layout Graphic */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Simulated Map Visual Card */}
              <div className="relative flex-1 bg-[#121815]/90 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                
                {/* Background Radar Rings */}
                <div className="absolute w-56 h-56 border border-emerald-900/20 rounded-full animate-[ping_8s_infinite] pointer-events-none" />
                <div className="absolute w-36 h-36 border border-[#006241]/20 rounded-full animate-pulse pointer-events-none" />
                
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#006241] to-zinc-950 border border-[#006241]/40 flex items-center justify-center shadow-lg shadow-[#006241]/20 mb-4 animate-bounce z-25">
                  <MapPin className="w-7 h-7 text-emerald-400" />
                </div>

                <div className="z-20 space-y-1">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#006241] uppercase font-bold">
                    GPS VERIFIED SANCTUARY
                  </span>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                    {selectedBranch.name}
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-sm mt-1">
                    {selectedBranch.address}
                  </p>
                </div>

                {/* Simulated Distance/GPS Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between text-[10px] font-mono text-zinc-500 bg-[#0A0F0D] border border-zinc-900 rounded-xl px-4 py-2">
                  <span>LAT: 40.7128° N • LNG: 74.0060° W</span>
                  <span className="text-[#006241]">STATION ACTIVE ✓</span>
                </div>
              </div>

            </div>

            {/* Selected Branch Specific Perks */}
            <div className="bg-[#121815]/40 backdrop-blur-md border border-zinc-900 rounded-3xl p-6 text-left space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Atmospheric Aesthetic</span>
                <p className="text-sm font-semibold text-white mt-0.5">{selectedBranch.vibe}</p>
              </div>

              {/* Special Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedBranch.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 bg-[#0A0F0D] border border-zinc-900 px-3.5 py-2.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006241] flex-shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis bg-clip-text">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Booking CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-zinc-900/50">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Phone RSVP</span>
                  <p className="text-xs font-semibold text-zinc-300">{selectedBranch.phone}</p>
                </div>

                <button
                  onClick={() => onReserveClick(selectedBranch.name)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#006241] to-emerald-700 hover:opacity-90 text-white rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer"
                >
                  Reserve Table At This Branch
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
