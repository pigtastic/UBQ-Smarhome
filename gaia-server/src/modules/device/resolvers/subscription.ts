import { Devices } from '../providers/devices';

export default {
  Subscription: {
    device: {
      // eslint-disable-next-line no-undef
      subscribe: (_root: any, _args: { id: any }, { injector }: GraphQLModules.Context) =>
        injector.get(Devices).subscribe(_args.id),
    },
  },

};
