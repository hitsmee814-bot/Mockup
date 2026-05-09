"use client";

import { useMemo, useEffect, useState } from "react";
import { TourPackage } from "./types";
import { FilterBar } from "./FilterBar";
import { PackageCard } from "./PackageCard";
import { PackageSkeleton } from "./PackageSkeleton";
import { FilterDrawer, FilterState, DEFAULT_FILTERS } from "./FilterDrawer";
import { Compass } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { tourService } from "@/services/ItineraryService";

const staggerContainer: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const cardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.97,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
    },
};
export function Package() {
    const [tours, setTours] = useState<TourPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeDestination, setActiveDestination] = useState("All");
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

    useEffect(() => {
        setLoading(true);
        tourService.getAll()
            .then((data) => setTours(data.length ? data : []))
            .finally(() => setLoading(false));
    }, []);

    // Derive unique destinations for quick filter pills
    const destinations = useMemo(
        () => [...new Set(tours.map((t) => t.tour.destination))],
        [tours]
    );

    const filtered = useMemo(() => {
        return tours.filter((pkg) => {
            const { tour } = pkg;

            const isAll = activeDestination === "All";

            if (!isAll && tour.destination !== activeDestination) return false;
            if (tour.base_price > filters.maxPrice) return false;
            if (tour.duration_days < filters.minDays || tour.duration_days > filters.maxDays) return false;

            // Search
            if (search) {
                const q = search.toLowerCase();
                if (
                    !tour.title.toLowerCase().includes(q) &&
                    !tour.destination.toLowerCase().includes(q) &&
                    !tour.origin_city.toLowerCase().includes(q)
                )
                    return false;
            }

            return true;
        });
    }, [tours, activeDestination, filters, search]);

    const hasActiveFilters =
        filters.destination !== null ||
        filters.maxPrice !== DEFAULT_FILTERS.maxPrice ||
        filters.minDays !== DEFAULT_FILTERS.minDays ||
        filters.maxDays !== DEFAULT_FILTERS.maxDays;

    return (
        <div className="min-h-screen bg-white px-3 sm:px-4 py-6 sm:py-10">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <motion.div
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border"
                        style={{ background: "#3FB8FF18", color: "#3FB8FF", borderColor: "#3FB8FF40" }}
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Compass className="size-3.5" /> Explore Our Tours
                    </motion.div>
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Find Your Perfect <span style={{ color: "#3FB8FF" }}>Getaway</span>
                    </motion.h1>
                    <motion.p
                        className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Handpicked travel experiences curated for every kind of traveller.
                    </motion.p>
                </div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                    <FilterBar
                        destinations={destinations}
                        activeDestination={activeDestination}
                        search={search}
                        onFilterDestination={(d) => {
                            setActiveDestination(d);
                            setFilters(DEFAULT_FILTERS); // 🔥 important fix
                        }} onSearch={setSearch}
                        onOpenFilters={() => setFilterOpen(true)}
                        hasActiveFilters={hasActiveFilters}
                    />
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {Array.from({ length: 8 }).map((_, i) => (
                                <PackageSkeleton key={i} />
                            ))}
                        </motion.div>
                    ) : filtered.length > 0 ? (
                        <motion.div
                            key={`${activeDestination}-${search}`}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0 }}
                        >                            <motion.p
                            className="text-xs text-gray-400 mb-5"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                                Showing <span className="font-semibold text-gray-700">{filtered.length}</span> tours
                                {activeDestination !== "All" && (
                                    <>
                                        {" "}in <span className="font-semibold" style={{ color: "#3FB8FF" }}>{activeDestination}</span>
                                    </>
                                )}
                            </motion.p>
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="show"
                            >
                                {filtered.map((pkg) => (
                                    <motion.div key={pkg.tour.id} variants={cardVariant}>
                                        <PackageCard pkg={pkg} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            className="text-center py-24 text-gray-400"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-5xl mb-4">🔍</p>
                            <p className="font-bold text-base text-gray-600">No tours found</p>
                            <p className="text-sm mt-1">Try a different filter or search term</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <FilterDrawer
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                destinations={destinations}
                onApply={setFilters}
                currentFilters={filters}
            />
        </div>
    );
}
