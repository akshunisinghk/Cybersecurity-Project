import { useEffect, useState } from "react";
import {
  Cpu,
  CheckCircle,
  XCircle,
  Wrench,
} from "lucide-react";

import ModelTable from "../../components/models/ModelTable";
import SecurityMetricCard from "../../components/dashboard/SecurityMetricCard";

import type { Model } from "../../types/model";
import { getModels } from "../../services/models";

const Models = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getModels();
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, []);

  const totalModels = models.length;

  const onlineModels = models.filter(
    (model) => model.status === "Online"
  ).length;

  const offlineModels = models.filter(
    (model) => model.status === "Offline"
  ).length;

  const maintenanceModels = models.filter(
    (model) => model.status === "Maintenance"
  ).length;

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          AI Models
        </h1>

        <p className="mt-2 text-gray-400">
          Manage and monitor all connected AI models.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SecurityMetricCard
          title="Total Models"
          value={totalModels}
          description="Connected AI models"
          icon={<Cpu size={20} />}
        />

        <SecurityMetricCard
          title="Online"
          value={onlineModels}
          description="Currently available"
          icon={<CheckCircle size={20} />}
        />

        <SecurityMetricCard
          title="Offline"
          value={offlineModels}
          description="Unavailable models"
          icon={<XCircle size={20} />}
        />

        <SecurityMetricCard
          title="Maintenance"
          value={maintenanceModels}
          description="Under maintenance"
          icon={<Wrench size={20} />}
        />
      </div>

      <ModelTable models={models} />
    </div>
  );
};

export default Models;