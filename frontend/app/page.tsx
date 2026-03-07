"use client";

import { useEffect, useState } from "react";
import SummaryCards from "../components/SummaryCards";
import DeviceTable from "../components/DeviceTable";
import MetricsChart from "../components/MetricsChart";

const BASE_URL = "http://localhost:5001/api";

export default function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {

    try {

      // ambil semua devices
      const resDevices = await fetch(`${BASE_URL}/devices`);
      const jsonDevices = await resDevices.json();

      const deviceList = jsonDevices.data || [];

      // ambil metrics terbaru tiap device
      const mergedDevices = await Promise.all(
        deviceList.map(async (device) => {

          const res = await fetch(
            `${BASE_URL}/devices/${device.device_id}/latest`
          );

          const json = await res.json();

          return {
            device_id: device.device_id,
            status: device.status,
            latency: json.data?.latency || 0,
            packet_loss: json.data?.packet_loss || 0
          };

        })
      );

      setDevices(mergedDevices);

      // 🔥 HITUNG SUMMARY DARI DATA YANG SAMA
      const totalDevices = mergedDevices.length;
      const onlineDevices = mergedDevices.filter(
        (d) => d.status === "ONLINE"
      ).length;

      const offlineDevices = totalDevices - onlineDevices;

      const avgLatency =
        mergedDevices.reduce((sum, d) => sum + d.latency, 0) /
        (totalDevices || 1);

      const avgPacketLoss =
        mergedDevices.reduce((sum, d) => sum + d.packet_loss, 0) /
        (totalDevices || 1);

      setSummary({
        totalDevices,
        onlineDevices,
        offlineDevices,
        avgLatency: avgLatency.toFixed(2),
        avgPacketLoss: avgPacketLoss.toFixed(2),
      });

      console.log("Dashboard refreshed");

    } catch (err) {
      console.error("Fetch error:", err);
    }

  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-3xl font-bold mb-6">
        IoT Monitoring Dashboard
      </h1>

      <SummaryCards summary={summary} />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <MetricsChart devices={devices} type="latency" />
        <MetricsChart devices={devices} type="packet_loss" />
      </div>

      <div className="mt-8">
        <DeviceTable devices={devices} />
      </div>

    </main>
  );
}