/* eslint-disable no-unused-vars */
import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../../services/device-service/device.service';
import { GroupService } from '../../services/group-service/group.service';
import { Group } from '../../types';

@Component({
  selector: 'app-light',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  selectedGroup: Group;

  devices: any[];

  loading: boolean;

  groups: Group[] = [];

  constructor(private deviceService: DeviceService, private groupService: GroupService) {
    this.loading = true;
    this.groupService.getAllGroups().subscribe(({ data, loading }) => {
      this.groups.push({ id: 'allDevices', name: 'All Devices' });
      data.groups.forEach((group) => {
        this.groups.push(group);
      });
      // this.groups = data.groups;
      this.groupSelected(data.groups[0]);
      this.loading = loading;
    });
  }

  // eslint-disable-next-line no-shadow
  groupSelected(group: Group) {
    this.selectedGroup = group;
  }
}
