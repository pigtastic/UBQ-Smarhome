import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupContentComponent } from './group-content/group-content.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { WidgetModule } from '../widgets/widget.module';
import { AddDeviceToGroupDialogComponent } from './add-device-to-group-dialog/add-device-to-group-dialog.component';

@NgModule({
  declarations: [
    GroupComponent,
    GroupContentComponent,
    GroupMenuComponent,
    AddDeviceToGroupDialogComponent],
  imports: [
    GroupRoutingModule,
    WidgetModule,
    SharedModule,
  ],
})
export class GroupModule { }
