export interface Alert {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "Read" | "Resolved";
  timestamp: string;
}