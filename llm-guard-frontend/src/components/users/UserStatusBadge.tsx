interface UserStatusBadgeProps {
  status: "Active" | "Inactive";
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        status === "Active"
          ? "bg-green-900 text-green-300"
          : "bg-red-900 text-red-300"
      }`}
    >
      {status}
    </span>
  );
};

export default UserStatusBadge;