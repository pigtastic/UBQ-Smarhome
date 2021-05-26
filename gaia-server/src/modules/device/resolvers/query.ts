/* eslint-disable no-undef */
import { Devices } from '../providers/devices';

export default {
  Query: {
    devices: (_root: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).getAllDevices(),
    device: (_root: any, { id }: any, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).getDeviceById(id),
  },
};
