import mqttclient from '../mqttclient';
import { IHandler } from './IHandler';

export class MqttTasmotaHandler implements IHandler {
  handle(topic: string, fn: string, state: string) {
    const relayNumber = fn.substring(fn.length - 1);
    const functionCalls = fn.substring(0, fn.length - 1).split('.');
    const command = 'cmnd';

    const finalState = this.getTASMOTA()[functionCalls[0]][functionCalls[1]][state];
    const finalTopic = `${command}/${topic}/${this.getTASMOTA()[functionCalls[0]][functionCalls[1]].topic}${relayNumber}`;

    mqttclient.publish(finalTopic, finalState);
  }

  canHandle(gateway: String) {
    return gateway === 'TASMOTA';
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
