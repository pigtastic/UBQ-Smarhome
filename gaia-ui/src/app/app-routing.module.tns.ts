import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { approutes } from '@src/app/app.routes';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(approutes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
