interface AuditStatusBadgeProps {
  status: "Success" | "Failed";
}

const AuditStatusBadge = ({ status }: AuditStatusBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        status === "Success"
          ? "bg-green-900 text-green-300"
          : "bg-red-900 text-red-300"
      }`}
    >
      {status}
    </span>
  );
};

export default AuditStatusBadge;