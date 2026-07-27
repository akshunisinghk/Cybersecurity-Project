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

        // Add a local "read" property for UI purposes
        const alertsWithRead = data.map((alert) => ({
          ...alert,
          read: false,
        }));

        setAlerts(alertsWithRead as (Alert & { read: boolean })[]);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const markAsRead = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert: any) =>
        alert.id === id
          ? { ...alert, read: true, status: "Read" }
          : alert
      )
    );
  };

  const unreadCount = alerts.filter(
    (alert: any) => !alert.read
  ).length;

  if (loading) {
    return (
      <div className="p-6 text-gray-300">
        Loading alerts...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Security Alerts
        </h1>

        <span className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white">
          Unread: {unreadCount}
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert: any) => (
          <div
            key={alert.id}
            className={`rounded-xl border p-5 transition ${
              alert.read
                ? "border-gray-700 bg-gray-900 opacity-70"
                : "border-cyan-600 bg-gray-900"
            }`}
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

              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  {alert.severity}
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  {alert.status}
                </span>

                {!alert.read && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="rounded-lg bg-cyan-600 px-3 py-2 text-sm text-white transition hover:bg-cyan-500"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;