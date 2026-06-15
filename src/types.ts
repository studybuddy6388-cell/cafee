export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: "coffee" | "drinks" | "desserts" | "snacks";
  image: string;
  tags?: string[];
  notes?: string;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
  size: "Standard" | "Reserve Grand";
  milk?: "Whole Milk" | "Oat Milk" | "Almond Milk" | "None";
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  seatingPreference: string;
  specialRequests?: string;
  status?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  vibe: string;
  features: string[];
  lat?: number;
  lng?: number;
}
