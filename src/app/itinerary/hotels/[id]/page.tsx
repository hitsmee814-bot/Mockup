import { HotelDetail } from "@/app/components/hotel-booking";

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  return <HotelDetail id={params.id} />
}