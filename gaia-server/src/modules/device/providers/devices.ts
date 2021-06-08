import { PubSub } from 'apollo-server';
import { Injectable } from 'graphql-modules';

import { MongoConnector } from '../../../common/mongo.connector';
import { AbstractHandler } from '../../../protocols/mqtt/handler/AbstractHandler';
import { MqttGaiaHandler } from '../../../protocols/mqtt/handler/MqttGaiaHandler';
import { MqttTasmotaHandler } from '../../../protocols/mqtt/handler/MqttTasmotaHandler';
import { Category, Device } from '../../../types';
import { ensureObjectID } from '../../../utils/ensure-object-id';
import { Groups } from '../../group/providers/groups';

const { ObjectId } = require('mongodb');

const pubsub = new PubSub();

let handlers: Array<AbstractHandler> = [];
// eslint-disable-next-line prefer-const
handlers = [new MqttTasmotaHandler(), new MqttGaiaHandler()];

@Injectable()
export class Devices {
  subscribe(id: any) {
    throw new Error('Method not implemented.');
  }

  async handleMqttPublish(topic: string, payload: string) {
    const mongoDevices = this.mongoDevices();
    // eslint-disable-next-line consistent-return
    handlers.forEach((handler) => {
      if (handler.canHandle(topic)) {
        return handler.handleMqttPublish(topic, payload, mongoDevices);
      }
    });
    return false;
  }

  async getDeviceById(id: string): Promise<Device> {
    console.log(`Devices - getDeviceById: ${id}`);
    const mongoDevices = this.mongoDevices();
    return mongoDevices.findOne({ _id: ensureObjectID(id) });
  }

  async getAllDevices() {
    console.log('Devices.Operations.getAllDevices');

    const mongoDevices = this.mongoDevices();
    return mongoDevices.find({}).toArray();
  }

  // TODO:Sollte allgemein sein, kein mqtt topic
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
    const devices: Device [] = [];
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
    const device = await this.getDeviceById(id);

    handlers.forEach((handler) => {
      if (handler.canHandle(device.gateway as String)) {
        console.log(`Handle ${fn} ${state} for Device ${device.name}`);
        handler.handleChangeState(device, fn, state, this.mongoDevices());
      }
    });

    return this.getDeviceById(id);
  }

  async getDevicesOf(groupId: any) {
    const mongoDevices = this.mongoDevices();
    return mongoDevices.find({ groups: ensureObjectID(groupId) }).toArray();
  }

  async getDevicesOfCategory(category: Category) {
    const mongoDevices = this.mongoDevices();
    return mongoDevices.find({ category }).toArray();
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

  async addDeviceToCategory(category: Category, deviceId: any) {
    console.log('Add Device To Category');

    await this.mongoDevices().updateOne(
      { _id: ensureObjectID(deviceId) },
      { $set: { category } },
    );
    // TODO: Return correct bool for update of mongo db
    return true;
  }

  mongoDevices() {
    return MongoConnector.client.db('gaiadb2').collection('devices');
  }
}
