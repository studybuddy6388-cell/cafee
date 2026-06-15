import { MenuItem, Testimonial, Branch } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE (Starbucks inspired premium)
  {
    id: "m-1",
    name: "Ethiopian Reserve Cappuccino",
    description: "Velvety steamed heirloom milk folded with double-shot artisan espresso, dusted with hand-grated Venezuelan grand cru dark cocoa.",
    price: 5.50,
    rating: 4.9,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1572442388796-11668a720609?auto=format&fit=crop&q=80&w=600",
    tags: ["Signature", "House Roast", "Spicy Understatement"],
    notes: "Ethiopian Yirgacheffe Single-Origin"
  },
  {
    id: "m-2",
    name: "Belgian Dark Mocha Frappuccino",
    description: "Ice-crystallized double ristretto espresso blended with organic Belgian chocolate ganache, layered under heavy organic milk cloud & mocha glaze.",
    price: 6.50,
    rating: 4.8,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=600",
    tags: ["Best Seller", "Chocolate Lover"],
    notes: "Sweet & Intensely Decadent"
  },
  {
    id: "m-3",
    name: "Madagascar Vanilla Bean Latte",
    description: "Cold-pressed Madagascar bourbon vanilla caviar syrup, roasted espresso beans, micro-textured silk milk, decorated with delicate floral latte art.",
    price: 5.75,
    rating: 4.9,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    tags: ["Classic Upgrade", "Sweet Vanilla"],
    notes: "Floral & Delicate Aromas"
  },
  {
    id: "m-4",
    name: "Crystallized Caramel Macchiato",
    description: "Artfully layered organic whole milk vanilla infusion, cold-brewed espresso shot float, hand-drizzled with salty house caramel recipe.",
    price: 6.00,
    rating: 4.7,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=600",
    tags: ["Popular", "Sweet & Rich"],
    notes: "Contrast of Temperatures"
  },
  {
    id: "m-5",
    name: "Geisha Single-Origin Cold Brew",
    description: "Precision 18-hour cold-steeped organic Geisha coffee beans, served over a flawless, singular crystal-clear slow-melting ice sphere.",
    price: 5.25,
    rating: 5.0,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    tags: ["Limited Batch", "Aromatic Reserve"],
    notes: "Tasting notes of Bergamot and Jasmine"
  },

  // DRINKS
  {
    id: "m-6",
    name: "Uji Matcha Lavender Latte",
    description: "Ceremonial-grade green Uji matcha from Kyoto whisks elegantly over cold sweetened lavender blossom nectar, layered over rich cream milk.",
    price: 6.25,
    rating: 4.9,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600",
    tags: ["Specialty Teal", "Kyoto Import"],
    notes: "Soothing Lavender Highlights"
  },
  {
    id: "m-7",
    name: "Damask Rose & Hibiscus Infusion",
    description: "Vivid deep-crimson tea of dry Egyptian hibiscus florets, absolute rose extract, served chilled with freeze-dried strawberry shards.",
    price: 5.00,
    rating: 4.8,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600",
    tags: ["Herbal", "Anti-Oxidant Masterpiece"],
    notes: "Tart, Fruity, Sophisticated"
  },
  {
    id: "m-8",
    name: "Citrus Mint Espresso Tonic",
    description: "A dual-texture adventure of carbonated premium tonic, extracted lime citrus essence, double espresso shot, topped with botanical garden mint.",
    price: 6.50,
    rating: 4.7,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=600",
    tags: ["Botanical Brew", "Summer Special"],
    notes: "Crisp, Effervescent, Vibrant"
  },

  // DESSERTS
  {
    id: "m-9",
    name: "Golden Honey Castella Cake",
    description: "Decadently moist, traditional Japanese sponge pastry, wood-oven baked using wild acacia honey for a springy texture & amber glaze look.",
    price: 7.00,
    rating: 4.9,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    tags: ["Voted #1 Dessert", "Kyoto Style"],
    notes: "Naturally Sweetened & Airy"
  },
  {
    id: "m-10",
    name: "24K Molten Chocolate Fondant",
    description: "Belgian single-origin cocoa cake featuring a thick, warm volcanic lava ganache center, finished with edible 24-karat gold leaf flakes.",
    price: 8.50,
    rating: 5.0,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564000-e15859d8414b?auto=format&fit=crop&q=80&w=600",
    tags: ["Ultimate Luxury", "Served Warm"],
    notes: "70% Single Origin Cocoa"
  },
  {
    id: "m-11",
    name: "Sicilian Pistachio Rose Macarons",
    description: "Glossy hand-piped almond macarons stuffed with a creamy, rich Sicilian white chocolate pistachio base and subtle Persian rose petals.",
    price: 6.50,
    rating: 4.8,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600",
    tags: ["Gluten Free Choice", "Sweet Elegance"],
    notes: "Box of 3 Premium Macarons"
  },

  // SNACKS
  {
    id: "m-12",
    name: "Truffle Caviar Avocado Toast",
    description: "A slice of wood-fired triple-ferment sourdough base, seasoned Hass avocado whip, misted with Italian white truffle oil and seaweed faux-caviar.",
    price: 9.50,
    rating: 4.9,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600",
    tags: ["Healthy Artisan", "Truffle Aromatics"],
    notes: "Served with side salad"
  },
  {
    id: "m-13",
    name: "Dill Salmon Butter Croissant",
    description: "Flaky croissant baked in multi-layer French butter, stuffed with sliced cold-smoked Scottish salmon, cream cheese spread, and pickling dills.",
    price: 11.00,
    rating: 4.9,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600",
    tags: ["Luxe Lunch Ready", "Omega-3 Abundance"],
    notes: "Flaky & Hot Pressed Option"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Duchess Clarissa Sterling",
    role: "Sensory Curator, Elite Lifestyle",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "The Ethiopian Reserve Cappuccino is transcending. The cocoa powder is rich Yuruá single-source, and their Geisha Cold Brew hits the palate like a vintage Burgundy. The dark emerald and gold architecture is simply stunning.",
    date: "1 week ago"
  },
  {
    id: "t-2",
    name: "Christian Vance",
    role: "Architect & Spatial Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "An absolute masterclass in luxury branding. From glassmorphism menus to the absolute perfect lighting. It provides a supreme sanctuary of quietude. Order the Truffle Toast and prepare to feel completely satisfied.",
    date: "3 days ago"
  },
  {
    id: "t-3",
    name: "Dr. Kenji Sato",
    role: "Coffee Sommelier & Food Chemist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "Their extraction curve is calculated with molecular perfection. The 18-hour Geisha brew highlights jasmine and bergamot floral esters without any astringency. Undeniably the most premium cup in the city.",
    date: "2 weeks ago"
  }
];

