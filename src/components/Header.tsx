import React, { useState, useEffect } from "react";
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservations: () => void;
}

export default function Header({ cartCount, onOpenCart, onOpenReservations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Showcase", href: "#showcase" },
    { label: "Our Story", href: "#about" },
    { label: "Branches", href: "#locations" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A0F0D]/90 backdrop-blur-md border-b border-[#006241]/20 py-4 shadow-lg shadow-black/40"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#006241] to-[#0A0F0D] border border-[#006241]/50 flex items-center justify-center shadow-md shadow-[#006241]/20 group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-sans text-xl font-bold tracking-wider text-white">
              BREW<span className="text-[#006241]"> HAVEN</span>
            </span>
            <span className="hidden sm:block text-[10px] font-mono tracking-[4px] text-zinc-400">
              CAFE & ROASTERY
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-emerald-400 tracking-wide transition-colors relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            id="cart-trigger-btn"
            className="relative p-2.5 rounded-full bg-[#0A0F0D] border border-zinc-800 hover:border-emerald-500 hover:bg-[#006241]/10 text-white transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#006241] text-[10px] font-bold text-white shadow-md ring-2 ring-[#0A0F0D] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Table reservation CTA */}
          <button
            onClick={onOpenReservations}
            id="reservations-header-btn"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#006241] to-[#004d33] text-white border border-emerald-500/20 text-xs font-semibold tracking-wider hover:opacity-90 shadow-lg shadow-[#006241]/10 hover:shadow-[#006241]/20 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            BOOK A TABLE
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0A0F0D]/95 backdrop-blur-lg border-b border-zinc-800/80 px-4 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-300 hover:text-emerald-400 py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-zinc-800 pt-4 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservations();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#006241] to-[#004d33] text-white text-sm font-semibold tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  BOOK A TABLE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
