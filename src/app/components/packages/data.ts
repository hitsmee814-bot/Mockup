import { TravelPackage } from "./types";

export const travelPackages: TravelPackage[] = [
  {
    id: "1",
    name: "Romantic Bali Escape",
    destination: "Bali",
    country: "Indonesia",
    image: "/images/bali.jpg",
    images: [
      "/images/bali.jpg",
      "/images/ubud.jpg",
      "/images/bali-beach.jpg",
      "/images/bali-temple.jpg",
    ],
    price: 65000,
    originalPrice: 80000,
    duration: "5 Days / 4 Nights",
    days: 5,
    nights: 4,
    rating: 4.7,
    reviews: 420,
    categories: ["International", "Honeymoon", "Luxury"],
    tags: ["Beach", "Culture", "Romantic", "Spa", "Temples", "Water Sports"],
    shortDescription:
      "Experience the beauty of Bali with beaches, temples and romantic dinners.",
    overview:
      "Immerse yourself in the enchanting island of Bali on this 5-day romantic escape. From the lush rice terraces of Ubud to the golden sands of Seminyak, this curated itinerary blends culture, adventure and relaxation. Enjoy private sunset dinners, couples spa treatments, ancient temple visits and thrilling water sports — all wrapped in luxury accommodation and seamless transfers.",
    inclusions: [
      "4-star beachfront resort (4 nights)",
      "Daily breakfast & 2 romantic dinners",
      "Airport pickup & drop-off",
      "Private car with driver for all transfers",
      "Ubud cultural tour with English-speaking guide",
      "Tegallalang Rice Terrace entry",
      "Tirta Empul Temple entry",
      "1 couples spa session (60 min)",
      "Water sports package (Jet Ski + Parasailing)",
      "Complimentary travel insurance",
    ],
    exclusions: [
      "International airfare",
      "Visa on arrival fee (~$35 USD)",
      "Lunches & dinners not mentioned",
      "Personal expenses & shopping",
      "Optional activities not in itinerary",
      "Travel insurance upgrade",
      "Tips & gratuities",
    ],
    locations: [
      { name: "Ngurah Rai Airport", lat: -8.7467, lng: 115.1668, description: "Arrival point" },
      { name: "Seminyak Beach", lat: -8.6913, lng: 115.1568, description: "Resort area & beach sunset" },
      { name: "Tegallalang Rice Terraces", lat: -8.4312, lng: 115.2792, description: "Iconic terraced rice paddies" },
      { name: "Ubud Monkey Forest", lat: -8.5185, lng: 115.2588, description: "Sacred monkey sanctuary" },
      { name: "Tirta Empul Temple", lat: -8.4153, lng: 115.3155, description: "Holy water temple" },
      { name: "Tanah Lot Temple", lat: -8.6213, lng: 115.0868, description: "Iconic sea temple" },
      { name: "Nusa Dua Beach", lat: -8.8005, lng: 115.2317, description: "Water sports hub" },
    ],
    userReviews: [
      {
        name: "Priya M.",
        rating: 5,
        date: "2024-11-15",
        comment:
          "Absolutely magical! The sunset dinner on the beach was the highlight of our honeymoon. The guide was knowledgeable and the hotel was stunning.",
      },
      {
        name: "Rahul S.",
        rating: 4,
        date: "2024-10-02",
        comment:
          "Great itinerary and well-organized. Ubud tour was fantastic. Only wish we had one more day to explore Nusa Penida.",
      },
      {
        name: "Ananya K.",
        rating: 5,
        date: "2024-09-18",
        comment:
          "The spa session and water sports were incredible. Loved every moment. Highly recommend for couples!",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Seminyak Sunset",
        time: "Morning – Evening",
        icon: "plane",
        image: "/images/bali-arrival.jpg",
        description:
          "Arrive at Ngurah Rai International Airport where your private driver greets you. Transfer to your beachfront resort in Seminyak. Spend the afternoon settling in, then head to the beach for a breathtaking Bali sunset followed by a welcome dinner at the resort.",
        highlights: [
          "Private airport pickup",
          "Beachfront resort check-in",
          "Seminyak sunset on the beach",
          "Welcome dinner",
        ],
        tips: [
          "Exchange currency at the airport for best rates",
          "Carry sunscreen — the tropical sun is strong",
        ],
      },
      {
        day: 2,
        title: "Ubud Cultural Immersion",
        time: "Full Day",
        icon: "temple",
        image: "/images/ubud.jpg",
        description:
          "After breakfast, drive to the cultural heart of Bali. Walk through the stunning Tegallalang Rice Terraces, explore the Sacred Monkey Forest, and visit the ancient Tirta Empul Temple for a traditional purification ritual. Enjoy lunch at a cliffside restaurant overlooking the Ayung River valley.",
        highlights: [
          "Tegallalang Rice Terraces",
          "Sacred Monkey Forest Sanctuary",
          "Tirta Empul Temple purification",
          "Cliffside lunch with valley views",
        ],
        tips: [
          "Dress modestly for temple visits (sarong provided)",
          "Keep belongings secure around the monkeys",
        ],
      },
      {
        day: 3,
        title: "Beach & Water Sports Adventure",
        time: "Morning – Afternoon",
        icon: "umbrella-beach",
        image: "/images/bali-beach.jpg",
        description:
          "Head to Nusa Dua for an action-packed morning of water sports — Jet Ski across turquoise waters and soar above the coastline on a parasailing ride. After lunch, unwind at the resort pool or take a leisurely beach walk. Evening features a romantic candlelit dinner on the sand.",
        highlights: [
          "Jet Ski ride",
          "Parasailing over the coast",
          "Free time at resort pool",
          "Romantic beachside candlelit dinner",
        ],
        tips: [
          "Book water sports early in the morning for calmer seas",
          "Waterproof phone pouch recommended",
        ],
      },
      {
        day: 4,
        title: "Tanah Lot & Couples Spa",
        time: "Morning – Evening",
        icon: "heart",
        image: "/images/bali-temple.jpg",
        description:
          "Visit the iconic Tanah Lot Temple perched on a rock formation in the sea. Explore the surrounding gardens and local art market. Return to the resort for a 60-minute couples spa treatment featuring traditional Balinese massage. Spend the evening at leisure — your last night in paradise.",
        highlights: [
          "Tanah Lot sea temple visit",
          "Local art market browsing",
          "60-min couples Balinese spa",
          "Farewell leisure evening",
        ],
        tips: [
          "Visit Tanah Lot at low tide to walk to the temple base",
          "The spa is best enjoyed in the late afternoon",
        ],
      },
      {
        day: 5,
        title: "Departure",
        time: "Morning",
        icon: "plane",
        image: "/images/bali.jpg",
        description:
          "Enjoy a final breakfast at the resort with ocean views. Check out at leisure and your private driver transfers you to Ngurah Rai Airport for your departure flight. Take home unforgettable memories of Bali!",
        highlights: [
          "Leisurely breakfast with ocean view",
          "Private airport transfer",
        ],
        tips: [
          "Pack souvenirs in checked luggage — customs can be strict on wood carvings",
        ],
      },
    ],
  },
];
