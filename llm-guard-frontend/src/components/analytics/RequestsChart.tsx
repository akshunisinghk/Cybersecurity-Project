import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getRequestChart,
  type RequestChartData,
} from "../../services/analytics";

const RequestsChart = () => {
  const [requestData, setRequestData] = useState<RequestChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequestChart();
        setRequestData(data);
      } catch (error) {
        console.error("Failed to fetch request chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Weekly Request Traffic
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={requestData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RequestsChart;