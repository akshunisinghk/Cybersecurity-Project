export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Security Analyst" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 09:15 AM",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    role: "Security Analyst",
    status: "Active",
    lastLogin: "Today, 08:42 AM",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@company.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "Yesterday, 06:30 PM",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@company.com",
    role: "Security Analyst",
    status: "Active",
    lastLogin: "Today, 10:05 AM",
  },
];