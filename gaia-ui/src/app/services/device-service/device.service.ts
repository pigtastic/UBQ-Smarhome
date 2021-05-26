import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  ChangeDeviceStateMutation, GetAllDevicesQuery, GetDevicesOfGroupQuery, PowerState,
} from 'src/app/types';
import getAllDevices from './GraphQL/getAllDevicesQuery.graphql';
import getDevicesOfGroup from './GraphQL/getDevicesOfGroupQuery.graphql';
import changeDeviceState from './GraphQL/changeDeviceStateMutation.graphql';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private querySubscription: Subscription;

  loading: boolean;

  devices: any[];

  constructor(private apollo: Apollo) { }

  getAllDevices() {
    return this.apollo.watchQuery<GetAllDevicesQuery>({
      query: getAllDevices,
    }).valueChanges;
  }

  getDevicesByGroup(groupId: String) {
    return this.apollo.watchQuery<GetDevicesOfGroupQuery>({
      query: getDevicesOfGroup,
      variables: { groupId },
    }).valueChanges;
  }

  changeDeviceState(deviceId: String, fn: String, state: PowerState) {
    return this.apollo.mutate<ChangeDeviceStateMutation>({
      mutation: changeDeviceState,
      variables: { deviceId, fn, state },
    });
  }
}
