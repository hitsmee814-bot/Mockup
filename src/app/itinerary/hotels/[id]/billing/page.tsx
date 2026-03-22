import { HotelBilling } from "@/app/components/hotel-booking"
import { use } from "react"

export default function HotelBillingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <HotelBilling id={id} />
}
