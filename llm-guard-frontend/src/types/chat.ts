// src/types/chat.ts

export type MessageRole = "user" | "assistant";

export type RiskLevel = "Low" | "Medium" | "High";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  createdAt: string;
}

export interface SecurityAnalysis {
  risk: RiskLevel;
  threatScore: number;
  tokens: number;
  processingTime: string;
  piiDetected: boolean;
  promptInjection: boolean;
  blockedKeywords: string[];
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  analysis: SecurityAnalysis;
}