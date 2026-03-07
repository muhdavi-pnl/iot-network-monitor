const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");

router.get("/summary", dashboardController.getSummary);

module.exports = router;

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     description: Retrieve system summary statistics for the monitoring dashboard.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalDevices:
 *                       type: integer
 *                       example: 10
 *                     onlineDevices:
 *                       type: integer
 *                       example: 7
 *                     offlineDevices:
 *                       type: integer
 *                       example: 3
 *                     latestMetricTimestamp:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-07T10:35:00Z
 *       500:
 *         description: Internal server error
 */
router.get("/dashboard/summary", dashboardController.getSummary);