export const BRANCHES: Branch[] = [
  {
    id: "b-1",
    name: "Downtown Master Reserve",
    address: "742 Obsidian Court, Metro Plaza, Suite 100",
    phone: "+1 (555) 700-1100",
    hours: "6:00 AM - 10:00 PM Daily",
    vibe: "Elegant Marble Columns & Velvet Lounge Chairs",
    features: ["Valet Parking", "Fireside Sitting Room", "Live Piano Jazz (Sat & Sun)"]
  },
  {
    id: "b-2",
    name: "Coastal Terrace Sanctuary",
    address: "89 Riviera Promenade, Marina Sands Block C",
    phone: "+1 (555) 700-2200",
    hours: "7:00 AM - 11:00 PM Daily",
    vibe: "Infinite Water Mirror & Open Glass Solarium",
    features: ["Ocean Front Deck", "Sunset Coffee Cupping Sessions", "Outdoor Firepits"]
  },
  {
    id: "b-3",
    name: "Heritage Village Pavilion",
    address: "14 Walnut Lane, Historic Quarter Town Center",
    phone: "+1 (555) 700-3300",
    hours: "8:00 AM - 9:00 PM Daily",
    vibe: "Centuries-old Reclaimed Sequoia & Warm Soft Brick",
    features: ["Private Study Lounges", "Artisanal Brew Workshops", "Antique Display Library"]
  }
];
