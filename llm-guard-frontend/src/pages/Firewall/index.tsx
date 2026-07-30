import { useEffect, useState } from "react";

import FirewallStatusCard from "../../components/firewall/FirewallStatusCard";
import FirewallRuleTable from "../../components/firewall/FirewallRuleTable";

import { getFirewallRules } from "../../services/firewall";
import type { FirewallRule } from "../../types/firewall";

const FirewallPage = () => {
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([]);

  useEffect(() => {
    const fetchFirewallRules = async () => {
      try {
        const data = await getFirewallRules();
        setFirewallRules(data);
      } catch (error) {
        console.error("Failed to fetch firewall rules:", error);
      }
    };

    fetchFirewallRules();
  }, []);

  const totalRules = firewallRules.length;

  const activeRules = firewallRules.filter(
    (rule) => rule.status === "Enabled"
  ).length;

  // Mock value for now
  const blockedToday = 28;

  return (
    <div className="p-6 text-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Firewall
        </h1>

        <p className="mt-2 text-gray-400">
          Configure and monitor AI firewall security rules.
        </p>
      </div>

      {/* Firewall Status */}
      <FirewallStatusCard
        status="Active"
        totalRules={totalRules}
        activeRules={activeRules}
        blockedToday={blockedToday}
      />

      {/* Rules Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Firewall Rules
        </h2>

        <button className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition hover:bg-cyan-500">
          + Add Rule
        </button>
      </div>

      {/* Rules Table */}
      <FirewallRuleTable rules={firewallRules} />
    </div>
  );
};

export default FirewallPage;