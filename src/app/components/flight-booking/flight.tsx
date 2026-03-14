"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"
import { SearchForm } from "./search-form"
import { CompactSearchBar } from "./compact-search-bar"
import { FlightResults } from "./flight-results"
import { Plane, PlaneTakeoff } from "lucide-react"

export function Flight() {
    console.log('Hi')
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searching, setSearching] = useState(false)
    const [showResults, setShowResults] = useState(searchParams.has('from'))

    const handleSearch = (params: { from: string; to: string; tripType: string; departDate?: string; returnDate?: string; adults: number; children: number; infants: number; class: string }) => {
        const query = new URLSearchParams()

        if (params.from) query.set('from', params.from)
        if (params.to) query.set('to', params.to)
        query.set('tripType', params.tripType)

        if (params.departDate) query.set('departDate', params.departDate)
        if (params.returnDate) query.set('returnDate', params.returnDate)

        query.set('adults', params.adults.toString())

        if (params.children) query.set('children', params.children.toString())
        if (params.infants) query.set('infants', params.infants.toString())

        query.set('class', params.class)

        setSearching(true)

        setTimeout(() => {
            router.push(`?${query.toString()}`)
            setSearching(false)
            setShowResults(true)
        }, 2000)
    }

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const formAnimation = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
    }

    return (
        <>
            <div className="min-h-screen p-4 md:p-8">
                {searching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Spinner />
                            <p className="text-lg font-medium">Searching flights...</p>
                        </div>
                    </motion.div>
                )}

                {!showResults ? (
                    <>
                        <div className="space-y-8">
                            <div className="text-center space-y-2 pt-4">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20">
                                    <PlaneTakeoff className="size-3.5" /> Book Your Flight
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight">
                                    Fly Anywhere, <span className="text-primary">Anytime</span>
                                </h1>
                                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                                    Search hundreds of airlines and find the best fares for your next trip — one-way, return or multi-city.
                                </p>
                            </div>
                            <SearchForm onSearch={handleSearch} />
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                    >
                        <CompactSearchBar onSearch={handleSearch} />
                        <FlightResults />
                    </motion.div>
                )}
            </div>
        </>
    )
}