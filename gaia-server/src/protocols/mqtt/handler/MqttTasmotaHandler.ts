import { Category, Device } from '../../../types';
import { ensureObjectID } from '../../../utils/ensure-object-id';
import mqttclient from '../mqttclient';
import { AbstractHandler } from './AbstractHandler';

export class MqttTasmotaHandler implements AbstractHandler {
  async handleChangeState(device: Device, fn: string, state: string, dataBaseConnection: any) {
    const command = 'cmnd';
    const functionCalls = fn.substring(0, fn.length - 1).split('.');
    const relayNumber = fn.substring(fn.length - 1);

    const finalState = this.getTASMOTA()[functionCalls[0]][functionCalls[1]][state];
    const finalTopic = `${command}/${device.mqttTopic}/${this.getTASMOTA()[functionCalls[0]][functionCalls[1]].topic}${relayNumber}`;

    mqttclient.publish(finalTopic, finalState);
    // TODO: Check if publish was erfolgreich
    const key = `fn.${fn}`;

    await dataBaseConnection.updateOne(
      { _id: ensureObjectID(device.id) }, // Filter
      { $set: { [key]: state } }, // Update
    );
  }

  canHandle(gateway: String): boolean {
    return gateway === 'TASMOTA' || (gateway.startsWith('tasmota/discovery') && gateway.endsWith('config'));
  }

  async handleMqttPublish(topic: any, payload: any, mongoDevices: any): Promise<any> {
    const jsonPayload = JSON.parse(payload);
    const power = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < jsonPayload.rl.length; i++) {
      if (jsonPayload.rl[i] === 1) {
        power[`relay${i + 1}`] = 'OFF';
      }
    }

    console.log(JSON.parse(payload));
    console.log(power);

    const query = {
      name: jsonPayload.dn,
      gateway: 'TASMOTA',
      mqttTopic: jsonPayload.t,
      category: Category.Light,
      fn: { power },
    };

    const device = await mongoDevices.insertOne(query);
    console.log(`addDevice: ${device.ops[0]._id} , ${device.ops[0].name}`);
    // TODO: Sicherstellen, das Rückgabewert ein Device enthält
    return true;
  }

  getTASMOTA() {
    return {
      power: {
        relay: {
          topic: 'POWER',
          ON: 'on',
          OFF: 'off',
        },
      },
    };
  }
}
