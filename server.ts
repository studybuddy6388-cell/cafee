import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database of reservations, contact messages, and newsletter subscribers
const reservations = [
  {
    id: "res-1",
    name: "Sophia Sterling",
    email: "sophia@sterling.com",
    phone: "+1 (555) 732-9012",
    date: "2026-06-18",
    time: "18:30",
    guests: 2,
    location: "Downtown Reserve",
    seatingPreference: "Window Lounge",
    specialRequests: "Complimentary champagne if possible, celebrating an anniversary.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "res-2",
    name: "Marcus Vance",
    email: "marcus.v@chronicle.com",
    phone: "+1 (555) 489-3011",
    date: "2026-06-20",
    time: "10:00",
    guests: 4,
    location: "Coastal Terrace",
    seatingPreference: "Al Fresco Deck",
    specialRequests: "Quiet spot suitable for business meeting.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

const contactMessages = [
  {
    id: "msg-1",
    name: "Elena Rostova",
    email: "elena@vanguard.design",
    message: "Would love to host a lifestyle photoshoot at your Coastal Terrace branch. Do you permit booking after-hours?",
    createdAt: new Date().toISOString()
  }
];

const subscribers = new Set<string>(["curator@coffeenews.com", "epicurean@vibe.com"]);

// Store customized chat conversations in memory per frontend session to let chatbot remember context
const chatConversations: { [sessionId: string]: any[] } = {};

// Express API endpoints
app.get("/api/reservations", (req, res) => {
  res.json({ success: true, data: reservations });
});

app.post("/api/reservations", (req, res) => {
  const { name, email, phone, date, time, guests, location, seatingPreference, specialRequests } = req.body;
  if (!name || !email || !phone || !date || !time || !guests || !location) {
    return res.status(400).json({ success: false, error: "Please fulfill all required fields." });
  }

  const newReservation = {
    id: "res-" + Math.random().toString(36).substr(2, 9),
    name,
    email,
    phone,
    date,
    time,
    guests: Number(guests),
    location,
    seatingPreference: seatingPreference || "Any Available Table",
    specialRequests: specialRequests || "",
    status: "Confirmed", // Auto-confirming premium reservation
    createdAt: new Date().toISOString()
  };

  reservations.unshift(newReservation);
  res.json({ success: true, data: newReservation });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email, and message are required." });
  }

  const newMessage = {
    id: "msg-" + Math.random().toString(36).substr(2, 9),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  contactMessages.unshift(newMessage);
  res.json({ success: true, message: "Message dispatched to our Concierge team." });
});

app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Please enter a valid signature email." });
  }

  subscribers.add(email);
  res.json({ success: true, message: "Welcome to the Inner Circle. Subscription verified." });
});

// AI Chatbot with Server-Side Gemini API
app.post("/api/chat", async (req, res) => {
  const { message, sessionId = "default" } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: "Message input is required." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        success: true,
        text: "Greetings. I am the Brew Haven Concierge. (Note: The server is currently operating in offline concierge mode because the GEMINI_API_KEY secret is not declared, but I can recommend our signature Cold Brew and desserts!)"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Handle conversation history
    if (!chatConversations[sessionId]) {
      chatConversations[sessionId] = [];
    }

    const history = chatConversations[sessionId];
    history.push({ role: "user", parts: [{ text: message }] });

    // Build model prompt instructions
    const systemInstruction = `You are "The Artisan Concierge", a luxurious, incredibly knowledgeable, polite, and charming AI butler for "Brew Haven Cafe".
Our cafe is an premium, Starbucks-style high-end luxury sanctuary where coffee is treated like fine wine.
Your tone is sophisticated, welcoming, upscale, and helpful. You speak with premium grace but remain warm and human.

Our Signature Menu items:
Category: COFFEE
1. Cappuccino ($5.50) - Velvet steamed milk, double espresso of single-origin Ethiopian beans, rich Venezuelan cocoa dusting.
2. Mocha Frappuccino ($6.50) - Ice blended espresso with liquid Belgian dark chocolate, whipped micro-cream, with gourmet mocha glaze drizzle.
3. Vanilla Latte ($5.75) - Hand-scraped Madagascar vanilla bean caviar syrup, double espresso, silky dairy microfoam.
4. Caramel Macchiato ($6.00) - Layered organic milk vanilla infusion, light-roast espresso, house-crystallized butter caramel drizzle.
5. Cold Brew ($5.25) - 18-hour continuous cold-steeped single-origin Geisha beans, served over raw crystal-cut ice.

Category: DRINKS
1. Matcha Lavender Iced Latte ($6.25) - Ceremonial Uji matcha whisked with sweet lavender flower syrup, iced and topped with almond cream.
2. Hibiscus Rose Herbal Tea ($5.00) - Crimson infusion of Egyptian hibiscus calyces, organic damask rose petals. Antioxidant cure.
3. Citrus Mint Espresso Tonic ($6.50) - High-pressure double espresso pulled over cold artisanal tonic water, lime citrus spray, garden fresh mint.

Category: DESSERTS
1. Golden Honey Castella Cake ($7.00) - Delicate Japanese style moist sponge cake infused with natural white acacia honey.
2. Dark Chocolate Lava Fondant ($8.50) - Warm single-origin volcanic dark chocolate cake with a melting lava cream core, gilded with 24k gold leaf.
3. Pistachio Rose Macarons (Set of 3) ($6.50) - Baked almond meringue cookies filled with rich salted Sicilian pistachio white chocolate paste.

Category: SNACKS
1. Truffle Avocado Toast ($9.50) - Wood-fired wild sourdough slices, mashed Hass avocado, Italian white truffle oil mist, sea salt crystals, and hand-picked microgreens.
2. Smoked Salmon & Caper Croissant ($11.00) - Hand-rolled triple-butter croissant baked fresh, stuffed with premium oak-smoked wild Scottish salmon, organic dill cream cheese, pickled capers.

Branches:
- Downtown Reserve: 742 Obsidian Court, Metro Plaza (Open 6:00 AM - 10:00 PM)
- Coastal Terrace: 89 Riviera Promenade, Marina Sands (Open 7:00 AM - 11:00 PM)
- Heritage Village: 14 Walnut Lane, Historic Quarter (Open 8:00 AM - 9:00 PM)

Reservations:
- Users can reserve tables in the app! Tell them they can use the Reservations form or let you (the Concierge) know. We offer Al Fresco Deck, Panoramic Glass Window, and Private Fireside Lounges. If they ask you to book a table, note down their request politely and instruct them that their booking has been prepared so they can review or customize it using our online table reservation system panel.

Keep responses relatively brief, exquisitely styled, and elegant. Offer recommendations from our premium menu when appropriate.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: `SYSTEM INSTRUCTIONS: ${systemInstruction}` }] },
        ...history
      ],
    });

    const botReply = response.text || "An elegant silence. Standard concierge responses apply.";
    history.push({ role: "model", parts: [{ text: botReply }] });

    // Trim history to prevent huge token arrays (keep last 12 exchanges)
    if (history.length > 24) {
      chatConversations[sessionId] = history.slice(-24);
    }

    res.json({ success: true, text: botReply });
  } catch (error: any) {
    console.error("Gemini Assistant Error: ", error);
    res.json({
      success: false,
      text: "Forgive me, my neural espresso machine is experiencing a transient connection warm-up. Let me recommend our 18-hour cold brew in the meantime!",
      error: error.message
    });
  }
});

// Setup Vite Dev Server / Prod Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Brew Haven Cafe Server] Running elegant service on http://localhost:${PORT}`);
  });
}

startServer();
