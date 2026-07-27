// import api from "./api";
// import type { Alert } from "../types/alert";

// export const getAlerts = async (): Promise<Alert[]> => {
//   const response = await api.get("/alerts");
//   return response.data;
// };

import type { Alert } from "../types/alert";

export const getAlerts = async (): Promise<Alert[]> => {
  return [
    {
      id: 1,
      title: "Prompt Injection",
      description: "Prompt injection attack blocked.",
      severity: "Critical",
      status: "New",
      timestamp: "2026-07-26 19:45",
    },
    {
      id: 2,
      title: "PII Detection",
      description: "Sensitive information detected.",
      severity: "High",
      status: "Resolved",
      timestamp: "2026-07-26 18:30",
    },
  ];
};