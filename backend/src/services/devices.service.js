const pool = require("../config/db");

exports.getLatestByDevice = async (deviceId) => {
  const result = await pool.query(
    `SELECT * FROM metrics
     WHERE device_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [deviceId]
  );

  return result.rows[0] || null;
};

exports.getAllDevices = async () => {
  const result = await pool.query(`
    SELECT DISTINCT ON (device_id)
      device_id,
      created_at
    FROM metrics
    ORDER BY device_id, created_at DESC
  `);

  const now = new Date();
  const threshold = parseInt(process.env.OFFLINE_THRESHOLD || "60");

  return result.rows.map(row => {
    const lastSeen = new Date(row.created_at);
    const diffSeconds = (now - lastSeen) / 1000;

    return {
      device_id: row.device_id,
      last_seen: row.created_at,
      seconds_since_last_seen: Math.floor(diffSeconds),
      status: diffSeconds <= threshold ? "ONLINE" : "OFFLINE"
    };
  });
};