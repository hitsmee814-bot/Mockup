import { HotelDetail } from "@/app/components/hotel-booking"

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <HotelDetail id={id} />
}