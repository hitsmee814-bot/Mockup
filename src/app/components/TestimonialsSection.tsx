// "use client"

// import { AnimatePresence, motion } from "framer-motion"
// import { useEffect, useState } from "react"
// import { ArrowUpRight, Check, Quote, Star, X } from "lucide-react"

// const testimonials = [
//   {
//     name: "Sarah Mitchell",
//     role: "Product Designer",
//     company: "Stripe",
//     initials: "SM",
//     rating: 5,
//     quote:
//       "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
//     review:
//       "This platform completely transformed how our team collaborates. Before using it, our team was constantly switching between different tools and losing context. Now everything feels connected and effortless.\n\nThe intuitive design was probably the biggest surprise for us. Everyone understood how to use it almost immediately, and the integrations fit naturally into our existing workflow.",
//   },
//   {
//     name: "James Rodriguez",
//     role: "Engineering Lead",
//     company: "Vercel",
//     initials: "JR",
//     rating: 5,
//     quote:
//       "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
//     review:
//       "I've been building software for years and have developed a pretty high bar for the tools my team adopts. This one cleared it immediately.\n\nPerformance is excellent even when we're working with large amounts of data, and the API is clean enough that our engineers actually enjoy integrating with it.",
//   },
//   {
//     name: "Emily Chen",
//     role: "CEO",
//     company: "Acme Corp",
//     initials: "EC",
//     rating: 5,
//     quote:
//       "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise.",
//     review:
//       "We evaluated several products before choosing this one, and the difference became obvious during onboarding.\n\nEverything felt considered. There were no confusing setup screens, no unnecessary complexity, and no awkward handoffs between teams.",
//   },
//   {
//     name: "David Park",
//     role: "Full Stack Developer",
//     company: "Shopify",
//     initials: "DP",
//     rating: 5,
//     quote:
//       "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps.",
//     review:
//       "The developer experience is honestly one of the strongest parts of the product.\n\nThe APIs are predictable, the documentation is actually useful, and examples cover the situations developers run into in the real world.",
//   },
//   {
//     name: "Olivia Turner",
//     role: "Marketing Director",
//     company: "HubSpot",
//     initials: "OT",
//     rating: 5,
//     quote:
//       "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
//     review:
//       "We initially adopted the platform because we wanted better visibility into our campaigns, but the impact went far beyond reporting.\n\nWithin the first month we saw a 40% increase in engagement.",
//   },
//   {
//     name: "Michael Brooks",
//     role: "Founder",
//     company: "Northstar",
//     initials: "MB",
//     rating: 5,
//     quote:
//       "It feels like the team actually thought through every tiny interaction. Beautiful product and exceptional experience.",
//     review:
//       "We've used a lot of products in this category, but this one immediately stood out.\n\nEvery interaction feels deliberate and considered. Nothing feels like it was added simply because competitors had it.",
//   },
// ]

// export default function Testimonials() {
//   const [selected, setSelected] =
//     useState<(typeof testimonials)[number] | null>(null)

//   return (
//     <>
//       <section className="relative overflow-hidden py-20 sm:py-28">
//         {/* =====================================================
//             BACKGROUND
//         ====================================================== */}

//         <div className="pointer-events-none absolute inset-0">
//           <motion.div
//             animate={{
//               opacity: [0.08, 0.14, 0.08],
//               scale: [1, 1.06, 1],
//             }}
//             transition={{
//               duration: 9,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
//           />
//         </div>

//         <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
//           {/* ===================================================
//               HEADER
//           ==================================================== */}

//           <motion.div
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               duration: 0.6,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="mb-12 text-center sm:mb-14"
//           >
//             <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
//               <Quote className="h-3 w-3" />
//               Testimonials
//             </div>

//             <h2 className="text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
//               What people are saying
//             </h2>

//             <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
//               Real experiences from people using the platform every day.
//             </p>
//           </motion.div>

