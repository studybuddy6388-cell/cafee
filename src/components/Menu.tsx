import React, { useState } from "react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";
import { Star, ShoppingCart, Sparkles, Flame, Eye, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
  onQuickView: (item: MenuItem) => void;
}

type CategoryType = "coffee" | "drinks" | "desserts" | "snacks";

export default function Menu({ onAddToCart, onQuickView }: MenuProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>("coffee");
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  const categories = [
    { id: "coffee", label: "Artisan Coffee", icon: "☕" },
    { id: "drinks", label: "Botanical Drinks", icon: "🍵" },
    { id: "desserts", label: "Gourmet Desserts", icon: "🍰" },
    { id: "snacks", label: "Fine Snacks", icon: "🥐" },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  // Celebrated "Popular Item" showcase item
  const popularItem = MENU_ITEMS.find((item) => item.id === "m-12") || MENU_ITEMS[0];

  return (
    <section id="menu" className="py-24 bg-[#0A0F0D] relative overflow-hidden">
      {/* Immersive glow orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#006241]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-emerald-950/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start text-emerald-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              SENSORY SELECTIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Sovereign <span className="text-[#006241] italic">Menu</span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-2 max-w-lg">
              Explore our pristine selections engineered with sensory perfection and roasted with pure, single-origin integrity.
            </p>
          </div>

          {/* Luxury Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-zinc-950/80 p-1.5 rounded-full border border-zinc-900/60 backdrop-blur-md self-center md:self-end">
            {categories.map((cat) => {
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as CategoryType)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#006241] to-emerald-800 text-white shadow-md shadow-[#006241]/20"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group relative bg-[#121815]/40 backdrop-blur-md border border-zinc-900/80 rounded-3xl p-5 hover:border-[#006241]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Micro badge indicator */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-widest text-[#006241] bg-emerald-950/40 border border-[#006241]/20 px-2 py-0.5 rounded-md uppercase font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md border border-zinc-800/80 px-2 py-1 rounded-xl flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                  <span className="text-[10px] font-bold text-zinc-300">{item.rating}</span>
                </div>

                {/* Product Image and Hover Actions */}
                <div className="relative w-full aspect-square bg-[#0D1210] rounded-24 overflow-hidden mb-5 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle radial light back shadow inside image to match theme instructions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D]/90 via-transparent to-transparent opacity-60" />
                  
                  {/* Quick look layer */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pb-2">
                    <button
                      onClick={() => onQuickView(item)}
                      className="p-3 bg-zinc-900/90 border border-zinc-800 text-white rounded-full hover:bg-emerald-950/80 hover:border-emerald-500/50 transition-colors cursor-pointer"
                      title="Sip details"
                    >
                      <Eye className="w-4 h-4 text-zinc-200" />
                    </button>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="p-3 bg-[#006241] text-white rounded-full hover:bg-emerald-700 transition-colors cursor-pointer"
                      title="Quick pour to bag"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata details */}
                <div className="text-left">
                  <div className="text-[10px] font-mono text-emerald-400 tracking-wider mb-1">
                    {item.notes}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Order Panel */}
                <div className="flex items-center justify-between border-t border-zinc-900/60 pt-4 mt-4">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Single Pour</span>
                    <span className="text-lg font-black text-white">${item.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(item);
                      setFavoriteId(item.id);
                      setTimeout(() => setFavoriteId(null), 1000);
                    }}
                    className="flex items-center gap-1.5 bg-[#121815] border border-zinc-800 hover:border-[#006241] group-hover:bg-[#006241] group-hover:text-white px-3.5 py-2.5 rounded-xl text-[10px] font-mono tracking-wider text-zinc-300 transition-all cursor-pointer"
                  >
                    <span>{favoriteId === item.id ? "ADDED ✓" : "POUR IN BAG"}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Popular Showcase Section (Section 4 - Large Product Showcase) */}
        <div id="showcase" className="relative mt-24">
          <div className="bg-gradient-to-br from-[#121815] to-[#0D1210] border border-zinc-900 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Visual glow element */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#006241]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              
              {/* Product Visual */}
              <div className="md:col-span-5 relative flex justify-center order-2 md:order-1">
                <div className="relative w-full max-w-[280px] aspect-square rounded-full flex items-center justify-center">
                  {/* Rotating decorative halo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#006241]/30 to-zinc-900/40 border-2 border-dashed border-[#006241]/30 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
                  
                  {/* Floating bean elements around */}
                  <span className="absolute top-2 left-6 text-2xl animate-bounce">🫘</span>
                  <span className="absolute bottom-8 right-8 text-xl opacity-65">🫘</span>
                  
                  <img
                    src={popularItem.image}
                    alt={popularItem.name}
                    className="w-4/5 h-4/5 object-cover rounded-full shadow-2xl z-10 border-4 border-zinc-950 rotate-6"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Showcase Text */}
              <div className="md:col-span-7 space-y-6 text-left order-1 md:order-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-[#006241]/10 border border-[#006241]/30 text-emerald-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest">
                    <Flame className="w-3 h-3 text-red-500 animate-pulse fill-current" />
                    MOST HIGHLY ACCLAIMED
                  </span>
                  <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono px-3 py-1 rounded-full">
                    Sip Rating ⭐ 4.9/5
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {popularItem.name}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  {popularItem.description} Handcrafted layered components combined with Italian truffle oil mist to trigger absolute satisfaction. Perfect when paired with our pour-over coffee selections.
                </p>

                <div className="flex items-center gap-8 py-2">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#006241] uppercase">Single Order Price</span>
                    <p className="text-3xl font-black text-white">${popularItem.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Preparation time</span>
                    <p className="text-xl font-bold text-zinc-200">5-7 Minutes</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  <button
                    onClick={() => onAddToCart(popularItem)}
                    className="flex items-center gap-2.5 bg-gradient-to-r from-[#006241] to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#006241]/20 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    ADD SHOWCASE ITEM TO BAG
                  </button>
                  <button
                    onClick={() => onQuickView(popularItem)}
                    className="bg-transparent hover:bg-zinc-950 border border-zinc-800 text-zinc-300 font-medium px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    VIEW INGREDIENTS
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
