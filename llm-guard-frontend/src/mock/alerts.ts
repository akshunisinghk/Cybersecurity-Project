export interface Alert {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "Read" | "Resolved";
  timestamp: string;
}

export const alerts: Alert[] = [
  {
    id: 1,
    title: "Prompt Injection Detected",
    description: "A suspicious prompt injection attempt was detected.",
    severity: "High",
    status: "New",
    timestamp: "2026-07-25 10:30",
  },
  {
    id: 2,
    title: "Jailbreak Attempt Blocked",
    description: "A jailbreak payload was blocked by the firewall.",
    severity: "Critical",
    status: "Read",
    timestamp: "2026-07-25 10:45",
  },
  {
    id: 3,
    title: "Sensitive Data Detected",
    description: "Potential sensitive information was detected in a prompt.",
    severity: "Medium",
    status: "New",
    timestamp: "2026-07-25 11:05",
  },
  {
    id: 4,
    title: "Threat Investigation Completed",
    description: "Security team completed the investigation.",
    severity: "Low",
    status: "Resolved",
    timestamp: "2026-07-25 11:20",
  },
];