"use client"

import { motion, Variants } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface Props {
  member: {
    name: string
    role: string
    image: string
    description: string
  }
}

const panelVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function TeamCard({ member }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <Card className="overflow-hidden rounded-2xl shadow-xl cursor-pointer py-0">
        <div className="relative h-[320px] w-full bg-black">

          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />

          <motion.div
            className="absolute inset-0 bg-white flex flex-col justify-center items-center p-6 text-center"
            variants={panelVariants}
            initial="hidden"
            animate={hovered ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-semibold mb-1 text-black/70">{member.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
            <p className="text-sm text-black/70">{member.description}</p>
          </motion.div>

        </div>
      </Card>
    </motion.div>
  )
}