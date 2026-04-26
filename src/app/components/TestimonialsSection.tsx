// "use client";

// import {
//   motion,
//   useAnimationFrame,
//   useMotionValue,
// } from "framer-motion";
// import { useRef } from "react";
// import { useMemo } from "react";

// interface Testimonial {
//   name: string;
//   role: string;
//   text: string;
//   rating?: number;
// }

// interface RowProps {
//   items: Testimonial[];
//   speed: number;
//   direction: "left" | "right";
// }

// function ScrollingRow({ items, speed, direction }: RowProps) {
//   const duplicated = [...items, ...items];
//   const x = useMotionValue(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useAnimationFrame((_, delta) => {
//     const moveBy = (speed * delta) / 1000;

//     if (direction === "left") {
//       x.set(x.get() - moveBy);
//     } else {
//       x.set(x.get() + moveBy);
//     }

//     const container = containerRef.current;
//     if (container) {
//       const width = container.scrollWidth / 2;

//       if (direction === "left" && Math.abs(x.get()) >= width) {
//         x.set(0);
//       }

//       if (direction === "right" && x.get() >= 0) {
//         x.set(-width);
//       }
//     }
//   });

//   return (
//     <div
//       className="w-[1000px] max-w-full overflow-hidden"
//       style={{
//         maskImage:
//           "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
//         WebkitMaskImage:
//           "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
//         paddingBottom: "3px",
//       }}
//     >
//       <motion.div
//         ref={containerRef}
//         style={{ x }}
//         className="flex gap-6"
//       >
//         {duplicated.map((item, i) => (
//           <div
//             key={i}
//             className="w-72 p-6 bg-white rounded-2xl shadow-lg flex-shrink-0 hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
//                 {item.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-semibold text-sm">{item.name}</p>
//                 <p className="text-xs text-gray-500">{item.role}</p>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mb-4">{item.text}</p>

//             <div className="flex gap-1">
//               {Array.from({ length: 5 }).map((_, idx) => (
//                 <svg
//                   key={idx}
//                   className={`w-4 h-4 ${idx < (item.rating ?? 5)
//                     ? "text-yellow-400"
//                     : "text-gray-300"
//                     }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.037 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.958z" />
//                 </svg>
//               ))}
//             </div>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default function TestimonialsCarousel() {

//   const testimonials: Testimonial[] = Array.from(
//     { length: 10 },
//     (_, i) => ({
//       name: `Customer ${i + 1}`,
//       role: "Product Manager",
//       text:
//         "This product completely transformed our workflow and improved team efficiency.",
//       rating: 4 + (i % 2),
//     })
//   );

//   return (
//     <section id="testimonials">
//       <div className="flex flex-col items-center gap-10 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-10 mt-10"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-[#1B120B]"
//           >
//             Hear From Our Travellers
//           </h2>

//           <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg">
//             Discover the experiences and stories of our travellers who explored the world with us. Their journeys inspire, delight, and showcase the memories we help create.
//           </p>
//         </motion.div>

//         <ScrollingRow
//           items={testimonials}
//           speed={80}
//           direction="left"
//         />

//         <ScrollingRow
//           items={testimonials}
//           speed={80}
//           direction="right"
//         />
//       </div>
//     </section>

//   );
// }

"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, MessageSquareQuote, Mic, Quote, Sparkles, Speaker, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    company: "Stripe",
    avatar: "SM",
    rating: 5,
    text: "This platform completely transformed how our team collaborates. The intuitive design and seamless integrations saved us countless hours every week.",
  },
  {
    name: "James Rodriguez",
    role: "Engineering Lead",
    company: "Vercel",
    avatar: "JR",
    rating: 5,
    text: "I've tried dozens of tools over the years, but nothing comes close. The performance is incredible and the support team is world-class.",
  },
  {
    name: "Emily Chen",
    role: "CEO",
    company: "Acme Corp",
    avatar: "EC",
    rating: 5,
    text: "From onboarding to daily use, everything feels polished. It's rare to find a product that delivers on every promise — this one does.",
  },
  {
    name: "David Park",
    role: "Full Stack Developer",
    company: "Shopify",
    avatar: "DP",
    rating: 4,
    text: "The developer experience is top-notch. Clean APIs, great docs, and a community that actually helps. Highly recommend for any serious project.",
  },
  {
    name: "Olivia Turner",
    role: "Marketing Director",
    company: "HubSpot",
    avatar: "OT",
    rating: 5,
    text: "We saw a 40% increase in engagement within the first month. The analytics dashboard alone is worth the investment.",
  },
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5"
          >
            <MessageSquareQuote className="h-3 w-3" />
            Testimonials
          </motion.div>          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Loved by <span className="text-primary">thousands</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
            See what our customers have to say about their experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 size-10 sm:size-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 size-10 sm:size-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="overflow-hidden mx-10 sm:mx-14" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      animate={
                        selectedIndex === i
                          ? { y: -12, scale: 1.03, opacity: 1 }
                          : { y: 0, scale: 0.97, opacity: 0.7 }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`relative h-full rounded-2xl border p-6 sm:p-8 transition-colors duration-300 ${
                        selectedIndex === i
                          ? "bg-card border-primary/40 shadow-xl shadow-primary/5"
                          : "bg-card/60 border-border shadow-md"
                      }`}
                    >
                      <Quote className="size-8 text-primary/20 absolute top-5 right-5" />

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="size-4 fill-secondary text-secondary" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                        &ldquo;{t.text}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {t.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
