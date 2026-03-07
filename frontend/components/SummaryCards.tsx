import { Cpu, Wifi, AlertCircle } from "lucide-react";

export default function SummaryCards({ summary }) {

  if (!summary) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400">Total Devices</p>
            <h2 className="text-3xl font-bold">{summary.totalDevices}</h2>
          </div>
          <Cpu size={32} />
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400">Online</p>
            <h2 className="text-3xl text-green-400 font-bold">{summary.onlineDevices}</h2>
          </div>
          <Wifi size={32} />
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400">Offline</p>
            <h2 className="text-3xl text-red-400 font-bold">{summary.offlineDevices}</h2>
          </div>
          <AlertCircle size={32} />
        </div>
      </div>

    </div>
  );
}