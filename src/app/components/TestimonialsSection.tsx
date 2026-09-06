// "use client"

// import { useCallback, useEffect, useState } from "react"
// import useEmblaCarousel from "embla-carousel-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight, MessageSquareQuote, Mic, Quote, Sparkles, Speaker, Star } from "lucide-react"

// const testimonials = [
//   {
//     name: "Sarah Mitchell",
//     role: "Product Designer",
//     company: "Stripe",
//     avatar: "SM",
//     rating: 5,
//     text: "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
//   },
//   {
//     name: "James Rodriguez",
//     role: "Engineering Lead",
//     company: "Vercel",
//     avatar: "JR",
//     rating: 5,
//     text: "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
//   },
//   {
//     name: "Emily Chen",
//     role: "CEO",
//     company: "Acme Corp",
//     avatar: "EC",
//     rating: 5,
//     text: "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise — this one does.",
//   },
//   {
//     name: "David Park",
//     role: "Full Stack Developer",
//     company: "Shopify",
//     avatar: "DP",
//     rating: 4,
//     text: "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps. Highly recommend for any serious project.",
//   },
//   {
//     name: "Olivia Turner",
//     role: "Marketing Director",
//     company: "HubSpot",
//     avatar: "OT",
//     rating: 5,
//     text: "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
//   },
// ]

// export default function Testimonials() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
//   const [selectedIndex, setSelectedIndex] = useState(0)

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return
//     setSelectedIndex(emblaApi.selectedScrollSnap())
//   }, [emblaApi])

//   useEffect(() => {
//     if (!emblaApi) return
//     onSelect()
//     emblaApi.on("select", onSelect)
//     return () => { emblaApi.off("select", onSelect) }
//   }, [emblaApi, onSelect])

//   const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
//   const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
//   const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

//   return (
//     <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
//       {/* Background glow */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
//       </div>

//       <div className="relative max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12 sm:mb-16"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5"
//           >
//             <MessageSquareQuote className="h-3 w-3" />
//             Testimonials
//           </motion.div>          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
//             Loved by <span className="text-primary">thousands</span>
//           </h2>
//           <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
//             See what our customers have to say about their experience.
//           </p>
//         </motion.div>

//         {/* Carousel */}
//         <div className="relative">
//           {/* Nav buttons */}
//           <button
//             onClick={scrollPrev}
//             className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 size-10 sm:size-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
//           >
//             <ChevronLeft className="size-5" />
//           </button>
//           <button
//             onClick={scrollNext}
//             className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 size-10 sm:size-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
//           >
//             <ChevronRight className="size-5" />
//           </button>

//           <div className="overflow-hidden mx-10 sm:mx-14" ref={emblaRef}>
//             <div className="flex">
//               {testimonials.map((t, i) => (
//                 <div key={i} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 py-6">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       animate={
//                         selectedIndex === i
//                           ? { y: -12, scale: 1.03, opacity: 1 }
//                           : { y: 0, scale: 0.97, opacity: 0.7 }
//                       }
//                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                       className={`relative h-full rounded-2xl border p-6 sm:p-8 transition-colors duration-300 ${
//                         selectedIndex === i
//                           ? "bg-card border-primary/40 shadow-xl shadow-primary/5"
//                           : "bg-card/60 border-border shadow-md"
//                       }`}
//                     >
//                       <Quote className="size-8 text-primary/20 absolute top-5 right-5" />

//                       {/* Stars */}
//                       <div className="flex gap-0.5 mb-4">
//                         {Array.from({ length: t.rating }).map((_, j) => (
//                           <Star key={j} className="size-4 fill-secondary text-secondary" />
//                         ))}
//                       </div>

//                       {/* Quote */}
//                       <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
//                         &ldquo;{t.text}&rdquo;
//                       </p>

//                       {/* Author */}
//                       <div className="flex items-center gap-3 mt-auto">
//                         <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
//                           {t.avatar}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-sm text-foreground">{t.name}</p>
//                           <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-8">
//           {testimonials.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => scrollTo(i)}
//               className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
//                 selectedIndex === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }





// "use client"

// import { useEffect, useState } from "react"
// import { AnimatePresence, motion } from "framer-motion"
// import {
//   ArrowUpRight,
//   Check,
//   Quote,
//   Star,
//   X,
// } from "lucide-react"

