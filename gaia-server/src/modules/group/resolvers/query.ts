/* eslint-disable no-undef */
import { Groups } from '../providers/groups';

export default {
  Query: {
    groups: (_root: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Groups).getAllGroups(),
    group: (_root: any, { id }: any, { injector }: GraphQLModules.Context) =>
      injector.get(Groups).getGroupById(id),
  },
};
