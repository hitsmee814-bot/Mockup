import HeaderNav from "../components/HeaderNav"
import ItenaryBuilder from "../components/itinerary/ItenaryBuilder"
export default function ItineraryPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <HeaderNav enableScrollBg={false} position="sticky"/>
            <ItenaryBuilder />
        </main>
    )
}