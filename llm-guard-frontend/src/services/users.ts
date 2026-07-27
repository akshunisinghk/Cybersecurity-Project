import type { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  return [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2026-07-26 09:45 AM",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Analyst",
      status: "Active",
      lastLogin: "2026-07-25 04:30 PM",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2026-07-20 10:15 AM",
    },
  ];
};