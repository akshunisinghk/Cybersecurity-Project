export interface Model {
  id: number;
  name: string;
  provider: string;
  version: string;
  status: "Online" | "Offline" | "Maintenance";
}

export const models: Model[] = [
  {
    id: 1,
    name: "GPT-4o",
    provider: "OpenAI",
    version: "2026.1",
    status: "Online",
  },
  {
    id: 2,
    name: "Claude 4",
    provider: "Anthropic",
    version: "4.0",
    status: "Maintenance",
  },
  {
    id: 3,
    name: "Gemini 2.5",
    provider: "Google",
    version: "2.5",
    status: "Offline",
  },
  {
    id: 4,
    name: "Llama 3.3",
    provider: "Meta",
    version: "3.3",
    status: "Online",
  },
];