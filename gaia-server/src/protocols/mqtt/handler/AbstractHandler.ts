import { Device } from '../../../types';

export abstract class AbstractHandler {
  abstract canHandle(data: String): boolean;

  abstract handleChangeState(device: Device, fn: string, state: string, dataBaseConnection: any);

  abstract handleMqttPublish(topic: any, payload: any, dataBaseConnection: any);
}
