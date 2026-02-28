const pool = require("../config/db");

exports.getSummary = async () => {
  const onlineThreshold = new Date(Date.now() - 5 * 60 * 1000);

  // Total devices
  const totalDevicesResult = await pool.query(
    `SELECT COUNT(DISTINCT device_id) FROM metrics`
  );

  // Online devices
  const onlineDevicesResult = await pool.query(
    `SELECT COUNT(DISTINCT device_id)
     FROM metrics
     WHERE timestamp >= $1`,
    [onlineThreshold]
  );

  // Total metrics
  const totalMetricsResult = await pool.query(
    `SELECT COUNT(*) FROM metrics`
  );

  // Average latency & packet loss
  const avgResult = await pool.query(
    `SELECT 
       AVG(latency) as avg_latency,
       AVG(packet_loss) as avg_packet_loss
     FROM metrics`
  );

  const totalDevices = parseInt(totalDevicesResult.rows[0].count);
  const onlineDevices = parseInt(onlineDevicesResult.rows[0].count);

  return {
    totalDevices,
    onlineDevices,
    offlineDevices: totalDevices - onlineDevices,
    totalMetrics: parseInt(totalMetricsResult.rows[0].count),
    avgLatency: parseFloat(avgResult.rows[0].avg_latency || 0).toFixed(2),
    avgPacketLoss: parseFloat(avgResult.rows[0].avg_packet_loss || 0).toFixed(2),
    lastUpdated: new Date().toISOString()
  };
};