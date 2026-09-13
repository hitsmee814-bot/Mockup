// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence, Variants } from "framer-motion"
// import {
//     ArrowDown,
//     ArrowUp,
//     MapPin,
//     Quote,
//     Star,
// } from "lucide-react"

// const fadeUp: Variants = {
//     hidden: {
//         opacity: 0,
//         y: 30,
//         filter: "blur(6px)",
//     },
//     visible: {
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)",
//         transition: {
//             duration: 0.8,
//             ease: [0.16, 1, 0.3, 1],
//         },
//     },
// }

// const testimonials = [
//     {
//         id: 1,
//         name: "Ananya Sharma",
//         location: "Mumbai, India",
//         destination: "Kerala",
//         initials: "AS",
//         rating: 5,
//         image:
//             "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
//         text: "I usually spend hours trying to figure out where to go and what to book. This completely changed that. It understood what I actually wanted and turned it into a trip that felt like it was made just for me.",
//     },
//     {
//         id: 2,
//         name: "Rahul Mehta",
//         location: "Bengaluru, India",
//         destination: "Ladakh",
//         initials: "RM",
//         rating: 5,
//         image:
//             "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85",
//         text: "What I loved most was that it never felt like I was choosing from a list of generic packages. Every recommendation felt relevant to the kind of trip I wanted.",
//     },
//     {
//         id: 3,
//         name: "Priya Nair",
//         location: "Kochi, India",
//         destination: "Goa",
//         initials: "PN",
//         rating: 5,
//         image:
//             "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
//         text: "The whole experience was incredibly simple. I shared what I had in mind, and the platform did the hard work of bringing everything together without making the process complicated.",
//     },
//     {
//         id: 4,
//         name: "Arjun Kapoor",
//         location: "Delhi, India",
//         destination: "Rajasthan",
//         initials: "AK",
//         rating: 4,
//         image:
//             "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
//         text: "It feels much more personal than the usual travel websites. I could explore ideas without feeling pushed into a particular package or itinerary.",
//     },
//     {
//         id: 5,
//         name: "Meera Iyer",
//         location: "Chennai, India",
//         destination: "Udaipur",
//         initials: "MI",
//         rating: 5,
//         image:
//             "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1200&q=85",
//         text: "From the first recommendation to the final itinerary, everything felt thoughtful. It saved me time while still giving me the feeling that I had planned the trip myself.",
//     },
// ]

// export default function Testimonials() {
//     const [activeIndex, setActiveIndex] = useState(0)

//     const previousIndex =
//         (activeIndex - 1 + testimonials.length) % testimonials.length

//     const nextIndex = (activeIndex + 1) % testimonials.length

//     const active = testimonials[activeIndex]
//     const previous = testimonials[previousIndex]
//     const next = testimonials[nextIndex]

//     const goPrevious = () => {
//         setActiveIndex(previousIndex)
//     }

//     const goNext = () => {
//         setActiveIndex(nextIndex)
//     }

//     return (
//         <section
//             id="testimonials"
//             className="relative overflow-hidden bg-none py-16 sm:py-20 lg:py-24"
//         >
//             {/* Background decoration */}
//             <div className="pointer-events-none absolute inset-0">
//                 <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#479EA8]/[0.045] blur-3xl" />

//                 <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-[#0E40C7]/[0.025] blur-3xl" />

//                 <div className="absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-[#FBAB18]/[0.035] blur-3xl" />
//             </div>

//             <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
//                 {/* Heading */}
//                 <div className="mx-auto max-w-4xl text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                         transition={{
//                             duration: 0.6,
//                             ease: [0.16, 1, 0.3, 1],
//                         }}
//                         className="relative z-10"
//                     >
//                         <div className="relative mx-auto w-fit">
//                             {/* Background Word */}
//                             <span
//                                 aria-hidden="true"
//                                 className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[60px] font-bold uppercase tracking-[0.08em] text-muted/35 sm:text-[100px] lg:text-[145px]"
//                             >
//                                 TESTIMONIALS
//                             </span>

