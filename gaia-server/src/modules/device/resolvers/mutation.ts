/* eslint-disable no-undef */
import { Devices } from '../providers/devices';

export default {
  // eslint-disable-next-line object-curly-newline
  Mutation: {
    addDevice: (_root: any, _args: { name: any, mqttTopic: any }, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).addDevice(_args.name, _args.mqttTopic),
    changeState: (_root: any, _args: { id: any, fn:any, state: any }, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).changeState(_args.id, _args.fn, _args.state),
    handleMqttPublish: (_root: any, _args: {topic: any, payload }, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).handleMqttPublish(_args.topic, _args.payload),
    addDeviceToGroup: (_root: any, _args: { groupId: any, deviceId: any }, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).addDeviceToGroup(_args.groupId, _args.deviceId),
    addDeviceToCategory: (_root: any, _args: { category: any, deviceId: any }, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).addDeviceToCategory(_args.category, _args.deviceId),

  },
};
