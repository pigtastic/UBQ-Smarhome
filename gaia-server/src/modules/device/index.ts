import { createModule, gql } from 'graphql-modules';

import { Groups } from '../group/providers/groups';
import { Devices } from './providers/devices';
import resolvers from './resolvers';

export const DeviceModule = createModule({
  id: 'device',
  dirname: __dirname,
  providers: [Devices, Groups],
  resolvers,
  typeDefs: gql`
        type Device {
            id: String
            name: String
            groups: [Group]
            mqttTopic: String
            state: String
            fn: Functions
        }
        
        type Functions {
          power: Power
          dim: String
        }
        
        type Power {
          relay1: PowerState
          relay2: PowerState
          relay3: PowerState
        }
        
        enum PowerState {
          ON
          OFF
        }
 
        type Query {
            devices: [Device]
            device(id: String!): Device
            
        }
        type Mutation {
            addDevice(name: String!, mqttTopic: String!): Device
            changeState(id: String!, fn: String!, state: PowerState!): Device
            addMqttDevice(gateway: String!, payload: String!): Device
            addDeviceToGroup(groupId: String!, deviceId: String!): Group
        }
        
        type Subscription {
            device: Device
        }
  `,
});
