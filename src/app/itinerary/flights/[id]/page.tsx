import { FlightDetail } from "@/app/components/flight-booking"

export async function generateStaticParams() {
  const ids = ['f123', 'f456'];
  return ids.map(id => ({ id }));
}

export default function FlightDetailPage({ params }: { params: { id: string } }) {
  return <FlightDetail id={params.id} />
}