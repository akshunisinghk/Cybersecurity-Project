import { useEffect, useState } from "react";
import { getDLPEvents } from "../../services/dlp";
import type { DLPEvent } from "../../types/dlp";

const DLP = () => {
  const [events, setEvents] = useState<DLPEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getDLPEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch DLP events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 text-gray-200">
      <h1 className="mb-2 text-2xl font-bold text-gray-100">
        Data Loss Prevention
      </h1>

      <p className="mb-6 text-gray-400">
        Monitor and prevent sensitive data from leaving the system.
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">Data Type</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Severity</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{event.dataType}</td>

                <td className="p-3">{event.source}</td>

                <td className="p-3">{event.destination}</td>

                <td
                  className={`p-3 font-medium ${
                    event.severity === "High"
                      ? "text-red-400"
                      : event.severity === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {event.severity}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      event.status === "Blocked"
                        ? "bg-red-900 text-red-300"
                        : event.status === "Flagged"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-green-900 text-green-300"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DLP;