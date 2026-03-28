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
  inclusions: string[];
  exclusions: string[];
  locations: Location[];
  userReviews: Review[];
  itinerary: ItineraryDay[];
}
