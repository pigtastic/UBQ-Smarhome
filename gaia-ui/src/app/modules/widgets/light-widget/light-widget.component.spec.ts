import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightWidgetComponent } from './light-widget.component';

describe('LightwidgetComponent', () => {
  let component: LightWidgetComponent;
  let fixture: ComponentFixture<LightWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
