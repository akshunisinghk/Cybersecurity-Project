// src/hooks/useChat.ts

import { useState } from "react";
import type { ChatMessage } from "../types/chat";
import {
  initialMessages,
  aiReplies,
  dummySecurityAnalysis,
} from "../data/chatData";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const useChat = () => {
  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages);

  const [isTyping, setIsTyping] = useState(false);

  const [analysis] = useState(dummySecurityAnalysis);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const randomReply =
        aiReplies[Math.floor(Math.random() * aiReplies.length)];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomReply,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  return {
    messages,
    isTyping,
    analysis,
    sendMessage,
    clearChat,
  };
};