// const testimonials = [
//   {
//     name: "Sarah Mitchell",
//     role: "Product Designer",
//     company: "Stripe",
//     initials: "SM",
//     rating: 5,
//     quote:
//       "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
//     fullReview:
//       "This platform completely transformed how our team collaborates. Before using it, our team was constantly switching between different tools and losing context. Now everything feels connected and effortless.\n\nThe intuitive design was probably the biggest surprise for us. Everyone understood how to use it almost immediately, and the integrations fit naturally into our existing workflow.\n\nWe've saved countless hours every week and, more importantly, our team feels much more aligned. It's become one of those tools that you don't realize how much you depend on until you have it.",
//   },
//   {
//     name: "James Rodriguez",
//     role: "Engineering Lead",
//     company: "Vercel",
//     initials: "JR",
//     rating: 5,
//     quote:
//       "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
//     fullReview:
//       "I've been building software for years and have developed a pretty high bar for the tools my team adopts. This one cleared it immediately.\n\nPerformance is excellent even when we're working with large amounts of data, and the API is clean enough that our engineers actually enjoy integrating with it.\n\nBut what really separates the platform is the support. When we ran into an unusual issue, the response was fast, technically detailed, and genuinely helpful. That's incredibly rare.",
//   },
//   {
//     name: "Emily Chen",
//     role: "CEO",
//     company: "Acme Corp",
//     initials: "EC",
//     rating: 5,
//     quote:
//       "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise — this one does.",
//     fullReview:
//       "We evaluated several products before choosing this one, and the difference became obvious during onboarding.\n\nEverything felt considered. There were no confusing setup screens, no unnecessary complexity, and no awkward handoffs between teams.\n\nMonths later, that attention to detail is still visible in the everyday experience. It's rare to find a product that actually delivers on the promises made during the sales process. This one does.",
//   },
//   {
//     name: "David Park",
//     role: "Full Stack Developer",
//     company: "Shopify",
//     initials: "DP",
//     rating: 4,
//     quote:
//       "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps.",
//     fullReview:
//       "The developer experience is honestly one of the strongest parts of the product.\n\nThe APIs are predictable, the documentation is actually useful, and examples cover the situations developers run into in the real world rather than just demonstrating basic functionality.\n\nThe community is another major advantage. Questions usually get answered quickly and discussions tend to be genuinely useful rather than promotional.",
//   },
//   {
//     name: "Olivia Turner",
//     role: "Marketing Director",
//     company: "HubSpot",
//     initials: "OT",
//     rating: 5,
//     quote:
//       "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
//     fullReview:
//       "We initially adopted the platform because we wanted better visibility into our campaigns, but the impact went far beyond reporting.\n\nWithin the first month we saw a 40% increase in engagement. Having everything in one place made it much easier to identify what was working and quickly adjust what wasn't.\n\nThe analytics dashboard alone would justify the investment for us. It gives our team the clarity we need without requiring someone to spend hours building reports.",
//   },
// ]

// /*
//  * How far one complete set of cards travels.
//  *
//  * Card width = 380px
//  * Gap = 24px
//  * 5 cards = 5 * 404 = 2020px
//  */
// const CARD_WIDTH = 380
// const GAP = 24
// const SET_WIDTH = (CARD_WIDTH + GAP) * testimonials.length

// export default function Testimonials() {
//   const [selected, setSelected] =
//     useState<(typeof testimonials)[number] | null>(null)

//   /*
//    * We render several copies.
//    *
//    * The animation moves exactly one SET_WIDTH.
//    * Because the next set is identical, the reset is invisible.
//    */
//   const cards = [
//     ...testimonials,
//     ...testimonials,
//     ...testimonials,
//     ...testimonials,
//   ]

//   return (
//     <>
//       <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
//         {/* =========================================================
//             BACKGROUND
//         ========================================================== */}

//         <div className="pointer-events-none absolute inset-0">
//           <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[150px]" />

//           <div className="absolute left-[15%] top-[30%] h-[200px] w-[200px] rounded-full bg-primary/[0.04] blur-[100px]" />

//           <div className="absolute right-[10%] top-[50%] h-[250px] w-[250px] rounded-full bg-secondary/[0.04] blur-[110px]" />
//         </div>

//         <div className="relative">
//           {/* =======================================================
//               HEADER
//           ======================================================== */}

//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 24,
//             }}
//             whileInView={{
//               opacity: 1,
//               y: 0,
//             }}
//             viewport={{
//               once: true,
//               amount: 0.3,
//             }}
//             transition={{
//               duration: 0.65,
//               ease: "easeOut",
//             }}
//             className="mx-auto mb-16 max-w-3xl px-4 text-center sm:mb-20"
//           >
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
//               <Quote className="h-3.5 w-3.5" />
//               Customer stories
//             </div>

//             <h2 className="text-4xl font-bold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
//               Loved by people who{" "}
//               <span className="text-primary">build.</span>
//             </h2>

//             <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
//               Real experiences from people using the platform every
//               day.
//             </p>
//           </motion.div>

//           {/* =======================================================
//               CAROUSEL STAGE
//           ======================================================== */}

//           <div className="relative">
//   {/* =========================================================
//       LEFT FADE
//   ========================================================== */}

//   <div
//     className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[28%] sm:w-[22%] lg:w-[18%]"
//     style={{
//       background: `
//         linear-gradient(
//           to right,
//           hsl(var(--background)) 0%,
//           hsl(var(--background) / 0.98) 12%,
//           hsl(var(--background) / 0.85) 28%,
//           hsl(var(--background) / 0.55) 48%,
//           hsl(var(--background) / 0.2) 72%,
//           transparent 100%
//         )
//       `,
//     }}
//   />

