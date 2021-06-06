import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TopBarComponent } from './modules/top-bar/top-bar.component';
import { DateClockComponent } from './modules/top-bar/date-clock/date-clock.component';
import { BottomNavbarComponent } from './modules/bottom-navbar/bottom-navbar.component';
import { NotificationComponent } from './modules/top-bar/notification/notification.component';
import { GraphQLModule } from './graphql.module';
import { SharedModule } from './shared.module';
import { WidgetModule } from './modules/widgets/widget.module';
import { GroupModule } from './modules/group/group.module';

@NgModule({
  declarations: [
    AppComponent,
    BottomNavbarComponent,
    TopBarComponent,
    DateClockComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    GraphQLModule,
    SharedModule,
    GroupModule,
    WidgetModule,
    AngularSvgIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
