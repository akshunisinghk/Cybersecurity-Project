export interface DLPEvent {
  id: number;
  dataType: string;
  source: string;
  destination: string;
  severity: "Low" | "Medium" | "High";
  status: "Blocked" | "Allowed" | "Flagged";
}

export const dlpEvents: DLPEvent[] = [
  {
    id: 1,
    dataType: "Email Address",
    source: "User Prompt",
    destination: "External LLM",
    severity: "High",
    status: "Blocked",
  },
  {
    id: 2,
    dataType: "Phone Number",
    source: "User Prompt",
    destination: "External LLM",
    severity: "Medium",
    status: "Flagged",
  },
  {
    id: 3,
    dataType: "API Key",
    source: "Application",
    destination: "External Service",
    severity: "High",
    status: "Blocked",
  },
  {
    id: 4,
    dataType: "Personal Information",
    source: "User Prompt",
    destination: "Internal Model",
    severity: "Low",
    status: "Allowed",
  },
];