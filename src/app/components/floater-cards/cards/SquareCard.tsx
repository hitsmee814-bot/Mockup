"use client"

import { motion } from "framer-motion"

interface Props {
    title: string
    items: string[]
    image: string
}

export default function SquareCard({ title, items, image }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotateX: -3, rotateY: 3, scale: 1.03 }}
            className="relative w-[360px] min-w-[360px] max-w-[360px] h-[500px] flex-shrink-0 rounded-md overflow-hidden shadow-xl" style={{
                transformStyle: "preserve-3d",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
                    <ul className="text-xs text-white/90 space-y-1">
                        {items.map((item, i) => (
                            <li key={i}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}