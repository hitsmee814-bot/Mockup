export interface Tour {
  id: number;
  title: string;
  description: string; // HTML string
  duration_days: number;
  duration_nights: number;
  start_date: string;
  end_date: string;
  origin_city: string;
  destination: string;
  base_price: number;
  currency: string;
  max_guests: number;
  status: string;
  is_active: boolean;
  published_at: string | null;
  avg_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface Availability {
  id: number;
  tour_id: number;
  start_date: string;
  end_date: string;
  total_slots: number;
  available_slots: number;
  price: number;
  status: string;
}

export interface TourImage {
  id: number;
  tour_id: number;
  image_url: string;
  caption: string;
  is_cover: boolean;
  document_type: string | null;
}

export interface CancellationPolicy {
  id: number;
  tour_id: number;
  days_before: number;
  refund_percentage: number;
}

export interface Accommodation {
  id: number;
  tour_id: number;
  location: string;
  hotel_name: string;
  nights: number;
  meal_plan: string;
}

export interface Activity {
  id: number;
  itinerary_day_id: number;
  name: string;
  type: "included" | "optional";
  description: string;
  latitude: number;
  longitude: number;
}

export interface ItineraryDayImage {
  id: number;
  itinerary_day_id: number;
  image_url: string;
  caption: string;
  document_type: string | null;
}

export interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
  activities: Activity[];
  images: ItineraryDayImage[];
}

export interface TourPackage {
  tour: Tour;
  availability: Availability[];
  images: TourImage[];
  cancellation_policy: CancellationPolicy[];
  accommodations: Accommodation[];
  itinerary_days: ItineraryDay[];
}
