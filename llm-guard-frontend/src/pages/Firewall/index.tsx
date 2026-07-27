import { useState } from "react";
import { firewallRules, type FirewallRule } from "../../mock/firewall";

const Firewall = () => {
  const [rules] = useState<FirewallRule[]>(firewallRules);

  return (
    <div className="p-6 text-gray-200">
      <h1 className="mb-6 text-2xl font-bold text-gray-100">
        Firewall Rules
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">Rule</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr
                key={rule.id}
                className="border-t border-gray-700 transition hover:bg-gray-800"
              >
                <td className="p-3 text-gray-200">
                  {rule.name}
                </td>

                <td className="p-3 text-gray-300">
                  {rule.category}
                </td>

                <td
                  className={`p-3 font-medium ${
                    rule.action === "Block"
                      ? "text-red-400"
                      : rule.action === "Allow"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {rule.action}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      rule.status === "Active"
                        ? "bg-green-900 text-green-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {rule.status}
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

export default Firewall;