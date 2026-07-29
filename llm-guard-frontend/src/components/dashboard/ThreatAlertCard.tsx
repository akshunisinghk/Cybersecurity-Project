interface ThreatAlertCardProps {
  severity: "Low" | "Medium" | "High";
  title: string;
  source: string;
  target: string;
  time: string;
  onClick?: () => void;
}

const ThreatAlertCard = ({
  severity,
  title,
  source,
  target,
  time,
  onClick,
}: ThreatAlertCardProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-gray-700 bg-gray-900 p-4 hover:bg-gray-800"
    >

      <div className="flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-sm ${
            severity === "High"
              ? "bg-red-600"
              : severity === "Medium"
              ? "bg-yellow-600"
              : "bg-green-600"
          }`}
        >
          {severity}
        </span>


        <span className="text-xs text-gray-400">
          {time}
        </span>

      </div>


      <h3 className="mt-3 text-lg font-semibold text-white">
        {title}
      </h3>


      <p className="mt-2 text-sm text-gray-400">
        {source} → {target}
      </p>


    </div>
  );
};

export default ThreatAlertCard;