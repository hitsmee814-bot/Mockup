"use client"

import { PremiumButton } from "@/app/utils/PremiumButton"
import { motion } from "framer-motion"
import { Calendar, CreditCard, Handshake, MapIcon, Plane, Share2 } from "lucide-react"

const roadmap = [
  {
    title: "Discover",
    desc: "Uncover curated destinations, hidden gems, and exclusive experiences tailored to your preferences. Our intelligent discovery engine learns what inspires you.",
    icon: MapIcon,
  },
  {
    title: "Plan",
    desc: "Craft personalized itineraries with smart scheduling, budget optimization, and real-time availability across flights, hotels, and local activities.",
    icon: Calendar,
  },
  {
    title: "Book",
    desc: "Secure seamless bookings with instant confirmations, transparent pricing, and premium customer support every step of the way.",
    icon: CreditCard,
  },
  {
    title: "Travel",
    desc: "Experience stress-free journeys with live updates, concierge support, and beautifully organized travel documentation in one place.",
    icon: Plane,
  },
  {
    title: "Share",
    desc: "Relive and share your memories effortlessly while earning rewards and personalized recommendations for your next adventure.",
    icon: Share2,
  },
]

export default function RoadmapTimeline() {
  return (
    <>
      <section className="pt-20 bg-transparent min-h-screen flex items-center relative overflow-hidden" id="partner">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,184,255,0.12),_transparent_60%)]" />

        <div className="max-w-[1700px] mx-auto px-6 md:px-16 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-28"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B120B] tracking-tight">
              Our Journey
            </h2>
          </motion.div>

          <div className="relative flex flex-col md:flex-row gap-16 md:gap-8">

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3FB8FF] to-transparent origin-left"
            />

            {/* <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#3FB8FF] to-transparent origin-top"
            /> */}

            {roadmap.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + index * 0.15,
                  }}
                  className="relative flex-1"
                >
                  <div className="flex flex-col items-center text-center">

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8"
                    >
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3FB8FF] to-[#FBAB18] blur-xl opacity-40" />

                      <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#3FB8FF] to-[#FBAB18] p-[2px]">
                        <div className="w-full h-full rounded-3xl bg-[#1B120B] flex items-center justify-center">
                          <Icon className="w-9 h-9 md:w-11 md:h-11 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1B120B] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#1B120B]/70 text-sm md:text-base leading-relaxed px-4 md:px-6">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pt-5 md:pt-0 pb-20 bg-transparent relative overflow-hidden">        <div className="max-w-[1700px] mx-auto px-6 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-[#1B120B] mb-6">
            Partner with Us
          </h3>

          <p className="text-[#1B120B]/70 text-lg mb-10 max-w-2xl mx-auto">
            Join industry leaders who trust us to deliver exceptional experiences
          </p>

          <PremiumButton
            variant="secondary"
            className="mb-4 mx-auto flex items-center justify-center gap-2"
          >
            Get in touch
            <Handshake className="w-4 h-4" />
          </PremiumButton>
        </motion.div>
      </div>
      </section>
    </>
  )
}