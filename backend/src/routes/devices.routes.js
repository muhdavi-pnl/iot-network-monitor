const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devices.controller");

router.get("/", devicesController.getAllDevices);
router.get("/:deviceId/latest", devicesController.getLatestByDevice);

module.exports = router;

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all registered IoT devices
 *     description: Retrieve a list of all IoT devices connected to the monitoring system.
 *     tags:
 *       - Devices
 *     responses:
 *       200:
 *         description: Devices retrieved successfully
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
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: device-001
 *                       name:
 *                         type: string
 *                         example: Temperature Sensor
 *                       location:
 *                         type: string
 *                         example: Server Room
 *                       status:
 *                         type: string
 *                         example: online
 *                       lastSeen:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-07T10:30:00Z
 *       500:
 *         description: Internal server error
 */
router.get("/devices", devicesController.getAllDevices);

/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: Get device by ID
 *     description: Retrieve detailed information about a specific IoT device.
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the device
 *         example: device-001
 *     responses:
 *       200:
 *         description: Device retrieved successfully
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
 *                     id:
 *                       type: string
 *                       example: device-001
 *                     name:
 *                       type: string
 *                       example: Temperature Sensor
 *                     location:
 *                       type: string
 *                       example: Server Room
 *                     status:
 *                       type: string
 *                       example: online
 *                     lastSeen:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-07T10:30:00Z
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 */
router.get("/devices/:deviceId/latest", devicesController.getLatestByDevice);