//   {/* =========================================================
//       RIGHT FADE
//   ========================================================== */}

//   <div
//     className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[28%] sm:w-[22%] lg:w-[18%]"
//     style={{
//       background: `
//         linear-gradient(
//           to left,
//           hsl(var(--background)) 0%,
//           hsl(var(--background) / 0.98) 12%,
//           hsl(var(--background) / 0.85) 28%,
//           hsl(var(--background) / 0.55) 48%,
//           hsl(var(--background) / 0.2) 72%,
//           transparent 100%
//         )
//       `,
//     }}
//   />

//   {/* =========================================================
//       EXTRA SOFT BLUR AT EDGES
//   ========================================================== */}

//   <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12%] backdrop-blur-[3px]" />

//   <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12%] backdrop-blur-[3px]" />

//   {/* =========================================================
//       MOVING CARDS
//   ========================================================== */}

//   <div className="overflow-hidden py-16">
//     <div className="testimonial-marquee">
//       {cards.map((testimonial, index) => (
//         <TestimonialCard
//           key={`${testimonial.name}-${index}`}
//           testimonial={testimonial}
//           onClick={() => setSelected(testimonial)}
//         />
//       ))}
//     </div>
//   </div>
// </div>

//           {/* =======================================================
//               HINT
//           ======================================================== */}

//           <motion.div
//             initial={{
//               opacity: 0,
//             }}
//             whileInView={{
//               opacity: 1,
//             }}
//             viewport={{
//               once: true,
//             }}
//             transition={{
//               delay: 0.4,
//               duration: 0.5,
//             }}
//             className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground"
//           >
//             <span className="h-px w-8 bg-border" />
//           </motion.div>
//         </div>
//       </section>

//       {/* ===========================================================
//           DIALOG
//       ============================================================ */}

//       <AnimatePresence>
//         {selected && (
//           <ReviewDialog
//             testimonial={selected}
//             onClose={() => setSelected(null)}
//           />
//         )}
//       </AnimatePresence>

//       {/* ===========================================================
//           GLOBAL MARQUEE STYLES
//       ============================================================ */}

//       <style jsx global>{`
//         /*
//          * ----------------------------------------------------------
//          * THE IMPORTANT PART
//          * ----------------------------------------------------------
//          *
//          * This is a native CSS animation.
//          *
//          * There is NO Framer Motion animation on the moving rail.
//          * That means the browser can keep this on the compositor
//          * and continuously animate translate3d without React or
//          * JavaScript being involved.
//          */

//         .testimonial-marquee {
//           display: flex;
//           width: max-content;

//           /*
//            * Move exactly one complete set.
//            */
//           animation: testimonial-scroll 32s linear infinite;

//           /*
//            * GPU compositing.
//            */
//           transform: translate3d(0, 0, 0);
//           will-change: transform;

//           /*
//            * Prevent tiny sub-pixel layout artifacts.
//            */
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//         }

//         /*
//          * ----------------------------------------------------------
//          * PAUSE THE ENTIRE RAIL
//          * ----------------------------------------------------------
//          *
//          * Unlike changing animation duration or using React state,
//          * this instantly freezes the exact current position.
//          *
//          * No slowing down.
//          * No reversing.
//          * No interpolation.
//          */
//         .testimonial-marquee:hover {
//           animation-play-state: paused;
//         }

//         /*
//          * ----------------------------------------------------------
//          * LOOP
//          * ----------------------------------------------------------
//          *
//          * Because we render identical copies, moving exactly
//          * SET_WIDTH produces a visually identical frame.
//          */
//         @keyframes testimonial-scroll {
//           from {
//             transform: translate3d(0, 0, 0);
//           }

//           to {
//             transform: translate3d(-${SET_WIDTH}px, 0, 0);
//           }
//         }

//         /*
//          * ----------------------------------------------------------
//          * MOBILE
//          * ----------------------------------------------------------
//          *
//          * Slightly slower on smaller screens.
//          */
//         @media (max-width: 640px) {
//           .testimonial-marquee {
//             animation-duration: 36s;
//           }
//         }

//         /*
//          * ----------------------------------------------------------
//          * ACCESSIBILITY
//          * ----------------------------------------------------------
//          */

//         @media (prefers-reduced-motion: reduce) {
//           .testimonial-marquee {
//             animation-play-state: paused;
//           }
//         }
//       `}</style>
//     </>
//   )
// }

// /* =================================================================
//    CARD
// ================================================================= */

