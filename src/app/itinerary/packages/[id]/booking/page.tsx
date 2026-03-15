import { BookingForm } from "@/app/components/packages/BookingForm"
import { travelPackages } from "@/app/components/packages/data"
import { Spinner } from "@/components/ui/spinner"
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
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-64">
                    <Spinner className="w-12 h-12 text-primary" />
                </div>
            }
        >
            <BookingForm pkg={pkg} />
        </Suspense>
    )
}