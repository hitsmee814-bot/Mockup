// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
// import Link from "next/link"

// const testimonials = [
//     {
//         name: "Dr. P.K. Jha",
//         descriptor: "Senior Consultant, Cardiology, at a leading Kolkata hospital · Paris & London, 2025",
//         hook: "He handed over the whole trip. And found the one thing nobody had thought to look for.",
//         review: "“I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.”\n\n“Sudip babu, only you could do this.”",
//         source: "Unsolicited written testimonial.",
//     },
//     {
//         name: "Aniruddha Ghosh Roy",
//         descriptor: "Zonal Sales Head, Indian pharmaceutical company · First-time Europe traveller, with his wife · 16 days, five cities, July 2026",
//         hook: "Two first-time travellers, five countries of trains, every connection timed from Kolkata. It held.",
//         review: "“We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.”",
//         source: "Bonhomiee Travel Circle, July 2026. Has confirmed he is happy to be named.",
//     },
//     {
//         name: "Ananya Choudhury & Ayan Choudhury",
//         descriptor: "Senior executives at a large global IT company · Vietnam group departure",
//         hook: "A group departure that didn't feel like one.",
//         review: "“It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised. — Ananya · It was all the effort from Sudip to make our experience a memorable one. — Ayan”",
//         source: "Bonhomiee Travel Circle and the Vietnam group, after the departure.",
//     },
//     {
//         name: "Joydeep Moitra",
//         descriptor: "Retired Army veteran · Thailand, August 2025 — and Kumaon again, January 2026",
//         hook: "Meticulous planning, local support always in touch, value for money. His words. He travelled with us again five months later.",
//         review: "“Just wished to express my gratitude to Bonhomiee for organising an unforgettable experience at Pattaya and Bangkok. The planning was meticulous and the events organised with optimum utilisation of available time. The local support group was constantly in touch. The tour was affordable and, in the end, value for money.”",
//         source: "Bonhomiee Travel Circle, 19 August 2025. Fifteen reactions. After Kumaon in January: “Thanks for the wonderful time, Sudip. Would cherish it.”",
//     },
//     {
//         name: "Mr. L.S. Shankar",
//         descriptor: "Retired PSU director · Western Arunachal with family, May 2026",
//         hook: "Three generations on some of India's hardest roads. His words for it, afterwards:",
//         review: "“A luxurious nature trail.”",
//         source: "Said to Sudip in person. Confirm before publishing.",
//     },
//     {
//         name: "Sadhna Kar",
//         descriptor: "On the leadership offsite designed for her husband Mr Rahul Kar's team at a global industrial company · Mussoorie, March 2026",
//         hook: "She didn't go. She heard about it for weeks.",
//         review: "“What you have done — he cannot stop talking about you, how you have done everything there. I am quite envious that I missed going.”",
//         source: "WhatsApp to Sudip. Confirm before publishing. Company name deliberately withheld.",
//     },
// ]

// const visibleDesktop = 3

// const desktopClones = testimonials.slice(-visibleDesktop)
// const desktopEndClones = testimonials.slice(0, visibleDesktop)
// const desktopCards = [...desktopClones, ...testimonials, ...desktopEndClones]

// const mobileClones = testimonials.slice(-1)
// const mobileEndClones = testimonials.slice(0, 1)
// const mobileCards = [...mobileClones, ...testimonials, ...mobileEndClones]

// export default function Testimonials() {
//     const [desktopIndex, setDesktopIndex] = useState(visibleDesktop)
//     const [mobileIndex, setMobileIndex] = useState(1)
//     const [desktopFlipped, setDesktopFlipped] = useState<number | null>(null)
//     const [mobileFlipped, setMobileFlipped] = useState<number | null>(null)
//     const [desktopAnimating, setDesktopAnimating] = useState(false)
//     const [mobileAnimating, setMobileAnimating] = useState(false)

//     const nextDesktop = () => {
//         if (desktopAnimating) return
//         setDesktopFlipped(null)
//         setDesktopAnimating(true)
//         setDesktopIndex((prev) => prev + 1)
//     }

//     const prevDesktop = () => {
//         if (desktopAnimating) return
//         setDesktopFlipped(null)
//         setDesktopAnimating(true)
//         setDesktopIndex((prev) => prev - 1)
//     }

//     const handleDesktopAnimationEnd = () => {
//         if (desktopIndex >= testimonials.length + visibleDesktop) {
//             setDesktopIndex(visibleDesktop)
//         }

