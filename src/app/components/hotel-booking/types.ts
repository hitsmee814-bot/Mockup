export interface Hotel {
  id: string
  name: string
  location: string
  city: string
  image: string
  gallery: string[]
  rating: number
  reviews: number
  stars: number
  pricePerNight: number
  originalPrice: number
  description: string
  amenities: string[]
  roomTypes: RoomType[]
  checkIn: string
  checkOut: string
  policies: string[]
  highlights: string[]
  coordinates: { lat: number; lng: number }
  freeCancellation: boolean
  breakfastIncluded: boolean
  provider: string
  badge?: string
}

export interface RoomType {
  id: string
  name: string
  price: number
  originalPrice: number
  capacity: number
  bedType: string
  size: string
  amenities: string[]
  image: string
  available: number
  description: string
}

export interface HotelFilterState {
  priceRange: number[]
  starRating: string[]
  guestRating: string[]
  amenities: string[]
  propertyType: string[]
  freeCancellation: boolean
  breakfastIncluded: boolean
  neighborhoods: string[]
  sortBy: string
}

export const defaultHotelFilters: HotelFilterState = {
  priceRange: [0, 1000],
  starRating: [],
  guestRating: [],
  amenities: [],
  propertyType: [],
  freeCancellation: false,
  breakfastIncluded: false,
  neighborhoods: [],
  sortBy: "recommended",
}
