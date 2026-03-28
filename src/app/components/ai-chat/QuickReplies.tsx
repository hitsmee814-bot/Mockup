"use client"

import { QuickReply } from "./types"
import { motion } from "framer-motion"

interface QuickRepliesProps {
  replies: QuickReply[]
  onSelect: (value: string) => void
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {replies.map((reply, i) => (
        <motion.button
          key={reply.value}
          onClick={() => onSelect(reply.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:shadow-sm"
          style={{ background: "#3FB8FF08", color: "#3FB8FF", borderColor: "#3FB8FF30" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          whileHover={{ scale: 1.05, background: "#3FB8FF15" }}
          whileTap={{ scale: 0.95 }}
        >
          {reply.label}
        </motion.button>
      ))}
    </div>
  )
}
