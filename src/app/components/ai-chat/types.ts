export type MessageRole = "user" | "bot"

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
  typing?: boolean
}
