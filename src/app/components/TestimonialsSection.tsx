"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, ArrowDown, MapPin, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Testimonial = {
  name: string
  descriptor: string
  hook: string
  review: string
  quote?: string
  whatWeDid: string
  source: string
  location: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. P.K. Jha",
    descriptor: "Senior Consultant, Cardiology, at a leading Kolkata hospital",
    hook: "He handed over the whole trip. And found the one thing nobody had thought to look for.",
    review:
      "I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.",
    quote: "Sudip babu, only you could do this.",
    whatWeDid:
      "What we did: Managed the complete trip end-to-end and added the Loire Valley experience around his interests.",
    source: "Unsolicited written testimonial · Paris & London, 2025",
    location: "Paris & London",
    image: "",
  },
  {
    name: "Aniruddha Ghosh Roy",
    descriptor: "Zonal Sales Head, Indian pharmaceutical company",
    hook: "Two first-time travellers, five countries of trains, every connection timed from Kolkata. It held.",
    review:
      "We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.",
    whatWeDid:
      "What we did: Planned the multi-city rail journey, timed the connections and stayed involved throughout the trip.",
    source: "Bonhomiee Travel Circle · July 2026",
    location: "Europe",
    image: "",
  },
  {
    name: "Rahul Kar",
    descriptor: "Leadership team at a global industrial company",
    hook: "A leadership offsite that felt effortless from the outside.",
    review: "",
    whatWeDid: "",
    source: "",
    location: "Mussoorie",
    image: "",
  },
  {
    name: "Joydeep Moitra",
    descriptor: "Retired Army veteran",
    hook: "Meticulous planning, local support always in touch, value for money. His words. He travelled with us again five months later.",
    review:
      "Just wished to express my gratitude to Bonhomiee for organising an unforgettable experience at Pattaya and Bangkok. The planning was meticulous and the events organised with optimum utilisation of available time. The local support group was constantly in touch. The tour was affordable and, in the end, value for money.",
    quote: "Thanks for the wonderful time, Sudip. Would cherish it.",
    whatWeDid:
      "What we did: Built the itinerary around time, local support and practical value — then earned a second journey together.",
    source: "Bonhomiee Travel Circle · 19 August 2025",
    location: "Thailand",
    image: "",
  },
  {
    name: "Mr. L.S. Shankar",
    descriptor: "Retired PSU director",
    hook: "Three generations on some of India's hardest roads. His words for it, afterwards:",
    review: "A luxurious nature trail.",
    whatWeDid: "",
    source: "Said to Sudip in person · Confirm before publishing",
    location: "Arunachal Pradesh",
    image: "",
  },
  {
    name: "Ananya Choudhury & Ayan Choudhury",
    descriptor: "Senior executives at a large global IT company",
    hook: "A group departure that didn't feel like one.",
    review:
      "It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised.",
    quote:
      "It was all the effort from Sudip to make our experience a memorable one.",
    whatWeDid:
      "What we did: Designed the group journey with personalised planning across hotels, food, sightseeing and transfers.",
    source: "Bonhomiee Travel Circle and the Vietnam group",
    location: "Vietnam",
    image: "",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const total = testimonials.length
  const current = testimonials[active]

  const hasPrevious = active > 0
  const hasNext = active < total - 1

  const previousCard = hasPrevious ? testimonials[active - 1] : null
  const nextCard = hasNext ? testimonials[active + 1] : null

  const next = () => {
    if (!hasNext) return

    setDirection(1)
    setIsFlipped(false)
    setActive((prev) => prev + 1)
  }

  const previous = () => {
    if (!hasPrevious) return

    setDirection(-1)
    setIsFlipped(false)
    setActive((prev) => prev - 1)
  }

  useEffect(() => {
    if (isPaused || total <= 1) return

    const timer = window.setInterval(() => {
      setDirection(1)
      setIsFlipped(false)
      setActive((prev) => (prev < total - 1 ? prev + 1 : 0))
    }, 7500)

    return () => window.clearInterval(timer)
  }, [isPaused, total])

  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-18 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl"
        >
          In their <span className="text-[#FBAB18]">own words.</span>
        </motion.h2>

        {/* ========================================================= */}
        {/* MOBILE */}
        {/* ========================================================= */}

        <div
          className="mx-auto mt-8 block max-w-md sm:mt-10 lg:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >

          {/* MOBILE CARD STACK */}
          <div
            className="relative h-[455px] w-full [perspective:1200px]"
            onClick={() => setIsFlipped((prev) => !prev)}
          >

            {/* PREVIOUS PEEK */}
            {previousCard && (
              <div className="absolute left-1/2 top-0 h-[48px] w-[calc(100%-24px)] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[#E5E8ED] bg-[#F5F6F8] opacity-35">
                {previousCard.image && (
                  <>
                    <Image
                      src={previousCard.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-white/65" />
                  </>
                )}
              </div>
            )}

            {/* NEXT PEEK */}
            {nextCard && (
              <div className="absolute bottom-0 left-1/2 h-[48px] w-[calc(100%-24px)] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[#E5E8ED] bg-[#F5F6F8] opacity-35">
                {nextCard.image && (
                  <>
                    <Image
                      src={nextCard.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-white/65" />
                  </>
                )}
              </div>
            )}

            {/* FLIP WRAPPER */}
            <motion.div
              className="absolute inset-x-0 top-[20px] z-10 h-[415px] cursor-pointer [transform-style:preserve-3d]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* ================= FRONT ================= */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#E5E8ED] bg-white shadow-[0_15px_40px_rgba(16,33,63,0.10)] [backface-visibility:hidden]"
              >
                {current.image ? (
                  <>
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-cover"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#F5F6F8]" />
                )}

                <div className="absolute inset-x-0 bottom-0 p-6">

                  <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/75">
                    <MapPin size={11} />
                    {current.location}
                  </div>

                  <h3 className="text-xl font-semibold leading-tight text-white">
                    {current.name}
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-white/65">
                    {current.descriptor}
                  </p>

                  <div className="mt-5 border-t border-white/20 pt-4">
                    <p className="line-clamp-3 text-lg font-semibold leading-[1.25] text-[#FBAB18]">
                      {current.hook}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                    <RotateCcw size={12} />
                    Tap to read
                  </div>

                </div>
              </div>

              {/* ================= BACK ================= */}
              <div
                className="absolute inset-0 overflow-y-auto rounded-[22px] border border-[#E5E8ED] bg-white p-6 shadow-[0_15px_40px_rgba(16,33,63,0.10)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >

                <div className="flex min-h-full flex-col">

                  <div className="mb-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FBAB18]">
                      {current.location}
                    </p>

                    <h3 className="mt-2 text-xl font-bold leading-tight text-[#10213F]">
                      {current.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#7A8494]">
                      {current.descriptor}
                    </p>
                  </div>

                  {/* HOOK */}
                  <h4 className="text-xl font-semibold leading-[1.2] text-[#FBAB18]">
                    {current.hook}
                  </h4>

                  {/* REVIEW */}
                  {current.review && (
                    <p className="mt-5 text-sm italic leading-6 text-[#344054]">
                      “{current.review}”
                    </p>
                  )}

                  {/* QUOTE */}
                  {current.quote && (
                    <p className="mt-4 text-sm font-medium italic leading-6 text-[#0E40C7]">
                      “{current.quote}”
                    </p>
                  )}

                  {/* WHAT WE DID */}
                  {current.whatWeDid && (
                    <div className="mt-5 border-t border-[#E5E8ED] pt-4">
                      <p className="text-xs font-medium leading-5 text-[#306F7D]">
                        {current.whatWeDid}
                      </p>
                    </div>
                  )}

                  {/* SOURCE */}
                  {/* {current.source && (
                    <p className="mt-4 text-[10px] leading-5 text-[#9AA2AE]">
                      Source: {current.source}
                    </p>
                  )} */}

                  <div className="mt-auto pt-5 text-center">
                    <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A8494]">
                      <RotateCcw size={12} />
                      Tap to close
                    </span>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="mt-5 flex items-center justify-center gap-4">

            <button
              type="button"
              onClick={previous}
              disabled={!hasPrevious}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2E9] bg-[#F7F8FA] text-[#10213F] shadow-sm transition-all duration-200 hover:border-[#FBAB18] hover:bg-[#FBAB18] disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowUp size={17} strokeWidth={1.8} />
            </button>

            <span className="min-w-[50px] text-center text-[11px] font-medium tracking-wide text-[#7A8494]">
              {active + 1} of {total}
            </span>

            <button
              type="button"
              onClick={next}
              disabled={!hasNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E40C7] text-white shadow-sm transition-all duration-200 hover:bg-[#0b36a8] disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowDown size={17} strokeWidth={1.8} />
            </button>

          </div>

          {/* MOBILE READ MORE */}
          <div className="mt-3 flex justify-end">
            <Link
              href="/testimonials"
              className="group flex items-center gap-1.5 text-xs font-semibold text-[#10213F] transition-colors duration-200 hover:text-[#0E40C7]"
              onClick={(event) => event.stopPropagation()}
            >
              Read More
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP */}
        {/* ========================================================= */}

        <div
          className="mx-auto mt-9 hidden max-w-5xl sm:mt-11 lg:mt-12 lg:block"
        >
          <div className="grid items-center gap-9 lg:grid-cols-[56px_370px_1fr]">

            {/* CONTROLS */}
            <div className="flex flex-col items-center justify-center gap-3">

              <button
                type="button"
                onClick={previous}
                disabled={!hasPrevious}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DDE2E9] bg-[#F7F8FA] text-[#10213F] shadow-sm transition-all duration-200 hover:border-[#FBAB18] hover:bg-[#FBAB18] disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowUp size={18} strokeWidth={1.8} />
              </button>

              <span className="min-w-[48px] py-1 text-center text-[11px] font-medium tracking-wide text-[#7A8494]">
                {active + 1} of {total}
              </span>

              <button
                type="button"
                onClick={next}
                disabled={!hasNext}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E40C7] text-white shadow-sm transition-all duration-200 hover:bg-[#0b36a8] disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowDown size={18} strokeWidth={1.8} />
              </button>

            </div>

            {/* IMAGE STACK */}
            <div className="relative h-[520px]">

              {/* PREVIOUS PEEK */}
              {previousCard && (
                <motion.div
                  key={`previous-${previousCard.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.28 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 top-0 z-0 h-[70px] w-[calc(100%-20px)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-[#E5E8ED] bg-[#F5F6F8]"
                >
                  {previousCard.image && (
                    <>
                      <Image
                        src={previousCard.image}
                        alt=""
                        fill
                        sizes="370px"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-white/55" />
                    </>
                  )}
                </motion.div>
              )}

              {/* NEXT PEEK */}
              {nextCard && (
                <motion.div
                  key={`next-${nextCard.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.28 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-1/2 z-0 h-[70px] w-[calc(100%-20px)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-[#E5E8ED] bg-[#F5F6F8]"
                >
                  {nextCard.image && (
                    <>
                      <Image
                        src={nextCard.image}
                        alt=""
                        fill
                        sizes="370px"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-white/55" />
                    </>
                  )}
                </motion.div>
              )}

              {/* ACTIVE IMAGE */}
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
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-x-0 top-[28px] z-10 h-[450px] overflow-hidden rounded-[22px] border border-[#E5E8ED] bg-[#F5F6F8] shadow-[0_15px_40px_rgba(16,33,63,0.10)]"
                >
                  {current.image ? (
                    <>
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        sizes="370px"
                        className="object-cover"
                        priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[#F5F6F8]" />
                  )}

                  <div className="absolute bottom-6 left-6 right-6">

                    <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/75">
                      <MapPin size={11} />
                      {current.location}
                    </div>

                    <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                      {current.name}
                    </h3>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DESKTOP REVIEW */}
            <div className="min-w-0 lg:pl-1">

              <AnimatePresence mode="wait" initial={false}>
                <motion.article
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
                    duration: 0.4,
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

                    {current.review && (
                      <p className="text-sm italic leading-7 text-[#344054] sm:text-[15px]">
                        “{current.review}”
                      </p>
                    )}

                    {current.quote && (
                      <p className="mt-4 text-sm font-medium italic leading-6 text-[#0E40C7]">
                        “{current.quote}”
                      </p>
                    )}

                    {/* WHAT WE DID */}
                    {current.whatWeDid && (
                      <div className="mt-5 border-t border-[#E5E8ED] pt-4">
                        <p className="text-xs font-medium leading-5 text-[#306F7D] sm:text-[13px]">
                          {current.whatWeDid}
                        </p>
                      </div>
                    )}

                    {/* SOURCE */}
                    {current.source && (
                      <p className="mt-3 text-[10px] leading-5 text-[#9AA2AE]">
                        Source: {current.source}
                      </p>
                    )}

                  </div>

                </motion.article>
              </AnimatePresence>

            </div>

          </div>

          {/* DESKTOP READ MORE */}
          <div className="mt-1 flex justify-end pr-1">
            <Link
              href="/testimonials"
              className="group flex items-center gap-1.5 text-xs font-semibold text-[#10213F] transition-colors duration-200 hover:text-[#0E40C7]"
            >
              Read More

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>

        {/* ========================================================= */}
        {/* SEO CONTENT */}
        {/* ========================================================= */}

        <div className="sr-only">
          {testimonials.map((testimonial) => (
            <article key={`seo-${testimonial.name}`}>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.descriptor}</p>
              <p>{testimonial.hook}</p>
              <p>{testimonial.review}</p>

              {testimonial.quote && (
                <p>{testimonial.quote}</p>
              )}

              {testimonial.whatWeDid && (
                <p>{testimonial.whatWeDid}</p>
              )}

              <p>{testimonial.source}</p>
              <p>{testimonial.location}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
