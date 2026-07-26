import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getUsers } from "../../services/users";
import type { User } from "../../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Users className="text-cyan-400" size={30} />
        <h1 className="text-3xl font-bold text-white">
          User Management
        </h1>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border-b border-slate-700 py-3 last:border-none"
          >
            <h2 className="text-white font-semibold">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
            <p className="text-slate-500">
              {user.role} • {user.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;