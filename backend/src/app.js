const express = require("express");
const metricsRoutes = require("./routes/metrics.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(express.json());

app.use("/api/metrics", metricsRoutes);
app.use("/api/devices", require("./routes/devices.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/health", healthRoutes);

app.use(require('./middleware/errorHandler'));

module.exports = app;