//         if (desktopIndex < visibleDesktop) {
//             setDesktopIndex(testimonials.length + visibleDesktop - 1)
//         }

//         setDesktopAnimating(false)
//     }

//     const nextMobile = () => {
//         if (mobileAnimating) return
//         setMobileFlipped(null)
//         setMobileAnimating(true)
//         setMobileIndex((prev) => prev + 1)
//     }

//     const prevMobile = () => {
//         if (mobileAnimating) return
//         setMobileFlipped(null)
//         setMobileAnimating(true)
//         setMobileIndex((prev) => prev - 1)
//     }

//     const handleMobileAnimationEnd = () => {
//         if (mobileIndex >= testimonials.length + 1) {
//             setMobileIndex(1)
//         }

//         if (mobileIndex < 1) {
//             setMobileIndex(testimonials.length)
//         }

//         setMobileAnimating(false)
//     }

//     const desktopRealIndex = ((desktopIndex - visibleDesktop) % testimonials.length + testimonials.length) % testimonials.length
//     const mobileRealIndex = ((mobileIndex - 1) % testimonials.length + testimonials.length) % testimonials.length

//     const desktopProgress = ((desktopRealIndex + 1) / testimonials.length) * 100
//     const mobileProgress = ((mobileRealIndex + 1) / testimonials.length) * 100

//     return (
//         <section className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
//             <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
//                 {/* Heading */}
//                 <div className="mx-auto max-w-4xl text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                         className="relative z-10"
//                     >
//                         <div className="relative mx-auto w-fit">
//                             {/* Background Word */}
//                             {/* <span
//                                 aria-hidden="true"
//                                 className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[60px] font-bold uppercase tracking-[0.08em] text-muted/35 sm:text-[100px] lg:text-[145px]"
//                             >
//                                 TESTIMONIALS
//                             </span> */}

//                             <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
//                                 In their <span className="text-[#FBAB18]">own words.</span>
//                             </h2>
//                         </div>
//                     </motion.div>

//                     <motion.p
//                         initial={{ opacity: 0, y: 15 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                         transition={{ duration: 0.6, delay: 0.1 }}
//                         className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-[#536174] sm:mt-12 sm:text-base"
//                     >
//                         Real journeys. Real words. Shared by the people who travelled with us.
//                     </motion.p>
//                 </div>

//                 {/* Desktop / Tablet Carousel */}
//                 <div className="relative mt-12 hidden md:block lg:mt-16">
//                     <div className="overflow-hidden">
//                         <motion.div
//                             className="flex"
//                             animate={{ x: `-${desktopIndex * (100 / 3)}%` }}
//                             transition={desktopAnimating ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
//                             onAnimationComplete={handleDesktopAnimationEnd}
//                         >
//                             {desktopCards.map((item, i) => {
//                                 const isFlipped = desktopFlipped === i

//                                 return (
//                                     <div key={`${item.name}-desktop-${i}`} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3">
//                                         <div
//                                             className="relative h-[440px] cursor-pointer [perspective:1200px]"
//                                             onClick={() => setDesktopFlipped(isFlipped ? null : i)}
//                                         >
//                                             <motion.div
//                                                 className="relative h-full w-full [transform-style:preserve-3d]"
//                                                 animate={{ rotateY: isFlipped ? 180 : 0 }}
//                                                 transition={{ duration: 0.4 }}
//                                             >
//                                                 {/* Front */}
//                                                 <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-8 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden] sm:p-9">
//                                                     <div className="flex items-center justify-between">
//                                                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E40C7]/10">
//                                                             <Quote size={17} className="text-[#0E40C7]" />
//                                                         </div>

//                                                         <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9AA4B2]">
//                                                             Tap to read
//                                                         </span>
//                                                     </div>

//                                                     <div className="mt-7">
//                                                         <h3 className="text-lg font-semibold tracking-tight text-[#10213F] sm:text-xl">
//                                                             {item.name}
//                                                         </h3>

//                                                         <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-[#7A8494] sm:text-[13px]">
//                                                             {item.descriptor}
//                                                         </p>
//                                                     </div>

//                                                     <div className="mt-auto">
//                                                         <div className="mb-5 h-[2px] w-10 bg-[#FBAB18]" />

//                                                         <p className="text-xl font-semibold leading-[1.35] tracking-tight text-[#FBAB18] sm:text-[22px]">
//                                                             {item.hook}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Back */}
//                                                 <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-8 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9">
//                                                     <p className="text-base font-semibold leading-snug text-[#FBAB18] sm:text-lg">
//                                                         {item.hook}
//                                                     </p>

