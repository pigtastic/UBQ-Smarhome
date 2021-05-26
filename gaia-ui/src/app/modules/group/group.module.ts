import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupContentComponent } from './group-content/group-content.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { WidgetModule } from '../widgets/widget.module';

@NgModule({
  declarations: [GroupComponent, GroupContentComponent, GroupMenuComponent],
  imports: [
    GroupRoutingModule,
    WidgetModule,
    SharedModule,
  ],
})
export class GroupModule { }
