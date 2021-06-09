import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  Category,
  ChangeDeviceStateMutation,
  GetAllDevicesDocument,
  GetAllDevicesQuery,
  GetDevicesOfGroupQuery,
  PowerState,
  GetDevicesOfCategoryQuery,
  GetDevicesOfGroupDocument,
  ChangeDeviceStateDocument,
  GetDevicesOfCategoryDocument,
} from 'src/app/types';

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
      query: GetAllDevicesDocument,
    }).valueChanges;
  }

  getDevicesByGroup(groupId: String) {
    return this.apollo.watchQuery<GetDevicesOfGroupQuery>({
      query: GetDevicesOfGroupDocument,
      variables: { groupId },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getDevicesByCategory(category: Category) {
    return this.apollo.watchQuery<GetDevicesOfCategoryQuery>({
      query: GetDevicesOfCategoryDocument,
      variables: { category },
    }).valueChanges;
  }

  changeDeviceState(deviceId: String, fn: String, state: PowerState) {
    return this.apollo.mutate<ChangeDeviceStateMutation>({
      mutation: ChangeDeviceStateDocument,
      variables: { deviceId, fn, state },
    });
  }
}
