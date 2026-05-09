import { TourPackage } from "./types";

// Mock data matching BE response format for development
export const mockTours: TourPackage[] = [
  {
    tour: {
      id: 1,
      title: "8N/9D Western Arunachal with Assam",
      description: "Premium curated Arunachal itinerary",
      duration_days: 9,
      duration_nights: 8,
      start_date: "2026-05-02",
      end_date: "2026-05-10",
      origin_city: "Guwahati",
      destination: "Arunachal Pradesh",
      base_price: 95000,
      currency: "INR",
      max_guests: 6,
      status: "active",
      is_active: true,
      published_at: "2026-04-06T19:10:34.054361",
      avg_rating: 4.7,
      total_reviews: 25,
      created_at: "2026-04-06T19:10:34.054361",
    },
    availability: [
      { id: 1, tour_id: 1, start_date: "2026-05-02", end_date: "2026-05-10", total_slots: 6, available_slots: 6, price: 95000, status: "available" },
      { id: 2, tour_id: 1, start_date: "2026-05-16", end_date: "2026-05-24", total_slots: 6, available_slots: 4, price: 89000, status: "available" },
      { id: 3, tour_id: 1, start_date: "2026-06-01", end_date: "2026-06-09", total_slots: 6, available_slots: 2, price: 79000, status: "available" },
      { id: 4, tour_id: 1, start_date: "2026-06-15", end_date: "2026-06-23", total_slots: 6, available_slots: 5, price: 99000, status: "available" },
    ],
    images: [
      { id: 1, tour_id: 1, image_url: "https://cdn.travel.com/arunachal-cover.jpg", caption: "Cover", is_cover: true, document_type: null },
    ],
    cancellation_policy: [
      { id: 1, tour_id: 1, days_before: 30, refund_percentage: 90 },
      { id: 2, tour_id: 1, days_before: 15, refund_percentage: 50 },
      { id: 3, tour_id: 1, days_before: 7, refund_percentage: 25 },
      { id: 4, tour_id: 1, days_before: 0, refund_percentage: 0 },
    ],
    accommodations: [
      { id: 1, tour_id: 1, location: "Tezpur", hotel_name: "Greenwood Resort", nights: 1, meal_plan: "MAP" },
      { id: 2, tour_id: 1, location: "Dirang", hotel_name: "Hotel Rigsel", nights: 2, meal_plan: "MAP" },
      { id: 3, tour_id: 1, location: "Tawang", hotel_name: "Timilo Boutique", nights: 3, meal_plan: "MAP" },
      { id: 4, tour_id: 1, location: "Shergaon", hotel_name: "Willow Resort", nights: 2, meal_plan: "MAP" },
    ],
    itinerary_days: [
      { day_number: 1, title: "Guwahati → Tezpur", description: "Arrival & transfer", activities: [{ id: 1, itinerary_day_id: 1, name: "Nameri National Park", type: "included", description: "Forest walk", latitude: 26.9, longitude: 92.9 }, { id: 2, itinerary_day_id: 1, name: "Jia Bharali River Boating", type: "optional", description: "River boating", latitude: 26.8, longitude: 92.8 }], images: [{ id: 1, itinerary_day_id: 1, image_url: "https://cdn.travel.com/day1.jpg", caption: "Day 1 highlight", document_type: null }] },
      { day_number: 2, title: "Tezpur → Dirang", description: "Via Sela Pass", activities: [{ id: 3, itinerary_day_id: 2, name: "Sangti Valley", type: "included", description: "Valley", latitude: 27.3, longitude: 92.2 }, { id: 4, itinerary_day_id: 2, name: "Sela Pass", type: "included", description: "High altitude pass", latitude: 27.5, longitude: 92.1 }], images: [{ id: 2, itinerary_day_id: 2, image_url: "https://cdn.travel.com/day2.jpg", caption: "Day 2 highlight", document_type: null }] },
      { day_number: 3, title: "Dirang Excursion", description: "Mandala Top", activities: [{ id: 5, itinerary_day_id: 3, name: "Thembang Village", type: "included", description: "UNESCO site", latitude: 27.48, longitude: 92.12 }, { id: 6, itinerary_day_id: 3, name: "Mandala Top", type: "included", description: "108 stupas", latitude: 27.45, longitude: 92.15 }], images: [{ id: 3, itinerary_day_id: 3, image_url: "https://cdn.travel.com/day3.jpg", caption: "Day 3 highlight", document_type: null }] },
      { day_number: 4, title: "Dirang → Tawang", description: "Mountain drive", activities: [{ id: 7, itinerary_day_id: 4, name: "Nuranang Falls", type: "included", description: "Waterfall", latitude: 27.5, longitude: 92.1 }, { id: 8, itinerary_day_id: 4, name: "Paradise Lake", type: "included", description: "Lake", latitude: 27.6, longitude: 92.0 }], images: [{ id: 4, itinerary_day_id: 4, image_url: "https://cdn.travel.com/day4.jpg", caption: "Day 4 highlight", document_type: null }] },
      { day_number: 5, title: "Tawang Excursion", description: "Bumla Pass", activities: [{ id: 9, itinerary_day_id: 5, name: "Sangetsar Lake", type: "included", description: "Madhuri Lake", latitude: 27.65, longitude: 91.95 }, { id: 10, itinerary_day_id: 5, name: "Bumla Pass", type: "included", description: "Border visit", latitude: 27.7, longitude: 91.9 }], images: [{ id: 5, itinerary_day_id: 5, image_url: "https://cdn.travel.com/day5.jpg", caption: "Day 5 highlight", document_type: null }] },
      { day_number: 6, title: "Tawang Local", description: "Monastery visit", activities: [{ id: 11, itinerary_day_id: 6, name: "Tawang Monastery", type: "included", description: "Monastery", latitude: 27.58, longitude: 91.86 }], images: [{ id: 6, itinerary_day_id: 6, image_url: "https://cdn.travel.com/day6.jpg", caption: "Day 6 highlight", document_type: null }] },
      { day_number: 7, title: "Tawang → Shergaon", description: "Via Bomdila", activities: [], images: [{ id: 7, itinerary_day_id: 7, image_url: "https://cdn.travel.com/day7.jpg", caption: "Day 7 highlight", document_type: null }] },
      { day_number: 8, title: "Shergaon Leisure", description: "Relax", activities: [], images: [{ id: 8, itinerary_day_id: 8, image_url: "https://cdn.travel.com/day8.jpg", caption: "Day 8 highlight", document_type: null }] },
      { day_number: 9, title: "Return", description: "Departure", activities: [], images: [{ id: 9, itinerary_day_id: 9, image_url: "https://cdn.travel.com/day9.jpg", caption: "Day 9 highlight", document_type: null }] },
    ],
  },
  {
    tour: {
      id: 28,
      title: "Sikkim",
      description: "<p><strong>Sikkim Tour</strong></p><ul><li><p>Package 1</p></li><li><p>Package 2</p></li></ul><p></p>",
      duration_days: 1,
      duration_nights: 0,
      start_date: "2026-05-12",
      end_date: "2026-05-30",
      origin_city: "Kolkata",
      destination: "Sikkim",
      base_price: 20000,
      currency: "INR",
      max_guests: 10,
      status: "active",
      is_active: true,
      published_at: null,
      avg_rating: 0,
      total_reviews: 0,
      created_at: "2026-05-01T05:58:06.244433",
    },
    availability: [
      { id: 52, tour_id: 28, start_date: "2026-05-16", end_date: "2026-05-17", total_slots: 10, available_slots: 10, price: 20000, status: "available" },
      { id: 53, tour_id: 28, start_date: "2026-05-23", end_date: "2026-05-24", total_slots: 10, available_slots: 7, price: 22000, status: "available" },
      { id: 54, tour_id: 28, start_date: "2026-06-06", end_date: "2026-06-07", total_slots: 10, available_slots: 3, price: 18000, status: "available" },
    ],
    images: [
      { id: 46, tour_id: 28, image_url: "CTA_BANNER/SIKKIM.JPG/30532062-2859-4fb6-abd4-5430e89a112a_28", caption: "Banner", is_cover: true, document_type: "CTA_BANNER" },
      { id: 47, tour_id: 28, image_url: "MAP_ROUTE/SIKKIM TOUR.JPG/7fcebc8f-69e3-48a0-b03f-6773b6fb1414_28", caption: "roadmap", is_cover: false, document_type: "MAP_ROUTE" },
    ],
    cancellation_policy: [
      { id: 82, tour_id: 28, days_before: 1, refund_percentage: 0 },
    ],
    accommodations: [
      { id: 79, tour_id: 28, location: "Sikkim", hotel_name: "hotelSikkim", nights: 2, meal_plan: "CP" },
    ],
    itinerary_days: [
      { day_number: 1, title: "Day1", description: "Day1", activities: [], images: [] },
    ],
  },
];
