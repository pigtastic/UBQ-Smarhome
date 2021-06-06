import {
  OnChanges, SimpleChanges, Input, Component,
} from '@angular/core';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { Device, PowerState } from 'src/app/types';

interface IState {
  key: String
  state: Boolean
}
@Component({
  selector: 'sensor-widget',
  templateUrl: './sensor-widget.component.html',
  styleUrls: ['./sensor-widget.component.scss'],
})

export class SensorWidgetComponent implements OnChanges {
  @Input()
  device: Device

  powerMap : IState[] = []

  constructor(private deviceService: DeviceService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.device?.fn?.power) {
      Object.entries(this.device.fn.power).forEach(([key, value]) => {
        if (value && value !== 'Power') {
          this.powerMap.push({ key, state: this.stateToBool(value) });
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stateToBool(state: PowerState): Boolean {
    return state === PowerState.On;
  }

  // eslint-disable-next-line class-methods-use-this
  boolToState(bool: Boolean): PowerState {
    if (bool) {
      return PowerState.On;
    }

    return PowerState.Off;
  }

  changeState(event: any) {
    this.deviceService.changeDeviceState(this.device.id, `power.${event.source.name}`, this.boolToState(event.checked)).subscribe();
  }
}
