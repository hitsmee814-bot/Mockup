import { Packages } from "@/app/components/packages/Packages"
import { Suspense } from "react"

export default function PackagesPage() {
    return (
        <Suspense fallback={<div>Loading booking form...</div>}>
            <Packages />
        </Suspense>
    )
}