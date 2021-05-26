import { createModule, gql } from 'graphql-modules';

import { Devices } from '../device/providers/devices';
import { Groups } from './providers/groups';
import resolvers from './resolvers';

export const GroupModule = createModule({
  id: 'group',
  dirname: __dirname,
  providers: [Groups, Devices],
  resolvers,
  typeDefs: gql`
        type Group {
            id: String
            name: String
            devices:[Device]

        }
        extend type Query {
            groups: [Group]
            group(id: String!): Group
        }
        extend type Mutation {
            addGroup(name: String!): Group
#            renameGroup(id: String!, name: String!): Group
        }
    `,
});
