import { HotelDetail } from "@/app/components/hotel-booking"
import { hotels } from "@/app/components/hotel-booking/data"
import { Spinner } from "@/components/ui/spinner"
import { notFound } from "next/navigation"
import { Suspense } from "react"

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
    const hotel = hotels.find(p => p.id === id)

    if (!hotel) notFound()

    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-64">
                    <Spinner className="w-12 h-12 text-primary" />
                </div>
            }
        >
            <HotelDetail id={id} />
        </Suspense>
    )
}