/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createApplication } from 'graphql-modules';

import env from './common/config';
import { MongoConnector } from './common/mongo.connector';
import { DeviceModule } from './modules/device';
import { GroupModule } from './modules/group';
import mqttclient from './protocols/mqtt/mqttclient';
import mqttserver from './protocols/mqtt/mqttserver';

// Connect to MongoDb
try {
  MongoConnector.connect(env.MONGO_URI).then(() => console.info('Connected to Mongo!'));
} catch (err) {
  console.error('Unable to connect to Mongo!', err);
}

// Create Server
export const app = createApplication({
  modules: [GroupModule, DeviceModule],
});

const server = express();
server.use(cors());
const execute = app.createExecution();

server.use(
  '/graphql',
  graphqlHTTP({
    schema: app.schema,
    customExecuteFn: execute as any,
    graphiql: true,
  }),
);

// Start GraphQLServer
server.listen(4000, () => {
  console.log('Live http://localhost:4000/graphql');
});

// Start MQTT Server
mqttserver.init();

// Start MQTT client
mqttclient.init();
