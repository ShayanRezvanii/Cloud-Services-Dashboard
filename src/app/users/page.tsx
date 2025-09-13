"use client";

import dynamic from "next/dynamic";
import { UserProvider } from "@/contexts/UserContext";

const UserList = dynamic(() => import("@/components/users/UserList"), {
  ssr: false,
  loading: () => <p className="text-center">Loading users...</p>,
});

export default function UsersPage() {
  return (
    <UserProvider>
      <main className="flex flex-col items-center justify-start min-h-screen gap-6 bg-white dark:bg-gray-900 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <UserList />
      </main>
    </UserProvider>
  );
}
