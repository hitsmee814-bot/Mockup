"use client"

import { motion } from "framer-motion"

interface Props {
    title: string
    description: string
    image: string
}

export default function TallCard({ title, description, image }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
            className="relative w-[360px] min-w-[360px] max-w-[360px] h-[500px] flex-shrink-0 rounded-md overflow-hidden shadow-xl" style={{
                transformStyle: "preserve-3d",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}