const pool = require("../config/db");
const { success, error } = require("../utils/response");

exports.checkHealth = async (req, res) => {
  const start = Date.now();

  try {
    // Test DB connection
    await pool.query("SELECT 1");

    const responseTime = Date.now() - start;

    return success(res, "Service is healthy", {
      status: "UP",
      database: "UP",
      uptime_seconds: Math.floor(process.uptime()),
      response_time_ms: responseTime,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return error(res, "Service is unhealthy", {
      status: "DOWN",
      database: "DOWN",
      error: err.message,
      timestamp: new Date().toISOString()
    }, 500);
  }
};