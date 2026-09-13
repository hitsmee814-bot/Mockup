"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Quote } from "lucide-react"
import Image from "next/image"
import logoPrimary from "..//../assets/images/final logo Bonhomiee.png"

const testimonials = [
  {
    name: "Dr. P.K. Jha",
    role: "Senior Consultant, Cardiology, leading Kolkata hospital",
    trip: "Paris & London · 2025",
    hook: "He handed over the whole trip. And found the one thing nobody had thought to look for.",
    review:
      "I had burnt my fingers many times in the past with other tour organizers. He took the charge of my whole trip upon himself with a positive attitude. Icing on the cake was the Loire Valley trip which I had no clue about beforehand.",
    note: "Sudip babu, only you could do this.",
  },
  {
    name: "Aniruddha Ghosh Roy",
    role: "Zonal Sales Head, Indian pharmaceutical company",
    trip: "Europe · July 2026",
    hook: "Two first-time travellers, five cities of trains, every connection timed from Kolkata. It held.",
    review:
      "We are first-time travellers, but the way you guided us from time to time and did the follow-up, we had no issues at all. All arrangements were flawless. We enjoyed every bit of it.",
  },
  {
    name: "Ananya Choudhury & Ayan Choudhury",
    role: "Senior executives at a large global IT company",
    trip: "Vietnam · Group Departure",
    hook: "A group departure that didn't feel like one.",
    review:
      "It was a wonderful trip, no doubt. Very good hotels, very good food, extremely good sightseeing, and very comfortable bus journeys. And very thought-through planning. Felt like personalised. — Ananya\n\nIt was all the effort from Sudip to make our experience a memorable one. — Ayan",
  },
  {
    name: "Joydeep Moitra",
    role: "Retired Army veteran",
    trip: "Thailand · August 2025",
    hook: "Meticulous planning, local support always in touch, value for money.",
    review:
      "Just wished to express my gratitude to Bonhomiee for organising an unforgettable experience at Pattaya and Bangkok. The planning was meticulous and the events organised with optimum utilisation of available time. The local support group was constantly in touch. The tour was affordable and, in the end, value for money.",
  },
  {
    name: "Mr. L.S. Shankar",
    role: "Retired PSU director",
    trip: "Western Arunachal · May 2026",
    hook: "Three generations on some of India's hardest roads.",
    review: "A luxurious nature trail.",
  },
  {
    name: "Sadhna Kar",
    role: "Leadership offsite designed for her husband's team",
    trip: "Mussoorie · March 2026",
    hook: "She didn't go. She heard about it for weeks.",
    review:
      "What you have done — he cannot stop talking about you, how you have done everything there. I am quite envious that I missed going.",
  },
  {
    name: "Samir Roy",
    role: "Vietnam group departure",
    trip: "Vietnam",
    hook: "Not from our society. Not from our circle. Part of the family by the second day.",
    review:
      "Thank you Sudip for arranging such a wonderful trip with a very caring attitude to all of us. Although we are outsiders from your society, myself and Sukla enjoyed a lot. We will cherish our memories — Phu Quoc island, Ha Long Bay, and specifically the food — till the next trip.",
  },
  {
    name: "Barnali Mitra",
    role: "Retired Head of Corporate Communication, SAIL, and senior journalist, The Telegraph",
    trip: "Vietnam · Group Departure",
    hook: "From someone who notices the wrinkles.",
    review:
      "Thank you for walking that extra mile to smooth out the wrinkles and give all of us a good time. One of my best trips. Lovely country, Vietnam — so diverse in its beauty.",
  },
  {
    name: "Anjan Kumar Ganguli",
    role: "Retd. Procurement Head of a global industrial company",
    trip: "Vietnam · Group Departure",
    hook: "Fantastic experience — and the Bengali khunsuti was theirs, not ours.",
    review:
      "Fantastic experience. Lots of travel, excellent food, typical Bengali khunsuti, Vietnamese culture, development, construction and more.",
  },
  {
    name: "Spandan Jha",
    role: "Vietnam group departure",
    trip: "Vietnam",
    hook: "Truly wonderful — and already asking about the next one.",
    review:
      "Thanks Sudip for the truly wonderful experience of our trip, and to all the group members for making it amazing.",
  },
  {
    name: "Ranu Dattagupta",
    role: "Senior-most traveller at seventy-five",
    trip: "Vietnam · Group Departure",
    hook: "Seventy-five. She did all of it.",
    review:
      "Wish Sudip and Bonhomiee all the best for their successful endeavour in 2026.",
    note: "Barnali di called her an inspiration.",
  },
  {
    name: "Sudipto Roy",
    role: "Senior executive, large Indian IT company",
    trip: "Family trip · 2026",
    hook: "Sometimes the trip doesn't happen. The care still does.",
    review:
      "We were about to close something but could not, due to a sudden shift in our child's college calendar. Sudip was most patient, kind, and the personal attention he gave in planning everything was much appreciated by the entire family. We may have gone back and forth, but Sudip never lost his smile and patience.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Testimonial() {
  return (
    <main className="overflow-hidden bg-white text-[#1B120B]">

        {/* Hero */}
        <section className="px-6 pb-20 pt-16 md:px-12 lg:px-20 lg:pb-12 lg:pt-20">
        <div className="mx-auto max-w-7xl">

            {/* Brand */}
            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex items-center gap-3"
            >
            <Image
                src={logoPrimary}
                alt="Bonhomiee"
                width={150}
                height={45}
                className="h-auto w-[135px] object-contain"
                priority
            />

            <span className="h-5 w-px bg-[#D4D6DA]" />

            <span className="text-sm font-medium tracking-wide text-[#757C86]">
                Travel Stories
            </span>
            </motion.div>

            <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
            >
<h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
  Journeys, told by
  <br />
  <span className="text-[#FBAB18]">the people</span>{" "}
  <span className="text-[#FBAB18]">who lived them.</span>
</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-[#757C86] md:text-lg">
                Twelve real experiences from people who travelled with
                Bonhomiee — in their own words.
            </p>
            </motion.div>
        </div>
        </section>

      {/* Featured */}
      <section className="bg-[#EEF3FF] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0E40C7]">
                Featured Stories
              </p>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Journeys worth remembering.
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.slice(0, 2).map((item, index) => (
              <motion.article
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group rounded-[2rem] bg-white p-8 shadow-[0_12px_40px_rgba(14,64,199,0.06)] transition-all duration-300 hover:-translate-y-1 md:p-10 lg:p-12"
              >
                <div className="flex items-center justify-between">
                  <Quote
                    size={28}
                    strokeWidth={1.5}
                    className="text-[#0E40C7]"
                  />

                </div>

                <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl text-[#FBAB18]">
                  {item.hook}
                </p>

                <div className="my-8 h-px w-full bg-[#D4D6DA]" />

                <p className="whitespace-pre-line text-base italic leading-7 text-[#585E6C]">
                  “{item.review}”
                </p>

                {item.note && (
                  <p className="mt-5 text-sm font-medium text-[#0E40C7]">
                    {item.note}
                  </p>
                )}

                <div className="mt-10">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-[#757C86]">{item.role}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#B2B8BD]">
                    {item.trip}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Feature Three */}
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-6 rounded-[2rem] bg-[#04257E] p-8 text-white md:p-12 lg:p-16"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-6 flex items-center gap-3">
                </div>

                <h3 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                  {testimonials[2].hook}
                </h3>
              </div>

              <div>
                <p className="whitespace-pre-line text-base italic leading-8 text-white/75 md:text-lg">
                  “{testimonials[2].review}”
                </p>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="font-semibold">{testimonials[2].name}</p>
                  <p className="mt-1 text-sm text-white/50">
                    {testimonials[2].role}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* More Journeys */}
      <section className="px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#FBAB18]" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0E40C7]">
                More Journeys
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Stories from the road.
            </h2>

            <p className="mt-5 leading-7 text-[#757C86]">
              From family escapes to group journeys, every trip leaves
              something behind.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(3).map((item, index) => (
              <motion.article
                key={item.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
                className="group flex min-h-[390px] flex-col rounded-[1.75rem] border border-[#D4D6DA] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E40C7]/30 hover:shadow-[0_18px_45px_rgba(14,64,199,0.08)]"
              >

                <div className="mt-2 flex-1">
                  <p className="text-xl font-semibold leading-snug tracking-[-0.02em] text-[#FBAB18]">
                    {item.hook}
                  </p>

                  <div className="my-6 h-px w-10 bg-[#0E40C7]" />

                  <p className="whitespace-pre-line text-sm italic leading-6 text-[#585E6C]">
                    “{item.review}”
                  </p>

                  {item.note && (
                    <p className="mt-4 text-xs font-medium text-[#0E40C7]">
                      {item.note}
                    </p>
                  )}
                </div>

                <div className="border-t border-[#D4D6DA] pt-5">
                  <p className="text-sm font-semibold">{item.name}</p>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#757C86]">
                    {item.role}
                  </p>

                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#B2B8BD]">
                    {item.trip}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
    {/* CTA */}
<section className="px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="mx-auto max-w-7xl rounded-[2rem] bg-[#04257E] px-8 py-16 text-white md:px-14 md:py-20"
  >
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#3FB8FF]">
          Your journey starts here
        </p>

        <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
          Ready to create
          <br />
          your own story?
        </h2>

        <p className="mt-5 max-w-lg text-sm leading-6 text-white/60 md:text-base">
          Explore our journeys and find the one that feels like yours.
        </p>
      </div>

      <a
        href="/itinerary/packages"
        className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#04257E] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      >
        Explore journeys
        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>
    </div>
  </motion.div>
</section>
    </main>
  )
}
