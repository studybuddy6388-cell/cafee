import React, { useState } from "react";
import { CartItem, MenuItem } from "../types";
import { X, Trash2, Plus, Minus, CreditCard, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (index: number, change: number) => void;
  onRemoveItem: (index: number) => void;
  onUpdateCustomization: (index: number, field: "size" | "milk", value: any) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onUpdateCustomization
}: CartProps) {
  
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  const [payStatus, setPayStatus] = useState<"idle" | "processing" | "success">("idle");

  const subtotal = cartItems.reduce((acc, item) => {
    let price = item.product.price;
    if (item.size === "Reserve Grand") {
      price += 1.50; // premium size charge
    }
    if (item.milk && item.milk !== "Whole Milk" && item.milk !== "None") {
      price += 0.75; // premium milk charge
    }
    return acc + price * item.quantity;
  }, 0);

  const deliveryCharge = 3.50;
  const total = subtotal > 0 ? subtotal + deliveryCharge : 0;

  // Process Mock Credit Card Payment
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert("Please fulfill all payment details.");
      return;
    }
    setPayStatus("processing");
    setTimeout(() => {
      setPayStatus("success");
    }, 2500);
  };

  // Dispatch Order to WhatsApp Mock
  const handleWhatsAppOrder = () => {
    let message = `*Brew Haven Luxe Roastery - Premium Coffee Order*%0A`;
    message += `Greetings! I just prepared a sovereign checkout on your modern application.%0A%0A`;
    
    cartItems.forEach((item, index) => {
      let itemPrice = item.product.price;
      if (item.size === "Reserve Grand") itemPrice += 1.50;
      if (item.milk && item.milk !== "Whole Milk" && item.milk !== "None") itemPrice += 0.75;
      
      message += `*${index + 1}. ${item.product.name}* (Qty: ${item.quantity})%0A`;
      message += ` - Size: ${item.size}%0A`;
      if (item.product.category === "coffee" || item.product.category === "drinks") {
        message += ` - Milk: ${item.milk}%0A`;
      }
      message += ` - Price: $${(itemPrice * item.quantity).toFixed(2)}%0A%0A`;
    });

    message += `*Subtotal:* $${subtotal.toFixed(2)}%0A`;
    message += `*Grand Total (with courier logistics):* $${total.toFixed(2)}%0A%0A`;
    message += `Please confirm this roast batch in your master system. Thank you!`;

    const whatsAppUrl = `https://wa.me/15557001100?text=${message}`;
    window.open(whatsAppUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      
      {/* Dark overlay backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 cursor-pointer" />

      {/* Main sliding sheet */}
      <div className="relative w-full max-w-lg bg-[#0A0F0D] border-l border-zinc-900 h-full flex flex-col z-20 shadow-2xl">
        
        {/* Header segment */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">Your Micro-Lot Bag</span>
            <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
              {cartItems.length} BATCHES
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
            title="Dismiss panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
          
          {payStatus === "success" ? (
            /* Successful transaction view */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#006241]/20 border border-[#006241]/55 flex items-center justify-center shadow-lg shadow-[#006241]/10 text-emerald-400 text-3xl animate-bounce">
                💎
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">ORDER SECURED & DISPATCHED</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-2 leading-relaxed">
                  Our roasting master has initialized heating the Ethiopian Geisha coffee crop. Your micro-lot receipt is sent to your signature email.
                </p>
              </div>
              <button
                onClick={() => {
                  setPayStatus("idle");
                  setCheckoutMode(false);
                  onClose();
                }}
                className="px-6 py-3 bg-[#006241] text-white rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                RETURN TO BREW HAVEN
              </button>
            </div>
          ) : checkoutMode ? (
            /* Checkout view card details */
            <div className="space-y-6">
              <button
                onClick={() => setCheckoutMode(false)}
                className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                ← Back to Artisan Cart
              </button>

              <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 space-y-3.5">
                <span className="text-[10px] font-mono text-[#006241] uppercase tracking-widest font-bold">Luxe Invoice Summary</span>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Selected Grinds</span>
                    <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secure Packaging Logistics</span>
                    <span className="text-white font-mono">${deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-zinc-900 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-emerald-400">Total Indebtedness</span>
                    <span className="text-white font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Secure payment form */}
              <form onSubmit={handlePayment} className="space-y-4 text-left">
                <div className="flex items-center gap-1 text-xs text-zinc-400 uppercase font-mono tracking-wider">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  SECURED SSL ENCRYPTION
                </div>

                <div>
                  <label htmlFor="card-name-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    CARDHOLDER NAME
                  </label>
                  <input
                    type="text"
                    id="card-name-input"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Charles Sterling"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="card-num-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    CREDIT CARD NUMBER
                  </label>
                  <input
                    type="text"
                    id="card-num-input"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-exp-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                      EXPIRY DATE
                    </label>
                    <input
                      type="text"
                      id="card-exp-input"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                      CVV
                    </label>
                    <input
                      type="password"
                      id="card-cvv-input"
                      required
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={payStatus === "processing"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#006241] to-emerald-700 hover:opacity-95 text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-[#006241]/20 cursor-pointer"
                >
                  {payStatus === "processing" ? "AUTHORIZING SSL TRANSIT..." : `SECURE TRANSACTION $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-4xl animate-pulse">🌾</span>
              <div>
                <p className="text-base font-bold text-white uppercase tracking-wider">Your Bag Is Void Of Infusions</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  Take a look at our Sovereign Menu. We recommend starting with Geisha Single-Origin Cold Brew!
                </p>
              </div>
            </div>
          ) : (
            /* Selected items display list */
            <div className="space-y-4">
              {cartItems.map((item, idx) => {
                let itemPrice = item.product.price;
                if (item.size === "Reserve Grand") itemPrice += 1.50;
                if (item.milk && item.milk !== "Whole Milk" && item.milk !== "None") itemPrice += 0.75;

                return (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="bg-[#121815]/50 border border-zinc-900 p-4 rounded-2xl flex gap-4 text-left"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta info & selections */}
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white tracking-tight leading-tight shrink-1 max-w-[200px]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-zinc-600 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                          title="Purge item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customize select dropdowns only for drinks/coffee */}
                      <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                        <div>
                          <label htmlFor={`size-select-${idx}`} className="sr-only">Select Size</label>
                          <select
                            id={`size-select-${idx}`}
                            value={item.size}
                            onChange={(e) => onUpdateCustomization(idx, "size", e.target.value)}
                            className="bg-zinc-950 border border-zinc-900 text-zinc-300 text-[10px] rounded p-1 w-full outline-none"
                          >
                            <option value="Standard">Standard Size</option>
                            <option value="Reserve Grand">Reserve Grand (+$1.50)</option>
                          </select>
                        </div>

                        {(item.product.category === "coffee" || item.product.category === "drinks") && (
                          <div>
                            <label htmlFor={`milk-select-${idx}`} className="sr-only">Select Milk</label>
                            <select
                              id={`milk-select-${idx}`}
                              value={item.milk}
                              onChange={(e) => onUpdateCustomization(idx, "milk", e.target.value)}
                              className="bg-zinc-950 border border-zinc-900 text-zinc-300 text-[10px] rounded p-1 w-full outline-none"
                            >
                              <option value="None">No Extra Milk</option>
                              <option value="Whole Milk">Whole Organic Milk</option>
                              <option value="Oat Milk">Luxe Oat Milk (+$0.75)</option>
                              <option value="Almond Milk">Sicilian Almond (+$0.75)</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Pricing and quantities control */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5">
                          <button
                            onClick={() => onUpdateQty(idx, -1)}
                            className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                            title="Decrement quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-white font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(idx, 1)}
                            className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                            title="Increment quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer actions for checkout */}
        {cartItems.length > 0 && payStatus !== "success" && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md space-y-4">
            
            {!checkoutMode && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>In-bag beverages</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white">
                  <span>Grand Estimation</span>
                  <span className="text-emerald-400">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {!checkoutMode ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 hover:bg-emerald-900/40 text-emerald-400 text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  WHATSAPP ORDER
                </button>
                <button
                  onClick={() => setCheckoutMode(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#006241] hover:bg-emerald-700 text-white text-xs font-bold uppercase transition-colors cursor-pointer shadow-lg shadow-[#006241]/20"
                >
                  <CreditCard className="w-4 h-4" />
                  CARD PAY
                </button>
              </div>
            ) : null}

            <div className="flex items-center justify-center gap-2 text-[9px] font-mono tracking-wider text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006241]" />
              SECURE CRYPTOGRAPHIC CHECKOUT SSL PROTOCOL
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
