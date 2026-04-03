import { Billing } from "@/app/components/flight-booking"
import { use } from "react"


import { dummyFlights } from "@/app/components/flight-booking"

export function generateStaticParams() {
  return dummyFlights.map((flight) => ({
    id: flight.id.toString(),
  }))
}
export default function BillingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <Billing id={id} />
}
