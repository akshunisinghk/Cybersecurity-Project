import { liveTraffic, type LiveTraffic } from "../../mock/liveTraffic";

const LiveTrafficPage = () => {
  const traffic: LiveTraffic[] = liveTraffic;

  return (
    <div className="p-6 text-gray-200">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100">
          Live Traffic
        </h1>

        <p className="mt-1 text-gray-400">
          Monitor real-time LLM requests and security activity.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Request Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Latency</th>
            </tr>
          </thead>

          <tbody>
            {traffic.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-700 transition hover:bg-gray-800"
              >
                <td className="p-3 text-gray-300">
                  {item.timestamp}
                </td>

                <td className="p-3 text-gray-200">
                  {item.source}
                </td>

                <td className="p-3 text-gray-300">
                  {item.destination}
                </td>

                <td className="p-3 text-gray-300">
                  {item.requestType}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      item.status === "Blocked"
                        ? "bg-red-900 text-red-300"
                        : item.status === "Flagged"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-green-900 text-green-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 text-gray-300">
                  {item.latency} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveTrafficPage;