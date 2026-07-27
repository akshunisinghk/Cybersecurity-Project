export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}