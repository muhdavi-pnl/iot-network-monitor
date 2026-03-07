async function getDeviceMetrics(deviceId: string) {
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/devices/${deviceId}/latest`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.log("FETCH ERROR:", res.status);
      return null;
    }

    const json = await res.json();

    console.log("API RESULT:", json);

    return json.data;

  } catch (err) {
    console.error("FETCH FAILED:", err);
    return null;
  }
}

export default async function DeviceDetailPage({ params }: any) {

  console.log("PARAM DEVICE:", params);

  const metrics = await getDeviceMetrics(params.deviceId);

  if (!metrics) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Device data not found</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Device Detail</h1>

      <h2>{metrics.device_id}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <MetricCard title="Temperature" value={`${metrics.temperature} °C`} />
        <MetricCard title="RSSI" value={metrics.rssi} />
        <MetricCard title="Latency" value={`${metrics.latency} ms`} />
        <MetricCard title="Packet Loss" value={`${metrics.packet_loss} %`} />
      </div>

      <div style={{ marginTop: 30 }}>
        <p><b>Uptime:</b> {metrics.uptime}</p>
        <p><b>Timestamp:</b> {metrics.timestamp}</p>
      </div>

    </div>
  );
}

function MetricCard({ title, value }: any) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}