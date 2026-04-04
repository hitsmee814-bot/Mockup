"use client"

import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Package } from "@/app/components/packages/Package"

export default function PackagesPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-64">
                    <Spinner className="w-12 h-12 text-primary" />
                </div>
            }
        >
            <Package />
        </Suspense>
    )
}