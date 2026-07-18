import {
  LayoutDashboard,
  Activity,
  Shield,
  ShieldAlert,
  Database,
  BarChart3,
  Bell,
  Users,
  Brain,
  ClipboardList,
  Settings,
  User,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    title: "Live Traffic",
    icon: Activity,
    path: "/live-traffic",
  },

  {
    title: "Threats",
    icon: ShieldAlert,
    path: "/threats",
  },

  {
    title: "Firewall",
    icon: Shield,
    path: "/firewall",
  },

  {
    title: "DLP",
    icon: Database,
    path: "/dlp",
  },

  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },

  {
    title: "Alerts",
    icon: Bell,
    path: "/alerts",
  },

  {
    title: "Users",
    icon: Users,
    path: "/users",
  },

  {
    title: "Models",
    icon: Brain,
    path: "/models",
  },

  {
    title: "Audit Logs",
    icon: ClipboardList,
    path: "/audit-logs",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },

  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];