//                                                     <div className="mt-5 h-px w-full bg-[#E7EBF1]" />

//                                                     <div className="mt-7 flex-1 overflow-y-auto">
//                                                         {item.review.split("\n\n").map((text, i) => (
//                                                             <p key={i} className="mb-4 text-[15px] leading-[1.75] text-[#344054] last:mb-0 sm:text-base">
//                                                                 {text}
//                                                             </p>
//                                                         ))}
//                                                     </div>

//                                                     {/* Source intentionally hidden */}
//                                                     {/* <div className="mt-5 border-t border-[#E7EBF1] pt-4">
//                                                         <p className="text-[10px] leading-relaxed text-[#8993A3] sm:text-[11px]">
//                                                             {item.source}
//                                                         </p>
//                                                     </div> */}
//                                                 </div>
//                                             </motion.div>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </motion.div>
//                     </div>

//                     {/* Desktop Controls */}
//                     <div className="mt-9 flex items-center gap-6">
//                         <div className="flex-1">
//                             <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#E7EBF1]">
//                                 <motion.div
//                                     className="absolute left-0 top-0 h-full bg-[#757C86]"
//                                     animate={{ width: `${desktopProgress}%` }}
//                                     transition={{ duration: 0.4 }}
//                                 />
//                             </div>
//                         </div>

//                         <Link
//                             href="/testimonials"
//                             className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-[#10213F] transition-colors duration-300 hover:text-[#0E40C7]"
//                         >
//                             Read More
//                             <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//                         </Link>

//                         <div className="flex shrink-0 gap-2">
//                             <button
//                                 type="button"
//                                 aria-label="Previous testimonial"
//                                 onClick={prevDesktop}
//                                 disabled={desktopAnimating}
//                                 className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40"
//                             >
//                                 <ChevronLeft size={18} />
//                             </button>

//                             <button
//                                 type="button"
//                                 aria-label="Next testimonial"
//                                 onClick={nextDesktop}
//                                 disabled={desktopAnimating}
//                                 className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:bg-white hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40"
//                             >
//                                 <ChevronRight size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Carousel */}
//                 <div className="relative mt-10 md:hidden">
//                     <div className="overflow-hidden">
//                         <motion.div
//                             className="flex"
//                             animate={{ x: `-${mobileIndex * 100}%` }}
//                             transition={mobileAnimating ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
//                             onAnimationComplete={handleMobileAnimationEnd}
//                         >
//                             {mobileCards.map((item, i) => {
//                                 const isFlipped = mobileFlipped === i

//                                 return (
//                                     <div key={`${item.name}-mobile-${i}`} className="w-full shrink-0 px-1">
//                                         <div
//                                             className="relative h-[400px] cursor-pointer [perspective:1200px]"
//                                             onClick={() => setMobileFlipped(isFlipped ? null : i)}
//                                         >
//                                             <motion.div
//                                                 className="relative h-full w-full [transform-style:preserve-3d]"
//                                                 animate={{ rotateY: isFlipped ? 180 : 0 }}
//                                                 transition={{ duration: 0.4 }}
//                                             >
//                                                 {/* Front */}
//                                                 <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-6 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden]">
//                                                     <div className="flex items-center justify-between">
//                                                         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E40C7]/10">
//                                                             <Quote size={16} className="text-[#0E40C7]" />
//                                                         </div>

//                                                         <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#9AA4B2]">
//                                                             Tap to read
//                                                         </span>
//                                                     </div>

//                                                     <div className="mt-6">
//                                                         <h3 className="text-lg font-semibold leading-tight tracking-tight text-[#10213F]">
//                                                             {item.name}
//                                                         </h3>

//                                                         <p className="mt-2 line-clamp-5 text-[11px] leading-relaxed text-[#7A8494]">
//                                                             {item.descriptor}
//                                                         </p>
//                                                     </div>

//                                                     <div className="mt-auto">
//                                                         <div className="mb-4 h-[2px] w-9 bg-[#FBAB18]" />

//                                                         <p className="text-lg font-semibold leading-[1.4] tracking-tight text-[#FBAB18]">
//                                                             {item.hook}
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Back */}
//                                                 <div className="absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-[#E7EBF1] bg-[#FAFBFC] p-6 shadow-[0_12px_40px_rgba(16,33,63,0.06)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
//                                                     <p className="text-base font-semibold leading-snug text-[#FBAB18]">
//                                                         {item.hook}
//                                                     </p>

