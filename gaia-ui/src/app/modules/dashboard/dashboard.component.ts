import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@src/app/services/device-service/device.service';
import { Device } from '@src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allDevices: Device[]

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe(
      // eslint-disable-next-line no-return-assign
      (response) => this.allDevices = response.data.devices,
    );
  }
}
