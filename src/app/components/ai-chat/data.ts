import { ConversationFlow, ChatMessage, Suggestion, QuickReply } from "./types"

export const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hey there! 👋 I'm your AI travel planner. Tell me where you'd like to go, and I'll build the perfect itinerary for you!",
  timestamp: new Date(),
  quickReplies: [
    { label: "🏖️ Beach Vacation", value: "beach vacation" },
    { label: "🏔️ Mountain Trip", value: "mountain trip" },
    { label: "🌍 International", value: "international trip" },
    { label: "💰 Budget Friendly", value: "budget trip" },
    { label: "💑 Honeymoon", value: "honeymoon" },
  ],
}

const packageSuggestions: Record<string, Suggestion[]> = {
  beach: [
    {
      type: "package",
      id: "bali",
      title: "Romantic Bali Escape",
      subtitle: "5 Days / 4 Nights • Bali, Indonesia",
      image: "https://picsum.photos/seed/bali/400/200",
      meta: { price: "₹65,000", rating: "4.7 ★", discount: "19% OFF" },
    },
    {
      type: "package",
      id: "goa",
      title: "Goa Beach Weekend",
      subtitle: "3 Days / 2 Nights • Goa, India",
      image: "https://picsum.photos/seed/goa/400/200",
      meta: { price: "₹12,000", rating: "4.4 ★", discount: "25% OFF" },
    },
    {
      type: "package",
      id: "maldives",
      title: "Maldives Luxury Retreat",
      subtitle: "6 Days / 5 Nights • Malé, Maldives",
      image: "https://picsum.photos/seed/maldives/400/200",
      meta: { price: "₹1,85,000", rating: "4.9 ★", discount: "15% OFF" },
    },
  ],
  mountain: [
    {
      type: "package",
      id: "swiss",
      title: "Swiss Alps Adventure",
      subtitle: "7 Days / 6 Nights • Interlaken, Switzerland",
      image: "https://picsum.photos/seed/swiss/400/200",
      meta: { price: "₹1,80,000", rating: "4.9 ★", discount: "14% OFF" },
    },
    {
      type: "package",
      id: "ladakh",
      title: "Ladakh Adventure",
      subtitle: "6 Days / 5 Nights • Leh-Nubra, India",
      image: "https://picsum.photos/seed/ladakh/400/200",
      meta: { price: "₹42,000", rating: "4.9 ★", discount: "16% OFF" },
    },
  ],
  international: [
    {
      type: "package",
      id: "paris",
      title: "Paris Romantic Getaway",
      subtitle: "6 Days / 5 Nights • Paris, France",
      image: "https://picsum.photos/seed/paris/400/200",
      meta: { price: "₹2,00,000", rating: "4.8 ★", discount: "13% OFF" },
    },
    {
      type: "package",
      id: "dubai",
      title: "Dubai Luxury Holiday",
      subtitle: "5 Days / 4 Nights • Dubai, UAE",
      image: "https://picsum.photos/seed/dubai/400/200",
      meta: { price: "₹90,000", rating: "4.7 ★", discount: "18% OFF" },
    },
    {
      type: "package",
      id: "thailand",
      title: "Thailand Budget Trip",
      subtitle: "5 Days / 4 Nights • Bangkok-Pattaya",
      image: "https://picsum.photos/seed/thailand/400/200",
      meta: { price: "₹45,000", rating: "4.6 ★", discount: "25% OFF" },
    },
  ],
  budget: [
    {
      type: "package",
      id: "goa",
      title: "Goa Beach Weekend",
      subtitle: "3 Days / 2 Nights • Goa, India",
      image: "https://picsum.photos/seed/goa/400/200",
      meta: { price: "₹12,000", rating: "4.4 ★", discount: "25% OFF" },
    },
    {
      type: "package",
      id: "varanasi",
      title: "Varanasi Spiritual Journey",
      subtitle: "3 Days / 2 Nights • Varanasi, India",
      image: "https://picsum.photos/seed/varanasi/400/200",
      meta: { price: "₹15,000", rating: "4.5 ★", discount: "21% OFF" },
    },
  ],
  honeymoon: [
    {
      type: "package",
      id: "bali",
      title: "Romantic Bali Escape",
      subtitle: "5 Days / 4 Nights • Bali, Indonesia",
      image: "https://picsum.photos/seed/bali/400/200",
      meta: { price: "₹65,000", rating: "4.7 ★", discount: "19% OFF" },
    },
    {
      type: "package",
      id: "kerala",
      title: "Kerala Backwaters",
      subtitle: "4 Days / 3 Nights • Alleppey, India",
      image: "https://picsum.photos/seed/kerala/400/200",
      meta: { price: "₹30,000", rating: "4.8 ★", discount: "21% OFF" },
    },
    {
      type: "package",
      id: "paris",
      title: "Paris Romantic Getaway",
      subtitle: "6 Days / 5 Nights • Paris, France",
      image: "https://picsum.photos/seed/paris/400/200",
      meta: { price: "₹2,00,000", rating: "4.8 ★", discount: "13% OFF" },
    },
  ],
}