//                             {/* Heading */}
//                             <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
//                                 What people are{" "}
//                                 <span className="text-[#0E40C7]">
//                                     saying
//                                 </span>
//                             </h2>
//                         </div>
//                     </motion.div>

//                     {/* Subtitle */}
//                     <motion.p
//                         initial={{ opacity: 0, y: 15 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                         transition={{
//                             duration: 0.6,
//                             delay: 0.1,
//                         }}
//                         className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#536174] sm:text-base"
//                     >
//                         Real experiences from people using the platform every
//                         day.
//                     </motion.p>
//                 </div>

//                 {/* Main testimonial layout */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, margin: "-80px" }}
//                     transition={{
//                         duration: 0.8,
//                         delay: 0.15,
//                     }}
//                     className="mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(380px,0.9fr)_1.1fr] lg:gap-16"
//                 >
//                     {/* ================================================== */}
//                     {/* LEFT — VISUAL CAROUSEL */}
//                     {/* ================================================== */}
//                     <div className="relative mx-auto flex h-[560px] w-full max-w-[500px] items-center lg:mx-0 lg:max-w-none">
//                         {/* Arrow Controls */}
//                         <div className="absolute -left-1 top-1/2 z-30 flex h-[500px] -translate-y-1/2 flex-col items-center justify-between py-8 sm:-left-3">
//                             {/* Previous */}
//                             <button
//                                 type="button"
//                                 onClick={goPrevious}
//                                 aria-label="Previous testimonial"
//                                 className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#10213F]/10 bg-white/90 text-[#10213F] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0E40C7]/25 hover:text-[#0E40C7] hover:shadow-lg"
//                             >
//                                 <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
//                             </button>

//                             {/* Position */}
//                             {/* <div className="flex flex-col items-center gap-1">
//                                 <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0E40C7] [writing-mode:vertical-rl]">
//                                     {String(activeIndex + 1).padStart(
//                                         2,
//                                         "0",
//                                     )}
//                                 </span>

//                                 <div className="h-8 w-px bg-[#10213F]/10" />

//                                 <span className="text-[10px] font-medium tracking-[0.15em] text-[#6B7280] [writing-mode:vertical-rl]">
//                                     {String(testimonials.length).padStart(
//                                         2,
//                                         "0",
//                                     )}
//                                 </span>
//                             </div> */}

//                             {/* Next */}
//                             <button
//                                 type="button"
//                                 onClick={goNext}
//                                 aria-label="Next testimonial"
//                                 className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#10213F]/10 bg-white/90 text-[#10213F] shadow-sm backdrop-blur-md transition-all duration-300 hover:translate-y-1 hover:border-[#0E40C7]/25 hover:text-[#0E40C7] hover:shadow-lg"
//                             >
//                                 <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
//                             </button>
//                         </div>

//                         {/* Card Stack */}
//                         <div className="relative ml-12 h-[500px] w-[calc(100%-48px)]">
//                             {/* Top faded card */}
//                             <motion.div
//                                 key={`top-${previous.id}`}
//                                 initial={{
//                                     opacity: 0,
//                                     y: -20,
//                                     scale: 0.9,
//                                 }}
//                                 animate={{
//                                     opacity: 0.22,
//                                     y: -55,
//                                     scale: 0.88,
//                                 }}
//                                 transition={{
//                                     duration: 0.45,
//                                     ease: [0.16, 1, 0.3, 1],
//                                 }}
//                                 className="absolute inset-x-3 top-0 z-0 h-[430px] overflow-hidden rounded-[2rem]"
//                             >
//                                 <div
//                                     className="absolute inset-0 bg-cover bg-center"
//                                     style={{
//                                         backgroundImage: `url(${previous.image})`,
//                                     }}
//                                 />

//                                 <div className="absolute inset-0 bg-[#10213F]/50" />

