"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import FaqImage from "../assets/images/faq.png"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PremiumButton } from "../utils/PremiumButton"

const faqs = [
  {
    question: "How do I start planning my custom vacation with Bonhomiee?",
    answer:
      "Simply sign up and fill out a brief profile—preferences, dates, party size. Then pick from AI-suggested itineraries or request fully bespoke planning. We handle logistics so you just enjoy.",
  },
  {
    question: "How does Bonhomiee personalize my travel itinerary?",
    answer:
      "We use your profile, local context (season, events), and AI logic to tailor suggestions. As you give feedback, the plan adapts with hidden-gem alerts and mood-based tweaks.",
  },
  {
    question: "Can I integrate my company’s leave calendar and HR system?",
    answer:
      "Yes—our platform connects to major HRMS & calendar tools (e.g. Workday). Paid time off, holidays, and policy rules feed directly into travel suggestions and approval flows.",
  },
  {
    question: "How secure is my data on Bonhomiee?",
    answer:
      "Your data is AES-256 encrypted at rest, TLS in transit. We follow ISO-aligned access policies, GDPR + Indian regulation. Profiles are in private partitions, and we never sell user data.",
  },
  {
    question: "What support do I get during my trip?",
    answer:
      "From booking confirmation onward, you have 24/7 access to our Care Team by chat, email, or phone. We assist with changes, emergencies, and local coordination.",
  },
];

export default function FaqSection() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <section className="py-28 bg-none" id="faq">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl text font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text mt-4">
            Everything you need to know about our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch lg:min-h-[700px]">
          <div className="flex flex-col gap-8 h-full">
            <Card className="px-6 pb-6 pt-0 md:p-8 md:pt-0 rounded-3x border-none shadow-none relative overflow-hidden bg-gradient-to-br from-[#EEF3FF]/20 to-[#B0F3F4]/10">

              <div className="relative w-full h-40 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={FaqImage}
                  alt="FAQ"
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-black">
                Still have questions?
              </h3>

              <p className="text-black/70 mb-6">
                Contact our support team anytime, we’re happy to help!
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-black">📧 Email:</span>
                  <span className="text-black/70">support@bonhomiee.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-black">📞 Phone:</span>
                  <span className="text-black/70">+91 98765 43210</span>
                </div>
              </div>

              <p className="text-sm text-black mb-4">
                Can’t find an answer? Ask us directly:
              </p>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>

                  <PremiumButton
                    variant="primary"
                    className="mb-0 flex items-center w-fit-content"
                  >
                    Chat with us
                  </PremiumButton>
                </DialogTrigger>

                <DialogContent className="rounded-2xl p-6 md:p-8">
                  <DialogHeader>
                    <DialogTitle className="text-[#0E40C7]">Ask Your Question</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                    <Textarea placeholder="Type your question..." />
                    <Button className="w-full text-white bg-[#306F7D] px-6 py-3 rounded-full transition-all duration-300 hover:bg-[#479EA8]">
                      Submit Question
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>

          <div className="flex flex-col h-full max-h-[700px]">
            <div className="relative mb-10">
              <Search className="absolute left-3 top-3.5 h-4 w-4" />
              <Input
                placeholder="Search questions..."
                className="pl-10 h-12 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                className="border-none rounded-2xl divide-y flex-1 overflow-y-auto"
              >
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="px-6"
                  >
                    <AccordionTrigger>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 text-black">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground">
                No matching questions found.
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}