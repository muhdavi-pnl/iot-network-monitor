const dashboardService = require("../services/dashboard.service");
const { success, error } = require("../utils/response");

exports.getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary();

    return success(
      res,
      "Dashboard summary retrieved successfully",
      data
    );
  } catch (err) {
    console.error(err);
    return error(res, "Failed to retrieve dashboard summary", err.message);
  }
};