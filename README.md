# 🚀 IoT Network Monitor

A production-ready IoT network monitoring framework built with:

- Node.js (Express)
- MQTT (Mosquitto)
- PostgreSQL
- React Dashboard
- Fully Dockerized

Designed for:
- IoT Research
- Network QoS Analysis
- Academic Projects
- Final Year Thesis (Undergraduate / Applied Engineering)

---

## 🧠 Overview

IoT Network Monitor is a scalable observability platform for monitoring IoT devices and analyzing network performance metrics such as:

- Latency
- Packet Loss
- RSSI
- Uptime
- Sensor Telemetry
- Device Online/Offline Status

This project is built as a research-ready framework for applied engineering and academic experimentation.

---

## 🏗 Architecture

```

ESP32 → MQTT Broker → Node Backend → PostgreSQL → React Dashboard

```

Components:

- IoT Device Layer (ESP32 / ESP8266)
- MQTT Broker (Mosquitto)
- Backend API & Subscriber (Node.js)
- Database (PostgreSQL)
- Monitoring Dashboard (React)

---

## 📦 Project Structure

```

iot-network-monitor/
│
├── backend/          # Node.js REST API + MQTT Subscriber
├── dashboard/        # React Monitoring UI
├── mqtt/             # Mosquitto Configuration
├── docker-compose.yml
└── README.md

````

---

## 📊 Features

- Device auto registration
- Real-time metric ingestion via MQTT
- REST API for analytics
- PostgreSQL data storage
- Dockerized deployment
- Research extensibility (ML / anomaly detection ready)

---

## 🐳 Quick Start (Docker)

### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/iot-network-monitor.git
cd iot-network-monitor
````

### 2️⃣ Start all services

```bash
docker-compose up --build
```

### 3️⃣ Access services

* Backend API → [http://localhost:5000](http://localhost:5000)
* Dashboard → [http://localhost:3000](http://localhost:3000)
* MQTT Broker → localhost:1883
* PostgreSQL → localhost:5432

---

## 📡 MQTT Topic Design

```
iot/{device_id}/metrics
iot/{device_id}/status
iot/{device_id}/alerts
```

Example payload:

```json
{
  "latency": 23,
  "packet_loss": 0,
  "rssi": -67,
  "uptime": 12345,
  "temperature": 29.5,
  "timestamp": "2026-02-22T10:00:00Z"
}
```

---

## 🗄 Database Schema

### devices

* id
* device_id
* location
* created_at

### metrics

* id
* device_id
* latency
* packet_loss
* rssi
* uptime
* temperature
* timestamp

---

## 🔬 Research Extensions

This framework can be extended for:

* Anomaly Detection (Machine Learning)
* QoS Modeling
* Predictive Maintenance
* Network Reliability Analysis
* Blockchain-based Device Integrity

---

## 🎓 Academic Use

This project is suitable for:

* Final Year Projects
* IoT Laboratory
* Network Engineering Courses
* Applied Research Experiments

---

## 📜 License

MIT License

---

## 👨‍🏫 Maintainer

Developed and maintained for academic and applied engineering research.

If you use this project for research, please cite appropriately.
