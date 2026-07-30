export interface AuditLog {
  timestamp: string;
  user: string;
  action: string;
  status: "Success" | "Warning" | "Failed";
}