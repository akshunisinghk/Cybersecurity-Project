import type { AuditLog } from "../../mock/auditLogs";
import AuditStatusBadge from "./AuditStatusBadge";

interface AuditLogTableProps {
  logs: AuditLog[];
}

const AuditLogTable = ({ logs }: AuditLogTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-4 text-left">Time</th>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Action</th>
            <th className="p-4 text-left">Resource</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className="border-t border-gray-700 transition hover:bg-gray-800"
            >
              <td className="p-4">{log.timestamp}</td>

              <td className="p-4">{log.user}</td>

              <td className="p-4">{log.action}</td>

              <td className="p-4">{log.resource}</td>

              <td className="p-4">
                <AuditStatusBadge status={log.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogTable;