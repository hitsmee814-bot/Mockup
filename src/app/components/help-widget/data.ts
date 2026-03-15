import {
  Plane,
  Hotel,
  Package,
  Car,
  BookOpen,
  Handshake,
  Key,
  Sparkles,
} from "lucide-react"

export const faqs = [
  {
    category: "Flights",
    items: [
      {
        q: "How do I book a flight?",
        a: "Go to the Flights page, enter departure & destination cities, pick your dates, and choose from available options. Filter by price, duration, or airline.",
      },
      {
        q: "Can I cancel or modify my flight?",
        a: "Yes — head to My Bookings, select the flight, and tap Modify or Cancel. Free cancellation is available up to 24 hrs before departure on most bookings.",
      },
    ],
  },
  {
    category: "Hotels",
    items: [
      {
        q: "How do I find and book a hotel?",
        a: "Visit the Hotels page, search by city or landmark, pick check-in/out dates, and browse results. Use filters for star rating, amenities, and price range.",
      },
      {
        q: "What is the cancellation policy for hotels?",
        a: "Most hotels offer free cancellation up to 48 hours before check-in. Non-refundable rates are clearly marked at booking time.",
      },
    ],
  },
  {
    category: "Packages",
    items: [
      {
        q: "What's included in a travel package?",
        a: "Packages typically bundle flights, hotels, transfers, and curated activities. Each package page lists exactly what's included.",
      },
      {
        q: "Can I customize a package?",
        a: "Absolutely — use the Itinerary Builder to mix and match destinations, stays, and activities to create your perfect trip.",
      },
    ],
  },
  {
    category: "Cabs & Rentals",
    items: [
      {
        q: "How do I book a cab or rental?",
        a: "Navigate to Cabs or Rentals, enter your pickup location, dates, and preferences. Confirm your booking in just a few taps.",
      },
      {
        q: "What if my cab doesn't show up?",
        a: "Contact support immediately via the Contact Us option. We'll arrange an alternative ride and issue a full refund for the missed pickup.",
      },
    ],
  },
  {
    category: "Payments & Account",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, net banking, and popular wallets. EMI options available on orders above ₹5,000.",
      },
      {
        q: "How do I apply a promo code?",
        a: "On checkout, enter your code in the 'Apply Coupon' field and tap Apply. The discount reflects instantly in your total.",
      },
      {
        q: "Is my personal data secure?",
        a: "Yes — we use AES-256 encryption, are PCI-DSS compliant, and never share data with third parties. See our Privacy page for details.",
      },
    ],
  },
]

export const quickLinks = [
  { icon: Package, label: "Packages", href: "/packages" },
  { icon: Plane, label: "Flights", href: "/flight" },
  { icon: Hotel, label: "Hotels", href: "/hotel" },
  { icon: Car, label: "Cabs", href: "/cab" },
  { icon: Key, label: "Rentals", href: "/rentals" },
  { icon: Sparkles, label: "Smart AI", href: "/smartai" },
  { icon: BookOpen, label: "Blogs", href: "#" },
  { icon: Handshake, label: "Partner", href: "#" },
]

export const requestTopics = [
  "Flight Booking",
  "Hotel Booking",
  "Travel Package",
  "Cab / Rental",
  "Payment / Refund",
  "Account Issue",
  "Technical Problem",
  "Other",
]
