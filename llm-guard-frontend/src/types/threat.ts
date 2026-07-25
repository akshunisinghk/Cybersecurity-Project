export interface Threat {
  id: number;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: string;
  time: string;
}