import { apiClient } from "@/lib/apiClient"

export const chatService = {
  sendMessage: (sender_id: string, message: string) => {
    return apiClient("/chatbot/message", {
      method: "POST",
      body: { sender_id, message },
    })
  },
}