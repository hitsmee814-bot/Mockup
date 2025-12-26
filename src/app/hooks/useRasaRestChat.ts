"use client";

import { useState } from "react";
import { RasaMessage, sendRasaMessage } from "../utils/rasaRestClient";

export function useRasaRestChat(sender = "Me") {
  const [messages, setMessages] = useState<RasaMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { recipient_id: sender, text },
    ]);

    try {
      const botMessages = await sendRasaMessage(sender, text);
      setMessages((prev) => [...prev, ...botMessages]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          recipient_id: sender,
          text: "⚠️ Unable to connect to travel assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
