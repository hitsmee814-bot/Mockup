export type MessageRole = "user" | "bot"

export type SuggestionType = "package" | "location" | "date" | "budget"

export interface Suggestion {
  type: SuggestionType
  id: string
  title: string
  subtitle?: string
  image?: string
  meta?: Record<string, string>
}

export interface QuickReply {
  label: string
  value: string
  icon?: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
  suggestions?: Suggestion[]
  quickReplies?: QuickReply[]
  typing?: boolean
}

export interface ConversationFlow {
  trigger: string[]
  response: string
  suggestions?: Suggestion[]
  quickReplies?: QuickReply[]
}
