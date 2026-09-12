// "use client"

// import { motion } from "framer-motion"
// import {
//     Compass,
//     Heart,
//     Lightbulb,
//     Sparkles,
//     Users,
// } from "lucide-react"
// import { useState } from "react"

// const roles = [
//     {
//         title: "The Listener",
//         icon: Heart,
//         description:
//             "Starts with questions, not assumptions. Understands the story, the occasion, the people, and what the traveller actually wants from the journey.",
//     },
//     {
//         title: "The Curator",
//         icon: Compass,
//         description:
//             "Looks beyond the obvious. Finds the stays, places, experiences, and details that make a journey feel considered rather than assembled.",
//     },
//     {
//         title: "The Operator",
//         icon: Users,
//         description:
//             "Makes the complexity disappear. Coordinates the moving parts behind the journey so the traveller can focus on experiencing it.",
//     },
//     {
//         title: "The Technologist",
//         icon: Lightbulb,
//         description:
//             "Builds systems that make better personalisation possible without taking the human thinking out of travel.",
//     },
//     {
//         title: "The Caregiver",
//         icon: Sparkles,
//         description:
//             "Stays close to the journey. Anticipates what might matter, responds when plans change, and makes sure the traveller never feels left alone.",
//     },
// ]

// const container = {
//     hidden: {},
//     visible: {
//         transition: {
//             staggerChildren: 0.08,
//         },
//     },
// }

// const cardAnimation = {
//     hidden: {
//         opacity: 0,
//         y: 25,
//     },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.65,
//             ease: [0.16, 1, 0.3, 1] as const,
//         },
//     },
// }

// export default function AboutTeam() {
//     const [activeCard, setActiveCard] = useState<number | null>(null)

//     return (
//         <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">

//             <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">


