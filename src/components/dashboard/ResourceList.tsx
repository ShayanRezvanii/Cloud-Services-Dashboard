"use client";

import { useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useResources, Resource } from "@/contexts/ResourceContext";
import Modal from "@/components/ui/Modal";

export default function ResourceList() {
  const { resources, startResource, stopResource, restartResource } =
    useResources();
  const [selected, setSelected] = useState<Resource | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "running" | "stopped" | "error">(
    "all",
  );

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.ip.includes(search);
    const matchesFilter = filter === "all" ? true : r.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Virtualization
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Resources
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full md:w-1/2
                   bg-white dark:bg-gray-800 dark:text-gray-200 
                   dark:placeholder:text-gray-400
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-2 border rounded-lg w-full md:w-1/4
                   bg-white dark:bg-gray-800 dark:text-gray-200
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="running">Running</option>
          <option value="stopped">Stopped</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 px-3 py-2">
        <span>Name</span>
        <span>IP</span>
        <span>Members</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {/* Virtualized list */}
      <div ref={parentRef} className="h-96 overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const r = filtered[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-5 items-center px-3 py-2
                     border-b border-gray-200 dark:border-gray-700
                     odd:bg-gray-50 even:bg-white 
                     dark:odd:bg-gray-800 dark:even:bg-gray-900"
              >
                <span
                  onClick={() => setSelected(r)}
                  className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {r.name}
                </span>
                <span className="dark:text-gray-200">{r.ip}</span>
                <span className="dark:text-gray-200">{r.members}</span>
                <span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      r.status === "running"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : r.status === "stopped"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {r.status}
                  </span>
                </span>
                <span className="flex gap-2">
                  <button className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded">
                    Start
                  </button>
                  <button className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                    Stop
                  </button>
                  <button className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded">
                    Restart
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Resource Details"
      >
        {selected && (
          <div className="space-y-2 dark:text-gray-200">
            <p>
              <strong>ID:</strong> {selected.id}
            </p>
            <p>
              <strong>Name:</strong> {selected.name}
            </p>
            <p>
              <strong>IP:</strong> {selected.ip}
            </p>
            <p>
              <strong>Members:</strong> {selected.members}
            </p>
            <p>
              <strong>Status:</strong> {selected.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
