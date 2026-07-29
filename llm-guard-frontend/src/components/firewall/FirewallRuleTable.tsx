import { Pencil, Trash2 } from "lucide-react";
import RuleBadge from "./RuleBadge";
import  type { FirewallRule } from "../../mock/firewallRules";

interface FirewallRuleTableProps {
  rules: FirewallRule[];
} 

const FirewallRuleTable = ({ rules }: FirewallRuleTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-4 text-left">Rule Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Action</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rules.map((rule) => (
            <tr
              key={rule.id}
              className="border-t border-gray-700 transition hover:bg-gray-800"
            >
              <td className="p-4 font-medium text-white">
                {rule.name}
              </td>

              <td className="p-4 text-gray-300">
                {rule.type}
              </td>

              <td className="p-4">
                <RuleBadge
                  value={rule.action}
                  type="action"
                />
              </td>

              <td className="p-4">
                <RuleBadge
                  value={rule.status}
                  type="status"
                />
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg bg-cyan-700 p-2 transition hover:bg-cyan-600">
                    <Pencil size={16} />
                  </button>

                  <button className="rounded-lg bg-red-700 p-2 transition hover:bg-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirewallRuleTable;