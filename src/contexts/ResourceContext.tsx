"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuid } from "uuid";

export type ResourceStatus = "running" | "stopped" | "error";

export interface Resource {
  id: string;
  name: string;
  ip: string;
  members: number;
  status: ResourceStatus;
}

interface ResourceContextProps {
  resources: Resource[];
  startResource: (id: string) => void;
  stopResource: (id: string) => void;
  restartResource: (id: string) => void;
}

const ResourceContext = createContext<ResourceContextProps | undefined>(
  undefined,
);

export function ResourceProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: uuid(),
      name: "Server A",
      ip: "192.168.1.1",
      members: 3,
      status: "running",
    },
    {
      id: uuid(),
      name: "Server B",
      ip: "192.168.1.2",
      members: 5,
      status: "stopped",
    },
    {
      id: uuid(),
      name: "Server C",
      ip: "192.168.1.3",
      members: 2,
      status: "error",
    },
  ]);

  const startResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "running" } : r)),
    );
  };

  const stopResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "stopped" } : r)),
    );
  };

  const restartResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "running" } : r)),
    );
  };

  return (
    <ResourceContext.Provider
      value={{ resources, startResource, stopResource, restartResource }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const ctx = useContext(ResourceContext);
  if (!ctx)
    throw new Error("useResources must be used inside ResourceProvider");
  return ctx;
}
