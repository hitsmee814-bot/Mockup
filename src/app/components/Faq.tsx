// "use client"

// import { useMemo, useState } from "react"
// import { CircleQuestionMark, Search, ChevronDown } from "lucide-react"
// import { motion } from "framer-motion"

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

// import { Input } from "@/components/ui/input"

// const faqs = [
//   {
//     question: "How do I start planning my custom vacation with Bonhomiee?",
//     answer:
//       "Simply sign up and fill out a brief profile with your preferences, dates, and party size. Then choose from AI-suggested itineraries or request fully bespoke planning.",
//   },
//   {
//     question: "How does Bonhomiee personalize my travel itinerary?",
//     answer:
//       "We use your preferences, travel context, and feedback to tailor recommendations. As you travel with us, your preferences become better understood.",
//   },
//   {
//     question: "Can I integrate my company’s leave calendar and HR system?",
//     answer:
//       "Yes. Bonhomiee can connect with HRMS and calendar tools so holidays, leave availability, and travel plans can work together.",
//   },
//   {
//     question: "How secure is my data on Bonhomiee?",
//     answer:
//       "Your data is protected using encryption and secure access practices. We take privacy and responsible handling of your travel information seriously.",
//   },
//   {
//     question: "What support do I get during my trip?",
//     answer:
//       "Our Care Team is available to help with changes, emergencies, and local coordination throughout your journey.",
//   },
// ]

// export default function FaqSection() {
//   const [search, setSearch] = useState("")

//   const filteredFaqs = useMemo(() => {
//     const query = search.toLowerCase().trim()

//     if (!query) return faqs

//     return faqs.filter(
//       (faq) =>
//         faq.question.toLowerCase().includes(query) ||
//         faq.answer.toLowerCase().includes(query)
//     )
//   }, [search])

//   return (
//     <section
//       id="faq"
//       className="relative overflow-hidden px-4 py-16 sm:py-24"
//     >
//       <div className="relative mx-auto max-w-4xl">

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mb-10 text-center sm:mb-14"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 20,
//             }}
//             className="
//               mb-5
//               inline-flex
//               items-center
//               gap-1.5
//               rounded-full
//               border
//               border-primary/20
//               bg-primary/10
//               px-3.5
//               py-1
//               text-xs
//               font-semibold
//               text-primary
//             "
//           >
//             <CircleQuestionMark className="h-3 w-3" />
//             FAQ
//           </motion.div>

//           <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-[40px]">
//             Need <span className="text-primary">Help?</span>
//           </h2>

//           <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
//             Everything you need to know about our services.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="mb-8"
//         >
//           <div className="relative mx-auto max-w-xl">
//             <Search
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 h-4
//                 w-4
//                 -translate-y-1/2
//                 text-muted-foreground
//               "
//             />

//             <Input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search questions..."
//               className="
//                 h-12
//                 rounded-full
//                 border-border
//                 bg-background
//                 pl-11
//                 pr-5
//                 shadow-none
//                 focus-visible:ring-1
//                 focus-visible:ring-primary
//               "
//             />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.15 }}
//         >
//           {filteredFaqs.length > 0 ? (
//             <Accordion
//               type="single"
//               collapsible
//               className="w-full"
//             >
//               {filteredFaqs.map((faq, index) => (
//                 <AccordionItem
//                   key={faq.question}
//                   value={`item-${index}`}
//                   className="border-b border-border/70"
//                 >
//                   <AccordionTrigger
//                     className="
//                       py-6
//                       text-left
//                       text-sm
//                       font-medium
//                       text-foreground
//                       hover:no-underline
//                       sm:text-base
//                       [&>svg]:h-4
//                       [&>svg]:w-4
//                     "
//                   >
//                     {faq.question}
//                   </AccordionTrigger>

//                   <AccordionContent
//                     className="
//                       max-w-3xl
//                       pb-6
//                       pr-8
//                       text-sm
//                       leading-relaxed
//                       text-muted-foreground
//                     "
//                   >
//                     {faq.answer}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           ) : (
//             <div className="py-12 text-center">
//               <p className="text-sm text-muted-foreground">
//                 No matching questions found.
//               </p>

//               <button
//                 onClick={() => setSearch("")}
//                 className="
//                   mt-3
//                   text-sm
//                   font-medium
//                   text-primary
//                   hover:underline
//                 "
//               >
//                 Clear search
//               </button>
//             </div>
//           )}
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="
//             mt-10
//             text-center
//             text-sm
//             text-muted-foreground
//           "
//         >
//           Still have questions?{" "}
//           <span className="font-medium text-foreground">
//             We're happy to help.
//           </span>
//         </motion.p>

//       </div>
//     </section>
//   )
// }

"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ChevronDown,
  MessageCircleQuestion,
  Map,
  CalendarDays,
  CreditCard,
  Headphones,
  ArrowRight,
} from "lucide-react"

interface FaqItem {
  id: number
  question: string
  answer: string
  category: string
}

const categories = [
  {
    label: "All",
    value: "all",
    icon: MessageCircleQuestion,
  },
  {
    label: "Planning",
    value: "planning",
    icon: Map,
  },
  {
    label: "Bookings",
    value: "bookings",
    icon: CalendarDays,
  },
  {
    label: "Payments",
    value: "payments",
    icon: CreditCard,
  },
  {
    label: "Support",
    value: "support",
    icon: Headphones,
  },
]

