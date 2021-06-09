import {
  Input, Component,
} from '@angular/core';
import { Device } from 'src/app/types';

@Component({
  selector: 'sensor-widget',
  templateUrl: './sensor-widget.component.html',
  styleUrls: ['./sensor-widget.component.scss'],
})

export class SensorWidgetComponent {
  @Input()
  device: Device
}
