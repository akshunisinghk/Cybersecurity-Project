export interface Threat {
  id: number;
  name: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Detected" | "Blocked" | "Investigating";
  timestamp: string;
}

export const threats: Threat[] = [
  {
    id: 1,
    name: "Prompt Injection Attack",
    type: "Injection",
    severity: "High",
    status: "Blocked",
    timestamp: "2026-07-25 10:30",
  },
  {
    id: 2,
    name: "Jailbreak Attempt",
    type: "LLM Attack",
    severity: "Critical",
    status: "Blocked",
    timestamp: "2026-07-25 10:45",
  },
  {
    id: 3,
    name: "Sensitive Information Exposure",
    type: "Data Leakage",
    severity: "Medium",
    status: "Investigating",
    timestamp: "2026-07-25 11:05",
  },
  {
    id: 4,
    name: "Malicious Prompt",
    type: "Threat Detection",
    severity: "High",
    status: "Detected",
    timestamp: "2026-07-25 11:20",
  },
];