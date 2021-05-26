/* eslint-disable no-undef */
import { Devices } from '../../device/providers/devices';

export default {
  Group: {
    id: (group: any) => group._id,
    name: (group: any) => group.name,
    devices: (group: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Devices).getDevicesOf(group._id),
  },
};
