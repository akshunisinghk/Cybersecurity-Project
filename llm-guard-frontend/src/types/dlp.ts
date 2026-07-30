export interface DLPEvent {
  id: number;
  timestamp: string;

  // Data being protected
  dataType: string;

  // Source of the data
  source: string;

  // Destination of the data
  destination: string;

  severity: "Low" | "Medium" | "High";

  // Current action taken
  status: "Allowed" | "Blocked" | "Flagged";
}