export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Security Analyst" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}