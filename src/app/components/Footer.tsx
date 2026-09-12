// "use client"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import type { Variants } from "framer-motion"
// import {
//   Instagram,
//   Twitter,
//   Facebook,
//   MapPin,
//   Mail,
//   Phone,
// } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import Logo from "../assets/images/logo in white.png"

// const container: Variants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.12,
//     },
//   },
// }

// const item: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// }

// export default function PremiumFooter() {
//   const [hoveredLink, setHoveredLink] = useState<string | null>(null)

//   return (
//     <footer className="relative bg-gradient-to-br from-[#071A2F] via-[#0A2540] to-[#0E2F56] text-white overflow-hidden border-t border-[#479EA8]/20">

//       <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-[#1DA1F2] via-[#479EA8]/30 to-[#00C6FF] blur-3xl"></div>

//       <motion.div
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12"
//       >
//         <motion.div variants={item}>
//           <div className="mb-6">
//             <Image
//               src={Logo}
//               alt="Logo"
//               className="h-10 w-auto object-contain"
//               priority
//             />
//           </div>

//           <p className="text-white/70 leading-relaxed text-sm">
//             Explore the world with luxury and comfort. Premium curated travel
//             experiences crafted for unforgettable journeys.
//           </p>

//           {/* Social Icons */}
//           <div className="flex gap-4 mt-6">
//             {[Instagram, Twitter, Facebook].map((Icon, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.15, y: -3 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="group p-2 bg-[#0E2F56] rounded-full border border-[#479EA8]/40 hover:border-[#FBAB18] hover:shadow-[0_0_20px_#FBAB18] transition-all duration-300"
//               >
//                 <Icon
//                   size={18}
//                   className="text-[#479EA8] group-hover:text-[#FBAB18] transition-colors duration-300"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div variants={item}>
//           <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
//             Explore
//           </h3>
//           <ul className="space-y-4 text-sm">
//             {[
//               "Destinations",
//               "Luxury Packages",
//               "Adventure Tours",
//               "Cruises",
//               "Private Jets",
//             ].map((link, i) => (
//               <li key={i}>
//                 <div
//                   className="relative w-fit"
//                   onMouseEnter={() => setHoveredLink(link)}
//                   onMouseLeave={() => setHoveredLink(null)}
//                 >
//                   <Link
//                     href="#"
//                     className="relative font-medium text-white/70 hover:text-[#FBAB18] transition-colors"
//                   >
//                     {link}
//                     <motion.span
//                       className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#FBAB18] to-[#FFD166] origin-left"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: hoveredLink === link ? 1 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </Link>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </motion.div>

//         <motion.div variants={item}>
//           <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
//             Company
//           </h3>
//           <ul className="space-y-4 text-sm">
//             {[
//               "About Us",
//               "Travel Blog",
//               "FAQ",
//               "Careers",
//               "Privacy Policy",
//               "Terms & Conditions",
//             ].map((link, i) => (
//               <li key={i}>
//                 <motion.div
//                   className="relative w-fit"
//                   initial="rest"
//                   whileHover="hover"
//                   animate="rest"
//                 >
//                   <Link
//                     href="#"
//                     className="relative font-medium text-white/70 hover:text-[#FBAB18] transition-colors duration-300"
//                   >
//                     {link}
//                   </Link>

//                   <motion.span
//                     variants={{
//                       rest: { scaleX: 0 },
//                       hover: { scaleX: 1 },
//                     }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#FBAB18] to-[#FFD166] origin-left"
//                   />
//                 </motion.div>
//               </li>
//             ))}
//           </ul>
//         </motion.div>

//         <motion.div variants={item}>
//           <h3 className="text-lg font-semibold mb-6 text-[#5ED3FF]">
//             Contact
//           </h3>

//           <div className="space-y-4 text-white/70 text-sm">
//             <div className="flex items-center gap-3 group">
//               <MapPin size={16} className="text-[#479EA8] group-hover:text-[#FBAB18] transition-colors duration-300" />
//               <span className="group-hover:text-white transition-colors duration-300">
//                 Kolkata, India
//               </span>
//             </div>

