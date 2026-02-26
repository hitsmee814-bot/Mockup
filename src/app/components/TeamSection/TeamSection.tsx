"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import TeamCard from "./TeamCard"

type Category =
    | "All"
    | "Founders"
    | "Management"
    | "Support"
    | "Sales"
    | "Operations"
    | "Software Developers"

interface TeamMember {
    id: number
    name: string
    role: string
    category: Category
    image: string
    description: string
}

const categories: Category[] = [
    "All",
    "Founders",
    "Management",
    "Support",
    "Sales",
    "Operations",
    "Software Developers",
]

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "James Carter",
        role: "Founder & CEO",
        category: "Founders",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        description: "Visionary leader with 12+ years building tech startups.",
    },
    {
        id: 2,
        name: "Elena Novak",
        role: "CTO",
        category: "Management",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        description: "Leads product engineering and innovation.",
    },
    {
        id: 3,
        name: "Arjun Patel",
        role: "Senior Developer",
        category: "Software Developers",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        description: "Full-stack specialist in scalable web systems.",
    },
    {
        id: 4,
        name: "Sophia Lee",
        role: "Operations Head",
        category: "Operations",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        description: "Ensures seamless business operations.",
    },
    {
        id: 5,
        name: "Michael Chen",
        role: "Sales Director",
        category: "Sales",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        description: "Drives revenue and client partnerships.",
    },
    {
        id: 6,
        name: "Olivia Brown",
        role: "Support Lead",
        category: "Support",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        description: "Heads customer success and support.",
    },
    {
        id: 7,
        name: "Daniel Smith",
        role: "Backend Developer",
        category: "Software Developers",
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        description: "Architect of microservices infrastructure.",
    },
    {
        id: 8,
        name: "Emma Wilson",
        role: "HR Manager",
        category: "Management",
        image: "https://randomuser.me/api/portraits/women/25.jpg",
        description: "Builds strong teams and culture.",
    },
]

export default function TeamSectionNew() {
    const [activeCategory, setActiveCategory] = useState<Category>("All")
    const ref = useRef<HTMLHeadingElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { stiffness: 180, damping: 25 })
    const smoothY = useSpring(mouseY, { stiffness: 180, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const bounds = ref.current?.getBoundingClientRect()
        if (!bounds) return

        mouseX.set(e.clientX - bounds.left)
        mouseY.set(e.clientY - bounds.top)
    }

    const background = useTransform(
        [smoothX, smoothY],
        ([x, y]) =>
            `radial-gradient(
        200px circle at ${x}px ${y}px,
        #ffffff,
        #e5e5e5,
        #bdbdbd,
        #8a8a8a
      )`
    )

    const filteredMembers =
        activeCategory === "All"
            ? teamMembers
            : teamMembers.filter((m) => m.category === activeCategory)

    return (
        <section className="w-full py-20 px-6" id="team">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-10">
                    <motion.h2
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        style={{
                            backgroundImage: background,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                        }}
                        className="text-5xl font-bold cursor-pointer select-none text-[#0E40C7]"
                    >
                        Meet The People
                    </motion.h2>
                    <p className="text-muted-foreground mt-3 text-[#306F7D]">
                        The talented minds behind our success
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => {
                        const isActive = activeCategory === category

                        return (
                            <Button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`
          rounded-full px-5 py-2 text-sm font-medium transition-all duration-300
          border

          ${isActive
                                        ? `
              bg-[#59C3C4]
              text-white
              border-[#306F7D]
              shadow-md
              hover:bg-[#59C3C4]
              hover:border-[#306F7D]
            `
                                        : `
              bg-transparent
              text-[#306F7D]
              border-[#59C3C4]
              hover:bg-[#E7FEFA]
              hover:border-[#83DEE0]
            `
                                    }

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#83DEE0]
          focus-visible:ring-offset-2
        `}
                            >
                                {category}
                            </Button>
                        )
                    })}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence>
                        {filteredMembers.map((member) => (
                            <TeamCard key={member.id} member={member} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}