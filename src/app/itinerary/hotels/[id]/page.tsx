import { HotelDetail } from "@/app/components/hotel-booking"
import { hotels } from "@/app/components/hotel-booking/data"

export function generateStaticParams() {
  return hotels.map(hotel => ({
    id: hotel.id.toString(),
  }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelDetailPage({ params }: Props) {
  const { id } = await params

  return <HotelDetail id={id} />
}