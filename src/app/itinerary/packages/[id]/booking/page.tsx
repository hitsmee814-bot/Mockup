import { BookingForm } from "@/app/components/packages/BookingForm"
import { travelPackages } from "@/app/components/packages/data"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
  searchParams?: { tripType?: string }
}

export function generateStaticParams() {
  return travelPackages.map(pkg => ({ id: pkg.id }))
}

export default function BookingPage({ params, searchParams }: Props) {
  const { id } = params
  const { tripType } = searchParams ?? {}

  const pkg = travelPackages.find((p) => p.id === id)
  if (!pkg) notFound()

  return <BookingForm pkg={pkg} tripType={tripType} />
}