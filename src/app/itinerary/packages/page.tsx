"use client"

import { Packages } from "@/app/components/packages/Packages"
import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner" // adjust path if needed

export default function PackagesPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-64">
                    <Spinner className="w-12 h-12 text-primary" />
                </div>
            }
        >
            <Packages />
        </Suspense>
    )
}