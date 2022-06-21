const mqtt = require('mqtt')

const host = 'mqtt://localhost:8888'

const options = {
    keepalive: 60
}

console.log('Connecting to mqtt broker ....')

const client = mqtt.connect(host, options)

client.on('connect', function () {
    // Subscribe any topic
    console.log("Mqtt broker connected");
    client.publish('ades/hello', 'I am a publisher', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    console.log('received ' + topic + '/' + message.toString());
});

client.on('error', (err) => {
    console.log('Connection error: ', err)
    client.end()
})
  
client.on('reconnect', () => {
    console.log('Reconnecting...')
})