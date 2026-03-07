"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function MetricsChart({ devices, type }) {

  const title = type === "latency" ? "Latency (ms)" : "Packet Loss (%)";

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow">

      <h3 className="mb-4 font-semibold">{title}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={devices}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
          <XAxis dataKey="device_id"/>
          <YAxis/>
          <Tooltip/>
          <Line
            type="monotone"
            dataKey={type}
            stroke="#38bdf8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}