"use client"

import React, { useState, useRef } from "react"

type PackageItem = {
    id: number
    title: string
    price: string
    image: string
    hot?: boolean
    theme: "blue"
}

const packages: PackageItem[] = [
    {
        id: 1,
        title: "Bali Escape",
        price: "₹89,999",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 2,
        title: "Paris Getaway",
        price: "₹1,49,999",
        theme: "blue",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
        id: 3,
        title: "Maldives Luxury",
        price: "₹2,10,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    },
    {
        id: 4,
        title: "Swiss Alps Tour",
        price: "₹1,85,000",
        theme: "blue",
        image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    },
    {
        id: 5,
        title: "Dubai Delight",
        price: "₹1,05,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
        id: 6,
        title: "Dubai Delight",
        price: "₹1,05,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    }, {
        id: 7,
        title: "Dubai Delight",
        price: "₹1,05,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    }, {
        id: 8,
        title: "Dubai Delight",
        price: "₹1,05,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
        id: 9,
        title: "Dubai Delight",
        price: "₹1,05,000",
        hot: true,
        theme: "blue",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
]

const themeMap = {
    blue: {
        primary: "#306F7D",
        light: "#CAD8FF",
    },
    teal: {
        primary: "#59C3C4",
        light: "#E7FEFA",
    },
    green: {
        primary: "#6DC872",
        light: "#F3FFD2",
    },
}

export default function CoverflowCarousel() {
    const [active, setActive] = useState(0)
    const startX = useRef(0)

    const next = () => setActive((p) => (p + 1) % packages.length)
    const prev = () => setActive((p) => (p - 1 + packages.length) % packages.length)

    const onStart = (x: number) => (startX.current = x)
    const onEnd = (x: number) => {
        const diff = startX.current - x
        if (diff > 60) next()
        if (diff < -60) prev()
    }

    const getStyles = (index: number) => {
        const total = packages.length
        const diff = (index - active + total) % total

        if (diff === 0)
            return {
                transform: "translateX(0) translateZ(0) scale(1.05)",
                zIndex: 10,
                opacity: 1,
            }

        if (diff === 1)
            return {
                transform:
                    "translateX(280px) translateZ(-400px) rotateY(-35deg) scale(0.9)",
                zIndex: 9,
                opacity: 1,
            }

        if (diff === total - 1)
            return {
                transform:
                    "translateX(-280px) translateZ(-400px) rotateY(35deg) scale(0.9)",
                zIndex: 9,
                opacity: 1,
            }

        if (diff === 2)
            return {
                transform:
                    "translateX(520px) translateZ(-650px) rotateY(-35deg) scale(0.8)",
                zIndex: 8,
                opacity: 0.6,
            }

        if (diff === total - 2)
            return {
                transform:
                    "translateX(-520px) translateZ(-650px) rotateY(35deg) scale(0.8)",
                zIndex: 8,
                opacity: 0.6,
            }

        return {
            transform: "translateZ(-900px)",
            opacity: 0,
            zIndex: 1,
        }
    }

    return (
        <section className="w-full py-20 flex flex-col items-center overflow-hidden" id="packages">

            <div className="text-center max-w-2xl mb-14">
                <h2 className="text-4xl font-bold md:text-5xl font-semibold text-[#0E40C7]">
                    Ready Made Packages for You
                </h2>
                <p className="mt-4 text-lg text-[#306F7D]">
                    Discover handpicked destinations crafted for unforgettable experiences.
                    Luxury, comfort, and memories — all in one package.
                </p>
            </div>

            <div
                className="relative w-[1000px] h-[420px] flex items-center justify-center"
                style={{ perspective: "1500px" }}
            >
                {packages.map((pkg, i) => {
                    const theme = themeMap[pkg.theme]

                    return (
                        <div
                            key={pkg.id}
                            className="absolute w-[340px] h-[400px] cursor-grab"
                            style={{
                                ...getStyles(i),
                                transition: "all 0.5s ease",
                                transformStyle: "preserve-3d",
                            }}
                            onClick={() => setActive(i)}
                            onTouchStart={(e) => onStart(e.touches[0].clientX)}
                            onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
                            onMouseDown={(e) => onStart(e.clientX)}
                            onMouseUp={(e) => onEnd(e.clientX)}
                        >
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">

                                <img
                                    src={`${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                                    alt={pkg.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {pkg.hot && (
                                    <span
                                        className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full text-white font-semibold"
                                        style={{ backgroundColor: theme.primary }}
                                    >
                                        🔥 Hot Deal
                                    </span>
                                )}

                                <div className="absolute bottom-0 p-6 text-white w-full">
                                    <h3 className="text-2xl font-bold">{pkg.title}</h3>
                                    <p className="text-lg mt-1 font-semibold">{pkg.price}</p>

                                    <button
                                        className="mt-4 w-full py-2 rounded-full font-semibold transition hover:scale-105"
                                        style={{
                                            backgroundColor: theme.primary,
                                            color: "white",
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* <div className="flex gap-8 mt-12">
                <button
                    onClick={prev}
                    className="px-6 py-2 rounded-full bg-[#CAD8FF] text-[#04257E] font-semibold"
                >
                    ←
                </button>
                <button
                    onClick={next}
                    className="px-6 py-2 rounded-full bg-[#CAD8FF] text-[#04257E] font-semibold"
                >
                    →
                </button>
            </div> */}
        </section>
    )
}