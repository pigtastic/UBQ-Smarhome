import { Injectable } from 'graphql-modules';

import { MongoConnector } from '../../../common/mongo.connector';
import { ensureObjectID } from '../../../utils/ensure-object-id';
import { Devices } from '../../device/providers/devices';

@Injectable()
export class Groups {
  mongoGroups() {
    return MongoConnector.client.db('gaiadb2').collection('groups');
  }

  async getGroupById(id: string): Promise<any> {
    console.log(`Group - getGroupById: ${id}`);
    return this.mongoGroups().findOne({ _id: ensureObjectID(id) });
  }

  async getAllGroups() {
    console.log('Group.Operations.getAllGroups');
    const mongoGroups = this.mongoGroups();
    return mongoGroups.find({}).toArray();
  }

  async addGroup(name: string) {
    const query = {
      name,
    };
    const group = await this.mongoGroups().insertOne(query);
    console.log(`addGroup: ${group.ops[0]._id} , ${group.ops[0].name}`);
    return group.ops[0];
  }

  removeGroup(id: string) {
    this.mongoGroups().deleteOne({ _id: ensureObjectID(id) });
    console.log(id);

    // #Todo
  }

  async renameGroup(id: string, name: string) {
    // #FIXME: Gruppe wird nicht umbenannt
    console.log('Rename Group');

    const group = await this.mongoGroups().updateOne(
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
      // @ts-ignore
      // eslint-disable-next-line no-await-in-loop
      const temp = await this.getGroupById(groupId);
      groups.push(temp);
    }
    return groups;
  }
}
