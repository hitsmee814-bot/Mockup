import { HotelBilling } from "@/app/components/hotel-booking"
import { hotels } from "@/app/components/hotel-booking/data"
import { use, Suspense } from "react"
import { notFound } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

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

  const hotel = hotels.find((h) => h.id === id)

  if (!hotel) notFound()

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner className="w-12 h-12 text-primary" />
        </div>
      }
    >
      <HotelBilling id={id} />
    </Suspense>
  )
}