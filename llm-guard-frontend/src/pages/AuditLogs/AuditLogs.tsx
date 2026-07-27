const AuditLogs = () => {
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
            <tr className="border-t border-gray-700 hover:bg-gray-800">
              <td className="px-6 py-4">26 Jul 2026, 10:15 PM</td>
              <td className="px-6 py-4">admin</td>
              <td className="px-6 py-4">Updated Firewall Rules</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                  Success
                </span>
              </td>
            </tr>

            <tr className="border-t border-gray-700 hover:bg-gray-800">
              <td className="px-6 py-4">26 Jul 2026, 09:42 PM</td>
              <td className="px-6 py-4">security_analyst</td>
              <td className="px-6 py-4">Blocked Prompt Injection</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-yellow-600 px-3 py-1 text-sm">
                  Warning
                </span>
              </td>
            </tr>

            <tr className="border-t border-gray-700 hover:bg-gray-800">
              <td className="px-6 py-4">26 Jul 2026, 08:58 PM</td>
              <td className="px-6 py-4">system</td>
              <td className="px-6 py-4">User Login Failed</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm">
                  Failed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;