"use client";

import { useState } from "react";
import { useUsers, Role } from "@/contexts/UserContext";

export default function UserList() {
  const { users, addUser, removeUser, updateRole } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("viewer");

  const handleAdd = () => {
    if (!name || !email) return;
    addUser({ name, email, role });
    setName("");
    setEmail("");
    setRole("viewer");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        User Management
      </h2>

      {/* Add form */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1 min-w-[150px]
                 bg-white dark:bg-gray-800 dark:text-gray-200
                 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1 min-w-[200px]
                 bg-white dark:bg-gray-800 dark:text-gray-200
                 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="px-3 py-2 border rounded-lg
                 bg-white dark:bg-gray-800 dark:text-gray-200
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <th className="py-2 px-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((u, i) => (
            <tr
              key={u.id}
              className={`border-b border-gray-200 dark:border-gray-700 
                      ${i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}`}
            >
              <td className="py-2 text-gray-900 px-2 dark:text-gray-100">
                {u.name}
              </td>
              <td className="text-gray-700 dark:text-gray-300">{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value as Role)}
                  className="px-2 py-1 border rounded-lg
                         bg-white dark:bg-gray-800 dark:text-gray-200
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => removeUser(u.id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
