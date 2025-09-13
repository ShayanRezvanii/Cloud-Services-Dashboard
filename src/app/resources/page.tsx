"use client";

import dynamic from "next/dynamic";
import Protected from "@/components/auth/Protected";
import { ResourceProvider } from "@/contexts/ResourceContext";

const ResourceList = dynamic(
  () => import("@/components/dashboard/ResourceList"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading resources...</p>,
  },
);

export default function ResourcesPage() {
  return (
    <Protected>
      <ResourceProvider>
        <main className="flex flex-col items-center justify-start min-h-screen gap-6 bg-white dark:bg-gray-900 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Resources
          </h1>
          <ResourceList />
        </main>
      </ResourceProvider>
    </Protected>
  );
}