const faqs: FaqItem[] = [
  {
    id: 1,
    category: "planning",
    question: "How does the trip planning process work?",
    answer:
      "Tell us where you want to go, what you enjoy, your preferred pace, and what matters most to you. We use those details to shape a journey around your preferences rather than giving you a one-size-fits-all itinerary.",
  },
  {
    id: 2,
    category: "planning",
    question: "Can I create a trip based on my budget?",
    answer:
      "Yes. Your budget can be one of the key inputs when planning your journey. We can help balance destinations, stays, experiences, transport, and activities to create an itinerary that fits your comfort level.",
  },
  {
    id: 3,
    category: "planning",
    question: "Can I customize the itinerary after it is created?",
    answer:
      "Absolutely. You can adjust destinations, activities, accommodation preferences, travel pace, and other details. The goal is to make the trip feel like yours.",
  },
  {
    id: 4,
    category: "bookings",
    question: "Can I book everything through the platform?",
    answer:
      "The platform is designed to help you discover, plan, and organize your journey in one place. Depending on the trip and service, some bookings may be completed through our partners.",
  },
  {
    id: 5,
    category: "bookings",
    question: "Can I plan trips for multiple destinations?",
    answer:
      "Yes. You can build journeys that combine multiple cities or destinations. We can help structure the route so the overall experience stays practical and enjoyable.",
  },
  {
    id: 6,
    category: "payments",
    question: "What payment methods are supported?",
    answer:
      "Payment options can vary depending on the service or booking. Available payment methods will be shown clearly before you complete a transaction.",
  },
  {
    id: 7,
    category: "payments",
    question: "Can I get a refund if I cancel my trip?",
    answer:
      "Refund eligibility depends on the specific booking, service provider, and cancellation terms. You will be able to review the applicable cancellation policy before confirming your booking.",
  },
  {
    id: 8,
    category: "support",
    question: "What happens if I need help during my trip?",
    answer:
      "Our support experience is designed to help you when plans change or you need assistance. You can reach out to the support team for help with eligible bookings and trip-related questions.",
  },
  {
    id: 9,
    category: "support",
    question: "Can I change my travel dates after booking?",
    answer:
      "In many cases, changes may be possible depending on the booking provider and its terms. Any applicable fees or restrictions will depend on the individual reservation.",
  },
  {
    id: 10,
    category: "support",
    question: "Can I get help creating a completely personalized trip?",
    answer:
      "Yes. If you already know what kind of experience you want—or simply know how you want the trip to feel—we can use that information to help shape a more personalized journey.",
  },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState<number | null>(1)

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
{/* Heading */}
<div className="mx-auto max-w-3xl text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Heading + Background Word */}
    <div className="relative mx-auto w-fit">
      {/* Background word */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[64px] font-bold uppercase tracking-[0.08em] text-muted/30 sm:text-[105px] lg:text-[150px]"
      >
        YOUR QUESTIONS
      </span>

      {/* Heading */}
      <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h2>
    </div>

    {/* Subtitle */}
    <p className="mx-auto mt-12 max-w-2xl text-base leading-7 text-[#536174] sm:text-lg">
      Everything you need to know before planning, booking, and
      enjoying your next journey.
    </p>
  </motion.div>
</div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]"
            />

            <input
              id="faqSearchInput"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your question..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-sm text-[#10213F] shadow-[0_8px_30px_rgba(16,33,63,0.06)] outline-none transition placeholder:text-[#9AA3AF] focus:border-[#0E40C7] focus:ring-4 focus:ring-[#0E40C7]/10 sm:h-16 sm:text-base"
            />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7"
        >
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.value

              return (
                <button
                  key={category.value}
                  id={`faqCategory${category.label}`}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.value)
                    setOpenId(null)
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-[#0E40C7] bg-[#0E40C7] text-white shadow-md shadow-[#0E40C7]/15"
                      : "border-slate-200 bg-white text-[#536174] hover:border-[#0E40C7]/30 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="mx-auto mt-12 max-w-4xl">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id

              return (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.025,
                  }}
                  className="mb-3"
                >
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#0E40C7]/20 bg-[#F7F9FD] shadow-[0_10px_35px_rgba(16,33,63,0.06)]"
                        : "border-slate-200 bg-white hover:border-[#0E40C7]/20"
                    }`}
                  >
                    <button
                      id={`faqQuestion${faq.id}`}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenId(isOpen ? null : faq.id)
                      }
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            isOpen
                              ? "bg-[#0E40C7] text-white"
                              : "bg-[#0E40C7]/8 text-[#0E40C7]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-base font-semibold leading-6 text-[#10213F] sm:text-lg">
                          {faq.question}
                        </span>
                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 bg-[#0E40C7] text-white"
                            : "bg-slate-100 text-[#536174]"
                        }`}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 pl-16 pr-6 sm:px-7 sm:pb-7 sm:pl-[76px]">
                            <p className="max-w-3xl text-sm leading-7 text-[#536174] sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-slate-200 px-6 py-16 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0E40C7]/8 text-[#0E40C7]">
                <Search aria-hidden="true" className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#10213F]">
                No questions found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Try a different search term or choose another help category.
              </p>

              <button
                id="faqClearFiltersBtn"
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0E40C7] hover:underline"
              >
                Clear filters
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Still Need Help */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-[2rem] bg-[#10213F] px-6 py-9 sm:px-10 sm:py-10"
        >
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <MessageCircleQuestion
                  aria-hidden="true"
                  className="h-5 w-5 text-[#FBAB18]"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FBAB18]">
                  Still have questions?
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                We&apos;re here to help.
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/60">
                Tell us what you&apos;re looking for and we&apos;ll help you
                figure out the next step.
              </p>
            </div>

            <button
              id="faqContactSupportBtn"
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FBAB18] px-6 py-3.5 text-sm font-bold text-[#10213F] transition-transform hover:scale-[1.03]"
            >
              Talk to us
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}