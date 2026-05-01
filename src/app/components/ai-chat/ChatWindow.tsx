"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatMessage as ChatMessageType } from "./types"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { Sparkles, RotateCcw } from "lucide-react"

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

  // Replace this with your API call
  async function getBotResponse(input: string): Promise<string> {
    // TODO: integrate with your API
    return ""
  }

  async function handleSend(text: string) {
    setMessages(prev => [...prev, { id: nextId(), role: "user", text, timestamp: new Date() }])
    setIsTyping(true)

    const response = await getBotResponse(text)

    setIsTyping(false)
    if (response) {
      setMessages(prev => [...prev, { id: nextId(), role: "bot", text: response, timestamp: new Date() }])
    }
  }

  function handleReset() {
    setMessages([])
    setIsTyping(false)
  }

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="flex flex-col w-full min-w-0 bg-card">
        {/* Header */}
        <div className="shrink-0 border-b border-border px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="size-7 sm:size-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-chart-3">
              <Sparkles className="size-3 sm:size-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-foreground truncate">AI Travel Planner</p>
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <button onClick={handleReset} className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-muted-foreground hover:text-primary cursor-pointer px-2 py-1 rounded-lg hover:bg-muted transition-colors">
            <RotateCcw className="size-3" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="size-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-chart-3 mb-3">
                <Sparkles className="size-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-foreground">How can I help you today?</p>
              <p className="text-xs text-muted-foreground mt-1">Ask me anything about your travel plans</p>
            </div>
          )}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <ChatMessage message={{ id: "typing", role: "bot", text: "", timestamp: new Date(), typing: true }} />
          )}
        </div>

        {/* Quick actions strip */}
        <div className="shrink-0 border-t border-border px-2 py-1.5 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5">
            {quickActions.map((t) => (
              <button
                key={t.label}
                onClick={() => handleSend(t.value)}
                className="shrink-0 text-[10px] sm:text-[11px] font-semibold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  )
}