//                                                     <div className="mt-4 h-px w-full bg-[#E7EBF1]" />

//                                                     <div className="mt-5 flex-1 overflow-y-auto pr-1">
//                                                         {item.review.split("\n\n").map((text, i) => (
//                                                             <p key={i} className="mb-4 text-sm leading-[1.65] text-[#344054] last:mb-0">
//                                                                 {text}
//                                                             </p>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </motion.div>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </motion.div>
//                     </div>

//                     {/* Mobile Controls */}
//                     <div className="mt-6 flex items-center gap-4">
//                         <button
//                             type="button"
//                             aria-label="Previous testimonial"
//                             onClick={prevMobile}
//                             disabled={mobileAnimating}
//                             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40"
//                         >
//                             <ChevronLeft size={17} />
//                         </button>

//                         <div className="flex-1">
//                             <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#E7EBF1]">
//                                 <motion.div
//                                     className="absolute left-0 top-0 h-full bg-[#757C86]"
//                                     animate={{ width: `${mobileProgress}%` }}
//                                     transition={{ duration: 0.4 }}
//                                 />
//                             </div>
//                         </div>

//                         <span className="shrink-0 text-[10px] font-medium tracking-[0.12em] text-[#9AA4B2]">
//                             {mobileRealIndex + 1} / {testimonials.length}
//                         </span>

//                         <button
//                             type="button"
//                             aria-label="Next testimonial"
//                             onClick={nextMobile}
//                             disabled={mobileAnimating}
//                             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDE2E9] bg-white text-[#10213F] transition-all duration-300 hover:border-[#0E40C7] hover:text-[#0E40C7] disabled:pointer-events-none disabled:opacity-40"
//                         >
//                             <ChevronRight size={17} />
//                         </button>
//                     </div>

