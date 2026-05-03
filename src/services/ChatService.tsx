import { apiClient } from "@/lib/apiClient"

export const chatService = {
    sendMessage: (sender_id: string, message: string) => {
        return apiClient("/chatbot/message", {
            method: "POST",
            body: { sender_id, message },
        })
    },

    resetChat: (sender_id: string) => {
        return apiClient(`/chatbot/reset?sender_id=${sender_id}`, {
            method: "POST",
            headers: {
                accept: "application/json",
            },
        })
    },
}