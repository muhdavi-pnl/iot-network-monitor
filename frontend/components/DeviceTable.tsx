import Link from "next/link"

export default function DeviceTable({ devices }) {

  return (
    <div className="bg-slate-800 rounded-xl shadow overflow-hidden">

      <div className="p-4 border-b border-slate-700">
        <h2 className="font-semibold">Device Metrics</h2>
      </div>

      <table className="w-full text-sm">

        <thead className="bg-slate-700 text-gray-300">
          <tr>
            <th className="p-3 text-left">Device</th>
            <th className="p-3 text-left">Latency</th>
            <th className="p-3 text-left">Packet Loss</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>

          {devices.map((d, i) => (
            <tr
              key={i}
              className="border-b border-slate-700 hover:bg-slate-700"
            >
              <td className="p-3">
                <Link href={`#`}>
                  {d.device_id}
                </Link>
              </td>
              <td className="p-3">{d.latency} ms</td>
              <td className="p-3">{d.packet_loss} %</td>
              <td className="p-3">
                {d.status === "ONLINE" ? (
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    Online
                  </span>
                ) : (
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">
                    Offline
                  </span>
                )}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}