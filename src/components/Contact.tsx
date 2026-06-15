import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MailPlus, Sparkles, Instagram, Facebook, Twitter } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [subEmail, setSubEmail] = useState("");

  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState(false);

  const [subscribeSuccess, setSubscribeSuccess] = useState<string | null>(null);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  // Handle contact dispatch
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setContactError("Please fulfill all three inputs.");
      return;
    }

    setContactLoading(true);
    setContactError(null);
    setContactSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const resData = await response.json();
      if (resData.success) {
        setContactSuccess(resData.message || "Message dispatched successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setContactError(resData.error || "A transient issue prevented dispatch.");
      }
    } catch (err) {
      console.error(err);
      setContactError("Connection to Concierge lost. Please retry shortly.");
    } finally {
      setContactLoading(false);
    }
  };

  // Handle newsletter subscription
  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes("@")) {
      setSubscribeError("Please input an acceptable signature/email address.");
      return;
    }

    setSubscribeLoading(true);
    setSubscribeError(null);
    setSubscribeSuccess(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSubscribeSuccess(resData.message || "Successfully recorded in our database.");
        setSubEmail("");
      } else {
        setSubscribeError(resData.error || "A recurring address is already registered.");
      }
    } catch (err) {
      console.error(err);
      setSubscribeError("Database subscription failure. Please try again.");
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0F0D] border-t border-zinc-900 relative overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-[#006241]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Main Grid: Contact Dispatch & Signature Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          
          {/* Left Column: Premium Contact Form */}
          <div className="lg:col-span-7 bg-[#121815]/30 backdrop-blur-md border border-zinc-900 rounded-3xl p-6 sm:p-10 text-left space-y-6">
            <div>
              <span className="text-emerald-400 font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
                COMMUNICATE INTENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Concierge Dispatch <span className="text-[#006241] italic">Terminal</span>
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1.5">
                Have specific events, lifestyle inquiries, or bean supply partnerships in mind? Speak directly to our roasting house.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Charles Sterling"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                    SIGNATURE EMAIL
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., charles@sterling.com"
                    className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  YOUR TRANSMISSION / INQUIRY
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draft your thoughts here... Our concierge responds within 3 business hours."
                  className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-[#006241] rounded-xl px-4 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition-colors resize-none"
                />
              </div>

              {/* Status messages */}
              {contactError && (
                <div className="p-3.5 bg-red-950/30 border border-red-900/40 text-red-400 rounded-xl text-xs font-medium">
                  {contactError}
                </div>
              )}
              {contactSuccess && (
                <div className="p-3.5 bg-emerald-950/30 border border-[#006241]/40 text-emerald-400 rounded-xl text-xs font-medium">
                  {contactSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={contactLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006241] hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                {contactLoading ? "DISPATCHING..." : "DISPATCH DISCOVERY MSG"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Column: Physical Addresses & Newsletter Subscription */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Address Core Details */}
            <div className="bg-[#121815]/30 backdrop-blur-md border border-zinc-900 rounded-3xl p-6 sm:p-8 text-left space-y-4 flex-1 flex flex-col justify-center">
              <span className="text-emerald-400 font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
                HEAD OFFICE CONCIERGE
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">
                Brew Haven HQ & Roastery
              </h3>

              <div className="space-y-3.5">
                <div className="flex gap-3.5 items-start">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    100 Obsidian Plaza, Historic Quarter, Suite 500, New York, NY 10013
                  </p>
                </div>
                <div className="flex gap-3.5 items-center">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-xs text-zinc-400">+1 (800) 555-BREW (2739)</p>
                </div>
                <div className="flex gap-3.5 items-center">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-xs text-zinc-400">concierge@brewhaven.cafe</p>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Card (Section 9) */}
            <div className="bg-gradient-to-br from-[#121815] to-[#0D1210] border border-zinc-900 rounded-3xl p-6 sm:p-8 text-left space-y-4">
              <div className="flex items-center gap-2">
                <MailPlus className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono text-white tracking-widest uppercase">THE INNER CIRCLE</span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed">
                Join our private ledger of coffee professionals. Receive exclusive invites to Geisha micro-lot openings and masterclasses.
              </p>

              <form onSubmit={handleSubscribeSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Secure email signature..."
                  className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-700"
                />
                <button
                  type="submit"
                  disabled={subscribeLoading}
                  className="px-4 py-3 bg-[#006241] hover:bg-[#004d33] rounded-xl text-white font-bold text-xs cursor-pointer flex items-center justify-center"
                >
                  {subscribeLoading ? "..." : "JOIN"}
                </button>
              </form>

              {/* Status responses */}
              {subscribeError && (
                <p className="text-[11px] text-red-400 font-medium">{subscribeError}</p>
              )}
              {subscribeSuccess && (
                <p className="text-[11px] text-emerald-400 font-medium">{subscribeSuccess}</p>
              )}
            </div>

          </div>

        </div>

        {/* Cafe Gallery Grid (Optional Extra Feature - visually gorgeous!) */}
        <div className="border-t border-zinc-900/60 pt-16">
          <div className="flex items-center justify-between mb-8 text-left">
            <div>
              <span className="text-emerald-400 font-mono text-[9px] tracking-[0.25em] uppercase font-bold">ATMOSPHERIC REEL</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">Brew Haven Chronicle Gallery</h3>
            </div>
            <div className="flex gap-3 text-white">
              <a href="#" className="p-2 border border-zinc-900 rounded-full hover:bg-zinc-900/40 text-emerald-400"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 border border-zinc-900 rounded-full hover:bg-zinc-900/40 text-emerald-400"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 border border-zinc-900 rounded-full hover:bg-zinc-900/40 text-emerald-400"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=400"
                alt="Brew Haven Espresso Machine"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400"
                alt="Brew Haven Vibe"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400"
                alt="Brew Haven Espresso"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400"
                alt="Brew Haven Pour"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
