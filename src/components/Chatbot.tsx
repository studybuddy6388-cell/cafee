import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, AlertCircle, Coffee } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "bot" }>>([
    {
      id: "wel-1",
      text: "Greetings. I am your Artisan Butler. Allow me to guide you through our Geisha Reserves, desserts, or assist with a private reservation.",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    // Add user message to state
    const userMsg = {
      id: "msg-" + Math.random().toString(36).substr(2, 9),
      text: userText,
      sender: "user" as const
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId: "session_user_01" }),
      });

      const resData = await response.json();
      const botMsg = {
        id: "msg-" + Math.random().toString(36).substr(2, 9),
        text: resData.text || "An elegant silence. Standard concierge recommendations apply.",
        sender: "bot" as const
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat failure: ", err);
      const errMsg = {
        id: "msg-err",
        text: "Forgive me, the neural server experienced a warm-up sequence. In the meantime, I highly recommend our 18-hour cold brew!",
        sender: "bot" as const
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
      
      {/* Floating button trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#006241] to-[#0A0F0D] border border-[#006241]/60 flex items-center justify-center text-white shadow-xl shadow-black/80 hover:scale-105 transition-transform duration-300 cursor-pointer group"
        title="Artisan concierge assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-zinc-300 group-hover:text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-emerald-400 group-hover:scale-105" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Floating Chat Box Panel */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] bg-[#0A0F0D] border border-zinc-900 rounded-3xl mt-4 flex flex-col overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#121815] border-b border-zinc-900/60 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#006241]/20 border border-[#006241]/60 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white tracking-widest uppercase">The Artisan Concierge</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono tracking-widest text-[#006241] uppercase">SOVEREIGN AI ACTIVE</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-900 bg-[#070b09]">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? "justify-start" : "justify-end"} text-left`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      isBot
                        ? "bg-[#121815] border border-zinc-900 text-zinc-300 rounded-tl-none"
                        : "bg-[#006241] text-white rounded-tr-none"
                    }`}
                  >
                    {isBot && (
                      <div className="text-[8px] font-mono tracking-widest text-emerald-500 uppercase mb-1 font-bold">
                        Concierge Response
                      </div>
                    )}
                    <span className="whitespace-pre-line">{msg.text}</span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Loading Indicator */}
            {loading && (
              <div className="flex justify-start text-left">
                <div className="bg-[#121815] border border-zinc-900 text-zinc-400 px-4 py-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest animate-pulse text-[#006241]">Brewing response</span>
                  <span className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#006241] animate-bounce delay-100"></span>
                    <span className="w-1 h-1 rounded-full bg-[#006241] animate-bounce delay-200"></span>
                    <span className="w-1 h-1 rounded-full bg-[#006241] animate-bounce delay-300"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input text form footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#121815] border-t border-zinc-900/60 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about blends or reserve seating..."
              className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-[#006241] rounded-xl px-3.5 py-3 text-xs text-zinc-300 outline-none placeholder:text-zinc-700"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-[#006241] hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
              title="Send Inquiry"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
