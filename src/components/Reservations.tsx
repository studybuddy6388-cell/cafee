import React, { useState, useEffect } from "react";
import { X, Calendar, Users, MapPin, Sparkles, Clock, Check } from "lucide-react";
import { Reservation } from "../types";

interface ReservationsProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string;
}

export default function Reservations({ isOpen, onClose, defaultLocation = "" }: ReservationsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState("Downtown Master Reserve");
  const [seatingPreference, setSeatingPreference] = useState("Panoramic Glass Window");
  const [specialRequests, setSpecialRequests] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReservation, setSuccessReservation] = useState<Reservation | null>(null);

  const [existingReservations, setExistingReservations] = useState<Reservation[]>([]);

  // Update default Location when passed from parent
  useEffect(() => {
    if (defaultLocation) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation]);

  // Read historic list from backend
  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      if (data.success) {
        setExistingReservations(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchReservations();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessReservation(null);

    const payload = {
      name,
      email,
      phone,
      date,
      time,
      guests,
      location,
      seatingPreference,
      specialRequests
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (resData.success) {
        setSuccessReservation(resData.data);
        // Reset state
        setName("");
        setEmail("");
        setPhone("");
        setDate("");
        setTime("");
        setGuests(2);
        setSpecialRequests("");
        // Reload history
        fetchReservations();
      } else {
        setError(resData.error || "A transient failure occurred booking your session.");
      }
    } catch (err) {
      console.error(err);
      setError("Server link failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Dark Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer" />

      {/* Main Reservation Card dialog */}
      <div className="relative w-full max-w-4xl bg-[#0A0F0D] border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Interactive Form Column */}
        <div className="flex-1 p-6 sm:p-10 text-left overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-emerald-400 font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
                ONLINE RESERVATION SYSTEM
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mt-0.5">
                Reserve Seating Lounge
              </h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1.5 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {successReservation ? (
            /* Successful Reservation Receipt */
            <div className="space-y-6 py-6 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#006241]/20 border border-[#006241]/50 flex items-center justify-center text-emerald-400 text-2xl mx-auto md:mx-0">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">RESERVATION CONFIRMED</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Greetings, *{successReservation.name}*. Your private lounge spot has been secured. Review receipt details below:
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl text-left space-y-2 text-xs font-mono text-zinc-400">
                <div><span className="text-[#006241]">REF ID:</span> {successReservation.id}</div>
                <div><span className="text-[#006241]">BRANCH:</span> {successReservation.location}</div>
                <div><span className="text-[#006241]">SEATING:</span> {successReservation.seatingPreference}</div>
                <div><span className="text-[#006241]">TIMING:</span> {successReservation.date} @ {successReservation.time}</div>
                <div><span className="text-[#006241]">GUESTS:</span> {successReservation.guests} Premium guests</div>
                {successReservation.specialRequests && (
                  <div><span className="text-[#006241]">SPECIAL:</span> {successReservation.specialRequests}</div>
                )}
              </div>

              <button
                onClick={() => setSuccessReservation(null)}
                className="w-full py-3.5 bg-[#006241] text-white font-bold rounded-xl text-xs uppercase cursor-pointer text-center block"
              >
                BOOK ANOTHER RESERVATION
              </button>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="res-name-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    GUEST NAME *
                  </label>
                  <input
                    type="text"
                    id="res-name-input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Charles Sterling"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="res-email-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    CONTACT EMAIL *
                  </label>
                  <input
                    type="email"
                    id="res-email-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="charles@sterling.com"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="res-phone-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    CONTACT PHONE *
                  </label>
                  <input
                    type="tel"
                    id="res-phone-input"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 732-9012"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="res-location-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    SELECT BRANCH *
                  </label>
                  <select
                    id="res-location-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  >
                    <option value="Downtown Master Reserve">Downtown Master Reserve</option>
                    <option value="Coastal Terrace Sanctuary">Coastal Terrace Sanctuary</option>
                    <option value="Heritage Village Pavilion">Heritage Village Pavilion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="res-date-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    SELECT DATE *
                  </label>
                  <input
                    type="date"
                    id="res-date-input"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="res-time-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    SELECT TIME *
                  </label>
                  <input
                    type="time"
                    id="res-time-input"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="res-guests-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                    GUESTS COUNT *
                  </label>
                  <select
                    id="res-guests-input"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6+ (Inquire Private Room)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="res-seat-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                  SEATING PREFERENCE LOUNGE *
                </label>
                <select
                  id="res-seat-input"
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                >
                  <option value="Panoramic Glass Window">Window Lounge (Panoramic Master Views of city/ocean)</option>
                  <option value="Al Fresco Deck">Al Fresco Deck (Open fresh breeze sitters)</option>
                  <option value="Private Fireside Lounge">Private Fireside Lounge (Warm cozy leather couches)</option>
                  <option value="Standard Dining Seat">Standard Elegant Seating</option>
                </select>
              </div>

              <div>
                <label htmlFor="res-requests-input" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1.5">
                  DIETARY NOTES & SPECIAL REQUESTS
                </label>
                <input
                  type="text"
                  id="res-requests-input"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Anniversary, gluten allergies, wheelchair accessibility..."
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none"
                />
              </div>

              {error && (
                <div className="p-3.5 bg-red-950/30 border border-red-900/40 text-red-400 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#006241] to-emerald-700 hover:opacity-95 text-white font-bold text-xs tracking-widest uppercase cursor-pointer"
              >
                {loading ? "PREPARING SANCTUARY..." : "REQUEST SECURE LOUNGE RESERVATION"}
              </button>
            </form>
          )}
        </div>

        {/* Right Historic Audit Column */}
        <div className="w-full md:w-[320px] bg-zinc-950 border-t md:border-t-0 md:border-l border-zinc-900 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-900">
          
          <div className="text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#006241] uppercase tracking-widest font-bold">Lounge Status Ledger</span>
              <button
                onClick={onClose}
                className="hidden md:block p-1.5 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-full transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Below is the verified ledger of premium reservations across our geographic locations.
            </p>

            <div className="space-y-3.5 pt-2 max-h-[300px] md:max-h-none overflow-y-auto pr-1">
              {existingReservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-[#121815]/80 border border-zinc-900/80 p-3.5 rounded-xl space-y-2 text-left"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white tracking-tight">{res.name}</span>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded uppercase">
                      {res.status || "Confirmed"}
                    </span>
                  </div>

                  <div className="space-y-1 text-[10px] font-mono text-zinc-500">
                    <div>Branch: {res.location}</div>
                    <div className="flex justify-between">
                      <span>Timing: {res.date} @ {res.time}</span>
                      <span className="text-zinc-400 font-bold">({res.guests} G)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900/60 text-left mt-6">
            <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">CONCIERGE ASSURANCE</span>
            <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
              Your table is held precisely for 15 minutes past RSVP clock before releasing. Please communicate timing updates directly with Concierge.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
