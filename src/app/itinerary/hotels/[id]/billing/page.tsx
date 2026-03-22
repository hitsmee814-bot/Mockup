import { HotelBilling } from "@/app/components/hotel-booking"
import { hotels } from "@/app/components/hotel-booking/data"
import { use } from "react"

export function generateStaticParams() {
  return hotels.map((hotel) => ({
    id: hotel.id.toString(),
  }))
}

export default function HotelBillingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return <HotelBilling id={id} />
}