// src/hooks/useChat.ts

import { useState } from "react";
import axios from "axios";
import type {
  ChatMessage,
  SecurityAnalysis,
} from "../types/chat";
import { initialMessages } from "../data/chatData";
import api from "../services/api";

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

  const [analysis, setAnalysis] =
    useState<SecurityAnalysis>({
      decision: "ALLOW",
      riskScore: 0,
      sanitizedPrompt: "",
    });

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await api.post("/chat", {
        prompt: text,
      });

      const data = response.data;

      setAnalysis({
        decision: data.decision,
        riskScore: data.risk_score,
        sanitizedPrompt: data.sanitized_prompt,
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error) && error.response) {

        // BLOCKED PROMPT
        if (error.response.status === 403) {

          const data = error.response.data;

          setAnalysis({
            decision: data.decision,
            riskScore: data.risk_score,
            sanitizedPrompt: text,
          });

          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              `🚫 ${data.message}\n\nReason: ${data.reason}`,
            timestamp: getCurrentTime(),
          };

          setMessages((prev) => [...prev, assistantMessage]);

          return;
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "❌ Failed to connect to the AI service.",
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);

    setAnalysis({
      decision: "ALLOW",
      riskScore: 0,
      sanitizedPrompt: "",
    });
  };

  return {
    messages,
    isTyping,
    analysis,
    sendMessage,
    clearChat,
  };
};