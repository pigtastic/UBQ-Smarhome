import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularSvgIconModule.forRoot(),
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    AngularSvgIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
  ],
})
export class SharedModule { }
