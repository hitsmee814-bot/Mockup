"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function VisionMissionSection() {
  return (
    <section className="relative w-full py-28 overflow-hidden" id="inspiration">
      <div className="container relative mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E40C7]"
          >
            Our Vision & Mission
          </h2>

          <p className="mt-5 text-[#306F7D] max-w-2xl mx-auto text-lg">
            Driven by innovation and guided by purpose, we strive to create meaningful
            impact through technology and collaboration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <Card className="
  group relative overflow-hidden rounded-3xl
  border border-[#3769F1]/25
  bg-gradient-to-br
  from-[#04257E]/80
  via-[#0E40C7]/60
  to-[#3769F1]/40
  backdrop-blur-lg shadow-xl
">

              <div className="absolute inset-0 rounded-3xl p-[1px]
  bg-gradient-to-br from-[#3769F1]/60 via-transparent to-[#0E40C7]/60
  opacity-0 group-hover:opacity-100 transition duration-500"
              />

              <CardContent className="relative p-8">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                    alt="Vision"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-[#FFFFFF]">
                  Our Vision
                </h3>

                <p className="text-[#FFFFFF]/75 leading-relaxed">
                  To become a globally trusted organization that empowers businesses
                  and individuals through innovative digital solutions. We envision
                  a future where technology bridges gaps and transforms ideas into
                  impactful realities.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <Card className="
  group relative overflow-hidden rounded-3xl
  border border-[#59C3C4]/25
  bg-gradient-to-br
  from-[#306F7D]/80
  via-[#479EA8]/55
  to-[#59C3C4]/35
  backdrop-blur-lg shadow-xl
">
              <div className="absolute inset-0 rounded-3xl p-[1px]
  bg-gradient-to-br from-[#59C3C4]/60 via-transparent to-[#306F7D]/60
  opacity-0 group-hover:opacity-100 transition duration-500"
              />

              <CardContent className="relative p-8">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
                    alt="Mission"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-[#FFFFFF]">
                  Our Mission
                </h3>

                <p className="text-[#FFFFFF]/75 leading-relaxed">
                  Our mission is to deliver high-quality, scalable, and user-focused
                  solutions that drive measurable results. We are committed to
                  continuous improvement, ethical practices, and building long-term
                  partnerships.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  )
}