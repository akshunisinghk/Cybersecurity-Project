export interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: "Success" | "Failed";
}

export const auditLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: "10:30:15",
    user: "admin@company.com",
    action: "Updated Firewall Rule",
    resource: "Prompt Injection Protection",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "10:42:08",
    user: "security@company.com",
    action: "Deleted Firewall Rule",
    resource: "SQL Injection Filter",
    status: "Success",
  },
  {
    id: 3,
    timestamp: "11:05:44",
    user: "analyst@company.com",
    action: "Viewed Threat Report",
    resource: "Analytics Dashboard",
    status: "Success",
  },
  {
    id: 4,
    timestamp: "11:18:20",
    user: "admin@company.com",
    action: "Login Attempt",
    resource: "Admin Portal",
    status: "Failed",
  },
];