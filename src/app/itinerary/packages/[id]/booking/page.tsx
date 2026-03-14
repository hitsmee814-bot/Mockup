import { BookingForm } from "@/app/components/packages/BookingForm"
import { travelPackages } from "@/app/components/packages/data"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export function generateStaticParams() {
  return travelPackages.map(pkg => ({ id: pkg.id }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params
  const pkg = travelPackages.find(p => p.id === id)

  if (!pkg) notFound()

  return (
    // We wrap this in Suspense because BookingForm will now use useSearchParams()
    <Suspense fallback={<div>Loading booking form...</div>}>
      <BookingForm pkg={pkg} />
    </Suspense>
  )
}