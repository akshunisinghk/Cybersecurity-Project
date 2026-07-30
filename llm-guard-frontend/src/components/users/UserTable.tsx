import type { User } from "../../types/user";
import UserStatusBadge from "./UserStatusBadge";
import { Pencil, Trash2 } from "lucide-react";

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Last Login</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-gray-700 transition hover:bg-gray-800"
            >
              <td className="p-4 font-medium text-white">
                {user.name}
              </td>

              <td className="p-4 text-gray-300">
                {user.email}
              </td>

              <td className="p-4 text-gray-300">
                {user.role}
              </td>

              <td className="p-4">
                <UserStatusBadge status={user.status} />
              </td>

              <td className="p-4 text-gray-300">
                {user.lastLogin}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button className="rounded-lg bg-cyan-700 p-2 hover:bg-cyan-600">
                    <Pencil size={16} />
                  </button>

                  <button className="rounded-lg bg-red-700 p-2 hover:bg-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;