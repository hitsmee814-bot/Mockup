"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Map,
  CreditCard,
  Users,
  Headphones,
  Building2,
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
    label: "How we work",
    value: "how-we-work",
    icon: Map,
  },
  {
    label: "Cost & payment",
    value: "cost-payment",
    icon: CreditCard,
  },
  {
    label: "Group journeys",
    value: "group-journeys",
    icon: Users,
  },
  {
    label: "While you travel",
    value: "while-travel",
    icon: Headphones,
  },
  {
    label: "For organisations",
    value: "organisations",
    icon: Building2,
  },
]

const faqs: FaqItem[] = [
  {
    id: 1,
    category: "how-we-work",
    question: "How is Bonhomiee different from a travel agent or a booking website?",
    answer:
      "A booking website sells you what you ask for. A travel agent books what you tell them. We start earlier — with a conversation about what the trip is actually for — and come back with one considered recommendation rather than a menu. Then we stay with you through the journey itself. Most of our travellers have used both agents and websites; they come to us for the part neither does.",
  },
  {
    id: 2,
    category: "how-we-work",
    question: "How does it start? What do you need from me?",
    answer:
      "A conversation, not a form. Tell us who is travelling, roughly when, and what this trip means to you. We'll ask about things you may not have considered — pace, mornings, food, what a good day looks like. Within a few days you'll have an outline to react to. Nothing is booked until you're happy with the shape of it.",
  },
  {
    id: 3,
    category: "how-we-work",
    question: "Do I need to have decided the destination?",
    answer:
      "No, and often it's better if you haven't. Some of our best journeys began with “somewhere in Europe, twelve days, some music and art” and ended somewhere the traveller hadn't considered. If you know exactly where you want to go, we'll design around that. If you don't, that's what the first conversation is for.",
  },
  {
    id: 4,
    category: "how-we-work",
    question: "Will I get several itineraries to choose from?",
    answer:
      "Usually one, with the reasoning behind it. Our travellers tell us that choosing between three itineraries doesn't save them time — it moves the work back to them. We'd rather understand you well enough to get it right, and adjust from there.",
  },
  {
    id: 5,
    category: "how-we-work",
    question: "How long does it take to design a trip?",
    answer:
      "An outline within a week of our first conversation; a fully costed itinerary within two to three, depending on destination and season. International journeys with visas are best started three to four months out. We can move faster when needed — tell us.",
  },
  {
    id: 6,
    category: "how-we-work",
    question: "Can you design a trip for my elderly parents, or for three generations travelling together?",
    answer:
      "This is much of what we do. For older travellers: one main thing a day, no early starts, lift-accessible rooms, shorter drives with stops, and food you can actually eat. For families across generations: days that work for a seven-year-old and a seventy-year-old at the same time, and rooms configured before the itinerary is written. Ask us about the specifics — it's where the design really lives.",
  },
  {
    id: 7,
    category: "cost-payment",
    question: "How much does a designed journey cost?",
    answer:
      "It depends entirely on the trip. Our designed international journeys typically range from around ₹3 lakh to ₹15 lakh per person. Group departures from Kolkata are priced per person, all-inclusive, with nothing further to pay at the end. We'll give you a clear number before you commit to anything — and we'll tell you where spending more won't buy you a better trip.",
  },
  {
    id: 8,
    category: "cost-payment",
    question: "Do you charge a separate fee, or is it built into the price?",
    answer:
      "The price you see is the price you pay. We earn a margin on the journey we design, and we'll explain how it works if you ask. What we don't do is add undisclosed margins to hotel rates, or recommend something because we're paid to. Several of our travellers came to us after exactly that experience elsewhere.",
  },
  {
    id: 9,
    category: "cost-payment",
    question: "What is TCS on overseas travel, and does it apply to me?",
    answer:
      "Tax Collected at Source applies to overseas tour packages bought in India. From 1 April 2026 it is a flat 2% — down from 20% on higher amounts previously — and it's credited against your income tax when you file. We show it separately in every quote. On a ₹10 lakh journey that's ₹20,000, recoverable at filing.",
  },
  {
    id: 10,
    category: "cost-payment",
    question: "How are payments structured?",
    answer:
      "A deposit to confirm, typically 25–30%, with the balance due before departure — the exact schedule depends on supplier terms, which we set out clearly in writing. For group departures we don't take deposits until enough travellers have committed for the trip to run; we'd rather not hold your money against a date that may not confirm.",
  },
  {
    id: 11,
    category: "group-journeys",
    question: "Do you run group departures?",
    answer:
      "Yes — small ones, from Kolkata, for people who want good company without a coach of forty strangers. Sixteen travellers at most, one main sight a day, Indian and vegetarian food arranged throughout, and one of us travelling with the group. Current departures include Vietnam, Sri Lanka, Egypt, Finnish Lapland for the Northern Lights, China, and Central Europe.",
  },
  {
    id: 12,
    category: "group-journeys",
    question: "Who travels with the group?",
    answer:
      "Usually Sudip himself, or a senior member of the team — Kolkata to Kolkata. Not a hired escort. The people who travel with us tell us this matters, and it's a large part of why they do.",
  },
  {
    id: 13,
    category: "group-journeys",
    question: "What if the group doesn't fill?",
    answer:
      "We tell you the date by which prices are confirmed and the date deposits open, and the departure confirms once ten travellers have committed. Until then we block nothing and take nothing. If a departure doesn't reach ten, we'll offer you the same journey privately, or the next departure.",
  },
  {
    id: 14,
    category: "while-travel",
    question: "What happens if something goes wrong during my trip?",
    answer:
      "You call us, and we stay on it until it's fixed. A missed connection, a hotel that isn't as booked, a restaurant that turns you away — we've handled all of these from Kolkata, at odd hours. Every traveller has a direct number and a day-by-day sheet. This is the part of what we do that matters most, and the part a website cannot offer.",
  },
  {
    id: 15,
    category: "while-travel",
    question: "Do you handle visas?",
    answer:
      "We guide you through the process, prepare the documentation, and track deadlines — for every passport in the group. Where the rules require you to appear in person, we'll make sure you arrive prepared. Start early: visa timelines are the most common reason a trip has to move.",
  },
  {
    id: 16,
    category: "while-travel",
    question: "Can I change the itinerary after it's designed?",
    answer:
      "Before booking, of course — that's what the outline is for. After booking, it depends on what's been confirmed; some suppliers are flexible, some aren't. We'll tell you honestly what each change costs in money and in trip quality, and we'll sometimes advise against one.",
  },
  {
    id: 17,
    category: "organisations",
    question: "Do you design corporate offsites and leadership retreats?",
    answer:
      "Yes. Leadership offsites, team retreats and incentive journeys — designed around what the gathering is meant to achieve, not around a hotel's conference package. Single point of accountability from brief to return. Recent work includes a leadership offsite in the hills for a global industrial company's India team.",
  },
  {
    id: 18,
    category: "how-we-work",
    question: "Where are you based, and do you work with travellers outside Kolkata?",
    answer:
      "We're in Kolkata — New Town — and most of our travellers are from here or connected to here. We've designed journeys for travellers in Bangalore, Mumbai and abroad; the first conversation works just as well on a call. Group departures leave from Kolkata.",
  },
]

