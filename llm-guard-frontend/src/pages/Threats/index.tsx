import { useEffect, useMemo, useState } from "react";
import { getThreats } from "../../services/threats";
import type { Threat } from "../../mock/threats";

const Threats = () => {
  const [threatList, setThreatList] = useState<Threat[]>([]);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

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

  const filteredThreats = useMemo(() => {
    let data = [...threatList];

    // Search
    if (search) {
      data = data.filter(
        (threat) =>
          threat.name.toLowerCase().includes(search.toLowerCase()) ||
          threat.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
    if (severityFilter !== "All") {
      data = data.filter(
        (threat) => threat.severity === severityFilter
      );
    }

    // Sort
    if (sortOrder === "A-Z") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [threatList, search, severityFilter, sortOrder]);

  return (
    <div className="p-6 text-gray-200">
      <h1 className="mb-6 text-2xl font-bold text-gray-100">
        Threats
      </h1>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search threats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-cyan-500"
        />

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
        >
          <option>Newest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

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
            {filteredThreats.map((threat) => (
              <tr
                key={threat.id}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{threat.name}</td>

                <td className="p-3">{threat.type}</td>

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

                <td className="p-3">{threat.status}</td>

                <td className="p-3">{threat.timestamp}</td>
              </tr>
            ))}

            {filteredThreats.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-400"
                >
                  No threats found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Threats;