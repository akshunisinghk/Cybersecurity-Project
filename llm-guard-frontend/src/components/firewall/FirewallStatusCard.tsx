interface FirewallStatusCardProps {
  status: "Active" | "Inactive";
  totalRules: number;
  activeRules: number;
  blockedToday: number;
}

const FirewallStatusCard = ({
  status,
  totalRules,
  activeRules,
  blockedToday,
}: FirewallStatusCardProps) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-700 bg-gray-900 p-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Firewall Status
          </h2>

          <p className="mt-2 text-gray-400">
            Current protection status of the AI Firewall
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            status === "Active"
              ? "bg-green-900 text-green-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Total Rules
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {totalRules}
          </h3>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Active Rules
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-400">
            {activeRules}
          </h3>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Blocked Today
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-400">
            {blockedToday}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default FirewallStatusCard;