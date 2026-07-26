// AIUtils.js
// Pure local "AI" logic — pattern matching + filtering over the local
// hotel dataset. No network calls, no external AI API.

import { HOTELS, FALLBACK_RESPONSE } from "./AIResponses";

const formatPrice = (n) => `$${n}/night`;

const hotelLine = (h) =>
  `• ${h.name} — ${h.roomType}, ${formatPrice(h.pricePerNight)}, ⭐ ${h.guestRating} (${h.location})`;

const listHotels = (hotels, intro) => {
  if (!hotels.length) {
    return { text: FALLBACK_RESPONSE, hotels: [] };
  }
  const text = `${intro}\n\n${hotels.map(hotelLine).join("\n")}`;
  return { text, hotels };
};

// Each rule: test the message, return a result if matched.
const RULES = [
  {
    test: (m) => /cheap|budget|lowest price|affordable/.test(m),
    run: () => {
      const sorted = [...HOTELS].sort((a, b) => a.pricePerNight - b.pricePerNight);
      return listHotels([sorted[0]], "Here's our most budget-friendly option:");
    },
  },
  {
    test: (m) => /luxury|premium|five star|5 star|top tier|best room/.test(m),
    run: () => {
      const sorted = [...HOTELS].sort((a, b) => b.pricePerNight - a.pricePerNight);
      return listHotels(sorted.slice(0, 2), "Here are our top luxury picks:");
    },
  },
  {
    test: (m) => /family|kids|children/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => /family/i.test(h.roomType));
      return listHotels(results, "Here are hotels with Family Suites:");
    },
  },
  {
    test: (m) => /best rated|best hotel|highest rated|top rated/.test(m),
    run: () => {
      const sorted = [...HOTELS].sort((a, b) => b.guestRating - a.guestRating);
      return listHotels([sorted[0]], "Our highest-rated hotel is:");
    },
  },
  {
    test: (m) => /pool|swim/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.amenities.includes("pool"));
      return listHotels(results, "Hotels with a swimming pool:");
    },
  },
  {
    test: (m) => /gym|fitness|workout/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.amenities.includes("gym"));
      return listHotels(results, "Hotels with a gym:");
    },
  },
  {
    test: (m) => /spa/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.amenities.includes("spa"));
      return listHotels(results, "Hotels with a spa:");
    },
  },
  {
    test: (m) => /breakfast/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.breakfast);
      return listHotels(results, "Hotels that include breakfast:");
    },
  },
  {
    test: (m) => /parking/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.freeParking);
      return listHotels(results, "Hotels with free parking:");
    },
  },
  {
    test: (m) => /cancel/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.freeCancellation);
      return listHotels(results, "Hotels offering free cancellation:");
    },
  },
  {
    test: (m) => /couple|romantic|honeymoon/.test(m),
    run: () => {
      const results = HOTELS.filter((h) => h.goodForCouples);
      return listHotels(results, "Great picks for couples:");
    },
  },
  {
    test: (m) => /compare/.test(m),
    run: () => {
      const sorted = [...HOTELS].sort((a, b) => b.guestRating - a.guestRating).slice(0, 3);
      return listHotels(sorted, "Here's a quick comparison of top hotels:");
    },
  },
];

/**
 * getAIResponse
 * Takes a raw user message string, matches it against local rules,
 * and returns { text, hotels } — hotels is an array of matched hotel
 * objects (may be empty) so the UI can render result cards.
 */
export function getAIResponse(message) {
  const m = message.toLowerCase().trim();

  for (const rule of RULES) {
    if (rule.test(m)) {
      return rule.run();
    }
  }

  return { text: FALLBACK_RESPONSE, hotels: [] };
}

export function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function makeMessage({ sender, text, hotels = [] }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    sender, // "user" | "ai"
    text,
    hotels,
    time: formatTime(),
  };
}