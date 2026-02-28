const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics.controller");
const { success, error } = require('../utils/response');

router.get("/", metricsController.getAllMetrics);
router.get("/:deviceId", metricsController.getMetricsByDevice);

module.exports = router;