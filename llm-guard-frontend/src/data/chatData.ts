// src/data/chatData.ts

import type {
  ChatHistory,
  ChatMessage,
  SecurityAnalysis,
  SuggestedPrompt,
} from "../types/chat";

// -------------------------
// Chat History (Sidebar)
// -------------------------

export const chatHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Prompt Injection Demo",
    createdAt: "Today",
  },
  {
    id: "2",
    title: "SQL Injection",
    createdAt: "Today",
  },
  {
    id: "3",
    title: "Firewall Rules",
    createdAt: "Yesterday",
  },
  {
    id: "4",
    title: "OWASP LLM Top 10",
    createdAt: "Yesterday",
  },
];

// -------------------------
// Initial Chat Messages
// -------------------------

export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "👋 Hello! I'm your AI Security Assistant. Ask me anything about cybersecurity, AI models, or prompt security.",
    timestamp: "10:00 AM",
  },
];

// -------------------------
// Suggested Prompts
// -------------------------

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "1",
    title: "SQL Injection",
    prompt: "Explain SQL Injection with an example.",
  },
  {
    id: "2",
    title: "Prompt Injection",
    prompt: "What is Prompt Injection in LLMs?",
  },
  {
    id: "3",
    title: "XSS Attack",
    prompt: "Explain Cross Site Scripting (XSS).",
  },
  {
    id: "4",
    title: "Firewall",
    prompt: "How does an AI Firewall work?",
  },
  {
    id: "5",
    title: "JWT",
    prompt: "Difference between JWT and OAuth.",
  },
];

// -------------------------
// Dummy Security Analysis
// -------------------------

export const dummySecurityAnalysis: SecurityAnalysis = {
  decision: "ALLOW",
  riskScore: 0,
  sanitizedPrompt: "",
};

// -------------------------
// Dummy AI Replies
// -------------------------

export const aiReplies: string[] = [
  "SQL Injection is a code injection attack where malicious SQL statements are inserted into an application's queries.",

  "Prompt Injection is an attack that manipulates an AI model by embedding malicious instructions inside the prompt.",

  "Cross Site Scripting (XSS) allows attackers to inject malicious JavaScript into web pages viewed by other users.",

  "A firewall monitors and filters incoming and outgoing network traffic based on predefined security rules.",

  "JWT is used for authentication, whereas OAuth is an authorization framework.",
];