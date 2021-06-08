import { Category, Device } from '../../../types';
import { AbstractHandler } from './AbstractHandler';

export class MqttGaiaHandler implements AbstractHandler {
  handleChangeState(device: Device, fn: string, state: string, dataBaseConnection: any) {
    console.log('Can not change state right now');
  }

  canHandle(gateway: string): boolean {
    return gateway.toLowerCase().includes('gaia');
  }

  async handleMqttPublish(topic: any, payload: any, dataBaseConnection: any): Promise<any> {
    console.log(`Handle Publish on ${topic} with payload: ${payload}`);
    if (topic.startsWith('gaia/discovery') && topic.endsWith('config')) {
      const jsonPayload = JSON.parse(payload);

      const query = {
        name: 'default',
        gateway: 'GAIA',
        mqttTopic: jsonPayload.topic,
        category: Category.Sensor,
      };

      const device = await dataBaseConnection.insertOne(query);
      console.log(`addDevice: ${device.ops[0]._id} , ${device.ops[0].name}`);
      // TODO: Sicherstellen, das Rüchgabewert ein Device enthält
      return true;
    }
    if (topic.endsWith('temperature')) {
      const key = 'fn.sensor.sensor1';

      return dataBaseConnection.updateOne(
        { gateway: 'GAIA' }, // Filter
        { $set: { [key]: payload } }, // Update
      );
    }
    return false;
  }
}
