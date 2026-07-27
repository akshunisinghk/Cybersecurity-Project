interface Props {
  status: "Online" | "Offline" | "Maintenance";
}

const statusStyles = {
  Online: "bg-green-600",
  Offline: "bg-red-600",
  Maintenance: "bg-yellow-600",
};

const ModelStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium text-white ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default ModelStatusBadge;