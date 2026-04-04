export type Category =
  | "International"
  | "Domestic"
  | "Bachelors"
  | "Family"
  | "Honeymoon"
  | "Womens Only"
  | "Adventure"
  | "Luxury"
  | "Budget"
  | "Solo"
  | "Weekend"
  | "Pilgrimage";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  time?: string;
  icon?: string;
  image?: string;
  tips?: string[];
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface Review {
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
}

export interface Accommodation {
  destination: string;
  hotelName: string;
  nights: number;
  mealPlan: string;
}

export interface PriceBreakdown {
  label: string;
  amount: number;
}

export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  image: string;
  images: string[];
  price: number;
  originalPrice: number;
  duration: string;
  days: number;
  nights: number;
  rating: number;
  reviews: number;
  categories: Category[];
  tags: string[];
  shortDescription: string;
  overview: string;
  route?: string;
  ageGroup?: string;
  packageType?: string;
  inclusions: string[];
  exclusions: string[];
  locations: Location[];
  userReviews: Review[];
  itinerary: ItineraryDay[];
  accommodations?: Accommodation[];
  priceBreakdown?: PriceBreakdown[];
  importantNotes?: string[];
  travelAdvisory?: string[];
}
