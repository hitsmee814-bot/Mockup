"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage as ChatMessageType } from "./types"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { Sparkles, RotateCcw } from "lucide-react"
import { chatService } from "@/services/ChatService"

const quickActions = [
    { label: "Beach Vacation", value: "beach vacation" },
    { label: "Mountain Trip", value: "mountain trip" },
    { label: "International", value: "international trip" },
    { label: "Budget Friendly", value: "budget trip" },
    { label: "Honeymoon", value: "honeymoon" },
    { label: "Suggest Places", value: "suggest destination" },
]

let msgCounter = 1
function nextId() { return `msg-${Date.now()}-${msgCounter++}` }

export function ChatWindow() {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = useCallback(() => {
        requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
        })
    }, [])

    useEffect(() => { scrollToBottom() }, [messages, isTyping, scrollToBottom])

    async function getBotResponse(input: string): Promise<string[]> {
        try {
            const senderId =
                localStorage.getItem("username") || `guest_${Date.now()}`

            const data = await chatService.sendMessage(senderId, input)

            return data.responses?.map((r: any) => r.text) || []
        } catch (err) {
            console.error(err)
            return ["Something went wrong. Please try again."]
        }
    }

    async function handleSend(text: string) {
        // 👤 user message
        setMessages(prev => [
            ...prev,
            {
                id: nextId(),
                role: "user" as const,
                text,
                timestamp: new Date(),
            }
        ])

        setIsTyping(true)

        const responses = await getBotResponse(text)

        setIsTyping(false)

        if (responses.length) {
            const botMessages: ChatMessageType[] = responses.map((text) => ({
                id: nextId(),
                role: "bot" as const,
                text,
                timestamp: new Date(),
            }))

            setMessages(prev => [...prev, ...botMessages])
        }
    }

    function handleReset() {
        setMessages([])
        setIsTyping(false)
    }

    return (
        <motion.div
            className="flex w-full h-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex flex-col w-full min-w-0 bg-card rounded-2xl overflow-hidden border border-border shadow-xl shadow-black/5">
                {/* Header */}
                <motion.div
                    className="shrink-0 border-b border-border px-3 py-2.5 flex items-center justify-between gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
                >
                    <div className="flex items-center gap-2.5 min-w-0">
                        <motion.div
                            className="size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-chart-3 shadow-lg shadow-primary/25"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="size-3.5 sm:size-4 text-white" />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="min-w-0"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <p className="text-xs sm:text-sm font-bold text-foreground truncate">AI Travel Planner</p>
                            <div className="flex items-center gap-1.5">
                                <motion.span
                                    className="size-1.5 rounded-full bg-green-400"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                                    transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                                />
                                <span className="text-[9px] sm:text-[10px] text-muted-foreground">Online</span>
                            </div>
                        </motion.div>
                    </div>
                    <motion.button
                        onClick={handleReset}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9, rotate: -180 }}
                        className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-muted-foreground hover:text-primary cursor-pointer px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                        <RotateCcw className="size-3" />
                        <span className="hidden sm:inline">New</span>
                    </motion.button>
                </motion.div>

                {/* Messages area */}
                <motion.div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                >
                    <AnimatePresence>
                        {messages.length === 0 && !isTyping && (
                            <motion.div
                                className="flex flex-col items-center justify-center h-full text-center px-4"
                                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <motion.div
                                    className="size-14 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-chart-3 mb-4 shadow-xl shadow-primary/25"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                        y: [0, -6, 0],
                                        boxShadow: [
                                            "0 10px 25px rgba(var(--primary-rgb), 0.2)",
                                            "0 20px 40px rgba(var(--primary-rgb), 0.35)",
                                            "0 10px 25px rgba(var(--primary-rgb), 0.2)",
                                        ],
                                    }}
                                    transition={{
                                        scale: { delay: 0.6, type: "spring", stiffness: 260, damping: 18 },
                                        rotate: { delay: 0.6, type: "spring", stiffness: 260, damping: 18 },
                                        y: { delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" },
                                        boxShadow: { delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles className="size-6 text-white" />
                                    </motion.div>
                                </motion.div>
                                <motion.p
                                    className="text-sm font-semibold text-foreground"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    How can I help you today?
                                </motion.p>
                                <motion.p
                                    className="text-xs text-muted-foreground mt-1.5"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.95, type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    Ask me anything about your travel plans
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isTyping && (
                        <ChatMessage message={{ id: "typing", role: "bot", text: "", timestamp: new Date(), typing: true }} />
                    )}
                </motion.div>

                {/* Quick actions strip */}
                <motion.div
                    className="shrink-0 border-t border-border px-2 py-2 overflow-x-auto no-scrollbar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 25 }}
                >
                    <div className="flex gap-2">
                        {quickActions.map((t, i) => (
                            <motion.button
                                key={t.label}
                                onClick={() => handleSend(t.value)}
                                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.65 + i * 0.06, type: "spring", stiffness: 350, damping: 22 }}
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="shrink-0 text-[11px] sm:text-xs font-medium px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground cursor-pointer hover:bg-muted hover:border-primary/30 transition-colors"
                            >
                                {t.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
                >
                    <ChatInput onSend={handleSend} disabled={isTyping} />
                </motion.div>
            </div>
        </motion.div>
    )
}
