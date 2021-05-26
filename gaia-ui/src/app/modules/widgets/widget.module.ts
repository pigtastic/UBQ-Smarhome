import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { LightWidgetComponent } from './lightwidget/lightwidget.component';

@NgModule({
  declarations: [LightWidgetComponent],
  imports: [
    SharedModule,
  ],
  exports: [
    LightWidgetComponent,
  ],
})
export class WidgetModule { }
