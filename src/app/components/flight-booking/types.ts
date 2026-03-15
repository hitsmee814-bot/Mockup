export interface Flight {
  id: number
  airline: string
  logo: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  price: number
  stops: number
  stopCities: string[]
  aircraft: string
  amenities: string[]
  rating: number
  baggage: string
  refundable: boolean
}

export interface FilterState {
  priceRange: number[]
  durationRange: number[]
  stops: string[]
  departureTimes: string[]
  arrivalTimes: string[]
  airlines: string[]
  alliances: string[]
  amenities: string[]
  aircraft: string[]
  cabinClass: string[]
  baggage: string[]
  booking: string[]
  layoverDuration: number[]
  airports: string[]
  fareType: string[]
  emissions: string[]
}

export const defaultFilters: FilterState = {
  priceRange: [0, 2000],
  durationRange: [0, 24],
  stops: [],
  departureTimes: [],
  arrivalTimes: [],
  airlines: [],
  alliances: [],
  amenities: [],
  aircraft: [],
  cabinClass: [],
  baggage: [],
  booking: [],
  layoverDuration: [0, 12],
  airports: [],
  fareType: [],
  emissions: [],
}
