"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function FloatingCardsSection() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
   <section
  ref={sectionRef}
  className="w-screen py-32 overflow-hidden relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
>
  <div className="grid grid-cols-6 gap-6 w-[120vw] -ml-[10vw]">
        <AnimatedColumn scrollYProgress={scrollYProgress} range={60}>
          <TallCard
            title="Business Travel"
            description="Streamlined business travel solutions that save time and money while ensuring comfort and efficiency."
            image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          />
          <SquareCard
            title="Business Features"
            items={[
              "Dedicated account management",
              "Cost control reporting",
              "Multi-city itineraries",
              "Meeting & event planning",
            ]}
            image="https://cdn-icons-png.flaticon.com/512/747/747310.png"
          />
        </AnimatedColumn>

        <AnimatedColumn
          scrollYProgress={scrollYProgress}
          range={-70}
          className="mt-20"
        >
          <TallCard
            title="Custom Holidays"
            description="Personalized travel experiences crafted just for you. From weekend getaways to dream vacations."
            image="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          />
        </AnimatedColumn>

        <AnimatedColumn
          scrollYProgress={scrollYProgress}
          range={55}
          className="mt-8"
        >
          <SquareCard
            title="Holiday Features"
            items={[
              "Custom itineraries",
              "Exclusive deals",
              "24/7 traveler support",
              "VIP airport services",
            ]}
            image="https://cdn-icons-png.flaticon.com/512/854/854878.png"
          />
          <TallCard
            title="Welcome to Bonhomiee"
            description="India's pioneering digital travel ecosystem where technology and innovation redefine travel."
            image="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
          />
        </AnimatedColumn>

        <AnimatedColumn
          scrollYProgress={scrollYProgress}
          range={-80}
          className="mt-28"
        >
          <TallCard
            title="Our Mission"
            description="To revolutionize corporate and leisure travel with AI-powered personalization and seamless systems."
            image="https://cdn-icons-png.flaticon.com/512/4149/4149640.png"
          />
        </AnimatedColumn>

        <AnimatedColumn
          scrollYProgress={scrollYProgress}
          range={65}
          className="mt-12"
        >
          <TallCard
            title="Our Vision"
            description="To be the most trusted and innovative travel partner blending efficiency and authenticity."
            image="https://cdn-icons-png.flaticon.com/512/3105/3105807.png"
          />
          <SquareCard
            title="Our Story"
            items={[
              "Startup agility",
              "Entrepreneurial spirit",
              "Corporate & leisure focus",
              "Technology driven",
            ]}
            image="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          />
        </AnimatedColumn>

        <AnimatedColumn
          scrollYProgress={scrollYProgress}
          range={-75}
          className="mt-36"
        >
          <TallCard
            title="Bonhomiee Team"
            description="A passionate team building smart, seamless, and meaningful journeys for modern travelers."
            image="https://cdn-icons-png.flaticon.com/512/921/921347.png"
          />
        </AnimatedColumn>
      </div>
    </section>
  )
}


function AnimatedColumn({
  children,
  scrollYProgress,
  range,
  className = "",
}: {
  children: React.ReactNode
  scrollYProgress: any
  range: number
  className?: string
}) {
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [range, 0, -range])

  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col gap-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}


function TallCard({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ rotateX: 4, rotateY: -4 }}
      className="group rounded-md bg-white h-[500px] shadow-xl p-6 flex flex-col justify-between"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div>
        <h3 className="text-lg font-semibold text-black mb-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="w-20 h-20 overflow-hidden self-end">
  <img
    src={image}
    alt=""
    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
  />
</div>
    </motion.div>
  )
}

function SquareCard({
  title,
  items,
  image,
}: {
  title: string
  items: string[]
  image: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ rotateX: -3, rotateY: 3 }}
      className="group rounded-md bg-white h-[200px] shadow-lg p-5 flex flex-col justify-between"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div>
        <h4 className="text-sm font-semibold text-black mb-2">
          {title}
        </h4>

        <ul className="text-xs text-neutral-700 space-y-1">
          {items.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="w-14 h-14 overflow-hidden self-end">
  <img
    src={image}
    alt=""
    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
  />
</div>
    </motion.div>
  )
}