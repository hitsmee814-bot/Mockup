// "use client"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { X, ArrowLeft } from "lucide-react"
// import type { View } from "./types"
// import HomeView from "./HomeView"
// import FAQView from "./FAQView"
// import ContactView from "./ContactView"
// import RequestView from "./RequestView"
// import logoPrimary from "../../assets/images/white.png"
// import Image from "next/image"

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// const viewTitle: Record<View, string> = {
//   home: "Help & Support",
//   faq: "FAQs",
//   contact: "Contact Us",
//   request: "Ask a Question",
// }

// type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left"

// export default function HelpWidget() {
//   const [open, setOpen] = useState(false)
//   const [view, setView] = useState<View>("home")
//   const [position, setPosition] = useState<Position>("bottom-right")
//   const [menuOpen, setMenuOpen] = useState(false)

//   const widgetRef = useRef<HTMLDivElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)

//   const close = () => {
//     setOpen(false)
//     setTimeout(() => setView("home"), 300)
//   }

//   const positionClasses = {
//     "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6 items-end",
//     "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6 items-start",
//     "top-right": "top-4 right-4 sm:top-6 sm:right-6 items-end",
//     "top-left": "top-4 left-4 sm:top-6 sm:left-6 items-start",
//   }

//   const isTop = position.includes("top")
//   const isLeft = position.includes("left")

//   /* ================= OUTSIDE CLICK CLOSE ================= */
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (!open) return

//       const target = e.target as Node

//       if (
//         widgetRef.current &&
//         !widgetRef.current.contains(target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(target)
//       ) {
//         close()
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside)
//   }, [open])

//   return (
//     <div
//       className={`fixed z-[9999] flex flex-col gap-3 ${positionClasses[position]}`}
//     >
//       {/* ================= Widget Panel ================= */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             ref={widgetRef}
//             initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 350, damping: 30 }}
//             className="flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-primary/20 shadow-2xl shadow-primary/20 sm:w-[380px]"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between bg-primary px-4 py-3.5 sm:px-5 sm:py-4">
//               <div className="flex items-center gap-2.5 min-w-0">
//                 {view !== "home" && (
//                   <motion.button
//                     initial={{ opacity: 0, x: -5 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     onClick={() => setView("home")}
//                     className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-primary-foreground/20"
//                   >
//                     <ArrowLeft className="h-4 w-4 text-primary-foreground" />
//                   </motion.button>
//                 )}
//                 <div>
//                   <h3 className="text-sm font-semibold text-primary-foreground">
//                     {viewTitle[view]}
//                   </h3>
//                   <p className="text-[11px] text-primary-foreground/70">
//                     We&apos;re here to help, 24/7
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={close}
//                 className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-primary-foreground/20"
//               >
//                 <X className="h-4 w-4 text-white" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="force-light custom-scrollbar max-h-[min(480px,60vh)] overflow-y-auto bg-white px-4 py-4 sm:px-5">
//               <AnimatePresence mode="wait">
//                 {view === "home" && <HomeView setView={setView} />}
//                 {view === "faq" && <FAQView />}
//                 {view === "contact" && <ContactView />}
//                 {view === "request" && <RequestView />}
//               </AnimatePresence>
//             </div>

//             <div className="bg-primary px-5 py-2.5">
//               <p className="text-center text-[10px] text-primary-foreground/70">
//                 Powered by Bonhomiee
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ================= Floating Button + Hover Menu ================= */}
//       <div
//         onMouseEnter={() => setMenuOpen(true)}
//         onMouseLeave={() => setMenuOpen(false)}
//       >
//         <Popover open={menuOpen}>
//           <PopoverTrigger asChild>
//             <motion.button
//               ref={buttonRef}
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => (open ? close() : setOpen(true))}
//               className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg shadow-secondary/30 sm:h-14 sm:w-14"
//             >
//               <AnimatePresence mode="wait">
//                 {open ? (
//                   <motion.div
//                     key="close"
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.15 }}
//                   >
//                     <X className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="help"
//                     initial={{ rotate: 90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -90, opacity: 0 }}
//                     transition={{ duration: 0.15 }}
//                   >
//                     <Image
//                       src={logoPrimary}
//                       alt="logo"
//                       height={30}
//                       width={30}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </PopoverTrigger>

//           <PopoverContent
//             side={isTop ? "bottom" : "top"}
//             align={isLeft ? "start" : "end"}
//             className="w-44 p-2"
//           >
//             <div className="flex flex-col gap-1 text-sm">
//               <button onClick={() => setPosition("bottom-right")} className="px-2 py-1 rounded-md hover:bg-muted text-left">
//                 Bottom Right
//               </button>
//               <button onClick={() => setPosition("bottom-left")} className="px-2 py-1 rounded-md hover:bg-muted text-left">
//                 Bottom Left
//               </button>
//               <button onClick={() => setPosition("top-right")} className="px-2 py-1 rounded-md hover:bg-muted text-left">
//                 Top Right
//               </button>
//               <button onClick={() => setPosition("top-left")} className="px-2 py-1 rounded-md hover:bg-muted text-left">
//                 Top Left
//               </button>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    MapPin,
    Mail,
    Phone,
    Clock,
    ArrowUpRight,
    Headphones,
} from "lucide-react"

