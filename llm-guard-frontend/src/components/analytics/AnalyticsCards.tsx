import {
  Activity,
  BrainCircuit,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

import StatCard from "../dashboard/KPI/StatCard";

const cards = [
  {
    title: "Total Requests",
    value: "12,548",
    change: "+12%",
    color: "text-cyan-400",
    icon: Activity,
  },
  {
    title: "Threats Blocked",
    value: "342",
    change: "+8%",
    color: "text-red-400",
    icon: ShieldAlert,
  },
  {
    title: "Safe Prompt Rate",
    value: "97%",
    change: "+2%",
    color: "text-green-400",
    icon: TrendingUp,
  },
  {
    title: "Active Models",
    value: "6",
    change: "Online",
    color: "text-purple-400",
    icon: BrainCircuit,
  },
];

const AnalyticsCards = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          color={card.color}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default AnalyticsCards;