//                 <motion.div
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{
//                         once: true,
//                         margin: "-100px",
//                     }}
//                     variants={cardAnimation}
//                     className="max-w-3xl"
//                 >
//                     <p
//                         className="
//                             mb-6
//                             text-xs
//                             font-semibold
//                             uppercase
//                             tracking-[0.25em]
//                             text-[#0E40C7]
//                         "
//                     >
//                         How we work
//                     </p>

//                     <h2
//                         className="
//                             text-4xl
//                             font-semibold
//                             leading-[1]
//                             tracking-[-0.045em]
//                             text-black
//                             sm:text-5xl
//                             lg:text-6xl
//                         "
//                     >
//                         A small team.
//                         <br />
//                         <span className="text-black/35">
//                             Deeply involved.
//                         </span>
//                     </h2>

//                     <p
//                         className="
//                             mt-7
//                             max-w-2xl
//                             text-base
//                             leading-[1.8]
//                             text-black/50
//                             sm:text-lg
//                         "
//                     >
//                         We don&apos;t organise ourselves around departments.
//                         We organise around the work a great journey demands.
//                         Different perspectives, one shared responsibility:
//                         making the experience feel unmistakably yours.
//                     </p>
//                 </motion.div>


//                 <motion.div
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{
//                         once: true,
//                         margin: "-80px",
//                     }}
//                     variants={container}
//                     className="
//                         mt-14
//                         grid
//                         grid-cols-1
//                         gap-3
//                         sm:grid-cols-2
//                         lg:mt-20
//                         lg:grid-cols-5
//                     "
//                 >

//                     {roles.map((role, index) => {
//                         const Icon = role.icon
//                         const isActive = activeCard === index

//                         return (
//                             <motion.div
//                                 key={role.title}
//                                 variants={cardAnimation}
//                                 onMouseEnter={() => setActiveCard(index)}
//                                 onMouseLeave={() => setActiveCard(null)}
//                                 onClick={() =>
//                                     setActiveCard(
//                                         isActive ? null : index
//                                     )
//                                 }
//                                 className={`
//                                     group
//                                     relative
//                                     min-h-[230px]
//                                     cursor-pointer
//                                     overflow-hidden
//                                     rounded-2xl
//                                     border
//                                     p-6
//                                     transition-all
//                                     duration-500
//                                     sm:min-h-[260px]
//                                     ${
//                                         isActive
//                                             ? "border-[#0E40C7]/20 bg-[#F5F8FF]"
//                                             : "border-black/[0.07] bg-[#FAFAF9] hover:border-black/10"
//                                     }
//                                 `}
//                             >

//                                 {/* Number */}

//                                 <span
//                                     className="
//                                         absolute
//                                         right-5
//                                         top-5
//                                         text-xs
//                                         font-medium
//                                         tabular-nums
//                                         text-black/20
//                                     "
//                                 >
//                                     0{index + 1}
//                                 </span>


//                                 {/* Icon */}

//                                 <div
//                                     className={`
//                                         flex
//                                         h-11
//                                         w-11
//                                         items-center
//                                         justify-center
//                                         rounded-xl
//                                         transition-all
//                                         duration-500
//                                         ${
//                                             isActive
//                                                 ? "bg-[#0E40C7] text-white"
//                                                 : "bg-black/[0.04] text-black/45"
//                                         }
//                                     `}
//                                 >
//                                     <Icon className="h-5 w-5" strokeWidth={1.7} />
//                                 </div>


//                                 {/* Role */}

//                                 <div className="absolute bottom-6 left-6 right-6">

//                                     <h3
//                                         className="
//                                             text-xl
//                                             font-medium
//                                             tracking-tight
//                                             text-black
//                                         "
//                                     >
//                                         {role.title}
//                                     </h3>


//                                     {/* Description */}

//                                     <motion.div
//                                         initial={false}
//                                         animate={{
//                                             height: isActive ? "auto" : 0,
//                                             opacity: isActive ? 1 : 0,
//                                             marginTop: isActive ? 12 : 0,
//                                         }}
//                                         transition={{
//                                             duration: 0.35,
//                                             ease: [0.16, 1, 0.3, 1],
//                                         }}
//                                         className="overflow-hidden"
//                                     >
//                                         <p
//                                             className="
//                                                 text-sm
//                                                 leading-[1.65]
//                                                 text-black/50
//                                             "
//                                         >
//                                             {role.description}
//                                         </p>
//                                     </motion.div>

//                                 </div>

//                             </motion.div>
//                         )
//                     })}

//                 </motion.div>


//                 <motion.div
//                     initial={{
//                         opacity: 0,
//                         y: 25,
//                     }}
//                     whileInView={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                     viewport={{
//                         once: true,
//                         margin: "-80px",
//                     }}
//                     transition={{
//                         duration: 0.8,
//                         ease: [0.16, 1, 0.3, 1],
//                     }}
//                     className="
//                         mt-16
//                         max-w-2xl
//                         border-t
//                         border-black/10
//                         pt-8
//                         lg:mt-20
//                     "
//                 >

//                     <p
//                         className="
//                             text-xl
//                             font-medium
//                             leading-relaxed
//                             tracking-tight
//                             text-black
//                             sm:text-2xl
//                         "
//                     >
//                         Different roles.
//                         <br />
//                         One way of thinking.
//                     </p>

//                     <p
//                         className="
//                             mt-4
//                             text-sm
//                             leading-relaxed
//                             text-black/40
//                             sm:text-base
//                         "
//                     >
//                         The people behind Bonhomiee are united by the belief
//                         that thoughtful travel starts with paying attention.
//                     </p>

//                 </motion.div>

//             </div>

//         </section>
//     )
// }

"use client"

import { motion, type Variants } from "framer-motion"
import { useState } from "react"

const members = [
    {
        name: "Sudip Pal",
        position: "Founder",
        description:
            "Keeps asking the one question everything else is built on: what is this trip for?",
    },
    {
        name: "Operations & Partnership",
        position: "Operations & Partnership",
        description:
            "The reason intent becomes delivery. Turning thoughtful planning into a journey that works.",
    },
    {
        name: "Technology & Ascendus",
        position: "Technology & Ascendus",
        description:
            "Builds the layer you're never meant to notice — making depth and personalisation possible at scale.",
    },
    {
        name: "Brand & Story",
        position: "Brand & Story",
        description:
            "Guards how we sound, so nothing here could belong to any other travel company.",
    },
    {
        name: "Trip Design",
        position: "Trip Design",
        description:
            "Asks more questions than it answers, before it writes a single itinerary.",
    },
    {
    name: "Care",
    position: "Care",
    description:
        "Already on it before you've noticed something's wrong.",
},
]

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

export default function AboutTeam() {
    const [activeCard, setActiveCard] = useState<number | null>(null)

    return (
        <section className="bg-white py-18 text-[#1B120B] sm:py-18 lg:py-18">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Intro */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="max-w-3xl"
                >
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E40C7] sm:text-base">
                            About the team
                        </p>

                        <div className="mt-5 h-[2px] w-20 bg-[#FBAB18]" />
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[58px]">
                        A small team,
                        <br />
                        <span className="text-[#0E40C7]">
                            for the trips that matter.
                        </span>
                    </h2>

                    <p className="mt-8 max-w-2xl text-base leading-[1.85] text-[#1B120B]/70 sm:text-lg">
                        We introduce ourselves by how we think, not by headshots.
                        Different perspectives, one shared responsibility:
                        making every journey feel considered, personal, and
                        unmistakably yours.
                    </p>
                </motion.div>

                {/* Team Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={container}
                    className="
                        mt-14 grid grid-cols-1 gap-5
                        sm:grid-cols-2
                        lg:mt-20 lg:grid-cols-3
                    "
                >
                    {members.map((member, index) => {
                        const isActive = activeCard === index

                        return (
                            <motion.div
                                key={member.name}
                                variants={fadeUp}
                                onMouseEnter={() => setActiveCard(index)}
                                onMouseLeave={() => setActiveCard(null)}
                                onClick={() =>
                                    setActiveCard(isActive ? null : index)
                                }
className={`
    group relative min-h-[280px]
    cursor-pointer overflow-hidden
    rounded-[1.75rem] border p-8
    transition-all duration-500
    sm:min-h-[300px]
    lg:min-h-[310px]
    ${
        isActive
            ? "border-[#0E40C7]/20 bg-[#F5F8FF]"
            : "border-[#1B120B]/10 bg-[#FAFAF9] hover:border-[#0E40C7]/15"
    }
`}
                            >
                                {/* Number */}
                                <span className="
                                    absolute right-7 top-7
                                    text-sm font-medium
                                    tabular-nums
                                    text-[#1B120B]/20
                                ">
                                    0{index + 1}
                                </span>

                                {/* Member Info */}
                                <div className="
                                    absolute bottom-7
                                    left-7 right-7
                                ">
                                    <p className="
                                        mb-2 text-xs font-medium
                                        uppercase tracking-[0.16em]
                                        text-[#0E40C7]/70
                                    ">
                                        {member.position}
                                    </p>

                                    <h3 className="
                                        max-w-[220px]
                                        text-2xl font-semibold
                                        leading-[1.15]
                                        tracking-[-0.035em]
                                        text-[#1B120B]
                                    ">
                                        {member.name}
                                    </h3>

                                    {/* Hover Description */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isActive ? "auto" : 0,
                                            opacity: isActive ? 1 : 0,
                                            marginTop: isActive ? 14 : 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <p className="
                                            max-w-[250px]
                                            text-sm
                                            leading-[1.7]
                                            text-[#1B120B]/65
                                        ">
                                            {member.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Closing */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="
                        mt-4 max-w-3xl
                        border-t border-[#1B120B]/10
                        pt-4 sm:mt-4
                    "
                >
                    <p className="
                        text-2xl font-medium
                        leading-[1.35]
                        tracking-[-0.025em]
                        sm:text-3xl
                    ">
                        Different perspectives.
                        <br />
                        <span className="text-[#0E40C7]">
                            One shared way of thinking.
                        </span>
                    </p>

                    <p className="
                        mt-5 max-w-2xl
                        text-base leading-[1.8]
                        text-[#1B120B]/65
                    ">
                        The people behind Bonhomiee are united by the belief
                        that thoughtful travel starts with paying attention.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}