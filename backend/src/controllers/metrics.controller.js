const metricsService = require("../services/metrics.service");
const { success, error } = require("../utils/response");

exports.getAllMetrics = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      deviceId,
      start,
      end
    } = req.query;

    const result = await metricsService.getMetrics({
      page: parseInt(page),
      limit: parseInt(limit),
      deviceId,
      start,
      end
    });

    return success(res, "Metrics retrieved successfully", result.data, {
      count: result.data.length,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit)
    });

  } catch (err) {
    console.error(err);
    return error(res, "Failed to retrieve metrics", err.message);
  }
};

exports.getMetricsByDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const data = await metricsService.getMetricsByDevice(deviceId);

    if (!data.length) {
      return error(res, "Device not found", "DEVICE_NOT_FOUND", 404);
    }

    return success(
      res,
      "Device metrics retrieved successfully",
      data,
      { count: data.length }
    );
  } catch (err) {
    return error(res, "Failed to retrieve device metrics", err.message);
  }
};