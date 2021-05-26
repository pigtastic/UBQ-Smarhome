import { PubSub } from 'apollo-server';
import { Injectable } from 'graphql-modules';

import { MongoConnector } from '../../../common/mongo.connector';
import { IHandler } from '../../../protocols/mqtt/handler/IHandler';
import { MqttTasmotaHandler } from '../../../protocols/mqtt/handler/MqttTasmotaHandler';
import { ensureObjectID } from '../../../utils/ensure-object-id';
import { Groups } from '../../group/providers/groups';

const { ObjectId } = require('mongodb');

const pubsub = new PubSub();

let handlers: [IHandler];
// eslint-disable-next-line prefer-const
handlers = [new MqttTasmotaHandler()];

@Injectable()
export class Devices {
  subscribe(id: any) {
    throw new Error('Method not implemented.');
  }

  async addMqttDevice(gateway: any, payload: any) {
    const jPayload = JSON.parse(payload);
    const power = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < jPayload.rl.length; i++) {
      if (jPayload.rl[i] === 1) {
        power[`relay${i + 1}`] = 'OFF';
      }
    }

    console.log(JSON.parse(payload));
    console.log(power);

    const query = {
      name: 'default',
      gateway,
      mqttTopic: jPayload.t,
      fn: { power },
    };
    const mongoDevices = this.mongoDevices();
    const device = await mongoDevices.insertOne(query);
    console.log(`addDevice: ${device.ops[0]._id} , ${device.ops[0].name}`);
    return device.ops[0];
  }

  async getDeviceById(id: string) {
    console.log(`Devices - getDeviceById: ${id}`);
    const mongoDevices = this.mongoDevices();
    return mongoDevices.findOne({ _id: ensureObjectID(id) });
  }

  async getAllDevices() {
    console.log('Devices.Operations.getAllDevices');

    const mongoDevices = this.mongoDevices();
    return mongoDevices.find({}).toArray();
  }

  async addDevice(name: string, mqttTopic: string) {
    const query = {
      name,
      mqttTopic,
    };
    const mongoDevices = this.mongoDevices();
    const device = await mongoDevices.insertOne(query);
    console.log(`addDevice: ${device.ops[0]._id} , ${device.ops[0].name}`);
    return device.ops[0];
  }

  removeDevice(id: string) {
    console.log(id);

    // #Todo
  }

  async renameDevice(id: string, name: string) {
    // #FIXME: Licht wird nicht umbenannt
    console.log('Rename Devices');
    const mongoDevices = this.mongoDevices();

    const device = await mongoDevices.updateOne(
      { _id: new ObjectId(id) }, // Filter
      { $set: { name } }, // Update
    );
    console.log(device.result.nModified);
    return device.result.nModified;
  }

  async getAllDevicesById(deviceIds: string []) {
    const devices: Devices [] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const deviceId of deviceIds) {
      // eslint-disable-next-line no-await-in-loop
      const temp = await this.getDeviceById(deviceId);
      devices.push(temp);
    }
    return devices;
  }

  // id = 234234 fn: power.relay1 state on
  async changeState(id: string, fn: string, state?: string) {
    const mongoDevices = this.mongoDevices();
    const key = `fn.${fn}`;

    await mongoDevices.updateOne(
      { _id: new ObjectId(id) }, // Filter
      { $set: { [key]: state } }, // Update
    );
    const device = await this.getDeviceById(id);

    handlers.forEach((handler) => {
      if (handler.canHandle(device.gateway as String)) {
        console.log(`Handle ${fn} ${state} for Device ${device.name}`);
        handler.handle(device.mqttTopic, fn, state);
      }
    });

    return device;
  }

  async getDevicesOf(groupId: any) {
    const mongoDevices = this.mongoDevices();
    return mongoDevices.find({ groups: ensureObjectID(groupId) }).toArray();
  }

  async addDeviceToGroup(groupId: any, deviceId: any) {
    console.log('Add Device To Group');

    // TODO: Check if Group and Device existing
    await this.mongoDevices().updateOne(
      {
        _id: ensureObjectID(deviceId),
        groups: { $nin: [ensureObjectID(groupId)] },
      },
      { $push: { groups: ensureObjectID(groupId) } }, // Update
    );

    return new Groups().getGroupById(groupId);
  }

  mongoDevices() {
    return MongoConnector.client.db('gaiadb2').collection('devices');
  }
}
