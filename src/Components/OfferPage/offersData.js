export const categories = [
  { id: "all", label: "All Offers" },
  { id: "rooms", label: "Rooms & Suites" },
  { id: "dining", label: "Dining" },
  { id: "spa", label: "Spa & Wellness" },
];

export const packages = [
  {
    id: "pkg1",
    title: "Romantic Getaway",
    description: "Enjoy a romantic 2-night stay with champagne, couples massage, and a private dinner.",
    price: 599,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800",
    features: ["2 Nights Stay", "Couples Massage", "Private Dinner", "Champagne"],
  },
  {
    id: "pkg2",
    title: "Family Adventure",
    description: "Fun for the whole family with adjoining rooms, waterpark access, and kids meals included.",
    price: 899,
    image: "https://images.unsplash.com/photo-1540544660406-6aee9dac65e7?auto=format&fit=crop&q=80&w=800",
    features: ["Adjoining Rooms", "Waterpark Access", "Kids Eat Free", "Late Checkout"],
  },
];

export const membershipTiers = [
  {
    id: "silver",
    name: "Silver Tier",
    discount: "5%",
    benefits: ["Free Wi-Fi", "Late Checkout"],
  },
  {
    id: "gold",
    name: "Gold Tier",
    discount: "10%",
    benefits: ["Room Upgrades", "Free Breakfast", "Spa Access"],
  },
  {
    id: "platinum",
    name: "Platinum Tier",
    discount: "15%",
    benefits: ["Suite Upgrades", "Executive Lounge", "Airport Transfer", "24/7 Concierge"],
  },
];

export const whyBookDirect = [
  {
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an extra 10% off.",
    icon: "Shield",
  },
  {
    title: "Flexible Cancellation",
    description: "Plans change. Cancel up to 24 hours before your stay for free.",
    icon: "Calendar",
  },
  {
    title: "Exclusive Perks",
    description: "Enjoy free room upgrades and late checkout when available.",
    icon: "Star",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frequent Traveler",
    text: "The romantic getaway package was everything we hoped for and more. Absolutely stunning experience.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Guest",
    text: "Booking direct always gets me the best rooms. The Platinum Tier benefits are unmatched.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "Can I combine multiple offers?",
    answer: "Generally, offers cannot be combined unless specifically stated in the terms and conditions of the promotion.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Direct bookings allow free cancellation up to 24 hours before your scheduled check-in time.",
  },
  {
    question: "How do I redeem my membership discount?",
    answer: "Simply log in to your account before booking. Your membership discount will be applied automatically at checkout.",
  },
];