//                     {/* Mobile Read More */}
//                     <div className="mt-5 flex justify-center">
//                         <Link
//                             href="/testimonials"
//                             className="group flex items-center gap-2 text-xs font-semibold text-[#10213F] transition-colors duration-300 hover:text-[#0E40C7]"
//                         >
//                             Read More
//                             <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, ArrowDown, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    name: "Dr. P.K. Jha",
    descriptor:
      "Senior Consultant, Cardiology, at a leading Kolkata hospital · Paris & London, 2025",
    hook:
      "He handed over the whole trip. And found the one thing nobody had thought to look for.",
    review:
      "I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.",
    quote: "Sudip babu, only you could do this.",
    source: "Unsolicited written testimonial.",
    location: "Paris & London",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Aniruddha Ghosh Roy",
    descriptor:
      "Zonal Sales Head, Indian pharmaceutical company · First-time Europe traveller, with his wife · 16 days, five cities, July 2026",
    hook:
      "Two first-time travellers, five countries of trains, every connection timed from Kolkata. It held.",
    review:
      "We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.",
    quote: "",
    source: "Bonhomiee Travel Circle, July 2026.",
    location: "Europe",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Ananya Choudhury & Ayan Choudhury",
    descriptor:
      "Senior executives at a large global IT company · Vietnam group departure",
    hook: "A group departure that didn't feel like one.",
    review:
      "It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised.",
    quote:
      "It was all the effort from Sudip to make our experience a memorable one.",
    source: "Bonhomiee Travel Circle and the Vietnam group.",
    location: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Joydeep Moitra",
    descriptor:
      "Retired Army veteran · Thailand, August 2025 — and Kumaon again, January 2026",
    hook:
      "Meticulous planning, local support always in touch, value for money. His words. He travelled with us again five months later.",
    review:
      "Just wished to express my gratitude to Bonhomiee for organising an unforgettable experience at Pattaya and Bangkok. The planning was meticulous and the events organised with optimum utilisation of available time. The local support group was constantly in touch. The tour was affordable and, in the end, value for money.",
    quote: "Thanks for the wonderful time, Sudip. Would cherish it.",
    source: "Bonhomiee Travel Circle, 19 August 2025.",
    location: "Thailand",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Mr. L.S. Shankar",
    descriptor:
      "Retired PSU director · Western Arunachal with family, May 2026",
    hook:
      "Three generations on some of India's hardest roads. His words for it, afterwards:",
    review: "A luxurious nature trail.",
    quote: "",
    source: "Said to Sudip in person. Confirm before publishing.",
    location: "Arunachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Sadhna Kar",
    descriptor:
      "On the leadership offsite designed for her husband Mr Rahul Kar's team at a global industrial company · Mussoorie, March 2026",
    hook: "She didn't go. She heard about it for weeks.",
    review:
      "What you have done — he cannot stop talking about you, how you have done everything there. I am quite envious that I missed going.",
    quote: "",
    source: "WhatsApp to Sudip. Company name deliberately withheld.",
    location: "Mussoorie",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=85",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const current = testimonials[active]
  const nextCard = testimonials[(active + 1) % testimonials.length]

  const next = () => {
    setDirection(1)
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const previous = () => {
    setDirection(-1)
    setActive(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl"
          >
            In their <span className="text-[#FBAB18]">own words.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#536174] sm:text-base"
          >
            Real journeys. Real words. Shared by the people who travelled with us.
          </motion.p>
        </div>

        {/* MAIN CAROUSEL */}
        <div className="mx-auto mt-10 max-w-5xl sm:mt-12 lg:mt-14">

          <div className="grid items-center grid-cols-[48px_270px_1fr] gap-5 sm:grid-cols-[52px_290px_1fr] sm:gap-7 lg:grid-cols-[56px_310px_1fr] lg:gap-9">

            {/* LEFT — VERTICAL CONTROLS */}
            <div className="flex flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DDE2E9] bg-[#F7F8FA] text-[#10213F] shadow-sm transition-all duration-200 hover:border-[#FBAB18] hover:bg-[#FBAB18]"
              >
                <ArrowUp size={18} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E40C7] text-white shadow-sm transition-all duration-200 hover:bg-[#0b36a8]"
              >
                <ArrowDown size={18} strokeWidth={1.8} />
              </button>
            </div>

            {/* CENTER — VERTICAL IMAGE CARDS */}
            <div className="relative h-[430px]">

              {/* NEXT CARD */}
              <motion.div
                key={`next-${nextCard.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ duration: 0.25 }}
                className="absolute left-2 top-[375px] h-[190px] w-full overflow-hidden rounded-2xl border border-[#E5E8ED] bg-[#F5F6F8]"
              >
                <Image
                  src={nextCard.image}
                  alt=""
                  fill
                  sizes="310px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-white/45" />
              </motion.div>

              {/* ACTIVE CARD */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.name}
                  initial={{
                    opacity: 0,
                    y: direction > 0 ? 14 : -14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: direction > 0 ? -14 : 14,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute left-0 top-0 z-10 h-[355px] w-full overflow-hidden rounded-2xl border border-[#E5E8ED] bg-white shadow-[0_15px_40px_rgba(16,33,63,0.10)]"
                >
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="310px"
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/70">
                      <MapPin size={11} />
                      {current.location}
                    </div>

                    <h3 className="text-lg font-semibold leading-tight text-white">
                      {current.name}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* RIGHT — REVIEW */}
            <div className="min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.name}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 12 : -12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -12 : 12,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >

                  {/* LABEL */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-[#FBAB18]" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FBAB18]">
                      From our travellers
                    </span>
                  </div>

                  {/* HOOK */}
                  <h3 className="max-w-2xl text-2xl font-semibold leading-[1.18] tracking-tight text-[#10213F] sm:text-3xl lg:text-[34px]">
                    {current.hook}
                  </h3>

                  {/* PERSON */}
                  <div className="mt-5 border-l-2 border-[#0E40C7] pl-4">
                    <p className="text-sm font-semibold text-[#10213F]">
                      {current.name}
                    </p>

                    <p className="mt-1 max-w-xl text-xs leading-5 text-[#7A8494]">
                      {current.descriptor}
                    </p>
                  </div>

                  {/* REVIEW */}
                  <div className="mt-6 max-w-2xl">
                    <p className="text-sm leading-7 text-[#344054] sm:text-[15px]">
                      “{current.review}”
                    </p>

                    {current.quote && (
                      <p className="mt-4 text-sm font-medium italic leading-6 text-[#0E40C7]">
                        “{current.quote}”
                      </p>
                    )}
                  </div>

                  {/* SOURCE */}
                  {/* <div className="mt-5 flex items-center gap-3">
                    <span className="h-px w-7 bg-[#DDE2E9]" />

                    <p className="text-[10px] leading-4 text-[#9AA4B2]">
                      {current.source}
                    </p>
                  </div> */}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* READ MORE */}
          <div className="mt-7 flex justify-end border-t border-[#E7EBF1] pt-5">
            <Link
              href="/testimonials"
              className="group flex items-center gap-2 text-xs font-semibold text-[#10213F] transition-colors duration-200 hover:text-[#0E40C7]"
            >
              Read More
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}