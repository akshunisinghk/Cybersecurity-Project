import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardAlerts from "./DashboardAlerts";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardAlerts />
    </div>
  );
};

export default Dashboard;