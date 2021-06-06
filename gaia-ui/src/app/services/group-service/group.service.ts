import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GetAllGroupsQuery, AddGroupMutation, RemoveGroupMutation, AddDeviceToGroupMutation,
} from 'src/app/types';
import getAllGroups from './GraphQL/getAllGroupsQuery.graphql';
import AddGroup from './GraphQL/AddGroupMutation.graphql';
import RemoveGroup from './GraphQL/RemoveGroupMutation.graphql';
import AddDeviceToGroup from './GraphQL/AddDeviceToGroupMutation.graphql';
import getDevicesOfGroup from '../device-service/GraphQL/getDevicesOfGroupQuery.graphql';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apollo: Apollo) { }

  getAllGroups() {
    return this.apollo.watchQuery<GetAllGroupsQuery>({
      query: getAllGroups,
    })
      .valueChanges;
  }

  addGroup(name: String) {
    return this.apollo.mutate<AddGroupMutation>({
      mutation: AddGroup,
      variables: { name },
      refetchQueries: [{ query: getAllGroups }],
    });
  }

  removeGroup(id: String) {
    return this.apollo.mutate<RemoveGroupMutation>({
      mutation: RemoveGroup,
      variables: { id },
      refetchQueries: [{ query: getAllGroups }],
    });
  }

  addDeviceToGroup(groupId: string, deviceId: string) {
    return this.apollo.mutate<AddDeviceToGroupMutation>({
      mutation: AddDeviceToGroup,
      variables: { groupId, deviceId },
      refetchQueries: [{ query: getDevicesOfGroup, variables: { groupId } }],
    });
  }
}
