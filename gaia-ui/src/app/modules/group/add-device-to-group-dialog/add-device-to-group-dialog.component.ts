import {
  Component, Inject, Input, OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from '@src/app/services/device-service/device.service';
import { GroupService } from '@src/app/services/group-service/group.service';
import { Device, Group } from '@src/app/types';

@Component({
  selector: 'app-add-device-to-group-dialog',
  templateUrl: './add-device-to-group-dialog.component.html',
  styleUrls: ['./add-device-to-group-dialog.component.scss'],
})
export class AddDeviceToGroupDialogComponent implements OnInit {
  group: Group;

  devices = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) dialogParams: { group: Group },
    private deviceService: DeviceService,
    private groupService: GroupService,

  ) {
    this.group = dialogParams.group;
  }

  allDevices: Device[]

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((result) => {
      this.allDevices = result.data.devices;
    });
  }

  addDevices() {
    this.devices.value.forEach((device) => {
      this.groupService.addDeviceToGroup(this.group.id, device.id).subscribe();
    });
  }
}
