import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GetAllGroupsQuery,
  AddGroupMutation,
  RemoveGroupMutation,
  AddDeviceToGroupMutation,
  GetAllGroupsDocument,
  AddGroupDocument,
  RemoveGroupDocument,
  AddDeviceToGroupDocument,
  GetDevicesOfGroupDocument,
} from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apollo: Apollo) { }

  getAllGroups() {
    return this.apollo.watchQuery<GetAllGroupsQuery>({
      query: GetAllGroupsDocument,
    })
      .valueChanges;
  }

  addGroup(name: String) {
    return this.apollo.mutate<AddGroupMutation>({
      mutation: AddGroupDocument,
      variables: { name },
      refetchQueries: [{ query: GetAllGroupsDocument }],
    });
  }

  removeGroup(id: String) {
    return this.apollo.mutate<RemoveGroupMutation>({
      mutation: RemoveGroupDocument,
      variables: { id },
      refetchQueries: [{ query: GetAllGroupsDocument }],
    });
  }

  addDeviceToGroup(groupId: string, deviceId: string) {
    return this.apollo.mutate<AddDeviceToGroupMutation>({
      mutation: AddDeviceToGroupDocument,
      variables: { groupId, deviceId },
      refetchQueries: [{ query: GetDevicesOfGroupDocument, variables: { groupId } }],
    });
  }
}
