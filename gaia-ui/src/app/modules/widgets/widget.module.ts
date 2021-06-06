import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { SensorWidgetComponent } from '@src/app/modules/widgets/sensor-widget/sensor-widget.component';
import { LightWidgetComponent } from './light-widget/light-widget.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@NgModule({
  declarations: [LightWidgetComponent, WeatherWidgetComponent, SensorWidgetComponent],
  imports: [
    SharedModule,
  ],
  exports: [
    LightWidgetComponent,
    WeatherWidgetComponent,
    SensorWidgetComponent,
  ],
})
export class WidgetModule { }
