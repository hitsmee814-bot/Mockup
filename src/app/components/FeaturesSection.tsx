"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import TestimonialsSection from "../ext/TestimonialsSection";
import TestimonialsCleanGrid from "../ext/TestimonialsSection";

export default function FeaturesSection() {
  const emotions = [
    { title: "Feel Revitalized in Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { title: "Feel Challenged in Patagonia", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { title: "Family Adventures", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { title: "Romantic Escapes", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { title: "Cultural Immersions", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff" },
    { title: "Wildlife Encounters", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  ];

  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-12 text-center"
          >
            Signature Apps
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.25 } },
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: "🗺️", title: "Custom Itinerary Builder", desc: "AI-Powered, Expert-Verified", cta: "Start Planning" },
              { icon: "💼", title: "Corporate Travel", desc: "Policy Compliance, Expense Automation", cta: "Book a Demo" },
              { icon: "🔍", title: "Direct Bookings", desc: "Global Inventory, Best Price Guarantee", cta: "Search Now" },
            ].map((tile) => (
              <motion.div
                key={tile.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-start"
              >
                <div className="text-3xl mb-6">{tile.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{tile.title}</h3>
                <p className="text-sm text-gray-600 mt-3">{tile.desc}</p>

                <button className="mt-8 relative overflow-hidden px-5 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 group">
                  <span className="relative z-10">{tile.cta}</span>
                  <motion.span
                    initial={{ x: "-150%" }}
                    whileHover={{ x: "150%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>



        </div>
      </div>
      <div className="w-full  py-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-900 text-center mb-6"
        >
          Where Will Your Emotions Take You?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Curated inspiration powered by GenAI personalization, designed to
          help you travel by how you want to feel.
        </motion.p>

        <div className="relative w-full h-20 bg-gray-50 overflow-hidden flex items-center">
          <motion.div
            className="flex gap-16 text-xl italic font-semibold text-gray-500"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
          >
            {[
              { icon: "🌴", text: "Feel Revitalized in Bali" },
              { icon: "⛰️", text: "Feel Challenged in Patagonia" },
              { icon: "👨‍👩‍👧‍👦", text: "Family Adventures" },
              { icon: "❤️", text: "Romantic Escapes" },
              { icon: "🎭", text: "Cultural Immersions" },
              { icon: "🦁", text: "Wildlife Encounters" },
            ]
              .concat([
                { icon: "🌴", text: "Feel Revitalized in Bali" },
                { icon: "⛰️", text: "Feel Challenged in Patagonia" },
                { icon: "👨‍👩‍👧‍👦", text: "Family Adventures" },
                { icon: "❤️", text: "Romantic Escapes" },
                { icon: "🎭", text: "Cultural Immersions" },
                { icon: "🦁", text: "Wildlife Encounters" },
              ])
              .map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 whitespace-nowrap px-2 group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="relative text-gray-500 group-hover:text-transparent bg-clip-text group-hover:animate-gradient"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #0004f6ff, #000792ff, #00004bff)", // Indigo → Violet → Pink
                      backgroundSize: "200%",
                      backgroundPosition: "0% 50%",
                    }}
                  >
                    {item.text}
                  </span>

                </div>
              ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">

        <TestimonialsSection></TestimonialsSection>

        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gray-50 rounded-xl p-10 shadow-md text-center"
        >
          <p className="text-gray-700 italic text-lg">
            “This platform made planning my family trip effortless — everything
            was seamless and stress-free.”
          </p>
          <p className="mt-4 text-sm font-medium text-gray-900">— Sarah, NYC</p>
        </motion.div> */}

      </div>
    </section>
  );
}