//                                 <div className="absolute bottom-0 left-0 p-6 text-white">
//                                     <p className="text-sm font-semibold">
//                                         {previous.destination}
//                                     </p>
//                                 </div>
//                             </motion.div>

//                             {/* Bottom faded card */}
//                             <motion.div
//                                 key={`bottom-${next.id}`}
//                                 initial={{
//                                     opacity: 0,
//                                     y: 20,
//                                     scale: 0.9,
//                                 }}
//                                 animate={{
//                                     opacity: 0.22,
//                                     y: 55,
//                                     scale: 0.88,
//                                 }}
//                                 transition={{
//                                     duration: 0.45,
//                                     ease: [0.16, 1, 0.3, 1],
//                                 }}
//                                 className="absolute inset-x-3 bottom-0 z-0 h-[430px] overflow-hidden rounded-[2rem]"
//                             >
//                                 <div
//                                     className="absolute inset-0 bg-cover bg-center"
//                                     style={{
//                                         backgroundImage: `url(${next.image})`,
//                                     }}
//                                 />

//                                 <div className="absolute inset-0 bg-[#10213F]/50" />

//                                 <div className="absolute bottom-0 left-0 p-6 text-white">
//                                     <p className="text-sm font-semibold">
//                                         {next.destination}
//                                     </p>
//                                 </div>
//                             </motion.div>

//                             {/* Active Card */}
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={active.id}
//                                     initial={{
//                                         opacity: 0,
//                                         scale: 0.94,
//                                         y: 15,
//                                     }}
//                                     animate={{
//                                         opacity: 1,
//                                         scale: 1,
//                                         y: 0,
//                                     }}
//                                     exit={{
//                                         opacity: 0,
//                                         scale: 0.94,
//                                         y: -15,
//                                     }}
//                                     transition={{
//                                         duration: 0.5,
//                                         ease: [0.16, 1, 0.3, 1],
//                                     }}
//                                     className="absolute inset-0 z-10"
//                                 >
//                                     <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(16,33,63,0.18)]">
//                                         {/* Destination Image */}
//                                         <div
//                                             className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
//                                             style={{
//                                                 backgroundImage: `url(${active.image})`,
//                                             }}
//                                         />

//                                         {/* Gradient */}
//                                         <div className="absolute inset-0 bg-gradient-to-t from-[#10213F]/95 via-[#10213F]/25 to-transparent" />

//                                         {/* Top Tag */}
//                                         <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white backdrop-blur-md">
//                                             DESTINATION
//                                         </div>

//                                         {/* Bottom Content */}
//                                         <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
//                                             <div className="flex items-center gap-2 text-white/75">
//                                                 <MapPin className="h-3.5 w-3.5" />

//                                                 <span className="text-xs font-medium">
//                                                     {active.location}
//                                                 </span>
//                                             </div>

//                                             <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
//                                                 {active.destination}
//                                             </h3>

//                                             <div className="mt-5 flex items-center gap-3">
//                                                 <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-bold text-white backdrop-blur-md">
//                                                     {active.initials}
//                                                 </div>

//                                                 <div>
//                                                     <p className="text-sm font-semibold text-white">
//                                                         {active.name}
//                                                     </p>

//                                                     <p className="text-xs text-white/60">
//                                                         Traveller
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* ================================================== */}
//                     {/* RIGHT — TESTIMONIAL */}
//                     {/* ================================================== */}
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={`review-${active.id}`}
//                             initial={{
//                                 opacity: 0,
//                                 x: 30,
//                                 filter: "blur(5px)",
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 x: 0,
//                                 filter: "blur(0px)",
//                             }}
//                             exit={{
//                                 opacity: 0,
//                                 x: -30,
//                                 filter: "blur(5px)",
//                             }}
//                             transition={{
//                                 duration: 0.55,
//                                 ease: [0.16, 1, 0.3, 1],
//                             }}
//                             className="relative py-4 lg:py-8"
//                         >
//                             {/* Quote */}
//                             <Quote className="h-12 w-12 fill-[#0E40C7]/10 text-[#0E40C7]/20 sm:h-14 sm:w-14" />

