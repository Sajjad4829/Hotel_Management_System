// AIResponses.js
// Local hotel dataset + canned response copy for the AI Concierge.
// No external API calls — everything here is static, local data.



export const WELCOME_MESSAGE =
  "👋 Welcome to our Hotel!\nI'm your AI Concierge.\nI can help you find rooms, compare hotels, explain facilities, recommend rooms, answer booking questions and guide you through your reservation.";

export const QUICK_QUESTIONS = [
  { label: "🏨 Recommend a luxury room", query: "Recommend a luxury room" },
  { label: "💰 Cheapest hotel", query: "I need a cheap hotel" },
  { label: "⭐ Best rated hotel", query: "Best hotel" },
  { label: "🏊 Hotels with swimming pool", query: "Pool" },
  { label: "🍽 Hotels with breakfast", query: "Breakfast included" },
  { label: "👨‍👩‍👧 Family room", query: "I need a family room" },
  { label: "🚗 Free parking", query: "Free parking" },
  { label: "💪 Hotels with gym", query: "Gym" },
  { label: "❌ Free cancellation", query: "Free cancellation" },
  { label: "🏖 Best for couples", query: "Best for couples" },
];

export const FALLBACK_RESPONSE =
  "I couldn't find an exact match for that, but I'm happy to help you explore rooms, prices, ratings, or amenities. Try one of the quick questions below, or ask me something like \"family room\" or \"cheapest hotel\".";