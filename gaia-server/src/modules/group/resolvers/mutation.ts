/* eslint-disable no-undef */
import { Groups } from '../providers/groups';

export default {
  Mutation: {
    addGroup: (_root: any, { name }: any, { injector }: GraphQLModules.Context) =>
      injector.get(Groups).addGroup(name),
  },
};