// function TestimonialCard({
//   testimonial,
//   onClick,
// }: {
//   testimonial: (typeof testimonials)[number]
//   onClick: () => void
// }) {
//   return (
//     /*
//      * IMPORTANT:
//      *
//      * The OUTER element is part of the moving rail.
//      *
//      * We NEVER animate its transform on hover.
//      *
//      * The INNER element handles the hover movement.
//      *
//      * This completely separates:
//      *
//      *      rail movement
//      *
//      * from
//      *
//      *      card hover movement
//      */
//     <div
//       className="shrink-0"
//       style={{
//         width: CARD_WIDTH,
//         marginRight: GAP,
//       }}
//     >
//       <motion.button
//         type="button"
//         onClick={onClick}
//         whileHover={{
//           y: -14,
//           scale: 1.025,
//         }}
//         whileTap={{
//           scale: 0.985,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 300,
//           damping: 24,
//           mass: 0.7,
//         }}
//         className="group relative flex h-[340px] w-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/95 p-7 text-left shadow-xl shadow-black/[0.045] backdrop-blur-xl sm:h-[355px] sm:p-8"
//       >
//         {/* =========================================================
//             HOVER LIGHT
//         ========================================================== */}

//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.09] via-transparent to-secondary/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//         {/* =========================================================
//             TOP HIGHLIGHT
//         ========================================================== */}

//         <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//         {/* =========================================================
//             QUOTE
//         ========================================================== */}

//         <Quote className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 text-primary/[0.045] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" />

//         {/* =========================================================
//             STARS
//         ========================================================== */}

//         <div className="relative mb-7 flex items-center gap-1">
//           {Array.from({
//             length: testimonial.rating,
//           }).map((_, index) => (
//             <Star
//               key={index}
//               className="h-4 w-4 fill-secondary text-secondary"
//             />
//           ))}
//         </div>

//         {/* =========================================================
//             QUOTE
//         ========================================================== */}

//         <p className="relative line-clamp-4 flex-1 text-lg font-medium leading-[1.5] tracking-[-0.018em] text-foreground/90">
//           “{testimonial.quote}”
//         </p>

//         {/* =========================================================
//             AUTHOR
//         ========================================================== */}

//         <div className="relative mt-7 flex items-center justify-between border-t border-border/70 pt-5">
//           <div className="flex items-center gap-3">
//             {/* Avatar */}
//             <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-lg shadow-primary/20">
//               {testimonial.initials}

//               <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
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

//           {/* =======================================================
//               READ MORE
//           ======================================================== */}

//           <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
//             <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//           </div>
//         </div>
//       </motion.button>
//     </div>
//   )
// }

// /* =================================================================
//    DETAIL DIALOG
// ================================================================= */

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
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//       }}
//       transition={{
//         duration: 0.25,
//       }}
//       className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
//       role="dialog"
//       aria-modal="true"
//     >
//       {/* =========================================================
//           BACKDROP
//       ========================================================== */}

//       <motion.button
//         type="button"
//         aria-label="Close review"
//         onClick={onClose}
//         className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-xl"
//       />

//       {/* =========================================================
//           AMBIENT LIGHT
//       ========================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           scale: 0.7,
//         }}
//         animate={{
//           opacity: 0.55,
//           scale: 1,
//         }}
//         exit={{
//           opacity: 0,
//           scale: 0.8,
//         }}
//         transition={{
//           duration: 0.7,
//         }}
//         className="pointer-events-none absolute h-[550px] w-[750px] rounded-full bg-primary/10 blur-[140px]"
//       />

//       {/* =========================================================
//           DIALOG
//       ========================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 35,
//           scale: 0.94,
//           filter: "blur(12px)",
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           filter: "blur(0px)",
//         }}
//         exit={{
//           opacity: 0,
//           y: 25,
//           scale: 0.96,
//           filter: "blur(8px)",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 260,
//           damping: 26,
//           mass: 0.75,
//         }}
//         className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 shadow-2xl backdrop-blur-2xl"
//       >
//         {/* =======================================================
//             TOP GLOW
//         ======================================================== */}

//         <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-primary/[0.1] to-transparent" />

//         {/* =======================================================
//             CLOSE
//         ======================================================== */}

//         <motion.button
//           type="button"
//           whileHover={{
//             scale: 1.06,
//           }}
//           whileTap={{
//             scale: 0.92,
//           }}
//           onClick={onClose}
//           className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
//         >
//           <X className="h-4 w-4" />
//         </motion.button>

//         {/* =======================================================
//             CONTENT
//         ======================================================== */}

//         <div className="relative max-h-[90vh] overflow-y-auto p-7 sm:p-10 lg:p-14">
//           {/* Quote icon */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.7,
//               rotate: -8,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               rotate: 0,
//             }}
//             transition={{
//               delay: 0.08,
//               duration: 0.45,
//             }}
//             className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
//           >
//             <Quote className="h-6 w-6" />
//           </motion.div>

