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
            value: (data?.totalRequests ?? 0).toLocaleString(),
          },
          {
            ...dashboardStats[1],
            value: (data?.blockedPrompts ?? 0).toLocaleString(),
          },
          {
            ...dashboardStats[2],
            value:
              data?.totalRequests && data.totalRequests > 0
                ? `${Math.round(
                    ((data?.safePrompts ?? 0) / data.totalRequests) * 100
                  )}%`
                : "0%",
          },
          {
            ...dashboardStats[3],
            value: (data?.activeModels ?? 0).toString(),
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