import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  getThreatChart,
  type ThreatChartData,
} from "../../services/analytics";

const COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
];

const ThreatPieChart = () => {
  const [threatData, setThreatData] = useState<ThreatChartData[]>([]);

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        const data = await getThreatChart();
        setThreatData(data);
      } catch (error) {
        console.error("Failed to fetch threat chart:", error);
      }
    };

    fetchThreatData();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Threat Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={threatData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {threatData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatPieChart;