import { Flight, FilterState } from "./types"

function getHour(time: string) {
  return parseInt(time.split(":")[0])
}

function matchesTimeFilter(time: string, labels: string[]) {
  if (labels.length === 0) return true
  const h = getHour(time)
  return labels.some((l) =>
    l === "Morning" ? h >= 6 && h < 12 :
    l === "Afternoon" ? h >= 12 && h < 18 :
    l === "Evening" ? h >= 18 && h < 24 :
    l === "Night" ? h >= 0 && h < 6 : false
  )
}

function parseDurationHours(d: string) {
  const m = d.match(/(\d+)h\s*(\d+)?m?/)
  return m ? parseInt(m[1]) + (parseInt(m[2] || "0") / 60) : 0
}

const amenityMap: Record<string, string> = {
  "Wi-Fi": "wifi", "In-flight Entertainment": "entertainment",
  "Power Outlets": "power", "Meals Included": "meals",
}

export function filterFlights(flights: Flight[], f: FilterState) {
  return flights.filter((fl) => {
    if (fl.price < f.priceRange[0] || fl.price > f.priceRange[1]) return false
    const dur = parseDurationHours(fl.duration)
    if (dur < f.durationRange[0] || dur > f.durationRange[1]) return false
    if (f.stops.length > 0) {
      const label = fl.stops === 0 ? "Non-stop" : fl.stops === 1 ? "1 Stop" : "2+ Stops"
      if (!f.stops.includes(label)) return false
    }
    if (!matchesTimeFilter(fl.departure, f.departureTimes)) return false
    if (!matchesTimeFilter(fl.arrival, f.arrivalTimes)) return false
    if (f.airlines.length > 0 && !f.airlines.includes(fl.airline)) return false
    if (f.aircraft.length > 0 && !f.aircraft.includes(fl.aircraft)) return false
    if (f.amenities.length > 0 && !f.amenities.every((a) => {
      const key = amenityMap[a]
      return key ? fl.amenities.includes(key) : false
    })) return false
    if (f.booking.includes("Refundable") && !fl.refundable) return false
    return true
  })
}
