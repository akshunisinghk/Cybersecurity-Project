import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  change,
  color,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-cyan-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          <p className={`mt-2 text-sm font-medium ${color}`}>
            {change}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-3">
          <Icon className={color} size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;