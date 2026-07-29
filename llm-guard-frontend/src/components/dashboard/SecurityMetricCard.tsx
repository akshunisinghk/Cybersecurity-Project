interface SecurityMetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
}

const SecurityMetricCard = ({
  title,
  value,
  description,
  icon,
}: SecurityMetricCardProps) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {title}
        </p>

        {icon && (
          <div className="text-zinc-400">
            {icon}
          </div>
        )}
      </div>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-1 text-xs text-zinc-500">
        {description}
      </p>
    </div>
  );
};

export default SecurityMetricCard;