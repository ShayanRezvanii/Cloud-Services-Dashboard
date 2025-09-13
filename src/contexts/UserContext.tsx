"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface UserContextProps {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  removeUser: (id: string) => void;
  updateRole: (id: string, role: Role) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Alice", email: "alice@example.com", role: "admin" },
    { id: "2", name: "Bob", email: "bob@example.com", role: "editor" },
  ]);

  const addUser = (user: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...user }]);
  };

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateRole = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <UserContext.Provider value={{ users, addUser, removeUser, updateRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be used inside UserProvider");
  return ctx;
}
