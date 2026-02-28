CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50),
    latency INTEGER,
    packet_loss INTEGER,
    rssi INTEGER,
    uptime INTEGER,
    temperature FLOAT,
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_metrics_device_id ON metrics(device_id);
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp);