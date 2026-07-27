interface BadgeProps {
  text: string;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
}

const Badge = ({
  text,
  color = "gray",
}: BadgeProps) => {
  const colors = {
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    blue: "bg-cyan-600",
    gray: "bg-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium text-white ${colors[color]}`}
    >
      {text}
    </span>
  );
};

export default Badge;