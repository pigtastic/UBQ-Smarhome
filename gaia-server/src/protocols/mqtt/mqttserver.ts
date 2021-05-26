import aedes, { Client } from 'aedes';
import { createServer } from 'aedes-server-factory';
import { gql, GraphQLClient } from 'graphql-request';

// Create MQTT Server
const mqtt = aedes();
const MQTTPORT = 1883;
const mqttserver = createServer(mqtt);
const graphqlEndpoint = 'http://localhost:4000/graphql';

mqtt.on('client', (client) => {
  console.log('client connected', client.id);
});

mqtt.on('subscribe', (subscriptions, client) => {
  console.log('Client %s SUBSCRIBED to %s:', client.id, subscriptions[0].topic);
});

mqtt.on('unsubscribe', (subscriptions, client:Client) => {
  console.log('Client %s UNSUBSCRIBED to %s:', client.id, ...subscriptions);
});

mqtt.on('publish', (packet) => {
  const { topic } = packet;
  // eslint-disable-next-line no-var
  var payload = packet.payload ? packet.payload.toString() : payload;

  if (topic.startsWith('$SYS')) return; // System message

  // if (!client) {
  //   // eslint-disable-next-line no-param-reassign
  //   client.id = '$BROKER';
  // }

  // console.debug('Client %s PUBLISH on %s: %s', client.id, packet.topic, packet.payload);

  if (packet.topic.startsWith('tasmota/discovery') && packet.topic.endsWith('config')) {
    graphQLMutation(packet.payload.toString()).catch((error) => console.error(error));
  }
});

async function graphQLMutation(payload) {
  const graphQLClient = new GraphQLClient(graphqlEndpoint, {});

  const mutation = gql`
  mutation ($gateway: String!, $payload: String!) { addMqttDevice(gateway: $gateway, payload: $payload) {id}}
`;

  const variables = {
    gateway: 'TASMOTA',
    payload,
  };

  await graphQLClient.request(mutation, variables);
}

function setup() {
  console.log('Mosca server is up and running');
}
/**
 * Init the Broker
 *
 */
async function init() {
  try {
    mqttserver.on('error', (err) => {
      console.debug(err.message);
    });

    mqttserver.listen(MQTTPORT, () => {
      console.debug('Listening on port', MQTTPORT);
    });
    mqttserver.on('ready', setup);
  } catch (error) {
    console.debug(error);
  }
}

export default {
  init,
};