//             <div className="flex items-center gap-3 group">
//               <Phone size={16} className="text-[#479EA8] group-hover:text-[#FBAB18] transition-colors duration-300" />
//               <span className="group-hover:text-white transition-colors duration-300">
//                 +91 9330868500
//               </span>
//             </div>

//             <div className="flex items-center gap-3 group">
//               <Mail size={16} className="text-[#479EA8] group-hover:text-[#FBAB18] transition-colors duration-300" />
//               <span className="group-hover:text-white transition-colors duration-300">
//                 bookings@bonhomiee.com
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       <div className="relative border-t border-[#479EA8]/40 shadow-[0_-5px_30px_rgba(63,184,255,0.2)] text-center py-6 text-sm text-white/50">
//         © {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.
//       </div>
//     </footer>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../assets/images/logo in white.png"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function PremiumFooter() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const exploreLinks = ["Destinations", "Luxury Packages", "Adventure Tours", "Cruises", "Private Jets"]
  const companyLinks = ["About Us", "Travel Blog", "FAQ", "Careers", "Privacy Policy", "Terms & Conditions"]

  return (
    <footer className="relative overflow-hidden bg-[#04257E] text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>

          {/* TOP STATEMENT */}
          <motion.div variants={item} className="border-b border-white/15 py-16 md:py-20">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                  Travel that feels
                  <br />
                  <span className="text-[#3FB8FF]">understood.</span>
                </h2>
              </div>

              <Link href="/packages" className="group flex w-fit items-center gap-3 border-b border-white/30 pb-2 text-sm font-medium text-white transition-colors hover:border-[#FBAB18] hover:text-[#FBAB18]">
                Explore journeys
                <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </motion.div>

          {/* MAIN FOOTER */}
          <div className="grid grid-cols-1 gap-14 py-16 sm:grid-cols-2 md:grid-cols-4 md:gap-10 lg:py-20">

            {/* BRAND */}
            <motion.div variants={item} className="sm:col-span-2 md:col-span-1">
              <Image src={Logo} alt="Bonhomiee" className="h-10 w-auto object-contain" priority />

              <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">
                Explore the world with luxury and comfort. Premium curated travel experiences crafted for unforgettable journeys.
              </p>

              <div className="mt-7 flex items-center gap-2.5">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/65 transition-all duration-300 hover:border-[#3FB8FF] hover:bg-[#3FB8FF] hover:text-white"
                    aria-label={`Social media ${i + 1}`}
                  >
                    <Icon size={17} strokeWidth={1.7} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* EXPLORE */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Explore
              </h3>

              <ul className="space-y-4 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      onMouseEnter={() => setHoveredLink(link)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group relative inline-flex items-center text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link}
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: hoveredLink === link ? "100%" : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute -bottom-1 left-0 h-px bg-[#FBAB18]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Company
              </h3>

              <ul className="space-y-4 text-sm">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="group relative inline-flex text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#FBAB18] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CONTACT */}
            <motion.div variants={item}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#3FB8FF]">
                Contact
              </h3>

              <div className="space-y-5 text-sm">
                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <MapPin size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]" />
                  <span>Kolkata, India</span>
                </div>

                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <Phone size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]" />
                  <span>+91 9330868500</span>
                </div>

                <div className="group flex items-start gap-3 text-white/65 transition-colors duration-300 hover:text-white">
                  <Mail size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[#3FB8FF] transition-colors group-hover:text-[#FBAB18]" />
                  <span className="break-all">bookings@bonhomiee.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM BAR */}
          <motion.div variants={item} className="flex flex-col gap-4 border-t border-white/15 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Bonhomiee Travels. All rights reserved.</p>
            <p className="text-white/35">Thoughtful journeys. Seamlessly planned.</p>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}