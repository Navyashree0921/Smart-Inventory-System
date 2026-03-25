import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50/60 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">All Users</h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            View and manage all registered users across the system.
          </p>
        </div>

        {/* TABLE SURFACE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-emerald-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-emerald-800">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900">{u.name}</td>

                  <td className="px-4 py-3 text-gray-700">{u.email}</td>

                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
