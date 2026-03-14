import { TravelPackage } from "./types";

export const travelPackages: TravelPackage[] = [

  {
    id: "1",
    name: "Romantic Bali Escape",
    destination: "Bali",
    country: "Indonesia",
    image: "/images/bali.jpg",
    price: 65000,
    originalPrice: 80000,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 420,
    categories: ["International", "Honeymoon", "Luxury"],
    shortDescription: "Experience the beauty of Bali with beaches, temples and romantic dinners.",
    inclusions: ["Hotel", "Airport Transfer", "Breakfast", "Sightseeing"],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        time: "Morning",
        icon: "plane",
        image: "/images/bali-arrival.jpg",
        description: "Arrival at Ngurah Rai Airport and transfer to hotel.",
        highlights: ["Airport pickup", "Hotel check-in", "Beach sunset"],
        tips: ["Exchange currency at airport", "Carry sunscreen"]
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        time: "Full Day",
        icon: "temple",
        image: "/images/ubud.jpg",
        description: "Explore the cultural heart of Bali.",
        highlights: ["Tegallalang Rice Terraces", "Monkey Forest", "Tirta Empul Temple"],
        tips: ["Dress modestly in temples"]
      },
      {
        day: 3,
        title: "Beach & Water Sports",
        time: "Afternoon",
        icon: "umbrella-beach",
        image: "/images/bali-beach.jpg",
        description: "Relax at Bali beaches and enjoy water sports.",
        highlights: ["Jet Ski", "Parasailing", "Romantic dinner"],
        tips: ["Book activities early"]
      }
    ]
  },

  {
    id: "2",
    name: "Swiss Alps Adventure",
    destination: "Interlaken",
    country: "Switzerland",
    image: "/images/switzerland.jpg",
    price: 180000,
    originalPrice: 210000,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 260,
    categories: ["International", "Adventure", "Luxury"],
    shortDescription: "Snowy Alps, scenic trains and thrilling adventure sports.",
    inclusions: ["Hotel", "Breakfast", "Train Pass", "Guided Tours"],

    itinerary: [
      {
        day: 1,
        title: "Arrival Zurich",
        time: "Morning",
        icon: "train",
        image: "/images/zurich.jpg",
        description: "Arrival and train to Interlaken.",
        highlights: ["Swiss trains", "Lake views"],
        tips: ["Keep camera ready during train ride"]
      },
      {
        day: 2,
        title: "Jungfraujoch Excursion",
        time: "Full Day",
        icon: "mountain",
        image: "/images/jungfraujoch.jpg",
        description: "Visit the Top of Europe.",
        highlights: ["Ice Palace", "Snow activities"],
        tips: ["Wear warm clothes"]
      }
    ]
  },

  {
    id: "3",
    name: "Golden Triangle Tour",
    destination: "Delhi - Agra - Jaipur",
    country: "India",
    image: "/images/golden-triangle.jpg",
    price: 25000,
    originalPrice: 32000,
    duration: "4 Days / 3 Nights",
    rating: 4.6,
    reviews: 580,
    categories: ["Domestic", "Family", "Luxury"],
    shortDescription: "Visit India's famous historical cities.",
    inclusions: ["Hotel", "Breakfast", "Guide", "Transport"],

    itinerary: [
      {
        day: 1,
        title: "Delhi Tour",
        time: "Morning",
        icon: "landmark",
        image: "/images/delhi.jpg",
        description: "Explore historical Delhi monuments.",
        highlights: ["India Gate", "Red Fort"],
        tips: ["Carry water bottle"]
      },
      {
        day: 2,
        title: "Agra Visit",
        time: "Morning",
        icon: "landmark",
        image: "/images/taj-mahal.jpg",
        description: "Visit Taj Mahal and Agra Fort.",
        highlights: ["Taj Mahal", "Agra Fort"],
        tips: ["Best photos at sunrise"]
      }
    ]
  },

  {
    id: "4",
    name: "Goa Beach Weekend",
    destination: "Goa",
    country: "India",
    image: "/images/goa.jpg",
    price: 12000,
    originalPrice: 16000,
    duration: "3 Days / 2 Nights",
    rating: 4.4,
    reviews: 760,
    categories: ["Domestic", "Weekend", "Budget", "Bachelors"],
    shortDescription: "Sun, sand and nightlife in Goa.",
    inclusions: ["Hotel", "Breakfast", "Beach Party"],

    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Visit",
        time: "Afternoon",
        icon: "beach",
        image: "/images/goa-beach.jpg",
        description: "Check in and explore beach.",
        highlights: ["Calangute Beach"],
        tips: ["Try local seafood"]
      },
      {
        day: 2,
        title: "North Goa Tour",
        time: "Full Day",
        icon: "map",
        image: "/images/north-goa.jpg",
        description: "Visit famous Goa beaches.",
        highlights: ["Baga", "Anjuna"],
        tips: ["Rent scooter for easy travel"]
      }
    ]
  },

  {
    id: "5",
    name: "Kerala Backwaters",
    destination: "Alleppey",
    country: "India",
    image: "/images/kerala.jpg",
    price: 30000,
    originalPrice: 38000,
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    reviews: 390,
    categories: ["Domestic", "Honeymoon", "Luxury"],
    shortDescription: "Romantic houseboat cruise in Kerala backwaters.",
    inclusions: ["Houseboat Stay", "Meals", "Transfers"],

    itinerary: [
      {
        day: 1,
        title: "Arrival Kochi",
        time: "Morning",
        icon: "car",
        image: "/images/kochi.jpg",
        description: "Transfer to Alleppey.",
        highlights: ["Backwater views"],
        tips: ["Carry light clothes"]
      },
      {
        day: 2,
        title: "Houseboat Cruise",
        time: "Full Day",
        icon: "ship",
        image: "/images/houseboat.jpg",
        description: "Cruise through backwaters.",
        highlights: ["Village life", "Sunset"],
        tips: ["Enjoy Kerala cuisine onboard"]
      }
    ]
  },

  {
    id: "6",
    name: "Dubai Luxury Holiday",
    destination: "Dubai",
    country: "UAE",
    image: "/images/dubai.jpg",
    price: 90000,
    originalPrice: 110000,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 310,
    categories: ["International", "Luxury", "Family"],
    shortDescription: "Skyscrapers, desert safari and luxury shopping.",
    inclusions: ["Hotel", "Desert Safari", "Burj Khalifa Ticket"],

    itinerary: [
      {
        day: 1,
        title: "Arrival Dubai",
        time: "Afternoon",
        icon: "city",
        image: "/images/dubai-marina.jpg",
        description: "Check-in and Marina walk.",
        highlights: ["Dubai Marina"],
        tips: ["Visit Marina at night"]
      },
      {
        day: 2,
        title: "City Tour",
        time: "Full Day",
        icon: "building",
        image: "/images/burj-khalifa.jpg",
        description: "Explore major attractions.",
        highlights: ["Burj Khalifa", "Dubai Mall"],
        tips: ["Book Burj tickets early"]
      }
    ]
  },

  {
    id: "7",
    name: "Varanasi Spiritual Journey",
    destination: "Varanasi",
    country: "India",
    image: "/images/varanasi.jpg",
    price: 15000,
    originalPrice: 19000,
    duration: "3 Days / 2 Nights",
    rating: 4.5,
    reviews: 290,
    categories: ["Domestic", "Pilgrimage"],
    shortDescription: "Experience the spiritual energy of Varanasi.",
    inclusions: ["Hotel", "Ganga Aarti Tour"],

    itinerary: [
      {
        day: 1,
        title: "Temple Visit",
        time: "Morning",
        icon: "temple",
        image: "/images/kashi.jpg",
        description: "Visit Kashi Vishwanath temple.",
        highlights: ["Temple darshan"],
        tips: ["Expect long queues"]
      },
      {
        day: 2,
        title: "Ganga Aarti",
        time: "Evening",
        icon: "water",
        image: "/images/ganga-aarti.jpg",
        description: "Boat ride and evening aarti.",
        highlights: ["Sunrise boat ride"],
        tips: ["Reach ghats early"]
      }
    ]
  },

  {
    id: "8",
    name: "Thailand Budget Trip",
    destination: "Bangkok - Pattaya",
    country: "Thailand",
    image: "/images/thailand.jpg",
    price: 45000,
    originalPrice: 60000,
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    reviews: 520,
    categories: ["International", "Budget", "Bachelors"],
    shortDescription: "Affordable Thailand beaches and nightlife.",
    inclusions: ["Hotel", "Breakfast", "City Tour"],

    itinerary: [
      {
        day: 1,
        title: "Bangkok Arrival",
        time: "Morning",
        icon: "city",
        image: "/images/bangkok.jpg",
        description: "Arrival and street food tour.",
        highlights: ["Street food"],
        tips: ["Try Pad Thai"]
      },
      {
        day: 2,
        title: "Pattaya Coral Island",
        time: "Full Day",
        icon: "island",
        image: "/images/coral-island.jpg",
        description: "Beach day and water sports.",
        highlights: ["Water sports"],
        tips: ["Carry beachwear"]
      }
    ]
  },

  {
    id: "9",
    name: "Ladakh Adventure",
    destination: "Leh - Nubra",
    country: "India",
    image: "/images/ladakh.jpg",
    price: 42000,
    originalPrice: 50000,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 610,
    categories: ["Domestic", "Adventure", "Solo"],
    shortDescription: "High altitude lakes, passes and monasteries.",
    inclusions: ["Hotel", "Bike Rental", "Meals"],

    itinerary: [
      {
        day: 1,
        title: "Leh Arrival",
        time: "Morning",
        icon: "mountain",
        image: "/images/leh.jpg",
        description: "Acclimatization day.",
        highlights: ["Local market"],
        tips: ["Rest to adjust altitude"]
      },
      {
        day: 2,
        title: "Pangong Lake",
        time: "Full Day",
        icon: "lake",
        image: "/images/pangong.jpg",
        description: "Scenic lake visit.",
        highlights: ["Photography"],
        tips: ["Carry warm clothes"]
      }
    ]
  },

  {
    id: "10",
    name: "Paris Romantic Getaway",
    destination: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    price: 200000,
    originalPrice: 230000,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 340,
    categories: ["International", "Honeymoon", "Luxury"],
    shortDescription: "The city of love with Eiffel Tower views.",
    inclusions: ["Hotel", "Breakfast", "Seine Cruise"],

    itinerary: [
      {
        day: 1,
        title: "Arrival Paris",
        time: "Morning",
        icon: "plane",
        image: "/images/paris-arrival.jpg",
        description: "City walk and café visit.",
        highlights: ["Eiffel Tower"],
        tips: ["Visit tower at sunset"]
      },
      {
        day: 2,
        title: "Museum Day",
        time: "Full Day",
        icon: "museum",
        image: "/images/louvre.jpg",
        description: "Visit Louvre museum.",
        highlights: ["Mona Lisa"],
        tips: ["Book tickets online"]
      }
    ]
  }

];