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

export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  image: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  reviews: number;
  categories: Category[];
  shortDescription: string;
  inclusions: string[];
  itinerary: ItineraryDay[];
}
