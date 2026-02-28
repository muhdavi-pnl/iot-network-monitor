const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devices.controller");

router.get("/", devicesController.getAllDevices);
router.get("/:deviceId/latest", devicesController.getLatestByDevice);

module.exports = router;