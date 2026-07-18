import {
  Activity,
  ShieldAlert,
  Shield,
  Brain,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Total Requests",
    value: "24,381",
    change: "+12%",
    color: "text-cyan-400",
    icon: Activity,
  },
  {
    title: "Blocked Prompts",
    value: "1,248",
    change: "+8%",
    color: "text-red-400",
    icon: ShieldAlert,
  },
  {
    title: "Threat Score",
    value: "98%",
    change: "Healthy",
    color: "text-green-400",
    icon: Shield,
  },
  {
    title: "Active Models",
    value: "4",
    change: "Online",
    color: "text-purple-400",
    icon: Brain,
  },
];