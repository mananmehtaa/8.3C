const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const app = express();
const server = http.createServer(app);
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com:1883');

mqttClient.on('connect', () => {
    console.log('MQTT connected to drone application');

    // Function used to publish a message to a certain topic
    function publish(topic, message) {
        mqttClient.publish(topic, JSON.stringify(message), (err) => {
            if (err) {
                console.error(`Error publishing to topic ${topic}: ${err.message}`);
            } else {
                console.log(`Published to topic ${topic}: ${JSON.stringify(message)}`);
            }
        });
    }

    // Simulate sending data from drones
    setInterval(() => {
        const droneId = 1;
        const droneMessage = {
            drone_id: droneId,
            message_type: 'ALL DRONES',
            value: 'The drones are being published in every 5 seconds',
        };
        publish('ALL DRONES', droneMessage);
    }, 5000);   // Published every 5 seconds
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
