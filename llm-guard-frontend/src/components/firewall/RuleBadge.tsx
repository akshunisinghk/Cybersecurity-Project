interface RuleBadgeProps {
  value: string;
  type: "action" | "status";
}

const RuleBadge = ({ value, type }: RuleBadgeProps) => {
  let className = "rounded-full px-3 py-1 text-sm font-medium ";

  if (type === "action") {
    switch (value) {
      case "Block":
        className += "bg-red-900 text-red-300";
        break;

      case "Flag":
        className += "bg-yellow-900 text-yellow-300";
        break;

      case "Allow":
        className += "bg-green-900 text-green-300";
        break;

      default:
        className += "bg-gray-700 text-gray-300";
    }
  } else {
    switch (value) {
      case "Enabled":
        className += "bg-green-900 text-green-300";
        break;

      case "Disabled":
        className += "bg-gray-700 text-gray-300";
        break;

      default:
        className += "bg-gray-700 text-gray-300";
    }
  }

  return <span className={className}>{value}</span>;
};

export default RuleBadge;