//                             {/* Rating */}
//                             <div className="mt-7 flex items-center gap-1.5">
//                                 {Array.from({
//                                     length: active.rating,
//                                 }).map((_, index) => (
//                                     <Star
//                                         key={index}
//                                         className="h-4 w-4 fill-[#FBAB18] text-[#FBAB18]"
//                                     />
//                                 ))}

//                                 <span className="ml-2 text-xs font-semibold text-[#6B7280]">
//                                     {active.rating}.0
//                                 </span>
//                             </div>

//                             {/* Main Review */}
//                             <blockquote className="mt-7 max-w-3xl text-2xl font-medium leading-[1.4] tracking-tight text-[#10213F] sm:text-3xl lg:text-4xl xl:text-[2.55rem]">
//                                 “{active.text}”
//                             </blockquote>

//                             {/* Reviewer */}
//                             <div className="mt-10 flex items-center gap-4">
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E40C7]/10 text-sm font-bold text-[#0E40C7]">
//                                     {active.initials}
//                                 </div>

//                                 <div>
//                                     <p className="text-sm font-semibold text-[#10213F]">
//                                         {active.name}
//                                     </p>

//                                     <p className="mt-0.5 text-xs text-[#6B7280]">
//                                         {active.location}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Destination indicator */}
//                             <div className="mt-8 flex items-center gap-2">
//                                 <MapPin className="h-3.5 w-3.5 text-[#0E40C7]" />

//                                 <span className="text-xs font-medium text-[#536174]">
//                                     Experience in {active.destination}
//                                 </span>
//                             </div>

//                             {/* Progress */}
//                             <div className="mt-10 flex items-center gap-4">
//                                 <div className="h-px w-20 bg-[#0E40C7]" />

//                                 <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6B7280]">
//                                     {String(activeIndex + 1).padStart(2, "0")}{" "}
//                                     /{" "}
//                                     {String(testimonials.length).padStart(
//                                         2,
//                                         "0",
//                                     )}
//                                 </span>
//                             </div>
//                         </motion.div>
//                     </AnimatePresence>
//                 </motion.div>

//                 {/* Bottom Divider */}
//                 <motion.div
//                     initial={{ opacity: 0, scaleX: 0 }}
//                     whileInView={{ opacity: 1, scaleX: 1 }}
//                     viewport={{ once: true }}
//                     transition={{
//                         duration: 1,
//                         delay: 0.3,
//                         ease: [0.16, 1, 0.3, 1],
//                     }}
//                     className="mx-auto mt-16 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#0E40C7]/20 to-transparent"
//                 />
//             </div>
//         </section>
//     )
// }

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Dr. P.K. Jha",
        descriptor: "Senior Consultant, Cardiology, at a leading Kolkata hospital · Paris & London, 2025",
        hook: "He handed over the whole trip. And found the one thing nobody had thought to look for.",
        review: "“I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.”",
        source: "Unsolicited written testimonial. Permission implicit in the writing of it.",
    },
    {
        name: "Aniruddha Ghosh Roy",
        descriptor: "Zonal Sales Head, Indian pharmaceutical company · First-time Europe traveller, with his wife · Switzerland, Austria, Italy · 16 days, five cities, July 2026",
        hook: "Two first-time travellers, five countries of trains, every connection timed from Kolkata. It held.",
        review: "“We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.”",
        source: "Bonhomiee Travel Circle, July 2026. He has confirmed he is happy to be named.",
    },
    {
        name: "Ananya Choudhury & Ayan Choudhury",
        descriptor: "Senior executives at a large global IT company · Vietnam group departure",
        hook: "A group departure that didn't feel like one.",
        review: "“It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised.”",
        source: "Bonhomiee Travel Circle, after the Vietnam departure.",
    },
    {
        name: "Mr. L.S. Shankar",
        descriptor: "Retired PSU director · Western Arunachal with family, May 2026",
        hook: "Three generations on some of India's hardest roads. His words for it, afterwards:",
        review: "“A luxurious nature trail.”",
        source: "Said to Sudip in person after the trip.",
    },
    {
        name: "Sadhna Kar",
        descriptor: "On the leadership offsite designed for her husband Mr Rahul Kar's team at Ecolab · Mussoorie, March 2026",
        hook: "She didn't go. She heard about it for weeks.",
        review: "“What you have done — he cannot stop talking about you, how you have done everything there. I am quite envious that I missed going.”",
        source: "WhatsApp to Sudip. Confirm with her before publishing.",
    },
    {
        name: "Barnali Mitra",
        descriptor: "Retired Head of Corporate Communication, SAIL, and senior journalist, The Telegraph · Vietnam group departure",
        hook: "From someone who has travelled a great deal.",
        review: "“One of my best trips. Lovely country, Vietnam. So diverse in its beauty.”",
        source: "Bonhomiee Travel Circle.",
    },
]

