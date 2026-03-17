"use client"

import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { PremiumButton } from "@/app/utils/PremiumButton"

const dummyTopics = ["General Inquiry", "Technical Support", "Billing", "Feedback"]

interface FormErrors {
    name?: string
    email?: string
    topic?: string
    message?: string
}

export default function RequestView() {
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")
    const [message, setMessage] = useState("")

    const validate = (): FormErrors => {
        const errs: FormErrors = {}
        if (!name.trim()) errs.name = "Name is required"
        else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters"

        if (!email.trim()) errs.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
            errs.email = "Enter a valid email"

        if (!selectedTopic) errs.topic = "Please select a topic"

        if (!message.trim()) errs.message = "Message is required"
        else if (message.trim().length < 10) errs.message = "Message must be at least 10 characters"

        return errs
    }

    const handleBlur = (field: keyof FormErrors) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        setErrors(validate())
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTouched({ name: true, email: true, topic: true, message: true })
        const allErrors = validate()
        setErrors(allErrors)
        if (Object.keys(allErrors).length === 0) setSubmitted(true)
    }

    const fieldClass = (field: keyof FormErrors) =>
        touched[field] && errors[field]
            ? "border-destructive focus:border-destructive"
            : "border-border focus:border-primary"

    return (
        <motion.div
            key="request"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
        >
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-3 py-8 text-center"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Request Submitted!</p>
                        <p className="text-xs text-muted-foreground">
                            We&apos;ll get back to you within 24 hours.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false)
                                setName("")
                                setEmail("")
                                setSelectedTopic("")
                                setMessage("")
                                setErrors({})
                                setTouched({})
                            }}
                            className="mt-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                            Submit Another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-3"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Ask a Question
                        </p>

                        <div>
                            <Input
                                name="name"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => handleBlur("name")}
                                className={fieldClass("name")}
                            />
                            {touched.name && errors.name && (
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                                    <AlertCircle className="h-3 w-3" /> {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleBlur("email")}
                                className={fieldClass("email")}
                            />
                            {touched.email && errors.email && (
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                                    <AlertCircle className="h-3 w-3" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <Select
                                value={selectedTopic}
                                onValueChange={(value) => {
                                    setSelectedTopic(value)
                                    handleBlur("topic")
                                }}
                            >
                                <SelectTrigger
                                    className={`w-full !h-10 bg-white border-slate-300 text-slate-900 focus:border-[#3FB8FF] focus:ring-1 focus:ring-[#3FB8FF] ${fieldClass(
                                        "topic"
                                    )}`}
                                >
                                    <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>

                                <SelectContent className="z-[10000]">
                                    {dummyTopics.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {touched.topic && errors.topic && (
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                                    <AlertCircle className="h-3 w-3" /> {errors.topic}
                                </p>
                            )}
                        </div>

                        <div>
                            <Textarea
                                name="message"
                                placeholder="Describe your question or issue..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onBlur={() => handleBlur("message")}
                                className={`resize-none ${fieldClass("message")}`}
                                rows={4}
                            />
                            {touched.message && errors.message && (
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
                                    <AlertCircle className="h-3 w-3" /> {errors.message}
                                </p>
                            )}
                        </div>

                        <PremiumButton
                            variant="primary"
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Send className="h-3.5 w-3.5" />
                            Submit Request
                        </PremiumButton>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    )
}