//           {/* Stars */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 10,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.12,
//             }}
//             className="mb-6 flex items-center gap-1"
//           >
//             {Array.from({
//               length: testimonial.rating,
//             }).map((_, index) => (
//               <Star
//                 key={index}
//                 className="h-4 w-4 fill-secondary text-secondary"
//               />
//             ))}

//             <span className="ml-2 text-xs font-medium text-muted-foreground">
//               Verified customer
//             </span>
//           </motion.div>

//           {/* Main quote */}
//           <motion.h3
//             initial={{
//               opacity: 0,
//               y: 18,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.16,
//               duration: 0.5,
//             }}
//             className="max-w-2xl text-2xl font-semibold leading-[1.35] tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl"
//           >
//             “{testimonial.quote}”
//           </motion.h3>

//           <div className="my-8 h-px bg-border/70" />

//           {/* Full review */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 15,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.22,
//               duration: 0.5,
//             }}
//             className="space-y-5"
//           >
//             {testimonial.fullReview
//               .split("\n\n")
//               .map((paragraph, index) => (
//                 <p
//                   key={index}
//                   className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
//                 >
//                   {paragraph}
//                 </p>
//               ))}
//           </motion.div>

//           {/* Author */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 15,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.28,
//               duration: 0.5,
//             }}
//             className="mt-10 flex items-center justify-between border-t border-border/70 pt-7"
//           >
//             <div className="flex items-center gap-4">
//               <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-lg shadow-primary/20">
//                 {testimonial.initials}

//                 <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
//                   <Check className="h-2.5 w-2.5 text-white" />
//                 </span>
//               </div>

//               <div>
//                 <p className="font-semibold text-foreground">
//                   {testimonial.name}
//                 </p>

//                 <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
//                   {testimonial.role}
//                   <span className="mx-1.5 opacity-40">·</span>
//                   {testimonial.company}
//                 </p>
//               </div>
//             </div>

//             <div className="hidden text-right sm:block">
//               <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
//                 Customer
//               </p>

//               <p className="mt-1 text-sm font-medium text-foreground">
//                 Verified experience
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }


"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowUpRight, Check, Quote, Star, X } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    company: "Stripe",
    initials: "SM",
    rating: 5,
    quote:
      "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
    review:
      "This platform completely transformed how our team collaborates. Before using it, our team was constantly switching between different tools and losing context. Now everything feels connected and effortless.\n\nThe intuitive design was probably the biggest surprise for us. Everyone understood how to use it almost immediately, and the integrations fit naturally into our existing workflow.",
  },
  {
    name: "James Rodriguez",
    role: "Engineering Lead",
    company: "Vercel",
    initials: "JR",
    rating: 5,
    quote:
      "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
    review:
      "I've been building software for years and have developed a pretty high bar for the tools my team adopts. This one cleared it immediately.\n\nPerformance is excellent even when we're working with large amounts of data, and the API is clean enough that our engineers actually enjoy integrating with it.",
  },
  {
    name: "Emily Chen",
    role: "CEO",
    company: "Acme Corp",
    initials: "EC",
    rating: 5,
    quote:
      "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise.",
    review:
      "We evaluated several products before choosing this one, and the difference became obvious during onboarding.\n\nEverything felt considered. There were no confusing setup screens, no unnecessary complexity, and no awkward handoffs between teams.",
  },
  {
    name: "David Park",
    role: "Full Stack Developer",
    company: "Shopify",
    initials: "DP",
    rating: 5,
    quote:
      "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps.",
    review:
      "The developer experience is honestly one of the strongest parts of the product.\n\nThe APIs are predictable, the documentation is actually useful, and examples cover the situations developers run into in the real world.",
  },
  {
    name: "Olivia Turner",
    role: "Marketing Director",
    company: "HubSpot",
    initials: "OT",
    rating: 5,
    quote:
      "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
    review:
      "We initially adopted the platform because we wanted better visibility into our campaigns, but the impact went far beyond reporting.\n\nWithin the first month we saw a 40% increase in engagement.",
  },
  {
    name: "Michael Brooks",
    role: "Founder",
    company: "Northstar",
    initials: "MB",
    rating: 5,
    quote:
      "It feels like the team actually thought through every tiny interaction. Beautiful product and exceptional experience.",
    review:
      "We've used a lot of products in this category, but this one immediately stood out.\n\nEvery interaction feels deliberate and considered. Nothing feels like it was added simply because competitors had it.",
  },
]

