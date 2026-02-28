const devicesService = require("../services/devices.service");
const { success, error } = require("../utils/response");

exports.getLatestByDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const data = await devicesService.getLatestByDevice(deviceId);

    if (!data) {
      return error(res, "Device not found", "DEVICE_NOT_FOUND", 404);
    }

    return success(
      res,
      "Latest metric retrieved successfully",
      data
    );

  } catch (err) {
    console.error(err);
    return error(res, "Failed to retrieve latest metric", err.message);
  }
};

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await devicesService.getAllDevices();

    return success(
      res,
      "Devices retrieved successfully",
      devices,
      { count: devices.length }
    );

  } catch (err) {
    console.error(err);
    return error(res, "Failed to retrieve devices", err.message);
  }
};