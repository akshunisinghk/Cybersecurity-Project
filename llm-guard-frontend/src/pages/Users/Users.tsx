import { useEffect, useMemo, useState } from "react";
import { Search, Users as UsersIcon } from "lucide-react";
import { getUsers } from "../../services/users";
import type { User } from "../../types/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const statusColor = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400";
      case "Inactive":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const roleColor = (role: User["role"]) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/20 text-red-400";
      case "Analyst":
        return "bg-blue-500/20 text-blue-400";
      case "Viewer":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-300">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <UsersIcon className="text-cyan-400" size={30} />
        <div>
          <h1 className="text-3xl font-bold text-white">
            User Management
          </h1>
          <p className="mt-1 text-slate-400">
            View and manage platform users.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">Name</th>
              <th className="px-6 py-4 text-left text-slate-300">Email</th>
              <th className="px-6 py-4 text-left text-slate-300">Role</th>
              <th className="px-6 py-4 text-left text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-slate-300">
                Last Login
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-white">{user.name}</td>

                <td className="px-6 py-4 text-slate-300">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {user.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;