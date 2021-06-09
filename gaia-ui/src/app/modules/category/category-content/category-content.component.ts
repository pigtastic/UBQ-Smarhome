import {
  Component, Input, OnChanges, OnInit,
} from '@angular/core';
import { Category, Device } from 'src/app/types';
import { DeviceService } from '../../../services/device-service/device.service';

@Component({
  selector: 'category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.scss'],
})
export class CategoryContentComponent implements OnInit, OnChanges {
  @Input()
  selectedCategory: Category;

  loading: boolean;

  devices: Device[];

  constructor(private deviceService: DeviceService) {
  }

  ngOnChanges(): void {
    if (this.selectedCategory === Category.Default) {
      this.getAllDevices();
    } else {
      this.getCategoryDevices();
    }
  }

  ngOnInit(): void {
    if (this.selectedCategory === Category.Default) {
      this.getAllDevices();
    } else {
      this.getCategoryDevices();
    }
  }

  getCategoryDevices() {
    this.deviceService.getDevicesByCategory(
      this.selectedCategory,
    ).subscribe(({ data, loading }) => {
      this.loading = loading;
      this.devices = data.getDevicesOfCategory;
    });
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe(({ data, loading }) => {
      this.loading = loading;
      this.devices = data.devices;
    });
  }
}
