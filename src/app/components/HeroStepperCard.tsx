"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    HiOutlineOfficeBuilding,
    HiOutlinePaperAirplane,
    HiOutlineGlobeAlt,
} from "react-icons/hi"

const steps = [
    {
        title: "Hotels",
        icon: HiOutlineOfficeBuilding,
        bg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600",
        items: [
            "Luxury Resorts",
            "Boutique Hotels",
            "Business Stays",
            "Budget Friendly Options",
            "Instant Room Confirmation",
        ],
    },
    {
        title: "Flights",
        icon: HiOutlinePaperAirplane,
        bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600",
        items: [
            "Instant Booking",
            "Global Airlines",
            "Lowest Fare Guarantee",
            "Corporate Discounts",
            "Real-Time Availability",
        ],
    },
    {
        title: "Packages",
        icon: HiOutlineGlobeAlt,
        bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600",
        items: [
            "Bali",
            "Dubai",
            "Switzerland",
            "Maldives",
            "All-Inclusive Deals",
        ],
    },
]

export default function HeroStepperCard() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % steps.length)
        }, 4500)

        return () => clearInterval(interval)
    }, [])

    const current = steps[active]

    return (
        <div
            className="relative w-full h-[520px] overflow-hidden shadow-2xl"
            style={{
                borderTopLeftRadius: "120px",
                borderBottomRightRadius: "120px",
            }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center scale-110 blur-xl"
                style={{ backgroundImage: `url(${current.bg})` }}
            />

            <AnimatePresence>
                <motion.img
                    key={current.bg}
                    src={current.bg}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, filter: "blur(0px)" }}
                    animate={{ opacity: 1, filter: "blur(1px)" }}
                    exit={{ opacity: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">

                <div className="flex items-center justify-between mt-2">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = index === active

                        return (
                            <div
                                key={index}
                                className="relative flex flex-col items-center flex-1"
                            >
                                {index !== 0 && (
                                    <div className="absolute top-5 left-0 w-1/2 h-px bg-white/30" />
                                )}
                                {index !== steps.length - 1 && (
                                    <div className="absolute top-5 right-0 w-1/2 h-px bg-white/30" />
                                )}

                                <motion.div
                                    animate={{
                                        y: isActive ? -6 : 0,
                                        backgroundColor: isActive
                                            ? "rgba(255,255,255,1)"
                                            : "rgba(255,255,255,0.4)",
                                        scale: isActive ? 1.05 : 1,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                                >
                                    <Icon
                                        size={18}
                                        className={isActive ? "text-[#1B120B]" : "text-white"}
                                    />
                                </motion.div>

                                <span
                                    className={`mt-2 text-xs font-medium ${isActive ? "text-white" : "text-white/60"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.ul
                        key={active}
                        className="mt-0 space-y-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {current.items.map((item, i) => (
                            <motion.li
                                key={i}
                                className="text-sm bg-white/10 px-4 py-2 rounded-md"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.25 }}
                            >
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>

                <p className="text-xs text-white/100">
                    Seamless, fast and reliable travel solutions.
                </p>
            </div>
        </div>
    )
}