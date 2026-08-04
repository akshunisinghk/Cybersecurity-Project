import { useEffect, useState } from "react";
import type { AuditLog } from "../../types/audit";
import { getAuditLogs } from "../../services/audit";

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const getStatusBadge = (status: AuditLog["status"]) => {
    switch (status) {
      case "Success":
        return (
          <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
            Success
          </span>
        );

      case "Warning":
        return (
          <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm">
            Warning
          </span>
        );

      case "Failed":
        return (
          <span className="rounded-full bg-red-600 px-3 py-1 text-sm">
            Failed
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-gray-600 px-3 py-1 text-sm">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Audit Logs
        </h1>

        <p className="mt-2 text-gray-400">
          View and monitor system activity and security events.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Timestamp
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Action
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="px-6 py-4">{log.timestamp}</td>

                <td className="px-6 py-4">{log.user}</td>

                <td className="px-6 py-4">{log.action}</td>

                <td className="px-6 py-4">
                  {getStatusBadge(log.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;