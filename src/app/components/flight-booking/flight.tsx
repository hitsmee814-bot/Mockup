"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"
import { SearchForm } from "./search-form"
import { CompactSearchBar } from "./compact-search-bar"
import { FlightResults } from "./flight-results"
import { Plane } from "lucide-react"

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
            <div className="min-h-screen bg-gradient-to-b from-[#3FB8FF]/15 via-white to-[#FBAB18]/10 p-4 md:p-8">
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
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col gap-2 mb-8"
                        >
                            <motion.h1
                                variants={item}
                                className="text-3xl md:text-4xl flex gap-2 items-center font-semibold text-gray-900 tracking-tight"
                            >
                                Flights <Plane />
                            </motion.h1>

                            <motion.p
                                variants={item}
                                className="text-gray-500 text-sm md:text-base"
                            >
                                Book your flight tickets at the best fares and explore destinations worldwide.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            variants={formAnimation}
                            initial="hidden"
                            animate="show"
                        >
                            <SearchForm onSearch={handleSearch} />
                        </motion.div>
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