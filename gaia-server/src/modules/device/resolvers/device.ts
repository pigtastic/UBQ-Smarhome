/* eslint-disable no-undef */
import { Groups } from '../../group/providers/groups';

export default {
  Device: {
    id: (device: any) => device._id,
    name: (device: any) => device.name,
    groups: (device: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Groups).getGroupsOf(device._id),
    mqttTopic: (device: any) => device.mqttTopic,
    gateway: (device: any) => device.gateway,
    category: (device: any) => device.category,
    fn: (device: any) => device.fn,
  },
};
