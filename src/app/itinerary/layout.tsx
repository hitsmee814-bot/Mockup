import ItenaryBuilder from "@/app/components/itinerary/ItenaryBuilder"

export default function ItineraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ItenaryBuilder>{children}</ItenaryBuilder>
}