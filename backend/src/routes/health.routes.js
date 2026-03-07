const express = require("express");
const router = express.Router();
const healthController = require("../controllers/health.controller");

router.get("/", healthController.checkHealth);

module.exports = router;


/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check if the API service is running properly.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 10234
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-07T10:40:00Z
 *       500:
 *         description: Service unavailable
 */
router.get("/health", healthController.checkHealth);