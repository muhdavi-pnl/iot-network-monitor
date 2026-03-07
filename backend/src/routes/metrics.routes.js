const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics.controller");
const { success, error } = require('../utils/response');

router.get("/", metricsController.getAllMetrics);
router.get("/:deviceId", metricsController.getMetricsByDevice);

module.exports = router;

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get all metrics
 *     description: Retrieve metrics data from all registered IoT devices.
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of records returned
 *         example: 50
 *     responses:
 *       200:
 *         description: Metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       deviceId:
 *                         type: string
 *                         example: device-001
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-07T10:30:00Z
 *                       temperature:
 *                         type: number
 *                         example: 25.4
 *                       humidity:
 *                         type: number
 *                         example: 60
 *                       cpuUsage:
 *                         type: number
 *                         example: 32
 *       500:
 *         description: Internal server error
 */
router.get("/metrics", metricsController.getAllMetrics);

/**
 * @swagger
 * /metrics/{deviceId}:
 *   get:
 *     summary: Get metrics by device ID
 *     description: Retrieve metrics data for a specific IoT device.
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the device
 *         example: device-001
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start time for filtering metrics
 *         example: 2026-03-07T10:00:00Z
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End time for filtering metrics
 *         example: 2026-03-07T11:00:00Z
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of records to return
 *         example: 100
 *     responses:
 *       200:
 *         description: Metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 deviceId:
 *                   type: string
 *                   example: device-001
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-07T10:30:00Z
 *                       temperature:
 *                         type: number
 *                         example: 25.5
 *                       humidity:
 *                         type: number
 *                         example: 61
 *                       cpuUsage:
 *                         type: number
 *                         example: 30
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 */
router.get("/metrics/:deviceId", metricsController.getMetricsByDevice);