import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Locations from "./components/Locations";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Chatbot from "./components/Chatbot";
import Reservations from "./components/Reservations";
import { MenuItem, CartItem } from "./types";
import { MENU_ITEMS } from "./data";
import { Coffee, Star, X, Check, ShieldCheck, Flame, Info, Heart, ArrowUpRight } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [reservationBranchDefault, setReservationBranchDefault] = useState("");

  const [activeQuickViewItem, setActiveQuickViewItem] = useState<MenuItem | null>(null);
  const [quickViewSize, setQuickViewSize] = useState<"Standard" | "Reserve Grand">("Standard");
  const [quickViewMilk, setQuickViewMilk] = useState<"Whole Milk" | "Oat Milk" | "Almond Milk" | "None">("None");

  // Add to cart helper logic
  const handleAddToCart = (item: MenuItem, quantity = 1, size: "Standard" | "Reserve Grand" = "Standard", milk: "Whole Milk" | "Oat Milk" | "Almond Milk" | "None" = "None") => {
    setCart((prev) => {
      // Find if item with exact same configuration already exists
      const existingIdx = prev.findIndex(
        (ci) => ci.product.id === item.id && ci.size === size && ci.milk === milk
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += quantity;
        return nextCart;
      }

      return [
        ...prev,
        {
          product: item,
          quantity,
          size,
          milk
        }
      ];
    });

    // Automatically trigger cart drawer popup
    setIsCartOpen(true);
  };

  // Directly parse quick click addition
  const handleQuickAdd = (itemId: string) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId);
    if (item) {
      handleAddToCart(item, 1, "Standard", "None");
    }
  };

  const handleUpdateQty = (idx: number, change: number) => {
    setCart((prev) => {
      const nextCart = [...prev];
      const newQty = nextCart[idx].quantity + change;
      if (newQty <= 0) {
        nextCart.splice(idx, 1);
      } else {
        nextCart[idx].quantity = newQty;
      }
      return nextCart;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart((prev) => {
      const nextCart = [...prev];
      nextCart.splice(idx, 1);
      return nextCart;
    });
  };

  const handleUpdateCustomization = (idx: number, field: "size" | "milk", value: any) => {
    setCart((prev) => {
      const nextCart = [...prev];
      nextCart[idx][field] = value;
      return nextCart;
    });
  };

  // Trigger reservation with pre-chosen address
  const handleReserveAtBranch = (branchName: string) => {
    setReservationBranchDefault(branchName);
    setIsReservationsOpen(true);
  };

  // Sum total count
  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="bg-[#0A0F0D] min-h-screen text-white font-sans relative">
      
      {/* Sticky navigation bar */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => {
          setReservationBranchDefault("");
          setIsReservationsOpen(true);
        }}
      />

      {/* Main sections layout */}
      <main>
        
        {/* Section 1: Hero banner */}
        <Hero
          onOrderNowClick={() => {
            const el = document.getElementById("menu");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onQuickAdd={handleQuickAdd}
        />

        {/* Section 2, 3, 4: Interactive Category Tabs, Products & Showcase */}
        <Menu
          onAddToCart={(item) => handleAddToCart(item, 1, "Standard", "None")}
          onQuickView={(item) => {
            // Setup default configs for selected item inside detailed modal view
            setQuickViewSize("Standard");
            setQuickViewMilk(item.category === "coffee" ? "Whole Milk" : "None");
            setActiveQuickViewItem(item);
          }}
        />

        {/* Section 5: Narrative Story */}
        <About />

        {/* Section 6: Geographic branch map simulator */}
        <Locations onReserveClick={handleReserveAtBranch} />

        {/* Section 7: Gourmet Testimonials reviews slider */}
        <Reviews />

        {/* Section 8 & 9: Online feedback dispatch and subscriber list */}
        <Contact />

      </main>

      {/* Footer (Section 10) */}
      <footer className="bg-black/60 border-t border-zinc-900 py-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            
            {/* Column 1 Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#006241] flex items-center justify-center font-bold text-white">
                  ☕
                </div>
                <span className="font-sans text-lg font-black tracking-wider text-white">
                  BREW<span className="text-[#006241]"> HAVEN</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Step into a sovereign space dedicated to pure bean extraction & delicate coffee craft of the absolute highest grade.
              </p>
            </div>

            {/* Column 2 Navigation Links */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">
                Sovereign Directory
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-white transition-colors">Hero Space</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Sensory Menu</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Showcase Item</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Our Roastery Story</a></li>
              </ul>
            </div>

            {/* Column 3 Resources */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">
                Sanctuary Branches
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#locations" className="hover:text-white transition-colors">Downtown Reserve</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Coastal Terrace</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Heritage Village</a></li>
                <li>
                  <button
                    onClick={() => setIsReservationsOpen(true)}
                    className="text-emerald-400 hover:underline transition-colors mt-1 font-semibold block text-left"
                  >
                    Online RSVP Form
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 Legal assurances */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">
                Sip Assurance
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All beans are certified organic by elite micro-lot registries. Fully compliant with fairtrade compensation rules.
              </p>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-700 mt-3 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
                VERIFIED SOURCE INTEGRITY
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <p className="tracking-tighter">
              © 2026 Brew Haven Cafe & Co. All rights reserved. Design inspired by Premium Starbucks Immersive UI.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-white transition-colors">Roasting Standards</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sliding Sheet Panel Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onUpdateCustomization={handleUpdateCustomization}
      />

      {/* Online Reservation System Dialog Modal Popup */}
      <Reservations
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        defaultLocation={reservationBranchDefault}
      />

      {/* Floating AI Support concierge assistance widget */}
      <Chatbot />

      {/* Product Detailed Information Quick View Modal Popover */}
      {activeQuickViewItem && (
        <div className="fixed inset-0 z-[105] flex items-center justify-center p-4">
          <div onClick={() => setActiveQuickViewItem(null)} className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer" />
          
          <div className="relative w-full max-w-xl bg-[#0A0F0D] border border-zinc-900 rounded-3xl p-6 sm:p-8 text-left shadow-2xl z-20 space-y-6">
            
            {/* Header info */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#006241] uppercase font-bold">In-Depth Cup Details</span>
                <h3 className="text-xl font-black text-white uppercase mt-0.5">{activeQuickViewItem.name}</h3>
              </div>
              <button
                onClick={() => setActiveQuickViewItem(null)}
                className="p-1.5 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-full transition-colors cursor-pointer"
                title="Sip Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive layout components */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              <div className="sm:col-span-4 max-w-[150px] mx-auto sm:mx-0">
                <img
                  src={activeQuickViewItem.image}
                  alt={activeQuickViewItem.name}
                  className="w-full aspect-square object-cover rounded-2xl border border-zinc-900 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="sm:col-span-8 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {activeQuickViewItem.tags?.map((t) => (
                    <span key={t} className="text-[9px] font-mono tracking-wider font-semibold text-emerald-400 bg-[#006241]/10 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                  <span className="text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    Rating: {activeQuickViewItem.rating}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {activeQuickViewItem.description} Built strictly with organic components that preserve taste profiles without heavy bitterness.
                </p>

                <div className="text-[11px] text-zinc-500 font-mono">
                  <span className="text-[#006241] font-bold">Barista Note:</span> {activeQuickViewItem.notes}
                </div>
              </div>

            </div>

            {/* Customization inside quick-view popover */}
            {(activeQuickViewItem.category === "coffee" || activeQuickViewItem.category === "drinks") && (
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl space-y-3.5">
                <span className="text-[9px] font-mono text-[#006241] uppercase tracking-widest font-bold">Custom sensory profile</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quick-size-select" className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">Size Portion</label>
                    <select
                      id="quick-size-select"
                      value={quickViewSize}
                      onChange={(e: any) => setQuickViewSize(e.target.value)}
                      className="w-full bg-[#0A0F0D] border border-zinc-900 text-zinc-300 text-xs rounded-xl p-2.5 outline-none"
                    >
                      <option value="Standard">Standard Size</option>
                      <option value="Reserve Grand">Reserve Grand (+$1.50)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quick-milk-select" className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">Milk Subtraction</label>
                    <select
                      id="quick-milk-select"
                      value={quickViewMilk}
                      onChange={(e: any) => setQuickViewMilk(e.target.value)}
                      className="w-full bg-[#0A0F0D] border border-zinc-900 text-zinc-300 text-xs rounded-xl p-2.5 outline-none"
                    >
                      <option value="None">No Extra Milk</option>
                      <option value="Whole Milk">Whole Organic Milk</option>
                      <option value="Oat Milk">Luxe Oat Milk (+$0.75)</option>
                      <option value="Almond Milk">Sicilian Almond (+$0.75)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Immediate addition button */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
              <div>
                <span className="text-xs text-zinc-500 font-mono uppercase">Calculated cost</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">
                  ${(
                    activeQuickViewItem.price +
                    (quickViewSize === "Reserve Grand" ? 1.50 : 0) +
                    (quickViewMilk !== "None" && quickViewMilk !== "Whole Milk" ? 0.75 : 0)
                  ).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveQuickViewItem(null)}
                  className="px-5 py-3.5 bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 rounded-xl text-xs text-zinc-400 uppercase font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(activeQuickViewItem, 1, quickViewSize, quickViewMilk);
                    setActiveQuickViewItem(null);
                  }}
                  className="px-6 py-3.5 bg-[#006241] hover:bg-[#004d33] text-white rounded-xl text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Add Custom To Bag
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
