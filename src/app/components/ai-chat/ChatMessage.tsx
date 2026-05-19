"use client"

import { useState, useEffect } from "react"
import { ChatMessage as ChatMessageType } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessageType
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) return
    let i = 0
    setDisplayed("")
    setDone(false)
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-[2px] h-[14px] bg-primary ml-0.5 align-middle rounded-full"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  )
}

function BotAvatar() {
  return (
    <motion.div
      className="size-7 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-chart-3 shadow-lg shadow-primary/20"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Sparkles className="size-3.5 text-white" />
    </motion.div>
  )
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot"
  const time = message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

  if (message.typing) {
    return (
      <motion.div
        className="flex items-start gap-2.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <BotAvatar />
        <motion.div
          className="relative bg-muted/80 backdrop-blur-sm border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 inline-flex gap-2 items-center"
          animate={{ boxShadow: ["0 0 0px rgba(var(--primary-rgb),0)", "0 0 12px rgba(var(--primary-rgb),0.15)", "0 0 0px rgba(var(--primary-rgb),0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="size-2 rounded-full bg-primary/60"
              animate={{
                y: [0, -6, 0],
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
          <motion.span
            className="text-[10px] text-muted-foreground ml-1 font-medium"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            thinking...
          </motion.span>
        </motion.div>
      </motion.div>
    )
  }

  if (isBot) {
    return (
      <motion.div
        className="flex items-start gap-2.5"
        initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <BotAvatar />
        <div className="min-w-0 max-w-[calc(100%-3rem)]">
          <motion.div
            className="bg-muted/80 backdrop-blur-sm border border-border/50 text-foreground rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[12px] sm:text-[13px] leading-relaxed shadow-sm"
            style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <TypewriterText text={message.text} />
          </motion.div>
          <motion.p
            className="text-[9px] text-muted-foreground/50 mt-1 ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {time}
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex flex-col items-end"
      initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div className="max-w-[85%]">
        <motion.div
          className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-[12px] sm:text-[13px] leading-relaxed shadow-lg shadow-primary/20"
          style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          whileHover={{ scale: 1.01 }}
        >
          {message.text}
        </motion.div>
        <motion.p
          className="text-[9px] text-muted-foreground/50 mt-1 text-right mr-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {time}
        </motion.p>
      </div>
    </motion.div>
  )
}
