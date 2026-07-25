import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/KPI/StatCard";
import { dashboardStats } from "../../constants/dashboard";
import { getDashboardStats } from "../../services/dashboard";

const DashboardStats = () => {
  const [stats, setStats] = useState(dashboardStats);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();

        setStats([
          {
            ...dashboardStats[0],
            value: data.totalRequests.toLocaleString(),
          },
          {
            ...dashboardStats[1],
            value: data.blockedPrompts.toLocaleString(),
          },
          {
            ...dashboardStats[2],
            value: `${Math.round(
              (data.safePrompts / data.totalRequests) * 100
            )}%`,
          },
          {
            ...dashboardStats[3],
            value: data.activeModels.toString(),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
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