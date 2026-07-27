import SecurityMetricCard from "../../components/dashboard/SecurityMetricCard";
import AuditLogTable from "../../components/audit/AuditLogTable";
import { auditLogs } from "../../mock/auditLogs";

import {
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AuditLogsPage = () => {
  const totalLogs = auditLogs.length;

  const successLogs = auditLogs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedLogs = auditLogs.filter(
    (log) => log.status === "Failed"
  ).length;

  return (
    <div className="p-6 text-gray-200">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Audit Logs
        </h1>

        <p className="mt-2 text-gray-400">
          View system activity and security audit history.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">

        <SecurityMetricCard
          title="Total Logs"
          value={totalLogs}
          description="Recorded audit events"
          icon={<FileText size={20} />}
        />

        <SecurityMetricCard
          title="Successful Actions"
          value={successLogs}
          description="Completed successfully"
          icon={<CheckCircle size={20} />}
        />

        <SecurityMetricCard
          title="Failed Actions"
          value={failedLogs}
          description="Requires investigation"
          icon={<XCircle size={20} />}
        />

      </div>

      <div className="mb-4 flex items-center justify-between">

        <input
          type="text"
          placeholder="Search logs..."
          className="w-80 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none"
        />

        <button className="rounded-lg bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500">
          Export CSV
        </button>

      </div>

      <AuditLogTable logs={auditLogs} />

    </div>
  );
};

export default AuditLogsPage;