const ITEMS_PER_PAGE = 5

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState<number | null>(1)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE)

  const paginatedFaqs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredFaqs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredFaqs, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory("all")
    setOpenId(1)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section id="faq" className="relative overflow-hidden bg-white px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="relative mx-auto w-fit">
              <h2 className="relative z-10 text-3xl font-bold tracking-tight text-[#10213F] sm:text-4xl lg:text-5xl">
                Questions people <span className="text-[#FBAB18]">ask us.</span>
              </h2>
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#536174] sm:text-lg">
              Honest answers, before you commit to anything.
            </p>
          </motion.div>
        </div>

        {/* Search */}
        {/* <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mx-auto mt-10 max-w-4xl">
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" />

            <input id="faqSearchInput" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search your question..." aria-label="Search frequently asked questions" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-sm text-[#10213F] shadow-[0_8px_30px_rgba(16,33,63,0.06)] outline-none transition placeholder:text-[#9AA3AF] focus:border-[#0E40C7] focus:ring-4 focus:ring-[#0E40C7]/10 sm:h-16 sm:text-base" />
          </div>
        </motion.div> */}

        {/* Category Filters */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-7">
          <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="FAQ categories">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.value

              return (
                <button
                  key={category.value}
                  id={`faqCategory${category.label}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category.value)
                    setOpenId(null)
                    setCurrentPage(1)
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive ? "border-[#0E40C7] bg-[#0E40C7] text-white shadow-md shadow-[#0E40C7]/15" : "border-slate-200 bg-white text-[#536174] hover:border-[#0E40C7]/30 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"}`}
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
            {paginatedFaqs.map((faq, index) => {
              const isOpen = openId === faq.id

              return (
                <motion.article
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: index * 0.025 }}
                  className="mb-3"
                >
                  <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-[#0E40C7]/20 bg-[#F7F9FD] shadow-[0_10px_35px_rgba(16,33,63,0.06)]" : "border-slate-200 bg-white hover:border-[#0E40C7]/20"}`}>

                    {/* Question */}
                    <button
                      id={`faqQuestion${faq.id}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faqAnswer${faq.id}`}
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${isOpen ? "bg-[#0E40C7] text-white" : "bg-[#0E40C7]/8 text-[#0E40C7]"}`}
                          aria-hidden="true"
                        >
                          {String((currentPage - 1) * ITEMS_PER_PAGE + index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="text-base font-semibold leading-6 text-[#10213F] sm:text-lg">
                          {faq.question}
                        </h3>
                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-180 bg-[#0E40C7] text-white" : "bg-slate-100 text-[#536174]"}`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div
                            id={`faqAnswer${faq.id}`}
                            role="region"
                            aria-labelledby={`faqQuestion${faq.id}`}
                            className="px-5 pb-6 pl-16 pr-6 sm:px-7 sm:pb-7 sm:pl-[76px]"
                          >
                            <p className="max-w-3xl text-sm leading-7 text-[#536174] sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-dashed border-slate-200 px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0E40C7]/8 text-[#0E40C7]">
                <Search aria-hidden="true" className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#10213F]">
                No questions found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                Try a different search term or choose another FAQ category.
              </p>

              <button
                id="faqClearFiltersBtn"
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0E40C7] hover:text-[#FBAB18] hover:underline"
              >
                Clear filters
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredFaqs.length > ITEMS_PER_PAGE && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous FAQ page"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#536174] transition-all duration-200 hover:border-[#0E40C7]/30 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#536174]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1
                  const isActive = currentPage === page

                  return (
                    <button
                      key={page}
                      type="button"
                      aria-label={`Go to FAQ page ${page}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => goToPage(page)}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all duration-200 ${isActive ? "bg-[#0E40C7] text-white shadow-md shadow-[#0E40C7]/15" : "border border-slate-200 bg-white text-[#536174] hover:border-[#0E40C7]/30 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7]"}`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                aria-label="Next FAQ page"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#536174] transition-all duration-200 hover:border-[#0E40C7]/30 hover:bg-[#0E40C7]/5 hover:text-[#0E40C7] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#536174]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Page Counter */}
          {filteredFaqs.length > ITEMS_PER_PAGE && (
            <p className="mt-3 text-center text-xs text-[#9AA3AF]">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredFaqs.length)} of{" "}
              {filteredFaqs.length} questions
            </p>
          )}
        </div>

      </div>
    </section>
  )
}