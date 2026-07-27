import { useEffect, useState } from "react";
import { getAlerts } from "../../services/alerts";
import type { Alert } from "../../types/alert";

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-300">
        Loading alerts...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Security Alerts
      </h1>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-xl border border-gray-700 bg-gray-900 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {alert.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {alert.description}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  {alert.timestamp}
                </p>
              </div>

              <div className="flex gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  {alert.severity}
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  {alert.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;