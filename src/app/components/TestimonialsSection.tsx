"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Link from "next/link"

const testimonials = [
    {
        name: "Dr. P.K. Jha",
        descriptor: "Senior Consultant, Cardiology, at a leading Kolkata hospital · Paris & London, 2025",
        hook: "He handed over the whole trip. And found the one thing nobody had thought to look for.",
        review: "“I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.”\n\n“Sudip babu, only you could do this.”",
        source: "Unsolicited written testimonial.",
    },
    {
        name: "Aniruddha Ghosh Roy",
        descriptor: "Zonal Sales Head, Indian pharmaceutical company · First-time Europe traveller, with his wife · 16 days, five cities, July 2026",
        hook: "Two first-time travellers, five countries of trains, every connection timed from Kolkata. It held.",
        review: "“We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.”",
        source: "Bonhomiee Travel Circle, July 2026. Has confirmed he is happy to be named.",
    },
    {
        name: "Ananya Choudhury & Ayan Choudhury",
        descriptor: "Senior executives at a large global IT company · Vietnam group departure",
        hook: "A group departure that didn't feel like one.",
        review: "“It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised. — Ananya · It was all the effort from Sudip to make our experience a memorable one. — Ayan”",
        source: "Bonhomiee Travel Circle and the Vietnam group, after the departure.",
    },
    {
        name: "Joydeep Moitra",
        descriptor: "Retired Army veteran · Thailand, August 2025 — and Kumaon again, January 2026",
        hook: "Meticulous planning, local support always in touch, value for money. His words. He travelled with us again five months later.",
        review: "“Just wished to express my gratitude to Bonhomiee for organising an unforgettable experience at Pattaya and Bangkok. The planning was meticulous and the events organised with optimum utilisation of available time. The local support group was constantly in touch. The tour was affordable and, in the end, value for money.”",
        source: "Bonhomiee Travel Circle, 19 August 2025. Fifteen reactions. After Kumaon in January: “Thanks for the wonderful time, Sudip. Would cherish it.”",
    },
    {
        name: "Mr. L.S. Shankar",
        descriptor: "Retired PSU director · Western Arunachal with family, May 2026",
        hook: "Three generations on some of India's hardest roads. His words for it, afterwards:",
        review: "“A luxurious nature trail.”",
        source: "Said to Sudip in person. Confirm before publishing.",
    },
    {
        name: "Sadhna Kar",
        descriptor: "On the leadership offsite designed for her husband Mr Rahul Kar's team at a global industrial company · Mussoorie, March 2026",
        hook: "She didn't go. She heard about it for weeks.",
        review: "“What you have done — he cannot stop talking about you, how you have done everything there. I am quite envious that I missed going.”",
        source: "WhatsApp to Sudip. Confirm before publishing. Company name deliberately withheld.",
    },
]

const visibleDesktop = 3
const clones = testimonials.slice(-visibleDesktop)
const endClones = testimonials.slice(0, visibleDesktop)
const cards = [...clones, ...testimonials, ...endClones]

export default function Testimonials() {
    const [index, setIndex] = useState(visibleDesktop)
    const [flipped, setFlipped] = useState<number | null>(null)
    const [paused, setPaused] = useState(false)
    const [animating, setAnimating] = useState(false)

    const next = () => {
        if (animating) return
        setFlipped(null)
        setAnimating(true)
        setIndex((prev) => prev + 1)
    }

    const prev = () => {
        if (animating) return
        setFlipped(null)
        setAnimating(true)
        setIndex((prev) => prev - 1)
    }

    const handleAnimationEnd = () => {
        if (index >= testimonials.length + visibleDesktop) {
            setIndex(visibleDesktop)
        }

        if (index < visibleDesktop) {
            setIndex(testimonials.length + visibleDesktop - 1)
        }

        setAnimating(false)
    }

    useEffect(() => {
        if (paused || flipped !== null || animating) return

        const timer = setInterval(next, 7500)
        return () => clearInterval(timer)
    }, [paused, flipped, animating])

    const realIndex =
        ((index - visibleDesktop) % testimonials.length + testimonials.length) %
        testimonials.length

    const progress = ((realIndex + 1) / testimonials.length) * 100

    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
            <div className="relative mx-auto max-w-6xl px-6 sm:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
                        <div className="relative mx-auto w-fit">
                            {/* <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[60px] font-bold uppercase tracking-[0.08em] text-muted/35 sm:text-[100px] lg:text-[145px]">
                                TESTIMONIALS
                            </span> */}

                            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
                                In their <span className="text-[#FBAB18]">own words.</span>
                            </h2>
                        </div>
                    </motion.div>

                    <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#536174] sm:text-base">
                        Real journeys. Real words. Shared by the people who travelled with us.
                    </motion.p>
                </div>

                {/* Carousel */}
                <div className="relative mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${index * (100 / 3)}%` }}
                            transition={animating ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                            onAnimationComplete={handleAnimationEnd}
                        >
                            {cards.map((item, i) => {
                                const isFlipped = flipped === i

                                return (
                                    <div key={`${item.name}-${i}`} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3">
                                        <div className="relative h-[440px] cursor-pointer [perspective:1200px]" onClick={() => setFlipped(isFlipped ? null : i)}>
                                            <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.4 }}>

                                                {/* Front */}
                                                <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-8 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden] sm:p-9">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E40C7]/10">
                                                            <Quote size={17} className="text-[#0E40C7]" />
                                                        </div>
                                                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9AA4B2]">Tap to read</span>
                                                    </div>

                                                    <div className="mt-7">
                                                        <h3 className="text-lg font-semibold tracking-tight text-[#10213F] sm:text-xl">{item.name}</h3>
                                                        <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-[#7A8494] sm:text-[13px]">{item.descriptor}</p>
                                                    </div>

                                                    <div className="mt-auto">
                                                        <div className="mb-5 h-[2px] w-10 bg-[#FBAB18]" />
                                                        <p className="text-xl font-semibold leading-[1.35] tracking-tight text-[#FBAB18] sm:text-[22px]">{item.hook}</p>
                                                    </div>
                                                </div>

                                                {/* Back */}
                                                <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-8 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9">
                                                    <p className="text-base font-semibold leading-snug text-[#FBAB18] sm:text-lg">{item.hook}</p>
                                                    <div className="mt-5 h-px w-full bg-[#E7EBF1]" />

                                                    <div className="mt-7 flex-1 overflow-y-auto">
                                                        {item.review.split("\n\n").map((text, i) => (
                                                            <p key={i} className="mb-4 text-[15px] leading-[1.75] text-[#344054] last:mb-0 sm:text-base">{text}</p>
                                                        ))}
                                                    </div>

                                                    {/* <div className="mt-5 border-t border-[#E7EBF1] pt-4">
                                                        <p className="text-[10px] leading-relaxed text-[#8993A3] sm:text-[11px]">{item.source}</p>
                                                    </div> */}
                                                </div>

                                            </motion.div>
                                        </div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>

                {/* Controls */}
                <div className="mt-9 flex items-center gap-6">
                    <div className="flex-1">
                        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#E7EBF1]">
                            <motion.div className="absolute left-0 top-0 h-full bg-[#757C86]" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                        </div>
                    </div>

                    <Link href="/testimonials" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-[#10213F] transition-colors duration-300 hover:text-[#0E40C7]">
                        Read More
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>

                    <div className="flex shrink-0 gap-2">
                        <button type="button" aria-label="Previous testimonial" onClick={prev} disabled={animating} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40">
                            <ChevronLeft size={18} />
                        </button>

                        <button type="button" aria-label="Next testimonial" onClick={next} disabled={animating} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}