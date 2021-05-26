import { Injectable } from 'graphql-modules';

import { MongoConnector } from '../../../common/mongo.connector';
import { ensureObjectID } from '../../../utils/ensure-object-id';
import { Devices } from '../../device/providers/devices';

@Injectable()
export class Groups {
  mongoDevices() {
    return MongoConnector.client.db('gaiadb2').collection('groups');
  }

  async getGroupById(id: string): Promise<any> {
    console.log(`Group - getGroupById: ${id}`);
    return this.mongoDevices().findOne({ _id: ensureObjectID(id) });
  }

  async getAllGroups() {
    console.log('Group.Operations.getAllGroups');
    const mongoGroups = this.mongoDevices();
    return mongoGroups.find({}).toArray();
  }

  async addGroup(name: string) {
    const query = {
      name,
    };
    const group = await this.mongoDevices().insertOne(query);
    console.log(`addGroup: ${group.ops[0]._id} , ${group.ops[0].name}`);
    return group.ops[0];
  }

  removeGroup(id: string) {
    console.log(id);

    // #Todo
  }

  async renameGroup(id: string, name: string) {
    // #FIXME: Gruppe wird nicht umbenannt
    console.log('Rename Group');

    const group = await this.mongoDevices().updateOne(
      { _id: ensureObjectID(id) }, // Filter
      { $set: { name } }, // Update
    );
    console.log(group.result.nModified);
    return group.result.nModified;
  }

  async getGroupsOf(deviceId: string) {
    // @ts-ignore
    const device = await new Devices().getDeviceById(deviceId);
    const groups: Groups [] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const groupId of device.groups) {
      // eslint-disable-next-line no-await-in-loop
      const temp = await this.getGroupById(groupId);
      groups.push(temp);
    }
    return groups;
  }
}
