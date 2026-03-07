"use client";

import { useEffect, useState } from "react";
import { getMetrics } from "../services/metrics.service";

export default function MetricsTable() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMetrics();
  }, [page]);

  const loadMetrics = async () => {
    const res = await getMetrics(page, 10);
    setMetrics(res.data);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Device Metrics</h2>

      <table className="w-full border ounded-xl overflow-hidden shadow">
        <thead className="bg-gray-100 bg-gray-700 text-gray-300">
          <tr>
            <th className="p-3 border">Device ID</th>
            <th className="p-3 border">Latency</th>
            <th className="p-3 border">Packet Loss</th>
            <th className="p-3 border">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((m, i) => (
            <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3 border">{m.device_id}</td>
              <td className="p-3 border">{m.latency}</td>
              <td className="p-3 border">{m.packet_loss}</td>
              <td className="p-3 border">
                {new Date(m.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}