import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import RequestsChart from "../../components/analytics/RequestsChart";
import ThreatPieChart from "../../components/analytics/ThreatPieChart";
import ModelUsageChart from "../../components/analytics/ModelUsageChart";

const Analytics = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor AI requests, blocked threats and model usage.
        </p>
      </div>

      <AnalyticsCards />

      <RequestsChart />

      <div className="grid gap-6 lg:grid-cols-2">
        <ThreatPieChart />
        <ModelUsageChart />
      </div>
    </div>
  );
};

export default Analytics;