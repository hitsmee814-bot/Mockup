import { BookingForm } from "@/app/components/packages/BookingForm"
import { travelPackages } from "@/app/components/packages/data"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ tripType?: string }>
}


export default async function BookingPage({ params, searchParams }: Props) {
  const { id } = await params
  const { tripType } = (await searchParams) ?? {}

  const pkg = travelPackages.find((p) => p.id === id)
  if (!pkg) notFound()

  return <BookingForm pkg={pkg} tripType={tripType} />
}
