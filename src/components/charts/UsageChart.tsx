"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

interface DataPoint {
  time: string;
  cpu: number;
  memory: number;
  storage: number;
}

export default function UsageChart() {
  const [data, setData] = useState<DataPoint[]>([
    { time: "10:00", cpu: 30, memory: 50, storage: 70 },
    { time: "10:05", cpu: 40, memory: 55, storage: 65 },
    { time: "10:10", cpu: 35, memory: 60, storage: 75 },
    { time: "10:15", cpu: 50, memory: 70, storage: 80 },
    { time: "10:20", cpu: 45, memory: 65, storage: 78 },
  ]);

  // ⏱ اضافه کردن دیتا هر 5 ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const now = new Date();
        const newPoint: DataPoint = {
          time: now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          storage: Math.floor(Math.random() * 100),
        };
        return [...prev.slice(-9), newPoint]; // فقط 10 نقطه آخر
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        System Usage
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="#82ca9d"
            name="Memory %"
          />
          <Line
            type="monotone"
            dataKey="storage"
            stroke="#ffc658"
            name="Storage %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
