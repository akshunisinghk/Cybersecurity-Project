import { useEffect, useState } from "react";
import { getThreats } from "../../services/threats";
import type { Threat } from "../../mock/threats";

const Threats = () => {
 const [threatList, setThreatList] = useState<Threat[]>([]);

useEffect(() => {
  const fetchThreats = async () => {
    try {
      const data = await getThreats();
      setThreatList(data);
    } catch (error) {
      console.error("Failed to load threats:", error);
    }
  };

  fetchThreats();
}, []);

  return (
    <div className="p-6 text-gray-200">
      <h1 className="mb-6 text-2xl font-bold text-gray-100">
        Threats
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">Threat</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Severity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {threatList.map((threat) => (
              <tr
                key={threat.id}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3 text-gray-200">
                  {threat.name}
                </td>

                <td className="p-3 text-gray-300">
                  {threat.type}
                </td>

                <td
                  className={`p-3 font-medium ${
                    threat.severity === "Critical"
                      ? "text-red-500"
                      : threat.severity === "High"
                      ? "text-red-400"
                      : threat.severity === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {threat.severity}
                </td>

                <td className="p-3 text-gray-300">
                  {threat.status}
                </td>

                <td className="p-3 text-gray-400">
                  {threat.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Threats;