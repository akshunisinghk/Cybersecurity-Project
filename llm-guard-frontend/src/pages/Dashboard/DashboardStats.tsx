import StatCard from "../../components/dashboard/KPI/StatCard";
import { dashboardStats } from "../../constants/dashboard";

const DashboardStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          color={stat.color}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;