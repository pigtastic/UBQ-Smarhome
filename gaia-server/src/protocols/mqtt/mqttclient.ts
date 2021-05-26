import * as mqtt from 'mqtt';

let client;
function init() {
  client = mqtt.connect('mqtt://localhost:1883');
}

function publish(topic: string, state: string) {
  client.publish(topic, state);
}

export default {
  init,
  publish,
};
