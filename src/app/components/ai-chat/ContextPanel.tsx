"use client"

import { Suggestion } from "./types"
import { SuggestionCard } from "./SuggestionCard"
import { QuickTopics } from "./QuickTopics"
import { QuickReplies } from "./QuickReplies"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, Sparkles } from "lucide-react"
import { QuickReply } from "./types"

interface SuggestionGroup {
  id: string
  label: string
  suggestions: Suggestion[]
}

interface ContextPanelProps {
  groups: SuggestionGroup[]
  activeReplies: QuickReply[]
  onTopicSelect: (value: string) => void
  onQuickReply: (value: string) => void
  onSuggestionSelect: (suggestion: Suggestion) => void
}

export function ContextPanel({
  groups,
  activeReplies,
  onTopicSelect,
  onQuickReply,
  onSuggestionSelect,
}: ContextPanelProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50/60 border-l border-gray-100">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-gray-100 bg-white">
        <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Sparkles className="size-3.5" style={{ color: "#3FB8FF" }} />
          Itinerary Builder
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">Suggestions build as you chat</p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 custom-scrollbar">
        {/* Quick topic tags */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Topics</p>
          <QuickTopics onSelect={onTopicSelect} />
        </div>

        {/* Active quick replies from last bot message */}
        {activeReplies.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Next</p>
            <QuickReplies replies={activeReplies} onSelect={onQuickReply} />
          </div>
        )}

        {/* Suggestion groups — newest first */}
        {groups.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {[...groups].reverse().map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Layers className="size-3 text-[#3FB8FF]" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{group.label}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {group.suggestions.map((s, i) => (
                    <SuggestionCard
                      key={`${group.id}-${s.id}`}
                      suggestion={s}
                      onSelect={onSuggestionSelect}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="size-12 rounded-full flex items-center justify-center mb-3"
              style={{ background: "#3FB8FF12" }}
            >
              <Sparkles className="size-5" style={{ color: "#3FB8FF" }} />
            </div>
            <p className="text-xs font-semibold text-gray-400">Start chatting to see suggestions</p>
            <p className="text-[10px] text-gray-300 mt-1">Packages, locations & dates will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
