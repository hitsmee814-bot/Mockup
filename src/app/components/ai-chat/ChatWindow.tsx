"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatMessage as ChatMessageType, Suggestion, QuickReply } from "./types"
import { welcomeMessage, findResponse, fallbackResponse } from "./data"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { ContextPanel } from "./ContextPanel"
import { motion } from "framer-motion"
import { Sparkles, RotateCcw, PanelRightOpen, PanelRightClose } from "lucide-react"

let msgCounter = 1
function nextId() {
  return `msg-${Date.now()}-${msgCounter++}`
}

interface SuggestionGroup {
  id: string
  label: string
  suggestions: Suggestion[]
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([welcomeMessage])
  const [isTyping, setIsTyping] = useState(false)
  const [groups, setGroups] = useState<SuggestionGroup[]>([])
  const [activeReplies, setActiveReplies] = useState<QuickReply[]>(welcomeMessage.quickReplies ?? [])
  const [panelOpen, setPanelOpen] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  function addBotResponse(input: string) {
    setIsTyping(true)

    const typingMsg: ChatMessageType = {
      id: "typing",
      role: "bot",
      text: "",
      timestamp: new Date(),
      typing: true,
    }
    setMessages(prev => [...prev, typingMsg])

    const delay = 500 + Math.random() * 700
    setTimeout(() => {
      const flow = findResponse(input)
      const text = flow?.response ?? fallbackResponse.response
      const replies = flow?.quickReplies ?? fallbackResponse.quickReplies ?? []

      const botMsg: ChatMessageType = {
        id: nextId(),
        role: "bot",
        text,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev.filter(m => m.id !== "typing"), botMsg])
      setActiveReplies(replies)
      setIsTyping(false)

      // Push suggestions to right panel if any
      if (flow?.suggestions && flow.suggestions.length > 0) {
        const groupLabel = flow.suggestions[0].type === "package"
          ? "Packages"
          : flow.suggestions[0].type === "location"
          ? "Destinations"
          : flow.suggestions[0].type === "date"
          ? "Travel Dates"
          : "Budget Options"

        setGroups(prev => [
          ...prev,
          { id: nextId(), label: groupLabel, suggestions: flow.suggestions! },
        ])
      }
    }, delay)
  }

  function handleSend(text: string) {
    const userMsg: ChatMessageType = {
      id: nextId(),
      role: "user",
      text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setActiveReplies([])
    addBotResponse(text)
  }

  function handleQuickReply(value: string) {
    handleSend(value)
  }

  function handleSuggestionSelect(suggestion: Suggestion) {
    handleSend(`Tell me more about ${suggestion.title}`)
  }

  function handleReset() {
    const fresh = { ...welcomeMessage, id: nextId(), timestamp: new Date() }
    setMessages([fresh])
    setGroups([])
    setActiveReplies(fresh.quickReplies ?? [])
    setIsTyping(false)
  }

  return (
    <div className="flex h-full bg-white">
      {/* ─── Left: Chat ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="shrink-0 border-b border-gray-100 px-4 py-2.5 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div
              className="size-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3FB8FF, #6366f1)" }}
            >
              <Sparkles className="size-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">AI Travel Planner</p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              onClick={() => setPanelOpen(o => !o)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#3FB8FF] hover:bg-gray-50 transition-colors cursor-pointer lg:hidden"
              whileTap={{ scale: 0.9 }}
              title="Toggle panel"
            >
              {panelOpen ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
            </motion.button>
            <motion.button
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-[#3FB8FF] transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-50"
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="size-3" /> New
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar"
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Inline quick replies below last bot message on mobile */}
          {!isTyping && activeReplies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-9 lg:hidden">
              {activeReplies.map((r) => (
                <button
                  key={r.value}
                  onClick={() => handleQuickReply(r.value)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer"
                  style={{ background: "#3FB8FF08", color: "#3FB8FF", borderColor: "#3FB8FF30" }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* ─── Right: Context Panel ─── */}
      <div
        className={`shrink-0 transition-all duration-300 overflow-hidden ${
          panelOpen ? "w-[340px]" : "w-0"
        } hidden lg:block`}
      >
        <ContextPanel
          groups={groups}
          activeReplies={activeReplies}
          onTopicSelect={handleQuickReply}
          onQuickReply={handleQuickReply}
          onSuggestionSelect={handleSuggestionSelect}
        />
      </div>

      {/* Mobile panel overlay */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="flex-1 bg-black/40" onClick={() => setPanelOpen(false)} />
          <div className="w-[320px] h-full">
            <ContextPanel
              groups={groups}
              activeReplies={activeReplies}
              onTopicSelect={(v) => { handleQuickReply(v); setPanelOpen(false) }}
              onQuickReply={(v) => { handleQuickReply(v); setPanelOpen(false) }}
              onSuggestionSelect={(s) => { handleSuggestionSelect(s); setPanelOpen(false) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