const locationSuggestions: Suggestion[] = [
  {
    type: "location",
    id: "bali",
    title: "Bali, Indonesia",
    subtitle: "Beaches • Temples • Culture",
    image: "https://picsum.photos/seed/bali-loc/400/200",
    meta: { bestTime: "Apr – Oct", avgCost: "₹60K–80K" },
  },
  {
    type: "location",
    id: "paris",
    title: "Paris, France",
    subtitle: "Romance • Art • Cuisine",
    image: "https://picsum.photos/seed/paris-loc/400/200",
    meta: { bestTime: "Jun – Sep", avgCost: "₹1.8L–2.5L" },
  },
  {
    type: "location",
    id: "ladakh",
    title: "Ladakh, India",
    subtitle: "Adventure • Mountains • Lakes",
    image: "https://picsum.photos/seed/ladakh-loc/400/200",
    meta: { bestTime: "Jun – Sep", avgCost: "₹35K–50K" },
  },
  {
    type: "location",
    id: "dubai",
    title: "Dubai, UAE",
    subtitle: "Luxury • Shopping • Desert",
    image: "https://picsum.photos/seed/dubai-loc/400/200",
    meta: { bestTime: "Nov – Mar", avgCost: "₹80K–1.2L" },
  },
]

const dateSuggestions: Suggestion[] = [
  { type: "date", id: "dec", title: "December 2025", subtitle: "Peak season • Christmas vibes", meta: { weather: "Cool & Pleasant", crowd: "High" } },
  { type: "date", id: "jan", title: "January 2026", subtitle: "New Year getaway", meta: { weather: "Winter", crowd: "Moderate" } },
  { type: "date", id: "mar", title: "March 2026", subtitle: "Spring break • Off-peak deals", meta: { weather: "Warm", crowd: "Low" } },
  { type: "date", id: "jun", title: "June 2026", subtitle: "Summer vacation", meta: { weather: "Hot", crowd: "High" } },
]

const budgetSuggestions: Suggestion[] = [
  { type: "budget", id: "budget", title: "Budget", subtitle: "Under ₹20,000 per person", meta: { range: "₹8K – ₹20K" } },
  { type: "budget", id: "mid", title: "Mid-Range", subtitle: "₹20,000 – ₹80,000 per person", meta: { range: "₹20K – ₹80K" } },
  { type: "budget", id: "premium", title: "Premium", subtitle: "₹80,000 – ₹1,50,000 per person", meta: { range: "₹80K – ₹1.5L" } },
  { type: "budget", id: "luxury", title: "Luxury", subtitle: "₹1,50,000+ per person", meta: { range: "₹1.5L+" } },
]

