"use client"

import { ChatMessage as ChatMessageType } from "./types"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot"

  return (
    <motion.div
      className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {isBot && (
        <div
          className="size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "linear-gradient(135deg, #3FB8FF, #6366f1)" }}
        >
          <Sparkles className="size-3.5 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] ${!isBot ? "flex flex-col items-end" : ""}`}>
        {message.typing ? (
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="size-1.5 rounded-full bg-gray-400"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        ) : (
          <>
            <div
              className={`rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                isBot
                  ? "bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-sm"
                  : "text-white rounded-tr-sm"
              }`}
              style={!isBot ? { background: "#3FB8FF" } : undefined}
            >
              {message.text}
            </div>
            <p className={`text-[9px] text-gray-300 mt-1 ${isBot ? "" : "text-right"}`}>
              {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}
