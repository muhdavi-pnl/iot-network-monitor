const mqtt = require('mqtt');
const pool = require('../config/db');

const client = mqtt.connect(`mqtt://${process.env.MQTT_BROKER}:1883`);

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe('iot/+/metrics');
});

client.on('message', async (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        const deviceId = topic.split('/')[1];

        await pool.query(
            `INSERT INTO metrics(device_id, latency, packet_loss, rssi, uptime, temperature, timestamp)
             VALUES($1,$2,$3,$4,$5,$6,$7)`,
            [
                deviceId,
                payload.latency,
                payload.packet_loss,
                payload.rssi,
                payload.uptime,
                payload.temperature,
                payload.timestamp
            ]
        );

        console.log(`Data saved from ${deviceId}`);
    } catch (err) {
        console.error(err);
    }
});