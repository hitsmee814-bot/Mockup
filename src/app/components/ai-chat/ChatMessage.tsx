"use client"

import { ChatMessage as ChatMessageType } from "./types"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot"
  const time = message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

  if (message.typing) {
    return (
      <motion.div className="flex items-start gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="size-6 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-chart-3">
          <Sparkles className="size-3 text-white" />
        </div>
        <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 inline-flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
          ))}
        </div>
      </motion.div>
    )
  }

  if (isBot) {
    return (
      <motion.div className="flex items-start gap-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br from-primary to-chart-3">
          <Sparkles className="size-3 text-white" />
        </div>
        <div className="min-w-0 max-w-[calc(100%-2rem)]">
          <div className="bg-muted border border-border text-foreground rounded-2xl rounded-tl-sm px-3 py-2 text-[12px] sm:text-[13px] leading-relaxed"
            style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
            {message.text}
          </div>
          <p className="text-[9px] text-muted-foreground/50 mt-0.5">{time}</p>
        </div>
      </motion.div>
    )
  }

  // User message
  return (
    <motion.div className="flex flex-col items-end" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="max-w-[85%]">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3 py-2 text-[12px] sm:text-[13px] leading-relaxed"
          style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
          {message.text}
        </div>
        <p className="text-[9px] text-muted-foreground/50 mt-0.5 text-right">{time}</p>
      </div>
    </motion.div>
  )
}
