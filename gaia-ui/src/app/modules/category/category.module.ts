import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { CategoryRoutingModule } from '@src/app/modules/category/category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { WidgetModule } from '../widgets/widget.module';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryContentComponent,
    CategoryMenuComponent],
  imports: [
    CategoryRoutingModule,
    WidgetModule,
    SharedModule,
  ],
})
export class CategoryModule { }
