"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Usage {
  type: "database" | "network" | "storage";
  used: number; // درصد استفاده
}

interface UsageContextProps {
  usage: Usage[];
  allocate: (type: Usage["type"], amount: number) => void;
  deallocate: (type: Usage["type"], amount: number) => void;
}

const UsageContext = createContext<UsageContextProps | undefined>(undefined);

export function UsageProvider({ children }: { children: ReactNode }) {
  const [usage, setUsage] = useState<Usage[]>([
    { type: "database", used: 40 },
    { type: "network", used: 65 },
    { type: "storage", used: 80 },
  ]);

  const updateUsage = (type: Usage["type"], delta: number) => {
    setUsage((prev) =>
      prev.map((u) =>
        u.type === type
          ? { ...u, used: Math.min(100, Math.max(0, u.used + delta)) }
          : u,
      ),
    );
  };

  const allocate = (type: Usage["type"], amount: number) =>
    updateUsage(type, amount);
  const deallocate = (type: Usage["type"], amount: number) =>
    updateUsage(type, -amount);

  return (
    <UsageContext.Provider value={{ usage, allocate, deallocate }}>
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const ctx = useContext(UsageContext);
  if (!ctx) throw new Error("useUsage must be used inside UsageProvider");
  return ctx;
}
