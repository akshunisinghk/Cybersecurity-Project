export interface LiveTraffic {
  id: number;
  timestamp: string;
  source: string;
  destination: string;
  requestType: string;
  status: "Allowed" | "Blocked" | "Flagged";
  latency: number;
}

export const liveTraffic: LiveTraffic[] = [
  {
    id: 1,
    timestamp: "10:30:15",
    source: "User-001",
    destination: "GPT Model",
    requestType: "Prompt",
    status: "Allowed",
    latency: 120,
  },
  {
    id: 2,
    timestamp: "10:31:02",
    source: "User-002",
    destination: "GPT Model",
    requestType: "Prompt Injection",
    status: "Blocked",
    latency: 85,
  },
  {
    id: 3,
    timestamp: "10:32:18",
    source: "User-003",
    destination: "Claude Model",
    requestType: "Prompt",
    status: "Allowed",
    latency: 145,
  },
  {
    id: 4,
    timestamp: "10:33:41",
    source: "User-004",
    destination: "GPT Model",
    requestType: "Sensitive Data",
    status: "Flagged",
    latency: 210,
  },
  {
    id: 5,
    timestamp: "10:34:27",
    source: "User-005",
    destination: "Gemini Model",
    requestType: "Jailbreak Attempt",
    status: "Blocked",
    latency: 95,
  },
];