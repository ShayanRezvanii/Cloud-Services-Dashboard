"use client";

import { useUsage } from "@/contexts/UsageContext";

interface Props {
  type: "database" | "network" | "storage";
}

export default function UsageCard({ type }: Props) {
  const { usage, allocate, deallocate } = useUsage();
  const item = usage.find((u) => u.type === type);

  if (!item) return null;

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg shadow bg-white dark:bg-gray-800">
      <h3 className="font-semibold capitalize dark:text-white">{type}</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all"
          style={{ width: `${item.used}%` }}
        />
      </div>
      <p className="text-sm dark:text-gray-300">{item.used}% used</p>
      <div className="flex gap-2">
        <button
          onClick={() => allocate(type, 5)}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded"
        >
          Allocate
        </button>
        <button
          onClick={() => deallocate(type, 5)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
        >
          Deallocate
        </button>
      </div>
    </div>
  );
}