export const conversationFlows: ConversationFlow[] = [
  {
    trigger: ["beach", "sea", "ocean", "sand", "coastal", "island"],
    response: "Great choice! 🏖️ Nothing beats a beach vacation. Here are some stunning beach packages I'd recommend:",
    suggestions: packageSuggestions.beach,
    quickReplies: [
      { label: "🌴 Domestic beaches", value: "domestic beach" },
      { label: "✈️ International beaches", value: "international beach" },
      { label: "💰 Set my budget", value: "set budget" },
    ],
  },
  {
    trigger: ["mountain", "hill", "trek", "hiking", "snow", "alps", "himalaya"],
    response: "Mountains are calling! 🏔️ Here are some breathtaking mountain getaways:",
    suggestions: packageSuggestions.mountain,
    quickReplies: [
      { label: "🇮🇳 Indian mountains", value: "indian mountains" },
      { label: "🌍 International peaks", value: "international mountains" },
      { label: "📅 Pick travel dates", value: "pick dates" },
    ],
  },
  {
    trigger: ["international", "abroad", "foreign", "overseas", "europe", "asia"],
    response: "Let's explore the world! 🌍 Here are some popular international packages:",
    suggestions: packageSuggestions.international,
    quickReplies: [
      { label: "🏖️ Beach destinations", value: "beach vacation" },
      { label: "🏔️ Mountain destinations", value: "mountain trip" },
      { label: "💰 Set my budget", value: "set budget" },
    ],
  },
  {
    trigger: ["budget", "cheap", "affordable", "low cost", "economical", "save"],
    response: "Smart traveller! 💰 Here are some amazing budget-friendly options:",
    suggestions: packageSuggestions.budget,
    quickReplies: [
      { label: "🏖️ Budget beaches", value: "budget beach" },
      { label: "🏔️ Budget mountains", value: "budget mountains" },
      { label: "📅 Pick travel dates", value: "pick dates" },
    ],
  },
  {
    trigger: ["honeymoon", "romantic", "couple", "anniversary", "love"],
    response: "How romantic! 💑 Here are some dreamy honeymoon packages:",
    suggestions: packageSuggestions.honeymoon,
    quickReplies: [
      { label: "🏖️ Beach honeymoon", value: "beach honeymoon" },
      { label: "🏔️ Mountain honeymoon", value: "mountain honeymoon" },
      { label: "💰 Set my budget", value: "set budget" },
    ],
  },
  {
    trigger: ["where", "destination", "suggest", "recommend", "location", "place"],
    response: "Here are some trending destinations that travellers love right now! 📍",
    suggestions: locationSuggestions,
    quickReplies: [
      { label: "🏖️ Beach spots", value: "beach vacation" },
      { label: "🏔️ Mountain spots", value: "mountain trip" },
      { label: "💑 Honeymoon spots", value: "honeymoon" },
    ],
  },
  {
    trigger: ["when", "date", "month", "time", "schedule", "pick dates"],
    response: "When are you planning to travel? Here are some great windows: 📅",
    suggestions: dateSuggestions,
    quickReplies: [
      { label: "🏖️ Best for beaches", value: "beach vacation" },
      { label: "🏔️ Best for mountains", value: "mountain trip" },
      { label: "💰 Set my budget", value: "set budget" },
    ],
  },
  {
    trigger: ["how much", "cost", "price", "set budget", "budget range", "spend"],
    response: "Let's find the right fit for your wallet! 💳 What's your budget range?",
    suggestions: budgetSuggestions,
    quickReplies: [
      { label: "🏖️ Show packages", value: "beach vacation" },
      { label: "📍 Show destinations", value: "suggest destination" },
    ],
  },
  {
    trigger: ["bali"],
    response: "Bali is magical! 🌺 Here's what I'd recommend for a Bali trip:",
    suggestions: packageSuggestions.beach?.filter(s => s.id === "bali"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "📍 More destinations", value: "suggest destination" },
    ],
  },
  {
    trigger: ["dubai"],
    response: "Dubai is spectacular! 🏙️ Skyscrapers, desert safaris and luxury shopping await:",
    suggestions: packageSuggestions.international?.filter(s => s.id === "dubai"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "📍 More destinations", value: "suggest destination" },
    ],
  },
  {
    trigger: ["paris"],
    response: "Ah, Paris! 🗼 The city of love. Here's a perfect package:",
    suggestions: packageSuggestions.international?.filter(s => s.id === "paris"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "💑 More honeymoon options", value: "honeymoon" },
    ],
  },
  {
    trigger: ["ladakh", "leh"],
    response: "Ladakh — the land of high passes! 🏔️ An adventure of a lifetime:",
    suggestions: packageSuggestions.mountain?.filter(s => s.id === "ladakh"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "🏔️ More mountain trips", value: "mountain trip" },
    ],
  },
  {
    trigger: ["goa"],
    response: "Goa vibes! 🎉 Sun, sand and good times:",
    suggestions: packageSuggestions.budget?.filter(s => s.id === "goa"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "🏖️ More beach trips", value: "beach vacation" },
    ],
  },
  {
    trigger: ["kerala", "backwater"],
    response: "Kerala — God's own country! 🌿 Backwaters, houseboats and serenity:",
    suggestions: packageSuggestions.honeymoon?.filter(s => s.id === "kerala"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💑 More honeymoon options", value: "honeymoon" },
    ],
  },
  {
    trigger: ["thailand", "bangkok", "pattaya"],
    response: "Thailand is a blast! 🇹🇭 Street food, beaches and nightlife:",
    suggestions: packageSuggestions.international?.filter(s => s.id === "thailand"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "✈️ More international", value: "international trip" },
    ],
  },
  {
    trigger: ["swiss", "switzerland"],
    response: "Switzerland is a dream! 🇨🇭 Snow-capped Alps and scenic trains:",
    suggestions: packageSuggestions.mountain?.filter(s => s.id === "swiss"),
    quickReplies: [
      { label: "📅 Pick dates", value: "pick dates" },
      { label: "💰 Set budget", value: "set budget" },
      { label: "🏔️ More mountain trips", value: "mountain trip" },
    ],
  },
  {
    trigger: ["hello", "hi", "hey", "start", "help"],
    response: "Hey! 👋 I'm here to help you plan your dream trip. What kind of vacation are you looking for?",
    quickReplies: [
      { label: "🏖️ Beach", value: "beach vacation" },
      { label: "🏔️ Mountain", value: "mountain trip" },
      { label: "🌍 International", value: "international trip" },
      { label: "💰 Budget", value: "budget trip" },
      { label: "💑 Honeymoon", value: "honeymoon" },
      { label: "📍 Suggest places", value: "suggest destination" },
    ],
  },
  {
    trigger: ["thank", "thanks", "bye", "goodbye"],
    response: "You're welcome! 🙌 Happy travels! Feel free to come back anytime you need help planning. ✈️",
    quickReplies: [
      { label: "🔄 Start over", value: "hello" },
    ],
  },
]

export const fallbackResponse: Pick<ConversationFlow, "response" | "quickReplies"> = {
  response: "Hmm, I'm not sure about that one 🤔 But I can help you with destinations, packages, dates or budgets! What would you like to explore?",
  quickReplies: [
    { label: "📍 Destinations", value: "suggest destination" },
    { label: "🏖️ Beach trips", value: "beach vacation" },
    { label: "🏔️ Mountain trips", value: "mountain trip" },
    { label: "💰 Budget options", value: "budget trip" },
    { label: "📅 Travel dates", value: "pick dates" },
  ],
}

export function findResponse(input: string) {
  const lower = input.toLowerCase()
  for (const flow of conversationFlows) {
    if (flow.trigger.some(t => lower.includes(t))) {
      return flow
    }
  }
  return null
}
