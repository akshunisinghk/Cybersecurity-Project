import { useMemo, useState } from "react";
import UserTable from "../../components/users/UserTable";
import SecurityMetricCard from "../../components/dashboard/SecurityMetricCard";
import { users } from "../../mock/users";
import { Users, UserCheck, Shield } from "lucide-react";

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const admins = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [search]);

  return (
    <div className="p-6 text-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Users
        </h1>

        <p className="mt-2 text-gray-400">
          Manage users and access permissions.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <SecurityMetricCard
          title="Total Users"
          value={totalUsers}
          description="Registered users"
          icon={<Users size={20} />}
        />

        <SecurityMetricCard
          title="Active Users"
          value={activeUsers}
          description="Currently active"
          icon={<UserCheck size={20} />}
        />

        <SecurityMetricCard
          title="Administrators"
          value={admins}
          description="Admin accounts"
          icon={<Shield size={20} />}
        />
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none md:w-80"
        />

        <button className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition hover:bg-cyan-500">
          + Add User
        </button>
      </div>

      {filteredUsers.length > 0 ? (
        <UserTable users={filteredUsers} />
      ) : (
        <div className="rounded-xl border border-gray-700 bg-gray-900 py-10 text-center text-gray-400">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UsersPage;