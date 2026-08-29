"use client"

import { useMemo, useState } from "react"
import { CircleQuestionMark, Search, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"

const faqs = [
  {
    question: "How do I start planning my custom vacation with Bonhomiee?",
    answer:
      "Simply sign up and fill out a brief profile with your preferences, dates, and party size. Then choose from AI-suggested itineraries or request fully bespoke planning.",
  },
  {
    question: "How does Bonhomiee personalize my travel itinerary?",
    answer:
      "We use your preferences, travel context, and feedback to tailor recommendations. As you travel with us, your preferences become better understood.",
  },
  {
    question: "Can I integrate my company’s leave calendar and HR system?",
    answer:
      "Yes. Bonhomiee can connect with HRMS and calendar tools so holidays, leave availability, and travel plans can work together.",
  },
  {
    question: "How secure is my data on Bonhomiee?",
    answer:
      "Your data is protected using encryption and secure access practices. We take privacy and responsible handling of your travel information seriously.",
  },
  {
    question: "What support do I get during my trip?",
    answer:
      "Our Care Team is available to help with changes, emergencies, and local coordination throughout your journey.",
  },
]

export default function FaqSection() {
  const [search, setSearch] = useState("")

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return faqs

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    )
  }, [search])

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-4 py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              mb-5
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-3.5
              py-1
              text-xs
              font-semibold
              text-primary
            "
          >
            <CircleQuestionMark className="h-3 w-3" />
            FAQ
          </motion.div>

          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-[40px]">
            Need <span className="text-primary">Help?</span>
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
            Everything you need to know about our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative mx-auto max-w-xl">
            <Search
              className="
                absolute
                left-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="
                h-12
                rounded-full
                border-border
                bg-background
                pl-11
                pr-5
                shadow-none
                focus-visible:ring-1
                focus-visible:ring-primary
              "
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {filteredFaqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-b border-border/70"
                >
                  <AccordionTrigger
                    className="
                      py-6
                      text-left
                      text-sm
                      font-medium
                      text-foreground
                      hover:no-underline
                      sm:text-base
                      [&>svg]:h-4
                      [&>svg]:w-4
                    "
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent
                    className="
                      max-w-3xl
                      pb-6
                      pr-8
                      text-sm
                      leading-relaxed
                      text-muted-foreground
                    "
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No matching questions found.
              </p>

              <button
                onClick={() => setSearch("")}
                className="
                  mt-3
                  text-sm
                  font-medium
                  text-primary
                  hover:underline
                "
              >
                Clear search
              </button>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="
            mt-10
            text-center
            text-sm
            text-muted-foreground
          "
        >
          Still have questions?{" "}
          <span className="font-medium text-foreground">
            We're happy to help.
          </span>
        </motion.p>

      </div>
    </section>
  )
}