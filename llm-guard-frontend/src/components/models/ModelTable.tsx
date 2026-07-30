import type { Model } from "../../types/model";
import ModelStatusBadge from "./ModelStatusBadge";

interface ModelTableProps {
  models: Model[];
}

const ModelTable = ({ models }: ModelTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
      <table className="min-w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
              Model
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
              Provider
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
              Version
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {models.map((model) => (
            <tr
              key={model.id}
              className="border-t border-gray-700 transition hover:bg-gray-800"
            >
              <td className="px-6 py-4">{model.name}</td>

              <td className="px-6 py-4">{model.provider}</td>

              <td className="px-6 py-4">{model.version}</td>

              <td className="px-6 py-4">
                <ModelStatusBadge status={model.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelTable;