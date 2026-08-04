export interface AnalyticsCardsData {
  totalRequests: number;
  threatsBlocked: number;
  safePromptRate: string;
  activeModels: number;
}

export interface RequestChartData {
  day: string;
  requests: number;
}

export interface ThreatChartData {
  name: string;
  value: number;
}

export interface ModelUsageData {
  model: string;
  usage: number;
}

export async function getAnalyticsCards(): Promise<AnalyticsCardsData> {
  return {
    totalRequests: 12854,
    threatsBlocked: 326,
    safePromptRate: "98.7%",
    activeModels: 4,
  };
}

export async function getRequestChart(): Promise<RequestChartData[]> {
  return [
    { day: "Mon", requests: 120 },
    { day: "Tue", requests: 185 },
    { day: "Wed", requests: 240 },
    { day: "Thu", requests: 210 },
    { day: "Fri", requests: 295 },
    { day: "Sat", requests: 180 },
    { day: "Sun", requests: 150 },
  ];
}

export async function getThreatChart(): Promise<ThreatChartData[]> {
  return [
    { name: "Prompt Injection", value: 42 },
    { name: "Jailbreak", value: 27 },
    { name: "PII Leakage", value: 18 },
    { name: "Safe", value: 13 },
  ];
}

export async function getModelUsage(): Promise<ModelUsageData[]> {
  return [
    { model: "Llama 3", usage: 340 },
    { model: "Mistral", usage: 220 },
    { model: "Gemma", usage: 180 },
    { model: "DeepSeek", usage: 120 },
  ];
}