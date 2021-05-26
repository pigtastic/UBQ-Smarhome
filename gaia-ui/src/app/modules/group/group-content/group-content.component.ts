import {
  Component, Input, OnChanges, OnInit, SimpleChanges,
} from '@angular/core';
import { Group } from 'src/app/types';
import { DeviceService } from '../../../services/device-service/device.service';

@Component({
  selector: 'group-content',
  templateUrl: './group-content.component.html',
  styleUrls: ['./group-content.component.scss'],
})
export class GroupContentComponent implements OnInit, OnChanges {
  @Input()
  selectedGroup: Group;

  loading: boolean;

  devices: any;

  constructor(private deviceService: DeviceService) { }

  // eslint-disable-next-line class-methods-use-this
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedGroup.id === 'allDevices') {
      this.getAllDevices();
    } else {
      this.getGroupDevices();
    }
  }

  ngOnInit(): void {
    if (this.selectedGroup) {
      if (this.selectedGroup.id === 'allDevices') {
        this.getAllDevices();
      } else {
        this.getGroupDevices();
      }
    }
  }

  getGroupDevices() {
    this.deviceService.getDevicesByGroup(this.selectedGroup.id).subscribe(({ data, loading }) => {
      this.loading = loading;
      this.devices = data.group.devices;
    });
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe(({ data, loading }) => {
      this.loading = loading;
      this.devices = data.devices;
    });
  }
}