const extended = [...testimonials, ...testimonials, ...testimonials]

export default function Testimonials() {
    const [index, setIndex] = useState(testimonials.length)
    const [flipped, setFlipped] = useState<number | null>(null)
    const [paused, setPaused] = useState(false)
    const [transition, setTransition] = useState(true)

    const next = () => {
        setFlipped(null)
        setIndex((i) => i + 1)
    }

    const prev = () => {
        setFlipped(null)
        setIndex((i) => i - 1)
    }

    useEffect(() => {
        if (paused || flipped !== null) return
        const timer = setInterval(next, 7500)
        return () => clearInterval(timer)
    }, [paused, flipped])

    const handleTransitionEnd = () => {
        if (index >= testimonials.length * 2) {
            setTransition(false)
            setIndex(testimonials.length)
            requestAnimationFrame(() => setTransition(true))
        }

        if (index < testimonials.length) {
            setTransition(false)
            setIndex(testimonials.length * 2 - 1)
            requestAnimationFrame(() => setTransition(true))
        }
    }

    const progress = ((index - testimonials.length) % testimonials.length + testimonials.length) % testimonials.length
    const progressWidth = ((progress + 1) / testimonials.length) * 100

    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
            <div className="relative mx-auto max-w-6xl px-6 sm:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
                        <div className="relative mx-auto w-fit">
                            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[60px] font-bold uppercase tracking-[0.08em] text-muted/35 sm:text-[100px] lg:text-[145px]">
                                TESTIMONIALS
                            </span>

                            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
                                In their <span className="text-[#10213F]">own words.</span>
                            </h2>
                        </div>
                    </motion.div>
                        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#536174] sm:text-base">
        Nine real reviews, in the clients' own words.
    </motion.p>
                </div>

                <div className="relative mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${index * (100 / 3)}%` }}
                            transition={transition ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                            onAnimationComplete={handleTransitionEnd}
                        >
                            {extended.map((item, i) => {
                                const id = `${item.name}-${i}`
                                const isFlipped = flipped === i

                                return (
                                    <div key={id} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3">
                                        <div className="relative h-[440px] cursor-pointer [perspective:1200px]" onClick={() => setFlipped(isFlipped ? null : i)}>
                                            <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.4 }}>
                                                
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
                                                        <p className="text-[15px] leading-[1.75] text-[#344054] sm:text-base">{item.review}</p>
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
                                <motion.div className="absolute left-0 top-0 h-full bg-[#0E40C7]" animate={{ width: `${progressWidth}%` }} transition={{ duration: 0.4 }} />
                            </div>
                        </div>

                        <div className="flex shrink-0 gap-2">
                            <button type="button" aria-label="Previous testimonial" onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B120B] bg-white text-[#1B120B] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7]">
                                <ChevronLeft size={18} />
                            </button>

                            <button type="button" aria-label="Next testimonial" onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B120B] bg-white text-[#1B120B] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7]">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}