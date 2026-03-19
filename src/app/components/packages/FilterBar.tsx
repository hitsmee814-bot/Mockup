"use client"

import { Category } from "./types"
import { Search, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"

const TOP_CATEGORIES: (Category | "All")[] = ["All", "International", "Womens Only", "Domestic", "Bachelors"]

const ICONS: Partial<Record<Category, string>> = {
    International: "✈️", "Womens Only": "👩", Domestic: "🇮🇳", Bachelors: "🎉",
}

interface FilterBarProps {
    active: Category | "All"
    search: string
    onFilter: (c: Category | "All") => void
    onSearch: (v: string) => void
    onOpenFilters: () => void
    hasDrawerFilters?: boolean
}

export function FilterBar({ active, search, onFilter, onSearch, onOpenFilters, hasDrawerFilters }: FilterBarProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                        placeholder="Search destinations, packages..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-[#3FB8FF] placeholder:text-gray-400 transition-all shadow-sm text-gray-700"
                        style={{ "--tw-ring-color": "#3FB8FF33" } as React.CSSProperties}
                    />
                </div>
                <motion.button
                    onClick={onOpenFilters}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 bg-white text-xs font-semibold text-gray-500 shrink-0 shadow-sm cursor-pointer"
                    style={{ borderColor: hasDrawerFilters ? "#3FB8FF" : undefined, color: hasDrawerFilters ? "#3FB8FF" : undefined }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <SlidersHorizontal className="size-3.5" />
                    Filters {hasDrawerFilters ? `(${hasDrawerFilters})` : ""}
                </motion.button>
            </div>

            <div className="flex overflow-x-auto overflow-y-hidden sm:flex-wrap sm:justify-center gap-2 pb-1 sm:pb-0 no-scrollbar">
                {TOP_CATEGORIES.map(cat => {
                    const isActive = !hasDrawerFilters && active === cat
                    return (
                        <motion.button
                            key={cat}
                            onClick={() => onFilter(cat)}
                            className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer select-none shrink-0"
                            style={isActive
                                ? { background: "#3FB8FF", color: "#fff", borderColor: "#3FB8FF" }
                                : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
                            }
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            animate={isActive
                                ? { boxShadow: "0 4px 14px 0 rgba(63,184,255,0.35)" }
                                : { boxShadow: "0 0px 0px 0 rgba(0,0,0,0)" }
                            }
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            {cat === "All"
                                ? <span className="size-1.5 rounded-full bg-current opacity-60 inline-block" />
                                : ICONS[cat as Category] && <span className="text-sm leading-none">{ICONS[cat as Category]}</span>
                            }
                            {cat}
                            {isActive && (
                                <motion.span
                                    className="absolute -top-0.5 -right-0.5 size-2 rounded-full border-2 border-white"
                                    style={{ background: "#FBAB18" }}
                                    layoutId="activeDot"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