export default function Testimonials() {
  const [selected, setSelected] =
    useState<(typeof testimonials)[number] | null>(null)

  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.08, 0.14, 0.08],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          {/* ===================================================
              HEADER
          ==================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-12 text-center sm:mb-14"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
              <Quote className="h-3 w-3" />
              Testimonials
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
              What people are saying
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Real experiences from people using the platform every day.
            </p>
          </motion.div>

          {/* ===================================================
              COMPACT GRID
          ==================================================== */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <CompactCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index}
                onClick={() => setSelected(testimonial)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          DETAIL DIALOG
      ======================================================== */}

      <AnimatePresence>
        {selected && (
          <ReviewDialog
            testimonial={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ===============================================================
   COMPACT CARD
================================================================ */

function CompactCard({
  testimonial,
  index,
  onClick,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className="group relative flex h-[205px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 text-left shadow-sm backdrop-blur-xl transition-colors duration-300 hover:border-primary/25 hover:bg-card"
    >
      {/* =====================================================
          HOVER GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-secondary/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* =====================================================
          QUOTE MARK
      ====================================================== */}

      <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/[0.035] transition-transform duration-500 group-hover:rotate-6" />

      {/* =====================================================
          RATING
      ====================================================== */}

      <div className="relative mb-3 flex items-center gap-0.5">
        {Array.from({
          length: testimonial.rating,
        }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-secondary text-secondary"
          />
        ))}
      </div>

      {/* =====================================================
          REVIEW
      ====================================================== */}

      <p className="relative line-clamp-3 flex-1 text-[14px] font-medium leading-[1.5] tracking-[-0.01em] text-foreground/85">
        “{testimonial.quote}”
      </p>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="relative mt-4 flex items-center justify-between border-t border-border/60 pt-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Avatar */}
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[9px] font-bold text-white">
            {testimonial.initials}

            <span className="absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {testimonial.name}
            </p>

            <p className="truncate text-[10px] text-muted-foreground">
              {testimonial.role}
              <span className="mx-1 opacity-40">·</span>
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Read icon */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
  )
}

/* ===============================================================
   DIALOG
================================================================ */

function ReviewDialog({
  testimonial,
  onClose,
}: {
  testimonial: (typeof testimonials)[number]
  onClose: () => void
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
    >
      {/* =====================================================
          BACKDROP
      ====================================================== */}

      <motion.button
        type="button"
        aria-label="Close review"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background/75 backdrop-blur-xl"
      />

      {/* =====================================================
          DIALOG
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.95,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
          filter: "blur(6px)",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-2xl backdrop-blur-2xl"
      >
        {/* Top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/[0.08] to-transparent" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative max-h-[85vh] overflow-y-auto p-7 sm:p-9">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Quote className="h-5 w-5" />
          </div>

          {/* Rating */}
          <div className="mb-5 flex items-center gap-1">
            {Array.from({
              length: testimonial.rating,
            }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-secondary text-secondary"
              />
            ))}

            <span className="ml-2 text-xs text-muted-foreground">
              Verified customer
            </span>
          </div>

          {/* Main quote */}
          <h3 className="text-xl font-semibold leading-[1.4] tracking-[-0.025em] text-foreground sm:text-2xl">
            “{testimonial.quote}”
          </h3>

          <div className="my-7 h-px bg-border/70" />

          {/* Full review */}
          <div className="space-y-4">
            {testimonial.review
              .split("\n\n")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-7 text-muted-foreground sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Author */}
          <div className="mt-8 flex items-center gap-3 border-t border-border/70 pt-6">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
              {testimonial.initials}

              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
                <Check className="h-2 w-2 text-white" />
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                {testimonial.name}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {testimonial.role}
                <span className="mx-1.5 opacity-40">·</span>
                {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}




// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence, TargetAndTransition } from "framer-motion"
// import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react"

// const testimonials = [
//   {
//     name: "Sarah Mitchell",
//     role: "Product Designer",
//     company: "Stripe",
//     initials: "SM",
//     rating: 5,
//     quote:
//       "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
//   },
//   {
//     name: "James Rodriguez",
//     role: "Engineering Lead",
//     company: "Vercel",
//     initials: "JR",
//     rating: 5,
//     quote:
//       "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
//   },
//   {
//     name: "Emily Chen",
//     role: "CEO",
//     company: "Acme Corp",
//     initials: "EC",
//     rating: 5,
//     quote:
//       "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise — this one does.",
//   },
//   {
//     name: "David Park",
//     role: "Full Stack Developer",
//     company: "Shopify",
//     initials: "DP",
//     rating: 4,
//     quote:
//       "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps. Highly recommend for any serious project.",
//   },
//   {
//     name: "Olivia Turner",
//     role: "Marketing Director",
//     company: "HubSpot",
//     initials: "OT",
//     rating: 5,
//     quote:
//       "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
//   },
// ]

// /*
//  * The stack is intentionally asymmetric.
//  *
//  * offset 0 = front card
//  * offset 1 = card immediately behind
//  * offset 2 = deeper card
//  * offset 3 = deepest visible card
//  */
// const stackPositions = [
//   {
//     x: 0,
//     y: 0,
//     scale: 1,
//     rotate: 0,
//     opacity: 1,
//   },
//   {
//     x: -18,
//     y: -16,
//     scale: 0.95,
//     rotate: -3,
//     opacity: 0.72,
//   },
//   {
//     x: 25,
//     y: -29,
//     scale: 0.90,
//     rotate: 4,
//     opacity: 0.45,
//   },
//   {
//     x: -12,
//     y: -42,
//     scale: 0.85,
//     rotate: -5,
//     opacity: 0.22,
//   },
// ]

// const spring = {
//   type: "spring" as const,
//   stiffness: 180,
//   damping: 22,
//   mass: 1,
// }

// export default function Testimonials() {
//   /*
//    * order[0] is ALWAYS the front card.
//    */
//   const [order, setOrder] = useState(
//     testimonials.map((_, index) => index)
//   )

//   const [direction, setDirection] = useState<"next" | "prev">("next")
//   const [isAnimating, setIsAnimating] = useState(false)

//   const next = () => {
//     if (isAnimating) return

//     setIsAnimating(true)
//     setDirection("next")

//     /*
//      * Wait for the physical "fly out" animation to finish,
//      * then move the old front card to the back.
//      */
//     setTimeout(() => {
//       setOrder((current) => {
//         const updated = [...current]
//         const first = updated.shift()

//         if (first !== undefined) {
//           updated.push(first)
//         }

//         return updated
//       })

//       setTimeout(() => {
//         setIsAnimating(false)
//       }, 80)
//     }, 520)
//   }

//   const previous = () => {
//     if (isAnimating) return

//     setIsAnimating(true)
//     setDirection("prev")

//     /*
//      * Bring the last card out of the deck and place it
//      * on the front.
//      */
//     setOrder((current) => {
//       const updated = [...current]
//       const last = updated.pop()

//       if (last !== undefined) {
//         updated.unshift(last)
//       }

//       return updated
//     })

//     setTimeout(() => {
//       setIsAnimating(false)
//     }, 620)
//   }

//   return (
//     <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
//       {/* =========================================================
//           BACKGROUND
//       ========================================================== */}

//       <div className="pointer-events-none absolute inset-0">
//         <motion.div
//           animate={{
//             scale: [1, 1.08, 1],
//             opacity: [0.2, 0.32, 0.2],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]"
//         />

//         <motion.div
//           animate={{
//             x: [0, 70, -40, 0],
//             y: [0, -40, 30, 0],
//           }}
//           transition={{
//             duration: 14,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]"
//         />
//       </div>

//       <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
//         {/* =========================================================
//             HEADER
//         ========================================================== */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 25,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: true,
//             amount: 0.3,
//           }}
//           transition={{
//             duration: 0.7,
//           }}
//           className="mb-16 text-center sm:mb-20"
//         >
//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
//             <Quote className="h-3.5 w-3.5" />
//             Testimonials
//           </div>

//           <h2 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
//             What people{" "}
//             <span className="text-primary">really think.</span>
//           </h2>

//           <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
//             Don't take our word for it. Hear directly from the people
//             building better things with us.
//           </p>
//         </motion.div>

//         {/* =========================================================
//             CARD STAGE
//         ========================================================== */}

//         <div className="relative mx-auto flex h-[540px] w-full max-w-[950px] items-center justify-center">
//           {/* Ground shadow */}
//           <motion.div
//             animate={{
//               scaleX: direction === "next" ? [1, 1.04, 1] : [1, 1.05, 1],
//               opacity: [0.12, 0.2, 0.12],
//             }}
//             transition={{
//               duration: 1,
//               ease: "easeInOut",
//             }}
//             className="absolute left-1/2 top-[72%] h-12 w-[55%] -translate-x-1/2 rounded-full bg-black/30 blur-3xl"
//           />

//           {/* =======================================================
//               LEFT ARROW
//           ======================================================== */}

//           <motion.button
//             whileHover={{
//               scale: 1.08,
//               x: -3,
//             }}
//             whileTap={{
//               scale: 0.93,
//             }}
//             onClick={previous}
//             disabled={isAnimating}
//             aria-label="Previous testimonial"
//             className="absolute left-0 top-1/2 z-[100] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-xl backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none sm:left-4 sm:h-14 sm:w-14"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </motion.button>

//           {/* =======================================================
//               RIGHT ARROW
//           ======================================================== */}

//           <motion.button
//             whileHover={{
//               scale: 1.08,
//               x: 3,
//             }}
//             whileTap={{
//               scale: 0.93,
//             }}
//             onClick={next}
//             disabled={isAnimating}
//             aria-label="Next testimonial"
//             className="absolute right-0 top-1/2 z-[100] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-xl backdrop-blur-xl transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none sm:right-4 sm:h-14 sm:w-14"
//           >
//             <ArrowRight className="h-5 w-5" />
//           </motion.button>

//           {/* =======================================================
//               CARD DECK
//           ======================================================== */}

//           <div
//             className="relative h-[390px] w-[calc(100%-100px)] max-w-[680px] sm:h-[420px] sm:w-[calc(100%-180px)]"
//             style={{
//               perspective: "1400px",
//             }}
//           >
//             <AnimatePresence initial={false}>
//               {order.slice(0, 4).map((testimonialIndex, stackIndex) => {
//                 const testimonial = testimonials[testimonialIndex]
//                 const position = stackPositions[stackIndex]

//                 if (!position) return null

//                 const isFront = stackIndex === 0

//                 /*
//                  * --------------------------------------------------
//                  * FRONT CARD — NEXT
//                  *
//                  * It first rises upward, then travels backward
//                  * and leaves toward the upper-right.
//                  * --------------------------------------------------
//                  */
//                 const nextExit: TargetAndTransition  = {
//                   x: 170,
//                   y: -170,
//                   rotate: 12,
//                   scale: 0.82,
//                   opacity: 0,
//                   transition: {
//                     duration: 0.52,
//                     ease: [0.32, 0.72, 0, 1],
//                   },
//                 }

//                 /*
//                  * --------------------------------------------------
//                  * FRONT CARD — PREVIOUS
//                  *
//                  * The previous animation is handled by bringing
//                  * the last card from deep behind to the front.
//                  * --------------------------------------------------
//                  */

//                 return (
//                   <motion.article
//                     key={testimonialIndex}
//                     initial={
//                       direction === "prev" &&
//                       stackIndex === 0
//                         ? {
//                             x: -120,
//                             y: -160,
//                             rotate: -12,
//                             scale: 0.82,
//                             opacity: 0,
//                           }
//                         : false
//                     }
//                     animate={{
//                       x: position.x,
//                       y: position.y,
//                       scale: position.scale,
//                       rotate: position.rotate,
//                       opacity: position.opacity,
//                       zIndex: 50 - stackIndex,
//                     }}
//                     exit={isFront ? nextExit : undefined}
//                     transition={spring}
//                     className="absolute inset-0"
//                     style={{
//                       transformStyle: "preserve-3d",
//                     }}
//                   >
//                     {/* =================================================
//                         CARD GLOW
//                     ================================================== */}

//                     {isFront && (
//                       <motion.div
//                         animate={{
//                           opacity: [0.35, 0.5, 0.35],
//                         }}
//                         transition={{
//                           duration: 4,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                         className="absolute -inset-4 rounded-[2rem] bg-primary/15 blur-2xl"
//                       />
//                     )}

//                     {/* =================================================
//                         CARD
//                     ================================================== */}

//                     <div
//                       className={`relative h-full overflow-hidden rounded-[2rem] border ${
//                         isFront
//                           ? "border-primary/25 bg-card shadow-[0_30px_80px_-25px_rgba(0,0,0,0.3)]"
//                           : "border-border/40 bg-card/90 shadow-xl"
//                       }`}
//                     >
//                       {/* Top atmospheric glow */}
//                       <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/[0.08] to-transparent" />

//                       {/* Large decorative quote */}
//                       <div className="pointer-events-none absolute -right-2 -top-3 opacity-[0.055]">
//                         <Quote className="h-40 w-40" />
//                       </div>

//                       {/* Content */}
//                       <div className="relative flex h-full flex-col p-7 sm:p-10">
//                         {/* Rating */}
//                         <div className="flex items-center gap-1">
//                           {Array.from({
//                             length: testimonial.rating,
//                           }).map((_, index) => (
//                             <Star
//                               key={index}
//                               className="h-4 w-4 fill-secondary text-secondary"
//                             />
//                           ))}
//                         </div>

//                         {/* Quote */}
//                         <div className="flex flex-1 items-center">
//                           <p
//                             className={`max-w-2xl text-xl font-medium leading-[1.45] tracking-[-0.025em] sm:text-2xl lg:text-[28px] ${
//                               isFront
//                                 ? "text-foreground"
//                                 : "text-foreground/70"
//                             }`}
//                           >
//                             “{testimonial.quote}”
//                           </p>
//                         </div>

//                         {/* Author */}
//                         <div className="border-t border-border/70 pt-6">
//                           <div className="flex items-center gap-3">
//                             <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-lg shadow-primary/20 sm:h-12 sm:w-12">
//                               {testimonial.initials}

//                               <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
//                             </div>

//                             <div>
//                               <p className="text-sm font-semibold text-foreground">
//                                 {testimonial.name}
//                               </p>

//                               <p className="mt-0.5 text-xs text-muted-foreground">
//                                 {testimonial.role}
//                                 <span className="mx-1.5 opacity-40">
//                                   ·
//                                 </span>
//                                 <span className="text-foreground/70">
//                                   {testimonial.company}
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.article>
//                 )
//               })}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* =========================================================
//             MINIMAL FOOTER
//         ========================================================== */}

//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           whileInView={{
//             opacity: 1,
//           }}
//           viewport={{
//             once: true,
//           }}
//           transition={{
//             delay: 0.3,
//           }}
//           className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground"
//         >
//           <span className="h-px w-8 bg-border" />

//         </motion.div>
//       </div>
//     </section>
//   )
// }
