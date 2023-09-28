const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com:1883');

mqttClient.on('connect', () => {
    console.log('MQTT connected to drone application');

    // Subscribe to topics of interest
    mqttClient.subscribe('ALL DRONES');
    mqttClient.subscribe('SPEED OF SHORT DISTANCE DRONES');
    mqttClient.subscribe('BATTERY LEVELS OF ALL DRONES');
    mqttClient.subscribe(' LATITUDE AND LONGITUDE VALUES OF ALL LONG DISTANCE DRONES');

    mqttClient.on('message', (topic, message) => {
        const parsedMessage = JSON.parse(message.toString());
        switch (topic) {
            case 'ALL DRONES':
                console.log(`ALL DRONES ${parsedMessage.drone_id}: ${parsedMessage.value}`);
                break;
            case 'SPEED OF SHORT DISTANCE DRONES':
                if (parsedMessage.value < 100) {
                    console.log(`SHORT DISTANCE DRONES ${parsedMessage.drone_id} SPEED: ${parsedMessage.value}`);
                }
                break;
            case 'BATTERY LEVELS OF ALL DRONES':
                console.log(`Drone ${parsedMessage.drone_id} battery level: ${parsedMessage.value}`);
                break;
            case 'LATITUDE AND LONGITUDE VALUES OF ALL LONG DISTANCE DRONES':
                console.log(`LATITUDE AND LONGITUDE VALUES OF ALL LONG DISTANCE DRONES ${parsedMessage.drone_id} coordinates: ${parsedMessage.value}`);
                break;
            default:
                console.log(`Received message on unknown topic ${topic}: ${message}`);
        }
    });
});
