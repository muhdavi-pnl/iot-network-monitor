"use client";

import { useEffect, useState } from "react";
import { getSummary } from "../services/dashboard.service";

export default function Home() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    getSummary()
      .then((res) => {
        setSummary(res.data);
      })
      .catch(console.error);
  }, []);

  if (!summary) {
    return <p className="p-10">Loading dashboard...</p>;
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">IoT Monitoring Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Total Devices</p>
          <p className="text-2xl font-bold">{summary.totalDevices}</p>
        </div>

        <div className="bg-green-100 shadow rounded-xl p-6">
          <p className="text-gray-500">Online Devices</p>
          <p className="text-2xl font-bold">{summary.onlineDevices}</p>
        </div>

        <div className="bg-red-100 shadow rounded-xl p-6">
          <p className="text-gray-500">Offline Devices</p>
          <p className="text-2xl font-bold">{summary.offlineDevices}</p>
        </div>

        <div className="bg-blue-100 shadow rounded-xl p-6">
          <p className="text-gray-500">Total Metrics</p>
          <p className="text-2xl font-bold">{summary.totalMetrics}</p>
        </div>

      </div>
    </main>
  );
}