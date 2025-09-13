"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

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
      id: "1",
      name: "Server A",
      ip: "192.168.1.10",
      members: 3,
      status: "running",
    },
    {
      id: "2",
      name: "Server B",
      ip: "192.168.1.11",
      members: 5,
      status: "stopped",
    },
    {
      id: "3",
      name: "Server C",
      ip: "192.168.1.12",
      members: 2,
      status: "error",
    },
  ]);

  const updateStatus = (id: string, status: ResourceStatus) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  };

  const startResource = (id: string) => {
    updateStatus(id, "running");
    toast.success("Resource started successfully!");
  };
  const stopResource = (id: string) => {
    updateStatus(id, "stopped");
    toast("Resource stopped");
  };
  const restartResource = (id: string) => {
    updateStatus(id, "running");
    toast.success("Resource restarted!");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prev) => {
        if (prev.length === 0) return prev;

        // یکی از منابع رو random انتخاب کن
        const randomIndex = Math.floor(Math.random() * prev.length);
        const randomStatus = ["running", "stopped", "error"][
          Math.floor(Math.random() * 3)
        ] as ResourceStatus;

        return prev.map((r, i) =>
          i === randomIndex ? { ...r, status: randomStatus } : r,
        );
      });
    }, 7000); // هر 7 ثانیه
    return () => clearInterval(interval);
  }, []);

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
