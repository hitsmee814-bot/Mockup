import { Flight } from "./types"

export const dummyFlights: Flight[] = [
  { id: 1, airline: "Emirates", logo: "🇦🇪", from: "JFK", to: "DXB", departure: "08:00", arrival: "18:30", duration: "10h 30m", price: 850, stops: 0, stopCities: [], aircraft: "Boeing 777", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.8, baggage: "2 x 23kg", refundable: true },
  { id: 2, airline: "British Airways", logo: "🇬🇧", from: "JFK", to: "DXB", departure: "10:30", arrival: "21:00", duration: "12h 30m", price: 720, stops: 1, stopCities: ["LHR"], aircraft: "Airbus A380", amenities: ["wifi", "meals", "entertainment"], rating: 4.5, baggage: "2 x 23kg", refundable: false },
  { id: 3, airline: "Lufthansa", logo: "🇩🇪", from: "JFK", to: "DXB", departure: "14:00", arrival: "02:30", duration: "14h 30m", price: 680, stops: 1, stopCities: ["FRA"], aircraft: "Airbus A350", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.6, baggage: "1 x 23kg", refundable: false },
  { id: 4, airline: "Qatar Airways", logo: "🇶🇦", from: "JFK", to: "DXB", departure: "16:45", arrival: "04:15", duration: "11h 30m", price: 890, stops: 0, stopCities: [], aircraft: "Boeing 787", amenities: ["wifi", "meals", "entertainment", "power"], rating: 4.9, baggage: "2 x 30kg", refundable: true },
  { id: 5, airline: "Turkish Airlines", logo: "🇹🇷", from: "JFK", to: "DXB", departure: "19:00", arrival: "08:30", duration: "13h 30m", price: 650, stops: 1, stopCities: ["IST"], aircraft: "Boeing 777", amenities: ["meals", "entertainment"], rating: 4.4, baggage: "1 x 23kg", refundable: false },
]

export const generateDates = (startOffset: number) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + startOffset + i)
    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      day: date.getDate().toString(),
      price: 650 + Math.floor(Math.random() * 300),
      fullDate: date
    }
  })
}
