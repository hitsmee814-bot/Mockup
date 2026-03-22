import { HotelDetail } from "@/app/components/hotel-booking"
import { use } from "react"

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <HotelDetail id={id} />
}