export default function HelpWidget() {
    const [open, setOpen] = useState(false)

    return (
        <div className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">

            {/* =====================================================
                CONTACT CARD
            ===================================================== */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 28,
                        }}
                        className="
                            absolute
                            bottom-16
                            right-0
                            w-[calc(100vw-2.5rem)]
                            max-w-[380px]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-black/5
                            bg-white
                            shadow-2xl
                            shadow-black/10
                        "
                    >

                        {/* ================= HEADER ================= */}
                        <div className="bg-[#0E40C7] px-5 py-5 text-white">

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white/15
                                    ">
                                        <Headphones className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Need Help?
                                        </h3>

                                        <p className="mt-0.5 text-xs text-white/70">
                                            We&apos;re happy to help.
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close help"
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-white/80
                                        transition
                                        hover:bg-white/10
                                        hover:text-white
                                    "
                                >
                                    <X className="h-4 w-4" />
                                </button>

                            </div>

                        </div>


                        {/* ================= CONTACT DETAILS ================= */}
                        <div className="p-5">

                            <div className="space-y-1">

                                {/* ADDRESS */}
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Ecospace%2C%20AA%20II%2C%20Newtown%2C%20Chakpachuria%2C%20West%20Bengal%20700160"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        flex
                                        gap-3
                                        rounded-xl
                                        p-3
                                        transition
                                        hover:bg-[#F8F6EF]
                                    "
                                >
                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#0E40C7]/10
                                        text-[#0E40C7]
                                    ">
                                        <MapPin className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-xs font-medium text-black/50">
                                                Office
                                            </p>

                                            <ArrowUpRight
                                                className="
                                                    h-3
                                                    w-3
                                                    text-black/30
                                                    transition
                                                    group-hover:text-[#0E40C7]
                                                "
                                            />
                                        </div>

                                        <p className="
                                            mt-1
                                            text-sm
                                            font-medium
                                            leading-relaxed
                                            text-[#10213F]
                                        ">
                                            Ecospace, AA II, Newtown,
                                            Chakpachuria,
                                            West Bengal 700160
                                        </p>
                                    </div>
                                </a>


                                {/* EMAIL */}
                                <a
                                    href="mailto:support@bonhomiee.com"
                                    className="
                                        flex
                                        gap-3
                                        rounded-xl
                                        p-3
                                        transition
                                        hover:bg-[#F8F6EF]
                                    "
                                >
                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#0E40C7]/10
                                        text-[#0E40C7]
                                    ">
                                        <Mail className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-black/50">
                                            Email
                                        </p>

                                        <p className="
                                            mt-1
                                            truncate
                                            text-sm
                                            font-medium
                                            text-[#10213F]
                                        ">
                                            support@bonhomiee.com
                                        </p>
                                    </div>
                                </a>


                                {/* PHONE */}
                                <a
                                    href="tel:+919830268500"
                                    className="
                                        flex
                                        gap-3
                                        rounded-xl
                                        p-3
                                        transition
                                        hover:bg-[#F8F6EF]
                                    "
                                >
                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#0E40C7]/10
                                        text-[#0E40C7]
                                    ">
                                        <Phone className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-black/50">
                                            Phone
                                        </p>

                                        <p className="
                                            mt-1
                                            text-sm
                                            font-medium
                                            text-[#10213F]
                                        ">
                                            098302 68500
                                        </p>
                                    </div>
                                </a>


                                {/* HOURS */}
                                <div className="
                                    flex
                                    gap-3
                                    rounded-xl
                                    p-3
                                ">
                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-[#0E40C7]/10
                                        text-[#0E40C7]
                                    ">
                                        <Clock className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-black/50">
                                            Hours
                                        </p>

                                        <p className="
                                            mt-1
                                            text-sm
                                            font-medium
                                            text-[#10213F]
                                        ">
                                            Open · Closes 10 PM
                                        </p>
                                    </div>
                                </div>

                            </div>


                            {/* ================= DIRECTIONS ================= */}
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Ecospace%2C%20AA%20II%2C%20Newtown%2C%20Chakpachuria%2C%20West%20Bengal%20700160"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-4
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    bg-[#0E40C7]
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-[#0B36A8]
                                    hover:shadow-lg
                                "
                            >
                                <MapPin className="h-4 w-4" />
                                <span>Get Directions</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </a>

                        </div>


                        {/* ================= FOOTER ================= */}
                        <div className="
                            border-t
                            border-black/5
                            px-5
                            py-3
                            text-center
                        ">
                            <p className="text-[10px] text-black/40">
                                Bonhomiee · Travel, thoughtfully designed.
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>


            {/* =====================================================
                FLOATING BUTTON
            ===================================================== */}
            <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label={open ? "Close help" : "Open help"}
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0E40C7]
                    text-white
                    shadow-lg
                    shadow-[#0E40C7]/25
                    sm:h-14
                    sm:w-14
                "
            >
                <AnimatePresence mode="wait">

                    {open ? (
                        <motion.div
                            key="close"
                            initial={{
                                opacity: 0,
                                rotate: -90,
                            }}
                            animate={{
                                opacity: 1,
                                rotate: 0,
                            }}
                            exit={{
                                opacity: 0,
                                rotate: 90,
                            }}
                        >
                            <X className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="help"
                            initial={{
                                opacity: 0,
                                rotate: 90,
                            }}
                            animate={{
                                opacity: 1,
                                rotate: 0,
                            }}
                            exit={{
                                opacity: 0,
                                rotate: -90,
                            }}
                        >
                            <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.button>

        </div>
    )
}