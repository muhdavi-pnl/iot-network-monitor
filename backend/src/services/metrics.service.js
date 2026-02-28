const pool = require("../config/db");

exports.getLatestMetrics = async () => {
  const result = await pool.query(
    "SELECT * FROM metrics ORDER BY created_at DESC LIMIT 100"
  );
  return result.rows;
};

exports.getMetricsByDevice = async (deviceId) => {
  const result = await pool.query(
    `SELECT * FROM metrics 
     WHERE device_id = $1 
     ORDER BY timestamp DESC 
     LIMIT 100`,
    [deviceId]
  );

  return result.rows;
};

exports.getMetrics = async ({
  page = 1,
  limit = 20,
  deviceId,
  start,
  end
}) => {
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM metrics WHERE 1=1`;
  let countQuery = `SELECT COUNT(*) FROM metrics WHERE 1=1`;

  const values = [];
  let index = 1;

  if (deviceId) {
    query += ` AND device_id = $${index}`;
    countQuery += ` AND device_id = $${index}`;
    values.push(deviceId);
    index++;
  }

  if (start) {
    query += ` AND timestamp >= $${index}`;
    countQuery += ` AND timestamp >= $${index}`;
    values.push(start);
    index++;
  }

  if (end) {
    query += ` AND timestamp <= $${index}`;
    countQuery += ` AND timestamp <= $${index}`;
    values.push(end);
    index++;
  }

  query += ` ORDER BY timestamp DESC LIMIT $${index} OFFSET $${index + 1}`;
  values.push(limit, offset);

  const dataResult = await pool.query(query, values);

  const countResult = await pool.query(countQuery, values.slice(0, index - 1));

  return {
    data: dataResult.rows,
    total: parseInt(countResult.rows[0].count),
    page,
    limit
  };
};