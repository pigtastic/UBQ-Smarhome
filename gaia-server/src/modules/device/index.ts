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
            gateway: String
            category: Category
            fn: Functions
        }
        
        type Functions {
          power: Power
          dim: String
          sensor: Sensor
        }
        
        type Power {
          relay1: PowerState
          relay2: PowerState
          relay3: PowerState
        }
        
        type Sensor {
          sensor1: String
        }
        
        enum PowerState {
          ON
          OFF
        }
        
        enum Category {
          Default,
          Light,
          Sensor
        }
 
        type Query {
            devices: [Device]
            device(id: String!): Device
            getDevicesOfCategory(category: Category!): [Device]
        }
        type Mutation {
            addDevice(name: String!, mqttTopic: String!): Device
            changeState(id: String!, fn: String!, state: PowerState!): Device
            handleMqttPublish(topic: String!, payload: String!): Boolean
            addDeviceToGroup(groupId: String!, deviceId: String!): Group
            addDeviceToCategory(category: Category!, deviceId: String!): Boolean
        }
        
        type Subscription {
            device: Device
        }
  `,
});
