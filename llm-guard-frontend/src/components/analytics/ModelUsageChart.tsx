import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  getModelUsage,
  type ModelUsageData,
} from "../../services/analytics";

const ModelUsageChart = () => {
  const [modelUsage, setModelUsage] = useState<ModelUsageData[]>([]);

  useEffect(() => {
    const fetchModelUsage = async () => {
      try {
        const data = await getModelUsage();
        setModelUsage(data);
      } catch (error) {
        console.error("Failed to fetch model usage:", error);
      }
    };

    fetchModelUsage();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Model Usage
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={modelUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="model"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Bar
              dataKey="usage"
              fill="#8B5CF6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModelUsageChart;