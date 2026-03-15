import { FlightDetail } from "@/app/components/flight-booking"
import { use } from "react"

export default function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <FlightDetail id={id} />
}
