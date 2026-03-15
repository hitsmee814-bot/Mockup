import { dummyFlights, FlightDetail } from "@/app/components/flight-booking"

export function generateStaticParams() {
  return dummyFlights.map(flight => ({
    id: flight.id.toString(),
  }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function FlightDetailPage({ params }: Props) {
  const { id } = await params

  return <FlightDetail id={id} />
}