//           {/* ===================================================
//               COMPACT GRID
//           ==================================================== */}

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {testimonials.map((testimonial, index) => (
//               <CompactCard
//                 key={testimonial.name}
//                 testimonial={testimonial}
//                 index={index}
//                 onClick={() => setSelected(testimonial)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* =======================================================
//           DETAIL DIALOG
//       ======================================================== */}

//       <AnimatePresence>
//         {selected && (
//           <ReviewDialog
//             testimonial={selected}
//             onClose={() => setSelected(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// /* ===============================================================
//    COMPACT CARD
// ================================================================ */

// function CompactCard({
//   testimonial,
//   index,
//   onClick,
// }: {
//   testimonial: (typeof testimonials)[number]
//   index: number
//   onClick: () => void
// }) {
//   return (
//     <motion.button
//       type="button"
//       onClick={onClick}
//       initial={{
//         opacity: 0,
//         y: 18,
//       }}
//       whileInView={{
//         opacity: 1,
//         y: 0,
//       }}
//       viewport={{
//         once: true,
//         amount: 0.2,
//       }}
//       transition={{
//         delay: index * 0.06,
//         duration: 0.55,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{
//         y: -5,
//       }}
//       whileTap={{
//         scale: 0.985,
//       }}
//       className="group relative flex h-[205px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 text-left shadow-sm backdrop-blur-xl transition-colors duration-300 hover:border-primary/25 hover:bg-card"
//     >
//       {/* =====================================================
//           HOVER GLOW
//       ====================================================== */}

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//       {/* =====================================================
//           QUOTE MARK
//       ====================================================== */}

//       <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/[0.035] transition-transform duration-500 group-hover:rotate-6" />

//       {/* =====================================================
//           RATING
//       ====================================================== */}

//       <div className="relative mb-3 flex items-center gap-0.5">
//         {Array.from({
//           length: testimonial.rating,
//         }).map((_, i) => (
//           <Star
//             key={i}
//             className="h-3.5 w-3.5 fill-secondary text-secondary"
//           />
//         ))}
//       </div>

//       {/* =====================================================
//           REVIEW
//       ====================================================== */}

//       <p className="relative line-clamp-3 flex-1 text-[14px] font-medium leading-[1.5] tracking-[-0.01em] text-foreground/85">
//         “{testimonial.quote}”
//       </p>

//       {/* =====================================================
//           FOOTER
//       ====================================================== */}

//       <div className="relative mt-4 flex items-center justify-between border-t border-border/60 pt-3.5">
//         <div className="flex min-w-0 items-center gap-2.5">
//           {/* Avatar */}
//           <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[9px] font-bold text-white">
//             {testimonial.initials}

//             <span className="absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-semibold text-foreground">
//               {testimonial.name}
//             </p>

//             <p className="truncate text-[10px] text-muted-foreground">
//               {testimonial.role}
//               <span className="mx-1 opacity-40">·</span>
//               {testimonial.company}
//             </p>
//           </div>
//         </div>

//         {/* Read icon */}
//         <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
//           <ArrowUpRight className="h-3.5 w-3.5" />
//         </div>
//       </div>
//     </motion.button>
//   )
// }

// /* ===============================================================
//    DIALOG
// ================================================================ */

// function ReviewDialog({
//   testimonial,
//   onClose,
// }: {
//   testimonial: (typeof testimonials)[number]
//   onClose: () => void
// }) {
//   useEffect(() => {
//     const previousOverflow = document.body.style.overflow

//     document.body.style.overflow = "hidden"

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose()
//       }
//     }

//     window.addEventListener("keydown", handleKeyDown)

//     return () => {
//       document.body.style.overflow = previousOverflow
//       window.removeEventListener("keydown", handleKeyDown)
//     }
//   }, [onClose])

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
//     >
//       {/* =====================================================
//           BACKDROP
//       ====================================================== */}

//       <motion.button
//         type="button"
//         aria-label="Close review"
//         onClick={onClose}
//         className="absolute inset-0 cursor-default bg-background/75 backdrop-blur-xl"
//       />

//       {/* =====================================================
//           DIALOG
//       ====================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 25,
//           scale: 0.95,
//           filter: "blur(8px)",
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           filter: "blur(0px)",
//         }}
//         exit={{
//           opacity: 0,
//           y: 20,
//           scale: 0.97,
//           filter: "blur(6px)",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 260,
//           damping: 26,
//         }}
//         className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-2xl backdrop-blur-2xl"
//       >
//         {/* Top glow */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/[0.08] to-transparent" />

//         {/* Close */}
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
//         >
//           <X className="h-4 w-4" />
//         </button>

//         {/* Content */}
//         <div className="relative max-h-[85vh] overflow-y-auto p-7 sm:p-9">
//           <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
//             <Quote className="h-5 w-5" />
//           </div>

//           {/* Rating */}
//           <div className="mb-5 flex items-center gap-1">
//             {Array.from({
//               length: testimonial.rating,
//             }).map((_, i) => (
//               <Star
//                 key={i}
//                 className="h-4 w-4 fill-secondary text-secondary"
//               />
//             ))}

//             <span className="ml-2 text-xs text-muted-foreground">
//               Verified customer
//             </span>
//           </div>

//           {/* Main quote */}
//           <h3 className="text-xl font-semibold leading-[1.4] tracking-[-0.025em] text-foreground sm:text-2xl">
//             “{testimonial.quote}”
//           </h3>

//           <div className="my-7 h-px bg-border/70" />

//           {/* Full review */}
//           <div className="space-y-4">
//             {testimonial.review
//               .split("\n\n")
//               .map((paragraph, index) => (
//                 <p
//                   key={index}
//                   className="text-sm leading-7 text-muted-foreground sm:text-[15px]"
//                 >
//                   {paragraph}
//                 </p>
//               ))}
//           </div>

//           {/* Author */}
//           <div className="mt-8 flex items-center gap-3 border-t border-border/70 pt-6">
//             <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
//               {testimonial.initials}

//               <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
//                 <Check className="h-2 w-2 text-white" />
//               </span>
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-foreground">
//                 {testimonial.name}
//               </p>

//               <p className="mt-0.5 text-xs text-muted-foreground">
//                 {testimonial.role}
//                 <span className="mx-1.5 opacity-40">·</span>
//                 {testimonial.company}
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
    ArrowDown,
    ArrowUp,
    MapPin,
    Quote,
    Star,
} from "lucide-react"

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const testimonials = [
    {
        id: 1,
        name: "Ananya Sharma",
        location: "Mumbai, India",
        destination: "Kerala",
        initials: "AS",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
        text: "I usually spend hours trying to figure out where to go and what to book. This completely changed that. It understood what I actually wanted and turned it into a trip that felt like it was made just for me.",
    },
    {
        id: 2,
        name: "Rahul Mehta",
        location: "Bengaluru, India",
        destination: "Ladakh",
        initials: "RM",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85",
        text: "What I loved most was that it never felt like I was choosing from a list of generic packages. Every recommendation felt relevant to the kind of trip I wanted.",
    },
    {
        id: 3,
        name: "Priya Nair",
        location: "Kochi, India",
        destination: "Goa",
        initials: "PN",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
        text: "The whole experience was incredibly simple. I shared what I had in mind, and the platform did the hard work of bringing everything together without making the process complicated.",
    },
    {
        id: 4,
        name: "Arjun Kapoor",
        location: "Delhi, India",
        destination: "Rajasthan",
        initials: "AK",
        rating: 4,
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
        text: "It feels much more personal than the usual travel websites. I could explore ideas without feeling pushed into a particular package or itinerary.",
    },
    {
        id: 5,
        name: "Meera Iyer",
        location: "Chennai, India",
        destination: "Udaipur",
        initials: "MI",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1200&q=85",
        text: "From the first recommendation to the final itinerary, everything felt thoughtful. It saved me time while still giving me the feeling that I had planned the trip myself.",
    },
]

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)

    const previousIndex =
        (activeIndex - 1 + testimonials.length) % testimonials.length

    const nextIndex = (activeIndex + 1) % testimonials.length

    const active = testimonials[activeIndex]
    const previous = testimonials[previousIndex]
    const next = testimonials[nextIndex]

    const goPrevious = () => {
        setActiveIndex(previousIndex)
    }

    const goNext = () => {
        setActiveIndex(nextIndex)
    }

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-none py-16 sm:py-20 lg:py-24"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#479EA8]/[0.045] blur-3xl" />

                <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-[#0E40C7]/[0.025] blur-3xl" />

                <div className="absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-[#FBAB18]/[0.035] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative z-10"
                    >
                        <div className="relative mx-auto w-fit">
                            {/* Background Word */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[60px] font-bold uppercase tracking-[0.08em] text-muted/35 sm:text-[100px] lg:text-[145px]"
                            >
                                TESTIMONIALS
                            </span>

                            {/* Heading */}
                            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
                                What people are{" "}
                                <span className="text-[#0E40C7]">
                                    saying
                                </span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                        }}
                        className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#536174] sm:text-base"
                    >
                        Real experiences from people using the platform every
                        day.
                    </motion.p>
                </div>

                {/* Main testimonial layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                    }}
                    className="mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(380px,0.9fr)_1.1fr] lg:gap-16"
                >
                    {/* ================================================== */}
                    {/* LEFT — VISUAL CAROUSEL */}
                    {/* ================================================== */}
                    <div className="relative mx-auto flex h-[560px] w-full max-w-[500px] items-center lg:mx-0 lg:max-w-none">
                        {/* Arrow Controls */}
                        <div className="absolute -left-1 top-1/2 z-30 flex h-[500px] -translate-y-1/2 flex-col items-center justify-between py-8 sm:-left-3">
                            {/* Previous */}
                            <button
                                type="button"
                                onClick={goPrevious}
                                aria-label="Previous testimonial"
                                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#10213F]/10 bg-white/90 text-[#10213F] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0E40C7]/25 hover:text-[#0E40C7] hover:shadow-lg"
                            >
                                <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            </button>

                            {/* Position */}
                            {/* <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0E40C7] [writing-mode:vertical-rl]">
                                    {String(activeIndex + 1).padStart(
                                        2,
                                        "0",
                                    )}
                                </span>

                                <div className="h-8 w-px bg-[#10213F]/10" />

                                <span className="text-[10px] font-medium tracking-[0.15em] text-[#6B7280] [writing-mode:vertical-rl]">
                                    {String(testimonials.length).padStart(
                                        2,
                                        "0",
                                    )}
                                </span>
                            </div> */}

                            {/* Next */}
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next testimonial"
                                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#10213F]/10 bg-white/90 text-[#10213F] shadow-sm backdrop-blur-md transition-all duration-300 hover:translate-y-1 hover:border-[#0E40C7]/25 hover:text-[#0E40C7] hover:shadow-lg"
                            >
                                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                            </button>
                        </div>

                        {/* Card Stack */}
                        <div className="relative ml-12 h-[500px] w-[calc(100%-48px)]">
                            {/* Top faded card */}
                            <motion.div
                                key={`top-${previous.id}`}
                                initial={{
                                    opacity: 0,
                                    y: -20,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 0.22,
                                    y: -55,
                                    scale: 0.88,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute inset-x-3 top-0 z-0 h-[430px] overflow-hidden rounded-[2rem]"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${previous.image})`,
                                    }}
                                />

                                <div className="absolute inset-0 bg-[#10213F]/50" />

                                <div className="absolute bottom-0 left-0 p-6 text-white">
                                    <p className="text-sm font-semibold">
                                        {previous.destination}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bottom faded card */}
                            <motion.div
                                key={`bottom-${next.id}`}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 0.22,
                                    y: 55,
                                    scale: 0.88,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute inset-x-3 bottom-0 z-0 h-[430px] overflow-hidden rounded-[2rem]"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${next.image})`,
                                    }}
                                />

                                <div className="absolute inset-0 bg-[#10213F]/50" />

                                <div className="absolute bottom-0 left-0 p-6 text-white">
                                    <p className="text-sm font-semibold">
                                        {next.destination}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Active Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.94,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.94,
                                        y: -15,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="absolute inset-0 z-10"
                                >
                                    <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(16,33,63,0.18)]">
                                        {/* Destination Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                            style={{
                                                backgroundImage: `url(${active.image})`,
                                            }}
                                        />

                                        {/* Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#10213F]/95 via-[#10213F]/25 to-transparent" />

                                        {/* Top Tag */}
                                        <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white backdrop-blur-md">
                                            DESTINATION
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
                                            <div className="flex items-center gap-2 text-white/75">
                                                <MapPin className="h-3.5 w-3.5" />

                                                <span className="text-xs font-medium">
                                                    {active.location}
                                                </span>
                                            </div>

                                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                                {active.destination}
                                            </h3>

                                            <div className="mt-5 flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-bold text-white backdrop-blur-md">
                                                    {active.initials}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-white">
                                                        {active.name}
                                                    </p>

                                                    <p className="text-xs text-white/60">
                                                        Traveller
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* RIGHT — TESTIMONIAL */}
                    {/* ================================================== */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`review-${active.id}`}
                            initial={{
                                opacity: 0,
                                x: 30,
                                filter: "blur(5px)",
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)",
                            }}
                            exit={{
                                opacity: 0,
                                x: -30,
                                filter: "blur(5px)",
                            }}
                            transition={{
                                duration: 0.55,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative py-4 lg:py-8"
                        >
                            {/* Quote */}
                            <Quote className="h-12 w-12 fill-[#0E40C7]/10 text-[#0E40C7]/20 sm:h-14 sm:w-14" />

                            {/* Rating */}
                            <div className="mt-7 flex items-center gap-1.5">
                                {Array.from({
                                    length: active.rating,
                                }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className="h-4 w-4 fill-[#FBAB18] text-[#FBAB18]"
                                    />
                                ))}

                                <span className="ml-2 text-xs font-semibold text-[#6B7280]">
                                    {active.rating}.0
                                </span>
                            </div>

                            {/* Main Review */}
                            <blockquote className="mt-7 max-w-3xl text-2xl font-medium leading-[1.4] tracking-tight text-[#10213F] sm:text-3xl lg:text-4xl xl:text-[2.55rem]">
                                “{active.text}”
                            </blockquote>

                            {/* Reviewer */}
                            <div className="mt-10 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E40C7]/10 text-sm font-bold text-[#0E40C7]">
                                    {active.initials}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#10213F]">
                                        {active.name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#6B7280]">
                                        {active.location}
                                    </p>
                                </div>
                            </div>

                            {/* Destination indicator */}
                            <div className="mt-8 flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-[#0E40C7]" />

                                <span className="text-xs font-medium text-[#536174]">
                                    Experience in {active.destination}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-px w-20 bg-[#0E40C7]" />

                                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6B7280]">
                                    {String(activeIndex + 1).padStart(2, "0")}{" "}
                                    /{" "}
                                    {String(testimonials.length).padStart(
                                        2,
                                        "0",
                                    )}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mx-auto mt-16 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#0E40C7]/20 to-transparent"
                />
            </div>
        </section>
    )
}